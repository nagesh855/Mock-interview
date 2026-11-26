"""Interview sessions, history, answer submission, and level progression."""
import uuid
from datetime import datetime, timezone
from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.api.deps import get_current_user
from app.models.user import User, UserProgress
from app.models.interview import InterviewSession, InterviewAnswer, Certificate
from app.models.question import Question
from app.schemas.interview import (
    InterviewSessionCreate,
    InterviewSessionRead,
    InterviewAnswerCreate,
    InterviewAnswerRead,
)
from app.ai.scoring import DeterministicScorer

router = APIRouter()

@router.post("/start", response_model=InterviewSessionRead, status_code=status.HTTP_201_CREATED)
def start_interview_session(
    session_in: InterviewSessionCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Initialize a new interview session for user."""
    # Check level unlock requirement
    progress = db.query(UserProgress).filter(
        UserProgress.user_id == current_user.id,
        UserProgress.category_id == session_in.category_id
    ).first()

    requested_level = session_in.level.lower()
    if requested_level == "medium":
        if not progress or not progress.unlocked_medium:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Medium level is locked. Pass Easy level with >= 60% score to unlock."
            )
    elif requested_level == "hard":
        if not progress or not progress.unlocked_hard:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Hard level is locked. Pass Medium level with >= 60% score to unlock."
            )

    session = InterviewSession(
        user_id=current_user.id,
        category_id=session_in.category_id,
        level=requested_level,
        interview_type=session_in.interview_type,
        status="in_progress"
    )
    db.add(session)
    db.commit()
    db.refresh(session)
    return session

@router.post("/{session_id}/answer", response_model=InterviewAnswerRead)
def submit_interview_answer(
    session_id: int,
    answer_in: InterviewAnswerCreate,
    duration_seconds: float = 30.0,
    db: Session = Depends(get_db)
):
    """Submit answer, evaluate with deterministic AI scoring (60% content / 40% delivery)."""
    session = db.query(InterviewSession).filter(InterviewSession.id == session_id).first()
    if not session:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Interview session not found.")

    question = db.query(Question).filter(Question.id == answer_in.question_id).first()
    expected = question.expected_points if question else ""

    eval_result = DeterministicScorer.evaluate_response(
        user_answer=answer_in.user_answer,
        expected_points=expected,
        duration_seconds=duration_seconds
    )

    answer = InterviewAnswer(
        session_id=session_id,
        question_id=answer_in.question_id,
        user_answer=answer_in.user_answer,
        score=eval_result["score"],
        content_score=eval_result["content_score"],
        delivery_score=eval_result["delivery_score"],
        filler_words=str(eval_result["filler_words_count"]),
        missed_points=eval_result["missed_points"],
        better_suggestion=eval_result["better_suggestion"]
    )
    db.add(answer)
    db.commit()
    db.refresh(answer)
    return answer

@router.post("/{session_id}/complete", response_model=InterviewSessionRead)
def complete_interview_session(
    session_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Finalize session, calculate aggregate score, update level unlock, issue certificate & XP."""
    session = db.query(InterviewSession).filter(InterviewSession.id == session_id).first()
    if not session:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Interview session not found.")

    answers = db.query(InterviewAnswer).filter(InterviewAnswer.session_id == session_id).all()
    if answers:
        avg_score = round(sum(a.score or 0 for a in answers) / len(answers), 1)
        avg_content = round(sum(a.content_score or 0 for a in answers) / len(answers), 1)
        avg_delivery = round(sum(a.delivery_score or 0 for a in answers) / len(answers), 1)
        session.score = avg_score
        session.content_score = avg_content
        session.delivery_score = avg_delivery

    session.status = "completed"
    session.completed_at = datetime.now(timezone.utc)

    # Progression logic
    final_score = session.score or 0.0
    progress = db.query(UserProgress).filter(
        UserProgress.user_id == session.user_id,
        UserProgress.category_id == session.category_id
    ).first()

    if not progress:
        progress = UserProgress(
            user_id=session.user_id,
            category_id=session.category_id,
            current_level="easy",
            unlocked_medium=False,
            unlocked_hard=False,
            highest_score=final_score,
            attempts_count=1
        )
        db.add(progress)
    else:
        progress.attempts_count += 1
        if final_score > progress.highest_score:
            progress.highest_score = final_score

    # Check level unlock (Pass requirement: >= 60%)
    if final_score >= 60.0:
        if session.level == "easy":
            progress.unlocked_medium = True
            if progress.current_level == "easy":
                progress.current_level = "medium"
        elif session.level == "medium":
            progress.unlocked_hard = True
            if progress.current_level == "medium":
                progress.current_level = "hard"
        elif session.level == "hard":
            progress.current_level = "mastered"

        # Award XP and streak to user
        user = db.query(User).filter(User.id == session.user_id).first()
        if user:
            user.xp += 100
            user.streak += 1

        # Issue Certificate
        cert_code = f"CERT-{uuid.uuid4().hex[:8].upper()}"
        cat_name = session.category.name if session.category else "General"
        certificate = Certificate(
            certificate_code=cert_code,
            user_id=session.user_id,
            session_id=session.id,
            category_name=cat_name,
            level=session.level,
            score=final_score
        )
        db.add(certificate)

    db.commit()
    db.refresh(session)
    return session

@router.get("/history", response_model=List[InterviewSessionRead])
def get_interview_history(
    category_id: Optional[int] = None,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Retrieve interview session history for authenticated user."""
    query = db.query(InterviewSession).filter(InterviewSession.user_id == current_user.id)
    if category_id:
        query = query.filter(InterviewSession.category_id == category_id)
    return query.order_by(InterviewSession.started_at.desc()).all()

"""Admin dashboard and management endpoints."""
from typing import Dict, Any, List
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.api.deps import get_current_admin
from app.models.user import User
from app.models.category import Category
from app.models.question import Question
from app.models.interview import InterviewSession, Certificate
from app.models.content import Testimonial, ContactMessage
from app.models.game import Game
from app.schemas.game import GameCreate, GameRead

router = APIRouter()

@router.get("/stats", response_model=Dict[str, Any])
def get_admin_dashboard_stats(
    admin: User = Depends(get_current_admin),
    db: Session = Depends(get_db)
):
    """Admin: Overview statistics of users, categories, interviews, pass rate, games."""
    total_users = db.query(User).count()
    students_count = db.query(User).filter(User.role == "student").count()
    total_categories = db.query(Category).count()
    total_questions = db.query(Question).count()
    total_interviews = db.query(InterviewSession).count()
    completed_interviews = db.query(InterviewSession).filter(InterviewSession.status == "completed").count()
    total_certificates = db.query(Certificate).count()
    total_games = db.query(Game).count()
    pending_testimonials = db.query(Testimonial).filter(Testimonial.is_approved == False).count()
    unread_messages = db.query(ContactMessage).filter(ContactMessage.is_read == False).count()

    pass_rate = 0.0
    if completed_interviews > 0:
        pass_rate = round((total_certificates / completed_interviews) * 100.0, 1)

    return {
        "total_users": total_users,
        "students_count": students_count,
        "total_categories": total_categories,
        "total_questions": total_questions,
        "total_interviews": total_interviews,
        "completed_interviews": completed_interviews,
        "total_certificates_issued": total_certificates,
        "total_games": total_games,
        "pass_rate_percentage": pass_rate,
        "pending_testimonials": pending_testimonials,
        "unread_contact_messages": unread_messages
    }

@router.post("/games", response_model=GameRead, status_code=status.HTTP_201_CREATED)
def admin_create_game(
    game_in: GameCreate,
    admin: User = Depends(get_current_admin),
    db: Session = Depends(get_db)
):
    """Admin: Create new quiz, puzzle, or chess challenge."""
    if game_in.category_id:
        category = db.query(Category).filter(Category.id == game_in.category_id).first()
        if not category:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Category not found.")

    game = Game(**game_in.model_dump())
    db.add(game)
    db.commit()
    db.refresh(game)
    return game

@router.delete("/games/{game_id}", status_code=status.HTTP_204_NO_CONTENT)
def admin_delete_game(
    game_id: int,
    admin: User = Depends(get_current_admin),
    db: Session = Depends(get_db)
):
    """Admin: Remove a game/quiz from the platform."""
    game = db.query(Game).filter(Game.id == game_id).first()
    if not game:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Game not found.")
    db.delete(game)
    db.commit()
    return None

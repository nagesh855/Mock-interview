"""Questions endpoints."""
from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.models.question import Question
from app.schemas.question import QuestionCreate, QuestionRead

router = APIRouter()

@router.get("/", response_model=List[QuestionRead])
def get_questions(
    category_id: Optional[int] = None,
    level: Optional[str] = None,
    skip: int = 0,
    limit: int = 50,
    db: Session = Depends(get_db)
):
    """List questions filtered by category and level."""
    query = db.query(Question)
    if category_id is not None:
        query = query.filter(Question.category_id == category_id)
    if level is not None:
        query = query.filter(Question.level == level)
    return query.order_by(Question.order_num.asc()).offset(skip).limit(limit).all()

@router.post("/", response_model=QuestionRead, status_code=status.HTTP_201_CREATED)
def create_question(question_in: QuestionCreate, db: Session = Depends(get_db)):
    """Add a question to a category."""
    question = Question(**question_in.model_dump())
    db.add(question)
    db.commit()
    db.refresh(question)
    return question

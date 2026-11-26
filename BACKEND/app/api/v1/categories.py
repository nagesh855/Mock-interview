"""Exam categories endpoints."""
from typing import List
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.models.category import Category
from app.schemas.category import CategoryCreate, CategoryRead

router = APIRouter()

@router.get("/", response_model=List[CategoryRead])
def get_categories(skip: int = 0, limit: int = 50, db: Session = Depends(get_db)):
    """List all active interview categories."""
    return db.query(Category).filter(Category.is_active == True).offset(skip).limit(limit).all()

@router.post("/", response_model=CategoryRead, status_code=status.HTTP_201_CREATED)
def create_category(category_in: CategoryCreate, db: Session = Depends(get_db)):
    """Create a new exam category."""
    existing = db.query(Category).filter(
        (Category.name == category_in.name) | (Category.slug == category_in.slug)
    ).first()
    if existing:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Category with this name or slug already exists."
        )
    category = Category(**category_in.model_dump())
    db.add(category)
    db.commit()
    db.refresh(category)
    return category

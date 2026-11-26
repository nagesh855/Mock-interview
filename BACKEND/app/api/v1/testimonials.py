"""Testimonials endpoints."""
from typing import List
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.api.deps import get_current_admin
from app.models.user import User
from app.models.content import Testimonial
from app.schemas.content import TestimonialCreate, TestimonialRead

router = APIRouter()

@router.get("/", response_model=List[TestimonialRead])
def get_approved_testimonials(limit: int = 20, db: Session = Depends(get_db)):
    """Public list of approved testimonials."""
    return (
        db.query(Testimonial)
        .filter(Testimonial.is_approved == True)
        .order_by(Testimonial.created_at.desc())
        .limit(limit)
        .all()
    )

@router.post("/", response_model=TestimonialRead, status_code=status.HTTP_201_CREATED)
def submit_testimonial(testimonial_in: TestimonialCreate, db: Session = Depends(get_db)):
    """Public submission of student review/testimonial (pending admin approval)."""
    testimonial = Testimonial(**testimonial_in.model_dump(), is_approved=False)
    db.add(testimonial)
    db.commit()
    db.refresh(testimonial)
    return testimonial

@router.get("/all", response_model=List[TestimonialRead])
def get_all_testimonials_admin(
    admin: User = Depends(get_current_admin),
    db: Session = Depends(get_db)
):
    """Admin: View all testimonials including pending approval."""
    return db.query(Testimonial).order_by(Testimonial.created_at.desc()).all()

@router.put("/{testimonial_id}/approve", response_model=TestimonialRead)
def toggle_testimonial_approval(
    testimonial_id: int,
    approve: bool = True,
    admin: User = Depends(get_current_admin),
    db: Session = Depends(get_db)
):
    """Admin: Approve or un-approve testimonial."""
    testimonial = db.query(Testimonial).filter(Testimonial.id == testimonial_id).first()
    if not testimonial:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Testimonial not found.")
    testimonial.is_approved = approve
    db.commit()
    db.refresh(testimonial)
    return testimonial

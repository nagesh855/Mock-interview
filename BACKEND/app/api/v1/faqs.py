"""FAQ endpoints."""
from typing import List
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.api.deps import get_current_admin
from app.models.user import User
from app.models.content import FAQ
from app.schemas.content import FAQCreate, FAQRead, FAQUpdate

router = APIRouter()

@router.get("/", response_model=List[FAQRead])
def get_public_faqs(category: str = None, db: Session = Depends(get_db)):
    """Public list of active FAQs."""
    query = db.query(FAQ).filter(FAQ.is_active == True)
    if category:
        query = query.filter(FAQ.category == category)
    return query.order_by(FAQ.order_num.asc()).all()

@router.post("/", response_model=FAQRead, status_code=status.HTTP_201_CREATED)
def create_faq(
    faq_in: FAQCreate,
    admin: User = Depends(get_current_admin),
    db: Session = Depends(get_db)
):
    """Admin: Create new FAQ item."""
    faq = FAQ(**faq_in.model_dump())
    db.add(faq)
    db.commit()
    db.refresh(faq)
    return faq

@router.put("/{faq_id}", response_model=FAQRead)
def update_faq(
    faq_id: int,
    faq_in: FAQUpdate,
    admin: User = Depends(get_current_admin),
    db: Session = Depends(get_db)
):
    """Admin: Update an existing FAQ item."""
    faq = db.query(FAQ).filter(FAQ.id == faq_id).first()
    if not faq:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="FAQ not found.")

    for field, val in faq_in.model_dump(exclude_unset=True).items():
        setattr(faq, field, val)

    db.commit()
    db.refresh(faq)
    return faq

@router.delete("/{faq_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_faq(
    faq_id: int,
    admin: User = Depends(get_current_admin),
    db: Session = Depends(get_db)
):
    """Admin: Delete an FAQ item."""
    faq = db.query(FAQ).filter(FAQ.id == faq_id).first()
    if not faq:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="FAQ not found.")
    db.delete(faq)
    db.commit()
    return None

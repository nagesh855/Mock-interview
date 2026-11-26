"""Contact message endpoints."""
from typing import List
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.api.deps import get_current_admin
from app.models.user import User
from app.models.content import ContactMessage
from app.schemas.content import ContactMessageCreate, ContactMessageRead

router = APIRouter()

@router.post("/", response_model=ContactMessageRead, status_code=status.HTTP_201_CREATED)
def submit_contact_message(message_in: ContactMessageCreate, db: Session = Depends(get_db)):
    """Public: Submit contact enquiry or feedback."""
    msg = ContactMessage(**message_in.model_dump())
    db.add(msg)
    db.commit()
    db.refresh(msg)
    return msg

@router.get("/", response_model=List[ContactMessageRead])
def list_contact_messages(
    admin: User = Depends(get_current_admin),
    skip: int = 0,
    limit: int = 50,
    db: Session = Depends(get_db)
):
    """Admin: View submitted contact messages."""
    return db.query(ContactMessage).order_by(ContactMessage.created_at.desc()).offset(skip).limit(limit).all()

@router.put("/{message_id}/read", response_model=ContactMessageRead)
def mark_message_as_read(
    message_id: int,
    admin: User = Depends(get_current_admin),
    db: Session = Depends(get_db)
):
    """Admin: Mark contact message as read."""
    msg = db.query(ContactMessage).filter(ContactMessage.id == message_id).first()
    if not msg:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Message not found.")
    msg.is_read = True
    db.commit()
    db.refresh(msg)
    return msg

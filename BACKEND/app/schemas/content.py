"""Content schemas for FAQs, Testimonials, Contact Messages."""
from datetime import datetime
from typing import Optional
from pydantic import BaseModel, ConfigDict, Field

# FAQ Schemas
class FAQBase(BaseModel):
    question: str
    answer: str
    category: str = "General"
    order_num: int = 1
    is_active: bool = True

class FAQCreate(FAQBase):
    pass

class FAQUpdate(BaseModel):
    question: Optional[str] = None
    answer: Optional[str] = None
    category: Optional[str] = None
    order_num: Optional[int] = None
    is_active: Optional[bool] = None

class FAQRead(FAQBase):
    id: int
    created_at: datetime
    model_config = ConfigDict(from_attributes=True)

# Testimonial Schemas
class TestimonialBase(BaseModel):
    user_name: str
    exam_cleared: Optional[str] = None
    content: str
    rating: int = Field(default=5, ge=1, le=5)

class TestimonialCreate(TestimonialBase):
    pass

class TestimonialRead(TestimonialBase):
    id: int
    is_approved: bool
    created_at: datetime
    model_config = ConfigDict(from_attributes=True)

# Contact Message Schemas
class ContactMessageCreate(BaseModel):
    name: str
    email: str = Field(..., pattern=r"^[^@\s]+@[^@\s]+\.[^@\s]+$")
    phone: Optional[str] = None
    subject: str
    message: str

class ContactMessageRead(ContactMessageCreate):
    id: int
    is_read: bool
    created_at: datetime
    model_config = ConfigDict(from_attributes=True)

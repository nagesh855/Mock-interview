"""User schemas."""
from datetime import datetime
from typing import Optional, List
from pydantic import BaseModel, ConfigDict, Field

class UserBase(BaseModel):
    email: str = Field(..., pattern=r"^[^@\s]+@[^@\s]+\.[^@\s]+$", description="Email address")
    full_name: str
    phone: Optional[str] = None
    role: str = "student"

class UserCreate(UserBase):
    password: str

class UserLogin(BaseModel):
    email: str = Field(..., pattern=r"^[^@\s]+@[^@\s]+\.[^@\s]+$")
    password: str

class UserUpdate(BaseModel):
    full_name: Optional[str] = None
    phone: Optional[str] = None
    avatar_url: Optional[str] = None

class UserProgressRead(BaseModel):
    category_id: int
    category_name: str
    category_slug: str
    current_level: str
    unlocked_medium: bool
    unlocked_hard: bool
    highest_score: float
    attempts_count: int

    model_config = ConfigDict(from_attributes=True)

class UserRead(UserBase):
    id: int
    avatar_url: Optional[str] = None
    is_active: bool
    xp: int
    streak: int
    last_active_at: Optional[datetime] = None
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)

class UserProfileResponse(BaseModel):
    user: UserRead
    progress: List[UserProgressRead] = []
    total_certificates: int = 0
    total_interviews: int = 0

class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: UserRead

class TokenPayload(BaseModel):
    sub: Optional[str] = None
    exp: Optional[int] = None

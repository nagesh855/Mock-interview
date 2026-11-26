"""User and user progression models."""
from sqlalchemy import Column, Integer, String, Boolean, DateTime, Float, ForeignKey
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from app.core.database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    email = Column(String(255), unique=True, index=True, nullable=False)
    hashed_password = Column(String(255), nullable=False)
    full_name = Column(String(100), nullable=False)
    phone = Column(String(20), nullable=True)
    role = Column(String(20), default="student", nullable=False)  # 'student' or 'admin'
    avatar_url = Column(String(500), nullable=True)
    is_active = Column(Boolean, default=True, nullable=False)
    xp = Column(Integer, default=0, nullable=False)
    streak = Column(Integer, default=0, nullable=False)
    last_active_at = Column(DateTime(timezone=True), nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now(), nullable=False)
    updated_at = Column(DateTime(timezone=True), onupdate=func.now(), nullable=True)

    interviews = relationship("InterviewSession", back_populates="user", cascade="all, delete-orphan")
    certificates = relationship("Certificate", back_populates="user", cascade="all, delete-orphan")
    sync_logs = relationship("SyncLog", back_populates="user", cascade="all, delete-orphan")
    progress = relationship("UserProgress", back_populates="user", cascade="all, delete-orphan")

class UserProgress(Base):
    """Tracks level unlocks (Easy -> Medium -> Hard) and XP per exam category."""
    __tablename__ = "user_progress"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    category_id = Column(Integer, ForeignKey("categories.id", ondelete="CASCADE"), nullable=False)
    current_level = Column(String(20), default="easy", nullable=False)  # 'easy', 'medium', 'hard', 'mastered'
    unlocked_medium = Column(Boolean, default=False, nullable=False)
    unlocked_hard = Column(Boolean, default=False, nullable=False)
    highest_score = Column(Float, default=0.0, nullable=False)
    attempts_count = Column(Integer, default=0, nullable=False)
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())

    user = relationship("User", back_populates="progress")
    category = relationship("Category")

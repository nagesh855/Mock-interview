"""Interview sessions, answers, and certificates models."""
from sqlalchemy import Column, Integer, String, Float, Text, DateTime, ForeignKey
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from app.core.database import Base

class InterviewSession(Base):
    __tablename__ = "interview_sessions"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    category_id = Column(Integer, ForeignKey("categories.id", ondelete="SET NULL"), nullable=True)
    level = Column(String(20), default="easy", nullable=False)  # 'easy', 'medium', 'hard'
    interview_type = Column(String(30), default="ai_bot", nullable=False)  # 'ai_bot', 'voice', 'chat', 'peer_video'
    status = Column(String(20), default="in_progress", nullable=False)  # 'in_progress', 'completed', 'abandoned'
    score = Column(Float, nullable=True)  # 0 to 100
    content_score = Column(Float, nullable=True)  # 60% weight
    delivery_score = Column(Float, nullable=True)  # 40% weight
    pace_wpm = Column(Float, nullable=True)
    filler_words_count = Column(Integer, default=0, nullable=False)
    feedback_summary = Column(Text, nullable=True)
    started_at = Column(DateTime(timezone=True), server_default=func.now(), nullable=False)
    completed_at = Column(DateTime(timezone=True), nullable=True)

    user = relationship("User", back_populates="interviews")
    category = relationship("Category", back_populates="interviews")
    answers = relationship("InterviewAnswer", back_populates="session", cascade="all, delete-orphan")
    certificate = relationship("Certificate", back_populates="session", uselist=False)

class InterviewAnswer(Base):
    __tablename__ = "interview_answers"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    session_id = Column(Integer, ForeignKey("interview_sessions.id", ondelete="CASCADE"), nullable=False)
    question_id = Column(Integer, ForeignKey("questions.id", ondelete="SET NULL"), nullable=True)
    user_answer = Column(Text, nullable=False)
    score = Column(Float, nullable=True)
    content_score = Column(Float, nullable=True)
    delivery_score = Column(Float, nullable=True)
    filler_words = Column(Text, nullable=True)
    missed_points = Column(Text, nullable=True)
    better_suggestion = Column(Text, nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now(), nullable=False)

    session = relationship("InterviewSession", back_populates="answers")
    question = relationship("Question", back_populates="answers")

class Certificate(Base):
    __tablename__ = "certificates"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    certificate_code = Column(String(50), unique=True, index=True, nullable=False)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    session_id = Column(Integer, ForeignKey("interview_sessions.id", ondelete="SET NULL"), nullable=True)
    category_name = Column(String(100), nullable=False)
    level = Column(String(20), nullable=False)
    score = Column(Float, nullable=False)
    issued_at = Column(DateTime(timezone=True), server_default=func.now(), nullable=False)
    pdf_path = Column(String(500), nullable=True)

    user = relationship("User", back_populates="certificates")
    session = relationship("InterviewSession", back_populates="certificate")

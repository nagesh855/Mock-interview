"""Interview question model."""
from sqlalchemy import Column, Integer, String, Text, DateTime, ForeignKey
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from app.core.database import Base

class Question(Base):
    __tablename__ = "questions"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    category_id = Column(Integer, ForeignKey("categories.id", ondelete="CASCADE"), nullable=False)
    level = Column(String(20), default="easy", nullable=False)  # 'easy', 'medium', 'hard'
    text = Column(Text, nullable=False)
    expected_points = Column(Text, nullable=True)  # JSON-encoded array or comma-separated keywords
    sample_answer = Column(Text, nullable=True)
    order_num = Column(Integer, default=1, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now(), nullable=False)

    category = relationship("Category", back_populates="questions")
    answers = relationship("InterviewAnswer", back_populates="question")

"""Interview and Certificate schemas."""
from datetime import datetime
from typing import Optional, List
from pydantic import BaseModel, ConfigDict

class InterviewAnswerCreate(BaseModel):
    question_id: int
    user_answer: str

class InterviewAnswerRead(BaseModel):
    id: int
    session_id: int
    question_id: Optional[int] = None
    user_answer: str
    score: Optional[float] = None
    content_score: Optional[float] = None
    delivery_score: Optional[float] = None
    filler_words: Optional[str] = None
    missed_points: Optional[str] = None
    better_suggestion: Optional[str] = None
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)

class InterviewSessionCreate(BaseModel):
    category_id: int
    level: str = "easy"
    interview_type: str = "ai_bot"

class InterviewSessionRead(BaseModel):
    id: int
    user_id: int
    category_id: Optional[int] = None
    level: str
    interview_type: str
    status: str
    score: Optional[float] = None
    content_score: Optional[float] = None
    delivery_score: Optional[float] = None
    pace_wpm: Optional[float] = None
    filler_words_count: int = 0
    feedback_summary: Optional[str] = None
    started_at: datetime
    completed_at: Optional[datetime] = None
    answers: List[InterviewAnswerRead] = []

    model_config = ConfigDict(from_attributes=True)

class CertificateRead(BaseModel):
    id: int
    certificate_code: str
    user_id: int
    session_id: Optional[int] = None
    category_name: str
    level: str
    score: float
    issued_at: datetime
    pdf_path: Optional[str] = None

    model_config = ConfigDict(from_attributes=True)

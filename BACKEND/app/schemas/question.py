"""Question schemas."""
from datetime import datetime
from typing import Optional
from pydantic import BaseModel, ConfigDict

class QuestionBase(BaseModel):
    category_id: int
    level: str = "easy"  # 'easy', 'medium', 'hard'
    text: str
    expected_points: Optional[str] = None
    sample_answer: Optional[str] = None
    order_num: int = 1

class QuestionCreate(QuestionBase):
    pass

class QuestionRead(QuestionBase):
    id: int
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)

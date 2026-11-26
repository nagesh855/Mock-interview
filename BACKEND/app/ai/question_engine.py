"""Offline rule-based question engine for competitive exams."""
from typing import List, Dict, Any
from sqlalchemy.orm import Session
from app.models.question import Question

class QuestionEngine:
    """Selects and sequences questions based on category, level and progression."""

    @staticmethod
    def get_questions_for_interview(
        db: Session,
        category_id: int,
        level: str = "easy",
        limit: int = 5
    ) -> List[Question]:
        """Fetch sequenced questions for interview session."""
        questions = (
            db.query(Question)
            .filter(Question.category_id == category_id, Question.level == level)
            .order_by(Question.order_num.asc())
            .limit(limit)
            .all()
        )
        return questions

    @staticmethod
    def get_sample_questions() -> List[Dict[str, Any]]:
        """Default question seeds for competitive exams."""
        return [
            {
                "category_slug": "upsc",
                "level": "easy",
                "text": "Introduce yourself and explain why you want to join the Civil Services.",
                "expected_points": "background, motivation, integrity, public service orientation",
                "sample_answer": "I have completed my education and aspire to contribute directly to grassroot policy implementation and public welfare.",
                "order_num": 1
            },
            {
                "category_slug": "appsc",
                "level": "easy",
                "text": "What are the key socio-economic challenges currently facing Andhra Pradesh?",
                "expected_points": "agriculture, industrial growth, welfare schemes, fiscal management",
                "sample_answer": "Balancing infrastructure investment with social welfare distribution and rural industrialization.",
                "order_num": 1
            }
        ]

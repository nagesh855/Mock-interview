"""Game and multiplayer quiz/puzzle/chess model."""
from sqlalchemy import Column, Integer, String, Text, Boolean, DateTime, ForeignKey
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from app.core.database import Base

class Game(Base):
    __tablename__ = "games"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    category_id = Column(Integer, ForeignKey("categories.id", ondelete="SET NULL"), nullable=True)
    title = Column(String(200), nullable=False)
    game_type = Column(String(50), nullable=False)  # 'quiz', 'puzzle', 'chess'
    config_json = Column(Text, nullable=False)  # JSON-encoded payload: questions, cards, or FEN moves
    xp_reward = Column(Integer, default=50, nullable=False)
    is_active = Column(Boolean, default=True, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now(), nullable=False)

    category = relationship("Category")

"""Game and quiz schemas."""
from datetime import datetime
from typing import Optional
from pydantic import BaseModel, ConfigDict, Field

class GameBase(BaseModel):
    category_id: Optional[int] = None
    title: str = Field(..., min_length=3, max_length=200)
    game_type: str = Field(..., pattern=r"^(quiz|puzzle|chess)$", description="Type of game: quiz, puzzle, or chess")
    config_json: str
    xp_reward: int = Field(default=50, ge=10, le=500)
    is_active: bool = True

class GameCreate(GameBase):
    pass

class GameRead(GameBase):
    id: int
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)

class GameCompleteResponse(BaseModel):
    game_id: int
    xp_awarded: int
    total_xp: int
    message: str

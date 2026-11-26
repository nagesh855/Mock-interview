"""Games, quizzes, puzzles, and chess endpoints."""
from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.api.deps import get_current_user
from app.models.user import User
from app.models.game import Game
from app.schemas.game import GameRead, GameCompleteResponse

router = APIRouter()

@router.get("/", response_model=List[GameRead])
def get_games(
    category_id: Optional[int] = None,
    game_type: Optional[str] = None,
    skip: int = 0,
    limit: int = 50,
    db: Session = Depends(get_db)
):
    """Retrieve list of active games, quizzes, and chess puzzles."""
    query = db.query(Game).filter(Game.is_active == True)
    if category_id is not None:
        query = query.filter(Game.category_id == category_id)
    if game_type is not None:
        query = query.filter(Game.game_type == game_type.lower())

    return query.order_by(Game.created_at.desc()).offset(skip).limit(limit).all()

@router.get("/{game_id}", response_model=GameRead)
def get_game_by_id(game_id: int, db: Session = Depends(get_db)):
    """Retrieve specific game configuration."""
    game = db.query(Game).filter(Game.id == game_id, Game.is_active == True).first()
    if not game:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Game not found.")
    return game

@router.post("/{game_id}/complete", response_model=GameCompleteResponse)
def complete_game(
    game_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Submit completed game/puzzle/quiz and earn XP points."""
    game = db.query(Game).filter(Game.id == game_id, Game.is_active == True).first()
    if not game:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Game not found.")

    # Award XP to user
    xp_gained = game.xp_reward
    current_user.xp += xp_gained
    db.commit()
    db.refresh(current_user)

    return GameCompleteResponse(
        game_id=game.id,
        xp_awarded=xp_gained,
        total_xp=current_user.xp,
        message=f"Congratulations! You completed '{game.title}' and earned {xp_gained} XP."
    )

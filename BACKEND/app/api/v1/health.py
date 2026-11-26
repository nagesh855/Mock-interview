"""Health check endpoint."""
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import text
from app.core.config import settings
from app.core.database import get_db

router = APIRouter()

@router.get("/health", summary="Application health status")
def health_check(db: Session = Depends(get_db)):
    """Check API and SQLite database health status."""
    db_status = "healthy"
    try:
        db.execute(text("SELECT 1"))
    except Exception as e:
        db_status = f"unhealthy: {str(e)}"

    return {
        "status": "ok" if db_status == "healthy" else "degraded",
        "app": settings.PROJECT_NAME,
        "environment": settings.ENVIRONMENT,
        "database": db_status
    }

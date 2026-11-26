"""User profile, progression, and local avatar upload endpoints."""
import os
import uuid
from typing import List
from fastapi import APIRouter, Depends, HTTPException, status, UploadFile, File
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.api.deps import get_current_user
from app.models.user import User, UserProgress
from app.models.category import Category
from app.models.interview import InterviewSession, Certificate
from app.schemas.user import UserRead, UserUpdate, UserProgressRead, UserProfileResponse

router = APIRouter()

ALLOWED_AVATAR_EXTENSIONS = {".jpg", ".jpeg", ".png", ".webp"}
ALLOWED_MIME_TYPES = {"image/jpeg", "image/png", "image/webp"}
MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024  # 5 MB

@router.get("/me", response_model=UserProfileResponse)
def get_user_profile(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Retrieve current user profile, category level unlocks, and stats."""
    categories = db.query(Category).filter(Category.is_active == True).all()
    for cat in categories:
        prog = db.query(UserProgress).filter(
            UserProgress.user_id == current_user.id,
            UserProgress.category_id == cat.id
        ).first()
        if not prog:
            prog = UserProgress(
                user_id=current_user.id,
                category_id=cat.id,
                current_level="easy",
                unlocked_medium=False,
                unlocked_hard=False,
                highest_score=0.0
            )
            db.add(prog)
    db.commit()

    progress_records = (
        db.query(UserProgress, Category)
        .join(Category, UserProgress.category_id == Category.id)
        .filter(UserProgress.user_id == current_user.id)
        .all()
    )

    progress_list = [
        UserProgressRead(
            category_id=cat.id,
            category_name=cat.name,
            category_slug=cat.slug,
            current_level=prog.current_level,
            unlocked_medium=prog.unlocked_medium,
            unlocked_hard=prog.unlocked_hard,
            highest_score=prog.highest_score,
            attempts_count=prog.attempts_count
        )
        for prog, cat in progress_records
    ]

    cert_count = db.query(Certificate).filter(Certificate.user_id == current_user.id).count()
    interview_count = db.query(InterviewSession).filter(InterviewSession.user_id == current_user.id).count()

    return UserProfileResponse(
        user=current_user,
        progress=progress_list,
        total_certificates=cert_count,
        total_interviews=interview_count
    )

@router.put("/me", response_model=UserRead)
def update_user_profile(
    user_update: UserUpdate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Update profile details (name, phone)."""
    if user_update.full_name is not None:
        current_user.full_name = user_update.full_name
    if user_update.phone is not None:
        current_user.phone = user_update.phone
    if user_update.avatar_url is not None:
        current_user.avatar_url = user_update.avatar_url

    db.commit()
    db.refresh(current_user)
    return current_user

@router.post("/me/avatar", response_model=UserRead)
async def upload_avatar(
    file: UploadFile = File(...),
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Upload and save profile avatar image locally with offline fallback."""
    # 1. Validate file extension
    ext = os.path.splitext(file.filename)[1].lower() if file.filename else ""
    if ext not in ALLOWED_AVATAR_EXTENSIONS:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Unsupported file extension '{ext}'. Allowed extensions: {', '.join(ALLOWED_AVATAR_EXTENSIONS)}"
        )

    # 2. Validate MIME type
    if file.content_type not in ALLOWED_MIME_TYPES:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Invalid image type '{file.content_type}'. Must be JPEG, PNG, or WebP."
        )

    # 3. Read content and validate size
    content = await file.read()
    if len(content) > MAX_FILE_SIZE_BYTES:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"File exceeds maximum allowed size of 5 MB."
        )

    # 4. Save to uploads/avatars/
    upload_dir = os.path.join("uploads", "avatars")
    os.makedirs(upload_dir, exist_ok=True)
    unique_filename = f"avatar_{current_user.id}_{uuid.uuid4().hex[:8]}{ext}"
    filepath = os.path.join(upload_dir, unique_filename)

    with open(filepath, "wb") as f:
        f.write(content)

    # 5. Update user avatar URL
    current_user.avatar_url = f"/uploads/avatars/{unique_filename}"
    db.commit()
    db.refresh(current_user)
    return current_user

@router.get("/me/progress", response_model=List[UserProgressRead])
def get_user_progress(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Get category-wise unlocked levels (Easy, Medium, Hard)."""
    progress_records = (
        db.query(UserProgress, Category)
        .join(Category, UserProgress.category_id == Category.id)
        .filter(UserProgress.user_id == current_user.id)
        .all()
    )
    return [
        UserProgressRead(
            category_id=cat.id,
            category_name=cat.name,
            category_slug=cat.slug,
            current_level=prog.current_level,
            unlocked_medium=prog.unlocked_medium,
            unlocked_hard=prog.unlocked_hard,
            highest_score=prog.highest_score,
            attempts_count=prog.attempts_count
        )
        for prog, cat in progress_records
    ]

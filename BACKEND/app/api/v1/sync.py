"""Offline sync queue endpoints."""
import json
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.models.sync import SyncLog
from app.schemas.sync import SyncPushRequest, SyncPushResponse

router = APIRouter()

@router.post("/push", response_model=SyncPushResponse)
def sync_push(payload: SyncPushRequest, user_id: int = 1, db: Session = Depends(get_db)):
    """Receive offline IndexedDB queue actions and sync to SQLite database."""
    synced_count = 0
    for item in payload.items:
        existing = db.query(SyncLog).filter(SyncLog.client_sync_id == item.client_sync_id).first()
        if not existing:
            log_entry = SyncLog(
                client_sync_id=item.client_sync_id,
                user_id=user_id,
                entity_type=item.entity_type,
                status="synced",
                payload=json.dumps(item.payload)
            )
            db.add(log_entry)
            synced_count += 1

    db.commit()
    return {"synced_count": synced_count, "status": "success"}

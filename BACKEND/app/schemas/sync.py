"""Sync schemas."""
from typing import Any, Dict, List
from pydantic import BaseModel

class SyncItem(BaseModel):
    client_sync_id: str
    entity_type: str  # e.g., 'interview_session'
    payload: Dict[str, Any]

class SyncPushRequest(BaseModel):
    items: List[SyncItem]

class SyncPushResponse(BaseModel):
    synced_count: int
    status: str = "success"

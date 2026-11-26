"""WebRTC WebSocket signaling manager for peer-to-peer video mock interviews."""
import json
from typing import Dict, List
from fastapi import APIRouter, WebSocket, WebSocketDisconnect

router = APIRouter()

class ConnectionManager:
    """Manages active WebRTC signaling rooms and message relaying."""

    def __init__(self):
        # Maps room_id -> list of active WebSocket connections
        self.rooms: Dict[str, List[WebSocket]] = {}

    async def connect(self, room_id: str, websocket: WebSocket):
        """Accept connection and register peer in room."""
        await websocket.accept()
        if room_id not in self.rooms:
            self.rooms[room_id] = []
        
        self.rooms[room_id].append(websocket)
        peer_index = len(self.rooms[room_id])

        # Notify the connecting peer of their connection status
        await websocket.send_text(json.dumps({
            "type": "connected",
            "room_id": room_id,
            "peer_count": peer_index
        }))

        # If a second peer joined, notify the first peer that a peer is ready
        if peer_index > 1:
            for peer in self.rooms[room_id]:
                if peer != websocket:
                    await peer.send_text(json.dumps({
                        "type": "peer_joined",
                        "room_id": room_id
                    }))

    def disconnect(self, room_id: str, websocket: WebSocket):
        """Unregister peer and cleanup empty rooms."""
        if room_id in self.rooms and websocket in self.rooms[room_id]:
            self.rooms[room_id].remove(websocket)
            if not self.rooms[room_id]:
                del self.rooms[room_id]

    async def notify_peer_left(self, room_id: str, exiting_peer: WebSocket):
        """Notify remaining peer in room that partner disconnected."""
        if room_id in self.rooms:
            for peer in self.rooms[room_id]:
                if peer != exiting_peer:
                    try:
                        await peer.send_text(json.dumps({
                            "type": "peer_left",
                            "room_id": room_id
                        }))
                    except Exception:
                        pass

    async def broadcast_to_peer(self, room_id: str, message: str, sender: WebSocket):
        """Relay WebRTC signaling message (offer, answer, candidate) to the other peer."""
        if room_id in self.rooms:
            for peer in self.rooms[room_id]:
                if peer != sender:
                    await peer.send_text(message)

manager = ConnectionManager()

@router.websocket("/ws/signaling/{room_id}")
async def websocket_signaling_endpoint(websocket: WebSocket, room_id: str):
    """WebRTC signaling room: forwards SDP offer/answer and ICE candidates."""
    await manager.connect(room_id, websocket)
    try:
        while True:
            data = await websocket.receive_text()
            # Relay the message (offer, answer, candidate) to the other peer in the room
            await manager.broadcast_to_peer(room_id, data, sender=websocket)
    except WebSocketDisconnect:
        await manager.notify_peer_left(room_id, websocket)
        manager.disconnect(room_id, websocket)
    except Exception:
        await manager.notify_peer_left(room_id, websocket)
        manager.disconnect(room_id, websocket)

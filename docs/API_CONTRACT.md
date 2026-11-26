# 📋 Frontend API Integration Contract & Specification

> **Base URL:** `http://localhost:8000` (or `http://<laptop-ip>:8000` for classroom Wi-Fi)  
> **API Prefix:** `/api/v1`  
> **Interactive Swagger UI:** `http://localhost:8000/docs`  
> **WebSocket Signaling:** `ws://localhost:8000/ws/signaling/{room_id}`

---

## 🔐 Authentication & Headers

Protected endpoints require the JWT access token in the `Authorization` HTTP header:
```http
Authorization: Bearer <access_token>
```

### Standard Error Response Format
When any error occurs, the API returns a structured JSON object:
```json
{
  "detail": "Descriptive error message.",
  "status_code": 400
}
```

---

## 📌 Complete Endpoint Reference

### 1. Health & Server Status
#### `GET /api/v1/health`
- **Auth:** None (Public)
- **Response `200 OK`:**
```json
{
  "status": "ok",
  "app": "AI Mock Interview Practice",
  "environment": "development",
  "database": "healthy"
}
```

---

### 2. Authentication

#### `POST /api/v1/auth/register`
- **Auth:** None (Public, Rate Limited)
- **Request Body:**
```json
{
  "email": "student@example.com",
  "password": "SecurePassword123!",
  "full_name": "Praveen Kumar",
  "phone": "9876543210",
  "role": "student"
}
```
- **Response `201 Created`:**
```json
{
  "id": 1,
  "email": "student@example.com",
  "full_name": "Praveen Kumar",
  "phone": "9876543210",
  "role": "student",
  "avatar_url": null,
  "is_active": true,
  "xp": 0,
  "streak": 0,
  "created_at": "2026-11-26T00:00:00Z"
}
```

#### `POST /api/v1/auth/login`
- **Auth:** None (Public, Rate Limited)
- **Request Body:**
```json
{
  "email": "student@example.com",
  "password": "SecurePassword123!"
}
```
- **Response `200 OK`:**
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsIn...",
  "token_type": "bearer",
  "user": {
    "id": 1,
    "email": "student@example.com",
    "full_name": "Praveen Kumar",
    "role": "student",
    "xp": 0,
    "streak": 0
  }
}
```

---

### 3. User Profile & Avatar Upload

#### `GET /api/v1/users/me`
- **Auth:** Bearer Token
- **Response `200 OK`:**
```json
{
  "user": {
    "id": 1,
    "email": "student@example.com",
    "full_name": "Praveen Kumar",
    "phone": "9876543210",
    "role": "student",
    "avatar_url": "/uploads/avatars/avatar_1_a1b2c3d4.png",
    "xp": 150,
    "streak": 3
  },
  "progress": [
    {
      "category_id": 1,
      "category_name": "UPSC Civil Services",
      "category_slug": "upsc",
      "current_level": "medium",
      "unlocked_medium": true,
      "unlocked_hard": false,
      "highest_score": 85.2,
      "attempts_count": 2
    }
  ],
  "total_certificates": 1,
  "total_interviews": 2
}
```

#### `PUT /api/v1/users/me`
- **Auth:** Bearer Token
- **Request Body:**
```json
{
  "full_name": "Praveen Kumar IAS",
  "phone": "9998887776"
}
```

#### `POST /api/v1/users/me/avatar`
- **Auth:** Bearer Token
- **Content-Type:** `multipart/form-data`
- **Form Key:** `file` (Image: `.jpg`, `.jpeg`, `.png`, `.webp`, max 5MB)
- **Response `200 OK`:** Returns updated User object with `avatar_url` (e.g. `/uploads/avatars/avatar_1_xyz.png`).

---

### 4. Categories & Question Bank

#### `GET /api/v1/categories/`
- **Auth:** None (Public)
- **Response `200 OK`:**
```json
[
  {
    "id": 1,
    "name": "UPSC Civil Services",
    "slug": "upsc",
    "icon": "🏛️",
    "description": "IAS, IPS personality test mock interviews."
  },
  {
    "id": 2,
    "name": "APPSC Group 1 & 2",
    "slug": "appsc",
    "icon": "🌾",
    "description": "Andhra Pradesh state administration interviews."
  }
]
```

#### `GET /api/v1/questions/`
- **Auth:** None (Public)
- **Query Params:** `category_id` (int), `level` (`easy` | `medium` | `hard`)
- **Example:** `GET /api/v1/questions/?category_id=1&level=easy`
- **Response `200 OK`:**
```json
[
  {
    "id": 1,
    "category_id": 1,
    "level": "easy",
    "text": "Why do you want to join the Civil Services?",
    "expected_points": "public service, policy execution, integrity",
    "order_num": 1
  }
]
```

---

### 5. Mock Interview Flow (Easy $\rightarrow$ Medium $\rightarrow$ Hard)

#### `POST /api/v1/interviews/start`
- **Auth:** Bearer Token
- **Request Body:**
```json
{
  "category_id": 1,
  "level": "easy",
  "interview_type": "ai_bot"
}
```
*Note: Requesting `medium` or `hard` before unlocking will return `403 Forbidden`.*

#### `POST /api/v1/interviews/{session_id}/answer`
- **Auth:** None / Bearer Token
- **Query Params:** `duration_seconds` (float, default 30.0 for speaking pace WPM)
- **Request Body:**
```json
{
  "question_id": 1,
  "user_answer": "My primary goal is public welfare and grassroots policy execution with integrity."
}
```
- **Response `200 OK`:**
```json
{
  "id": 10,
  "session_id": 1,
  "question_id": 1,
  "user_answer": "My primary goal is...",
  "score": 92.5,
  "content_score": 100.0,
  "delivery_score": 81.2,
  "filler_words": "0",
  "missed_points": "",
  "better_suggestion": "Good answer! Keep practicing."
}
```

#### `POST /api/v1/interviews/{session_id}/complete`
- **Auth:** Bearer Token
- **Response `200 OK`:** Returns completed session. If overall score $\ge 60\%$:
  - Automatically unlocks next level (`medium` or `hard`).
  - Awards **+100 XP** and increases user streak.
  - Automatically issues Certificate.

#### `GET /api/v1/interviews/history`
- **Auth:** Bearer Token
- **Response `200 OK`:** List of user's past interview sessions with scores and dates.

---

### 6. Certificates & PDF Download

#### `GET /api/v1/certificates/my`
- **Auth:** Bearer Token
- **Response `200 OK`:** List of user certificates.

#### `GET /api/v1/certificates/{id}/pdf`
- **Auth:** None (Public download)
- **Response:** Raw binary PDF (`Content-Type: application/pdf`) suitable for inline display `<iframe src="...">` or download `<a download>`.

#### `GET /api/v1/certificates/verify/{certificate_code}`
- **Auth:** None (Public QR / link validation)
- **Response `200 OK`:**
```json
{
  "id": 1,
  "certificate_code": "CERT-83C4736B",
  "category_name": "UPSC Civil Services",
  "level": "easy",
  "score": 85.2,
  "issued_at": "2026-11-26T00:00:00Z"
}
```

---

### 7. Public Content & Admin Endpoints

- `GET /api/v1/faqs/` — List active FAQs.
- `GET /api/v1/testimonials/` — List approved testimonials.
- `POST /api/v1/testimonials/` — Submit a testimonial review.
- `POST /api/v1/contact/` — Submit contact enquiry message.
- `GET /api/v1/admin/stats` — Admin dashboard summary (requires admin Bearer token).

---

### 8. Games, Quizzes, Puzzles & Chess Challenges

#### `GET /api/v1/games/`
- **Auth:** None / Bearer Token
- **Query Params:** `category_id` (optional int), `game_type` (optional `quiz` | `puzzle` | `chess`)
- **Response `200 OK`:**
```json
[
  {
    "id": 1,
    "category_id": 1,
    "title": "Indian Polity & Constitution Speed Quiz",
    "game_type": "quiz",
    "xp_reward": 50,
    "is_active": true,
    "config_json": "{\"time_limit_seconds\": 60, \"questions\": [...]}",
    "created_at": "2026-11-26T00:00:00Z"
  },
  {
    "id": 2,
    "category_id": 2,
    "title": "AP Development Schemes Chronology Puzzle",
    "game_type": "puzzle",
    "xp_reward": 75,
    "is_active": true,
    "config_json": "{\"items\": [...], \"correct_order\": [\"a\",\"b\",\"c\",\"d\"]}",
    "created_at": "2026-11-26T00:00:00Z"
  },
  {
    "id": 3,
    "category_id": 4,
    "title": "SSB Tactical Decision: Knight Fork Challenge",
    "game_type": "chess",
    "xp_reward": 100,
    "is_active": true,
    "config_json": "{\"fen\": \"...\", \"winning_moves\": [\"Bxf7+\", \"Kxf7\", \"Nxe5+\"]}",
    "created_at": "2026-11-26T00:00:00Z"
  }
]
```

#### `GET /api/v1/games/{id}`
- **Auth:** None / Bearer Token
- **Response `200 OK`:** Returns individual game with complete `config_json` payload.

#### `POST /api/v1/games/{id}/complete`
- **Auth:** Bearer Token (Student)
- **Response `200 OK`:**
```json
{
  "game_id": 1,
  "xp_awarded": 50,
  "total_xp": 250,
  "message": "Congratulations! You completed 'Indian Polity & Constitution Speed Quiz' and earned 50 XP."
}
```

#### `POST /api/v1/admin/games`
- **Auth:** Bearer Token (`admin` only)
- **Request Body:**
```json
{
  "category_id": 1,
  "title": "UPSC Rapid Fire Quiz",
  "game_type": "quiz",
  "config_json": "{\"questions\": []}",
  "xp_reward": 50
}
```
- **Response `201 Created`**

#### `DELETE /api/v1/admin/games/{id}`
- **Auth:** Bearer Token (`admin` only)
- **Response `204 No Content`**

---

### 9. Offline IndexedDB Sync

#### `POST /api/v1/sync/push`
- **Auth:** Bearer Token
- **Request Body:**
```json
{
  "items": [
    {
      "client_sync_id": "uuid-v4-client-generated",
      "entity_type": "offline_interview_session",
      "payload": {
        "category_id": 1,
        "score": 84.0,
        "answers": []
      }
    }
  ]
}
```
- **Response `200 OK`:** `{"synced_count": 1, "status": "success"}`

---

## 📹 Peer-to-Peer WebRTC Signaling Protocol

### WebSocket Connection
- **URL:** `ws://<backend-host>:8000/ws/signaling/{room_id}`
- **Room ID:** Any string (e.g., `room-42` or `room-ap-group1`).

### Signaling Message Types (JSON)

#### 1. Connection Event (Server $\rightarrow$ Client)
Sent immediately upon connecting:
```json
{
  "type": "connected",
  "room_id": "room-42",
  "peer_count": 1
}
```

#### 2. Peer Joined Event (Server $\rightarrow$ Existing Peer)
Sent to Peer 1 when Peer 2 enters the room:
```json
{
  "type": "peer_joined",
  "room_id": "room-42"
}
```

#### 3. SDP Offer (Peer 1 $\rightarrow$ Server $\rightarrow$ Peer 2)
```json
{
  "type": "offer",
  "sdp": "v=0\r\no=alice..."
}
```

#### 4. SDP Answer (Peer 2 $\rightarrow$ Server $\rightarrow$ Peer 1)
```json
{
  "type": "answer",
  "sdp": "v=0\r\no=bob..."
}
```

#### 5. ICE Candidate (Peer $\rightarrow$ Server $\rightarrow$ Other Peer)
```json
{
  "type": "candidate",
  "candidate": "candidate:1 1 UDP 2130706431 127.0.0.1 5000 typ host..."
}
```

#### 6. Peer Left Event (Server $\rightarrow$ Remaining Peer)
Sent when a peer disconnects:
```json
{
  "type": "peer_left",
  "room_id": "room-42"
}
```

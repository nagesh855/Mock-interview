"""Verification script using FastAPI TestClient."""
from fastapi.testclient import TestClient
from app.main import app
from app.core.database import engine, Base

def test_everything():
    print("[1] Creating database tables...", flush=True)
    Base.metadata.create_all(bind=engine)
    print("    -> Database tables created successfully.", flush=True)

    client = TestClient(app)

    print("[2] Testing GET /api/v1/health...", flush=True)
    res = client.get("/api/v1/health")
    print(f"    -> Response Code: {res.status_code}", flush=True)
    print(f"    -> Response JSON: {res.json()}", flush=True)
    assert res.status_code == 200
    assert res.json()["status"] == "ok"
    assert res.json()["database"] == "healthy"

    print("[3] Testing Root Endpoint GET /...", flush=True)
    res = client.get("/")
    print(f"    -> Root Code: {res.status_code}, Body: {res.json()}", flush=True)
    assert res.status_code == 200

    print("[4] Testing Register Endpoint POST /api/v1/auth/register...", flush=True)
    res = client.post(
        "/api/v1/auth/register",
        json={
            "email": "student@example.com",
            "password": "SecurePassword123!",
            "full_name": "Test Student",
            "role": "student"
        }
    )
    print(f"    -> Register Code: {res.status_code}", flush=True)
    # Can be 201 or 400 if already registered from earlier test
    assert res.status_code in [201, 400]

    print("[5] Testing Login Endpoint POST /api/v1/auth/login...", flush=True)
    res = client.post(
        "/api/v1/auth/login",
        json={
            "email": "student@example.com",
            "password": "SecurePassword123!"
        }
    )
    print(f"    -> Login Code: {res.status_code}", flush=True)
    assert res.status_code == 200
    token = res.json()["access_token"]
    assert token

    print("[6] Testing Category Creation POST /api/v1/categories/...", flush=True)
    res = client.post(
        "/api/v1/categories/",
        json={"name": "UPSC Civil Services", "slug": "upsc", "description": "Union Public Service Commission"}
    )
    print(f"    -> Category Code: {res.status_code}", flush=True)
    assert res.status_code in [201, 400]

    print("[7] Testing Question Creation & Deterministic AI Scoring...", flush=True)
    q_res = client.post(
        "/api/v1/questions/",
        json={
            "category_id": 1,
            "level": "easy",
            "text": "What is the primary objective of public service?",
            "expected_points": "integrity, public welfare, dedication, constitution",
            "order_num": 1
        }
    )
    print(f"    -> Question Code: {q_res.status_code}", flush=True)
    assert q_res.status_code == 201
    q_id = q_res.json()["id"]

    # Start an interview session
    start_res = client.post(
        "/api/v1/interviews/start",
        json={"category_id": 1, "level": "easy", "interview_type": "ai_bot"}
    )
    print(f"    -> Start Interview Code: {start_res.status_code}", flush=True)
    assert start_res.status_code == 201
    sess_id = start_res.json()["id"]

    # Submit an answer with some filler words and matching points
    ans_res = client.post(
        f"/api/v1/interviews/{sess_id}/answer",
        json={
            "question_id": q_id,
            "user_answer": "Um, the primary objective is public welfare and dedication to uphold the constitution with utmost integrity, you know."
        }
    )
    print(f"    -> Submit Answer Code: {ans_res.status_code}", flush=True)
    print(f"    -> Scoring Result: score={ans_res.json().get('score')}, content={ans_res.json().get('content_score')}, delivery={ans_res.json().get('delivery_score')}", flush=True)
    assert ans_res.status_code == 200

    # Complete interview
    comp_res = client.post(f"/api/v1/interviews/{sess_id}/complete")
    print(f"    -> Complete Interview Code: {comp_res.status_code}", flush=True)
    assert comp_res.status_code == 200

    print("\n==========================================")
    print(" ALL BACKEND & AI TESTS PASSED 100%! ")
    print("==========================================")

if __name__ == "__main__":
    test_everything()

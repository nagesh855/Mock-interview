"""Integration tests for Phase 5: Games, quizzes, puzzles, chess, and XP rewards."""
import json
import pytest
from fastapi.testclient import TestClient
from app.main import app
from app.core.database import SessionLocal
from app.core.seed import seed_database
from app.models.game import Game
from app.models.user import User

def test_games_module():
    print("\n--- [STEP 1] Running Seed Script for Games ---", flush=True)
    seed_database()

    db = SessionLocal()
    games_count = db.query(Game).count()
    db.close()
    print(f"    -> Seeded Games count: {games_count} (Expected >= 3)", flush=True)
    assert games_count >= 3

    with TestClient(app) as client:
        # Admin login
        admin_login = client.post(
            "/api/v1/auth/login",
            json={"email": "admin@mockinterview.local", "password": "AdminSecret123!"}
        )
        assert admin_login.status_code == 200
        admin_token = admin_login.json()["access_token"]
        admin_headers = {"Authorization": f"Bearer {admin_token}"}

        # Student login
        student_login = client.post(
            "/api/v1/auth/login",
            json={"email": "student@mockinterview.local", "password": "StudentPass123!"}
        )
        assert student_login.status_code == 200
        student_token = student_login.json()["access_token"]
        student_headers = {"Authorization": f"Bearer {student_token}"}
        prev_xp = student_login.json()["user"]["xp"]

        print("\n--- [STEP 2] Testing GET /api/v1/games with filtering ---", flush=True)
        # List all games
        all_games = client.get("/api/v1/games/").json()
        assert len(all_games) >= 3
        types = {g["game_type"] for g in all_games}
        assert "quiz" in types
        assert "puzzle" in types
        assert "chess" in types
        print(f"    -> Verified available game types: {types}", flush=True)

        # Filter by quiz
        quizzes = client.get("/api/v1/games/?game_type=quiz").json()
        assert all(g["game_type"] == "quiz" for g in quizzes)
        assert len(quizzes) >= 1
        print("    -> Quiz filtering verified.", flush=True)

        # Filter by chess
        chess_puzzles = client.get("/api/v1/games/?game_type=chess").json()
        assert all(g["game_type"] == "chess" for g in chess_puzzles)
        assert len(chess_puzzles) >= 1
        chess_id = chess_puzzles[0]["id"]
        print("    -> Chess filtering verified.", flush=True)

        print("\n--- [STEP 3] Testing Game Completion & XP Reward ---", flush=True)
        complete_res = client.post(f"/api/v1/games/{chess_id}/complete", headers=student_headers)
        assert complete_res.status_code == 200
        comp_data = complete_res.json()
        reward = comp_data["xp_awarded"]
        assert reward == chess_puzzles[0]["xp_reward"]
        assert comp_data["total_xp"] == prev_xp + reward
        print(f"    -> Game completed! Awarded {reward} XP. New Total XP: {comp_data['total_xp']}", flush=True)

        print("\n--- [STEP 4] Testing Admin Games CRUD & RBAC Guard ---", flush=True)
        # 1. Student attempting to create game -> 403 Forbidden
        student_create = client.post(
            "/api/v1/admin/games",
            json={
                "title": "Unauthorized Game",
                "game_type": "quiz",
                "config_json": "{}",
                "xp_reward": 50
            },
            headers=student_headers
        )
        assert student_create.status_code == 403
        print("    -> RBAC Guard: Student correctly denied from creating games (403).", flush=True)

        # 2. Admin creating game -> 201 Created
        admin_create = client.post(
            "/api/v1/admin/games",
            json={
                "title": "New Constable Law Quiz",
                "game_type": "quiz",
                "config_json": json.dumps({"questions": [{"prompt": "Test?", "options": ["A", "B"], "correct_index": 0}]}),
                "xp_reward": 60
            },
            headers=admin_headers
        )
        assert admin_create.status_code == 201
        created_game_id = admin_create.json()["id"]
        print(f"    -> Admin successfully created new game with ID {created_game_id}.", flush=True)

        # 3. Admin deleting game -> 204 No Content
        del_res = client.delete(f"/api/v1/admin/games/{created_game_id}", headers=admin_headers)
        assert del_res.status_code == 204

        # 4. Confirm deleted
        get_deleted = client.get(f"/api/v1/games/{created_game_id}")
        assert get_deleted.status_code == 404
        print("    -> Admin successfully deleted game (verified 404).", flush=True)

if __name__ == "__main__":
    test_games_module()

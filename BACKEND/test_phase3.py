"""Comprehensive Phase 3 Test Suite: Seed, Auth, Level Unlocking, Admin, Sync & WebRTC Signaling."""
import json
import pytest
from fastapi.testclient import TestClient
from app.main import app
from app.core.database import SessionLocal, engine, Base
from app.core.seed import seed_database
from app.models.category import Category
from app.models.question import Question
from app.models.user import User

def test_full_phase3_suite():
    print("\n--- [STEP 1] Running Seed Script ---", flush=True)
    seed_database()

    db = SessionLocal()
    categories_count = db.query(Category).count()
    questions_count = db.query(Question).count()
    print(f"    -> Seeded Categories count: {categories_count} (Expected >= 8)", flush=True)
    print(f"    -> Seeded Questions count: {questions_count} (Expected >= 24)", flush=True)
    assert categories_count >= 8
    assert questions_count >= 24
    db.close()

    with TestClient(app) as client:
        print("\n--- [STEP 2] Testing Auth with Seeded Accounts ---", flush=True)
        # 1. Admin login
        admin_login = client.post(
            "/api/v1/auth/login",
            json={"email": "admin@mockinterview.local", "password": "AdminSecret123!"}
        )
        assert admin_login.status_code == 200
        admin_token = admin_login.json()["access_token"]
        admin_headers = {"Authorization": f"Bearer {admin_token}"}
        print("    -> Admin logged in successfully with JWT token.", flush=True)

        # 2. Student login
        student_login = client.post(
            "/api/v1/auth/login",
            json={"email": "student@mockinterview.local", "password": "StudentPass123!"}
        )
        assert student_login.status_code == 200
        student_token = student_login.json()["access_token"]
        student_headers = {"Authorization": f"Bearer {student_token}"}
        print("    -> Student logged in successfully with JWT token.", flush=True)

        print("\n--- [STEP 3] Testing User Profile & Progress ---", flush=True)
        profile_res = client.get("/api/v1/users/me", headers=student_headers)
        assert profile_res.status_code == 200
        profile_data = profile_res.json()
        assert "Praveen Kumar" in profile_data["user"]["full_name"]
        assert len(profile_data["progress"]) >= 8
        print(f"    -> Profile retrieved for {profile_data['user']['full_name']} with {len(profile_data['progress'])} exam tracks.", flush=True)

        # Update profile
        update_res = client.put(
            "/api/v1/users/me",
            json={"phone": "9998887776", "full_name": "Praveen Kumar IAS"},
            headers=student_headers
        )
        assert update_res.status_code == 200
        assert update_res.json()["phone"] == "9998887776"
        print("    -> Profile updated successfully.", flush=True)

        print("\n--- [STEP 4] Testing Level Unlocking (Easy -> Medium) ---", flush=True)
        # Fetch UPSC category
        cat_res = client.get("/api/v1/categories/")
        assert cat_res.status_code == 200
        upsc_cat = next(c for c in cat_res.json() if c["slug"] == "upsc")
        upsc_id = upsc_cat["id"]

        # Register a fresh student to test level unlocking idempotently
        import uuid
        fresh_email = f"student_{uuid.uuid4().hex[:6]}@example.com"
        reg_res = client.post(
            "/api/v1/auth/register",
            json={"email": fresh_email, "password": "StudentPass123!", "full_name": "Progress Tester", "role": "student"}
        )
        assert reg_res.status_code == 201

        login_res = client.post(
            "/api/v1/auth/login",
            json={"email": fresh_email, "password": "StudentPass123!"}
        )
        assert login_res.status_code == 200
        fresh_token = login_res.json()["access_token"]
        fresh_headers = {"Authorization": f"Bearer {fresh_token}"}

        # Attempt to start Medium level before unlocking -> Expect 403 Forbidden
        medium_fail = client.post(
            "/api/v1/interviews/start",
            json={"category_id": upsc_id, "level": "medium", "interview_type": "ai_bot"},
            headers=fresh_headers
        )
        print(f"    -> Medium level before unlock: Status {medium_fail.status_code} ({medium_fail.json().get('detail')})", flush=True)
        assert medium_fail.status_code == 403

        # Start Easy level
        easy_start = client.post(
            "/api/v1/interviews/start",
            json={"category_id": upsc_id, "level": "easy", "interview_type": "ai_bot"},
            headers=fresh_headers
        )
        assert easy_start.status_code == 201
        session_id = easy_start.json()["id"]

        # Get questions for UPSC Easy
        questions_res = client.get(f"/api/v1/questions/?category_id={upsc_id}&level=easy")
        q_id = questions_res.json()[0]["id"]

        # Submit well-formed answer with high content match
        ans_res = client.post(
            f"/api/v1/interviews/{session_id}/answer",
            json={
                "question_id": q_id,
                "user_answer": "I have a strong public service motivation and wish to impact grassroots policy execution while upholding integrity and diverse constitutional responsibilities."
            },
            headers=fresh_headers
        )
        assert ans_res.status_code == 200
        eval_score = ans_res.json()["score"]
        print(f"    -> Answer evaluated: Score={eval_score}, Content={ans_res.json()['content_score']}, Delivery={ans_res.json()['delivery_score']}", flush=True)
        assert eval_score >= 60.0

        # Complete interview session
        comp_res = client.post(f"/api/v1/interviews/{session_id}/complete", headers=fresh_headers)
        assert comp_res.status_code == 200
        print("    -> Interview completed. Checking Medium level unlock...", flush=True)

        # Check that Medium level is now unlocked!
        medium_success = client.post(
            "/api/v1/interviews/start",
            json={"category_id": upsc_id, "level": "medium", "interview_type": "ai_bot"},
            headers=fresh_headers
        )
        print(f"    -> Medium level after unlock: Status {medium_success.status_code}", flush=True)
        assert medium_success.status_code == 201

        # Check Certificates earned
        certs_res = client.get("/api/v1/certificates/my", headers=fresh_headers)
        assert certs_res.status_code == 200
        assert len(certs_res.json()) >= 1
        cert_code = certs_res.json()[0]["certificate_code"]
        print(f"    -> Certificate issued successfully: {cert_code}", flush=True)

        # Verify certificate publicly by code
        verify_res = client.get(f"/api/v1/certificates/verify/{cert_code}")
        assert verify_res.status_code == 200
        assert verify_res.json()["certificate_code"] == cert_code
        print("    -> Certificate public verification verified.", flush=True)

        # Check Interview History
        hist_res = client.get("/api/v1/interviews/history", headers=student_headers)
        assert hist_res.status_code == 200
        assert len(hist_res.json()) >= 1
        print(f"    -> Interview history retrieved: {len(hist_res.json())} sessions.", flush=True)

        print("\n--- [STEP 5] Testing Admin Endpoints (FAQs, Testimonials, Contact, Stats) ---", flush=True)
        # 1. FAQs
        faq_res = client.get("/api/v1/faqs/")
        assert faq_res.status_code == 200
        assert len(faq_res.json()) >= 4
        print(f"    -> FAQs listed: {len(faq_res.json())} items.", flush=True)

        # 2. Testimonials
        testim_submit = client.post(
            "/api/v1/testimonials/",
            json={"user_name": "Ravi Teja", "exam_cleared": "DSC Qualified", "content": "The mock practice was phenomenal!", "rating": 5}
        )
        assert testim_submit.status_code == 201
        testim_id = testim_submit.json()["id"]

        # Admin approves testimonial
        approve_res = client.put(f"/api/v1/testimonials/{testim_id}/approve?approve=true", headers=admin_headers)
        assert approve_res.status_code == 200
        assert approve_res.json()["is_approved"] is True
        print("    -> Testimonial submitted and approved by admin.", flush=True)

        # 3. Contact Message
        contact_res = client.post(
            "/api/v1/contact/",
            json={"name": "Anil", "email": "anil@example.com", "subject": "Question bank request", "message": "Please add more questions for APPSC Group 2."}
        )
        assert contact_res.status_code == 201
        print("    -> Contact enquiry submitted.", flush=True)

        # 4. Admin Dashboard Stats
        stats_res = client.get("/api/v1/admin/stats", headers=admin_headers)
        assert stats_res.status_code == 200
        stats = stats_res.json()
        print(f"    -> Admin Stats: {json.dumps(stats, indent=2)}", flush=True)
        assert stats["total_categories"] >= 8
        assert stats["total_certificates_issued"] >= 1

        print("\n--- [STEP 6] Testing Offline Sync Queue ---", flush=True)
        unique_sync_id = f"client-sync-{uuid.uuid4().hex}"
        sync_res = client.post(
            "/api/v1/sync/push",
            json={
                "items": [
                    {
                        "client_sync_id": unique_sync_id,
                        "entity_type": "offline_interview_attempt",
                        "payload": {"score": 88, "level": "easy", "category": "upsc"}
                    }
                ]
            },
            headers=student_headers
        )
        assert sync_res.status_code == 200
        assert sync_res.json()["synced_count"] == 1
        print("    -> Offline sync queue successfully persisted.", flush=True)

        print("\n--- [STEP 7] Testing WebRTC WebSocket Signaling Endpoint ---", flush=True)
        room_name = "mock-interview-room-42"

        # Peer 1 connects to room
        with client.websocket_connect(f"/ws/signaling/{room_name}") as ws1:
            msg1 = json.loads(ws1.receive_text())
            assert msg1["type"] == "connected"
            assert msg1["peer_count"] == 1
            print("    -> Peer 1 connected to signaling room.", flush=True)

            # Peer 2 connects to the same room
            with client.websocket_connect(f"/ws/signaling/{room_name}") as ws2:
                msg2 = json.loads(ws2.receive_text())
                assert msg2["type"] == "connected"
                assert msg2["peer_count"] == 2
                print("    -> Peer 2 connected to signaling room.", flush=True)

                # Peer 1 should receive peer_joined event
                joined_event = json.loads(ws1.receive_text())
                assert joined_event["type"] == "peer_joined"
                print("    -> Peer 1 received 'peer_joined' notification.", flush=True)

                # Peer 1 sends SDP Offer
                offer_payload = {"type": "offer", "sdp": "v=0\r\no=peer1 12345 1 IN IP4 127.0.0.1"}
                ws1.send_text(json.dumps(offer_payload))

                # Peer 2 should receive the exact offer
                received_offer = json.loads(ws2.receive_text())
                assert received_offer["type"] == "offer"
                assert received_offer["sdp"] == offer_payload["sdp"]
                print("    -> WebRTC SDP Offer forwarded to Peer 2 successfully.", flush=True)

                # Peer 2 sends SDP Answer
                answer_payload = {"type": "answer", "sdp": "v=0\r\no=peer2 67890 1 IN IP4 127.0.0.1"}
                ws2.send_text(json.dumps(answer_payload))

                # Peer 1 should receive the answer
                received_answer = json.loads(ws1.receive_text())
                assert received_answer["type"] == "answer"
                assert received_answer["sdp"] == answer_payload["sdp"]
                print("    -> WebRTC SDP Answer forwarded to Peer 1 successfully.", flush=True)

                # Peer 1 sends ICE Candidate
                candidate_payload = {"type": "candidate", "candidate": "candidate:1 1 UDP 2130706431 127.0.0.1 5000"}
                ws1.send_text(json.dumps(candidate_payload))

                received_candidate = json.loads(ws2.receive_text())
                assert received_candidate["type"] == "candidate"
                print("    -> WebRTC ICE Candidate forwarded successfully.", flush=True)

            # After Peer 2 exits, Peer 1 should receive peer_left event
            left_event = json.loads(ws1.receive_text())
            assert left_event["type"] == "peer_left"
            print("    -> Peer 1 received 'peer_left' event when Peer 2 disconnected.", flush=True)

    print("\n=======================================================")
    print(" ALL 7 PHASE 3 INTEGRATION TEST SUITES PASSED 100%! ")
    print("=======================================================\n")

if __name__ == "__main__":
    test_full_phase3_suite()

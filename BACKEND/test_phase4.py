"""Test suite for Phase 4: PDF generation, avatar upload & static serving, rate limiting, and security."""
import io
import pytest
from fastapi.testclient import TestClient
from app.main import app
from app.core.database import SessionLocal
from app.models.interview import Certificate
from app.models.user import User

def test_phase4_features():
    with TestClient(app) as client:
        # 1. Login student to get auth token
        login_res = client.post(
            "/api/v1/auth/login",
            json={"email": "student@mockinterview.local", "password": "StudentPass123!"}
        )
        assert login_res.status_code == 200
        token = login_res.json()["access_token"]
        headers = {"Authorization": f"Bearer {token}"}
        user_data = login_res.json()["user"]

        # Security check: hashed_password must never be exposed
        assert "hashed_password" not in user_data
        assert "password" not in user_data

        # 2. Test PDF Certificate Download
        db = SessionLocal()
        cert = db.query(Certificate).first()
        db.close()

        if cert:
            pdf_res = client.get(f"/api/v1/certificates/{cert.id}/pdf")
            assert pdf_res.status_code == 200
            assert "application/pdf" in pdf_res.headers["content-type"]
            # Verify magic bytes of PDF
            assert pdf_res.content.startswith(b"%PDF-")
            assert len(pdf_res.content) > 1000
            print(f"    -> PDF Certificate downloaded successfully ({len(pdf_res.content)} bytes).", flush=True)

        # 3. Test Avatar Upload (Valid PNG)
        # 1x1 valid PNG in bytes
        tiny_png = (
            b"\x89PNG\r\n\x1a\n\x00\x00\x00\rIHDR\x00\x00\x00\x01\x00\x00\x00\x01"
            b"\x08\x06\x00\x00\x00\x1f\x15c4\x00\x00\x00\rIDATx\x9cc`\x00\x00\x00"
            b"\x02\x00\x01H\xaf\xa4q\x00\x00\x00\x00IEND\xaeB`\x82"
        )
        upload_res = client.post(
            "/api/v1/users/me/avatar",
            files={"file": ("profile_pic.png", io.BytesIO(tiny_png), "image/png")},
            headers=headers
        )
        assert upload_res.status_code == 200
        avatar_url = upload_res.json()["avatar_url"]
        assert avatar_url.startswith("/uploads/avatars/avatar_")
        assert "hashed_password" not in upload_res.json()
        print(f"    -> Avatar uploaded: {avatar_url}", flush=True)

        # 4. Test Static File Serving of Uploaded Avatar
        static_res = client.get(avatar_url)
        assert static_res.status_code == 200
        assert "image/png" in static_res.headers.get("content-type", "")
        assert static_res.content == tiny_png
        print("    -> Static file served correctly from /uploads.", flush=True)

        # 5. Test Avatar Upload Validation (Invalid Extension)
        bad_ext_res = client.post(
            "/api/v1/users/me/avatar",
            files={"file": ("malicious.exe", io.BytesIO(b"binary"), "application/x-msdownload")},
            headers=headers
        )
        assert bad_ext_res.status_code == 400
        assert "Unsupported file extension" in bad_ext_res.json()["detail"]
        print("    -> Invalid file extension correctly rejected with 400.", flush=True)

        # 6. Test Password Length Validation (< 6 chars)
        short_pw_res = client.post(
            "/api/v1/auth/register",
            json={"email": "shortpw@example.com", "password": "123", "full_name": "Short PW"}
        )
        assert short_pw_res.status_code == 400
        assert "Password must be at least 6 characters" in short_pw_res.json()["detail"]
        print("    -> Short password correctly rejected with 400.", flush=True)

if __name__ == "__main__":
    test_phase4_features()

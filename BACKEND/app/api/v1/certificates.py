"""Certificates endpoints including PDF generation."""
from typing import List
from fastapi import APIRouter, Depends, HTTPException, status, Response
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.api.deps import get_current_user
from app.models.user import User
from app.models.interview import Certificate
from app.schemas.interview import CertificateRead
from app.core.pdf import generate_certificate_pdf

router = APIRouter()

@router.get("/my", response_model=List[CertificateRead])
def get_my_certificates(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Retrieve all certificates earned by the authenticated user."""
    return db.query(Certificate).filter(Certificate.user_id == current_user.id).order_by(Certificate.issued_at.desc()).all()

@router.get("/{certificate_id}", response_model=CertificateRead)
def get_certificate_by_id(certificate_id: int, db: Session = Depends(get_db)):
    """Retrieve certificate by ID."""
    cert = db.query(Certificate).filter(Certificate.id == certificate_id).first()
    if not cert:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Certificate not found.")
    return cert

@router.get("/verify/{certificate_code}", response_model=CertificateRead)
def verify_certificate_code(certificate_code: str, db: Session = Depends(get_db)):
    """Public certificate verification endpoint by unique code."""
    cert = db.query(Certificate).filter(Certificate.certificate_code == certificate_code).first()
    if not cert:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Certificate code is invalid or not found.")
    return cert

@router.get("/{certificate_id}/pdf")
def download_certificate_pdf(certificate_id: int, db: Session = Depends(get_db)):
    """Generate and download offline-rendered PDF certificate."""
    cert = db.query(Certificate).filter(Certificate.id == certificate_id).first()
    if not cert:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Certificate not found.")

    student_name = cert.user.full_name if cert.user else "Candidate"
    pdf_bytes = generate_certificate_pdf(
        student_name=student_name,
        category_name=cert.category_name,
        level=cert.level,
        score=cert.score,
        certificate_code=cert.certificate_code,
        issued_at=cert.issued_at
    )

    return Response(
        content=pdf_bytes,
        media_type="application/pdf",
        headers={
            "Content-Disposition": f"inline; filename=Certificate_{cert.certificate_code}.pdf",
            "Content-Length": str(len(pdf_bytes))
        }
    )

"""API v1 Router aggregation."""
from fastapi import APIRouter
from app.api.v1 import (
    health,
    auth,
    users,
    categories,
    questions,
    interviews,
    certificates,
    faqs,
    testimonials,
    contact,
    admin,
    sync,
)

api_router = APIRouter()

api_router.include_router(health.router, tags=["Health"])
api_router.include_router(auth.router, prefix="/auth", tags=["Auth"])
api_router.include_router(users.router, prefix="/users", tags=["Users"])
api_router.include_router(categories.router, prefix="/categories", tags=["Categories"])
api_router.include_router(questions.router, prefix="/questions", tags=["Questions"])
api_router.include_router(interviews.router, prefix="/interviews", tags=["Interviews"])
api_router.include_router(certificates.router, prefix="/certificates", tags=["Certificates"])
api_router.include_router(faqs.router, prefix="/faqs", tags=["FAQs"])
api_router.include_router(testimonials.router, prefix="/testimonials", tags=["Testimonials"])
api_router.include_router(contact.router, prefix="/contact", tags=["Contact"])
api_router.include_router(admin.router, prefix="/admin", tags=["Admin"])
api_router.include_router(sync.router, prefix="/sync", tags=["Sync"])

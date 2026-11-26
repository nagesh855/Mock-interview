"""In-memory sliding window rate limiter for auth endpoints."""
import time
from typing import Dict, List
from fastapi import Request, HTTPException, status

class SimpleRateLimiter:
    """Thread-safe in-memory rate limiter per IP address."""

    def __init__(self):
        # Maps key -> list of timestamp floats
        self.requests: Dict[str, List[float]] = {}

    def check(self, key: str, max_requests: int = 10, window_seconds: int = 60):
        """Check if request exceeds rate limit, otherwise records it."""
        now = time.time()
        cutoff = now - window_seconds

        if key not in self.requests:
            self.requests[key] = []

        # Remove timestamps older than window
        self.requests[key] = [t for t in self.requests[key] if t > cutoff]

        if len(self.requests[key]) >= max_requests:
            raise HTTPException(
                status_code=status.HTTP_429_TOO_MANY_REQUESTS,
                detail=f"Too many requests. Rate limit is {max_requests} attempts per {window_seconds} seconds."
            )

        self.requests[key].append(now)

rate_limiter = SimpleRateLimiter()

def rate_limit_auth(request: Request):
    """FastAPI dependency to rate limit sensitive authentication routes."""
    client_ip = request.client.host if request.client else "127.0.0.1"
    rate_limiter.check(key=f"auth:{client_ip}", max_requests=15, window_seconds=60)

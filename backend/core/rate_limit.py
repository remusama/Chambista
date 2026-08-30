import time
from collections import defaultdict
from fastapi import Request, HTTPException, status
from typing import Dict, List

class InMemoryRateLimiter:
    def __init__(self, requests_limit: int, window_seconds: int):
        self.requests_limit = requests_limit
        self.window_seconds = window_seconds
        # key -> list of timestamps
        self.history: Dict[str, List[float]] = defaultdict(list)

    def is_rate_limited(self, key: str) -> bool:
        now = time.time()
        # Filter timestamps outside the window
        self.history[key] = [t for t in self.history[key] if now - t < self.window_seconds]
        
        if len(self.history[key]) >= self.requests_limit:
            return True
            
        self.history[key].append(now)
        return False

# Limit login to 5 attempts per minute per IP
login_limiter = InMemoryRateLimiter(requests_limit=5, window_seconds=60)
# Limit registration to 3 attempts per minute per IP
register_limiter = InMemoryRateLimiter(requests_limit=3, window_seconds=60)

async def limit_login(request: Request):
    # Use client IP as rate limit key
    client_ip = request.client.host if request.client else "unknown"
    if login_limiter.is_rate_limited(client_ip):
        raise HTTPException(
            status_code=status.HTTP_429_TOO_MANY_REQUESTS,
            detail="Demasiados intentos de inicio de sesión. Por favor intenta de nuevo en un minuto."
        )

async def limit_register(request: Request):
    client_ip = request.client.host if request.client else "unknown"
    if register_limiter.is_rate_limited(client_ip):
        raise HTTPException(
            status_code=status.HTTP_429_TOO_MANY_REQUESTS,
            detail="Demasiados intentos de registro. Por favor intenta de nuevo en un minuto."
        )

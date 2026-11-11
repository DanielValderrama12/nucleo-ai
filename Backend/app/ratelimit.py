import time
from collections import defaultdict, deque

from fastapi import HTTPException, Request


class RateLimiter:
    """Permite como máximo `max_requests` solicitudes por visitante (IP)
    dentro de una ventana de `window_seconds` segundos."""

    def __init__(self, max_requests: int, window_seconds: int):
        self.max_requests = max_requests
        self.window = window_seconds
        self.hits: dict[str, deque[float]] = defaultdict(deque)

    def __call__(self, request: Request) -> None:
        ip = request.client.host if request.client else "desconocido"
        now = time.monotonic()
        hits = self.hits[ip]

        while hits and now - hits[0] > self.window:
            hits.popleft()

        if len(hits) >= self.max_requests:
            raise HTTPException(
                status_code=429,
                detail="Demasiadas solicitudes. Intenta de nuevo en un momento.",
            )
        hits.append(now)
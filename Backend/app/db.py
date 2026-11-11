import os
from pathlib import Path

import psycopg
from dotenv import load_dotenv

load_dotenv(Path(__file__).resolve().parent.parent / ".env")


def get_connection() -> psycopg.Connection:
    url = os.environ.get("DATABASE_URL")
    if not url:
        raise RuntimeError("Falta la variable DATABASE_URL en backend/.env")
    return psycopg.connect(url)


def init_db() -> None:
    """Crea las tablas si todavía no existen."""
    with get_connection() as conn:
        conn.execute(
            """
            CREATE TABLE IF NOT EXISTS contacts (
                id SERIAL PRIMARY KEY,
                received_at TIMESTAMPTZ NOT NULL DEFAULT now(),
                name TEXT NOT NULL,
                business TEXT NOT NULL DEFAULT '',
                email TEXT NOT NULL,
                phone TEXT NOT NULL DEFAULT '',
                message TEXT NOT NULL
            )
            """
        )
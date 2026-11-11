from app.db import get_connection


def save_contact(data: dict) -> None:
    """Guarda un contacto en la tabla contacts de PostgreSQL."""
    with get_connection() as conn:
        conn.execute(
            """
            INSERT INTO contacts (name, business, email, phone, message)
            VALUES (%s, %s, %s, %s, %s)
            """,
            (
                data["name"],
                data["business"],
                data["email"],
                data["phone"],
                data["message"],
            ),
        )
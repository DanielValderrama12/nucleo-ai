import json
from datetime import datetime, timezone
from pathlib import Path

CONTACTS_PATH = Path(__file__).resolve().parent.parent / "data" / "contacts.jsonl"


def save_contact(data: dict) -> None:
    """Agrega un contacto como una línea JSON al archivo contacts.jsonl."""
    record = {"received_at": datetime.now(timezone.utc).isoformat(), **data}
    with open(CONTACTS_PATH, "a", encoding="utf-8") as f:
        f.write(json.dumps(record, ensure_ascii=False) + "\n")
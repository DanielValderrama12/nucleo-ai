import json
import re
import unicodedata
from pathlib import Path

CATALOG_PATH = Path(__file__).resolve().parent.parent / "data" / "catalog.json"


def _load() -> list[dict]:
    with open(CATALOG_PATH, encoding="utf-8") as f:
        return json.load(f)


PRODUCTS = _load()


def normalize(text: str) -> str:
    """Pasa a minúsculas y quita tildes y signos: 'Lácteos' -> 'lacteos'."""
    text = unicodedata.normalize("NFD", text.lower())
    text = "".join(c for c in text if unicodedata.category(c) != "Mn")
    return re.sub(r"[^a-z0-9 ]", " ", text)


def _singular(word: str) -> str:
    """'huevos' -> 'huevo', para que plural y singular coincidan."""
    return word[:-1] if len(word) > 3 and word.endswith("s") else word


def search_products(query: str) -> list[dict]:
    tokens = [_singular(t) for t in normalize(query).split() if len(t) > 2]
    if not tokens:
        return []
    results = []
    for product in PRODUCTS:
        haystack = normalize(f"{product['name']} {product['category']}")
        if all(token in haystack for token in tokens):
            results.append(product)
    return results


def get_promotions() -> list[dict]:
    return [p for p in PRODUCTS if p["promo_price"] is not None]


def list_products(category: str | None = None) -> list[dict]:
    if not category:
        return PRODUCTS
    wanted = normalize(category).strip()
    return [p for p in PRODUCTS if normalize(p["category"]).strip() == wanted]
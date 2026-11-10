"""Motor del asistente de la demo.

Todas las respuestas salen del catálogo (catalog.json):
el asistente nunca inventa precios ni existencias.
"""

from app import catalog

STORE_NAME = "Supermercado La Canasta"

# Pedidos de prueba registrados mientras el servidor está encendido
ORDERS: list[dict] = []

NUMBER_WORDS = {
    "un": 1, "uno": 1, "una": 1, "dos": 2, "tres": 3, "cuatro": 4,
    "cinco": 5, "seis": 6, "siete": 7, "ocho": 8, "nueve": 9, "diez": 10,
}

GREETING_WORDS = {"hola", "buenas", "buenos", "dias", "tardes", "noches", "saludos", "hey"}
THANKS_WORDS = {"gracias", "chao", "adios"}
PRICE_WORDS = {"cuanto", "cuesta", "cuestan", "vale", "valen", "precio", "precios", "costo"}
ORDER_WORDS = {
    "pedido", "pedidos", "pedir", "quiero", "quisiera", "necesito", "agregar",
    "agrega", "agregame", "anade", "anadir", "comprar", "llevar", "llevo",
    "ordenar", "dame", "deme", "regalame",
}
AVAIL_WORDS = {
    "tienen", "tiene", "tengo", "hay", "disponible", "disponibles",
    "disponibilidad", "existencia", "existencias", "venden", "manejan",
    "queda", "quedan",
}
FILLER_WORDS = {
    "que", "cual", "cuales", "cuanta", "cuantos", "cuantas", "el", "la", "los",
    "las", "de", "del", "al", "y", "o", "me", "mi", "mis", "su", "sus", "en",
    "se", "a", "es", "son", "hacer", "favor", "por", "para", "con", "sin",
    "algun", "alguna", "algunos", "algunas", "producto", "productos", "puedes",
    "pueden", "podria", "podrias", "ayuda", "ayudar", "unidad", "unidades",
}
HUMAN_WORDS = {"asesor", "asesora", "humano", "humana", "persona", "operador", "operadora"}
CONFIRM_WORDS = {"confirmar", "confirmo", "finalizar", "finalizo", "pagar"}
CLEAR_WORDS = {"vaciar", "cancelar", "borrar", "limpiar"}
PROMO_WORDS = {"oferta", "ofertas", "descuento", "descuentos", "rebaja", "rebajas"}

SKIP_WORDS = (
    GREETING_WORDS | THANKS_WORDS | PRICE_WORDS | ORDER_WORDS
    | AVAIL_WORDS | FILLER_WORDS | set(NUMBER_WORDS)
)


# ---------- utilidades ----------

def _money(amount: int) -> str:
    return "$" + f"{amount:,}".replace(",", ".")


def _unit_price(product: dict) -> int:
    promo = product["promo_price"]
    return promo if promo is not None else product["price"]


def _by_id(product_id: int) -> dict:
    return next(p for p in catalog.PRODUCTS if p["id"] == product_id)


def _product_line(product: dict) -> str:
    name = product["name"]
    if product["stock"] == 0:
        return f"- {name}: agotado por ahora"
    if product["promo_price"] is not None:
        return (
            f"- {name}: {_money(product['promo_price'])} "
            f"(antes {_money(product['price'])}) · {product['stock']} disponibles"
        )
    return f"- {name}: {_money(product['price'])} · {product['stock']} disponibles"


def _keywords(tokens: list[str]) -> list[str]:
    result = []
    for token in tokens:
        if token in SKIP_WORDS:
            continue
        if token.isdigit() and len(token) <= 2:
            continue
        result.append(token)
    return result


def _explicit_quantity(tokens: list[str]) -> int | None:
    for token in tokens:
        if token.isdigit() and len(token) <= 2:
            return int(token)
        if token in NUMBER_WORDS:
            return NUMBER_WORDS[token]
    return None


def _leading_quantity(tokens: list[str]) -> int | None:
    if tokens and (
        (tokens[0].isdigit() and len(tokens[0]) <= 2) or tokens[0] in NUMBER_WORDS
    ):
        return _explicit_quantity(tokens[:1])
    return None


def _find(keywords: list[str]) -> list[dict]:
    if not keywords:
        return []
    results = catalog.search_products(" ".join(keywords))
    if results:
        return results
    found: dict[int, dict] = {}
    for keyword in keywords:
        for product in catalog.search_products(keyword):
            found[product["id"]] = product
    return list(found.values())


def _clean_cart(cart: list[dict]) -> list[dict]:
    valid_ids = {p["id"] for p in catalog.PRODUCTS}
    merged: dict[int, int] = {}
    for item in cart:
        product_id, qty = item.get("id"), item.get("qty")
        if product_id in valid_ids and isinstance(qty, int) and qty > 0:
            merged[product_id] = min(merged.get(product_id, 0) + qty, 99)
    return [{"id": pid, "qty": qty} for pid, qty in merged.items()]


def _cart_text(cart: list[dict]) -> tuple[str, int]:
    total = 0
    lines = []
    for item in cart:
        product = _by_id(item["id"])
        subtotal = _unit_price(product) * item["qty"]
        total += subtotal
        lines.append(f"- {item['qty']} x {product['name']}: {_money(subtotal)}")
    lines.append(f"Total: {_money(total)}")
    return "\n".join(lines), total


# ---------- respuestas ----------

def _overview() -> str:
    counts: dict[str, int] = {}
    for product in catalog.PRODUCTS:
        if product["stock"] > 0:
            counts[product["category"]] = counts.get(product["category"], 0) + 1
    lines = [f"- {category} ({n} productos)" for category, n in counts.items()]
    return (
        f"En {STORE_NAME} tenemos productos disponibles en estas categorías:\n"
        + "\n".join(lines)
        + "\n\nEscríbeme una categoría o un producto (por ejemplo «lácteos» "
        "o «arroz») y te muestro precios y existencias."
    )


def _promotions() -> str:
    promos = [p for p in catalog.get_promotions() if p["stock"] > 0]
    if not promos:
        return "Por ahora no tenemos promociones activas."
    return "Estas son nuestras promociones:\n" + "\n".join(_product_line(p) for p in promos)


def _show_products(keywords: list[str]) -> str:
    results = _find(keywords)
    if not results:
        return (
            "No encontré ese producto en nuestro catálogo. "
            "Puedes preguntarme «¿qué productos tienen disponibles?» "
            "para ver las categorías."
        )
    return "Esto encontré:\n" + "\n".join(_product_line(p) for p in results)


def _handle_order(keywords: list[str], qty: int, cart: list[dict]) -> tuple[str, list[dict]]:
    if not keywords:
        return (
            "¡Claro, hagamos tu pedido! Dime qué productos quieres y la cantidad. "
            "Por ejemplo: «quiero 2 leches enteras» o «1 arroz blanco». "
            "Cuando termines, escribe «confirmar pedido».",
            cart,
        )

    results = _find(keywords)
    if not results:
        return (
            "No encontré ese producto en nuestro catálogo, así que no lo agregué. "
            "Pregúntame «¿qué productos tienen disponibles?» para ver qué tenemos.",
            cart,
        )

    if len(results) > 1:
        options = "\n".join(f"- {p['name']}" for p in results)
        example = results[0]["name"].lower()
        return (
            f"Tengo varias opciones, ¿cuál prefieres?\n{options}\n\n"
            f"Escríbeme por ejemplo: «quiero {qty} {example}».",
            cart,
        )

    product = results[0]
    if product["stock"] == 0:
        return f"Lo siento, {product['name']} está agotado por ahora.", cart

    in_cart = sum(i["qty"] for i in cart if i["id"] == product["id"])
    available = product["stock"] - in_cart
    if qty > available:
        return (
            f"Solo me quedan {available} unidades disponibles de {product['name']} "
            "para tu pedido.",
            cart,
        )

    new_cart = [dict(i) for i in cart]
    for item in new_cart:
        if item["id"] == product["id"]:
            item["qty"] += qty
            break
    else:
        new_cart.append({"id": product["id"], "qty": qty})

    text, _ = _cart_text(new_cart)
    return (
        f"Agregué {qty} x {product['name']} a tu pedido.\n\n"
        f"Tu pedido hasta ahora:\n{text}\n\n"
        "¿Quieres agregar algo más o confirmamos? (escribe «confirmar pedido»)",
        new_cart,
    )


def _show_cart(cart: list[dict]) -> tuple[str, list[dict]]:
    if not cart:
        return "Tu pedido está vacío por ahora. Dime qué quieres agregar.", cart
    text, _ = _cart_text(cart)
    return f"Tu pedido hasta ahora:\n{text}", cart


def _confirm(cart: list[dict]) -> tuple[str, list[dict]]:
    if not cart:
        return "Tu pedido está vacío, no hay nada que confirmar todavía.", cart
    text, total = _cart_text(cart)
    ORDERS.append({"items": cart, "total": total})
    number = len(ORDERS)
    return (
        f"¡Pedido de demostración #{number} registrado!\n{text}\n\n"
        "Recuerda que es una simulación: no se envió a ningún negocio real.",
        [],
    )


# ---------- punto de entrada ----------

def respond(message: str, cart: list[dict]) -> tuple[str, list[dict]]:
    cart = _clean_cart(cart)
    tokens = catalog.normalize(message).split()
    words = set(tokens)
    phrase = " ".join(tokens)
    keywords = _keywords(tokens)

    if words & HUMAN_WORDS:
        return (
            "Claro, te transferiría con un asesor humano. En esta demostración "
            "no hay un asesor conectado, pero en una implementación real la "
            "conversación pasaría a una persona de tu equipo.",
            cart,
        )

    if words & CONFIRM_WORDS:
        return _confirm(cart)

    if words & CLEAR_WORDS:
        return "Listo, vacié tu pedido. Podemos empezar de nuevo cuando quieras.", []

    if "carrito" in words or "mi pedido" in phrase:
        return _show_cart(cart)

    if words & PROMO_WORDS or any(t.startswith("promo") for t in tokens):
        return _promotions(), cart

    if words & PRICE_WORDS:
        if not keywords:
            return "¿De qué producto quieres saber el precio?", cart
        return _show_products(keywords), cart

    if words & ORDER_WORDS:
        return _handle_order(keywords, _explicit_quantity(tokens) or 1, cart)

    if words & AVAIL_WORDS:
        if not keywords:
            return _overview(), cart
        return _show_products(keywords), cart

    if words & GREETING_WORDS and not keywords:
        return (
            f"¡Hola! Soy el asistente virtual de {STORE_NAME} (demostración con "
            "datos ficticios). Puedo contarte qué productos hay, precios, "
            "promociones y tomar un pedido de prueba. ¿Qué necesitas?",
            cart,
        )

    if words & THANKS_WORDS and not keywords:
        return "¡Con gusto! Si necesitas algo más, aquí estoy.", cart

    if keywords:
        qty = _leading_quantity(tokens)
        if qty:
            return _handle_order(keywords, qty, cart)
        return _show_products(keywords), cart

    return (
        "No estoy seguro de haber entendido. Puedo ayudarte con productos, "
        "precios, promociones y pedidos. Prueba con «¿cuánto cuesta el arroz?» "
        "o «quiero hacer un pedido».",
        cart,
    )
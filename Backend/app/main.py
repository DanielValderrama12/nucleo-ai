from contextlib import asynccontextmanager

from fastapi import Depends, FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

from app import agent, catalog, contacts, db
from app.ratelimit import RateLimiter

# Chat: 20 mensajes por minuto. Contacto: 5 envíos por hora.
chat_limiter = RateLimiter(max_requests=20, window_seconds=60)
contact_limiter = RateLimiter(max_requests=5, window_seconds=3600)


@asynccontextmanager
async def lifespan(app: FastAPI):
    db.init_db()  # crea la tabla de contactos si no existe
    yield


app = FastAPI(title="NÚCLEO AI - API", version="0.4.0", lifespan=lifespan)

# Permite que la página web consulte este servidor
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],
    allow_methods=["*"],
    allow_headers=["*"],
)


class Product(BaseModel):
    id: int
    name: str
    category: str
    price: int
    stock: int
    promo_price: int | None = None


class CartItem(BaseModel):
    id: int
    qty: int


class ChatRequest(BaseModel):
    message: str = Field(max_length=500)
    cart: list[CartItem] = []


class ChatResponse(BaseModel):
    reply: str
    cart: list[CartItem]


class ContactRequest(BaseModel):
    name: str = Field(min_length=2, max_length=100)
    business: str = Field(default="", max_length=100)
    email: str = Field(pattern=r"^[^@\s]+@[^@\s]+\.[^@\s]+$", max_length=150)
    phone: str = Field(default="", max_length=30)
    message: str = Field(min_length=5, max_length=1000)
    website: str = ""  # campo trampa: las personas no lo ven, los bots sí lo llenan


@app.get("/health")
def health():
    return {"status": "ok"}


@app.get("/products", response_model=list[Product])
def products(category: str | None = None):
    return catalog.list_products(category)


@app.get("/products/search", response_model=list[Product])
def search(q: str):
    return catalog.search_products(q)


@app.get("/promotions", response_model=list[Product])
def promotions():
    return catalog.get_promotions()


@app.post(
    "/chat",
    response_model=ChatResponse,
    dependencies=[Depends(chat_limiter)],
)
def chat(request: ChatRequest):
    reply, cart = agent.respond(
        request.message, [item.model_dump() for item in request.cart]
    )
    return {"reply": reply, "cart": cart}


@app.post("/contact", dependencies=[Depends(contact_limiter)])
def contact(request: ContactRequest):
    if request.website:
        return {"ok": True}  # probablemente un bot: fingimos éxito sin guardar
    contacts.save_contact(request.model_dump(exclude={"website"}))
    return {"ok": True}
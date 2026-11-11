"use client";

import { useEffect, useRef, useState } from "react";
import SectionHeading from "./SectionHeading";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

type Message = { role: "user" | "bot"; text: string };
type CartItem = { id: number; qty: number };

const suggestions = [
  "¿Qué productos tienen disponibles?",
  "¿Cuánto cuesta el arroz?",
  "¿Tienen leche?",
  "¿Qué promociones tienen?",
  "Quiero hacer un pedido",
];

export default function ChatDemo() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "bot",
      text: "¡Hola! Soy el asistente virtual de Supermercado La Canasta (demostración con datos ficticios). ¿En qué te puedo ayudar?",
    },
  ]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const boxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const box = boxRef.current;
    if (box) box.scrollTop = box.scrollHeight;
  }, [messages, loading]);

  async function send(text: string) {
    const message = text.trim();
    if (!message || loading) return;

    setMessages((prev) => [...prev, { role: "user", text: message }]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch(`${API_URL}/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message, cart }),
      });
            if (res.status === 429) {
        setMessages((prev) => [
          ...prev,
          {
            role: "bot",
            text: "Estás escribiendo muy rápido. Espera un momento e inténtalo de nuevo.",
          },
        ]);
        return;
      }
            if (res.status === 429) {
        setMessages((prev) => [
          ...prev,
          {
            role: "bot",
            text: "Estás escribiendo muy rápido. Espera un momento e inténtalo de nuevo.",
          },
        ]);
        return;
      }
      if (!res.ok) throw new Error(`Error ${res.status}`);
      const data = await res.json();
      setMessages((prev) => [...prev, { role: "bot", text: data.reply }]);
      setCart(data.cart);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "bot",
          text: "No pude conectarme con el servidor de la demostración. Verifica que el backend esté corriendo.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  const itemsInCart = cart.reduce((sum, item) => sum + item.qty, 0);

  return (
    <section id="demo" className="relative py-24">
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/10 blur-[110px]" />
      <div className="relative mx-auto max-w-6xl px-5">
        <SectionHeading
          eyebrow="Demostración"
          title="Habla con un agente de IA"
          description="Este asistente atiende un supermercado ficticio. Pregúntale por productos, precios, promociones o haz un pedido de prueba."
        />

        <div className="mx-auto mt-12 max-w-2xl rounded-2xl border border-white/10 bg-surface/80 shadow-2xl shadow-accent-2/10 backdrop-blur">
          {/* Encabezado */}
          <div className="flex items-center justify-between border-b border-white/5 px-5 py-4">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-accent to-accent-2 text-xs font-bold text-slate-950">
                IA
              </div>
              <div>
                <p className="text-sm font-medium text-white">
                  Supermercado La Canasta
                </p>
                <p className="flex items-center gap-1.5 text-xs text-slate-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  En línea · datos ficticios
                </p>
              </div>
            </div>
            {itemsInCart > 0 && (
              <span className="rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-xs text-accent">
                Pedido: {itemsInCart} {itemsInCart === 1 ? "producto" : "productos"}
              </span>
            )}
          </div>

          {/* Mensajes */}
          <div ref={boxRef} className="h-[420px] space-y-3 overflow-y-auto px-5 py-5 text-sm">
            {messages.map((message, index) => (
              <div
                key={index}
                className={
                  message.role === "user"
                    ? "ml-auto w-fit max-w-[85%] whitespace-pre-line rounded-2xl rounded-br-sm bg-accent-2/80 px-4 py-2.5 text-white"
                    : "w-fit max-w-[90%] whitespace-pre-line rounded-2xl rounded-bl-sm bg-white/5 px-4 py-2.5 leading-relaxed text-slate-200"
                }
              >
                {message.text}
              </div>
            ))}
            {loading && (
              <div className="flex w-fit gap-1.5 rounded-2xl rounded-bl-sm bg-white/5 px-4 py-3">
                <span className="animate-blink h-1.5 w-1.5 rounded-full bg-slate-400" />
                <span className="animate-blink h-1.5 w-1.5 rounded-full bg-slate-400 [animation-delay:0.2s]" />
                <span className="animate-blink h-1.5 w-1.5 rounded-full bg-slate-400 [animation-delay:0.4s]" />
              </div>
            )}
          </div>

          {/* Sugerencias */}
          <div className="flex flex-wrap gap-2 border-t border-white/5 px-5 pt-4">
            {suggestions.map((suggestion) => (
              <button
                key={suggestion}
                onClick={() => send(suggestion)}
                disabled={loading}
                className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-slate-300 transition hover:border-accent/40 hover:text-white disabled:opacity-50"
              >
                {suggestion}
              </button>
            ))}
          </div>

          {/* Entrada */}
          <form
            onSubmit={(event) => {
              event.preventDefault();
              send(input);
            }}
            className="flex gap-3 p-5"
          >
            <input
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder="Escribe tu mensaje..."
              maxLength={500}
              className="flex-1 rounded-full border border-white/10 bg-bg px-5 py-3 text-sm text-white outline-none placeholder:text-slate-500 focus:border-accent/60"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="rounded-full bg-gradient-to-r from-accent to-accent-2 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:opacity-90 disabled:opacity-50"
            >
              Enviar
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
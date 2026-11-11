"use client";

import { useState } from "react";
import SectionHeading from "./SectionHeading";
import { whatsappLink } from "@/lib/config";
import Link from "next/link";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

type Status = "idle" | "sending" | "success" | "error";

const emptyForm = {
  name: "",
  business: "",
  email: "",
  phone: "",
  message: "",
  website: "",
};

const inputClass =
  "w-full rounded-xl border border-white/10 bg-bg px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500 focus:border-accent/60";

export default function Contact() {
  const [form, setForm] = useState(emptyForm);
  const [status, setStatus] = useState<Status>("idle");

  function update(field: keyof typeof emptyForm, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "sending") return;
    setStatus("sending");

    try {
      const res = await fetch(`${API_URL}/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name.trim(),
          business: form.business.trim(),
          email: form.email.trim(),
          phone: form.phone.trim(),
          message: form.message.trim(),
          website: form.website,
        }),
      });
      if (!res.ok) throw new Error(`Error ${res.status}`);
      setForm(emptyForm);
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="contacto" className="relative py-24">
      <div className="pointer-events-none absolute right-0 top-1/3 h-72 w-72 rounded-full bg-accent-2/15 blur-[120px]" />
      <div className="relative mx-auto max-w-6xl px-5">
        <SectionHeading
          eyebrow="Contacto"
          title="Hablemos de tu proyecto"
          description="Cuéntanos sobre tu negocio y qué te gustaría automatizar. Te responderemos para conversar sobre cómo podemos ayudarte."
        />

        <div className="mx-auto mt-12 grid max-w-4xl gap-8 lg:grid-cols-5">
          {/* Lateral: WhatsApp */}
          <div className="lg:col-span-2">
            <div className="rounded-2xl border border-white/10 bg-surface/60 p-6">
              <h3 className="font-display text-lg font-semibold text-white">
                ¿Prefieres WhatsApp?
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-400">
                Escríbenos directamente y conversemos sobre lo que necesitas.
              </p>
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-block rounded-full bg-[#25D366] px-6 py-3 text-sm font-semibold text-slate-950 transition hover:opacity-90"
              >
                Escribir por WhatsApp
              </a>
            </div>
          </div>

          {/* Formulario */}
          <div className="lg:col-span-3">
            {status === "success" ? (
              <div className="rounded-2xl border border-accent/30 bg-accent/10 p-8 text-center">
                <h3 className="font-display text-xl font-semibold text-white">
                  ¡Mensaje recibido!
                </h3>
                <p className="mt-2 text-sm text-slate-300">
                  Gracias por escribirnos. Pronto nos pondremos en contacto contigo.
                </p>
                <button
                  onClick={() => setStatus("idle")}
                  className="mt-6 rounded-full border border-white/15 px-5 py-2 text-sm text-white transition hover:bg-white/5"
                >
                  Enviar otro mensaje
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="space-y-4 rounded-2xl border border-white/10 bg-surface/60 p-6"
              >
                <div className="grid gap-4 sm:grid-cols-2">
                  <input
                    required
                    minLength={2}
                    maxLength={100}
                    placeholder="Tu nombre *"
                    value={form.name}
                    onChange={(e) => update("name", e.target.value)}
                    className={inputClass}
                  />
                  <input
                    maxLength={100}
                    placeholder="Tu negocio o empresa"
                    value={form.business}
                    onChange={(e) => update("business", e.target.value)}
                    className={inputClass}
                  />
                  <input
                    required
                    type="email"
                    maxLength={150}
                    placeholder="Correo electrónico *"
                    value={form.email}
                    onChange={(e) => update("email", e.target.value)}
                    className={inputClass}
                  />
                  <input
                    type="tel"
                    maxLength={30}
                    placeholder="Teléfono o WhatsApp"
                    value={form.phone}
                    onChange={(e) => update("phone", e.target.value)}
                    className={inputClass}
                  />
                </div>

                <textarea
                  required
                  minLength={5}
                  maxLength={1000}
                  rows={5}
                  placeholder="Cuéntanos qué necesitas *"
                  value={form.message}
                  onChange={(e) => update("message", e.target.value)}
                  className={inputClass}
                />

                {/* Campo trampa anti-spam: las personas no lo ven */}
                <input
                  type="text"
                  name="website"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  value={form.website}
                  onChange={(e) => update("website", e.target.value)}
                  className="hidden"
                />

               <label className="flex items-start gap-3 text-xs leading-relaxed text-slate-400">
  <input type="checkbox" required className="mt-0.5 accent-cyan-400" />
  <span>
    Acepto que NÚCLEO AI trate mis datos personales para contactarme sobre mi
    solicitud, según la{" "}
    <Link
      href="/politica-de-datos"
      target="_blank"
      className="text-accent underline"
    >
      política de tratamiento de datos
    </Link>
    .
  </span>
</label>

                {status === "error" && (
                  <p className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
                    No pudimos enviar tu mensaje. Revisa los datos e inténtalo de
                    nuevo, o escríbenos por WhatsApp.
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="w-full rounded-full bg-gradient-to-r from-accent to-accent-2 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:opacity-90 disabled:opacity-60"
                >
                  {status === "sending" ? "Enviando..." : "Enviar mensaje"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
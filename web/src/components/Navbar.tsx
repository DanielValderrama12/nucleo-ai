"use client";

import { useState } from "react";

const links = [
  { href: "#servicios", label: "Servicios" },
  { href: "#soluciones", label: "Soluciones" },
  { href: "#producto", label: "Producto" },
  { href: "#demo", label: "Demo" },
  { href: "#nosotros", label: "Nosotros" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/5 bg-bg/70 backdrop-blur-xl">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
        <a
          href="#inicio"
          onClick={() => setOpen(false)}
          className="flex items-center gap-2.5"
        >
          <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
            <circle cx="16" cy="16" r="5" fill="#22d3ee" />
            <circle
              cx="16"
              cy="16"
              r="12"
              stroke="#8b5cf6"
              strokeWidth="1.5"
              strokeDasharray="3 4"
            />
            <circle cx="16" cy="4" r="2" fill="#8b5cf6" />
          </svg>
          <span className="font-display text-lg font-semibold tracking-tight text-white">
            NÚCLEO <span className="text-accent">AI</span>
          </span>
        </a>

        {/* Enlaces en computador */}
        <ul className="hidden items-center gap-8 text-sm text-slate-300 md:flex">
          {links.map((link) => (
            <li key={link.href}>
              <a href={link.href} className="transition hover:text-white">
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <a
            href="#contacto"
            className="hidden rounded-full bg-white px-4 py-2 text-sm font-medium text-slate-900 transition hover:bg-accent sm:inline-block"
          >
            Contáctanos
          </a>

          {/* Botón de menú en celular */}
          <button
            type="button"
            onClick={() => setOpen(!open)}
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={open}
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 md:hidden"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
            >
              {open ? (
                <path d="M6 6l12 12M18 6L6 18" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h16" />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {/* Menú desplegable en celular */}
      {open && (
        <div className="border-t border-white/5 bg-bg/95 px-5 py-4 md:hidden">
          <ul className="space-y-1">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-lg px-3 py-3 text-slate-300 transition hover:bg-white/5 hover:text-white"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <a
            href="#contacto"
            onClick={() => setOpen(false)}
            className="mt-3 block rounded-full bg-white px-4 py-3 text-center text-sm font-medium text-slate-900"
          >
            Contáctanos
          </a>
        </div>
      )}
    </header>
  );
}
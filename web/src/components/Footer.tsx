import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-white/5 py-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-5 text-sm text-slate-500 sm:flex-row">
        <p>© 2026 NÚCLEO AI. Todos los derechos reservados.</p>
        <Link href="/politica-de-datos" className="transition hover:text-white">
          Política de datos personales
        </Link>
      </div>
    </footer>
  );
}
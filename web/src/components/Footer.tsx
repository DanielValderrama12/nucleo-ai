export default function Footer() {
  return (
    <footer className="border-t border-white/5 py-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-5 text-sm text-slate-500 sm:flex-row">
        <p>© {new Date().getFullYear()} NÚCLEO AI. Todos los derechos reservados.</p>
        <p>La inteligencia que impulsa tu negocio</p>
      </div>
    </footer>
  );
}
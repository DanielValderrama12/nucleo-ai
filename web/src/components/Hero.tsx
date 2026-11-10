export default function Hero() {
  return (
    <section
      id="inicio"
      className="relative flex min-h-screen items-center overflow-hidden pt-24"
    >
      {/* Fondo: cuadrícula y luces */}
      <div className="bg-grid pointer-events-none absolute inset-0" />
      <div className="pointer-events-none absolute -left-32 top-20 h-96 w-96 rounded-full bg-accent-2/25 blur-[120px]" />
      <div className="pointer-events-none absolute -right-32 bottom-10 h-96 w-96 rounded-full bg-accent/20 blur-[120px]" />

      <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-5 py-16 lg:grid-cols-2">
        {/* Texto */}
        <div className="animate-fade-up">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-xs text-slate-300">
            <span className="animate-blink h-1.5 w-1.5 rounded-full bg-accent" />
            Inteligencia artificial para negocios
          </span>

          <h1 className="font-display mt-6 text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
            La inteligencia que{" "}
            <span className="bg-gradient-to-r from-accent to-accent-2 bg-clip-text text-transparent">
              impulsa tu negocio
            </span>
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-400">
            Creamos agentes de IA, automatizamos procesos y desarrollamos
            software a medida para que tu empresa atienda mejor, venda más y
            trabaje con menos esfuerzo.
          </p>

          <div className="mt-9 flex flex-wrap gap-4">
            <a
              href="#demo"
              className="rounded-full bg-gradient-to-r from-accent to-accent-2 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:opacity-90"
            >
              Ver demostración
            </a>
            <a
              href="#contacto"
              className="rounded-full border border-white/15 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/5"
            >
              Hablemos de tu proyecto
            </a>
          </div>
        </div>

        {/* Vista previa del agente */}
        <div className="animate-float mx-auto w-full max-w-md">
          <div className="rounded-2xl border border-white/10 bg-surface/80 p-5 shadow-2xl shadow-accent-2/10 backdrop-blur">
            <div className="flex items-center gap-3 border-b border-white/5 pb-4">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-accent to-accent-2 text-xs font-bold text-slate-950">
                IA
              </div>
              <div>
                <p className="text-sm font-medium text-white">
                  Asistente del supermercado
                </p>
                <p className="flex items-center gap-1.5 text-xs text-slate-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  En línea
                </p>
              </div>
            </div>

            <div className="space-y-3 py-5 text-sm">
              <div className="ml-auto w-fit max-w-[80%] rounded-2xl rounded-br-sm bg-accent-2/80 px-4 py-2.5 text-white">
                ¿Tienen leche?
              </div>
              <div className="w-fit max-w-[85%] rounded-2xl rounded-bl-sm bg-white/5 px-4 py-2.5 text-slate-200">
                Sí, tenemos leche entera de 1 litro a $4.200. Hay unidades
                disponibles. ¿Quieres agregarla a tu pedido?
              </div>
            </div>

            <p className="border-t border-white/5 pt-3 text-center text-xs text-slate-500">
              Ejemplo con datos ficticios
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
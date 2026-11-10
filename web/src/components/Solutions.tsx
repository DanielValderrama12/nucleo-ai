import SectionHeading from "./SectionHeading";

const solutions = [
  {
    title: "Atención al cliente 24/7",
    text: "Un asistente que responde preguntas frecuentes a cualquier hora.",
  },
  {
    title: "Consulta de catálogo",
    text: "Informa productos, precios y disponibilidad usando los datos reales de tu negocio.",
  },
  {
    title: "Toma de pedidos",
    text: "Recibe y organiza pedidos de forma conversacional.",
  },
  {
    title: "Detección de clientes interesados",
    text: "Identifica quién quiere comprar para que tu equipo lo atienda a tiempo.",
  },
  {
    title: "Traspaso a un asesor humano",
    text: "Cuando la conversación lo requiere, la transfiere a una persona de tu equipo.",
  },
  {
    title: "Automatización de tareas internas",
    text: "Conecta la IA con tus procesos para ahorrar tiempo en el día a día.",
  },
];

export default function Solutions() {
  return (
    <section id="soluciones" className="relative py-24">
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent-2/10 blur-[110px]" />
      <div className="relative mx-auto max-w-6xl px-5">
        <SectionHeading
          eyebrow="Soluciones con IA"
          title="Lo que la inteligencia artificial puede hacer por ti"
          description="Casos de uso concretos para comercios y empresas de servicios."
        />

        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {solutions.map((item, index) => (
            <div
              key={item.title}
              className="rounded-2xl border border-white/10 bg-white/[0.03] p-6"
            >
              <span className="font-display text-sm font-semibold text-accent">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="font-display mt-3 text-lg font-semibold text-white">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-400">
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
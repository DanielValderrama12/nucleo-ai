import SectionHeading from "./SectionHeading";

const services = [
  {
    title: "Inteligencia artificial para negocios",
    text: "Diseñamos agentes y herramientas de IA que se adaptan a la forma en que trabaja tu empresa.",
    icon: "✦",
  },
  {
    title: "Automatización de procesos",
    text: "Eliminamos tareas repetitivas: registro de pedidos, respuestas frecuentes, seguimiento de clientes y más.",
    icon: "⚙",
  },
  {
    title: "Software a medida",
    text: "Desarrollamos aplicaciones web y sistemas internos pensados para tus necesidades, no plantillas genéricas.",
    icon: "</>",
  },
  {
    title: "Productos propios",
    text: "Creamos soluciones listas para implementar en distintos tipos de negocio, como nuestro agente de atención al cliente.",
    icon: "◈",
  },
];

export default function Services() {
  return (
    <section id="servicios" className="relative py-24">
      <div className="mx-auto max-w-6xl px-5">
        <SectionHeading
          eyebrow="Servicios"
          title="Tecnología a la medida de tu negocio"
          description="Te acompañamos desde la idea hasta una solución funcionando."
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => (
            <div
              key={service.title}
              className="group rounded-2xl border border-white/10 bg-surface/60 p-6 transition hover:-translate-y-1 hover:border-accent/40"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-accent/20 to-accent-2/20 font-display text-lg text-accent">
                {service.icon}
              </div>
              <h3 className="font-display mt-5 text-lg font-semibold text-white">
                {service.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-400">
                {service.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
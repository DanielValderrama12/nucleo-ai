import SectionHeading from "./SectionHeading";

const features = [
  "Responde preguntas de tus clientes automáticamente",
  "Consulta productos, precios y disponibilidad",
  "Explica tus servicios",
  "Registra pedidos",
  "Identifica clientes interesados",
  "Transfiere a un asesor humano cuando es necesario",
];

const businesses = [
  "Supermercados",
  "Restaurantes",
  "Tiendas de ropa",
  "Carnicerías",
  "Y otros comercios",
];

export default function Product() {
  return (
    <section id="producto" className="relative py-24">
      <div className="mx-auto max-w-6xl px-5">
        <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-surface to-bg p-8 sm:p-12">
          <SectionHeading
            eyebrow="Nuestro primer producto"
            title="Agente de IA para atención al cliente"
            description="Un asistente virtual que atiende a tus clientes por chat, con la información real de tu negocio."
          />

          <div className="mt-12 grid gap-10 lg:grid-cols-2">
            <ul className="space-y-4">
              {features.map((feature) => (
                <li key={feature} className="flex items-start gap-3 text-slate-300">
                  <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent/15 text-xs text-accent">
                    ✓
                  </span>
                  {feature}
                </li>
              ))}
            </ul>

            <div>
              <p className="text-sm font-semibold text-white">
                Pensado para negocios como:
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                {businesses.map((business) => (
                  <span
                    key={business}
                    className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-300"
                  >
                    {business}
                  </span>
                ))}
              </div>
              <a
                href="#demo"
                className="mt-8 inline-block rounded-full bg-gradient-to-r from-accent to-accent-2 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:opacity-90"
              >
                Probar la demostración
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
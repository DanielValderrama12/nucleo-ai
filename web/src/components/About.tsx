import SectionHeading from "./SectionHeading";

const values = [
  {
    title: "Honestidad",
    text: "Te decimos qué puede hacer la tecnología y qué no. Sin promesas infladas.",
  },
  {
    title: "Soluciones útiles",
    text: "Construimos para resolver problemas reales de tu negocio.",
  },
  {
    title: "Crecimiento",
    text: "Diseñamos pensando en que tu solución pueda crecer contigo.",
  },
];

export default function About() {
  return (
    <section id="nosotros" className="relative py-24">
      <div className="mx-auto max-w-6xl px-5">
        <SectionHeading
          eyebrow="Sobre nosotros"
          title="Una empresa tecnológica que está empezando"
          description="NÚCLEO AI nace en Colombia con una misión clara: llevar la inteligencia artificial a negocios de todos los tamaños."
        />

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {values.map((value) => (
            <div
              key={value.title}
              className="rounded-2xl border border-white/10 bg-surface/60 p-6"
            >
              <h3 className="font-display text-lg font-semibold text-white">
                {value.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-400">
                {value.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
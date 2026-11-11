import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import { COMPANY } from "@/lib/config";

export const metadata: Metadata = {
  title: "Política de tratamiento de datos personales | NÚCLEO AI",
  description:
    "Cómo NÚCLEO AI recoge, usa y protege los datos personales de quienes nos contactan.",
};

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-10">
      <h2 className="font-display text-xl font-semibold text-white">{title}</h2>
      <div className="mt-3 space-y-3 text-sm leading-relaxed text-slate-400">
        {children}
      </div>
    </section>
  );
}

export default function PoliticaDeDatos() {
  return (
    <>
      <header className="border-b border-white/5">
        <div className="mx-auto flex h-16 max-w-3xl items-center justify-between px-5">
          <span className="font-display text-lg font-semibold text-white">
            NÚCLEO <span className="text-accent">AI</span>
          </span>
          <Link href="/" className="text-sm text-slate-300 transition hover:text-white">
            ← Volver al inicio
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-5 py-14">
        <h1 className="font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
          Política de tratamiento de datos personales
        </h1>
        <p className="mt-3 text-sm text-slate-500">
          Última actualización: noviembre de 2026
        </p>

        <p className="mt-8 text-sm leading-relaxed text-slate-400">
          Esta política explica cómo se tratan los datos personales de quienes
          usan el sitio web de NÚCLEO AI, en cumplimiento de la Ley 1581 de 2012
          y sus decretos reglamentarios, vigentes en Colombia.
        </p>

        <Section title="1. Responsable del tratamiento">
          <ul className="list-disc space-y-1 pl-5">
            <li>Nombre o razón social: {COMPANY.legalName}</li>
            <li>Ciudad: {COMPANY.city}</li>
            <li>Correo para solicitudes: {COMPANY.email}</li>
          </ul>
        </Section>

        <Section title="2. Datos que recogemos">
          <p>
            Cuando usas el formulario de contacto, recogemos: tu nombre, tu
            correo electrónico, el nombre de tu negocio o empresa (opcional), tu
            teléfono (opcional) y el mensaje que nos escribes.
          </p>
          <p>
            El chat de demostración no te pide datos personales y no guarda tus
            mensajes. Te recomendamos no escribir allí información personal.
          </p>
          <p>
            Si nos escribes por WhatsApp, la conversación se rige también por
            las condiciones de esa plataforma.
          </p>
        </Section>

        <Section title="3. Para qué usamos tus datos">
          <ul className="list-disc space-y-1 pl-5">
            <li>Responder tu solicitud o consulta.</li>
            <li>
              Contactarte para conversar sobre los servicios de NÚCLEO AI que
              te interesan.
            </li>
          </ul>
          <p>No vendemos tus datos ni los usamos para fines distintos a estos.</p>
        </Section>

        <Section title="4. Autorización">
          <p>
            Al marcar la casilla de aceptación y enviar el formulario, nos
            autorizas de forma previa, expresa e informada para tratar tus datos
            con las finalidades descritas. Puedes revocar esta autorización en
            cualquier momento, como se explica más abajo.
          </p>
        </Section>

        <Section title="5. Tus derechos">
          <ul className="list-disc space-y-1 pl-5">
            <li>Conocer, actualizar y rectificar tus datos personales.</li>
            <li>Solicitar prueba de la autorización que nos diste.</li>
            <li>Ser informado sobre el uso que se ha dado a tus datos.</li>
            <li>Acceder de forma gratuita a tus datos personales.</li>
            <li>Revocar la autorización y solicitar la supresión de tus datos.</li>
            <li>
              Presentar quejas ante la Superintendencia de Industria y Comercio
              (SIC) por posibles infracciones a la ley.
            </li>
          </ul>
        </Section>

        <Section title="6. Cómo ejercer tus derechos">
          <p>
            Escríbenos a {COMPANY.email} indicando tu nombre, los datos de
            contacto que usaste y lo que solicitas (consulta, actualización,
            corrección, supresión o revocatoria). Responderemos dentro de los
            plazos que establece la ley.
          </p>
        </Section>

        <Section title="7. Seguridad, conservación y terceros">
          <p>
            Aplicamos medidas razonables para proteger tus datos contra accesos
            no autorizados. Los conservamos el tiempo necesario para atender tu
            solicitud o hasta que pidas su supresión.
          </p>
          <p>
            No cedemos tus datos a terceros para sus propios fines. Pueden
            almacenarse en servidores de proveedores tecnológicos que usamos
            para operar el sitio.
          </p>
        </Section>

        <Section title="8. Cambios en esta política">
          <p>
            Podemos actualizar esta política. La versión vigente siempre estará
            publicada en esta página, con su fecha de actualización.
          </p>
        </Section>
      </main>

      <Footer />
    </>
  );
}
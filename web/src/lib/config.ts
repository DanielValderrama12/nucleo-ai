export const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "";

export const WHATSAPP_MESSAGE =
  "Hola, quiero información sobre los servicios de NÚCLEO AI.";

export function whatsappLink(): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;
}

// Datos del responsable del tratamiento. Completa lo que está entre corchetes
// antes de publicar la página.
export const COMPANY = {
  legalName: "[COMPLETAR: Daniel Valderrama Rodriguez]",
  idNumber: "[COMPLETAR: 1018242778]",
  city: "[COMPLETAR: Medellin, Colombia]",
  email: "[COMPLETAR: danielvalderrama.r08@gmail.com]",
};
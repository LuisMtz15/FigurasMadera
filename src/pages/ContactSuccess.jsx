// src/pages/ContactSuccess.jsx
import { THEME } from "../config/theme.js";

export default function ContactSuccess() {
  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{
        background: `linear-gradient(180deg, ${THEME.heroGradientStart} 0%, ${THEME.heroGradientEnd} 100%)`,
      }}
    >
      <div
        className="rounded-2xl p-10 text-center shadow-sm max-w-md"
        style={{
          backgroundColor: THEME.surfaceStrong,
          border: `1px solid ${THEME.border}`,
        }}
      >
        <h1 className="text-2xl font-bold mb-3" style={{ color: THEME.textStrong }}>
          ¡Gracias por tu mensaje! 💛
        </h1>
        <p className="mb-6" style={{ color: THEME.text }}>
          Lo recibimos y te vamos a responder lo antes posible.
        </p>
        <a
          href="/"
          className="theme-btn-primary px-5 py-2 rounded-lg text-sm font-medium"
        >
          Volver al inicio
        </a>
      </div>
    </div>
  );
}

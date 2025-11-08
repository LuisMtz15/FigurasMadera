// src/pages/Contact.jsx
import { SITE_CONFIG } from "../config/site.js";
import { useNavigate } from "react-router-dom";

const COLORS = {
  surface: "rgba(255,255,255,0.8)",
  border: "rgba(252, 231, 218, 0.7)",
  dark: "#5A3B2E",
  accent: "#E98A6B",
};

export default function Contact() {
  const navigate = useNavigate();
  const whatsappLink = `https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${encodeURIComponent(
    "Hola 👋, vi la página Belleza en Madera y quiero más información."
  )}`;

  return (
    <div className="py-12">
      <div className="container-main max-w-3xl space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold" style={{ color: COLORS.dark }}>
            Contáctanos
          </h1>
          <p className="text-slate-600">
            Dinos qué pieza te gustó o qué te gustaría que pintáramos. Te
            contestamos por correo o WhatsApp.
          </p>
        </div>

        <div
          className="rounded-2xl p-6 md:p-7 space-y-4"
          style={{
            backgroundColor: COLORS.surface,
            border: `1px solid ${COLORS.border}`,
          }}
        >
          <p className="text-sm font-medium" style={{ color: COLORS.dark }}>
            Envíanos tus datos 💛
          </p>

          <form
            name="contact"
            method="POST"
            action="/contact-success"
            data-netlify="true"
            data-netlify-honeypot="bot-field"
            className="space-y-4"
            onSubmit={() => {
              // redirigir dentro de React después del submit
              setTimeout(() => navigate("/contact-success"), 100);
            }}
          >
            <input type="hidden" name="form-name" value="contact" />
            <p className="hidden">
              <label>
                No llenar: <input name="bot-field" />
              </label>
            </p>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-1">
                <label className="text-sm" style={{ color: COLORS.dark }}>
                  Nombre completo
                </label>
                <input
                  type="text"
                  name="name"
                  className="w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#FCE7DA]"
                  placeholder="Ej. Mariela Gómez"
                  required
                />
              </div>
              <div className="space-y-1">
                <label className="text-sm" style={{ color: COLORS.dark }}>
                  Correo
                </label>
                <input
                  type="email"
                  name="email"
                  className="w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#FCE7DA]"
                  placeholder="tu@correo.com"
                  required
                />
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-1">
                <label className="text-sm" style={{ color: COLORS.dark }}>
                  Teléfono / WhatsApp
                </label>
                <input
                  type="tel"
                  name="phone"
                  className="w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#FCE7DA]"
                  placeholder="+52 ..."
                />
              </div>
              <div className="space-y-1">
                <label className="text-sm" style={{ color: COLORS.dark }}>
                  Asunto
                </label>
                <input
                  type="text"
                  name="subject"
                  className="w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#FCE7DA]"
                  placeholder="Figura que vi / Pedido / Info"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-sm" style={{ color: COLORS.dark }}>
                Cuéntanos qué necesitas
              </label>
              <textarea
                rows={4}
                name="message"
                className="w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#FCE7DA]"
                placeholder="Quiero una figura personalizada de..., vi una flor pastel y quiero precio..."
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-2 rounded-md text-sm font-medium text-white"
              style={{ backgroundColor: COLORS.accent }}
            >
              Enviar mensaje
            </button>
          </form>
        </div>

        {/* bloque de whatsapp */}
        <div className="text-center space-y-3">
          <p className="text-sm text-slate-600">
            ¿Lo quieres resolver rapidito?
          </p>
          <a
            href={whatsappLink}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center px-5 py-2 rounded-md text-sm font-medium text-white"
            style={{ backgroundColor: COLORS.dark }}
          >
            Escribir por WhatsApp
          </a>
          <p className="text-xs text-slate-400">
            Horario aproximado: Lunes a sábado, 10:00 am - 6:00 pm.
          </p>
        </div>
      </div>
    </div>
  );
}
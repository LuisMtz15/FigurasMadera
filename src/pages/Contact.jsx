// src/pages/Contact.jsx
import { SITE_CONFIG } from "../config/site.js";

export default function Contact() {
  const waText = encodeURIComponent(
    "Hola 👋, quiero información sobre las figuras de madera."
  );
  const waLink = `https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${waText}`;

  return (
    <div className="container-main py-10 space-y-8">
      {/* Encabezado */}
      <div className="space-y-2 text-center md:text-left">
        <h1 className="text-3xl font-bold text-slate-900">Contáctanos</h1>
        <p className="text-slate-600 max-w-2xl mx-auto md:mx-0">
          Escríbenos si quieres información, una figura personalizada o si deseas
          hacer un pedido especial. Te responderemos lo antes posible 🌸
        </p>
      </div>

      {/* Sección principal */}
      <div className="grid gap-8 md:grid-cols-2">
        {/* Tarjeta con datos de contacto */}
        <div className="bg-white/80 backdrop-blur border border-white/50 rounded-xl p-6 space-y-4">
          <h2 className="text-lg font-semibold text-slate-900">
            Datos de contacto
          </h2>
          <div className="space-y-2 text-sm text-slate-600">
            <p>
              WhatsApp:{" "}
              <a
                href={waLink}
                target="_blank"
                rel="noreferrer"
                className="text-slate-900 font-medium underline-offset-2 hover:underline"
              >
                +{SITE_CONFIG.whatsappNumber}
              </a>
            </p>
            {SITE_CONFIG.email && (
              <p>
                Correo:{" "}
                <a
                  href={`mailto:${SITE_CONFIG.email}`}
                  className="text-slate-900 font-medium underline-offset-2 hover:underline"
                >
                  {SITE_CONFIG.email}
                </a>
              </p>
            )}
            {SITE_CONFIG.instagram && (
              <p>
                Instagram:{" "}
                <a
                  href={SITE_CONFIG.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="text-slate-900 font-medium underline-offset-2 hover:underline"
                >
                  Ver galería
                </a>
              </p>
            )}
          </div>

          <a
            href={waLink}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center bg-slate-900 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-slate-800 transition"
          >
            Mandar WhatsApp directo
          </a>
        </div>

        {/* Formulario visual */}
        <div className="bg-white/60 border border-white/40 rounded-xl p-6 space-y-5">
          <h2 className="text-lg font-semibold text-slate-900">
            Envíanos tu mensaje
          </h2>
          <form className="space-y-4">
            <div className="space-y-1">
              <label className="text-sm text-slate-700">Nombre</label>
              <input
                type="text"
                className="w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-pink-100 bg-white/70"
                placeholder="Tu nombre completo"
              />
            </div>

            <div className="space-y-1">
              <label className="text-sm text-slate-700">Correo electrónico</label>
              <input
                type="email"
                className="w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-pink-100 bg-white/70"
                placeholder="tu@correo.com"
              />
            </div>

            <div className="space-y-1">
              <label className="text-sm text-slate-700">Teléfono</label>
              <input
                type="tel"
                className="w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-pink-100 bg-white/70"
                placeholder="+52 000 000 0000"
              />
            </div>

            <div className="space-y-1">
              <label className="text-sm text-slate-700">
                Razón o mensaje
              </label>
              <textarea
                rows={4}
                className="w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-pink-100 bg-white/70"
                placeholder="Ej. Quiero cotizar una figura personalizada o hacer un pedido grande..."
              />
            </div>

            <p className="text-xs text-slate-400">
              *Este formulario es de muestra. Puedes contactarnos directamente por
              WhatsApp para una respuesta más rápida.
            </p>

            <div className="pt-2">
              <button
                type="button"
                onClick={() => window.open(waLink, "_blank")}
                className="w-full bg-slate-900 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-slate-800 transition"
              >
                Enviar por WhatsApp
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
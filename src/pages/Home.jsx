// src/pages/Home.jsx
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { SITE_CONFIG } from "../config/site.js";

export default function Home() {
  const generalMessage = encodeURIComponent(SITE_CONFIG.whatsappMessage);
  const generalLink = `https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${generalMessage}`;

  const featuredMessage = encodeURIComponent(
    "Hola, quiero la figura 'Flor pastel' que vi en la página."
  );
  const featuredLink = `https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${featuredMessage}`;

  return (
    <div className="container-main py-12 lg:py-16">
      <div className="grid gap-10 lg:grid-cols-2 items-center">
        {/* Texto */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-5"
        >
          <span className="inline-flex items-center gap-2 bg-pink-100 text-slate-900 px-3 py-1 rounded-full text-sm font-medium">
            Artesanal · Pintado a mano
          </span>

          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900">
            Figuras de madera para espacios felices ✨
          </h1>

          <p className="text-slate-600 max-w-xl">
            Piezas únicas, coloridas y hechas con detalle. Si te gusta una,
            nos escribes al WhatsApp y la apartas. Sin pagos en línea.
          </p>

          <div className="flex flex-wrap gap-3">
            <Link
              to="/productos"
              className="bg-slate-900 text-white px-5 py-2 rounded-md text-sm font-medium hover:bg-slate-800 transition"
            >
              Ver productos
            </Link>
            <a
              href={generalLink}
              target="_blank"
              rel="noreferrer"
              className="px-5 py-2 rounded-md text-sm font-medium border border-slate-200 bg-white/70 hover:bg-white transition"
            >
              Escribir por WhatsApp
            </a>
          </div>

          <p className="text-xs text-slate-500">
            100% hecho a mano. Colores pastel. Personalizable.
          </p>
        </motion.div>

        {/* Tarjeta */}
        <motion.div
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="lg:justify-self-end"
        >
          <div className="bg-white/80 backdrop-blur rounded-2xl shadow-md border border-white/50 p-6 w-full max-w-sm mx-auto">
            <div className="aspect-video rounded-xl bg-gradient-to-br from-pink-100 via-white to-indigo-50 mb-4 flex items-center justify-center text-6xl">
              🪵
            </div>
            <h2 className="text-lg font-semibold text-slate-900">
              Flor pastel
            </h2>
            <p className="text-sm text-slate-500 mb-3">
              Figura de madera pintada a mano, ideal para sala u oficina.
            </p>
            <p className="text-base font-semibold text-slate-900 mb-4">
              $280 MXN
            </p>
            <a
              href={featuredLink}
              target="_blank"
              rel="noreferrer"
              className="w-full inline-flex justify-center bg-slate-900 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-slate-800 transition"
            >
              Pedir por WhatsApp
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
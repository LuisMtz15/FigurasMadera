// src/pages/About.jsx
import { motion } from "framer-motion";
import { SITE_CONFIG } from "../config/site.js";

const COLORS = {
  bg: "#FEFAF7",
  surface: "rgba(255,255,255,0.75)",
  border: "rgba(255,255,255,0.5)",
  accent: "#E98A6B",
  dark: "#5A3B2E",
  tag: "#CBE9D7",
};

export default function About() {
  return (
    <div
      className="py-12 space-y-10"
      style={{ background: "transparent" }}
    >
      <div className="container-main space-y-10">
        {/* Encabezado */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-center md:text-left space-y-3"
        >
          <span
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium"
            style={{ backgroundColor: COLORS.tag, color: COLORS.dark }}
          >
            Sobre nosotras
          </span>
          <h1
            className="text-3xl md:text-4xl font-bold"
            style={{ color: COLORS.dark }}
          >
            {SITE_CONFIG.businessName || "Belleza en Madera"}
          </h1>
          <p className="text-slate-600 max-w-3xl">
            Somos un pequeño taller de figuras de madera pintadas a mano. Cada pieza
            la hacemos con calma, cuidando colores pastel y detalles que hagan que
            tu espacio se sienta más cálido.
          </p>
        </motion.div>

        {/* 2 columnas */}
        <div className="grid gap-8 md:grid-cols-2 items-start">
          {/* Historia */}
          <motion.div
            initial={{ opacity: 0, x: -15 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="rounded-xl p-6 space-y-4"
            style={{
              backgroundColor: COLORS.surface,
              border: `1px solid ${COLORS.border}`,
            }}
          >
            <h2 className="text-lg font-semibold" style={{ color: COLORS.dark }}>
              Cómo empezó todo
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              Empezamos pintando figuras para decorar la casa y hacer regalitos.
              A la gente le gustó el estilo y los colores suaves, y comenzaron a
              pedir más: animales, flores, piezas de temporada.
            </p>
            <p className="text-sm text-slate-600 leading-relaxed">
              Así nació este proyecto: un lugar donde mostrar las piezas sin
              complicaciones, y donde puedas pedir algo personalizado escribiendo
              directo por WhatsApp.
            </p>
          </motion.div>

          {/* Valores */}
          <motion.div
            initial={{ opacity: 0, x: 15 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.15 }}
            className="space-y-4"
          >
            <h2 className="text-lg font-semibold" style={{ color: COLORS.dark }}>
              Lo que nos importa
            </h2>
            <div className="grid gap-3 sm:grid-cols-2">
              <div
                className="rounded-lg p-4"
                style={{
                  backgroundColor: "#FDF5F0",
                  border: "1px solid #FCE7DA",
                }}
              >
                <h3 className="text-sm font-semibold" style={{ color: COLORS.dark }}>
                  Artesanal
                </h3>
                <p className="text-xs text-slate-500">
                  Piezas hechas a mano, no en serie.
                </p>
              </div>
              <div
                className="rounded-lg p-4"
                style={{
                  backgroundColor: "#FDF5F0",
                  border: "1px solid #FCE7DA",
                }}
              >
                <h3 className="text-sm font-semibold" style={{ color: COLORS.dark }}>
                  Colores pastel
                </h3>
                <p className="text-xs text-slate-500">
                  Para que combinen con casa, oficina o tienda.
                </p>
              </div>
              <div
                className="rounded-lg p-4"
                style={{
                  backgroundColor: "#FDF5F0",
                  border: "1px solid #FCE7DA",
                }}
              >
                <h3 className="text-sm font-semibold" style={{ color: COLORS.dark }}>
                  Personalización
                </h3>
                <p className="text-xs text-slate-500">
                  Si tienes una idea, la platicamos.
                </p>
              </div>
              <div
                className="rounded-lg p-4"
                style={{
                  backgroundColor: "#FDF5F0",
                  border: "1px solid #FCE7DA",
                }}
              >
                <h3 className="text-sm font-semibold" style={{ color: COLORS.dark }}>
                  Trato cercano
                </h3>
                <p className="text-xs text-slate-500">
                  Te atendemos nosotras mismas 💛
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Línea de tiempo */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="space-y-4"
        >
          <h2 className="text-lg font-semibold" style={{ color: COLORS.dark }}>
            Nuestro caminito
          </h2>
          <div className="relative pl-6 space-y-5">
            {/* línea */}
            <div className="absolute top-1 bottom-1 left-2 w-0.5 bg-[#FCE7DA]" />
            {/* 1 */}
            <div className="relative">
              <div className="w-3 h-3 rounded-full bg-[#E98A6B] absolute -left-[22px] top-1.5" />
              <h3 className="text-sm font-semibold" style={{ color: COLORS.dark }}>
                1. Las primeras figuras
              </h3>
              <p className="text-xs text-slate-500">
                Empezamos con piezas para la familia y la casa.
              </p>
            </div>
            {/* 2 */}
            <div className="relative">
              <div className="w-3 h-3 rounded-full bg-[#E98A6B] absolute -left-[22px] top-1.5" />
              <h3 className="text-sm font-semibold" style={{ color: COLORS.dark }}>
                2. Más pedidos
              </h3>
              <p className="text-xs text-slate-500">
                Llegaron encargos con colores y formas diferentes.
              </p>
            </div>
            {/* 3 */}
            <div className="relative">
              <div className="w-3 h-3 rounded-full bg-[#E98A6B] absolute -left-[22px] top-1.5" />
              <h3 className="text-sm font-semibold" style={{ color: COLORS.dark }}>
                3. Página web
              </h3>
              <p className="text-xs text-slate-500">
                Creamos este sitio para que puedas ver todo sin escribir primero.
              </p>
            </div>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.25 }}
          className="rounded-xl p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
          style={{
            backgroundColor: "rgba(255,255,255,0.8)",
            border: "1px solid rgba(255,255,255,0.4)",
          }}
        >
          <div>
            <h2 className="text-lg font-semibold" style={{ color: COLORS.dark }}>
              ¿Quieres algo personalizado?
            </h2>
            <p className="text-sm text-slate-600">
              Mándanos foto o idea y te decimos si la podemos hacer.
            </p>
          </div>
          <a
            href={`https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${encodeURIComponent(
              "Hola, quiero una figura personalizada 😄"
            )}`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center px-4 py-2 rounded-md text-sm font-medium text-white"
            style={{ backgroundColor: COLORS.accent }}
          >
            Hablar por WhatsApp
          </a>
        </motion.div>
      </div>
    </div>
  );
}
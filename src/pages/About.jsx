// src/pages/About.jsx
import { motion } from "framer-motion";
import { SITE_CONFIG } from "../config/site.js";
import { THEME } from "../config/theme.js";

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
            style={{ backgroundColor: THEME.successSoft, color: THEME.textStrong }}
          >
            Sobre nosotras
          </span>
          <h1
            className="text-3xl md:text-4xl font-bold"
            style={{ color: THEME.textStrong }}
          >
            {SITE_CONFIG.businessName || "Belleza en Madera"}
          </h1>
          <p className="max-w-3xl" style={{ color: THEME.text }}>
            Creamos figuras de madera pintadas a mano pensadas para acompañar
            celebraciones, regalos y momentos especiales. Cada pieza nace con
            intención, cuidado y ese toque artesanal que hace que un detalle se
            vuelva memorable.
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
              backgroundColor: THEME.surface,
              border: `1px solid ${THEME.border}`,
            }}
          >
            <h2 className="text-lg font-semibold" style={{ color: THEME.textStrong }}>
              Nuestra historia
            </h2>
            <p className="text-sm leading-relaxed" style={{ color: THEME.text }}>
              Todo comenzó con la idea de crear detalles distintos: piezas de
              madera hechas a mano que pudieran regalarse, decorar un espacio o
              volver más especial una fecha importante.
            </p>
            <p className="text-sm leading-relaxed" style={{ color: THEME.text }}>
              Con el tiempo llegaron más pedidos, nuevas ideas y encargos
              personalizados. Así nació este proyecto: un espacio donde puedes
              descubrir nuestras piezas y pedir algo pensado especialmente para
              ti o para alguien más.
            </p>
          </motion.div>

          {/* Valores */}
          <motion.div
            initial={{ opacity: 0, x: 15 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.15 }}
            className="space-y-4"
          >
            <h2 className="text-lg font-semibold" style={{ color: THEME.textStrong }}>
              Lo que nos define
            </h2>
            <div className="grid gap-3 sm:grid-cols-2">
              <div
                className="rounded-lg p-4"
                style={{
                  backgroundColor: THEME.surfaceSoft,
                  border: `1px solid ${THEME.border}`,
                }}
              >
                <h3 className="text-sm font-semibold" style={{ color: THEME.textStrong }}>
                  Hecho a mano
                </h3>
                <p className="text-xs" style={{ color: THEME.text }}>
                  Cada figura se trabaja con dedicación, sin procesos en serie.
                </p>
              </div>
              <div
                className="rounded-lg p-4"
                style={{
                  backgroundColor: THEME.surfaceSoft,
                  border: `1px solid ${THEME.border}`,
                }}
              >
                <h3 className="text-sm font-semibold" style={{ color: THEME.textStrong }}>
                  Diseño con intención
                </h3>
                <p className="text-xs" style={{ color: THEME.text }}>
                  Buscamos que cada pieza tenga personalidad y presencia.
                </p>
              </div>
              <div
                className="rounded-lg p-4"
                style={{
                  backgroundColor: THEME.surfaceSoft,
                  border: `1px solid ${THEME.border}`,
                }}
              >
                <h3 className="text-sm font-semibold" style={{ color: THEME.textStrong }}>
                  Personalización
                </h3>
                <p className="text-xs" style={{ color: THEME.text }}>
                  Si tienes una idea, la aterrizamos contigo y la hacemos realidad.
                </p>
              </div>
              <div
                className="rounded-lg p-4"
                style={{
                  backgroundColor: THEME.surfaceSoft,
                  border: `1px solid ${THEME.border}`,
                }}
              >
                <h3 className="text-sm font-semibold" style={{ color: THEME.textStrong }}>
                  Detalles que conectan
                </h3>
                <p className="text-xs" style={{ color: THEME.text }}>
                  Nos gusta crear piezas que emocionen, sorprendan y acompañen recuerdos.
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
          <h2 className="text-lg font-semibold" style={{ color: THEME.textStrong }}>
            Cómo hemos crecido
          </h2>
          <div className="relative pl-6 space-y-5">
            <div className="absolute top-1 bottom-1 left-2 w-0.5" style={{ backgroundColor: THEME.borderStrong }} />
            <div className="relative">
              <div className="w-3 h-3 rounded-full absolute -left-[22px] top-1.5" style={{ backgroundColor: THEME.secondary }} />
              <h3 className="text-sm font-semibold" style={{ color: THEME.textStrong }}>
                1. Primeras creaciones
              </h3>
              <p className="text-xs" style={{ color: THEME.text }}>
                Empezamos creando piezas para regalar y decorar momentos cercanos.
              </p>
            </div>
            <div className="relative">
              <div className="w-3 h-3 rounded-full absolute -left-[22px] top-1.5" style={{ backgroundColor: THEME.secondary }} />
              <h3 className="text-sm font-semibold" style={{ color: THEME.textStrong }}>
                2. Nuevos encargos
              </h3>
              <p className="text-xs" style={{ color: THEME.text }}>
                Comenzaron a llegar pedidos personalizados para distintas ocasiones.
              </p>
            </div>
            <div className="relative">
              <div className="w-3 h-3 rounded-full absolute -left-[22px] top-1.5" style={{ backgroundColor: THEME.secondary }} />
              <h3 className="text-sm font-semibold" style={{ color: THEME.textStrong }}>
                3. Nuestra vitrina digital
              </h3>
              <p className="text-xs" style={{ color: THEME.text }}>
                Creamos este sitio para mostrar nuestras piezas de forma clara y cercana.
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
            backgroundColor: THEME.surfaceStrong,
            border: `1px solid ${THEME.border}`,
          }}
        >
          <div>
            <h2 className="text-lg font-semibold" style={{ color: THEME.textStrong }}>
              ¿Quieres algo personalizado?
            </h2>
            <p className="text-sm" style={{ color: THEME.text }}>
              Cuéntanos tu idea y te ayudamos a convertirla en una pieza especial.
            </p>
          </div>
          <a
            href={`https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${encodeURIComponent(
              "Hola, quiero una figura personalizada 😄"
            )}`}
            target="_blank"
            rel="noreferrer"
            className="theme-btn-primary inline-flex items-center justify-center px-4 py-2 rounded-lg text-sm font-medium"
          >
            Hablar por WhatsApp
          </a>
        </motion.div>
      </div>
    </div>
  );
}

// src/pages/About.jsx
import { motion } from "framer-motion";
import { SITE_CONFIG } from "../config/site.js";

export default function About() {
  return (
    <div className="container-main py-12 space-y-10">
      {/* Encabezado */}
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="text-center md:text-left space-y-3"
      >
        <span className="inline-flex items-center gap-2 bg-pink-100 text-slate-900 px-3 py-1 rounded-full text-sm font-medium">
          Sobre nosotras
        </span>
        <h1 className="text-3xl md:text-4xl font-bold text-slate-900">
          {SITE_CONFIG.businessName}
        </h1>
        <p className="text-slate-600 max-w-3xl">
          Somos un pequeño taller de figuras de madera pintadas a mano. Cada pieza
          la diseñamos pensando en que dé alegría, color y un detalle especial a
          los espacios. No son piezas masivas: son hechas con calma y cariño. 💛
        </p>
      </motion.div>

      {/* Sección 2 columnas */}
      <div className="grid gap-8 md:grid-cols-2 items-start">
        {/* Historia */}
        <motion.div
          initial={{ opacity: 0, x: -15 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="bg-white/80 backdrop-blur border border-white/50 rounded-xl p-6 space-y-4"
        >
          <h2 className="text-lg font-semibold text-slate-900">
            Cómo empezó todo
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            Empezamos creando figuras para decorar la casa y para regalar. A la
            gente le gustó el estilo pastel, los detalles pintados a mano y lo
            artesanal. Poco a poco nos comenzaron a pedir piezas personalizadas y
            decidimos abrir este espacio para mostrarlas.
          </p>
          <p className="text-sm text-slate-600 leading-relaxed">
            Nuestro objetivo es que puedas encontrar algo bonito, hecho por
            personas, y que si quieres una figura especial, podamos hacerla.
          </p>
        </motion.div>

        {/* Valores / Diferenciales */}
        <motion.div
          initial={{ opacity: 0, x: 15 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.15 }}
          className="space-y-4"
        >
          <h2 className="text-lg font-semibold text-slate-900">
            Lo que nos importa
          </h2>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="bg-white/70 rounded-lg p-4 border border-white/40">
              <h3 className="text-sm font-semibold text-slate-900">
                Artesanal
              </h3>
              <p className="text-xs text-slate-500">
                Piezas hechas y pintadas a mano, no serie industrial.
              </p>
            </div>
            <div className="bg-white/70 rounded-lg p-4 border border-white/40">
              <h3 className="text-sm font-semibold text-slate-900">
                Colores pastel
              </h3>
              <p className="text-xs text-slate-500">
                Pensados para combinar con casas, oficinas y tiendas.
              </p>
            </div>
            <div className="bg-white/70 rounded-lg p-4 border border-white/40">
              <h3 className="text-sm font-semibold text-slate-900">
                Personalización
              </h3>
              <p className="text-xs text-slate-500">
                Si tienes una idea, la podemos platicar por WhatsApp.
              </p>
            </div>
            <div className="bg-white/70 rounded-lg p-4 border border-white/40">
              <h3 className="text-sm font-semibold text-slate-900">
                Cercanía
              </h3>
              <p className="text-xs text-slate-500">
                Te atendemos directo, sin bots ni procesos complicados.
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Línea de tiempo simple */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="space-y-4"
      >
        <h2 className="text-lg font-semibold text-slate-900">
          Nuestro caminito
        </h2>
        <div className="relative pl-6 space-y-5">
          {/* línea */}
          <div className="absolute top-1 bottom-1 left-2 w-0.5 bg-pink-100" />
          {/* item 1 */}
          <div className="relative">
            <div className="w-3 h-3 rounded-full bg-slate-900 absolute -left-[22px] top-1.5" />
            <h3 className="text-sm font-semibold text-slate-900">
              1. Las primeras figuras
            </h3>
            <p className="text-xs text-slate-500">
              Empezamos haciendo piezas para la familia y los amigos.
            </p>
          </div>
          {/* item 2 */}
          <div className="relative">
            <div className="w-3 h-3 rounded-full bg-slate-900 absolute -left-[22px] top-1.5" />
            <h3 className="text-sm font-semibold text-slate-900">
              2. Más pedidos
            </h3>
            <p className="text-xs text-slate-500">
              Comenzaron a pedir más colores, animales y formas.
            </p>
          </div>
          {/* item 3 */}
          <div className="relative">
            <div className="w-3 h-3 rounded-full bg-slate-900 absolute -left-[22px] top-1.5" />
            <h3 className="text-sm font-semibold text-slate-900">
              3. Página web
            </h3>
            <p className="text-xs text-slate-500">
              Creamos este sitio para que puedan ver todo sin escribirnos primero.
            </p>
          </div>
        </div>
      </motion.div>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.25 }}
        className="bg-white/80 backdrop-blur border border-white/50 rounded-xl p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
      >
        <div>
          <h2 className="text-lg font-semibold text-slate-900">
            ¿Quieres algo personalizado?
          </h2>
          <p className="text-sm text-slate-600">
            Escríbenos por WhatsApp y cuéntanos qué figura tienes en mente.
          </p>
        </div>
        <a
          href={`https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${encodeURIComponent(
            "Hola, quiero una figura personalizada 😄"
          )}`}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center justify-center bg-slate-900 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-slate-800 transition"
        >
          Hablar por WhatsApp
        </a>
      </motion.div>
    </div>
  );
}
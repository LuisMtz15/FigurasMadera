import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { SITE_CONFIG } from "../config/site.js";
import { useEffect, useState } from "react";
import { fetchProducts } from "../lib/productsApi";
import { THEME } from "../config/theme";

export default function Home() {
  const [featured, setFeatured] = useState(null);

  useEffect(() => {
    (async () => {
      const products = await fetchProducts();
      if (products && products.length > 0) {
        setFeatured(products[0]);
      } else {
        setFeatured(null);
      }
    })();
  }, []);

  const generalMessage = encodeURIComponent(SITE_CONFIG.whatsappMessage);
  const generalLink = `https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${generalMessage}`;

  return (
    <div
      className="container-main py-12 lg:py-16"
      style={{ background: "transparent" }}
    >
      <div className="grid gap-10 lg:grid-cols-2 items-center">
        {/* Texto */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-5"
        >
          <span
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium"
            style={{ backgroundColor: THEME.mint, color: THEME.dark }}
          >
            Belleza en Madera · artesanal
          </span>

          <h1 className="text-4xl md:text-5xl font-bold tracking-tight"
              style={{ color: THEME.dark }}>
            Figuras de madera con colores suaves ✨
          </h1>

          <p className="text-slate-600 max-w-xl">
            Piezas pintadas a mano, ideales para hogar, oficina o regalo. Si te
            gusta una, nos escribes por WhatsApp y la apartas.
          </p>

          <div className="flex flex-wrap gap-3">
            <Link
              to="/productos"
              className="px-5 py-2 rounded-md text-sm font-medium text-white"
              style={{ backgroundColor: THEME.accent }}
            >
              Ver productos
            </Link>
            <a
              href={generalLink}
              target="_blank"
              rel="noreferrer"
              className="px-5 py-2 rounded-md text-sm font-medium border"
              style={{ borderColor: "#E5D5CB", backgroundColor: "white" }}
            >
              Escribir por WhatsApp
            </a>
          </div>

          <p className="text-xs text-slate-500">
            Hecho a mano · Colores pastel · Personalizable
          </p>
        </motion.div>

        {/* Tarjeta destacada */}
        <motion.div
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="lg:justify-self-end"
        >
          <div
            className="rounded-2xl shadow-md border p-6 w-full max-w-sm mx-auto"
            style={{
              backgroundColor: "rgba(255,255,255,0.75)",
              borderColor: "rgba(255,255,255,0.5)",
            }}
          >
            {featured ? (
              <>
                {featured.image_url ? (
                  <div className="aspect-video rounded-xl overflow-hidden mb-4"
                       style={{ backgroundColor: THEME.bgSoft }}>
                    <img
                      src={featured.image_url}
                      alt={featured.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <div
                    className="aspect-video rounded-xl mb-4 flex items-center justify-center text-6xl"
                    style={{
                      background: `linear-gradient(135deg, ${THEME.surface}, #fff)`,
                    }}
                  >
                    🪵
                  </div>
                )}
                <h2 className="text-lg font-semibold" style={{ color: THEME.dark }}>
                  {featured.name}
                </h2>
                <p className="text-sm text-slate-500 mb-3">
                  {featured.description || "Figura de madera pintada a mano."}
                </p>
                <p className="text-base font-semibold text-slate-900 mb-4">
                  {featured.price ? `$${featured.price} MXN` : ""}
                </p>
                <a
                  href={`https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${encodeURIComponent(
                    `Hola 👋, vi la figura "${featured.name}" y quiero más información.`
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full inline-flex justify-center px-4 py-2 rounded-md text-sm font-medium text-white"
                  style={{ backgroundColor: THEME.accent }}
                >
                  Pedir por WhatsApp
                </a>
              </>
            ) : (
              <>
                <div
                  className="aspect-video rounded-xl mb-4 flex items-center justify-center text-6xl"
                  style={{
                    background: `linear-gradient(135deg, ${THEME.surface}, #fff)`,
                  }}
                >
                  🪵
                </div>
                <h2 className="text-lg font-semibold" style={{ color: THEME.dark }}>
                  Aún no hay productos cargados
                </h2>
                <p className="text-sm text-slate-500 mb-4">
                  Estamos subiendo las piezas. Escríbenos si buscas algo en
                  específico.
                </p>
                <a
                  href={generalLink}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full inline-flex justify-center px-4 py-2 rounded-md text-sm font-medium text-white"
                  style={{ backgroundColor: THEME.accent }}
                >
                  Pedir por WhatsApp
                </a>
              </>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
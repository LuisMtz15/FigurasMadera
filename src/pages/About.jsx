// src/pages/About.jsx
import { Link } from "react-router-dom";
import { ArrowRight, Brush, Gift, Heart, MessageCircle, Sparkles } from "lucide-react";
import { SITE_CONFIG } from "../config/site.js";
import { THEME, alpha } from "../config/theme.js";

const values = [
  {
    icon: Brush,
    title: "Pintado a mano",
    text: "Cada pieza se trabaja con calma, detalle y un acabado único.",
    color: THEME.palette.coral,
  },
  {
    icon: Gift,
    title: "Para regalar",
    text: "Creamos detalles que acompañan fechas importantes y momentos bonitos.",
    color: THEME.palette.sage,
  },
  {
    icon: Heart,
    title: "Con intención",
    text: "Nos importa que cada figura tenga personalidad, historia y presencia.",
    color: THEME.palette.plum,
  },
];

export default function About() {
  const whatsappLink = `https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${encodeURIComponent(
    "Hola, quiero una figura personalizada."
  )}`;

  return (
    <div className="container-main py-10 md:py-12 space-y-10">
      <section
        className="overflow-hidden rounded-[1.75rem] p-5 sm:p-6 md:p-8 lg:p-10"
        style={{
          backgroundColor: THEME.primary,
          color: THEME.textInverse,
          boxShadow: `0 34px 70px -48px ${THEME.shadowStrong}`,
        }}
      >
        <div className="grid gap-8 xl:grid-cols-[1.05fr_0.95fr] xl:items-end">
          <div>
            <p className="mb-4 inline-flex max-w-full items-center gap-2 rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] sm:text-xs sm:tracking-[0.16em]" style={{ backgroundColor: alpha(THEME.palette.white, 0.12) }}>
              <Sparkles size={14} />
              Belleza en Madera
            </p>
            <h1 className="font-display text-4xl font-black leading-tight sm:text-5xl md:text-6xl xl:text-7xl">
              Detalles hechos para quedarse
            </h1>
            <p className="mt-6 max-w-2xl text-sm leading-relaxed md:text-base" style={{ color: alpha(THEME.palette.white, 0.82) }}>
              Somos un taller de figuras de madera pintadas a mano. Creamos piezas para regalar, decorar y celebrar esas fechas que merecen un detalle especial.
            </p>
          </div>

          <div
            className="rounded-[1.5rem] p-5"
            style={{
              backgroundColor: alpha(THEME.palette.white, 0.1),
              border: `1px solid ${alpha(THEME.palette.white, 0.18)}`,
            }}
          >
            <p className="font-display text-3xl font-black leading-tight">
              No hacemos piezas en serie. Hacemos detalles con intención.
            </p>
            <p className="mt-4 text-sm leading-relaxed" style={{ color: alpha(THEME.palette.white, 0.78) }}>
              Una idea, una temporada, un regalo o un recuerdo: desde ahí empieza cada diseño.
            </p>
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {values.map(({ icon: Icon, title, text, color }) => (
          <article
            key={title}
            className="rounded-[1.5rem] p-5"
            style={{
              backgroundColor: color,
              color: color === THEME.palette.sage ? THEME.textInverse : THEME.textInverse,
              boxShadow: `0 28px 58px -42px ${THEME.shadowStrong}`,
            }}
          >
            <div className="mb-8 flex h-11 w-11 items-center justify-center rounded-2xl" style={{ backgroundColor: alpha(THEME.palette.white, 0.18) }}>
              <Icon size={20} />
            </div>
            <h2 className="font-display text-3xl font-black leading-tight">
              {title}
            </h2>
            <p className="mt-3 text-sm leading-relaxed" style={{ color: alpha(THEME.palette.white, 0.8) }}>
              {text}
            </p>
          </article>
        ))}
      </section>

      <section className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.14em]" style={{ color: THEME.primary }}>
            Nuestra forma de crear
          </p>
          <h2 className="font-display mt-2 text-4xl font-black leading-tight md:text-6xl" style={{ color: THEME.textStrong }}>
            De una idea pequeña a una pieza especial
          </h2>
        </div>

        <div className="grid gap-3">
          {[
            ["Escuchamos la idea", "Nos cuentas la ocasión, colores, tamaño o referencia."],
            ["Diseñamos la pieza", "Aterrizamos el detalle para que se vea bonito y tenga sentido."],
            ["La pintamos a mano", "Cuidamos el acabado para que sea una pieza única."],
          ].map(([title, text], index) => (
            <div
              key={title}
              className="grid gap-4 rounded-[1.25rem] p-4 sm:grid-cols-[auto_1fr] sm:items-start"
              style={{
                backgroundColor: index === 1 ? THEME.surfaceSoft : THEME.palette.white,
                border: `1px solid ${THEME.border}`,
              }}
            >
              <div
                className="flex h-10 w-10 items-center justify-center rounded-xl text-sm font-black"
                style={{
                  backgroundColor: index === 2 ? THEME.primary : THEME.tintCoral,
                  color: index === 2 ? THEME.textInverse : THEME.primary,
                }}
              >
                {index + 1}
              </div>
              <div>
                <h3 className="text-base font-black" style={{ color: THEME.textStrong }}>
                  {title}
                </h3>
                <p className="mt-1 text-sm leading-relaxed" style={{ color: THEME.text }}>
                  {text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section
        className="grid gap-6 rounded-[1.75rem] p-6 md:grid-cols-[1fr_auto] md:items-center md:p-8"
        style={{
          backgroundColor: THEME.surfaceStrong,
          border: `1px solid ${THEME.borderStrong}`,
          boxShadow: `0 28px 58px -44px ${THEME.shadowStrong}`,
        }}
      >
        <div>
          <h2 className="font-display text-3xl font-black leading-tight md:text-4xl" style={{ color: THEME.textStrong }}>
            ¿Tienes una pieza en mente?
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed" style={{ color: THEME.text }}>
            Podemos ayudarte a convertir una idea, una fecha o un regalo en una figura de madera pintada a mano.
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <a
            href={whatsappLink}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold"
            style={{
              backgroundColor: THEME.primary,
              color: THEME.textInverse,
            }}
          >
            <MessageCircle size={17} />
            Hablar por WhatsApp
          </a>
          <Link
            to="/productos"
            className="inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold"
            style={{
              backgroundColor: THEME.palette.white,
              color: THEME.primary,
              border: `1px solid ${THEME.borderStrong}`,
            }}
          >
            Ver catálogo
            <ArrowRight size={17} />
          </Link>
        </div>
      </section>
    </div>
  );
}

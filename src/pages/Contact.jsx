// src/pages/Contact.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowRight,
  Mail,
  MessageCircle,
  Paintbrush,
  Phone,
  Send,
  Sparkles,
  User,
} from "lucide-react";
import { SITE_CONFIG } from "../config/site.js";
import { THEME, alpha } from "../config/theme.js";

const inputShellStyle = {
  backgroundColor: THEME.palette.white,
  border: `1px solid ${THEME.border}`,
};

export default function Contact() {
  const navigate = useNavigate();
  const [sending, setSending] = useState(false);

  const whatsappLink = `https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${encodeURIComponent(
    "Hola, vi la página Belleza en Madera y quiero más información."
  )}`;

  function encode(data) {
    return Object.keys(data)
      .map(
        (key) => encodeURIComponent(key) + "=" + encodeURIComponent(data[key])
      )
      .join("&");
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSending(true);

    const form = e.target;

    const formData = {
      "form-name": "contact",
      subject: "Formulario Belleza en Madera",
      name: form.name.value,
      email: form.email.value,
      phone: form.phone.value,
      topic: form.topic.value,
      message: form.message.value,
    };

    try {
      await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: encode(formData),
      });

      navigate("/contact-success");
    } catch (err) {
      console.error("Error enviando formulario:", err);
      alert("No se pudo enviar, inténtalo de nuevo.");
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="container-main py-10 md:py-12 space-y-8">
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
              Hablemos de tu idea
            </p>
            <h1 className="font-display text-4xl font-black leading-tight sm:text-5xl md:text-6xl xl:text-7xl">
              Cuéntanos qué quieres crear
            </h1>
            <p className="mt-6 max-w-2xl text-sm leading-relaxed md:text-base" style={{ color: alpha(THEME.palette.white, 0.82) }}>
              Escríbenos si viste una pieza que te gustó, quieres cotizar un diseño personalizado o necesitas ayuda para elegir un regalo.
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
              La forma más rápida es por WhatsApp.
            </p>
            <p className="mt-3 text-sm leading-relaxed" style={{ color: alpha(THEME.palette.white, 0.78) }}>
              Te respondemos para revisar medidas, colores, fechas y disponibilidad.
            </p>
            <a
              href={whatsappLink}
              target="_blank"
              rel="noreferrer"
              className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold sm:w-fit"
              style={{
                backgroundColor: THEME.palette.white,
                color: THEME.primary,
              }}
            >
              <MessageCircle size={17} />
              Escribir por WhatsApp
            </a>
          </div>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[0.88fr_1.12fr] lg:items-start">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
          <article
            className="rounded-[1.5rem] p-5"
            style={{
              backgroundColor: THEME.palette.coral,
              color: THEME.textInverse,
              boxShadow: `0 28px 58px -42px ${THEME.shadowStrong}`,
            }}
          >
            <div className="mb-8 flex h-11 w-11 items-center justify-center rounded-2xl" style={{ backgroundColor: alpha(THEME.palette.white, 0.18) }}>
              <MessageCircle size={20} />
            </div>
            <h2 className="font-display text-3xl font-black leading-tight">
              Atención directa
            </h2>
            <p className="mt-3 text-sm leading-relaxed" style={{ color: alpha(THEME.palette.white, 0.82) }}>
              Ideal para dudas rápidas, precios y disponibilidad de piezas.
            </p>
          </article>

          <article
            className="rounded-[1.5rem] p-5"
            style={{
              backgroundColor: THEME.palette.sage,
              color: THEME.textInverse,
              boxShadow: `0 28px 58px -42px ${THEME.shadowStrong}`,
            }}
          >
            <div className="mb-8 flex h-11 w-11 items-center justify-center rounded-2xl" style={{ backgroundColor: alpha(THEME.palette.white, 0.18) }}>
              <Paintbrush size={20} />
            </div>
            <h2 className="font-display text-3xl font-black leading-tight">
              Encargos personalizados
            </h2>
            <p className="mt-3 text-sm leading-relaxed" style={{ color: alpha(THEME.palette.white, 0.82) }}>
              Cuéntanos la ocasión, colores o idea para crear una pieza especial.
            </p>
          </article>

          <article
            className="rounded-[1.5rem] p-5"
            style={{
              backgroundColor: THEME.palette.plum,
              color: THEME.textInverse,
              boxShadow: `0 28px 58px -42px ${THEME.shadowStrong}`,
            }}
          >
            <div className="mb-6 flex h-11 w-11 items-center justify-center rounded-2xl" style={{ backgroundColor: alpha(THEME.palette.white, 0.18) }}>
              <Phone size={20} />
            </div>
            <p className="text-sm font-semibold">Horario</p>
            <p className="mt-2 text-sm leading-relaxed" style={{ color: alpha(THEME.palette.white, 0.82) }}>
              Lunes a sábado, 10:00 am - 6:00 pm.
            </p>
            <p className="mt-3 text-xs font-semibold" style={{ color: alpha(THEME.palette.white, 0.72) }}>
              +52 {SITE_CONFIG.whatsappNumber}
            </p>
          </article>
        </div>

        <div
          className="rounded-[1.75rem] p-6 md:p-7 space-y-5"
          style={{
            backgroundColor: THEME.surfaceStrong,
            border: `1px solid ${THEME.borderStrong}`,
            boxShadow: `0 30px 60px -42px ${THEME.shadowStrong}`,
          }}
        >
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.14em]" style={{ color: THEME.primary }}>
              Formulario
            </p>
            <h2 className="font-display mt-2 text-3xl font-black leading-tight md:text-4xl" style={{ color: THEME.textStrong }}>
              Déjanos tus datos
            </h2>
            <p className="mt-2 text-sm leading-relaxed" style={{ color: THEME.text }}>
              Te respondemos por correo o WhatsApp para darle forma a tu pedido.
            </p>
          </div>

          <form
            name="contact"
            data-netlify="true"
            data-netlify-honeypot="bot-field"
            onSubmit={handleSubmit}
            className="space-y-4"
          >
            <input type="hidden" name="form-name" value="contact" />
            <input
              type="hidden"
              name="subject"
              value="Formulario Belleza en Madera"
            />

            <p className="hidden">
              <label>
                No llenar: <input name="bot-field" />
              </label>
            </p>

            <div className="grid gap-4 md:grid-cols-2">
              <FieldShell icon={User} label="Nombre completo">
                <input
                  type="text"
                  name="name"
                  className="w-full border-0 bg-transparent p-0 text-sm font-medium outline-none"
                  style={{ color: THEME.textStrong }}
                  placeholder="Ej. Mariela Gómez"
                  required
                />
              </FieldShell>

              <FieldShell icon={Mail} label="Correo">
                <input
                  type="email"
                  name="email"
                  className="w-full border-0 bg-transparent p-0 text-sm font-medium outline-none"
                  style={{ color: THEME.textStrong }}
                  placeholder="tu@correo.com"
                  required
                />
              </FieldShell>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <FieldShell icon={Phone} label="Teléfono / WhatsApp">
                <input
                  type="tel"
                  name="phone"
                  className="w-full border-0 bg-transparent p-0 text-sm font-medium outline-none"
                  style={{ color: THEME.textStrong }}
                  placeholder="+52 ..."
                />
              </FieldShell>

              <div className="space-y-1.5">
                <label className="text-sm font-semibold" style={{ color: THEME.textStrong }}>
                  Asunto / Tema
                </label>
                <input
                  type="text"
                  name="topic"
                  className="theme-input h-12 rounded-2xl text-sm font-medium"
                  placeholder="Pedido, pieza vista, idea personalizada..."
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-semibold" style={{ color: THEME.textStrong }}>
                Cuéntanos qué necesitas
              </label>
              <textarea
                rows={5}
                name="message"
                className="theme-input rounded-2xl text-sm font-medium"
                placeholder="Me gustó una pieza, quiero cotizar un detalle personalizado para una fecha especial..."
                required
              />
            </div>

            <button
              type="submit"
              disabled={sending}
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl py-3 text-sm font-semibold disabled:opacity-60"
              style={{
                backgroundColor: THEME.primary,
                color: THEME.textInverse,
              }}
            >
              {sending ? "Enviando..." : "Enviar mensaje"}
              <Send size={16} />
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}

function FieldShell({ icon: Icon, label, children }) {
  return (
    <div className="space-y-1.5">
      <label className="text-sm font-semibold" style={{ color: THEME.textStrong }}>
        {label}
      </label>
      <div className="flex h-12 items-center gap-3 rounded-2xl px-4" style={inputShellStyle}>
        <span
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl"
          style={{
            backgroundColor: THEME.tintCoral,
            color: THEME.primary,
          }}
        >
          <Icon size={16} />
        </span>
        {children}
      </div>
    </div>
  );
}

// src/pages/Contact.jsx
import { SITE_CONFIG } from "../config/site.js";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { THEME } from "../config/theme.js";
import { Mail, MessageCircle, Paintbrush, Phone, User } from "lucide-react";

export default function Contact() {
  const navigate = useNavigate();
  const [sending, setSending] = useState(false);

  const whatsappLink = `https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${encodeURIComponent(
    "Hola 👋, vi la página Belleza en Madera y quiero más información."
  )}`;

  // Helper para enviar datos en formato form-urlencoded
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
      subject: "Formulario Belleza en Madera", // fijo
      name: form.name.value,
      email: form.email.value,
      phone: form.phone.value,
      topic: form.topic.value, // lo que escribió el usuario en "Asunto / Tema"
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
    <div className="py-12">
      <div className="container-main max-w-6xl space-y-8">
        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div className="space-y-5">
            <div className="space-y-3">
              <span
                className="inline-flex items-center rounded-full px-3 py-1 text-[11px] font-semibold tracking-[0.16em] uppercase"
                style={{
                  backgroundColor: THEME.tintCoral,
                  color: THEME.primary,
                  border: `1px solid ${THEME.border}`,
                }}
              >
                Hablemos de tu idea
              </span>
              <div className="space-y-2">
                <h1 className="text-3xl md:text-4xl font-bold leading-tight" style={{ color: THEME.textStrong }}>
                  Contáctanos
                </h1>
                <p className="max-w-xl text-sm md:text-base leading-relaxed" style={{ color: THEME.text }}>
                  Si viste una pieza que te gustó o quieres un detalle personalizado, cuéntanos lo que tienes en mente y te ayudamos a hacerlo realidad.
                </p>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
              <div
                className="rounded-2xl p-4 space-y-2"
                style={{
                  backgroundColor: THEME.surfaceStrong,
                  border: `1px solid ${THEME.border}`,
                  boxShadow: `0 20px 40px -34px ${THEME.shadowStrong}`,
                }}
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl" style={{ backgroundColor: THEME.tintCoral }}>
                  <MessageCircle size={18} style={{ color: THEME.primary }} />
                </div>
                <p className="text-sm font-semibold" style={{ color: THEME.textStrong }}>
                  Atención por WhatsApp
                </p>
                <p className="text-sm leading-relaxed" style={{ color: THEME.text }}>
                  Ideal si quieres resolver dudas rápido o pedir información de una pieza.
                </p>
              </div>

              <div
                className="rounded-2xl p-4 space-y-2"
                style={{
                  backgroundColor: THEME.surfaceStrong,
                  border: `1px solid ${THEME.border}`,
                  boxShadow: `0 20px 40px -34px ${THEME.shadowStrong}`,
                }}
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl" style={{ backgroundColor: THEME.surfaceSoft }}>
                  <Paintbrush size={18} style={{ color: THEME.primary }} />
                </div>
                <p className="text-sm font-semibold" style={{ color: THEME.textStrong }}>
                  Piezas personalizadas
                </p>
                <p className="text-sm leading-relaxed" style={{ color: THEME.text }}>
                  Cuéntanos la ocasión, colores o idea que quieres para crear un detalle especial.
                </p>
              </div>
            </div>

            <div
              className="rounded-2xl p-5 space-y-4"
              style={{
                backgroundColor: THEME.primary,
                color: THEME.textInverse,
                boxShadow: `0 28px 54px -36px ${THEME.shadowStrong}`,
              }}
            >
              <div className="space-y-1">
                <p className="text-sm font-semibold">¿Lo quieres resolver rapidito?</p>
                <p className="text-sm" style={{ color: "rgba(255,255,255,0.82)" }}>
                  Escríbenos directo y te respondemos por WhatsApp.
                </p>
              </div>

              <a
                href={whatsappLink}
                target="_blank"
                rel="noreferrer"
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-medium transition sm:w-fit"
                style={{
                  backgroundColor: THEME.palette.white,
                  color: THEME.primary,
                }}
              >
                <Phone size={16} />
                Escribir por WhatsApp
              </a>

              <div className="flex flex-col gap-1 text-xs" style={{ color: "rgba(255,255,255,0.76)" }}>
                <p>Número: +52 {SITE_CONFIG.whatsappNumber}</p>
                <p>Horario: Lunes a sábado, 10:00 am - 6:00 pm.</p>
              </div>
            </div>
          </div>

          <div
            className="theme-panel rounded-[1.75rem] p-6 md:p-7 space-y-5 lg:self-center"
            style={{
              backgroundColor: THEME.surfaceStrong,
              border: `1px solid ${THEME.borderStrong}`,
              boxShadow: `0 30px 60px -42px ${THEME.shadowStrong}`,
            }}
          >
            <div className="space-y-2">
              <p className="text-l font-semibold" style={{ color: THEME.textStrong }}>
                Formulario
              </p>
              <p className="text-sm leading-relaxed" style={{ color: THEME.text }}>
                Déjanos tus datos y cuéntanos qué necesitas. Te respondemos por correo o WhatsApp.
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
                <div className="space-y-1.5">
                  <label className="text-sm font-medium" style={{ color: THEME.textStrong }}>
                    Nombre completo
                  </label>
                  <div
                    className="flex h-10 items-center gap-2 rounded-md px-3"
                    style={{
                      backgroundColor: THEME.surfaceStrong,
                      border: `1px solid ${THEME.border}`,
                    }}
                  >
                    <User size={16} className="shrink-0" style={{ color: THEME.textSoft }} />
                    <input
                      type="text"
                      name="name"
                      className="w-full border-0 bg-transparent p-0 text-sm outline-none"
                      style={{ color: THEME.textStrong }}
                      placeholder="Ej. Mariela Gómez"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium" style={{ color: THEME.textStrong }}>
                    Correo
                  </label>
                  <div
                    className="flex h-10 items-center gap-2 rounded-md px-3"
                    style={{
                      backgroundColor: THEME.surfaceStrong,
                      border: `1px solid ${THEME.border}`,
                    }}
                  >
                    <Mail size={16} className="shrink-0" style={{ color: THEME.textSoft }} />
                    <input
                      type="email"
                      name="email"
                      className="w-full border-0 bg-transparent p-0 text-sm outline-none"
                      style={{ color: THEME.textStrong }}
                      placeholder="tu@correo.com"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-1.5">
                  <label className="text-sm font-medium" style={{ color: THEME.textStrong }}>
                    Teléfono / WhatsApp
                  </label>
                  <div
                    className="flex h-10 items-center gap-2 rounded-md px-3"
                    style={{
                      backgroundColor: THEME.surfaceStrong,
                      border: `1px solid ${THEME.border}`,
                    }}
                  >
                    <Phone size={16} className="shrink-0" style={{ color: THEME.textSoft }} />
                    <input
                      type="tel"
                      name="phone"
                      className="w-full border-0 bg-transparent p-0 text-sm outline-none"
                      style={{ color: THEME.textStrong }}
                      placeholder="+52 ..."
                    />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium" style={{ color: THEME.textStrong }}>
                    Asunto / Tema
                  </label>
                  <input
                    type="text"
                    name="topic"
                    className="theme-input text-sm"
                    placeholder="Pedido, pieza vista, idea personalizada..."
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-medium" style={{ color: THEME.textStrong }}>
                  Cuéntanos qué necesitas
                </label>
                <textarea
                  rows={5}
                  name="message"
                  className="theme-input text-sm"
                  placeholder="Me gustó una pieza, quiero cotizar un detalle personalizado para una fecha especial..."
                  required
                />
              </div>

              <button
                type="submit"
                disabled={sending}
                className="theme-btn-primary w-full py-3 rounded-lg text-sm font-medium disabled:opacity-60"
              >
                {sending ? "Enviando..." : "Enviar mensaje"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

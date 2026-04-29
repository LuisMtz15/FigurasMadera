// src/components/ProductCard.jsx
import { useEffect, useState } from "react";
import { MessageCircle } from "lucide-react";
import { SITE_CONFIG } from "../config/site.js";
import { THEME, alpha } from "../config/theme.js";

export default function ProductCard({ product }) {
  const [open, setOpen] = useState(false);

  // bloquear scroll del body y escuchar ESC
  useEffect(() => {
    if (open) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      const onKey = (e) => {
        if (e.key === "Escape") setOpen(false);
      };
      window.addEventListener("keydown", onKey);
      return () => {
        document.body.style.overflow = prev;
        window.removeEventListener("keydown", onKey);
      };
    }
  }, [open]);

  const message = encodeURIComponent(
    `Hola 👋, me interesa adquirir la figura "${product.name}"`
  );
  const link = `https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${message}`;

  const onSale = product.on_sale && product.sale_price;

  return (
    <>
      <div
        className="group flex h-full flex-col justify-between overflow-hidden rounded-[1.5rem] border p-4 transition duration-200 hover:-translate-y-0.5"
        style={{
          backgroundColor: THEME.palette.white,
          borderColor: THEME.borderStrong,
          boxShadow: `0 30px 58px -34px ${THEME.shadowStrong}`,
        }}
      >
        <button
          type="button"
          onClick={() => product.image_url && setOpen(true)}
          className="relative mb-4 aspect-[4/3] cursor-zoom-in overflow-hidden rounded-[1.25rem] p-3 focus:outline-none"
          style={{
            background: `linear-gradient(180deg, ${THEME.surfaceSoft} 0%, ${alpha(THEME.palette.coral, 0.08)} 100%)`,
            boxShadow: `0 0 0 0 ${THEME.focus}`,
          }}
          aria-label={`Ver imagen de ${product.name}`}
        >
          {product.image_url ? (
            <img
              src={product.image_url}
              alt={product.name}
              className="h-full w-full object-contain transition duration-300 group-hover:scale-[1.04]"
              loading="lazy"
            />
          ) : (
            <div className="flex items-center justify-center h-full text-5xl">
              🪵
            </div>
          )}

          {onSale && (
            <span
              className="absolute top-2 left-2 text-[10px] px-2 py-1 rounded-full"
              style={{
                backgroundColor: THEME.primary,
                color: THEME.textInverse,
              }}
            >
              Promoción
            </span>
          )}
        </button>

        <div className="flex-1 flex flex-col justify-between min-w-0">
          <div>
            {product.category ? (
              <span
                className="mb-2 inline-flex w-fit rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase"
                style={{
                  backgroundColor: THEME.tintCoral,
                  color: THEME.primary,
                }}
              >
                {product.category}
              </span>
            ) : null}
            <h3
              className="font-display text-xl font-black leading-tight line-clamp-2"
              style={{ color: THEME.textStrong }}
            >
              {product.name}
            </h3>
            <p className="mt-2 text-sm mb-2 line-clamp-2" style={{ color: THEME.text }}>
              {product.description || "Figura de madera pintada a mano."}
            </p>
          </div>

          <div className="mt-4 flex items-end justify-between gap-3">
            <div>
              {onSale ? (
                <div>
                  <span className="text-xs line-through" style={{ color: THEME.textSoft }}>
                    ${product.price} MXN
                  </span>
                  <p className="text-lg font-black" style={{ color: THEME.textStrong }}>
                    ${product.sale_price} MXN
                  </p>
                </div>
              ) : (
                <p className="text-lg font-black" style={{ color: THEME.textStrong }}>
                  {product.price ? `$${product.price} MXN` : ""}
                </p>
              )}
            </div>

            <a
              href={link}
              target="_blank"
              rel="noreferrer"
              className="hidden h-11 w-11 shrink-0 items-center justify-center rounded-full transition hover:scale-105 md:inline-flex"
              style={{
                backgroundColor: THEME.primary,
                color: THEME.textInverse,
                boxShadow: `0 16px 28px -20px ${THEME.shadowStrong}`,
              }}
              aria-label={`Pedir ${product.name} por WhatsApp`}
            >
              <MessageCircle size={19} />
            </a>
          </div>

          <a
            href={link}
            target="_blank"
            rel="noreferrer"
            className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl py-2.5 text-sm font-semibold md:hidden"
            style={{
              backgroundColor: THEME.primary,
              color: THEME.textInverse,
            }}
          >
            Pedir por WhatsApp
            <MessageCircle size={16} />
          </a>
        </div>
      </div>

      {open && (
        <div
          className="fixed inset-0 z-50 backdrop-blur-[1px] flex items-center justify-center p-4 theme-overlay"
          role="dialog"
          aria-modal="true"
          aria-label={`Imagen de ${product.name}`}
          onClick={(e) => {
            if (e.target === e.currentTarget) setOpen(false);
          }}
        >
          <div className="relative max-w-[90vw] max-h-[85vh]">
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Cerrar imagen"
              className="absolute -top-3 -right-3 md:-top-4 md:-right-4 h-9 w-9 rounded-full shadow-lg flex items-center justify-center"
              style={{
                backgroundColor: THEME.surfaceStrong,
                color: THEME.textStrong,
              }}
            >
              ✕
            </button>

            {product.image_url ? (
              <img
                src={product.image_url}
                alt={product.name}
                className="rounded-lg shadow-xl max-w-[90vw] max-h-[85vh] object-contain"
                style={{ backgroundColor: THEME.palette.white }}
              />
            ) : (
              <div
                className="rounded-lg h-[60vh] w-[80vw] max-w-[700px] flex items-center justify-center text-6xl"
                style={{ backgroundColor: THEME.palette.white }}
              >
                🪵
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

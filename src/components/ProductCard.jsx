// src/components/ProductCard.jsx
import { useEffect, useState } from "react";
import { SITE_CONFIG } from "../config/site.js";
import { THEME } from "../config/theme.js";

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
        className="rounded-xl border p-4 flex flex-col justify-between transition h-full"
        style={{
          backgroundColor: THEME.palette.white,
          borderColor: THEME.borderStrong,
          boxShadow: `0 28px 54px -26px ${THEME.shadowStrong}`,
        }}
      >
        <button
          type="button"
          onClick={() => product.image_url && setOpen(true)}
          className="aspect-square rounded-lg overflow-hidden mb-3 relative cursor-zoom-in focus:outline-none"
          style={{
            backgroundColor: THEME.surfaceSoft,
            boxShadow: `0 0 0 0 ${THEME.focus}`,
          }}
          aria-label={`Ver imagen de ${product.name}`}
        >
          {product.image_url ? (
            <img
              src={product.image_url}
              alt={product.name}
              className="w-full h-full object-cover"
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
                backgroundColor: THEME.accent,
                color: THEME.textInverse,
              }}
            >
              Promoción
            </span>
          )}
        </button>

        {/* TEXTO + BOTÓN */}
        <div className="flex-1 flex flex-col justify-between min-w-0">
          <div>
            <h3
              className="text-lg font-semibold truncate"
              style={{ color: THEME.textStrong }}
            >
              {product.name}
            </h3>
            {product.category ? (
              <p className="text-[11px] mb-1" style={{ color: THEME.textSoft }}>{product.category}</p>
            ) : null}
            <p className="text-sm mb-2 line-clamp-2" style={{ color: THEME.text }}>
              {product.description || "Figura de madera pintada a mano."}
            </p>
          </div>

          <div className="mt-2 mb-2">
            {onSale ? (
              <div className="flex items-baseline gap-2">
                <span className="text-xs line-through" style={{ color: THEME.textSoft }}>
                  ${product.price} MXN
                </span>
                <span className="text-base font-semibold" style={{ color: THEME.textStrong }}>
                  ${product.sale_price} MXN
                </span>
              </div>
            ) : (
              <p className="text-sm font-medium" style={{ color: THEME.textStrong }}>
                {product.price ? `$${product.price} MXN` : ""}
              </p>
            )}
          </div>

          <a
            href={link}
            target="_blank"
            rel="noreferrer"
            className="theme-btn-primary mt-2 w-full text-center text-sm font-medium py-2 rounded-lg"
          >
            Pedir por WhatsApp
          </a>
        </div>
      </div>

      {/* LIGHTBOX / MODAL */}
      {open && (
        <div
          className="fixed inset-0 z-50 backdrop-blur-[1px] flex items-center justify-center p-4 theme-overlay"
          role="dialog"
          aria-modal="true"
          aria-label={`Imagen de ${product.name}`}
          onClick={(e) => {
            // cerrar si se hace click en el fondo (no en la imagen)
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

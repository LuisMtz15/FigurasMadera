// src/components/ProductCard.jsx
import { SITE_CONFIG } from "../config/site.js";

export default function ProductCard({ product }) {
  const message = encodeURIComponent(
    `Hola 👋, vi la figura "${product.name}" en la página y quiero más información. Precio: $${product.price} MXN`
  );

  const waLink = `https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${message}`;

  return (
    <div className="bg-white/80 backdrop-blur rounded-xl border border-white/40 shadow-sm hover:shadow-md transition flex flex-col">
      <div className="h-40 bg-linear-to-br from-pink-100 via-white to-indigo-50 rounded-t-xl flex items-center justify-center text-5xl">
        🪵
      </div>
      <div className="p-4 flex-1 flex flex-col gap-2">
        <div className="flex items-start justify-between gap-3">
          <h2 className="text-base font-semibold text-slate-900 leading-tight">
            {product.name}
          </h2>
          {product.category ? (
            <span className="text-[10px] uppercase tracking-wide bg-pink-100 text-slate-800 px-2 py-1 rounded-full">
              {product.category}
            </span>
          ) : null}
        </div>
        <p className="text-sm text-slate-500 flex-1">{product.description}</p>
        <p className="text-lg font-semibold text-slate-900">
          ${product.price} MXN
        </p>
        <a
          href={waLink}
          target="_blank"
          rel="noreferrer"
          className="mt-2 inline-flex items-center justify-center gap-2 bg-slate-900 text-white text-sm font-medium py-2 rounded-md hover:bg-slate-800 transition"
        >
          Pedir por WhatsApp
        </a>
      </div>
    </div>
  );
}
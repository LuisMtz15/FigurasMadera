// src/components/ProductCard.jsx
import { SITE_CONFIG } from "../config/site.js";

export default function ProductCard({ product }) {
  const message = encodeURIComponent(
    `Hola 👋, vi la figura "${product.name}" en Belleza en Madera y quiero más información.`
  );
  const link = `https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${message}`;

  const onSale = product.on_sale && product.sale_price;

  return (
    <div
      className="rounded-xl border p-4 flex flex-col justify-between transition hover:shadow-md h-full"
      style={{
        backgroundColor: "#FDF5F0",
        borderColor: "#FCE7DA",
      }}
    >
      <div className="aspect-square rounded-lg overflow-hidden mb-3 bg-white/40 relative">
        {product.image_url ? (
          <img
            src={product.image_url}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="flex items-center justify-center h-full text-5xl">
            🪵
          </div>
        )}

        {onSale && (
          <span className="absolute top-2 left-2 bg-[#E98A6B] text-white text-[10px] px-2 py-1 rounded-full">
            Promoción
          </span>
        )}
      </div>

      <div className="flex-1 flex flex-col justify-between min-w-0">
        <div>
          <h3
            className="text-lg font-semibold truncate"
            style={{ color: "#5A3B2E" }}
          >
            {product.name}
          </h3>
          {product.category ? (
            <p className="text-[11px] text-slate-500 mb-1">
              {product.category}
            </p>
          ) : null}
          <p className="text-sm text-slate-600 mb-2 line-clamp-2">
            {product.description || "Figura de madera pintada a mano."}
          </p>
        </div>

        <div className="mt-2 mb-2">
          {onSale ? (
            <div className="flex items-baseline gap-2">
              <span className="text-xs text-slate-400 line-through">
                ${product.price} MXN
              </span>
              <span className="text-base font-semibold text-[#5A3B2E]">
                ${product.sale_price} MXN
              </span>
            </div>
          ) : (
            <p className="text-sm font-medium" style={{ color: "#5A3B2E" }}>
              {product.price ? `$${product.price} MXN` : ""}
            </p>
          )}
        </div>

        <a
          href={link}
          target="_blank"
          rel="noreferrer"
          className="mt-2 w-full text-center text-sm font-medium py-2 rounded-md text-white"
          style={{ backgroundColor: "#E98A6B" }}
        >
          Pedir por WhatsApp
        </a>
      </div>
    </div>
  );
}
// src/components/ProductCard.jsx
import { SITE_CONFIG } from "../config/site.js";

export default function ProductCard({ product }) {
  const message = encodeURIComponent(
    `Hola 👋, vi la figura "${product.name}" en Belleza en Madera y quiero más información.`
  );
  const link = `https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${message}`;

  return (
    <div
      className="rounded-xl border p-4 flex flex-col justify-between transition hover:shadow-md"
      style={{
        backgroundColor: "#FDF5F0",
        borderColor: "#FCE7DA",
      }}
    >
      {/* Imagen */}
      <div className="aspect-square rounded-lg overflow-hidden mb-3 bg-white/40">
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
      </div>

      {/* Info */}
      <div className="flex-1 flex flex-col justify-between">
        <div>
          <h3
            className="text-lg font-semibold truncate"
            style={{ color: "#5A3B2E" }}
          >
            {product.name}
          </h3>
          <p className="text-sm text-slate-600 mb-2 line-clamp-2">
            {product.description || "Figura de madera pintada a mano."}
          </p>
        </div>
        <div className="mt-2">
          <p className="text-sm font-medium" style={{ color: "#5A3B2E" }}>
            {product.price ? `$${product.price} MXN` : ""}
          </p>
        </div>

        {/* Botón */}
        <a
          href={link}
          target="_blank"
          rel="noreferrer"
          className="mt-4 w-full text-center text-sm font-medium py-2 rounded-md text-white"
          style={{ backgroundColor: "#E98A6B" }}
        >
          Pedir por WhatsApp
        </a>
      </div>
    </div>
  );
}
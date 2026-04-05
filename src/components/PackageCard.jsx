// src/components/PackageCard.jsx
import { SITE_CONFIG } from "../config/site.js";
import { THEME } from "../config/theme.js";

export default function PackageCard({ pkg, products }) {
  const hasProducts = products && products.length > 0;
  const priceIsPromo = pkg.promo && pkg.promo_price;

  const productsText = hasProducts
    ? products.map((p) => `- ${p.name}`).join("\n")
    : "No tengo el detalle de las figuras 😅";

  const message = encodeURIComponent(
    `Hola 👋, me interesa adquirir el paquete "${pkg.name}" \n` +
      (priceIsPromo
        ? `Precio promo: $${pkg.promo_price} (antes $${pkg.price})\n`
        : `Precio: $${pkg.price}\n`) +
      `\nFiguras incluidas:\n${productsText}`
  );
  const link = `https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${message}`;

  // collage balanceado
  const renderCollage = () => {
    if (!hasProducts) {
      return (
        <div className="flex items-center justify-center h-full text-5xl">
          🎁
        </div>
      );
    }

    const imgs = products.slice(0, 4);

    const Mini = ({ src, alt }) => (
      <div
        className="w-full h-36 rounded-xl flex items-center justify-center shadow-sm overflow-hidden"
        style={{ backgroundColor: THEME.surfaceSoft }}
      >
        {src ? (
          <img
            src={src}
            alt={alt}
            className="max-h-[10rem] max-w-full object-contain"
          />
        ) : (
          <span className="text-3xl">🪵</span>
        )}
      </div>
    );

    if (imgs.length === 1) {
      return (
        <div className="h-full flex items-center justify-center px-2 py-2">
          <Mini src={imgs[0].image_url} alt={imgs[0].name} />
        </div>
      );
    }

    if (imgs.length === 2) {
      return (
        <div className="flex flex-col gap-2 h-full px-2 py-2">
          <Mini src={imgs[0].image_url} alt={imgs[0].name} />
          <Mini src={imgs[1].image_url} alt={imgs[1].name} />
        </div>
      );
    }

    if (imgs.length === 3) {
      return (
        <div className="flex flex-col gap-2 h-full px-2 py-2">
          <div className="grid grid-cols-2 gap-2">
            <Mini src={imgs[0].image_url} alt={imgs[0].name} />
            <Mini src={imgs[1].image_url} alt={imgs[1].name} />
          </div>
          <div className="flex justify-center">
            <div className="w-3/4">
              <Mini src={imgs[2].image_url} alt={imgs[2].name} />
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-2 gap-2 h-full px-2 py-2">
        {imgs.map((p) => (
          <Mini key={p.id} src={p.image_url} alt={p.name} />
        ))}
      </div>
    );
  };

  return (
    <div
      className="rounded-xl border p-4 flex flex-col justify-between transition h-full"
      style={{
        backgroundColor: THEME.palette.white,
        borderColor: THEME.borderStrong,
        boxShadow: `0 28px 54px -26px ${THEME.shadowStrong}`,
      }}
    >
      <div className="rounded-lg overflow-hidden mb-3 bg-transparent relative min-h-[10rem]">
        {renderCollage()}

        <span
          className="absolute top-2 left-2 text-[10px] px-3 py-1 rounded-full shadow-sm"
          style={{
            backgroundColor: THEME.palette.white,
            color: THEME.textStrong,
          }}
        >
          Paquete
        </span>
        {hasProducts && products.length > 4 && (
          <span
            className="absolute bottom-2 right-2 text-[10px] px-2 py-0.5 rounded-full"
            style={{
              backgroundColor: THEME.overlay,
              color: THEME.textInverse,
            }}
          >
            +{products.length - 4}
          </span>
        )}
      </div>

      <div className="flex-1 flex flex-col justify-between min-w-0">
        <div>
          <h3
            className="text-lg font-semibold truncate"
            style={{ color: THEME.textStrong }}
          >
            {pkg.name}
          </h3>
          <p className="text-[11px] mb-1" style={{ color: THEME.textSoft }}>
            Incluye {products.length} figura{products.length === 1 ? "" : "s"}
          </p>
          <p className="text-sm mb-2 line-clamp-2" style={{ color: THEME.text }}>
            {pkg.description || "Paquete de figuras pintadas a mano."}
          </p>
        </div>

        <div className="mt-2 mb-2">
          {priceIsPromo ? (
            <div className="flex items-baseline gap-2">
              <span className="text-xs line-through" style={{ color: THEME.textSoft }}>
                ${pkg.price} MXN
              </span>
              <span className="text-base font-semibold" style={{ color: THEME.textStrong }}>
                ${pkg.promo_price} MXN
              </span>
            </div>
          ) : (
            <p className="text-sm font-medium" style={{ color: THEME.textStrong }}>
              {pkg.price ? `$${pkg.price} MXN` : ""}
            </p>
          )}
        </div>

        <a
          href={link}
          target="_blank"
          rel="noreferrer"
          className="theme-btn-primary mt-2 w-full text-center text-sm font-medium py-2 rounded-lg"
        >
          Pedir este paquete
        </a>
      </div>
    </div>
  );
}

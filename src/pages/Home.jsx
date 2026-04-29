// src/pages/Home.jsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Gift, MessageCircle, Sparkles } from "lucide-react";
import { fetchProducts } from "../lib/productsApi.js";
import { fetchPackages } from "../lib/packagesApi.js";
import { SITE_CONFIG } from "../config/site.js";
import { THEME, alpha } from "../config/theme.js";

const homeTones = {
  wine: THEME.palette.wine,
  wineDeep: "#641212",
  wineSoft: "#7A2F2F",
  wineDust: "#9A5B5B",
  wineClay: "#B77E78",
  wineBlush: "#E7C9C2",
  wineMist: "#F4E7E3",
  wineCream: "#FAF0E6",
};

const productBackgrounds = [
  { bg: THEME.palette.cream, text: THEME.primary, tint: alpha(THEME.palette.white, 0.52) },
  { bg: THEME.palette.sage, text: THEME.textInverse, tint: alpha(THEME.palette.white, 0.18) },
  { bg: THEME.palette.coral, text: THEME.textInverse, tint: alpha(THEME.palette.white, 0.18) },
  { bg: THEME.palette.plum, text: THEME.textInverse, tint: alpha(THEME.palette.white, 0.16) },
  { bg: THEME.palette.wine, text: THEME.textInverse, tint: alpha(THEME.palette.white, 0.12) },
];

const ribbonItems = [
  "Pintado a mano",
  "Fechas especiales",
  "Regalos personalizados",
  "Decoración de temporada",
  "Hecho con detalle",
];

function productWhatsappLink(name) {
  const message = encodeURIComponent(
    `Hola, me interesa adquirir la figura "${name}".`
  );
  return `https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${message}`;
}

function packageWhatsappLink(pkg, products) {
  const productsText =
    products.length > 0
      ? products.map((product) => `- ${product.name}`).join("\n")
      : "Me gustaría conocer las figuras incluidas.";

  const priceText =
    pkg.promo && pkg.promo_price
      ? `Precio promo: $${pkg.promo_price} MXN.`
      : `Precio: $${pkg.price} MXN.`;

  const message = encodeURIComponent(
    `Hola, me interesa el paquete "${pkg.name}".\n${priceText}\n\nFiguras incluidas:\n${productsText}`
  );

  return `https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${message}`;
}

export default function Home() {
  const [featured, setFeatured] = useState([]);
  const [packagesList, setPackagesList] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visibleProductsCount, setVisibleProductsCount] = useState(5);
  const [visiblePackagesCount, setVisiblePackagesCount] = useState(4);
  const [heroProductId, setHeroProductId] = useState(null);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const [products, packages] = await Promise.all([
        fetchProducts(),
        fetchPackages(),
      ]);

      setAllProducts(products);
      setFeatured(products);
      setPackagesList(packages);
      setHeroProductId(
        products.length > 0
          ? products[Math.floor(Math.random() * products.length)].id
          : null
      );
      setLoading(false);
    })();
  }, []);

  useEffect(() => {
    function updateVisibleCounts() {
      const width = window.innerWidth;

      if (width >= 1280) {
        setVisibleProductsCount(5);
        setVisiblePackagesCount(4);
        return;
      }

      if (width >= 1024) {
        setVisibleProductsCount(4);
        setVisiblePackagesCount(3);
        return;
      }

      if (width >= 768) {
        setVisibleProductsCount(3);
        setVisiblePackagesCount(2);
        return;
      }

      setVisibleProductsCount(3);
      setVisiblePackagesCount(2);
    }

    updateVisibleCounts();
    window.addEventListener("resize", updateVisibleCounts);

    return () => {
      window.removeEventListener("resize", updateVisibleCounts);
    };
  }, []);

  const heroProduct =
    featured.find((product) => product.id === heroProductId) || featured[0];
  const heroThumbs = featured
    .filter((product) => product.id !== heroProduct?.id)
    .slice(0, 2);
  const showcasedProducts = featured.slice(0, visibleProductsCount);

  return (
    <div
      className="min-h-screen"
      style={{
        background: `linear-gradient(180deg, ${THEME.heroGradientStart} 0%, ${THEME.backgroundAlt} 48%, ${THEME.heroGradientEnd} 100%)`,
      }}
    >
      <section className="w-full py-6 md:py-8">
        <div className="grid min-h-[calc(100vh-7rem)] gap-3 xl:grid-cols-[0.95fr_1.05fr] xl:min-h-[680px]">
          <div
            className="relative overflow-hidden rounded-[1.75rem] p-5 sm:p-6 md:p-8 lg:p-10 flex flex-col justify-between"
            style={{
              backgroundColor: THEME.primary,
              color: THEME.textInverse,
              boxShadow: `0 34px 70px -46px ${THEME.shadowStrong}`,
            }}
          >
            <div
              className="absolute inset-x-0 bottom-0 h-28 opacity-80"
              style={{
                background: `linear-gradient(180deg, transparent 0%, ${alpha(homeTones.wineDust, 0.34)} 100%)`,
              }}
            />

            <div className="relative z-10 max-w-2xl py-10 sm:py-12 md:py-16">
              <p className="mb-4 inline-flex max-w-full items-center gap-2 rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] sm:text-xs sm:tracking-[0.16em]" style={{ backgroundColor: alpha(THEME.palette.white, 0.12) }}>
                <Sparkles size={14} />
                Pintado a mano
              </p>
              <h1 className="font-display text-4xl font-black leading-tight sm:text-5xl md:text-6xl xl:text-7xl">
                Detalles en Madera
              </h1>
              <p className="mt-6 max-w-xl text-base leading-relaxed md:text-lg" style={{ color: alpha(THEME.palette.white, 0.82) }}>
                Figuras de madera pintadas a mano para regalar, decorar y celebrar las fechas que hacen especial el año.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Link
                  to="/productos"
                  className="inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold"
                  style={{
                    backgroundColor: THEME.palette.white,
                    color: THEME.primary,
                  }}
                >
                  Ver productos
                  <ArrowRight size={16} />
                </Link>
                <Link
                  to="/contacto"
                  className="inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold"
                  style={{
                    backgroundColor: alpha(THEME.palette.white, 0.12),
                    color: THEME.textInverse,
                    border: `1px solid ${alpha(THEME.palette.white, 0.28)}`,
                  }}
                >
                  Encargar una pieza
                </Link>
              </div>
            </div>

            <div className="relative z-10 space-y-4">
              <div className="grid grid-cols-3 gap-3 text-sm">
                {["Temporadas", "Regalos", "Recuerdos"].map((label) => (
                  <div
                    key={label}
                    className="rounded-2xl px-3 py-3"
                    style={{ backgroundColor: alpha(THEME.palette.white, 0.1) }}
                  >
                    <p className="font-semibold">{label}</p>
                    <p className="mt-1 text-xs" style={{ color: alpha(THEME.palette.white, 0.72) }}>
                      Hecho a mano
                    </p>
                  </div>
                ))}
              </div>

              <div className="flex justify-end pt-2 md:pt-4">
                <Link
                  to="/productos"
                  className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold"
                  style={{
                    backgroundColor: THEME.palette.white,
                    color: THEME.primary,
                  }}
                >
                  Catálogo
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </div>

          <div className="grid gap-3 md:grid-cols-[1.2fr_0.8fr] xl:min-h-full">
            <div
              className="relative min-h-[420px] overflow-hidden rounded-[1.75rem] p-4 md:min-h-full"
              style={{
                backgroundColor: THEME.palette.white,
                border: `1px solid ${THEME.borderStrong}`,
                boxShadow: `0 34px 70px -50px ${THEME.shadowStrong}`,
              }}
            >
              <div
                className="absolute inset-0"
                style={{
                  background: `radial-gradient(circle at 50% 30%, ${alpha(homeTones.wineSoft, 0.16)} 0%, transparent 38%), linear-gradient(180deg, ${homeTones.wineCream} 0%, ${THEME.palette.white} 100%)`,
                }}
              />

              <div className="relative z-10 mx-auto flex h-[min(56vh,560px)] min-h-[360px] w-full max-w-[520px] items-center justify-center px-4 pb-24 pt-4 md:px-8 md:pb-28 md:pt-8">
                {heroProduct?.image_url ? (
                  <img
                    src={heroProduct.image_url}
                    alt={heroProduct.name}
                    className="h-full w-full object-contain"
                  />
                ) : (
                  <img
                    src="/Logo_completo.png"
                    alt="Belleza en Madera"
                    className="h-40 w-auto object-contain"
                  />
                )}
              </div>

              <div className="absolute bottom-4 left-4 right-4 z-20 rounded-2xl p-4" style={{ backgroundColor: alpha(THEME.palette.white, 0.88), border: `1px solid ${THEME.border}` }}>
                <p className="text-sm font-semibold" style={{ color: THEME.textStrong }}>
                  {heroProduct?.name || "Piezas listas para personalizar"}
                </p>
                <p className="mt-1 text-xs" style={{ color: THEME.text }}>
                  Escríbenos por WhatsApp para cotizar colores, fechas y diseños especiales.
                </p>
              </div>
            </div>

            <div className="grid gap-3">
              <div
                className="rounded-[1.75rem] p-5 flex flex-col justify-between"
                style={{
                  backgroundColor: THEME.palette.coral,
                  color: THEME.textInverse,
                }}
              >
                <Gift size={28} />
                <div>
                  <p className="font-display text-3xl font-black leading-none md:text-4xl">
                    Regalos con intención
                  </p>
                  <p className="mt-3 text-sm" style={{ color: alpha(THEME.palette.white, 0.82) }}>
                    Detalles para Navidad, San Valentín, Día de las Madres y más.
                  </p>
                </div>
              </div>

              {heroThumbs.map((product, index) => (
                <Link
                  key={product.id}
                  to="/productos"
                  className="group overflow-hidden rounded-[1.75rem] p-4"
                  style={{
                    backgroundColor: index === 0 ? THEME.palette.sage : THEME.palette.plum,
                    color: THEME.textInverse,
                  }}
                >
                  <div className="mb-3 h-36 rounded-2xl p-2" style={{ backgroundColor: alpha(THEME.palette.white, 0.18) }}>
                    {product.image_url ? (
                      <img
                        src={product.image_url}
                        alt={product.name}
                        className="h-full w-full object-contain transition duration-300 group-hover:scale-[1.04]"
                      />
                    ) : null}
                  </div>
                  <p className="truncate text-sm font-semibold">{product.name}</p>
                  <p className="text-xs" style={{ color: alpha(THEME.palette.white, 0.74) }}>
                    {product.category || "Pieza artesanal"}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div
        className="my-6 -mx-3 py-3 text-xs font-bold uppercase sm:text-sm md:-mx-6 lg:-mx-10 xl:-mx-14 2xl:-mx-16"
        style={{ backgroundColor: THEME.primary, color: THEME.textInverse }}
      >
        <div className="grid grid-cols-[1.25rem_minmax(0,1fr)_1.25rem_minmax(0,1fr)] items-center gap-x-3 gap-y-4 px-8 md:hidden">
          {ribbonItems.map((text, index) => (
            index === 4 ? (
              <div key={text} className="col-span-4 inline-flex items-center justify-center gap-3">
                <Sparkles size={14} className="shrink-0" />
                <span className="leading-tight">{text}</span>
              </div>
            ) : (
              <div key={text} className="contents">
                <span
                  className={`flex justify-center ${
                    index % 2 === 0 ? "col-start-1" : "col-start-3"
                  }`}
                >
                  <Sparkles size={14} className="shrink-0" />
                </span>
                <span
                  className={`block text-left leading-tight ${
                    index % 2 === 0 ? "col-start-2" : "col-start-4"
                  }`}
                >
                  {text}
                </span>
              </div>
            )
          ))}
        </div>

        <div className="hidden w-full items-center justify-between gap-6 px-8 md:flex">
          {ribbonItems.map((text) => (
            <span key={text} className="inline-flex items-center gap-2">
              <Sparkles size={14} className="shrink-0" />
              {text}
            </span>
          ))}
        </div>
      </div>

      <section className="w-full py-12 md:py-16">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.14em]" style={{ color: THEME.primary }}>
              Favoritos del taller
            </p>
            <h2 className="font-display mt-2 text-4xl font-black leading-tight md:text-6xl" style={{ color: THEME.textStrong }}>
              Figuras listas para celebrar
            </h2>
          </div>
          <Link to="/productos" className="theme-link inline-flex items-center gap-2 text-sm font-semibold">
            Ver catálogo
            <ArrowRight size={16} />
          </Link>
        </div>

        {loading ? (
          <p className="text-sm" style={{ color: THEME.text }}>
            Cargando productos...
          </p>
        ) : showcasedProducts.length === 0 ? (
          <div
            className="rounded-2xl p-6 text-sm"
            style={{
              backgroundColor: THEME.surface,
              border: `1px solid ${THEME.border}`,
              color: THEME.text,
            }}
          >
            Aún no hay productos cargados. Agrega uno desde el panel de Admin y aparecerán aquí.
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {showcasedProducts.map((product, index) => {
              const style = productBackgrounds[index % productBackgrounds.length];
              const onSale = product.on_sale && product.sale_price;

              return (
                <article
                  key={product.id}
                  className="group flex min-h-[390px] flex-col justify-between overflow-hidden rounded-[1.5rem] p-4"
                  style={{
                    backgroundColor: style.bg,
                    color: style.text,
                    boxShadow: `0 28px 58px -36px ${THEME.shadowStrong}`,
                  }}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="truncate text-lg font-black uppercase leading-tight">
                        {product.name}
                      </p>
                      <p className="mt-1 text-xs font-semibold" style={{ color: alpha(style.text, 0.76) }}>
                        {product.category || "Pieza artesanal"}
                      </p>
                    </div>
                    {onSale ? (
                      <span className="shrink-0 rounded-full px-2 py-1 text-[10px] font-bold" style={{ backgroundColor: style.tint }}>
                        Promo
                      </span>
                    ) : null}
                  </div>

                  <div className="my-5 flex h-48 items-center justify-center rounded-[1.25rem] p-3" style={{ backgroundColor: style.tint }}>
                    {product.image_url ? (
                      <img
                        src={product.image_url}
                        alt={product.name}
                        className="h-full w-full object-contain transition duration-300 group-hover:scale-[1.04]"
                        loading="lazy"
                      />
                    ) : (
                      <span className="text-sm font-semibold">Belleza en Madera</span>
                    )}
                  </div>

                  <div className="space-y-3">
                    <p className="line-clamp-2 text-sm" style={{ color: alpha(style.text, 0.82) }}>
                      {product.description || "Figura de madera pintada a mano."}
                    </p>
                    <div className="flex items-center justify-between gap-3">
                      {onSale ? (
                        <div>
                          <p className="text-xs line-through" style={{ color: alpha(style.text, 0.62) }}>
                            ${product.price} MXN
                          </p>
                          <p className="text-base font-black">${product.sale_price} MXN</p>
                        </div>
                      ) : (
                        <p className="text-base font-black">
                          {product.price ? `$${product.price} MXN` : ""}
                        </p>
                      )}
                      <a
                        href={productWhatsappLink(product.name)}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full"
                        style={{
                          backgroundColor: THEME.palette.white,
                          color: THEME.primary,
                        }}
                        aria-label={`Pedir ${product.name} por WhatsApp`}
                      >
                        <MessageCircle size={18} />
                      </a>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>

      <section className="grid gap-3 py-8 md:grid-cols-3">
        {[
          ["Temporadas especiales", "Navidad, Halloween, San Valentín y fechas importantes."],
          ["Diseños personalizados", "Cuéntanos tu idea y la convertimos en una pieza pintada a mano."],
          ["Regalos con historia", "Detalles para celebrar, agradecer o decorar con algo único."],
        ].map(([title, text], index) => (
          <div
            key={title}
            className="rounded-[1.5rem] p-5"
            style={{
              backgroundColor:
                index === 0
                  ? THEME.palette.white
                  : index === 1
                    ? homeTones.wineCream
                    : homeTones.wineMist,
              border: `1px solid ${THEME.border}`,
            }}
          >
            <p className="font-display text-2xl font-black leading-tight" style={{ color: THEME.textStrong }}>
              {title}
            </p>
            <p className="mt-3 text-sm leading-relaxed" style={{ color: THEME.text }}>
              {text}
            </p>
          </div>
        ))}
      </section>

      <section className="py-12 md:py-16">
        <div
          className="overflow-hidden rounded-[1.75rem] p-6 md:p-8 lg:p-10"
          style={{
            backgroundColor: THEME.primary,
            color: THEME.textInverse,
          }}
        >
          <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-[0.14em]" style={{ color: alpha(THEME.palette.white, 0.72) }}>
                Paquetes listos
              </p>
              <h2 className="font-display mt-2 text-4xl font-black leading-tight md:text-6xl">
                Combina, regala y celebra
              </h2>
            </div>
            <Link
              to="/productos"
              className="inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold"
              style={{
                backgroundColor: THEME.palette.white,
                color: THEME.primary,
              }}
            >
              Ver paquetes
              <ArrowRight size={16} />
            </Link>
          </div>

          {packagesList.length === 0 ? (
            <p className="text-sm" style={{ color: alpha(THEME.palette.white, 0.76) }}>
              Aún no hay paquetes, crea uno en el admin.
            </p>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {packagesList.slice(0, visiblePackagesCount).map((pkg) => {
                const pkgProducts = allProducts.filter((product) =>
                  (pkg.product_ids || []).includes(product.id)
                );
                const isPromo = pkg.promo && pkg.promo_price;

                return (
                  <article
                    key={pkg.id}
                    className="rounded-[1.25rem] p-4"
                    style={{
                      backgroundColor: alpha(THEME.palette.white, 0.1),
                      border: `1px solid ${alpha(THEME.palette.white, 0.18)}`,
                    }}
                  >
                    <div className="mb-4 grid h-28 grid-cols-2 gap-2 overflow-hidden rounded-2xl p-2" style={{ backgroundColor: alpha(THEME.palette.white, 0.12) }}>
                      {pkgProducts.slice(0, 4).map((product) => (
                        <div key={product.id} className="flex items-center justify-center rounded-xl" style={{ backgroundColor: alpha(THEME.palette.white, 0.16) }}>
                          {product.image_url ? (
                            <img
                              src={product.image_url}
                              alt={product.name}
                              className="h-full w-full object-contain"
                              loading="lazy"
                            />
                          ) : null}
                        </div>
                      ))}
                      {pkgProducts.length === 0 ? (
                        <div className="col-span-2 flex items-center justify-center text-sm font-semibold">
                          Paquete artesanal
                        </div>
                      ) : null}
                    </div>

                    <p className="truncate text-lg font-black">{pkg.name}</p>
                    <p className="mt-1 text-xs" style={{ color: alpha(THEME.palette.white, 0.72) }}>
                      Incluye {pkgProducts.length} figura{pkgProducts.length === 1 ? "" : "s"}
                    </p>
                    {pkg.description ? (
                      <p className="mt-3 line-clamp-2 text-sm" style={{ color: alpha(THEME.palette.white, 0.78) }}>
                        {pkg.description}
                      </p>
                    ) : null}

                    <div className="mt-4 flex items-center justify-between gap-3">
                      {isPromo ? (
                        <div>
                          <p className="text-xs line-through" style={{ color: alpha(THEME.palette.white, 0.58) }}>
                            ${pkg.price}
                          </p>
                          <p className="font-black">${pkg.promo_price}</p>
                        </div>
                      ) : (
                        <p className="font-black">${pkg.price}</p>
                      )}
                      <a
                        href={packageWhatsappLink(pkg, pkgProducts)}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex h-10 w-10 items-center justify-center rounded-full"
                        style={{
                          backgroundColor: THEME.palette.white,
                          color: THEME.primary,
                        }}
                        aria-label={`Pedir ${pkg.name} por WhatsApp`}
                      >
                        <MessageCircle size={18} />
                      </a>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </section>

      <section className="grid gap-6 py-10 md:grid-cols-[1fr_auto] md:items-center">
        <div>
          <h2 className="font-display text-4xl font-black leading-tight md:text-5xl" style={{ color: THEME.textStrong }}>
            ¿Tienes una idea para una fecha especial?
          </h2>
          <p className="mt-3 max-w-2xl text-sm md:text-base" style={{ color: THEME.text }}>
            Mándanos la inspiración, la ocasión o los colores que imaginas. Te respondemos por WhatsApp para cotizar tu pieza.
          </p>
        </div>
        <Link
          to="/contacto"
          className="inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold"
          style={{
            backgroundColor: THEME.primary,
            color: THEME.textInverse,
          }}
        >
          Contactar por WhatsApp
          <ArrowRight size={16} />
        </Link>
      </section>
    </div>
  );
}

// src/pages/Home.jsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchProducts } from "../lib/productsApi.js";
import { fetchPackages } from "../lib/packagesApi.js";
import { SITE_CONFIG } from "../config/site.js";
import { THEME } from "../config/theme.js";

export default function Home() {
  const [featured, setFeatured] = useState([]);
  const [packagesList, setPackagesList] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visibleProductsCount, setVisibleProductsCount] = useState(5);
  const [visiblePackagesCount, setVisiblePackagesCount] = useState(4);

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

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{
        background: `linear-gradient(180deg, ${THEME.heroGradientStart} 0%, ${THEME.heroGradientEnd} 100%)`,
      }}
    >
      <section className="w-full px-4 md:px-6 lg:px-8 py-10 md:py-16 flex flex-col md:flex-row gap-10 md:gap-12 items-stretch">
        <div className="flex-1 flex flex-col justify-center space-y-4 md:max-w-[58%]">
          <h1
            className="text-4xl md:text-5xl font-bold leading-tight"
            style={{ color: THEME.textStrong }}
          >
            Detalles en Madera
          </h1>
          <p className="max-w-xl" style={{ color: THEME.text }}>
            Creamos figuras de madera pintadas a mano para decorar, regalar y
            acompañar temporadas especiales como Navidad, Halloween, San
            Valentín, Día de las Madres y muchas más.
          </p>
          <div className="flex gap-3 flex-wrap">
            <Link
              to="/productos"
              className="theme-btn-primary px-5 py-2 rounded-lg text-sm font-medium"
            >
              Ver productos
            </Link>
            <Link
              to="/contacto"
              className="px-5 py-2 rounded-lg text-sm font-medium border"
              style={{
                color: THEME.textStrong,
                backgroundColor: THEME.surfaceStrong,
                borderColor: THEME.border,
              }}
            >
              Encargar una pieza
            </Link>
          </div>
        </div>

        <div className="w-full md:w-[42%] lg:w-[38%]">
          <div
            className="rounded-2xl p-6 md:p-8 shadow-sm flex h-full flex-col items-center justify-center gap-4"
            style={{
              backgroundColor: THEME.palette.white,
              border: `1px solid ${THEME.border}`,
            }}
          >
            <img
              src="/Logo_completo_minimalista.png"
              alt="Belleza en Madera"
              className="h-36 w-auto object-contain"
            />
            <p className="text-sm text-center" style={{ color: THEME.text }}>
              Diseños artesanales con acabado pintado a mano, ideales para
              celebraciones, recuerdos y detalles de temporada.
            </p>
          </div>
        </div>
      </section>

      {/* DESTACADOS */}
      <section className="w-full px-4 md:px-6 lg:px-8 pb-10 space-y-6">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div className="max-w-2xl">
            <h2
              className="text-2xl font-semibold"
              style={{ color: THEME.textStrong }}
            >
              Figuras destacadas
            </h2>
            <p className="text-sm" style={{ color: THEME.text }}>
              Una selección de piezas para fechas especiales y temporadas del
              año.
            </p>
          </div>
          <Link to="/productos" className="theme-link text-sm">
            Ver todos →
          </Link>
        </div>

        {loading ? (
          <p className="text-sm" style={{ color: THEME.text }}>Cargando productos...</p>
        ) : featured.length === 0 ? (
          <div
            className="rounded-xl p-6 text-sm"
            style={{
              backgroundColor: THEME.surface,
              border: `1px solid ${THEME.border}`,
              color: THEME.text,
            }}
          >
            Aún no hay productos cargados. Agrega uno desde el panel de Admin y
            aparecerán aquí ✨
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 items-stretch">
            {featured.slice(0, visibleProductsCount).map((p) => {
              const onSale = p.on_sale && p.sale_price;

              const waMsg = encodeURIComponent(
                `Hola 👋, me interesa adquirir la figura "${p.name}"`
              );
              const waLink = `https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${waMsg}`;

              return (
                <article
                  key={p.id}
                  className="rounded-xl p-4 flex flex-col h-full"
                  style={{
                    backgroundColor: THEME.palette.white,
                    border: `1px solid ${THEME.borderStrong}`,
                    boxShadow: `0 28px 54px -26px ${THEME.shadowStrong}`,
                  }}
                >
                  <div
                    className="rounded-lg overflow-hidden mb-3 flex items-center justify-center h-48"
                    style={{ backgroundColor: THEME.surfaceSoft }}
                  >
                    {p.image_url ? (
                      <img
                        src={p.image_url}
                        alt={p.name}
                        className="max-h-full max-w-full object-contain"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-4xl">
                        🪵
                      </div>
                    )}
                  </div>

                  <h3
                    className="text-base font-semibold truncate"
                    style={{ color: THEME.textStrong }}
                  >
                    {p.name}
                  </h3>
                  {p.category && (
                    <p className="text-[11px] mb-1" style={{ color: THEME.textSoft }}>
                      {p.category}
                    </p>
                  )}
                  <p className="text-sm line-clamp-2 mb-3" style={{ color: THEME.text }}>
                    {p.description || "Figura de madera pintada a mano."}
                  </p>

                  <div className="flex items-center justify-between mt-auto">
                    {onSale ? (
                      <div className="flex items-baseline gap-2">
                        <span className="text-xs line-through" style={{ color: THEME.textSoft }}>
                          ${p.price} MXN
                        </span>
                        <span
                          className="text-sm font-semibold"
                          style={{ color: THEME.textStrong }}
                        >
                          ${p.sale_price} MXN
                        </span>
                      </div>
                    ) : (
                      <p
                        className="text-sm font-semibold"
                        style={{ color: THEME.textStrong }}
                      >
                        {p.price ? `$${p.price} MXN` : ""}
                      </p>
                    )}

                    <a
                      href={waLink}
                      target="_blank"
                      rel="noreferrer"
                      className="theme-btn-primary text-xs px-3 py-1 rounded-lg text-sm font-medium"
                    >
                      Pedir
                    </a>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>

      {/* PAQUETES LISTOS */}
      <section className="w-full px-4 md:px-6 lg:px-8 pb-14 space-y-6">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div className="max-w-2xl">
            <h2
              className="text-2xl font-semibold flex items-center gap-1"
              style={{ color: THEME.textStrong }}
            >
              Paquetes para regalar 🎁
            </h2>
            <p className="text-sm" style={{ color: THEME.text }}>
              Combinaciones listas con varias figuras para obsequiar o decorar
              en una ocasión especial.
            </p>
          </div>
          <Link to="/productos" className="theme-link text-sm">
            Ver catálogo →
          </Link>
        </div>

        {packagesList.length === 0 ? (
          <p className="text-sm" style={{ color: THEME.text }}>
            Aún no hay paquetes, crea uno en el admin.
          </p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 items-stretch">
            {packagesList.slice(0, visiblePackagesCount).map((pkg) => {
              const pkgProducts = allProducts.filter((p) =>
                (pkg.product_ids || []).includes(p.id)
              );

              // 🔽 Igual que PackageCard: texto de figuras + precio
              const hasProducts = pkgProducts && pkgProducts.length > 0;
              const priceIsPromo = pkg.promo && pkg.promo_price;

              const productsText = hasProducts
                ? pkgProducts.map((p) => `- ${p.name}`).join("\n")
                : "No tengo el detalle de las figuras 😅";

              const waMsg = encodeURIComponent(
                `Hola 👋, me interesa adquirir el paquete "${pkg.name}" \n` +
                  (priceIsPromo
                    ? `Precio promo: $${pkg.promo_price} (antes $${pkg.price})\n`
                    : `Precio: $${pkg.price}\n`) +
                  `\nFiguras incluidas:\n${productsText}`
              );
              const waLink = `https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${waMsg}`;

              return (
                <div
                  key={pkg.id}
                  className="rounded-xl p-5 flex gap-4 h-full"
                  style={{
                    backgroundColor: THEME.palette.white,
                    border: `1px solid ${THEME.borderStrong}`,
                    boxShadow: `0 28px 54px -26px ${THEME.shadowStrong}`,
                  }}
                >
                  <div
                    className="w-24 h-24 rounded-2xl p-1 grid grid-cols-2 gap-1 shrink-0 self-center overflow-hidden"
                    style={{
                      backgroundColor: THEME.surfaceTint,
                      border: `1px solid ${THEME.border}`,
                    }}
                  >
                    {pkgProducts.slice(0, 4).map((p) => (
                      <div
                        key={p.id}
                        className="w-full h-full flex items-center justify-center rounded-md"
                        style={{ backgroundColor: THEME.surfaceSoft }}
                      >
                        {p.image_url ? (
                          <img
                            src={p.image_url}
                            alt={p.name}
                            className="max-w-full max-h-full object-contain rounded-md"
                          />
                        ) : (
                          <span className="text-lg">🪵</span>
                        )}
                      </div>
                    ))}

                    {pkgProducts.length === 0 && (
                      <div className="col-span-2 flex items-center justify-center text-xl">
                        🎁
                      </div>
                    )}
                    {pkgProducts.length > 4 && (
                      <div className="w-full h-full rounded-md flex items-center justify-center text-[10px] theme-counter-tile">
                        +{pkgProducts.length - 4}
                      </div>
                    )}
                  </div>

                  <div className="flex-1 min-w-0 flex flex-col justify-between space-y-2">
                    <p
                      className="text-base font-semibold truncate"
                      style={{ color: THEME.textStrong }}
                    >
                      {pkg.name}
                    </p>

                    {priceIsPromo ? (
                      <p className="text-sm">
                        <span className="line-through mr-1" style={{ color: THEME.textSoft }}>
                          ${pkg.price}
                        </span>
                        <span className="font-semibold" style={{ color: THEME.textStrong }}>
                          ${pkg.promo_price}
                        </span>
                      </p>
                    ) : (
                      <p className="text-sm" style={{ color: THEME.textStrong }}>${pkg.price}</p>
                    )}

                    <p className="text-[11px]" style={{ color: THEME.textSoft }}>
                      Incluye {pkgProducts.length} figura
                      {pkgProducts.length === 1 ? "" : "s"}
                    </p>

                    {pkg.description ? (
                      <p className="text-xs line-clamp-2" style={{ color: THEME.text }}>
                        {pkg.description}
                      </p>
                    ) : null}

                    <a
                      href={waLink}
                      target="_blank"
                      rel="noreferrer"
                      className="theme-btn-primary inline-flex mt-1 w-fit self-start px-3 py-1.5 rounded-lg text-xs font-medium"
                    >
                      Pedir este paquete
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}

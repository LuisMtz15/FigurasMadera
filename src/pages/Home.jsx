// src/pages/Home.jsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchProducts } from "../lib/productsApi.js";
import { fetchPackages } from "../lib/packagesApi.js";
import { SITE_CONFIG } from "../config/site.js";
import heroImg from "../assets/Sin_Fondo.png";

const COLORS = {
  bgTop: "#FDF5F0",
  bgBottom: "#F9E0D1",
  dark: "#5A3B2E",
  accent: "#E98A6B",
};

export default function Home() {
  const [featured, setFeatured] = useState([]);
  const [packagesList, setPackagesList] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const [products, packages] = await Promise.all([
        fetchProducts(),
        fetchPackages(),
      ]);

      setAllProducts(products);
      setFeatured(products.slice(0, 3));
      setPackagesList(packages.slice(0, 2));
      setLoading(false);
    })();
  }, []);

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{
        background: `linear-gradient(180deg, ${COLORS.bgTop} 0%, ${COLORS.bgBottom} 100%)`,
      }}
    >
      {/* HERO */}
      <section className="container-main py-10 md:py-16 flex flex-col md:flex-row gap-10 items-center">
        <div className="flex-1 space-y-4">
          <p className="inline-flex px-3 py-1 rounded-full text-xs font-medium bg-white/70 text-[#5A3B2E] border border-white/40">
            Figuras de madera pintadas a mano
          </p>
          <h1
            className="text-4xl md:text-5xl font-bold leading-tight"
            style={{ color: COLORS.dark }}
          >
            Belleza en Madera
          </h1>
          <p className="text-slate-600 max-w-xl">
            Piezas artesanales, coloridas y listas para decorar tu hogar u
            oficina. Hechas con cariño y pensadas para temporadas especiales.
          </p>
          <div className="flex gap-3 flex-wrap">
            <Link
              to="/productos"
              className="px-5 py-2 rounded-md text-sm font-medium text-white"
              style={{ backgroundColor: COLORS.accent }}
            >
              Ver productos
            </Link>
            <Link
              to="/contacto"
              className="px-5 py-2 rounded-md text-sm font-medium text-[#5A3B2E] bg-white/70 border border-white/40"
            >
              Encargar una pieza
            </Link>
          </div>
        </div>

        <div className="w-full md:w-80 lg:w-96">
          <div className="bg-white/70 rounded-2xl p-6 border border-white/40 shadow-sm flex flex-col items-center gap-3">
            <img
              src={heroImg}
              alt="Belleza en Madera"
              className="h-32 w-auto object-contain"
            />
            <p className="text-sm text-slate-600 text-center">
              Diseños personalizados, colores pastel y temas de temporada
              (Navidad, Halloween, San Valentín y más).
            </p>
          </div>
        </div>
      </section>

      {/* DESTACADOS */}
      <section className="container-main pb-10 space-y-5">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h2
              className="text-2xl font-semibold"
              style={{ color: COLORS.dark }}
            >
              Piezas destacadas
            </h2>
            <p className="text-slate-500 text-sm">
              Lo más nuevo o lo que está por temporada.
            </p>
          </div>
          <Link
            to="/productos"
            className="text-sm text-[#5A3B2E] hover:text-[#E98A6B]"
          >
            Ver todos →
          </Link>
        </div>

        {loading ? (
          <p className="text-slate-500 text-sm">Cargando productos...</p>
        ) : featured.length === 0 ? (
          <div className="bg-white/60 border border-white/30 rounded-xl p-6 text-sm text-slate-500">
            Aún no hay productos cargados. Agrega uno desde el panel de Admin y
            aparecerán aquí ✨
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-3">
            {featured.map((p) => {
              const onSale = p.on_sale && p.sale_price;
              return (
                <article
                  key={p.id}
                  className="bg-white/70 border border-white/40 rounded-xl p-4 flex flex-col"
                >
                  <div className="rounded-lg overflow-hidden mb-3 bg-[#FDF5F0] flex items-center justify-center h-48">
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
                    style={{ color: COLORS.dark }}
                  >
                    {p.name}
                  </h3>
                  {p.category && (
                    <p className="text-[11px] text-slate-500 mb-1">
                      {p.category}
                    </p>
                  )}
                  <p className="text-sm text-slate-600 line-clamp-2 mb-3">
                    {p.description || "Figura de madera pintada a mano."}
                  </p>

                  <div className="flex items-center justify-between mt-auto">
                    {onSale ? (
                      <div className="flex items-baseline gap-2">
                        <span className="text-xs line-through text-slate-400">
                          ${p.price} MXN
                        </span>
                        <span
                          className="text-sm font-semibold"
                          style={{ color: COLORS.dark }}
                        >
                          ${p.sale_price} MXN
                        </span>
                      </div>
                    ) : (
                      <p
                        className="text-sm font-semibold"
                        style={{ color: COLORS.dark }}
                      >
                        {p.price ? `$${p.price} MXN` : ""}
                      </p>
                    )}

                    <Link
                      to="/contacto"
                      className="text-xs px-3 py-1 rounded-md bg-[#E98A6B] text-white"
                    >
                      Pedir
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>

      {/* PAQUETES LISTOS */}
      <section className="container-main pb-14 space-y-5">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h2
              className="text-2xl font-semibold flex items-center gap-1"
              style={{ color: COLORS.dark }}
            >
              Paquetes listos 🎁
            </h2>
            <p className="text-slate-500 text-sm">
              Combos armados con varias figuras.
            </p>
          </div>
          <Link
            to="/productos"
            className="text-sm text-[#5A3B2E] hover:text-[#E98A6B]"
          >
            Ver catálogo →
          </Link>
        </div>

        {packagesList.length === 0 ? (
          <p className="text-sm text-slate-500">
            Aún no hay paquetes, crea uno en el admin.
          </p>
        ) : (
          <div className="grid gap-5 md:grid-cols-2">
            {packagesList.map((pkg) => {
              const pkgProducts = allProducts.filter((p) =>
                (pkg.product_ids || []).includes(p.id)
              );

              const waMsg = encodeURIComponent(
                `Hola 👋, vi el paquete "${pkg.name}" en Belleza en Madera y quiero más información.`
              );
              const waLink = `https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${waMsg}`;

              return (
                <div
                  key={pkg.id}
                  className="bg-white/70 border border-white/40 rounded-xl p-4 flex gap-3"
                >
                  {/* collage 2x2 corregido */}
                  <div className="w-24 h-24 rounded-2xl bg-white/90 border border-[#FCE7DA] p-1 grid grid-cols-2 gap-1 shrink-0 self-center overflow-hidden">
                    {pkgProducts.slice(0, 4).map((p) => (
                      <div
                        key={p.id}
                        className="w-full h-full flex items-center justify-center bg-[#FFF8F5] rounded-md"
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
                      <div className="w-full h-full rounded-md bg-slate-100 flex items-center justify-center text-[10px] text-slate-500">
                        +{pkgProducts.length - 4}
                      </div>
                    )}
                  </div>

                  {/* info */}
                  <div className="flex-1 min-w-0 space-y-1">
                    <p
                      className="text-base font-semibold truncate"
                      style={{ color: COLORS.dark }}
                    >
                      {pkg.name}
                    </p>

                    {pkg.promo && pkg.promo_price ? (
                      <p className="text-sm">
                        <span className="line-through text-slate-300 mr-1">
                          ${pkg.price}
                        </span>
                        <span className="text-red-500 font-semibold">
                          ${pkg.promo_price}
                        </span>
                      </p>
                    ) : (
                      <p className="text-sm text-slate-700">${pkg.price}</p>
                    )}

                    <p className="text-[11px] text-slate-400">
                      Incluye {pkgProducts.length} figura
                      {pkgProducts.length === 1 ? "" : "s"}
                    </p>

                    {pkg.description ? (
                      <p className="text-xs text-slate-500 line-clamp-2">
                        {pkg.description}
                      </p>
                    ) : null}

                    <a
                      href={waLink}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex mt-1 px-3 py-1.5 rounded-md text-xs font-medium text-white"
                      style={{ backgroundColor: COLORS.accent }}
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
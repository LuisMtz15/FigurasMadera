// src/pages/Products.jsx
import { useEffect, useMemo, useState } from "react";
import ProductCard from "../components/ProductCard.jsx";
import PackageCard from "../components/PackageCard.jsx";
import { fetchProducts } from "../lib/productsApi.js";
import { fetchPackages } from "../lib/packagesApi.js";
import { THEME } from "../config/theme.js";
import { ArrowRight, Gift, Search, SlidersHorizontal, Sparkles } from "lucide-react";

const CATEGORY_INFO = {
  Halloween: { label: "Halloween", emoji: "🎃", desc: "Decoración pintada a mano para octubre." },
  Navidad: { label: "Navidad", emoji: "🎄", desc: "Figuras navideñas para regalar o adornar." },
  "Fechas Patrias": { label: "Fechas Patrias", emoji: "🇲🇽", desc: "Piezas con colores mexicanos y detalles festivos." },
  "Día del Maestro": { label: "Día del Maestro", emoji: "🍎", desc: "Detalles para maestras y maestros." },
  "Día de las Madres": { label: "Día de las Madres", emoji: "🌷", desc: "Detalles tiernos para mamá." },
  "San Valentín": { label: "San Valentín", emoji: "❤️", desc: "Piezas románticas y coloridas." },
};

export default function Products() {
  const [allProducts, setAllProducts] = useState([]);
  const [allPackages, setAllPackages] = useState([]);
  const [activeCategory, setActiveCategory] = useState("Todos");
  const [activeTab, setActiveTab] = useState("productos");
  const [productSearchTerm, setProductSearchTerm] = useState("");
  const [packageSearchTerm, setPackageSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [loadingPkgs, setLoadingPkgs] = useState(true);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const data = await fetchProducts();
      setAllProducts(data);
      setLoading(false);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      setLoadingPkgs(true);
      const data = await fetchPackages();
      setAllPackages(data);
      setLoadingPkgs(false);
    })();
  }, []);

  const categories = useMemo(() => {
    const set = new Set();
    allProducts.forEach((p) => {
      const cat = (p.category || "").trim();
      if (cat) set.add(cat);
    });
    return Array.from(set);
  }, [allProducts]);

  const filtered = useMemo(() => {
    const byCategory =
      activeCategory === "Todos"
        ? allProducts
        : allProducts.filter((p) => (p.category || "").trim() === activeCategory);

    const query = productSearchTerm.trim().toLowerCase();
    if (!query) return byCategory;

    return byCategory.filter((product) => {
      const name = String(product.name || "").toLowerCase();
      const category = String(product.category || "").toLowerCase();
      const description = String(product.description || "").toLowerCase();
      return (
        name.includes(query) ||
        category.includes(query) ||
        description.includes(query)
      );
    });
  }, [activeCategory, allProducts, productSearchTerm]);

  const filteredPackages = useMemo(() => {
    const query = packageSearchTerm.trim().toLowerCase();
    if (!query) return allPackages;

    return allPackages.filter((pkg) => {
      const name = String(pkg.name || "").toLowerCase();
      const description = String(pkg.description || "").toLowerCase();
      return name.includes(query) || description.includes(query);
    });
  }, [allPackages, packageSearchTerm]);

  const categoryInfo =
    activeCategory !== "Todos"
      ? CATEGORY_INFO[activeCategory] || {
          label: activeCategory,
          emoji: "🪵",
          desc: "Piezas de esta categoría.",
        }
      : null;

  const activeCount =
    activeTab === "productos" ? filtered.length : filteredPackages.length;
  const activeLabel = activeTab === "productos" ? "producto" : "paquete";

  return (
    <div className="container-main py-10 md:py-12 space-y-8">
      <section
        className="overflow-hidden rounded-[1.75rem] p-5 sm:p-6 md:p-8 lg:p-10"
        style={{
          backgroundColor: THEME.primary,
          color: THEME.textInverse,
          boxShadow: `0 34px 70px -48px ${THEME.shadowStrong}`,
        }}
      >
        <div className="grid gap-6 xl:grid-cols-[1fr_auto] xl:items-end">
          <div className="max-w-3xl">
            <p className="mb-4 inline-flex max-w-full items-center gap-2 rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] sm:text-xs sm:tracking-[0.16em]" style={{ backgroundColor: "rgba(255,255,255,0.12)" }}>
              <Sparkles size={14} />
              Catálogo artesanal
            </p>
            <h1 className="font-display text-4xl font-black leading-tight sm:text-5xl md:text-6xl xl:text-7xl">
              Piezas para regalar y celebrar
            </h1>
            <p className="mt-5 max-w-2xl text-sm leading-relaxed md:text-base" style={{ color: "rgba(255,255,255,0.82)" }}>
              Explora figuras pintadas a mano, paquetes listos y detalles personalizados para las fechas especiales del año.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:flex sm:flex-wrap xl:justify-end">
            {[
              ["Productos", allProducts.length],
              ["Paquetes", allPackages.length],
            ].map(([label, count]) => (
              <div
                key={label}
                className="rounded-2xl px-4 py-3"
                style={{ backgroundColor: "rgba(255,255,255,0.1)" }}
              >
                <p className="text-2xl font-black">{count}</p>
                <p className="text-xs font-semibold" style={{ color: "rgba(255,255,255,0.72)" }}>
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="space-y-5">
        <div
          className="rounded-[1.5rem] p-4 md:p-5"
          style={{
            backgroundColor: THEME.surfaceStrong,
            border: `1px solid ${THEME.borderStrong}`,
            boxShadow: `0 24px 54px -44px ${THEME.shadowStrong}`,
          }}
        >
          <div className="grid gap-4 xl:grid-cols-[auto_1fr_auto] xl:items-center">
            <div
              className="flex w-full gap-2 rounded-2xl p-1 sm:w-fit"
              style={{
                backgroundColor: THEME.palette.white,
                border: `1px solid ${THEME.border}`,
              }}
            >
              <button
                onClick={() => setActiveTab("productos")}
                className="flex-1 rounded-xl px-4 py-2.5 text-sm font-semibold transition sm:flex-none"
                style={{
                  backgroundColor:
                    activeTab === "productos" ? THEME.primary : "transparent",
                  color:
                    activeTab === "productos" ? THEME.textInverse : THEME.textStrong,
                }}
              >
                Productos
              </button>
              <button
                onClick={() => setActiveTab("paquetes")}
                className="flex-1 rounded-xl px-4 py-2.5 text-sm font-semibold transition sm:flex-none"
                style={{
                  backgroundColor:
                    activeTab === "paquetes" ? THEME.primary : "transparent",
                  color:
                    activeTab === "paquetes" ? THEME.textInverse : THEME.textStrong,
                }}
              >
                Paquetes
              </button>
            </div>

            <div
              className="flex h-13 min-h-13 w-full items-center gap-3 rounded-2xl px-4"
              style={{
                backgroundColor: THEME.palette.white,
                border: `1.5px solid ${THEME.primary}`,
                boxShadow: `0 18px 34px -25px ${THEME.shadowStrong}`,
              }}
            >
              <span
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl"
                style={{
                  backgroundColor: THEME.tintCoral,
                  color: THEME.primary,
                }}
              >
                <Search size={16} />
              </span>
              <input
                type="text"
                value={activeTab === "productos" ? productSearchTerm : packageSearchTerm}
                onChange={(e) =>
                  activeTab === "productos"
                    ? setProductSearchTerm(e.target.value)
                    : setPackageSearchTerm(e.target.value)
                }
                placeholder={activeTab === "productos" ? "Buscar producto..." : "Buscar paquete..."}
                className="w-full border-0 bg-transparent p-0 text-sm font-medium outline-none"
                style={{ color: THEME.textStrong }}
              />
            </div>

            <div
              className="inline-flex h-12 items-center justify-center rounded-2xl px-4 text-sm font-semibold xl:min-w-[138px]"
              style={{
                backgroundColor: THEME.primary,
                color: THEME.textInverse,
              }}
            >
              {activeCount} {activeLabel}{activeCount === 1 ? "" : "s"}
            </div>
          </div>
        </div>

      {activeTab === "productos" ? (
        <div className="space-y-6">
          <div
            className="rounded-[1.5rem] p-4"
            style={{
              backgroundColor: THEME.palette.white,
              border: `1px solid ${THEME.border}`,
            }}
          >
            <div className="mb-3 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div className="flex items-center gap-2">
                <span
                  className="flex h-8 w-8 items-center justify-center rounded-xl"
                  style={{
                    backgroundColor: THEME.tintCoral,
                    color: THEME.primary,
                  }}
                >
                  <SlidersHorizontal size={16} />
                </span>
                <p className="text-sm font-semibold" style={{ color: THEME.textStrong }}>
                  Filtrar productos por categoría
                </p>
              </div>

              {categoryInfo ? (
                <div
                  className="w-fit rounded-full px-3 py-1 text-xs font-semibold"
                  style={{
                    backgroundColor: THEME.tintCoral,
                    color: THEME.primary,
                    border: `1px solid ${THEME.border}`,
                  }}
                >
                  {categoryInfo.emoji} {categoryInfo.label}
                </div>
              ) : null}
            </div>

            <div className="sm:hidden">
            <div className="relative">
              <select
                value={activeCategory}
                onChange={(e) => setActiveCategory(e.target.value)}
                className="theme-input appearance-none rounded-xl pr-9 text-sm transition-colors"
                style={{
                  backgroundColor:
                    activeCategory === "Todos" ? THEME.surfaceSoft : THEME.primary,
                  borderColor:
                    activeCategory === "Todos" ? THEME.border : THEME.primary,
                  color:
                    activeCategory === "Todos"
                      ? THEME.textStrong
                      : THEME.textInverse,
                }}
              >
                <option value="Todos">Todos</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {CATEGORY_INFO[cat]?.emoji ? CATEGORY_INFO[cat].emoji + " " : ""}
                    {cat}
                  </option>
                ))}
              </select>
              <span
                className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-sm transition"
                style={{
                  color:
                    activeCategory === "Todos"
                      ? THEME.textSoft
                      : THEME.textInverse,
                }}
              >
                ▼
              </span>
            </div>
          </div>

          <div className="hidden sm:flex sm:flex-wrap sm:gap-3">
            <button
              onClick={() => setActiveCategory("Todos")}
              className="px-4 py-2 rounded-full text-sm font-semibold transition"
              style={{
                backgroundColor:
                  activeCategory === "Todos" ? THEME.primary : THEME.surfaceStrong,
                color:
                  activeCategory === "Todos"
                    ? THEME.textInverse
                    : THEME.textStrong,
                border:
                  activeCategory === "Todos"
                    ? `1px solid ${THEME.primary}`
                    : `1px solid ${THEME.border}`,
              }}
            >
              Todos
            </button>

            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className="px-4 py-2 rounded-full text-sm font-semibold transition"
                style={{
                  backgroundColor:
                    activeCategory === cat ? THEME.primary : THEME.surfaceStrong,
                  color:
                    activeCategory === cat
                      ? THEME.textInverse
                      : THEME.textStrong,
                  border:
                    activeCategory === cat
                      ? `1px solid ${THEME.primary}`
                      : `1px solid ${THEME.border}`,
                }}
              >
                {CATEGORY_INFO[cat]?.emoji ? CATEGORY_INFO[cat].emoji + " " : ""}
                {cat}
              </button>
            ))}
          </div>
          </div>

          {categoryInfo && (
            <div
              className="rounded-2xl px-4 py-3 max-w-2xl"
              style={{
                backgroundColor: THEME.surface,
                border: `1px solid ${THEME.border}`,
              }}
            >
              <p className="text-sm font-semibold" style={{ color: THEME.textStrong }}>
                {categoryInfo.emoji} {categoryInfo.label}
              </p>
              <p className="text-xs" style={{ color: THEME.text }}>{categoryInfo.desc}</p>
            </div>
          )}

          {loading ? (
            <p className="text-sm" style={{ color: THEME.text }}>Cargando productos...</p>
          ) : filtered.length === 0 ? (
            <div
              className="rounded-2xl p-6 md:p-7 space-y-3"
              style={{
                color: THEME.text,
                backgroundColor: THEME.surface,
                border: `1px solid ${THEME.border}`,
              }}
            >
              <p className="text-sm font-semibold" style={{ color: THEME.textStrong }}>
                No encontramos productos con esos filtros
              </p>
              <p className="text-sm">
                Prueba con otra búsqueda o vuelve a ver todas las categorías.
              </p>
              <button
                type="button"
                onClick={() => {
                  setActiveCategory("Todos");
                  setProductSearchTerm("");
                }}
                className="theme-btn-soft px-4 py-2 text-sm font-medium"
              >
                Ver todo
              </button>
            </div>
          ) : (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      ) : (
        <div className="space-y-6">
          <div
            className="rounded-[1.5rem] p-5 md:p-6"
            style={{
              backgroundColor: THEME.primary,
              color: THEME.textInverse,
            }}
          >
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="inline-flex items-center gap-2 text-sm font-semibold">
                  <Gift size={16} />
                  Paquetes disponibles
                </p>
                <h2 className="font-display mt-2 text-3xl font-black leading-tight md:text-4xl">
                  Combos listos para regalar
                </h2>
              </div>
              <ArrowRight size={22} style={{ color: "rgba(255,255,255,0.72)" }} />
            </div>
          </div>

          {loadingPkgs ? (
            <p className="text-sm" style={{ color: THEME.text }}>Cargando paquetes...</p>
          ) : filteredPackages.length === 0 ? (
            <div
              className="rounded-2xl p-6 md:p-7 space-y-3"
              style={{
                color: THEME.text,
                backgroundColor: THEME.surface,
                border: `1px solid ${THEME.border}`,
              }}
            >
              <p className="text-sm font-semibold" style={{ color: THEME.textStrong }}>
                No encontramos paquetes con esa búsqueda
              </p>
              <button
                type="button"
                onClick={() => setPackageSearchTerm("")}
                className="theme-btn-soft px-4 py-2 text-sm font-medium"
              >
                Limpiar búsqueda
              </button>
            </div>
          ) : (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {filteredPackages.map((pkg) => {
                // productos reales de este paquete
                const pkgProducts = allProducts.filter((p) =>
                  (pkg.product_ids || []).includes(p.id)
                );
                return (
                  <PackageCard
                    key={pkg.id}
                    pkg={pkg}
                    products={pkgProducts}
                  />
                );
              })}
            </div>
          )}
        </div>
      )}
      </section>
    </div>
  );
}

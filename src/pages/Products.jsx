// src/pages/Products.jsx
import { useEffect, useMemo, useState } from "react";
import ProductCard from "../components/ProductCard.jsx";
import PackageCard from "../components/PackageCard.jsx";
import { fetchProducts } from "../lib/productsApi.js";
import { fetchPackages } from "../lib/packagesApi.js";
import { THEME } from "../config/theme.js";
import { Search, SlidersHorizontal } from "lucide-react";

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

  return (
    <div className="container-main py-12 space-y-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-4xl md:text-5xl font-bold leading-tight" style={{ color: THEME.textStrong }}>
          Catálogo
        </h1>
      </div>

      <section className="space-y-5">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div
            className="flex flex-wrap gap-2 w-fit"
          >
            <button
              onClick={() => setActiveTab("productos")}
              className="px-4 py-1.5 rounded-full text-sm transition"
              style={{
                backgroundColor:
                  activeTab === "productos" ? THEME.primary : THEME.surfaceStrong,
                color:
                  activeTab === "productos" ? THEME.textInverse : THEME.textStrong,
                border:
                  activeTab === "productos"
                    ? `1px solid ${THEME.primary}`
                    : `1px solid ${THEME.border}`,
              }}
            >
              Productos
            </button>
            <button
              onClick={() => setActiveTab("paquetes")}
              className="px-4 py-1.5 rounded-full text-sm transition"
              style={{
                backgroundColor:
                  activeTab === "paquetes" ? THEME.primary : THEME.surfaceStrong,
                color:
                  activeTab === "paquetes" ? THEME.textInverse : THEME.textStrong,
                border:
                  activeTab === "paquetes"
                    ? `1px solid ${THEME.primary}`
                    : `1px solid ${THEME.border}`,
              }}
            >
              Paquetes
            </button>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-end lg:min-w-[390px]">
            <div
              className="flex h-11 w-full items-center gap-2 rounded-xl px-3 sm:max-w-sm"
              style={{
                backgroundColor: THEME.palette.white,
                border: `1px solid ${THEME.primary}`,
                boxShadow: `0 16px 30px -24px ${THEME.shadowStrong}`,
              }}
            >
              <Search size={16} className="shrink-0" style={{ color: THEME.textSoft }} />
              <input
                type="text"
                value={activeTab === "productos" ? productSearchTerm : packageSearchTerm}
                onChange={(e) =>
                  activeTab === "productos"
                    ? setProductSearchTerm(e.target.value)
                    : setPackageSearchTerm(e.target.value)
                }
                placeholder={activeTab === "productos" ? "Buscar producto..." : "Buscar paquete..."}
                className="w-full border-0 bg-transparent p-0 text-sm outline-none"
                style={{ color: THEME.textStrong }}
              />
            </div>

            <div
              className="inline-flex h-11 items-center justify-center rounded-xl px-3 text-sm sm:min-w-[124px]"
              style={{
                backgroundColor: THEME.surface,
                color: THEME.textStrong,
                border: `1px solid ${THEME.border}`,
              }}
            >
              {activeTab === "productos"
                ? `${filtered.length} producto${filtered.length === 1 ? "" : "s"}`
                : `${filteredPackages.length} paquete${filteredPackages.length === 1 ? "" : "s"}`}
            </div>
          </div>
        </div>

      {activeTab === "productos" ? (
        <div className="space-y-5">
          <div className="flex items-center gap-2">
            <SlidersHorizontal size={16} style={{ color: THEME.textSoft }} />
            <p className="text-sm font-semibold" style={{ color: THEME.textStrong }}>
              Filtrar productos por categoría
            </p>
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
              className="px-4 py-1.5 rounded-full text-sm font-medium transition"
              style={{
                backgroundColor:
                  activeCategory === "Todos" ? THEME.primary : "transparent",
                color:
                  activeCategory === "Todos"
                    ? THEME.textInverse
                    : THEME.textStrong,
              }}
            >
              Todos
            </button>

            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className="px-4 py-1.5 rounded-full text-sm font-medium transition"
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

          {categoryInfo && (
            <div
              className="rounded-xl px-4 py-3 max-w-2xl"
              style={{
                backgroundColor: THEME.surfaceStrong,
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
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      ) : (
        <div className="space-y-5">
          <div className="space-y-2">
            <p className="text-sm font-semibold" style={{ color: THEME.textStrong }}>
              Paquetes disponibles
            </p>
            <p className="text-sm" style={{ color: THEME.text }}>
              Combos listos para regalar o decorar.
            </p>
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
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
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

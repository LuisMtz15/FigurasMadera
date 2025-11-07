// src/pages/Products.jsx
import { useEffect, useMemo, useState } from "react";
import ProductCard from "../components/ProductCard.jsx";
import { fetchProducts } from "../lib/productsApi.js";

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
  const [activeCategory, setActiveCategory] = useState("Todos");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const data = await fetchProducts();
      setAllProducts(data);
      setLoading(false);
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
    if (activeCategory === "Todos") return allProducts;
    return allProducts.filter(
      (p) => (p.category || "").trim() === activeCategory
    );
  }, [activeCategory, allProducts]);

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
        <h1 className="text-3xl font-bold" style={{ color: "#5A3B2E" }}>
          Nuestros productos
        </h1>
        <p className="text-slate-600">
          Filtra por temporada o por evento especial.
        </p>
      </div>

      {/* móvil: select bonito y dinámico */}
      <div className="sm:hidden">
        <label className="block text-sm mb-2 text-[#5A3B2E] font-medium">
          Filtrar por categoría
        </label>
        <div className="relative">
          <select
            value={activeCategory}
            onChange={(e) => setActiveCategory(e.target.value)}
            className={`w-full appearance-none rounded-xl border px-3 py-2.5 text-sm pr-9 focus:outline-none focus:ring-2 transition-colors ${
              activeCategory === "Todos"
                ? "bg-[#FEFAF7] border-[#FCE7DA] text-[#5A3B2E] focus:ring-[#FCE7DA]"
                : "bg-[#E98A6B] text-white border-[#E98A6B] focus:ring-[#E98A6B]"
            }`}
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
            className={`pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-sm transition ${
              activeCategory === "Todos"
                ? "text-[#5A3B2E]/60"
                : "text-white/90"
            }`}
          >
            ▼
          </span>
        </div>
      </div>

      {/* desktop / tablet: botones */}
      <div className="hidden sm:flex sm:flex-wrap sm:gap-3">
        <button
          onClick={() => setActiveCategory("Todos")}
          className={`px-4 py-1.5 rounded-full text-sm font-medium transition ${
            activeCategory === "Todos"
              ? "text-[#5A3B2E] bg-transparent hover:bg-[#FCE7DA]"
              : "text-white"
          }`}
          style={{
            backgroundColor:
              activeCategory === "Todos" ? "transparent" : "#E98A6B",
          }}
        >
          Todos
        </button>

        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition ${
              activeCategory === cat
                ? "text-white"
                : "text-[#5A3B2E] hover:bg-[#FCE7DA]"
            }`}
            style={{
              backgroundColor: activeCategory === cat ? "#E98A6B" : "transparent",
            }}
          >
            {CATEGORY_INFO[cat]?.emoji ? CATEGORY_INFO[cat].emoji + " " : ""}
            {cat}
          </button>
        ))}
      </div>

      {/* descripción de categoría */}
      {categoryInfo && (
        <div className="rounded-xl px-4 py-3 bg-white/70 border border-white/40 max-w-2xl">
          <p className="text-sm font-semibold" style={{ color: "#5A3B2E" }}>
            {categoryInfo.emoji} {categoryInfo.label}
          </p>
          <p className="text-xs text-slate-500">{categoryInfo.desc}</p>
        </div>
      )}

      {/* grid de productos */}
      {loading ? (
        <p className="text-slate-500 text-sm">Cargando productos...</p>
      ) : filtered.length === 0 ? (
        <div className="text-slate-500 text-sm bg-white/50 rounded-lg p-6">
          No hay productos en esta categoría todavía. Agrega uno desde Admin ✨
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
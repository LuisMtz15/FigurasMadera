// src/components/admin/PackagesAdmin.jsx
import { useEffect, useMemo, useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import {
  fetchProducts,
} from "../../lib/productsApi.js";
import {
  fetchPackages,
  addPackageToDb,
  updatePackageInDb,
  deletePackageFromDb,
} from "../../lib/packagesApi.js";

const COLORS = {
  surface: "rgba(255,255,255,0.85)",
  border: "rgba(252, 231, 218, 1)",
  dark: "#5A3B2E",
  accent: "#E98A6B",
};

export default function PackagesAdmin() {
  // siempre inicializa en []
  const [dbProducts, setDbProducts] = useState([]);
  const [dbPackages, setDbPackages] = useState([]);

  const [pkgForm, setPkgForm] = useState({
    name: "",
    price: "",
    description: "",
    promo: false,
    promo_price: "",
    product_ids: [],
  });

  const [editingPkgId, setEditingPkgId] = useState(null);
  const [pkgLoading, setPkgLoading] = useState(false);

  // para el selector
  const [showAllPkgProducts, setShowAllPkgProducts] = useState(false);
  const [pkgProductFilter, setPkgProductFilter] = useState("Todos");

  useEffect(() => {
    (async () => {
      const { data } = await supabase.auth.getSession();
      if (!data.session) {
        window.location.href = "/login";
        return;
      }
      await Promise.all([loadProducts(), loadPackages()]);
    })();
  }, []);

  async function loadProducts() {
    const data = await fetchProducts();
    setDbProducts(data || []);
  }

  async function loadPackages() {
    const data = await fetchPackages();
    setDbPackages(data || []);
  }

  function handlePkgChange(e) {
    const { name, value, type, checked } = e.target;
    setPkgForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  function toggleProductInPackage(productId) {
    setPkgForm((prev) => {
      const exists = prev.product_ids.includes(productId);
      return {
        ...prev,
        product_ids: exists
          ? prev.product_ids.filter((id) => id !== productId)
          : [...prev.product_ids, productId],
      };
    });
  }

  function resetPkgForm() {
    setPkgForm({
      name: "",
      price: "",
      description: "",
      promo: false,
      promo_price: "",
      product_ids: [],
    });
    setEditingPkgId(null);
  }

  async function handleSubmitPackage(e) {
    e.preventDefault();
    if (!pkgForm.name.trim()) return alert("El paquete necesita nombre");
    if (!pkgForm.price) return alert("Ponle precio al paquete");
    if (
      pkgForm.promo &&
      (!pkgForm.promo_price || +pkgForm.promo_price >= +pkgForm.price)
    ) {
      return alert("El precio promo del paquete debe ser menor al normal.");
    }

    try {
      setPkgLoading(true);

      const payload = {
        name: pkgForm.name.trim(),
        price: Number(pkgForm.price),
        description: pkgForm.description.trim() || "",
        promo: pkgForm.promo,
        promo_price: pkgForm.promo ? Number(pkgForm.promo_price) : null,
        product_ids: pkgForm.product_ids,
      };

      if (editingPkgId) {
        await updatePackageInDb(editingPkgId, payload);
        alert("Paquete actualizado ✅");
      } else {
        await addPackageToDb(payload);
        alert("Paquete guardado ✅");
      }

      await loadPackages();
      resetPkgForm();
    } catch (err) {
      console.error(err);
      alert("Error guardando paquete");
    } finally {
      setPkgLoading(false);
    }
  }

  function handleEditPackage(pkg) {
    setEditingPkgId(pkg.id);
    setPkgForm({
      name: pkg.name || "",
      price: pkg.price || "",
      description: pkg.description || "",
      promo: pkg.promo || false,
      promo_price: pkg.promo_price || "",
      product_ids: pkg.product_ids || [],
    });
  }

  async function handleDeletePackage(pkg) {
    if (!confirm(`¿Borrar el paquete "${pkg.name}"?`)) return;
    try {
      await deletePackageFromDb(pkg.id);
      await loadPackages();
      alert("Paquete eliminado ✅");
    } catch (err) {
      console.error(err);
      alert("No se pudo borrar el paquete");
    }
  }

  // categorías de los productos
  const pkgProductCategories = useMemo(() => {
    const set = new Set();
    (dbProducts || []).forEach((p) => {
      const cat = (p.category || "").trim();
      if (cat) set.add(cat);
    });
    return ["Todos", ...Array.from(set)];
  }, [dbProducts]);

  // productos filtrados por categoría
  const filteredPkgProducts =
    pkgProductFilter === "Todos"
      ? dbProducts || []
      : (dbProducts || []).filter(
          (p) => (p.category || "").trim() === pkgProductFilter
        );

  // productos seleccionados (para el preview)
  const selectedProductsForPkg = (dbProducts || []).filter((p) =>
    pkgForm.product_ids.includes(p.id)
  );

  return (
    <>
      {/* formulario */}
      <form
        onSubmit={handleSubmitPackage}
        className="space-y-4 rounded-2xl p-6 max-w-lg"
        style={{
          backgroundColor: COLORS.surface,
          border: `1px solid ${COLORS.border}`,
        }}
      >
        <div>
          <label className="text-sm font-medium" style={{ color: COLORS.dark }}>
            Nombre del paquete
          </label>
          <input
            name="name"
            value={pkgForm.name}
            onChange={handlePkgChange}
            className="w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#FCE7DA]"
            placeholder="Paquete navideño"
          />
        </div>

        <div>
          <label className="text-sm font-medium" style={{ color: COLORS.dark }}>
            Precio del paquete
          </label>
          <input
            type="number"
            name="price"
            value={pkgForm.price}
            onChange={handlePkgChange}
            className="w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#FCE7DA]"
            placeholder="500"
          />
        </div>

        <label className="inline-flex items-center gap-2 bg-white/70  py-2 rounded-lg cursor-pointer">
          <input
            id="pkg-promo"
            type="checkbox"
            name="promo"
            checked={pkgForm.promo}
            onChange={handlePkgChange}
            className="h-4 w-4"
          />
          <span className="text-sm" style={{ color: COLORS.dark }}>
            Este paquete está en promoción
          </span>
        </label>

        {pkgForm.promo && (
          <div>
            <label
              className="text-sm font-medium"
              style={{ color: COLORS.dark }}
            >
              Precio de promoción
            </label>
            <input
              type="number"
              name="promo_price"
              value={pkgForm.promo_price}
              onChange={handlePkgChange}
              className="w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#FCE7DA]"
              placeholder="450"
            />
          </div>
        )}

        <div>
          <label className="text-sm font-medium" style={{ color: COLORS.dark }}>
            Descripción
          </label>
          <textarea
            name="description"
            value={pkgForm.description}
            onChange={handlePkgChange}
            rows={3}
            className="w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#FCE7DA]"
            placeholder="Incluye 3 figuras pintadas a mano..."
          />
        </div>

        {/* selector de productos */}
        <div className="space-y-2">
          <div className="flex items-center justify-between gap-2">
            <p
              className="text-sm font-medium"
              style={{ color: COLORS.dark }}
            >
              ¿Qué productos incluye?
            </p>

            <div className="relative">
              <select
                value={pkgProductFilter}
                onChange={(e) => setPkgProductFilter(e.target.value)}
                className="appearance-none text-xs pl-3 pr-7 py-1 rounded-full bg-white/80 border border-[#FCE7DA] text-[#5A3B2E] shadow-sm focus:outline-none focus:ring-2 focus:ring-[#FCE7DA]"
              >
                {pkgProductCategories.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
              <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-[10px] text-[#5A3B2E]/60">
                ▼
              </span>
            </div>
          </div>

          <div className="bg-white/50 border border-[#FCE7DA]/50 rounded-md p-2 space-y-2 max-h-56 overflow-y-auto">
            {(showAllPkgProducts
              ? filteredPkgProducts
              : filteredPkgProducts.slice(0, 3)
            ).map((p) => (
              <label key={p.id} className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={pkgForm.product_ids.includes(p.id)}
                  onChange={() => toggleProductInPackage(p.id)}
                />
                <span className="flex items-center gap-2">
                  {p.image_url ? (
                    <img
                      src={p.image_url}
                      alt={p.name}
                      className="h-7 w-7 rounded object-cover"
                    />
                  ) : (
                    <span className="h-7 w-7 rounded bg-pink-50 flex items-center justify-center text-xs">
                      🪵
                    </span>
                  )}
                  <span>{p.name}</span>
                  {p.category ? (
                    <span className="text-[10px] text-slate-400">
                      {p.category}
                    </span>
                  ) : null}
                </span>
              </label>
            ))}

            {filteredPkgProducts.length > 3 && (
              <button
                type="button"
                onClick={() => setShowAllPkgProducts((v) => !v)}
                className="text-xs text-[#5A3B2E] underline"
              >
                {showAllPkgProducts
                  ? "Ver menos"
                  : `Ver todo (${filteredPkgProducts.length})`}
              </button>
            )}
          </div>
        </div>

        {/* preview de seleccionados */}
        {selectedProductsForPkg.length > 0 && (
          <div>
            <p className="text-xs text-slate-400 mb-2">
              Vista rápida del paquete:
            </p>
            <div className="flex gap-2">
              {selectedProductsForPkg.slice(0, 4).map((p) => (
                <div
                    key={p.id}
                    className="w-14 h-14 rounded-lg overflow-hidden bg-slate-100"
                >
                  {p.image_url ? (
                    <img
                      src={p.image_url}
                      alt={p.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-lg">
                      🪵
                    </div>
                  )}
                </div>
              ))}
              {selectedProductsForPkg.length > 4 && (
                <div className="w-14 h-14 rounded-lg bg-slate-200 flex items-center justify-center text-xs text-slate-600">
                  +{selectedProductsForPkg.length - 4}
                </div>
              )}
            </div>
          </div>
        )}

        <button
          type="submit"
          disabled={pkgLoading}
          className="px-4 py-2 rounded-md text-sm font-medium text-white transition disabled:opacity-50"
          style={{ backgroundColor: COLORS.accent }}
        >
          {pkgLoading
            ? "Guardando..."
            : editingPkgId
            ? "Guardar cambios"
            : "Guardar paquete"}
        </button>
        {editingPkgId && (
          <button
            type="button"
            onClick={resetPkgForm}
            className="ml-2 text-sm text-slate-500 hover:text-slate-700"
          >
            Cancelar edición
          </button>
        )}
      </form>

      {/* lista de paquetes */}
      <div className="space-y-3 mt-6">
        <h2
          className="text-lg font-semibold"
          style={{ color: COLORS.dark }}
        >
          Paquetes en Supabase
        </h2>
        {dbPackages.length === 0 ? (
          <p className="text-sm text-slate-500">
            Aún no hay paquetes. Agrega uno arriba ✨
          </p>
        ) : (
          <ul className="grid gap-3 md:grid-cols-2">
            {dbPackages.map((pkg) => {
              const pkgProducts = (dbProducts || []).filter((p) =>
                (pkg.product_ids || []).includes(p.id)
              );
              const firstFour = pkgProducts.slice(0, 4);
              const remaining = pkgProducts.length - firstFour.length;

              return (
                <li
                  key={pkg.id}
                  className="flex gap-4 rounded-xl p-4 bg-white/55 border border-[#FCE7DA]/60"
                >
                  <div className="grid grid-cols-2 gap-1 w-20 shrink-0">
                    {firstFour.map((p) =>
                      p.image_url ? (
                        <img
                          key={p.id}
                          src={p.image_url}
                          alt={p.name}
                          className="w-9 h-9 rounded object-cover bg-slate-50"
                        />
                      ) : (
                        <div
                          key={p.id}
                          className="w-9 h-9 rounded bg-amber-50 flex items-center justify-center text-[12px]"
                        >
                          🪵
                        </div>
                      )
                    )}
                    {remaining > 0 && (
                      <div className="w-9 h-9 rounded bg-slate-100 flex items-center justify-center text-[10px] text-slate-500">
                        +{remaining}
                      </div>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <p
                      className="text-sm font-semibold"
                      style={{ color: COLORS.dark }}
                    >
                      {pkg.name}
                    </p>
                    <p className="text-xs text-slate-500">
                      ${pkg.price}
                      {pkg.promo && pkg.promo_price ? (
                        <span className="ml-1 text-[10px] text-red-500">
                          promo ${pkg.promo_price}
                        </span>
                      ) : null}
                    </p>
                    <p className="text-[10px] text-slate-400">
                      Incluye {(pkg.product_ids || []).length} productos
                    </p>
                    <div className="flex gap-2 mt-2">
                      <button
                        onClick={() => handleEditPackage(pkg)}
                        className="text-xs px-2 py-1 rounded text-white"
                        style={{ backgroundColor: COLORS.dark }}
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => handleDeletePackage(pkg)}
                        className="text-xs px-2 py-1 rounded bg-red-100 text-red-700 hover:bg-red-200"
                      >
                        Eliminar
                      </button>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </>
  );
}
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
import { THEME } from "../../config/theme.js";
import { PackageSearch, Search } from "lucide-react";

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
  const [searchTerm, setSearchTerm] = useState("");
  const [pkgProductSearchTerm, setPkgProductSearchTerm] = useState("");

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
  const filteredPkgProducts = useMemo(() => {
    const byCategory =
      pkgProductFilter === "Todos"
        ? dbProducts || []
        : (dbProducts || []).filter(
            (p) => (p.category || "").trim() === pkgProductFilter
          );

    const query = pkgProductSearchTerm.trim().toLowerCase();
    if (!query) return byCategory;

    return byCategory.filter((product) => {
      const name = String(product.name || "").toLowerCase();
      const category = String(product.category || "").toLowerCase();
      return name.includes(query) || category.includes(query);
    });
  }, [dbProducts, pkgProductFilter, pkgProductSearchTerm]);

  // productos seleccionados (para el preview)
  const selectedProductsForPkg = (dbProducts || []).filter((p) =>
    pkgForm.product_ids.includes(p.id)
  );

  const filteredPackages = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();

    if (!query) return dbPackages;

    return dbPackages.filter((pkg) => {
      const name = String(pkg.name || "").toLowerCase();
      const description = String(pkg.description || "").toLowerCase();
      return name.includes(query) || description.includes(query);
    });
  }, [dbPackages, searchTerm]);

  return (
    <div className="grid gap-6 xl:grid-cols-[minmax(0,0.95fr)_minmax(0,1.2fr)] xl:items-start">
      <form
        onSubmit={handleSubmitPackage}
        className="theme-panel space-y-4 rounded-2xl p-6"
        style={{
          backgroundColor: THEME.surfaceStrong,
          border: `1px solid ${THEME.borderStrong}`,
          boxShadow: `0 26px 54px -40px ${THEME.shadowStrong}`,
        }}
      >
        <div className="space-y-1">
          <h2 className="text-lg font-semibold" style={{ color: THEME.textStrong }}>
            {editingPkgId ? "Editar paquete" : "Nuevo paquete"}
          </h2>
          <p className="text-sm" style={{ color: THEME.text }}>
            Reúne tus piezas en un paquete listo para vender o promocionar.
          </p>
        </div>

        <div>
          <label className="text-sm font-medium" style={{ color: THEME.textStrong }}>
            Nombre del paquete
          </label>
          <input
            name="name"
            value={pkgForm.name}
            onChange={handlePkgChange}
            className="theme-input text-sm"
            placeholder="Paquete navideño"
          />
        </div>

        <div>
          <label className="text-sm font-medium" style={{ color: THEME.textStrong }}>
            Precio del paquete
          </label>
          <input
            type="number"
            name="price"
            value={pkgForm.price}
            onChange={handlePkgChange}
            className="theme-input text-sm"
            placeholder="500"
          />
        </div>

        <label className="inline-flex items-center gap-2 py-2 rounded-lg cursor-pointer" style={{ backgroundColor: THEME.surface }}>
          <input
            id="pkg-promo"
            type="checkbox"
            name="promo"
            checked={pkgForm.promo}
            onChange={handlePkgChange}
            className="h-4 w-4"
          />
          <span className="text-sm" style={{ color: THEME.textStrong }}>
            Este paquete está en promoción
          </span>
        </label>

        {pkgForm.promo && (
          <div>
            <label
              className="text-sm font-medium"
              style={{ color: THEME.textStrong }}
            >
              Precio de promoción
            </label>
            <input
              type="number"
              name="promo_price"
              value={pkgForm.promo_price}
              onChange={handlePkgChange}
              className="theme-input text-sm"
              placeholder="450"
            />
          </div>
        )}

        <div>
          <label className="text-sm font-medium" style={{ color: THEME.textStrong }}>
            Descripción
          </label>
          <textarea
            name="description"
            value={pkgForm.description}
            onChange={handlePkgChange}
            rows={3}
            className="theme-input text-sm"
            placeholder="Incluye 3 figuras pintadas a mano..."
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between gap-2">
            <p
              className="text-sm font-medium"
              style={{ color: THEME.textStrong }}
            >
              ¿Qué productos incluye?
            </p>

            <div className="relative">
              <select
                value={pkgProductFilter}
                onChange={(e) => setPkgProductFilter(e.target.value)}
                className="theme-input appearance-none text-xs pl-3 pr-7 py-1 rounded-full shadow-sm"
                style={{ color: THEME.textStrong }}
              >
                {pkgProductCategories.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
              <span
                className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-[10px]"
                style={{ color: THEME.textSoft }}
              >
                ▼
              </span>
            </div>
          </div>

          <div
            className="flex h-9 w-full items-center gap-2 rounded-xl px-3"
            style={{
              backgroundColor: THEME.surfaceStrong,
              border: `1px solid ${THEME.border}`,
            }}
          >
            <Search size={15} className="shrink-0" style={{ color: THEME.textSoft }} />
            <input
              type="text"
              value={pkgProductSearchTerm}
              onChange={(e) => setPkgProductSearchTerm(e.target.value)}
              placeholder="Buscar producto para agregar..."
              className="w-full border-0 bg-transparent p-0 text-sm outline-none"
              style={{ color: THEME.textStrong }}
            />
          </div>

          <div
            className="rounded-md p-2 space-y-2 max-h-56 overflow-y-auto"
            style={{
              backgroundColor: THEME.surface,
              border: `1px solid ${THEME.border}`,
            }}
          >
            {filteredPkgProducts.length === 0 ? (
              <p className="px-1 py-4 text-center text-xs" style={{ color: THEME.text }}>
                No encontramos productos con ese nombre.
              </p>
            ) : (
              (showAllPkgProducts
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
                      <span className="h-7 w-7 rounded flex items-center justify-center text-xs theme-empty-tile">
                        🪵
                      </span>
                    )}
                    <span>{p.name}</span>
                    {p.category ? (
                      <span className="text-[10px]" style={{ color: THEME.textSoft }}>
                        {p.category}
                      </span>
                    ) : null}
                  </span>
                </label>
              ))
            )}

            {filteredPkgProducts.length > 3 && (
              <button
                type="button"
                onClick={() => setShowAllPkgProducts((v) => !v)}
                className="text-xs underline"
                style={{ color: THEME.textStrong }}
              >
                {showAllPkgProducts
                  ? "Ver menos"
                  : `Ver todo (${filteredPkgProducts.length})`}
              </button>
            )}
          </div>
        </div>

        {selectedProductsForPkg.length > 0 && (
          <div>
            <p className="text-xs mb-2" style={{ color: THEME.textSoft }}>
              Vista rápida del paquete:
            </p>
            <div className="flex gap-2">
              {selectedProductsForPkg.slice(0, 4).map((p) => (
                <div
                  key={p.id}
                  className="w-14 h-14 rounded-lg overflow-hidden"
                  style={{ backgroundColor: THEME.surfaceTint }}
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
                <div className="w-14 h-14 rounded-lg flex items-center justify-center text-xs theme-counter-tile">
                  +{selectedProductsForPkg.length - 4}
                </div>
              )}
            </div>
          </div>
        )}

        <button
          type="submit"
          disabled={pkgLoading}
          className="theme-btn-primary px-4 py-2 rounded-lg text-sm font-medium transition disabled:opacity-50"
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
            className="ml-2 text-sm"
            style={{ color: THEME.text }}
          >
            Cancelar edición
          </button>
        )}
      </form>

      <div
        className="theme-panel rounded-2xl p-5 md:p-6 space-y-4"
        style={{
          backgroundColor: THEME.surfaceStrong,
          border: `1px solid ${THEME.borderStrong}`,
          boxShadow: `0 26px 54px -40px ${THEME.shadowStrong}`,
        }}
      >
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2
              className="text-lg font-semibold"
              style={{ color: THEME.textStrong }}
            >
              Paquetes registrados
            </h2>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-end lg:min-w-[420px]">
            <div
              className="flex h-10 w-full items-center gap-2 rounded-xl px-3 sm:max-w-[320px]"
              style={{
                backgroundColor: THEME.surfaceStrong,
                border: `1px solid ${THEME.borderStrong}`,
              }}
            >
              <Search
                size={16}
                className="shrink-0"
                style={{ color: THEME.textSoft }}
              />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Buscar paquete..."
                className="w-full border-0 bg-transparent p-0 text-sm outline-none"
                style={{ color: THEME.textStrong }}
              />
            </div>
            <div
              className="inline-flex h-10 items-center justify-center rounded-xl px-3 text-sm sm:min-w-[120px]"
              style={{
                backgroundColor: THEME.surface,
                color: THEME.textStrong,
                border: `1px solid ${THEME.border}`,
              }}
            >
              {filteredPackages.length} resultado{filteredPackages.length === 1 ? "" : "s"}
            </div>
          </div>
        </div>

        {dbPackages.length === 0 ? (
          <p className="text-sm" style={{ color: THEME.text }}>
            Aún no hay paquetes. Agrega uno arriba ✨
          </p>
        ) : filteredPackages.length === 0 ? (
          <div
            className="rounded-2xl px-4 py-10 text-center"
            style={{
              backgroundColor: THEME.surface,
              border: `1px solid ${THEME.border}`,
            }}
          >
            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl" style={{ backgroundColor: THEME.tintCoral }}>
              <PackageSearch size={22} style={{ color: THEME.primary }} />
            </div>
            <p className="text-sm font-medium" style={{ color: THEME.textStrong }}>
              No encontramos ese paquete
            </p>
            <p className="mt-1 text-xs" style={{ color: THEME.text }}>
              Prueba con otro nombre.
            </p>
          </div>
        ) : (
          <ul className="grid gap-3 md:grid-cols-2">
            {filteredPackages.map((pkg) => {
              const pkgProducts = (dbProducts || []).filter((p) =>
                (pkg.product_ids || []).includes(p.id)
              );
              const firstFour = pkgProducts.slice(0, 4);
              const remaining = pkgProducts.length - firstFour.length;

              return (
                <li
                  key={pkg.id}
                  className="flex gap-4 rounded-2xl p-4"
                  style={{
                    backgroundColor: THEME.surface,
                    border: `1px solid ${THEME.border}`,
                    boxShadow: `0 18px 36px -34px ${THEME.shadowStrong}`,
                  }}
                >
                  <div className="grid grid-cols-2 gap-1 w-20 shrink-0">
                    {firstFour.map((p) =>
                      p.image_url ? (
                        <img
                          key={p.id}
                          src={p.image_url}
                          alt={p.name}
                          className="w-9 h-9 rounded object-cover"
                          style={{ backgroundColor: THEME.surfaceStrong }}
                        />
                      ) : (
                        <div
                          key={p.id}
                          className="w-9 h-9 rounded flex items-center justify-center text-[12px] theme-empty-tile"
                        >
                          🪵
                        </div>
                      )
                    )}
                    {remaining > 0 && (
                      <div className="w-9 h-9 rounded flex items-center justify-center text-[10px] theme-counter-tile">
                        +{remaining}
                      </div>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <p
                      className="text-sm font-semibold"
                      style={{ color: THEME.textStrong }}
                    >
                      {pkg.name}
                    </p>
                    <p className="text-xs" style={{ color: THEME.text }}>
                      ${pkg.price}
                      {pkg.promo && pkg.promo_price ? (
                        <span className="ml-1 text-[10px]" style={{ color: THEME.accent }}>
                          promo ${pkg.promo_price}
                        </span>
                      ) : null}
                    </p>
                    <p className="text-[10px]" style={{ color: THEME.textSoft }}>
                      Incluye {(pkg.product_ids || []).length} productos
                    </p>
                    <div className="flex gap-2 mt-2">
                      <button
                        onClick={() => handleEditPackage(pkg)}
                        className="theme-btn-secondary text-xs px-2 py-1 rounded-lg"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => handleDeletePackage(pkg)}
                        className="theme-btn-danger text-xs px-2 py-1 rounded-lg"
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
    </div>
  );
}

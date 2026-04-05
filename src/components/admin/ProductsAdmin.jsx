// src/components/admin/ProductsAdmin.jsx
import { useEffect, useMemo, useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import {
  fetchProducts,
  uploadProductImage,
  addProductToDb,
  updateProductInDb,
  deleteProductFromDb,
  deleteImageFromStorage,
} from "../../lib/productsApi.js";
import { THEME } from "../../config/theme.js";
import { PackageSearch, Search } from "lucide-react";

const PRESET_CATEGORIES = [
  "Halloween",
  "Navidad",
  "Fechas Patrias",
  "Día del Maestro",
  "Día de las Madres",
  "San Valentín",
];

export default function ProductsAdmin() {
  const [dbProducts, setDbProducts] = useState([]);
  const [form, setForm] = useState({
    name: "",
    price: "",
    category: "",
    description: "",
    on_sale: false,
    sale_price: "",
  });
  const [customCategory, setCustomCategory] = useState("");
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    (async () => {
      const { data } = await supabase.auth.getSession();
      if (!data.session) {
        window.location.href = "/login";
        return;
      }
      await loadProducts();
    })();
  }, []);

  async function loadProducts() {
    const data = await fetchProducts();
    setDbProducts(data || []);
  }

  function handleChange(e) {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      setForm((prev) => ({ ...prev, [name]: checked }));
      return;
    }

    if (name === "category") {
      setForm((prev) => ({ ...prev, category: value }));
      if (value !== "__custom") setCustomCategory("");
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  }

  function handleFileChange(e) {
    const f = e.target.files?.[0] ?? null;
    setFile(f);
    setPreview(f ? URL.createObjectURL(f) : null);
  }

  function resetForm() {
    setForm({
      name: "",
      price: "",
      category: "",
      description: "",
      on_sale: false,
      sale_price: "",
    });
    setCustomCategory("");
    setFile(null);
    setPreview(null);
    setEditingId(null);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const nameStr = String(form.name ?? "").trim();
    const priceStr = String(form.price ?? "").trim();
    const salePriceStr = String(form.sale_price ?? "").trim();

    if (!nameStr) return alert("Ponle nombre");
    if (!priceStr) return alert("Ponle precio");

    const basePrice = Number(priceStr);
    const isOnSale = form.on_sale;

    // categoría final
    const finalCategory =
      form.category === "__custom"
        ? String(customCategory ?? "").trim()
        : String(form.category ?? "").trim();

    if (!finalCategory) {
      return alert("Selecciona o escribe una categoría");
    }

    let salePriceNumber = null;
    if (isOnSale) {
      if (!salePriceStr) return alert("Pon el precio de descuento");
      salePriceNumber = Number(salePriceStr);
      if (salePriceNumber >= basePrice) {
        return alert(
          "El precio de descuento debe ser menor que el precio normal"
        );
      }
    }

    try {
      setLoading(true);

      let imageUrl = null;
      let imagePath = null;

      if (file) {
        const uploaded = await uploadProductImage(file);
        imageUrl = uploaded.publicUrl;
        imagePath = uploaded.path;
      }

      const productPayload = {
        name: nameStr,
        price: basePrice,
        category: finalCategory,
        description: String(form.description ?? "").trim(),
        on_sale: isOnSale,
        sale_price: isOnSale ? salePriceNumber : null,
      };

      if (imageUrl && imagePath) {
        productPayload.image_url = imageUrl;
        productPayload.image_path = imagePath;
      }

      if (editingId) {
        await updateProductInDb(editingId, productPayload);
        alert("Producto actualizado ✅");
      } else {
        await addProductToDb(productPayload);
        alert("Producto guardado ✅");
      }

      await loadProducts();
      resetForm();
    } catch (err) {
      console.error("Error en handleSubmit:", err);
      alert("Error guardando producto");
    } finally {
      setLoading(false);
    }
  }

  async function handleEdit(p) {
    const cat = (p.category || "").trim();
    const isPreset = PRESET_CATEGORIES.includes(cat);

    setEditingId(p.id);
    setForm({
      name: p.name || "",
      price:
        p.price !== null && p.price !== undefined ? String(p.price) : "",
      category: isPreset ? cat : "__custom",
      description: p.description || "",
      on_sale: !!p.on_sale,
      sale_price:
        p.sale_price !== null && p.sale_price !== undefined
          ? String(p.sale_price)
          : "",
    });
    setCustomCategory(isPreset ? "" : cat);
    setPreview(p.image_url || null);
    setFile(null);
  }

  async function handleDelete(p) {
    if (!confirm(`¿Borrar "${p.name}"?`)) return;
    try {
      await deleteProductFromDb(p.id);
      if (p.image_path) {
        await deleteImageFromStorage(p.image_path);
      }
      await loadProducts();
      alert("Producto eliminado ✅");
    } catch (err) {
      console.error(err);
      alert("No se pudo borrar");
    }
  }

  const filteredProducts = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();

    if (!query) return dbProducts;

    return dbProducts.filter((product) => {
      const name = String(product.name || "").toLowerCase();
      const category = String(product.category || "").toLowerCase();
      return name.includes(query) || category.includes(query);
    });
  }, [dbProducts, searchTerm]);

  return (
    <div className="grid gap-6 xl:grid-cols-[minmax(0,0.95fr)_minmax(0,1.2fr)] xl:items-start">
      <form
        onSubmit={handleSubmit}
        className="theme-panel space-y-4 rounded-2xl p-6"
        style={{
          backgroundColor: THEME.surfaceStrong,
          border: `1px solid ${THEME.borderStrong}`,
          boxShadow: `0 26px 54px -40px ${THEME.shadowStrong}`,
        }}
      >
        <div className="space-y-1">
          <h2 className="text-lg font-semibold" style={{ color: THEME.textStrong }}>
            {editingId ? "Editar producto" : "Nuevo producto"}
          </h2>
          <p className="text-sm" style={{ color: THEME.text }}>
            Completa la información para guardar una pieza en el catálogo.
          </p>
        </div>

        <div>
          <label className="text-sm font-medium" style={{ color: THEME.textStrong }}>
            Nombre del producto
          </label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            className="theme-input text-sm"
            placeholder="Ej. Colibrí pastel"
          />
        </div>

        <div className="flex flex-col gap-3 md:flex-row md:items-end">
          <div className="flex-1">
            <label
              className="text-sm font-medium"
              style={{ color: THEME.textStrong }}
            >
              Precio (MXN)
            </label>
            <input
              type="number"
              name="price"
              value={form.price}
              onChange={handleChange}
              className="theme-input text-sm"
              placeholder="280"
              min="0"
            />
          </div>

          <label className="inline-flex items-center gap-2 py-2 rounded-lg cursor-pointer" style={{ backgroundColor: THEME.surface }}>
            <input
              type="checkbox"
              name="on_sale"
              checked={form.on_sale}
              onChange={handleChange}
              className="h-4 w-4"
            />
            <span className="text-sm" style={{ color: THEME.textStrong }}>
              Promoción
            </span>
          </label>
        </div>

        {form.on_sale && (
          <div>
            <label
              className="text-sm font-medium"
              style={{ color: THEME.textStrong }}
            >
              Precio con descuento (MXN)
            </label>
            <input
              type="number"
              name="sale_price"
              value={form.sale_price}
              onChange={handleChange}
              className="theme-input text-sm"
              placeholder="250"
              min="0"
            />
            <p className="text-[10px] mt-1" style={{ color: THEME.textSoft }}>
              Debe ser menor que el precio normal.
            </p>
          </div>
        )}

        <div className="space-y-2">
          <label className="text-sm font-medium" style={{ color: THEME.textStrong }}>
            Categoría
          </label>
          <div className="relative">
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              className="theme-input appearance-none pr-9 text-sm"
            >
              <option value="" disabled>
                Seleccionar categoría
              </option>
              {PRESET_CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
              <option value="__custom">Otra…</option>
            </select>
            <span
              className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs"
              style={{ color: THEME.textSoft }}
            >
              ▼
            </span>
          </div>

          {form.category === "__custom" && (
            <input
              type="text"
              value={customCategory}
              onChange={(e) => setCustomCategory(e.target.value)}
              className="theme-input text-sm"
              placeholder="Escribe la categoría (ej. Primera Comunión)"
            />
          )}
        </div>

        <div>
          <label className="text-sm font-medium" style={{ color: THEME.textStrong }}>
            Descripción
          </label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            rows={3}
            className="theme-input text-sm"
            placeholder="Figura de madera pintada a mano..."
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium" style={{ color: THEME.textStrong }}>
            Imagen
          </label>
          <div className="flex items-center gap-3 flex-wrap">
            <label className="theme-btn-soft inline-flex items-center gap-2 px-3 py-1.5 text-sm rounded-lg cursor-pointer transition-all">
              Seleccionar archivo
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
            </label>
            {file ? (
              <span className="text-xs truncate max-w-[140px]" style={{ color: THEME.text }}>
                {file.name}
              </span>
            ) : preview ? (
              <span className="text-xs" style={{ color: THEME.text }}>
                Imagen actual
              </span>
            ) : (
              <span className="text-xs" style={{ color: THEME.textSoft }}>
                Ninguna imagen
              </span>
            )}
          </div>
          {preview && (
            <img
              src={preview}
              alt="preview"
              className="h-20 w-20 object-cover rounded-md border"
              style={{ borderColor: THEME.border }}
            />
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="theme-btn-primary px-4 py-2 rounded-lg text-sm font-medium transition disabled:opacity-50"
        >
          {loading
            ? "Guardando..."
            : editingId
            ? "Guardar cambios"
            : "Guardar producto"}
        </button>
        {editingId && (
          <button
            type="button"
            onClick={resetForm}
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
            <h2 className="text-lg font-semibold" style={{ color: THEME.textStrong }}>
              Productos registrados
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
                placeholder="Buscar producto..."
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
              {filteredProducts.length} resultado{filteredProducts.length === 1 ? "" : "s"}
            </div>
          </div>
        </div>

        {dbProducts.length === 0 ? (
          <p className="text-sm" style={{ color: THEME.text }}>
            Aún no hay productos. Agrega uno arriba ✨
          </p>
        ) : filteredProducts.length === 0 ? (
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
              No encontramos ese producto
            </p>
            <p className="mt-1 text-xs" style={{ color: THEME.text }}>
              Prueba con otro nombre o categoría.
            </p>
          </div>
        ) : (
          <ul className="grid gap-3 md:grid-cols-2">
            {filteredProducts.map((p) => (
              <li
                key={p.id}
                className="flex gap-4 rounded-2xl p-4"
                style={{
                  backgroundColor: THEME.surface,
                  border: `1px solid ${THEME.border}`,
                  boxShadow: `0 18px 36px -34px ${THEME.shadowStrong}`,
                }}
              >
                {p.image_url ? (
                  <img
                    src={p.image_url}
                    alt={p.name}
                    className="h-[4.5rem] w-[4.5rem] rounded-xl object-cover"
                  />
                ) : (
                  <div className="h-[4.5rem] w-[4.5rem] rounded-xl flex items-center justify-center text-xl theme-empty-tile">
                    🪵
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <p
                    className="text-sm font-semibold truncate"
                    style={{ color: THEME.textStrong }}
                  >
                    {p.name}
                  </p>
                  <p className="text-xs mb-1" style={{ color: THEME.text }}>
                    ${p.price} · {p.category}
                  </p>
                  {p.on_sale && p.sale_price && (
                    <p className="text-[10px] font-medium" style={{ color: THEME.accent }}>
                      En promoción: ${p.sale_price}
                    </p>
                  )}
                  <div className="flex gap-2 mt-2">
                    <button
                      onClick={() => handleEdit(p)}
                      className="theme-btn-secondary text-xs px-2 py-1 rounded-lg"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDelete(p)}
                      className="theme-btn-danger text-xs px-2 py-1 rounded-lg"
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

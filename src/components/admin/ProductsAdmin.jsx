// src/components/admin/ProductsAdmin.jsx
import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import {
  fetchProducts,
  uploadProductImage,
  addProductToDb,
  updateProductInDb,
  deleteProductFromDb,
  deleteImageFromStorage,
} from "../../lib/productsApi.js";

const COLORS = {
  surface: "rgba(255,255,255,0.85)",
  border: "rgba(252, 231, 218, 1)", // #FCE7DA
  dark: "#5A3B2E",
  accent: "#E98A6B",
};

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

  return (
    <>
      {/* formulario */}
      <form
        onSubmit={handleSubmit}
        className="space-y-4 rounded-2xl p-6 max-w-lg"
        style={{
          backgroundColor: COLORS.surface,
          border: `1px solid ${COLORS.border}`,
        }}
      >
        <div>
          <label className="text-sm font-medium" style={{ color: COLORS.dark }}>
            Nombre del producto
          </label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#FCE7DA]"
            placeholder="Ej. Colibrí pastel"
          />
        </div>

        {/* precio + promo en una sola línea bonita */}
        <div className="flex flex-col gap-3 md:flex-row md:items-end">
          <div className="flex-1">
            <label
              className="text-sm font-medium"
              style={{ color: COLORS.dark }}
            >
              Precio (MXN)
            </label>
            <input
              type="number"
              name="price"
              value={form.price}
              onChange={handleChange}
              className="w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#FCE7DA]"
              placeholder="280"
              min="0"
            />
          </div>

          <label className="inline-flex items-center gap-2 bg-white/70 py-2 rounded-lg cursor-pointer">
            <input
              type="checkbox"
              name="on_sale"
              checked={form.on_sale}
              onChange={handleChange}
              className="h-4 w-4"
            />
            <span className="text-sm" style={{ color: COLORS.dark }}>
              Promoción
            </span>
          </label>
        </div>

        {form.on_sale && (
          <div>
            <label
              className="text-sm font-medium"
              style={{ color: COLORS.dark }}
            >
              Precio con descuento (MXN)
            </label>
            <input
              type="number"
              name="sale_price"
              value={form.sale_price}
              onChange={handleChange}
              className="w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#FCE7DA]"
              placeholder="250"
              min="0"
            />
            <p className="text-[10px] text-slate-400 mt-1">
              Debe ser menor que el precio normal.
            </p>
          </div>
        )}

        {/* categoría con diseño */}
        <div className="space-y-2">
          <label className="text-sm font-medium" style={{ color: COLORS.dark }}>
            Categoría
          </label>
          <div className="relative">
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              className="w-full appearance-none border rounded-md px-3 py-2 pr-9 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#FCE7DA]"
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
            {/* flechita */}
            <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400">
              ▼
            </span>
          </div>

          {form.category === "__custom" && (
            <input
              type="text"
              value={customCategory}
              onChange={(e) => setCustomCategory(e.target.value)}
              className="w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#FCE7DA]"
              placeholder="Escribe la categoría (ej. Primera Comunión)"
            />
          )}
        </div>

        <div>
          <label className="text-sm font-medium" style={{ color: COLORS.dark }}>
            Descripción
          </label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            rows={3}
            className="w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#FCE7DA]"
            placeholder="Figura de madera pintada a mano..."
          />
        </div>

        {/* imagen */}
        <div className="space-y-2">
          <label className="text-sm font-medium" style={{ color: COLORS.dark }}>
            Imagen
          </label>
          <div className="flex items-center gap-3 flex-wrap">
            <label className="inline-flex items-center gap-2 px-3 py-1.5 bg-white border border-slate-200 text-slate-700 text-sm rounded-md cursor-pointer hover:bg-slate-50 transition-all">
              Seleccionar archivo
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
            </label>
            {file ? (
              <span className="text-xs text-slate-500 truncate max-w-[140px]">
                {file.name}
              </span>
            ) : preview ? (
              <span className="text-xs text-slate-500">Imagen actual</span>
            ) : (
              <span className="text-xs text-slate-400">Ninguna imagen</span>
            )}
          </div>
          {preview && (
            <img
              src={preview}
              alt="preview"
              className="h-20 w-20 object-cover rounded-md border border-[#FCE7DA]"
            />
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 rounded-md text-sm font-medium text-white transition disabled:opacity-50"
          style={{ backgroundColor: COLORS.accent }}
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
            className="ml-2 text-sm text-slate-500 hover:text-slate-700"
          >
            Cancelar edición
          </button>
        )}
      </form>

      {/* lista */}
      <div className="space-y-3 mt-6">
        <h2 className="text-lg font-semibold" style={{ color: COLORS.dark }}>
          Productos registrados
        </h2>
        {dbProducts.length === 0 ? (
          <p className="text-sm text-slate-500">
            Aún no hay productos. Agrega uno arriba ✨
          </p>
        ) : (
          <ul className="grid gap-3 md:grid-cols-2">
            {dbProducts.map((p) => (
              <li
                key={p.id}
                className="flex gap-4 rounded-xl p-4 bg-white/60 border border-[#FCE7DA]/60"
              >
                {p.image_url ? (
                  <img
                    src={p.image_url}
                    alt={p.name}
                    className="h-16 w-16 rounded-md object-cover"
                  />
                ) : (
                  <div className="h-16 w-16 rounded-md bg-pink-50 flex items-center justify-center text-xl">
                    🪵
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <p
                    className="text-sm font-semibold truncate"
                    style={{ color: COLORS.dark }}
                  >
                    {p.name}
                  </p>
                  <p className="text-xs text-slate-500 mb-1">
                    ${p.price} · {p.category}
                  </p>
                  {p.on_sale && p.sale_price && (
                    <p className="text-[10px] text-red-500 font-medium">
                      En promoción: ${p.sale_price}
                    </p>
                  )}
                  <div className="flex gap-2 mt-2">
                    <button
                      onClick={() => handleEdit(p)}
                      className="text-xs px-2 py-1 rounded text-white"
                      style={{ backgroundColor: COLORS.dark }}
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDelete(p)}
                      className="text-xs px-2 py-1 rounded bg-red-100 text-red-700 hover:bg-red-200"
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
    </>
  );
}
// src/pages/Admin.jsx
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import {
  fetchProducts,
  uploadProductImage,
  addProductToDb,
  updateProductInDb,
  deleteProductFromDb,
  deleteImageFromStorage,
} from "../lib/productsApi.js";
import logo from "../assets/Sin_Fondo.png";

const COLORS = {
  surface: "rgba(255,255,255,0.85)",
  border: "rgba(252, 231, 218, 1)", // #FCE7DA
  dark: "#5A3B2E",
  accent: "#E98A6B",
};

export default function Admin() {
  const [dbProducts, setDbProducts] = useState([]);
  const [form, setForm] = useState({
    name: "",
    price: "",
    category: "",
    description: "",
  });
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState(null);

  // comprobar sesión y cargar productos
  useEffect(() => {
    checkSession();
  }, []);

  async function checkSession() {
    const { data } = await supabase.auth.getSession();
    if (!data.session) {
      window.location.href = "/login";
    } else {
      loadProducts();
    }
  }

  async function loadProducts() {
    const data = await fetchProducts();
    setDbProducts(data);
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleFileChange(e) {
    const f = e.target.files?.[0] ?? null;
    setFile(f);
    if (f) {
      setPreview(URL.createObjectURL(f));
    } else {
      setPreview(null);
    }
  }

  function resetForm() {
    setForm({
      name: "",
      price: "",
      category: "",
      description: "",
    });
    setFile(null);
    setPreview(null);
    setEditingId(null);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.name.trim()) return alert("Ponle nombre");
    if (!form.price.trim()) return alert("Ponle precio");

    try {
      setLoading(true);

      let imageUrl = null;
      let imagePath = null;

      if (file) {
        const uploaded = await uploadProductImage(file);
        imageUrl = uploaded.publicUrl;
        imagePath = uploaded.path;
      }

      if (editingId) {
        const payload = {
          name: form.name.trim(),
          price: Number(form.price),
          category: form.category.trim() || "Sin categoría",
          description: form.description.trim() || "",
        };
        if (imageUrl && imagePath) {
          payload.image_url = imageUrl;
          payload.image_path = imagePath;
        }
        await updateProductInDb(editingId, payload);
        alert("Producto actualizado ✅");
      } else {
        await addProductToDb({
          name: form.name.trim(),
          price: Number(form.price),
          category: form.category.trim() || "Sin categoría",
          description: form.description.trim() || "",
          image_url: imageUrl,
          image_path: imagePath,
        });
        alert("Producto guardado ✅");
      }

      await loadProducts();
      resetForm();
    } catch (err) {
      console.error("Error en handleSubmit:", err);
      alert("Error guardando el producto: " + err.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleEdit(p) {
    setEditingId(p.id);
    setForm({
      name: p.name || "",
      price: p.price || "",
      category: p.category || "",
      description: p.description || "",
    });
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

  async function handleLogout() {
    await supabase.auth.signOut();
    sessionStorage.removeItem("figuras_admin_auth");
    window.location.href = "/login";
  }

  return (
    <div className="container-main py-10 space-y-8">
      {/* header admin */}
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1
            className="text-3xl font-bold"
            style={{ color: COLORS.dark }}
          >
            Admin de productos
          </h1>
          <p className="text-slate-500 text-sm">
            Agrega, edita o elimina las figuras de madera.
          </p>
        </div>
        <div className="flex items-center gap-4">
          <img
            src={logo}
            alt="Belleza en Madera"
            className="h-10 w-auto object-contain opacity-90"
          />
          <button
            onClick={handleLogout}
            className="text-xs text-slate-500 hover:text-slate-700"
          >
            Cerrar sesión
          </button>
        </div>
      </div>

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

        <div>
          <label className="text-sm font-medium" style={{ color: COLORS.dark }}>
            Precio (MXN)
          </label>
          <input
            type="number"
            name="price"
            value={form.price}
            onChange={handleChange}
            className="w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#FCE7DA]"
            placeholder="280"
          />
        </div>

        <div>
          <label className="text-sm font-medium" style={{ color: COLORS.dark }}>
            Categoría
          </label>
          <input
            name="category"
            value={form.category}
            onChange={handleChange}
            className="w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#FCE7DA]"
            placeholder="Navidad, Halloween..."
          />
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

        {/* campo de imagen actualizado */}
        <div className="space-y-2">
          <label className="text-sm font-medium" style={{ color: COLORS.dark }}>
            Imagen
          </label>
          
          <div className="flex items-center gap-3">
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

      {/* lista de productos */}
      <div className="space-y-3">
        <h2 className="text-lg font-semibold" style={{ color: COLORS.dark }}>
          Productos en Supabase
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
                className="flex gap-4 rounded-xl p-4"
                style={{
                  backgroundColor: "rgba(255,255,255,0.55)",
                  border: "1px solid rgba(252, 231, 218, 0.5)",
                }}
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
                  <p className="text-xs text-slate-500">
                    ${p.price} · {p.category}
                  </p>
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
    </div>
  );
}
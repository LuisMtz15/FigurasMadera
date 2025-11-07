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

  // verificar sesión
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
    if (f) setPreview(URL.createObjectURL(f));
    else setPreview(null);
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
      {/* Header */}
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-3xl font-bold text-slate-900">
          Admin de productos
        </h1>
        <button
          onClick={handleLogout}
          className="text-xs text-slate-500 hover:text-slate-700"
        >
          Cerrar sesión
        </button>
      </div>

      {/* Formulario */}
      <form
        onSubmit={handleSubmit}
        className="bg-white/80 backdrop-blur border border-white/40 rounded-xl p-6 space-y-4 max-w-lg"
      >
        <div>
          <label className="text-sm font-medium text-slate-700">
            Nombre del producto
          </label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full border rounded-md px-3 py-2 text-sm"
            placeholder="Ej. Colibrí pastel"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-slate-700">
            Precio (MXN)
          </label>
          <input
            type="number"
            name="price"
            value={form.price}
            onChange={handleChange}
            className="w-full border rounded-md px-3 py-2 text-sm"
            placeholder="280"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-slate-700">
            Categoría
          </label>
          <input
            name="category"
            value={form.category}
            onChange={handleChange}
            className="w-full border rounded-md px-3 py-2 text-sm"
            placeholder="Animales, Flores, Hogar..."
          />
        </div>

        <div>
          <label className="text-sm font-medium text-slate-700">
            Descripción
          </label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            rows={3}
            className="w-full border rounded-md px-3 py-2 text-sm"
            placeholder="Figura de madera pintada a mano..."
          />
        </div>

        {/* Imagen */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700">
            Imagen (opcional)
          </label>
          <div className="flex items-center gap-3">
            <label className="inline-flex items-center gap-2 px-3 py-2 bg-white border border-slate-200 text-slate-700 text-sm rounded-md cursor-pointer hover:bg-slate-50">
              Seleccionar archivo
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
            </label>
            {file ? (
              <span className="text-xs text-slate-500">{file.name}</span>
            ) : preview ? (
              <span className="text-xs text-slate-500">Imagen actual</span>
            ) : (
              <span className="text-xs text-slate-400">
                No se ha seleccionado imagen
              </span>
            )}
          </div>
          {preview && (
            <img
              src={preview}
              alt="preview"
              className="h-20 w-20 object-cover rounded-md border"
            />
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-slate-900 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-slate-800 transition disabled:opacity-50"
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

      {/* Lista */}
      <div className="space-y-3">
        <h2 className="text-lg font-semibold text-slate-900">
          Productos en la base
        </h2>
        {dbProducts.length === 0 ? (
          <p className="text-sm text-slate-500">
            Aún no hay productos en Supabase.
          </p>
        ) : (
          <ul className="grid gap-3 md:grid-cols-2">
            {dbProducts.map((p) => (
              <li
                key={p.id}
                className="bg-white/80 border border-white/50 rounded-lg p-4 flex gap-4"
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
                  <p className="text-sm font-semibold text-slate-900 truncate">
                    {p.name}
                  </p>
                  <p className="text-xs text-slate-500">
                    ${p.price} · {p.category}
                  </p>
                  <div className="flex gap-2 mt-2">
                    <button
                      onClick={() => handleEdit(p)}
                      className="text-xs px-2 py-1 rounded bg-slate-900 text-white hover:bg-slate-800"
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
// src/pages/Admin.jsx
import { useEffect, useState } from "react";
import { getStoredProducts, saveProduct } from "../utils/storage.js";
import { SITE_CONFIG } from "../config/site.js";

export default function Admin() {
  const [ownerProducts, setOwnerProducts] = useState([]);
  const [form, setForm] = useState({
    name: "",
    price: "",
    category: "",
    description: "",
  });
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [inputPass, setInputPass] = useState("");

  // al cargar, revisamos si ya se autenticó en esta sesión
  useEffect(() => {
    const storedAuth = sessionStorage.getItem("figuras_admin_auth");
    if (storedAuth === "true") {
      setIsAuthorized(true);
      const stored = getStoredProducts();
      setOwnerProducts(stored);
    }
  }, []);

  // si ya está autorizado, cargamos los productos
  useEffect(() => {
    if (isAuthorized) {
      const stored = getStoredProducts();
      setOwnerProducts(stored);
    }
  }, [isAuthorized]);

  function handleLogin(e) {
    e.preventDefault();
    if (inputPass === SITE_CONFIG.adminPass) {
      setIsAuthorized(true);
      sessionStorage.setItem("figuras_admin_auth", "true");
    } else {
      alert("Contraseña incorrecta 🙃");
    }
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!form.name.trim()) return alert("Ponle nombre al producto");
    if (!form.price.trim()) return alert("Ponle precio");

    const id =
      form.name.toLowerCase().replace(/[^a-z0-9]+/g, "-") +
      "-" +
      Date.now().toString().slice(-4);

    const newProduct = {
      id,
      name: form.name.trim(),
      price: Number(form.price),
      category: form.category.trim() || "Sin categoría",
      description: form.description.trim() || "Figura de madera pintada a mano.",
    };

    saveProduct(newProduct);

    const updated = getStoredProducts();
    setOwnerProducts(updated);

    setForm({
      name: "",
      price: "",
      category: "",
      description: "",
    });
  }

  // si NO está autorizado, mostramos la pantallita de acceso
  if (!isAuthorized) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-linear-to-b from-pink-50 via-white to-indigo-50">
        <div className="bg-white/80 backdrop-blur border border-white/40 rounded-xl p-6 w-full max-w-sm space-y-4">
          <h1 className="text-xl font-bold text-slate-900">
            Acceso para la dueña
          </h1>
          <p className="text-sm text-slate-600">
            Ingresa la contraseña para administrar los productos.
          </p>
          <form onSubmit={handleLogin} className="space-y-3">
            <div>
              <label className="text-sm text-slate-700">Contraseña</label>
              <input
                type="password"
                value={inputPass}
                onChange={(e) => setInputPass(e.target.value)}
                className="w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-pink-100"
                placeholder="••••••"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-slate-900 text-white rounded-md py-2 text-sm font-medium hover:bg-slate-800 transition"
            >
              Entrar
            </button>
          </form>
          <p className="text-[10px] text-slate-400">
            *Este acceso es solo visual. No es seguridad de servidor.
          </p>
        </div>
      </div>
    );
  }

  // si SÍ está autorizado, mostramos el admin normal
  return (
    <div className="container-main py-10 space-y-8">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">
            Admin de productos
          </h1>
          <p className="text-slate-600">
            Aquí puedes agregar más figuras. Se guardan en este navegador.
          </p>
        </div>
        <button
          onClick={() => {
            sessionStorage.removeItem("figuras_admin_auth");
            setIsAuthorized(false);
          }}
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
        <div className="space-y-1">
          <label className="text-sm font-medium text-slate-700">
            Nombre del producto
          </label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-pink-100"
            placeholder="Ej. Ángel pastel"
          />
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium text-slate-700">
            Precio (MXN)
          </label>
          <input
            name="price"
            value={form.price}
            onChange={handleChange}
            type="number"
            className="w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-pink-100"
            placeholder="Ej. 280"
          />
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium text-slate-700">
            Categoría
          </label>
          <input
            name="category"
            value={form.category}
            onChange={handleChange}
            className="w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-pink-100"
            placeholder="Ej. Navidad, Animales, Hogar..."
          />
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium text-slate-700">
            Descripción
          </label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            rows={3}
            className="w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-pink-100"
            placeholder="Figura de madera pintada a mano..."
          />
        </div>

        <button
          type="submit"
          className="bg-slate-900 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-slate-800 transition"
        >
          Guardar producto
        </button>
      </form>

      {/* Lista de los que ha agregado */}
      <div className="space-y-3">
        <h2 className="text-lg font-semibold text-slate-900">
          Productos agregados por la dueña
        </h2>
        {ownerProducts.length === 0 ? (
          <p className="text-sm text-slate-500">
            Aún no hay productos agregados desde aquí.
          </p>
        ) : (
          <ul className="grid gap-3 md:grid-cols-2">
            {ownerProducts.map((p) => (
              <li
                key={p.id}
                className="bg-white/80 border border-white/50 rounded-lg p-4"
              >
                <p className="text-sm font-semibold text-slate-900">
                  {p.name} — ${p.price} MXN
                </p>
                <p className="text-xs text-slate-500">{p.category}</p>
                <p className="text-xs text-slate-400 mt-1">ID: {p.id}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
// src/pages/Admin.jsx
import { useState } from "react";
import ProductsAdmin from "../components/admin/ProductsAdmin.jsx";
import PackagesAdmin from "../components/admin/PackagesAdmin.jsx";
import logo from "../assets/Sin_Fondo.png";
import { supabase } from "../lib/supabaseClient";

const COLORS = {
  border: "rgba(252, 231, 218, 1)",
  dark: "#5A3B2E",
};

export default function Admin() {
  const [activeTab, setActiveTab] = useState("products");

  async function handleLogout() {
    await supabase.auth.signOut();
    sessionStorage.removeItem("figuras_admin_auth");
    window.location.href = "/login";
  }

  return (
    <div className="container-main py-10 space-y-8">
      {/* header */}
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold" style={{ color: COLORS.dark }}>
            Admin de Belleza en Madera
          </h1>
          <p className="text-slate-500 text-sm">
            Aquí puedes administrar productos y paquetes.
          </p>
        </div>
        <div className="flex items-center gap-4">
          <img src={logo} alt="Belleza en Madera" className="h-10 w-auto" />
          <button
            onClick={handleLogout}
            className="text-xs text-slate-500 hover:text-slate-700"
          >
            Cerrar sesión
          </button>
        </div>
      </div>

      {/* tabs */}
      <div className="flex gap-2">
        <button
          onClick={() => setActiveTab("products")}
          className={`px-4 py-2 rounded-full text-sm font-medium ${
            activeTab === "products" ? "bg-white shadow" : "hover:bg-white/40"
          }`}
          style={{
            border:
              activeTab === "products"
                ? `1px solid ${COLORS.border}`
                : "1px solid transparent",
          }}
        >
          Productos
        </button>
        <button
          onClick={() => setActiveTab("packages")}
          className={`px-4 py-2 rounded-full text-sm font-medium ${
            activeTab === "packages" ? "bg-white shadow" : "hover:bg-white/40"
          }`}
          style={{
            border:
              activeTab === "packages"
                ? `1px solid ${COLORS.border}`
                : "1px solid transparent",
          }}
        >
          Paquetes
        </button>
      </div>

      {activeTab === "products" ? <ProductsAdmin /> : <PackagesAdmin />}
    </div>
  );
}
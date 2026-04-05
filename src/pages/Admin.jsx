// src/pages/Admin.jsx
import { useState } from "react";
import ProductsAdmin from "../components/admin/ProductsAdmin.jsx";
import PackagesAdmin from "../components/admin/PackagesAdmin.jsx";
import { supabase } from "../lib/supabaseClient";
import { THEME } from "../config/theme.js";
import { LogOut, PackageOpen, Shapes } from "lucide-react";

export default function Admin() {
  const [activeTab, setActiveTab] = useState("products");

  async function handleLogout() {
    await supabase.auth.signOut();
    sessionStorage.removeItem("figuras_admin_auth");
    window.location.href = "/login";
  }

  return (
    <div className="container-main py-10 space-y-8">
      <div
        className="theme-panel rounded-[1.75rem] p-5 md:p-6"
        style={{
          backgroundColor: THEME.surfaceStrong,
          border: `1px solid ${THEME.borderStrong}`,
          boxShadow: `0 28px 60px -42px ${THEME.shadowStrong}`,
        }}
      >
        <div className="flex items-center justify-between gap-3 md:gap-5">
          <div className="min-w-0 space-y-3">
            <span
              className="inline-flex items-center rounded-full px-3 py-1 text-[11px] font-semibold tracking-[0.16em] uppercase"
              style={{
                backgroundColor: THEME.tintCoral,
                color: THEME.primary,
                border: `1px solid ${THEME.border}`,
              }}
            >
              Panel de administración
            </span>
            <div>
              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold leading-tight" style={{ color: THEME.textStrong }}>
                Belleza en Madera
              </h1>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="theme-btn-soft inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition self-center"
            aria-label="Cerrar sesión"
            title="Cerrar sesión"
          >
            <LogOut size={18} />
          </button>
        </div>

      </div>

      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setActiveTab("products")}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition"
          style={{
            backgroundColor:
              activeTab === "products" ? THEME.primary : THEME.surfaceStrong,
            color: activeTab === "products" ? THEME.textInverse : THEME.textStrong,
            boxShadow:
              activeTab === "products"
                ? `0 14px 28px -22px ${THEME.shadowStrong}`
                : "none",
            border:
              activeTab === "products"
                ? `1px solid ${THEME.primary}`
                : `1px solid ${THEME.border}`,
          }}
        >
          <Shapes size={16} />
          Productos
        </button>
        <button
          onClick={() => setActiveTab("packages")}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition"
          style={{
            backgroundColor:
              activeTab === "packages" ? THEME.primary : THEME.surfaceStrong,
            color: activeTab === "packages" ? THEME.textInverse : THEME.textStrong,
            boxShadow:
              activeTab === "packages"
                ? `0 14px 28px -22px ${THEME.shadowStrong}`
                : "none",
            border:
              activeTab === "packages"
                ? `1px solid ${THEME.primary}`
                : `1px solid ${THEME.border}`,
          }}
        >
          <PackageOpen size={16} />
          Paquetes
        </button>
      </div>

      {activeTab === "products" ? <ProductsAdmin /> : <PackagesAdmin />}
    </div>
  );
}

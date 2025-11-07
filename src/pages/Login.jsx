// src/pages/Login.jsx
import { useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { useNavigate, useLocation } from "react-router-dom";
import logo from "../assets/Logo_Maderitas.png";

const COLORS = {
  surface: "rgba(255,255,255,0.85)",
  border: "rgba(252, 231, 218, 1)", // #FCE7DA
  dark: "#5A3B2E",
  accent: "#E98A6B",
};

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from || "/admin";

  async function handleSubmit(e) {
    e.preventDefault();
    setErr("");
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    setLoading(false);

    if (error) {
      setErr(error.message);
      return;
    }

    sessionStorage.setItem("figuras_admin_auth", "true");
    navigate(from, { replace: true });
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-10">
      <div
        className="w-full max-w-sm rounded-2xl p-6 space-y-5 shadow-sm"
        style={{
          backgroundColor: COLORS.surface,
          border: `1px solid ${COLORS.border}`,
        }}
      >
        <div className="flex flex-col items-center gap-2">
          <img
            src={logo}
            alt="Belleza en Madera"
            className="h-10 w-auto object-contain"
          />
          <h1
            className="text-lg font-semibold"
            style={{ color: COLORS.dark }}
          >
            Inicia sesión
          </h1>
          <p className="text-xs text-slate-500 text-center">
            Área privada para agregar productos.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <label className="text-sm" style={{ color: COLORS.dark }}>
              Correo
            </label>
            <input
              type="email"
              className="w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#FCE7DA]"
              placeholder="duena@bellezaenmadera.mx"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm" style={{ color: COLORS.dark }}>
              Contraseña
            </label>
            <input
              type="password"
              className="w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#FCE7DA]"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {err && <p className="text-xs text-red-500">{err}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 rounded-md text-sm font-medium text-white transition"
            style={{ backgroundColor: COLORS.accent }}
          >
            {loading ? "Entrando..." : "Entrar"}
          </button>
        </form>

        <p className="text-[10px] text-slate-400 text-center">
          Si olvidaste tus datos, cámbialos desde Supabase → Auth → Users.
        </p>
      </div>
    </div>
  );
}
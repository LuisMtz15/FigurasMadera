// src/pages/Login.jsx
import { useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { useNavigate, useLocation } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // si venía de /admin lo mandamos de regreso ahí
  const from = location.state?.from || "/admin";

  async function handleSubmit(e) {
    e.preventDefault();
    setErr("");
    setLoading(true);
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    setLoading(false);

    if (error) {
      setErr(error.message);
      return;
    }

    // guardamos una marquita para no volver a pedir
    sessionStorage.setItem("figuras_admin_auth", "true");

    navigate(from, { replace: true });
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-pink-50 via-white to-indigo-50">
      <div className="bg-white/80 backdrop-blur border border-white/40 rounded-xl p-6 w-full max-w-sm space-y-4">
        <h1 className="text-xl font-bold text-slate-900">Iniciar sesión</h1>
        <p className="text-sm text-slate-600">
          Solo personal autorizado.
        </p>
        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="text-sm text-slate-700">Correo</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-pink-100"
              placeholder="duena@figuras.com"
              required
            />
          </div>
          <div>
            <label className="text-sm text-slate-700">Contraseña</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-pink-100"
              required
            />
          </div>
          {err && <p className="text-xs text-red-500">{err}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-slate-900 text-white rounded-md py-2 text-sm font-medium hover:bg-slate-800 disabled:opacity-50"
          >
            {loading ? "Entrando..." : "Entrar"}
          </button>
        </form>
      </div>
    </div>
  );
}
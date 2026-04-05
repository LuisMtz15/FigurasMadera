// src/pages/Login.jsx
import { useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { useNavigate, useLocation } from "react-router-dom";
import { THEME } from "../config/theme.js";
import { Eye, EyeOff } from "lucide-react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
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
      <div className="relative w-full max-w-md">
        <div
          className="absolute inset-3 rounded-[2.25rem]"
          style={{
            background: `linear-gradient(180deg, ${THEME.tintCoral} 0%, ${THEME.backgroundAlt} 100%)`,
            filter: "blur(0px)",
            opacity: 0.95,
          }}
        />

        <div
          className="relative theme-panel w-full rounded-[2rem] p-6 md:p-8 space-y-6"
          style={{
            backgroundColor: THEME.surfaceStrong,
            boxShadow: `0 36px 80px -42px ${THEME.shadowStrong}`,
            border: `1px solid ${THEME.borderStrong}`,
          }}
        >
          <div className="flex flex-col items-center gap-3 text-center">
            <span
              className="inline-flex items-center rounded-full px-3 py-1 text-[11px] font-semibold tracking-[0.16em] uppercase"
              style={{
                backgroundColor: THEME.tintCoral,
                color: THEME.primary,
                border: `1px solid ${THEME.border}`,
              }}
            >
              Acceso privado
            </span>
            <div
              className="flex h-22 w-22 items-center justify-center rounded-[1.75rem] p-4 md:h-24 md:w-24"
              style={{
                background: `linear-gradient(180deg, ${THEME.surfaceSoft} 0%, ${THEME.surfaceStrong} 100%)`,
                boxShadow: `0 22px 36px -28px ${THEME.shadowStrong}`,
                border: `1px solid ${THEME.borderStrong}`,
              }}
            >
              <img
                src="/Logo_completo_minimalista.png"
                alt="Belleza en Madera"
                className="h-14 md:h-16 w-auto object-contain"
              />
            </div>
            <div className="space-y-1">
              <h2
                className="text-xl md:text-2xl font-semibold"
                style={{ color: THEME.textStrong }}
              >
                Inicia sesión
              </h2>
              <p className="text-sm leading-relaxed" style={{ color: THEME.text }}>
                Accede al panel para administrar tu catálogo con tranquilidad.
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-sm font-medium" style={{ color: THEME.textStrong }}>
                Correo
              </label>
              <input
                type="email"
                className="theme-input text-sm"
                placeholder="dueña@bellezaenmadera.mx"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-medium" style={{ color: THEME.textStrong }}>
                Contraseña
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  className="theme-input pr-11 text-sm"
                  placeholder="Tu contraseña"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((value) => !value)}
                  className="absolute inset-y-0 right-0 flex w-11 items-center justify-center rounded-r-md transition"
                  style={{ color: THEME.textSoft }}
                  aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {err && (
              <div
                className="rounded-xl px-3 py-2 text-xs"
                style={{
                  backgroundColor: THEME.tintCoral,
                  color: THEME.danger,
                  border: `1px solid ${THEME.border}`,
                }}
              >
                {err}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="theme-btn-primary w-full py-3 mt-2 rounded-lg text-sm font-medium transition"
            >
              {loading ? "Entrando..." : "Acceder"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

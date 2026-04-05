// src/components/Footer.jsx
import { SITE_CONFIG } from "../config/site.js";
import { Link } from "react-router-dom";
import { THEME, alpha } from "../config/theme.js";

export default function Footer() {
  return (
    <footer
      className="mt-10"
      style={{
        backgroundColor: THEME.surface,
        borderTop: `1px solid ${alpha(THEME.primary, 0.12)}`,
      }}
    >
      <div className="max-w-6xl mx-auto px-4 py-8 md:py-6 flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-col items-center gap-3 text-center md:flex-row md:text-left">
          <img
            src="/Logo_completo_minimalista.png"
            alt="Belleza en Madera"
            className="h-12 w-auto object-contain"
          />
          <div>
            <p className="text-sm font-semibold" style={{ color: THEME.textStrong }}>
              Belleza en Madera
            </p>
            <p className="text-xs" style={{ color: THEME.textSoft }}>
              Figuras de madera pintadas a mano.
            </p>
          </div>
        </div>

        <div
          className="grid grid-cols-2 gap-x-6 gap-y-3 text-sm text-center md:flex md:flex-wrap md:justify-center"
          style={{ color: THEME.text }}
        >
          <Link to="/" className="theme-link">
            Inicio
          </Link>
          <Link to="/productos" className="theme-link">
            Productos
          </Link>
          <Link to="/quienes-somos" className="theme-link">
            Quiénes somos
          </Link>
          <Link to="/contacto" className="theme-link">
            Contáctanos
          </Link>
        </div>

        <div className="flex flex-col items-center md:items-end gap-2">
          <p className="text-[10px]" style={{ color: alpha(THEME.primary, 0.5) }}>
            © {new Date().getFullYear()} Belleza en Madera.
          </p>
        </div>
      </div>
    </footer>
  );
}

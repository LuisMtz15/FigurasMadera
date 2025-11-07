// src/components/Footer.jsx
import { SITE_CONFIG } from "../config/site.js";
import { Link } from "react-router-dom";
import logo from "../assets/Logo_Maderitas.png";

const COLORS = {
  bg: "#FEFAF7",
  dark: "#5A3B2E",
  soft: "#FCE7DA",
};

export default function Footer() {
  return (
    <footer
      className="mt-10"
      style={{
        backgroundColor: COLORS.bg,
        borderTop: `1px solid rgba(252, 231, 218, 0.5)`,
      }}
    >
      <div className="max-w-6xl mx-auto px-4 py-6 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        {/* izquierda: logo + texto */}
        <div className="flex items-center gap-3">
          <img
            src={logo}
            alt="Belleza en Madera"
            className="h-9 w-auto object-contain"
          />
          <div>
            <p className="text-sm font-semibold" style={{ color: COLORS.dark }}>
              Belleza en Madera
            </p>
            <p className="text-xs text-slate-500">
              Figuras de madera pintadas a mano.
            </p>
          </div>
        </div>

        {/* centro: links */}
        <div className="flex gap-4 text-sm text-slate-600 flex-wrap">
          <Link to="/" className="hover:text-[#E98A6B] transition">
            Inicio
          </Link>
          <Link to="/productos" className="hover:text-[#E98A6B] transition">
            Productos
          </Link>
          <Link to="/quienes-somos" className="hover:text-[#E98A6B] transition">
            Quiénes somos
          </Link>
          <Link to="/contacto" className="hover:text-[#E98A6B] transition">
            Contáctanos
          </Link>
        </div>

        {/* derecha: whatsapp */}
        <div className="flex flex-col items-start md:items-end gap-2">
          <a
            href={`https://wa.me/${SITE_CONFIG.whatsappNumber}`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-md text-xs font-medium text-white"
            style={{ backgroundColor: "#E98A6B" }}
          >
            WhatsApp
            <span aria-hidden>→</span>
          </a>
          <p className="text-[10px] text-slate-400">
            © {new Date().getFullYear()} Belleza en Madera.
          </p>
        </div>
      </div>
    </footer>
  );
}
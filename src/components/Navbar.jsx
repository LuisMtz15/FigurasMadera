// src/components/Navbar.jsx
import { Link, NavLink } from "react-router-dom";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { THEME } from "../config/theme.js";

const links = [
  { to: "/", label: "Inicio" },
  { to: "/productos", label: "Productos" },
  { to: "/quienes-somos", label: "Quiénes somos" },
  { to: "/contacto", label: "Contáctanos" },
];

const base =
  "px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-150";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header
      className="backdrop-blur sticky top-0 z-50"
      style={{
        backgroundColor: THEME.primary,
        borderBottom: `1px solid ${THEME.primaryHover}`,
      }}
    >
      <div className="max-w-6xl mx-auto px-4 flex h-18 md:h-20 items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-3">
          <img src="/Logo_completo.png" alt="Belleza en Madera" className="h-14 md:h-16 w-auto" />
        </Link>

        <nav className="hidden md:flex gap-1">
          {links.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                isActive
                  ? `${base}`
                  : `${base}`
              }
              style={({ isActive }) => ({
                backgroundColor: isActive ? "rgba(255, 255, 255, 0.14)" : "transparent",
                color: THEME.textInverse,
              })}
              onMouseEnter={(e) => {
                if (!e.currentTarget.classList.contains("active")) {
                  e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.1)";
                }
              }}
              onMouseLeave={(e) => {
                const isActive = e.currentTarget
                  .getAttribute("aria-current") === "page";
                e.currentTarget.style.backgroundColor = isActive
                  ? "rgba(255, 255, 255, 0.14)"
                  : "transparent";
              }}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* menú mobile */}
        <button
          onClick={() => setOpen((p) => !p)}
          className="md:hidden inline-flex items-center justify-center rounded-lg p-2"
          style={{ color: THEME.textInverse }}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {open && (
        <div
          className="md:hidden backdrop-blur"
          style={{
            borderTop: `1px solid rgba(255, 255, 255, 0.12)`,
            backgroundColor: THEME.primary,
          }}
        >
          <nav className="px-4 py-3 flex flex-col gap-2">
            {links.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  isActive
                    ? "px-3 py-2 rounded-lg text-sm font-medium"
                    : "px-3 py-2 rounded-lg text-sm font-medium"
                }
                style={({ isActive }) => ({
                  backgroundColor: isActive ? "rgba(255, 255, 255, 0.14)" : "transparent",
                  color: THEME.textInverse,
                })}
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}

// src/components/Navbar.jsx
import { Link, NavLink } from "react-router-dom";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import logo from "../assets/Logo_Maderitas.png";

const COLORS = {
  dark: "#5A3B2E",   // texto madera
  accent: "#E98A6B", // activo
  hover: "#FCE7DA",  // hover clarito
};

const links = [
  { to: "/", label: "Inicio" },
  { to: "/productos", label: "Productos" },
  { to: "/quienes-somos", label: "Quiénes somos" },
  { to: "/contacto", label: "Contáctanos" },
];

const base =
  "px-3 py-2 rounded-md text-sm font-medium transition-colors duration-150";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="bg-white/80 backdrop-blur border-b sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 flex h-14 items-center justify-between gap-4">
        {/* logo */}
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="Belleza en Madera" className="h-8 w-auto" />
          <span
            className="text-sm font-semibold tracking-tight"
            style={{ color: COLORS.dark }}
          >
            Belleza en Madera
          </span>
        </Link>

        {/* desktop */}
        <nav className="hidden md:flex gap-1">
          {links.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                isActive
                  ? `${base} text-white`
                  : `${base}`
              }
              style={({ isActive }) => ({
                backgroundColor: isActive ? COLORS.accent : "transparent",
                color: isActive ? "#fff" : COLORS.dark,
              })}
              // 👇 este onMouseEnter/onMouseLeave asegura hover cálido
              onMouseEnter={(e) => {
                if (!e.currentTarget.classList.contains("active")) {
                  e.currentTarget.style.backgroundColor = COLORS.hover;
                }
              }}
              onMouseLeave={(e) => {
                const isActive = e.currentTarget
                  .getAttribute("aria-current") === "page";
                e.currentTarget.style.backgroundColor = isActive
                  ? COLORS.accent
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
          className="md:hidden inline-flex items-center justify-center rounded-md p-2"
          style={{ color: COLORS.dark }}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t bg-white/90 backdrop-blur">
          <nav className="px-4 py-3 flex flex-col gap-2">
            {links.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  isActive
                    ? "px-3 py-2 rounded-md text-sm font-medium text-white"
                    : "px-3 py-2 rounded-md text-sm font-medium"
                }
                style={({ isActive }) => ({
                  backgroundColor: isActive ? COLORS.accent : "transparent",
                  color: isActive ? "#fff" : COLORS.dark,
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
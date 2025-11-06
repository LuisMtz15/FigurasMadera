// src/components/Navbar.jsx
import { Link, NavLink } from "react-router-dom";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const navLinkBase =
  "px-3 py-2 rounded-md text-sm font-medium transition-all";

const links = [
  { to: "/", label: "Inicio" },
  { to: "/productos", label: "Productos" },
  { to: "/quienes-somos", label: "Quiénes somos" },
  { to: "/contacto", label: "Contáctanos" },
  // { to: "/admin", label: "Admin" }, // la puedes mostrar solo si quieres
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="bg-white/70 backdrop-blur border-b sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 flex h-14 items-center justify-between gap-4">
        {/* Logo */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 bg-pink-100 text-slate-900 px-3 py-1 rounded-full text-sm font-semibold shadow-sm"
        >
          🪵 Figuras de Madera
        </Link>

        {/* Links desktop */}
        <nav className="hidden md:flex gap-1">
          {links.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                isActive
                  ? `${navLinkBase} bg-slate-900 text-white shadow-sm`
                  : `${navLinkBase} text-slate-700 hover:bg-slate-100`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* Botón hamburguesa */}
        <button
          onClick={() => setOpen((prev) => !prev)}
          className="md:hidden inline-flex items-center justify-center rounded-md p-2 text-slate-700 hover:bg-slate-100"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Menú móvil */}
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
                    ? "bg-slate-900 text-white px-3 py-2 rounded-md text-sm"
                    : "text-slate-700 px-3 py-2 rounded-md text-sm hover:bg-slate-100"
                }
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
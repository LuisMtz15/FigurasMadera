// src/components/Footer.jsx
import { SITE_CONFIG } from "../config/site.js";

export default function Footer() {
  return (
    <footer className="border-t bg-white mt-6">
      <div className="max-w-6xl mx-auto px-4 py-6 text-sm text-slate-500 flex flex-col md:flex-row md:items-center md:justify-between gap-2">
        <p>
          © {new Date().getFullYear()} {SITE_CONFIG.businessName}. Hecho con 💛.
        </p>
        <a
          href={`https://wa.me/${SITE_CONFIG.whatsappNumber}`}
          target="_blank"
          rel="noreferrer"
          className="text-slate-700 hover:text-slate-900"
        >
          WhatsApp
        </a>
      </div>
    </footer>
  );
}
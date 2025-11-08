// src/pages/ContactSuccess.jsx
export default function ContactSuccess() {
  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{
        background: "linear-gradient(180deg, #FDF5F0 0%, #F9E0D1 100%)",
      }}
    >
      <div className="bg-white/80 rounded-2xl p-10 text-center border border-[#FCE7DA] shadow-sm max-w-md">
        <h1 className="text-2xl font-bold text-[#5A3B2E] mb-3">
          ¡Gracias por tu mensaje! 💛
        </h1>
        <p className="text-slate-600 mb-6">
          Lo recibimos y te vamos a responder lo antes posible.
        </p>
        <a
          href="/"
          className="px-5 py-2 rounded-md text-sm font-medium text-white"
          style={{ backgroundColor: "#E98A6B" }}
        >
          Volver al inicio
        </a>
      </div>
    </div>
  );
}
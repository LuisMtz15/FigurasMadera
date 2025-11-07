// src/pages/Products.jsx
import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard.jsx";
import { fetchProducts } from "../lib/productsApi.js";
import { SITE_CONFIG } from "../config/site.js";

export default function Products() {
  const [allProducts, setAllProducts] = useState([]);

  useEffect(() => {
    (async () => {
      const data = await fetchProducts();
      setAllProducts(data);
    })();
  }, []);

  return (
    <div className="container-main py-12 space-y-8">
      <div className="flex flex-col gap-2 text-center">
        <h1 className="text-3xl font-bold" style={{ color: "#5A3B2E" }}>
          Nuestros Productos
        </h1>
        <p className="text-slate-600 max-w-2xl mx-auto">
          Cada figura está hecha a mano con amor y colores pastel únicos.  
          Si alguna te gusta, puedes pedirla directamente por WhatsApp.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {allProducts.length === 0 ? (
          <div className="col-span-full text-center text-slate-500">
            Aún no hay productos cargados ✨
          </div>
        ) : (
          allProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        )}
      </div>
    </div>
  );
}
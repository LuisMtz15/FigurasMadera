// src/pages/Products.jsx
import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard.jsx";
import { fetchProducts } from "../lib/productsApi.js";

export default function Products() {
  const [allProducts, setAllProducts] = useState([]);

  useEffect(() => {
    (async () => {
      const data = await fetchProducts();
      setAllProducts(data);
    })();
  }, []);

  return (
    <div className="container-main py-10 space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">
          Productos
        </h1>
        <p className="text-slate-600 max-w-2xl">
          Todas las figuras son de madera pintadas a mano. Si te gusta una,
          dale al botón de WhatsApp.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {allProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}

        {allProducts.length === 0 && (
          <p className="text-slate-500 text-sm">
            No hay productos todavía. Agrega uno en /admin ✨
          </p>
        )}
      </div>
    </div>
  );
}
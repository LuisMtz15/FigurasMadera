// src/pages/Products.jsx
import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard.jsx";
import { baseProducts } from "../data/products.js";
import { getStoredProducts } from "../utils/storage.js";

export default function Products() {
  const [allProducts, setAllProducts] = useState(baseProducts);

  useEffect(() => {
    const ownerOnes = getStoredProducts();
    setAllProducts([...baseProducts, ...ownerOnes]);
  }, []);

  return (
    <div className="container-main py-10 space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">
          Productos
        </h1>
        <p className="text-slate-600 max-w-2xl">
          Todas las figuras son de madera pintadas a mano. Si te gusta una,
          dale al botón de WhatsApp y se manda el mensaje con el nombre.
        </p>
      </div>

      {/* Grid responsivo */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {allProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}

        {allProducts.length === 0 && (
          <p className="text-slate-500 text-sm">
            Por el momento no hay productos. Vuelve pronto ✨
          </p>
        )}
      </div>
    </div>
  );
}
// src/utils/storage.js

const KEY = "figuras_madera_products";

export function getStoredProducts() {
  if (typeof window === "undefined") return [];
  const raw = localStorage.getItem(KEY);
  if (!raw) return [];
  try {
    return JSON.parse(raw);
  } catch (err) {
    console.error("Error parsing stored products", err);
    return [];
  }
}

export function saveProduct(product) {
  const current = getStoredProducts();
  const updated = [...current, product];
  localStorage.setItem(KEY, JSON.stringify(updated));
}

export function overwriteProducts(productsArray) {
  localStorage.setItem(KEY, JSON.stringify(productsArray));
}
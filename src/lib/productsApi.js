// src/lib/productsApi.js
import { supabase } from "./supabaseClient";

// listar
export async function fetchProducts() {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("fetchProducts error:", error);
    return [];
  }
  return data;
}

// subir imagen y devolver url + path
export async function uploadProductImage(file) {
  if (!file) return { publicUrl: null, path: null };

  const ext = file.name.split(".").pop();
  const fileName = `${Date.now()}.${ext}`;
  const filePath = fileName;

  const { error: uploadError } = await supabase.storage
    .from("product-images")
    .upload(filePath, file, {
      cacheControl: "3600",
      upsert: false,
    });

  if (uploadError) {
    console.error("uploadProductImage error:", uploadError);
    throw uploadError;
  }

  const { data } = supabase.storage.from("product-images").getPublicUrl(filePath);
  return { publicUrl: data.publicUrl, path: filePath };
}

// insertar
export async function addProductToDb(product) {
  const { data, error } = await supabase
    .from("products")
    .insert([product])
    .select()
    .single();

  if (error) {
    console.error("Supabase insert error:", error);
    throw new Error(error.message || "Error al insertar en Supabase");
  }
  return data;
}

// actualizar
export async function updateProductInDb(id, product) {
  const { data, error } = await supabase
    .from("products")
    .update(product)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error("Supabase update error:", error);
    throw new Error(error.message || "Error al actualizar producto");
  }
  return data;
}

// borrar producto
export async function deleteProductFromDb(id) {
  const { error } = await supabase.from("products").delete().eq("id", id);
  if (error) {
    console.error("Supabase delete error:", error);
    throw new Error(error.message || "Error al borrar producto");
  }
}

// borrar imagen del storage
export async function deleteImageFromStorage(path) {
  if (!path) return;
  const { error } = await supabase.storage
    .from("product-images")
    .remove([path]);
  if (error) {
    console.error("deleteImageFromStorage error:", error);
    // no lanzamos error para no romper el flujo
  }
}
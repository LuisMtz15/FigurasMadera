// src/lib/packagesApi.js
import { supabase } from "./supabaseClient";

// listar paquetes
export async function fetchPackages() {
  const { data, error } = await supabase
    .from("packages")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("fetchPackages error:", error);
    return [];
  }
  return data;
}

// subir imagen de paquete (usamos mismo bucket)
export async function uploadPackageImage(file) {
  if (!file) return { publicUrl: null, path: null };

  const ext = file.name.split(".").pop();
  const fileName = `pkg-${Date.now()}.${ext}`;
  const filePath = fileName;

  const { error: uploadError } = await supabase.storage
    .from("product-images")
    .upload(filePath, file, {
      cacheControl: "3600",
      upsert: false,
    });

  if (uploadError) {
    console.error("uploadPackageImage error:", uploadError);
    throw uploadError;
  }

  const { data } = supabase.storage
    .from("product-images")
    .getPublicUrl(filePath);

  return { publicUrl: data.publicUrl, path: filePath };
}

// insertar
export async function addPackageToDb(pkg) {
  const { data, error } = await supabase
    .from("packages")
    .insert([pkg])
    .select()
    .single();

  if (error) {
    console.error("Supabase insert package error:", error);
    throw new Error(error.message || "Error al insertar paquete");
  }
  return data;
}

// actualizar
export async function updatePackageInDb(id, pkg) {
  const { data, error } = await supabase
    .from("packages")
    .update(pkg)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error("Supabase update package error:", error);
    throw new Error(error.message || "Error al actualizar paquete");
  }
  return data;
}

// borrar
export async function deletePackageFromDb(id) {
  const { error } = await supabase.from("packages").delete().eq("id", id);
  if (error) {
    console.error("Supabase delete package error:", error);
    throw new Error(error.message || "Error al borrar paquete");
  }
}

// borrar imagen
export async function deletePackageImageFromStorage(path) {
  if (!path) return;
  const { error } = await supabase.storage
    .from("product-images")
    .remove([path]);
  if (error) {
    console.error("deletePackageImageFromStorage error:", error);
  }
}
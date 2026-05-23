import { apiRequest } from "./api";
import type { Category, Product } from "@/types";

interface ApiResponse<T> {
  message: string;
  data: T;
  length?: number;
}

export async function getProducts(): Promise<Product[]> {
  const res = await apiRequest<ApiResponse<any[]>>("GET", "/items");
  return res.data.map(item => ({
    ...item,
    id: item._id
  }));
}

export async function getCategories(): Promise<Category[]> {
  // Use real categories from backend
  const res = await apiRequest<ApiResponse<any[]>>("GET", "/categories");
  return res.data.map(cat => ({
    ...cat,
    id: cat._id
  }));
}

export async function createProduct(p: Omit<Product, "id">): Promise<Product> {
  const res = await apiRequest<ApiResponse<any>>("POST", "/items", p);
  return {
    ...res.data,
    id: res.data._id
  };
}

export async function updateProduct(id: string, patch: Partial<Product>): Promise<Product> {
  const res = await apiRequest<ApiResponse<any>>("PATCH", `/items/${id}`, patch);
  return {
    ...res.data,
    id: res.data._id
  };
}

export async function deleteProduct(id: string): Promise<{ id: string }> {
  await apiRequest<ApiResponse<any>>("DELETE", `/items/${id}`);
  return { id };
}

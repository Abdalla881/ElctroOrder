import { apiRequest } from "./api";
import type { Order, OrderStatus } from "@/types";

interface ApiResponse<T> {
  message: string;
  data: T;
  length?: number;
}

export async function createOrder(
  o: Omit<Order, "id" | "createdAt" | "status">
): Promise<Order> {
  const res = await apiRequest<ApiResponse<any>>("POST", "/orders", o);
  return {
    ...res.data,
    id: res.data._id
  };
}

export async function getOrders(): Promise<Order[]> {
  const res = await apiRequest<ApiResponse<any[]>>("GET", "/orders");
  return res.data.map(order => ({
    ...order,
    id: order._id
  }));
}

export async function getOrder(id: string): Promise<Order | undefined> {
  const res = await apiRequest<ApiResponse<any>>("GET", `/orders/${id}`);
  return {
    ...res.data,
    id: res.data._id
  };
}

export async function updateOrderStatus(id: string, status: OrderStatus): Promise<Order | undefined> {
  const res = await apiRequest<ApiResponse<any>>("PATCH", `/orders/${id}`, { status });
  return {
    ...res.data,
    id: res.data._id
  };
}

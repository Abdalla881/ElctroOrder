export type Role = "customer" | "admin";

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface Product {
  id: string;
  name: string;
  nameAr?: string;
  description: string;
  descriptionAr?: string;
  price: number;
  image: string;
  category: string;
  rating: number;
  popular?: boolean;
}

export interface Category {
  id: string;
  name: string;
  nameAr: string;
  emoji: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export type OrderStatus = "preparing" | "onway" | "delivered";

export interface Order {
  id: string;
  userId: string;
  customerName: string;
  items: CartItem[];
  total: number;
  address: string;
  phone: string;
  notes?: string;
  paymentMethod: "cash" | "card";
  status: OrderStatus;
  createdAt: string;
}

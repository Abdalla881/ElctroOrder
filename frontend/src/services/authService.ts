import { apiRequest, setToken } from "./api";
import type { AuthResponse, Role, User } from "@/types";

const USER_KEY = "electrorder_user";

function persistUser(user: User) {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
}

export function getStoredUser(): User | null {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem(USER_KEY);
  if (!raw) return null;
  try { return JSON.parse(raw) as User; } catch { return null; }
}

export async function login(email: string, password: string): Promise<AuthResponse> {
  const res = await apiRequest<AuthResponse>("POST", "/auth/login", {
    email,
    password,
  });
  setToken(res.token);
  persistUser(res.user);
  return res;
}

export async function register(
  name: string,
  email: string,
  password: string,
  role: Role = "customer"
): Promise<AuthResponse> {
  // Map "customer" role to "user" for backend if needed, or just let default handle it.
  // Backend SignupUserDto only takes name, email, password.
  const res = await apiRequest<AuthResponse>("POST", "/auth/signup", {
    name,
    email,
    password,
  });
  setToken(res.token);
  persistUser(res.user);
  return res;
}

export function logout() {
  setToken(null);
  localStorage.removeItem(USER_KEY);
}

export async function forgetPassword(email: string): Promise<{ message: string }> {
  return apiRequest<{ message: string }>("POST", "/auth/forget-password", { email });
}

export async function verifyResetCode(
  email: string,
  resetCode: string
): Promise<{ message: string }> {
  return apiRequest<{ message: string }>("POST", "/auth/verify-reset-code", {
    email,
    resetCode,
  });
}

export async function resetPassword(
  email: string,
  newPassword: string
): Promise<{ message: string }> {
  return apiRequest<{ message: string }>("PUT", "/auth/reset-password", {
    email,
    newPassword,
  });
}

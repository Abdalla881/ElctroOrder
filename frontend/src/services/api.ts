/**
 * Centralized API client.
 *
 * In this prototype every method returns mocked JSON with a simulated delay.
 * To replace with a real backend, swap `mockRequest` for `fetch(apiUrl + path, ...)`.
 *
 * import.meta.env.VITE_API_BASE_URL can hold the future backend base URL.
 */
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:3000/api/v1";

export async function apiRequest<T>(
  method: string,
  path: string,
  data?: any
): Promise<T> {
  const token = getToken();
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    method,
    headers,
    body: data ? JSON.stringify(data) : undefined,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || "Something went wrong");
  }

  return response.json();
}

/**
 * @deprecated Use apiRequest instead
 */
export async function mockRequest<T>(
  _method: string,
  _path: string,
  data: T,
  ms = 500
): Promise<T> {
  const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));
  await delay(ms);
  return data;
}

export function getToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("electrorder_token");
}

export function setToken(token: string | null) {
  if (typeof window === "undefined") return;
  if (token) localStorage.setItem("electrorder_token", token);
  else localStorage.removeItem("electrorder_token");
}

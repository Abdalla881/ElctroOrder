import { useEffect, useState, useCallback } from "react";
import type { User } from "@/types";
import { getStoredUser, logout as logoutService } from "@/services/authService";

const listeners = new Set<() => void>();

export function emitAuthChange() {
  listeners.forEach((l) => l());
}

if (typeof window !== "undefined") {
  window.addEventListener("storage", (e) => {
    if (e.key === "electrorder_user") emitAuthChange();
  });
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);

  const sync = useCallback(() => setUser(getStoredUser()), []);

  useEffect(() => {
    sync();
    listeners.add(sync);
    return () => { listeners.delete(sync); };
  }, [sync]);

  return {
    user,
    isAuthenticated: !!user,
    isAdmin: user?.role === "admin",
    logout: () => { logoutService(); emitAuthChange(); },
  };
}

"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from "react";
import Cookies from "js-cookie";
import { apiClient } from "@/lib/apiClient";

// ─── Types ───────────────────────────────────────────

type User = {
  id: string;
  email: string;
  name: string;
  role: "CUSTOMER" | "ADMIN";
};

type AuthResponse = {
  accessToken: string;
  user: User;
};

type AuthContextType = {
  user: User | null;
  isLoggedIn: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
};

// ─── Context ─────────────────────────────────────────

const AuthContext = createContext<AuthContextType | null>(null);

// ─── Provider ────────────────────────────────────────

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // On mount, rehydrate user from cookie if token exists
  useEffect(() => {
    const token = Cookies.get("accessToken");
    const stored = Cookies.get("user");

    if (!token || !stored) {
        setIsLoading(false);
        return;
    }

    try {
        const parsed = JSON.parse(stored);
        setUser(parsed);
    } catch {
        Cookies.remove("accessToken");
        Cookies.remove("user");
    } finally {
        setIsLoading(false);
    }
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    const data = await apiClient<AuthResponse>("/auth/login", {
      method: "POST",
      body: { email, password },
    });

    Cookies.set("accessToken", data.accessToken, { expires: 7, sameSite: "strict" });
    Cookies.set("user", JSON.stringify(data.user), { expires: 7, sameSite: "strict" });
    setUser(data.user);
  }, []);

  const register = useCallback(async (name: string, email: string, password: string) => {
    const data = await apiClient<AuthResponse>("/auth/register", {
      method: "POST",
      body: { name, email, password },
    });

    Cookies.set("accessToken", data.accessToken, { expires: 7, sameSite: "strict" });
    Cookies.set("user", JSON.stringify(data.user), { expires: 7, sameSite: "strict" });
    setUser(data.user);
  }, []);

  const logout = useCallback(() => {
    Cookies.remove("accessToken");
    Cookies.remove("user");
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn: !!user,
        isLoading,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// ─── Hook ────────────────────────────────────────────

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
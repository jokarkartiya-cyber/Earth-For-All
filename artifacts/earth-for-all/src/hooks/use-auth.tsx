import { createContext, useContext, useState, useCallback, type ReactNode } from "react";

export interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

function getStoredUser(): User | null {
  try {
    const raw = localStorage.getItem("earth_user");
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function getStoredUsers(): Record<string, { name: string; password: string }> {
  try {
    const raw = localStorage.getItem("earth_users");
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(getStoredUser);

  const login = useCallback(async (email: string, password: string) => {
    const users = getStoredUsers();
    const found = users[email];
    if (!found || found.password !== password) {
      throw new Error("Invalid email or password");
    }
    const u: User = { id: email, name: found.name, email };
    localStorage.setItem("earth_user", JSON.stringify(u));
    setUser(u);
  }, []);

  const register = useCallback(async (name: string, email: string, password: string) => {
    const users = getStoredUsers();
    if (users[email]) {
      throw new Error("Email already registered");
    }
    users[email] = { name, password };
    localStorage.setItem("earth_users", JSON.stringify(users));
    const u: User = { id: email, name, email };
    localStorage.setItem("earth_user", JSON.stringify(u));
    setUser(u);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem("earth_user");
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}

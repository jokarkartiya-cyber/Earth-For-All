import { createContext, useContext, useState, useCallback, type ReactNode } from "react";

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  provider?: "email" | "google" | "github";
  joinedAt?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  loginWithGitHub: () => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  forgotPassword: (email: string) => Promise<void>;
  resetPassword: (email: string, newPassword: string) => void;
  updateProfile: (data: { name?: string; email?: string }) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

function getStoredUser(): User | null {
  try {
    const raw = localStorage.getItem("earth_user");
    return raw ? JSON.parse(raw) : null;
  } catch { return null; }
}

function getStoredUsers(): Record<string, { name: string; password: string; provider?: string }> {
  try {
    const raw = localStorage.getItem("earth_users");
    return raw ? JSON.parse(raw) : {};
  } catch { return {}; }
}

function saveUser(u: User) {
  localStorage.setItem("earth_user", JSON.stringify(u));
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(getStoredUser);

  const login = useCallback(async (email: string, password: string) => {
    const users = getStoredUsers();
    const found = users[email];
    if (!found || found.password !== password) throw new Error("Invalid email or password");
    const u: User = { id: email, name: found.name, email, provider: "email" };
    saveUser(u); setUser(u);
  }, []);

  const loginWithGoogle = useCallback(async () => {
    const email = `user_${Date.now()}@gmail.com`;
    const name = "Google User";
    const users = getStoredUsers();
    if (!users[email]) users[email] = { name, password: "", provider: "google" };
    localStorage.setItem("earth_users", JSON.stringify(users));
    const u: User = { id: email, name, email, provider: "google", joinedAt: new Date().toISOString() };
    saveUser(u); setUser(u);
  }, []);

  const loginWithGitHub = useCallback(async () => {
    const email = `user_${Date.now()}@github.com`;
    const name = "GitHub User";
    const users = getStoredUsers();
    if (!users[email]) users[email] = { name, password: "", provider: "github" };
    localStorage.setItem("earth_users", JSON.stringify(users));
    const u: User = { id: email, name, email, provider: "github", joinedAt: new Date().toISOString() };
    saveUser(u); setUser(u);
  }, []);

  const register = useCallback(async (name: string, email: string, password: string) => {
    const users = getStoredUsers();
    if (users[email]) throw new Error("Email already registered");
    users[email] = { name, password, provider: "email" };
    localStorage.setItem("earth_users", JSON.stringify(users));
    const u: User = { id: email, name, email, provider: "email", joinedAt: new Date().toISOString() };
    saveUser(u); setUser(u);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem("earth_user"); setUser(null);
  }, []);

  const forgotPassword = useCallback(async (email: string) => {
    const users = getStoredUsers();
    if (!users[email]) throw new Error("No account found with this email");
    localStorage.setItem("earth_reset_" + email, "true");
  }, []);

  const resetPassword = useCallback((email: string, newPassword: string) => {
    const users = getStoredUsers();
    if (!users[email]) throw new Error("No account found");
    users[email].password = newPassword;
    localStorage.setItem("earth_users", JSON.stringify(users));
    localStorage.removeItem("earth_reset_" + email);
  }, []);

  const updateProfile = useCallback((data: { name?: string; email?: string }) => {
    const current = getStoredUser();
    if (!current) return;
    const updated = { ...current, ...data };
    const users = getStoredUsers();
    if (data.email && data.email !== current.email) {
      users[data.email] = users[current.email];
      delete users[current.email];
    }
    if (data.name) users[updated.email] = { ...users[updated.email], name: data.name };
    localStorage.setItem("earth_users", JSON.stringify(users));
    saveUser(updated); setUser(updated);
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, loginWithGoogle, loginWithGitHub, register, logout, forgotPassword, resetPassword, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}

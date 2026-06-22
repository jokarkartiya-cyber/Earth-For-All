import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from "react";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
  sendPasswordResetEmail,
  confirmPasswordReset,
  updateProfile as firebaseUpdateProfile,
  type User as FirebaseUser,
} from "firebase/auth";
import { doc, getDoc, setDoc, updateDoc, serverTimestamp } from "firebase/firestore";
import { auth, db, googleProvider } from "@/lib/firebase";

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone?: string;
  avatar?: string;
  provider?: string;
  joinedAt?: string;
}

interface AuthContextType {
  user: UserProfile | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  forgotPassword: (email: string) => Promise<void>;
  resetPassword: (oobCode: string, newPassword: string) => Promise<void>;
  updateProfile: (data: { name?: string }) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

async function firebaseUserToProfile(fbUser: FirebaseUser): Promise<UserProfile> {
  const profileRef = doc(db, "profiles", fbUser.uid);
  const profileSnap = await getDoc(profileRef);
  if (profileSnap.exists()) {
    return profileSnap.data() as UserProfile;
  }
  return {
    id: fbUser.uid,
    name: fbUser.displayName || fbUser.email?.split("@")[0] || fbUser.phoneNumber || "User",
    email: fbUser.email || "",
    phone: fbUser.phoneNumber || undefined,
    avatar: fbUser.photoURL || undefined,
    provider: fbUser.providerData[0]?.providerId || "email",
    joinedAt: fbUser.metadata.creationTime || new Date().toISOString(),
  };
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (fbUser) => {
      if (fbUser) {
        const profile = await firebaseUserToProfile(fbUser);
        setUser(profile);
      } else {
        setUser(null);
      }
      setLoading(false);
    });
    return unsub;
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email, password);
  }, []);

  const loginWithGoogle = useCallback(async () => {
    await signInWithPopup(auth, googleProvider);
  }, []);

  const register = useCallback(async (name: string, email: string, password: string) => {
    const cred = await createUserWithEmailAndPassword(auth, email, password);
    await firebaseUpdateProfile(cred.user, { displayName: name });
    await setDoc(doc(db, "profiles", cred.user.uid), {
      id: cred.user.uid,
      name,
      email,
      provider: "email",
      joinedAt: serverTimestamp(),
    });
  }, []);

  const logout = useCallback(async () => {
    await signOut(auth);
  }, []);

  const forgotPassword = useCallback(async (email: string) => {
    await sendPasswordResetEmail(auth, email);
  }, []);

  const resetPassword = useCallback(async (oobCode: string, newPassword: string) => {
    await confirmPasswordReset(auth, oobCode, newPassword);
  }, []);

  const updateProfileCb = useCallback(async (data: { name?: string }) => {
    const fbUser = auth.currentUser;
    if (!fbUser) return;
    if (data.name) {
      await firebaseUpdateProfile(fbUser, { displayName: data.name });
      await updateDoc(doc(db, "profiles", fbUser.uid), { name: data.name });
    }
    const profile = await firebaseUserToProfile(fbUser);
    setUser(profile);
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, login, loginWithGoogle, register, logout, forgotPassword, resetPassword, updateProfile: updateProfileCb }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}

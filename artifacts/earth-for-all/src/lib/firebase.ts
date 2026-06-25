import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyAhAfK-vh1Ee3yPtp9pXWrepZjqux4KHjo",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "earthforall-be41f.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "earthforall-be41f",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "earthforall-be41f.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "478981519387",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:478981519387:web:6a0a543feac3fdacd220be",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: "select_account" });

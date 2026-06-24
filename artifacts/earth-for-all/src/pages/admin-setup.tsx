import { useState } from "react";
import { motion } from "framer-motion";
import { Shield, Key, CheckCircle2, AlertCircle } from "lucide-react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useAuth } from "@/hooks/use-auth";
import { useLocation } from "wouter";

const SECRET_CODE = "earthforall-admin-2024";

const DEPARTMENTS = [
  { id: "pollution-board", name: "Pollution Control Board", emoji: "🏭" },
  { id: "municipal", name: "Municipal Corporation", emoji: "🏛️" },
  { id: "forest", name: "Forest Department", emoji: "🌳" },
  { id: "animal-welfare", name: "Animal Welfare", emoji: "🐾" },
  { id: "fire-services", name: "Fire Services", emoji: "🚒" },
  { id: "water-resources", name: "Water Resources Dept.", emoji: "💧" },
  { id: "local-admin", name: "Local Administration", emoji: "📋" },
];

export default function AdminSetup() {
  const { user } = useAuth();
  const [, navigate] = useLocation();
  const [code, setCode] = useState("");
  const [dept, setDept] = useState("");
  const [step, setStep] = useState<"code" | "dept" | "done" | "error">("code");
  const [error, setError] = useState("");

  async function verifyCode() {
    if (code !== SECRET_CODE) {
      setError("Wrong secret code");
      return;
    }
    setError("");
    setStep("dept");
  }

  async function assignRole() {
    if (!dept || !user) return;
    try {
      await updateDoc(doc(db, "profiles", user.id), {
        role: "department",
        department: dept,
      });
      setStep("done");
    } catch {
      setError("Failed to assign role. Try again.");
    }
  }

  if (!user) {
    return (
      <div className="pt-24 min-h-screen flex items-center justify-center">
        <div className="text-center text-white/40 text-sm">Please sign in first</div>
      </div>
    );
  }

  return (
    <div className="pt-24 min-h-screen flex items-center justify-center px-4">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white/[0.03] border border-white/10 rounded-2xl p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center">
            <Shield className="w-5 h-5 text-amber-400" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-white">Department Admin Setup</h1>
            <p className="text-xs text-white/40">Assign yourself as a department admin</p>
          </div>
        </div>

        {step === "code" && (
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-xs text-white/50 font-medium">Enter Secret Code</label>
              <input type="password" value={code} onChange={e => setCode(e.target.value)}
                placeholder="Enter secret code..."
                onKeyDown={e => e.key === "Enter" && verifyCode()}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder:text-white/20 outline-none focus:border-emerald-500/50 transition-colors" />
            </div>
            {error && (
              <div className="flex items-center gap-2 text-xs text-red-400 bg-red-900/10 border border-red-800/20 rounded-lg px-3 py-2">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" /> {error}
              </div>
            )}
            <button onClick={verifyCode} disabled={!code.trim()}
              className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 disabled:bg-emerald-600/50 text-white rounded-xl text-sm font-medium transition-all flex items-center justify-center gap-2">
              <Key className="w-4 h-4" /> Verify Code
            </button>
          </div>
        )}

        {step === "dept" && (
          <div className="space-y-3">
            <p className="text-sm text-white/60">Choose your department:</p>
            {DEPARTMENTS.map(d => (
              <button key={d.id} onClick={() => setDept(d.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl border text-sm transition-all ${
                  dept === d.id
                    ? "bg-emerald-600/20 border-emerald-500/50 text-white"
                    : "bg-white/5 border-white/10 text-white/70 hover:bg-white/10"
                }`}>
                <span className="text-lg">{d.emoji}</span>
                <span className="font-medium">{d.name}</span>
                {dept === d.id && <CheckCircle2 className="w-4 h-4 ml-auto text-emerald-400" />}
              </button>
            ))}
            <button onClick={assignRole} disabled={!dept}
              className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 disabled:bg-emerald-600/50 text-white rounded-xl text-sm font-medium transition-all mt-2">
              Assign Admin Role
            </button>
          </div>
        )}

        {step === "done" && (
          <div className="text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8 text-emerald-400" />
            </div>
            <p className="text-white font-medium">Admin role assigned!</p>
            <p className="text-xs text-white/40">Refresh the page and check your profile dropdown for the Admin Panel link.</p>
            <button onClick={() => navigate("/admin")}
              className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-sm font-medium transition-all">
              Go to Admin Panel
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
}

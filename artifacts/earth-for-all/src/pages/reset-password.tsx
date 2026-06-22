import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Lock, Eye, EyeOff, ArrowLeft } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";

export default function ResetPassword() {
  const [loc] = useLocation();
  const params = Object.fromEntries(new URLSearchParams(loc.split("?")[1] || ""));
  const oobCode = params.oobCode || "";
  const mode = params.mode || "";
  const { resetPassword } = useAuth();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (password.length < 6) return setError("Password must be at least 6 characters");
    if (password !== confirm) return setError("Passwords don't match");
    try {
      await resetPassword(oobCode, password);
      setDone(true);
    } catch (err: any) {
      setError(err.code === "auth/expired-action-code" ? "Link expired. Request a new one." : err.message);
    }
  }

  if (done) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background px-4">
        <div className="w-full max-w-[400px]">
          <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-8 shadow-2xl text-center">
            <div className="w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mx-auto mb-5">
              <svg className="w-6 h-6 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
            </div>
            <h1 className="text-xl font-semibold text-white mb-2">Password reset!</h1>
            <p className="text-white/50 text-sm mb-6">Your password has been updated successfully.</p>
            <Link href="/login" className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-medium px-6 py-2.5 rounded-xl text-sm transition-all">
              Sign in with new password
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (!oobCode || mode !== "resetPassword") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background px-4">
        <div className="w-full max-w-[400px]">
          <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-8 shadow-2xl text-center">
            <div className="w-14 h-14 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center mx-auto mb-5">
              <Lock className="w-6 h-6 text-amber-400" />
            </div>
            <h1 className="text-xl font-semibold text-white mb-2">Invalid reset link</h1>
            <p className="text-white/50 text-sm mb-6">Use the link from your password reset email.</p>
            <Link href="/forgot-password" className="text-emerald-400 hover:text-emerald-300 font-medium text-sm transition-colors">Request a new reset link</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4 py-12">
      <div className="w-full max-w-[400px]">
        <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-8 shadow-2xl">
          <div className="text-center mb-8">
            <div className="w-12 h-12 rounded-full bg-emerald-600/20 border border-emerald-500/30 flex items-center justify-center mx-auto mb-5 shadow-lg shadow-emerald-500/10">
              <Lock className="w-6 h-6 text-emerald-400" />
            </div>
            <h1 className="text-xl font-semibold text-white">New password</h1>
            <p className="text-white/40 text-sm mt-1.5">Enter your new password below</p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30">
                <Lock className="w-4 h-4" />
              </div>
              <input type={showPw ? "text" : "password"} value={password} onChange={e => setPassword(e.target.value)} required minLength={6}
                className="w-full bg-transparent border border-white/10 rounded-xl py-3 pl-10 pr-10 text-white text-sm placeholder:text-white/20 outline-none transition-all duration-200 focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/20"
                placeholder="New password" />
              <button type="button" onClick={() => setShowPw(!showPw)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors">
                {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            <div className="relative">
              <input type="password" value={confirm} onChange={e => setConfirm(e.target.value)} required minLength={6}
                className="w-full bg-transparent border border-white/10 rounded-xl py-3 px-4 text-white text-sm placeholder:text-white/20 outline-none transition-all duration-200 focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/20"
                placeholder="Confirm new password" />
            </div>
            {error && (
              <div className="bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-2.5">
                <p className="text-red-400 text-xs text-center">{error}</p>
              </div>
            )}
            <button type="submit"
              className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-medium h-11 rounded-xl text-sm transition-all duration-200 hover:shadow-lg hover:shadow-emerald-500/25">
              Reset password
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

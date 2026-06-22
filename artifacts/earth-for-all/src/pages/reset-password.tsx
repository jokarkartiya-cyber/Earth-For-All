import { useState } from "react";
import { Link, useSearch } from "wouter";
import { Globe, Lock, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";

export default function ResetPassword() {
  const searchParams = Object.fromEntries(new URLSearchParams(useSearch()));
  const email = searchParams.email || "";
  const { resetPassword } = useAuth();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (password.length < 6) return setError("Password must be at least 6 characters");
    if (password !== confirm) return setError("Passwords don't match");
    try {
      resetPassword(email, password);
      setDone(true);
    } catch (err: any) {
      setError(err.message);
    }
  }

  if (done) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background px-4 text-center">
        <div>
          <div className="w-14 h-14 rounded-full bg-emerald-900/30 border border-emerald-700/40 flex items-center justify-center mx-auto mb-4">
            <Globe className="w-7 h-7 text-emerald-400" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">Password reset!</h1>
          <p className="text-white/50 text-sm mb-6">Your password has been updated successfully.</p>
          <Link href="/login" className="text-emerald-400 hover:text-emerald-300 underline text-sm">Sign in with new password</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4 py-12">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-full bg-emerald-900/30 border border-emerald-700/40 flex items-center justify-center mx-auto mb-4">
            <Globe className="w-7 h-7 text-emerald-400" />
          </div>
          <h1 className="text-2xl font-bold text-white">New password</h1>
          <p className="text-white/50 text-sm mt-1">For {email}</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs text-white/60 font-medium mb-1.5 block">New password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
              <input type={showPw ? "text" : "password"} value={password} onChange={e => setPassword(e.target.value)} required minLength={6}
                className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 pl-10 pr-10 text-white text-sm placeholder:text-white/25 focus:outline-none focus:border-emerald-500/50 transition-colors"
                placeholder="••••••••" />
              <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60">
                {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>
          <div>
            <label className="text-xs text-white/60 font-medium mb-1.5 block">Confirm password</label>
            <input type="password" value={confirm} onChange={e => setConfirm(e.target.value)} required minLength={6}
              className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 px-4 text-white text-sm placeholder:text-white/25 focus:outline-none focus:border-emerald-500/50 transition-colors"
              placeholder="••••••••" />
          </div>
          {error && <p className="text-red-400 text-xs text-center">{error}</p>}
          <Button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-500 text-white h-11 rounded-xl text-sm">Reset password</Button>
        </form>
      </div>
    </div>
  );
}

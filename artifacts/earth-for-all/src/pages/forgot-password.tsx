import { useState } from "react";
import { Link } from "wouter";
import { Mail, ArrowLeft } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";

export default function ForgotPassword() {
  const { forgotPassword } = useAuth();
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await forgotPassword(email);
      setSent(true);
    } catch (err: any) {
      setError(err.code === "auth/user-not-found" ? "No account found with this email" : err.message);
    } finally {
      setLoading(false);
    }
  }

  if (sent) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background px-4">
        <div className="w-full max-w-[400px]">
          <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-8 shadow-2xl text-center">
            <div className="w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mx-auto mb-5">
              <Mail className="w-6 h-6 text-emerald-400" />
            </div>
            <h1 className="text-xl font-semibold text-white mb-2">Check your email</h1>
            <p className="text-white/50 text-sm mb-2">We sent a password reset link to</p>
            <p className="text-emerald-400 text-sm font-medium mb-6">{email}</p>
            <div className="bg-white/5 rounded-lg px-4 py-3 mb-6">
              <p className="text-white/30 text-xs">Click the link in the email to reset your password. It may take a few minutes to arrive.</p>
            </div>
            <Link href="/login" className="text-white/40 hover:text-white/60 text-sm transition-colors">Back to sign in</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4 py-12">
      <div className="w-full max-w-[400px]">
        <Link href="/login" className="inline-flex items-center gap-1.5 text-white/40 hover:text-white/60 text-sm mb-6 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to sign in
        </Link>
        <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-8 shadow-2xl">
          <div className="text-center mb-8">
            <div className="w-12 h-12 rounded-full bg-emerald-600/20 border border-emerald-500/30 flex items-center justify-center mx-auto mb-5 shadow-lg shadow-emerald-500/10">
              <svg className="w-6 h-6 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/><path d="M2 12h20"/></svg>
            </div>
            <h1 className="text-xl font-semibold text-white">Reset password</h1>
            <p className="text-white/40 text-sm mt-1.5">Enter your email and we'll send you a reset link</p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30">
                <Mail className="w-4 h-4" />
              </div>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} required
                className="w-full bg-transparent border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white text-sm placeholder:text-white/20 outline-none transition-all duration-200 focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/20"
                placeholder="Email address" />
            </div>
            {error && (
              <div className="bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-2.5">
                <p className="text-red-400 text-xs text-center">{error}</p>
              </div>
            )}
            <button type="submit" disabled={loading}
              className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-medium h-11 rounded-xl text-sm transition-all duration-200 hover:shadow-lg hover:shadow-emerald-500/25 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2">
              {loading ? (
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                "Send reset link"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

import { Link } from "wouter";
import { Globe, Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground px-4">
      <div className="w-20 h-20 rounded-full bg-emerald-900/30 border border-emerald-700/40 flex items-center justify-center mb-8">
        <Globe className="w-10 h-10 text-emerald-400" />
      </div>
      <h1 className="text-6xl font-bold text-white mb-4">404</h1>
      <p className="text-xl text-white/60 mb-2">Page not found</p>
      <p className="text-white/40 mb-8 text-sm">This page doesn't exist or has been moved.</p>
      <Link href="/" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-medium transition-all text-sm">
        <Home className="w-4 h-4" />
        Back to Home
      </Link>
    </div>
  );
}

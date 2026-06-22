import { Link } from "wouter";
import { Globe, Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background px-4">
      <div className="bg-[#0a1a14] border border-white/10 rounded-2xl p-10 shadow-2xl text-center max-w-sm w-full">
        <div className="w-16 h-16 rounded-full bg-emerald-600/20 border border-emerald-500/30 flex items-center justify-center mx-auto mb-6">
          <Globe className="w-8 h-8 text-emerald-400" />
        </div>
        <h1 className="text-5xl font-bold text-white mb-2">404</h1>
        <p className="text-white/60 mb-1">Page not found</p>
        <p className="text-white/30 text-sm mb-8">This page doesn't exist or has been moved.</p>
        <Link href="/" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-medium transition-all text-sm hover:shadow-lg hover:shadow-emerald-500/25">
          <Home className="w-4 h-4" />
          Back to Home
        </Link>
      </div>
    </div>
  );
}

import { Link } from "wouter";
import { Globe, Heart, Shield, Droplets, Github, Twitter, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#040d0a] pt-16 pb-8 mt-auto relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(16,185,129,0.08)_0%,transparent_50%)] pointer-events-none" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          <div className="col-span-2 md:col-span-1 space-y-4">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-9 h-9 rounded-full bg-primary/20 flex items-center justify-center border border-primary/50 group-hover:scale-110 transition-transform duration-500">
                <Globe className="w-4 h-4 text-emerald-400" />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-base leading-none tracking-tight text-white">Earth For All</span>
                <span className="text-[9px] text-emerald-400 font-medium tracking-widest uppercase">धरती सबकी है</span>
              </div>
            </Link>
            <p className="text-white/50 text-sm leading-relaxed max-w-xs">
              A global mission platform calling on humanity to protect animals, forests, water, and nature.
            </p>
            <div className="flex gap-3 pt-2">
              <a href="#" className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all"><Github className="w-3.5 h-3.5" /></a>
              <a href="#" className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all"><Twitter className="w-3.5 h-3.5" /></a>
              <a href="#" className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all"><Mail className="w-3.5 h-3.5" /></a>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-white text-xs uppercase tracking-wider mb-4">Initiatives</h3>
            <ul className="space-y-3">
              <li><Link href="/clean-earth" className="text-white/50 hover:text-emerald-400 text-sm transition-colors">Clean Earth</Link></li>
              <li><Link href="/animals" className="text-white/50 hover:text-amber-400 text-sm transition-colors">Animals</Link></li>
              <li><Link href="/forest" className="text-white/50 hover:text-emerald-500 text-sm transition-colors">Forest</Link></li>
              <li><Link href="/water" className="text-white/50 hover:text-blue-400 text-sm transition-colors">Water</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-white text-xs uppercase tracking-wider mb-4">Platform</h3>
            <ul className="space-y-3">
              <li><Link href="/ideas" className="text-white/50 hover:text-white text-sm transition-colors">Ideas</Link></li>
              <li><Link href="/report" className="text-white/50 hover:text-white text-sm transition-colors">Report</Link></li>
              <li><Link href="/articles" className="text-white/50 hover:text-white text-sm transition-colors">Learn</Link></li>
              <li><Link href="/technology" className="text-white/50 hover:text-indigo-400 text-sm transition-colors">Tech</Link></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-white text-xs uppercase tracking-wider mb-4">The Pledge</h3>
            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <p className="text-white/70 text-xs leading-relaxed mb-3 italic">
                "I pledge to protect the Earth, to speak for those without a voice, and to leave the world better than I found it."
              </p>
              <div className="flex gap-2 text-white/30">
                <Heart className="w-3.5 h-3.5" />
                <Shield className="w-3.5 h-3.5" />
                <Droplets className="w-3.5 h-3.5" />
              </div>
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-white/30 text-xs">© {new Date().getFullYear()} Earth For All. The Earth belongs to everyone.</p>
          <div className="flex gap-4 text-xs text-white/30">
            <span>Made with care for the planet</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

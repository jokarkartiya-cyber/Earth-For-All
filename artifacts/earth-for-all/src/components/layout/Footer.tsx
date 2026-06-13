import { Link } from "wouter";
import { Globe, Heart, Shield, Droplets } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#040d0a] pt-20 pb-10 mt-auto relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(16,185,129,0.1)_0%,transparent_50%)] pointer-events-none" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center border border-primary/50 group-hover:scale-110 transition-transform duration-500">
                <Globe className="w-5 h-5 text-emerald-400" />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-xl leading-none tracking-tight text-white">Earth For All</span>
                <span className="text-[10px] text-emerald-400 font-medium tracking-widest uppercase">धरती सबकी है</span>
              </div>
            </Link>
            <p className="text-white/60 leading-relaxed max-w-sm">
              A global mission platform calling on humanity to protect animals, forests, water, and nature through technology and community action.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-6 uppercase tracking-wider text-sm">Initiatives</h3>
            <ul className="space-y-4">
              <li><Link href="/clean-earth" className="text-white/60 hover:text-emerald-400 transition-colors">Clean Earth Academy</Link></li>
              <li><Link href="/animals" className="text-white/60 hover:text-amber-400 transition-colors">Animal Protection</Link></li>
              <li><Link href="/forest" className="text-white/60 hover:text-emerald-500 transition-colors">Forest & Nature</Link></li>
              <li><Link href="/water" className="text-white/60 hover:text-blue-400 transition-colors">Water Conservation</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-6 uppercase tracking-wider text-sm">Platform</h3>
            <ul className="space-y-4">
              <li><Link href="/technology" className="text-white/60 hover:text-indigo-400 transition-colors">Innovation Lab</Link></li>
              <li><Link href="/ideas" className="text-white/60 hover:text-white transition-colors">Community Ideas</Link></li>
              <li><Link href="/report" className="text-white/60 hover:text-white transition-colors">Report an Issue</Link></li>
              <li><Link href="/articles" className="text-white/60 hover:text-white transition-colors">Education Hub</Link></li>
            </ul>
          </div>

          <div className="space-y-6">
            <h3 className="font-semibold text-white mb-6 uppercase tracking-wider text-sm">The Pledge</h3>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <p className="text-white/80 text-sm leading-relaxed mb-4 italic">
                "I pledge to protect the Earth, to speak for those without a voice, and to leave the world better than I found it."
              </p>
              <div className="flex gap-4 text-white/40">
                <Heart className="w-4 h-4" />
                <Shield className="w-4 h-4" />
                <Droplets className="w-4 h-4" />
              </div>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/40 text-sm">
            © {new Date().getFullYear()} Earth For All. The Earth belongs to everyone.
          </p>
          <div className="flex gap-6 text-sm text-white/40">
            <span>Built for the Future</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

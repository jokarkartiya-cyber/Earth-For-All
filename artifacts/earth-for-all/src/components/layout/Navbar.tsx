import { Link, useLocation } from "wouter";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { Menu, X, Globe, Droplets, TreePine, Bird, Zap, Lightbulb, AlertTriangle, BookOpen, Database, LayoutDashboard, ChevronDown, FlaskConical, Satellite, Landmark, Library, Brain, Sprout } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";

const NAV_LINKS = [
  { href: "/clean-earth", label: "Clean Earth", icon: Globe },
  { href: "/animals", label: "Animals", icon: Bird },
  { href: "/forest", label: "Forest", icon: TreePine },
  { href: "/water", label: "Water", icon: Droplets },
  { href: "/technology", label: "Tech", icon: Zap },
  { href: "/ideas", label: "Ideas", icon: Lightbulb },
  { href: "/report", label: "Report", icon: AlertTriangle },
  { href: "/articles", label: "Learn", icon: BookOpen },
];

const MORE_LINKS = [
  { href: "/evidence", label: "Evidence Center", icon: FlaskConical, desc: "12 problems with verified data" },
  { href: "/live-earth", label: "Live Earth", icon: Satellite, desc: "Real-time satellite & data dashboard" },
  { href: "/solution-bank", label: "Solution Bank", icon: Sprout, desc: "Problem → Evidence → Solutions" },
  { href: "/memory-project", label: "Memory Project", icon: Brain, desc: "Elder memories & ancient wisdom" },
  { href: "/library", label: "Earth Library", icon: Library, desc: "Crores of free books & research" },
  { href: "/resources", label: "Resources Hub", icon: Database, desc: "85+ external links & APIs" },
  { href: "/platform", label: "Platform Blueprint", icon: LayoutDashboard, desc: "DB architecture & roadmap" },
];

export function Navbar() {
  const [location] = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const { scrollY } = useScroll();
  const bgOpacity = useTransform(scrollY, [0, 50], [0, 0.8]);
  const blur = useTransform(scrollY, [0, 50], [0, 12]);
  const moreRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsMoreOpen(false);
  }, [location]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (moreRef.current && !moreRef.current.contains(e.target as Node)) {
        setIsMoreOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <motion.header
        className="fixed top-0 left-0 right-0 z-50 border-b border-white/5"
        style={{
          backgroundColor: useTransform(bgOpacity, (v) => `rgba(6, 18, 14, ${v})`),
          backdropFilter: useTransform(blur, (v) => `blur(${v}px)`),
        }}
      >
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 group shrink-0">
            <div className="w-9 h-9 rounded-full bg-primary/20 flex items-center justify-center border border-primary/50 group-hover:scale-110 transition-transform duration-500">
              <Globe className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-base leading-none tracking-tight text-white">Earth For All</span>
              <span className="text-[9px] text-emerald-400 font-medium tracking-widest uppercase">धरती सबकी है</span>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-0.5">
            {NAV_LINKS.map((link) => {
              const isActive = location === link.href;
              const Icon = link.icon;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-2.5 py-1.5 rounded-md text-xs font-medium transition-all flex items-center gap-1.5 ${
                    isActive
                      ? "bg-white/10 text-white"
                      : "text-white/60 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  {link.label}
                </Link>
              );
            })}

            {/* More Dropdown */}
            <div ref={moreRef} className="relative">
              <button
                onClick={() => setIsMoreOpen(!isMoreOpen)}
                className={`px-2.5 py-1.5 rounded-md text-xs font-medium transition-all flex items-center gap-1.5 ${
                  isMoreOpen || MORE_LINKS.some(l => location === l.href)
                    ? "bg-white/10 text-white"
                    : "text-white/60 hover:text-white hover:bg-white/5"
                }`}
              >
                More
                <ChevronDown className={`w-3 h-3 transition-transform ${isMoreOpen ? "rotate-180" : ""}`} />
              </button>

              <AnimatePresence>
                {isMoreOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 4, scale: 0.97 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 top-full mt-2 w-64 bg-[#060e09]/95 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden shadow-2xl z-50"
                  >
                    <div className="p-1.5">
                      {MORE_LINKS.map(link => {
                        const Icon = link.icon;
                        const isActive = location === link.href;
                        return (
                          <Link key={link.href} href={link.href}
                            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all group ${
                              isActive ? "bg-white/10" : "hover:bg-white/5"
                            }`}>
                            <div className="w-7 h-7 rounded-lg bg-white/8 border border-white/8 flex items-center justify-center shrink-0">
                              <Icon className="w-3.5 h-3.5 text-emerald-400" />
                            </div>
                            <div>
                              <div className="text-xs font-semibold text-white/80 group-hover:text-white transition-colors">{link.label}</div>
                              <div className="text-[10px] text-white/35">{link.desc}</div>
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </nav>

          <div className="hidden lg:flex items-center gap-3">
            <Button asChild variant="default" size="sm" className="bg-emerald-600 hover:bg-emerald-500 text-white border-0 shadow-[0_0_20px_rgba(5,150,105,0.3)] hover:shadow-[0_0_30px_rgba(5,150,105,0.5)] transition-all text-xs">
              <Link href="/ideas">Join Mission</Link>
            </Button>
          </div>

          <button
            className="lg:hidden p-2 text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-background/97 backdrop-blur-xl pt-16 overflow-y-auto"
          >
            <div className="container mx-auto px-4 py-6 flex flex-col gap-1.5">
              <div className="text-xs font-bold text-white/25 uppercase tracking-widest px-4 pb-2">Main Pages</div>
              {NAV_LINKS.map((link) => {
                const isActive = location === link.href;
                const Icon = link.icon;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`p-3.5 rounded-xl text-sm font-medium flex items-center gap-4 border ${
                      isActive
                        ? "bg-white/10 text-white border-white/20"
                        : "text-white/70 border-transparent hover:bg-white/5"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    {link.label}
                  </Link>
                );
              })}

              <div className="text-xs font-bold text-white/25 uppercase tracking-widest px-4 pb-2 pt-4">Knowledge & Data</div>
              {MORE_LINKS.map((link) => {
                const isActive = location === link.href;
                const Icon = link.icon;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`p-3.5 rounded-xl text-sm font-medium flex items-center gap-4 border ${
                      isActive
                        ? "bg-white/10 text-white border-white/20"
                        : "text-white/70 border-transparent hover:bg-white/5"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <div>
                      <div>{link.label}</div>
                      <div className="text-xs text-white/35 font-normal">{link.desc}</div>
                    </div>
                  </Link>
                );
              })}

              <div className="mt-6">
                <Button asChild size="lg" className="w-full bg-emerald-600 hover:bg-emerald-500 text-white">
                  <Link href="/ideas">Join the Mission</Link>
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

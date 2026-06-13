import { Link, useLocation } from "wouter";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { Menu, X, Globe, Droplets, TreePine, Bird, Zap, Building2, Lightbulb, AlertTriangle, BookOpen } from "lucide-react";
import { useState, useEffect } from "react";
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

export function Navbar() {
  const [location] = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  const bgOpacity = useTransform(scrollY, [0, 50], [0, 0.8]);
  const blur = useTransform(scrollY, [0, 50], [0, 12]);
  
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  return (
    <>
      <motion.header
        className="fixed top-0 left-0 right-0 z-50 border-b border-white/5"
        style={{
          backgroundColor: useTransform(bgOpacity, (v) => `rgba(6, 18, 14, ${v})`),
          backdropFilter: useTransform(blur, (v) => `blur(${v}px)`),
        }}
      >
        <div className="container mx-auto px-4 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center border border-primary/50 group-hover:scale-110 transition-transform duration-500">
              <Globe className="w-5 h-5 text-emerald-400" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-lg leading-none tracking-tight text-white">Earth For All</span>
              <span className="text-[10px] text-emerald-400 font-medium tracking-widest uppercase">धरती सबकी है</span>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((link) => {
              const isActive = location === link.href;
              const Icon = link.icon;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-all flex items-center gap-2 ${
                    isActive 
                      ? "bg-white/10 text-white" 
                      : "text-white/60 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div className="hidden lg:flex items-center gap-4">
            <Button asChild variant="default" className="bg-emerald-600 hover:bg-emerald-500 text-white border-0 shadow-[0_0_20px_rgba(5,150,105,0.3)] hover:shadow-[0_0_30px_rgba(5,150,105,0.5)] transition-all">
              <Link href="/ideas">Join the Mission</Link>
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
            className="fixed inset-0 z-40 bg-background/95 backdrop-blur-xl pt-20"
          >
            <div className="container mx-auto px-4 py-8 flex flex-col gap-4">
              {NAV_LINKS.map((link) => {
                const isActive = location === link.href;
                const Icon = link.icon;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`p-4 rounded-xl text-lg font-medium flex items-center gap-4 border ${
                      isActive 
                        ? "bg-white/10 text-white border-white/20" 
                        : "text-white/70 border-transparent hover:bg-white/5"
                    }`}
                  >
                    <Icon className="w-6 h-6" />
                    {link.label}
                  </Link>
                );
              })}
              <div className="mt-8">
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

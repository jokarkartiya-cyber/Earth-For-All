import { Link, useLocation } from "wouter";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { Menu, X, Globe, Droplets, TreePine, Bird, Zap, Lightbulb, AlertTriangle, BookOpen, Database, LayoutDashboard, ChevronDown, FlaskConical, Satellite, Landmark, Library, Brain, Sprout, LogOut, User, ArrowRight, Shield } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import { NotificationBell } from "@/components/NotificationBell";

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
  const { user, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const [isUserOpen, setIsUserOpen] = useState(false);
  const { scrollY } = useScroll();
  const bgOpacity = useTransform(scrollY, [0, 50], [0, 0.8]);
  const blur = useTransform(scrollY, [0, 50], [0, 12]);
  const moreRef = useRef<HTMLDivElement>(null);
  const userRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsMoreOpen(false);
    setIsUserOpen(false);
  }, [location]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (moreRef.current && !moreRef.current.contains(e.target as Node)) {
        setIsMoreOpen(false);
      }
      if (userRef.current && !userRef.current.contains(e.target as Node)) {
        setIsUserOpen(false);
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
                            <div className="w-7 h-7 rounded-lg bg-white/10 border border-white/10 flex items-center justify-center shrink-0">
                              <Icon className="w-3.5 h-3.5 text-emerald-400" />
                            </div>
                            <div>
                              <div className="text-xs font-semibold text-white/100 group-hover:text-white transition-colors">{link.label}</div>
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

          <div className="hidden lg:flex items-center gap-1">
            <NotificationBell />
            {user ? (
              <div ref={userRef} className="relative">
                <button onClick={() => setIsUserOpen(!isUserOpen)}
                  className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all text-sm group">
                  <div className="w-7 h-7 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-700 flex items-center justify-center text-xs font-bold text-white shadow-sm shadow-emerald-500/20">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-white/100 text-xs font-medium max-w-[100px] truncate group-hover:text-white transition-colors">{user.name}</span>
                  <ChevronDown className={`w-3 h-3 text-white/40 transition-transform duration-200 ${isUserOpen ? "rotate-180" : ""}`} />
                </button>
                <AnimatePresence>
                  {isUserOpen && (
                    <motion.div initial={{ opacity: 0, y: 8, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 4, scale: 0.97 }} transition={{ duration: 0.15 }}
                      className="absolute right-0 top-full mt-2 w-56 bg-[#060e09]/95 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden shadow-2xl z-50">
                      <div className="p-2">
                        <div className="px-3 py-2.5 border-b border-white/5 mb-1">
                          <div className="text-sm font-medium text-white truncate">{user.name}</div>
                          <div className="text-xs text-white/40 truncate mt-0.5">{user.email}</div>
                        </div>
                        <Link href="/profile"
                          className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm text-white/70 hover:text-white hover:bg-white/5 transition-all"
                          onClick={() => setIsUserOpen(false)}>
                          <User className="w-4 h-4" /> Profile
                        </Link>
                        {user.role === "department" && (
                          <Link href="/admin"
                            className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm text-amber-400 hover:text-amber-300 hover:bg-amber-500/10 transition-all"
                            onClick={() => setIsUserOpen(false)}>
                            <Shield className="w-4 h-4" /> Admin Panel
                          </Link>
                        )}
                        <button onClick={async () => { await logout(); setIsUserOpen(false); }}
                          className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm text-red-400 hover:bg-red-500/10 transition-all">
                          <LogOut className="w-4 h-4" /> Sign out
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <>
                <Link href="/login"
                  className="px-4 py-1.5 rounded-xl text-xs font-medium text-white/60 hover:text-white hover:bg-white/5 transition-all">Sign in</Link>
                <Link href="/register"
                  className="px-4 py-1.5 rounded-xl text-xs font-medium bg-emerald-600 hover:bg-emerald-500 text-white transition-all hover:shadow-lg hover:shadow-emerald-500/20">Sign up</Link>
              </>
            )}
          </div>

          <div className="lg:hidden flex items-center gap-1">
            <NotificationBell />
            <button
              className="p-2 text-white"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
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

              <div className="border-t border-white/5 my-4" />
              {user ? (
                <div className="px-4 py-2">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center text-sm font-bold text-white">{user.name.charAt(0).toUpperCase()}</div>
                    <div>
                      <div className="text-sm font-medium text-white">{user.name}</div>
                      <div className="text-xs text-white/40">{user.email}</div>
                    </div>
                  </div>
                  <Link href="/profile" onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-2 text-xs text-white/60 hover:text-white mb-2 transition-colors">
                    <User className="w-3.5 h-3.5" /> Profile
                  </Link>
                  {user.role === "department" && (
                    <Link href="/admin" onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center gap-2 text-xs text-amber-400 hover:text-amber-300 mb-2 transition-colors">
                      <Shield className="w-3.5 h-3.5" /> Admin Panel
                    </Link>
                  )}
                  <button onClick={async () => { await logout(); setIsMobileMenuOpen(false); }}
                    className="flex items-center gap-2 text-xs text-red-400 hover:text-red-300 transition-colors">
                    <LogOut className="w-3.5 h-3.5" /> Sign out
                  </button>
                </div>
              ) : (
                <div className="flex flex-col gap-2 px-4">
                  <Button asChild size="sm" variant="outline" className="border-white/20 text-white hover:bg-white/5">
                    <Link href="/login">Sign in</Link>
                  </Button>
                  <Button asChild size="sm" className="bg-emerald-600 hover:bg-emerald-500 text-white">
                    <Link href="/register">Sign up</Link>
                  </Button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

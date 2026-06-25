import { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "wouter";
import { useRef } from "react";
import { ArrowRight, Globe, Lightbulb, AlertTriangle, BookOpen, TrendingUp, Leaf, Sun, Heart, MessageSquare } from "lucide-react";
import { collection, query, orderBy, limit, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const CAUSES = [
  { href: "/clean-earth", label: "Clean Earth", desc: "Plastic, waste management, zero-waste cities", color: "from-emerald-900/50 to-emerald-800/20", border: "border-emerald-600/30", badge: "bg-emerald-900/60 text-emerald-300", icon: "♻️ " },
  { href: "/animals", label: "Animal Welfare", desc: "Water stations, feeding, rescue tech", color: "from-amber-900/50 to-amber-800/20", border: "border-amber-600/30", badge: "bg-amber-900/60 text-amber-300", icon: "🐾 " },
  { href: "/forest", label: "Forest & Nature", desc: "Urban forests, tree planting, biodiversity", color: "from-green-900/50 to-green-800/20", border: "border-green-600/30", badge: "bg-green-900/60 text-green-300", icon: "🌳 " },
  { href: "/water", label: "Water for All", desc: "Conservation, harvesting, clean rivers", color: "from-blue-900/50 to-blue-800/20", border: "border-blue-600/30", badge: "bg-blue-900/60 text-blue-300", icon: "💧 " },
  { href: "/technology", label: "Innovation Lab", desc: "AI, smart cities, green architecture", color: "from-indigo-900/50 to-indigo-800/20", border: "border-indigo-600/30", badge: "bg-indigo-900/60 text-indigo-300", icon: "⚡ " },
  { href: "/articles", label: "Education Hub", desc: "Learn, share, and inspire change", color: "from-teal-900/50 to-teal-800/20", border: "border-teal-600/30", badge: "bg-teal-900/60 text-teal-300", icon: "📖 " },
];

const CHART_COLORS = ["#10b981", "#f59e0b", "#3b82f6", "#6366f1", "#f97316", "#14b8a6"];

const CATEGORY_LABELS: Record<string, string> = {
  "clean-earth": "Clean Earth", "animal-welfare": "Animals", "forest": "Forest",
  "water": "Water", "technology": "Technology", "cities": "Cities",
};

const DAILY_TIPS = [
  { tip: "आज एक कटोरी पानी घर के बाहर रखें — पक्षियों और जानवरों के लिए।", action: "Animal Water", color: "text-amber-300", bg: "from-amber-900/30 to-amber-900/10", border: "border-amber-800/40" },
  { tip: "आज shopping जाएं तो कपड़े का थैला ले जाएं — plastic bag को ना कहें।", action: "Zero Plastic", color: "text-emerald-300", bg: "from-emerald-900/30 to-emerald-900/10", border: "border-emerald-800/40" },
  { tip: "आज पौधे को पानी दें — या किसी पार्क में एक पेड़ adopt करें।", action: "Tree Love", color: "text-green-300", bg: "from-green-900/30 to-green-900/10", border: "border-green-800/40" },
  { tip: "आज बाथरूम में बाल्टी से नहाएं, shower बंद रखें — 60 लीटर पानी बचाएं।", action: "Water Save", color: "text-blue-300", bg: "from-blue-900/30 to-blue-900/10", border: "border-blue-800/40" },
  { tip: "आज घर का सूखा-गीला कचरा अलग करें — 5 मिनट जो difference बनाता है।", action: "Segregate", color: "text-teal-300", bg: "from-teal-900/30 to-teal-900/10", border: "border-teal-800/40" },
  { tip: "आज एक दिन LED bulb जलाकर check करें — कितनी बिजली बचती है।", action: "Energy Save", color: "text-yellow-300", bg: "from-yellow-900/30 to-yellow-900/10", border: "border-yellow-800/40" },
  { tip: "आज पड़ोस में कोई घायल जानवर हो तो local rescue को report करें।", action: "Animal Help", color: "text-orange-300", bg: "from-orange-900/30 to-orange-900/10", border: "border-orange-800/40" },
];

const GLOBAL_PROBLEMS = [
  { emoji: "🌡️", title: "Climate Emergency", stat: "+1.2°C", desc: "Pre-industrial levels से ऊपर। Target 1.5°C — हम पहुंचने वाले हैं।" },
  { emoji: "🌊", title: "Plastic Oceans", stat: "8M Tons/yr", desc: "हर साल इतना plastic समुद्र में जाता है — हर minute एक garbage truck।" },
  { emoji: "🌳", title: "Forest Loss", stat: "4.7M Ha/yr", desc: "हर साल Brazil के आकार का एक area forest खत्म। बर्बाद।" },
  { emoji: "💧", title: "Water Crisis", stat: "2.2B People", desc: "Safe drinking water नहीं मिलता। 2 billion+ लोग रोज struggle करते हैं।" },
  { emoji: "🐾", title: "Species Extinction", stat: "150/day", desc: "हर दिन 150 species हमेशा के लिए खत्म हो जाती हैं — by human activity।" },
  { emoji: "💨", title: "Air Pollution", stat: "7M Deaths/yr", desc: "Outdoor air pollution से सालाना 7 million मौतें — WHO data।" },
];

const PRINCIPLES = [
  { icon: Globe, title: "धरती सबकी है", desc: "Earth सिर्फ इंसानों की नहीं है। हर जीव — जानवर, पक्षी, पेड़, नदी — का equal right है।", color: "text-emerald-400" },
  { icon: Leaf, title: "छोटी आदत, बड़ा बदलाव", desc: "एक घर का बदलाव → एक मोहल्ला → एक शहर → एक देश → दुनिया। Chain reaction।", color: "text-green-400" },
  { icon: Sun, title: "Technology सबके लिए", desc: "Technology सिर्फ इंसानों को comfortable बनाने के लिए नहीं — nature की रक्षा के लिए भी।", color: "text-amber-400" },
  { icon: Heart, title: "Compassion First", desc: "जो बोल नहीं सकते — जानवर, पेड़, नदियाँ — उनकी आवाज़ बनना हमारी ज़िम्मेदारी है।", color: "text-rose-400" },
];

const todayTip = DAILY_TIPS[new Date().getDay() % DAILY_TIPS.length];

const cv = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.1 } } };
const iv = { hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } } };

function getCategoryStyle(c: string) {
  const m: Record<string, string> = { "clean-earth": "border-emerald-700/50 text-emerald-300 bg-emerald-900/30", "animal-welfare": "border-amber-700/50 text-amber-300 bg-amber-900/30", "forest": "border-green-700/50 text-green-300 bg-green-900/30", "water": "border-blue-700/50 text-blue-300 bg-blue-900/30", "technology": "border-indigo-700/50 text-indigo-300 bg-indigo-900/30", "cities": "border-orange-700/50 text-orange-300 bg-orange-900/30" };
  return m[c] ?? "border-white/20 text-white/60 bg-white/5";
}

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const [recentIdeas, setRecentIdeas] = useState<any[]>([]);
  const [recentReports, setRecentReports] = useState<any[]>([]);
  const [totalIdeas, setTotalIdeas] = useState(0);
  const [totalReports, setTotalReports] = useState(0);
  const [categoryData, setCategoryData] = useState<{ name: string; value: number }[]>([]);

  useEffect(() => {
    const unsub1 = onSnapshot(query(collection(db, "ideas"), orderBy("createdAt", "desc"), limit(6)), (snap) => {
      const ideas = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
      setRecentIdeas(ideas);
      setTotalIdeas(snap.size);

      const cats: Record<string, number> = {};
      ideas.forEach((i: any) => { if (i.category) cats[i.category] = (cats[i.category] || 0) + 1; });
      setCategoryData(Object.entries(cats).map(([k, v]) => ({ name: CATEGORY_LABELS[k] || k, value: v })));
    });
    const unsub2 = onSnapshot(query(collection(db, "reports"), orderBy("createdAt", "desc"), limit(4)), (snap) => {
      setRecentReports(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
      setTotalReports(snap.size);
    });
    return () => { unsub1(); unsub2(); };
  }, []);

  return (
    <div className="flex flex-col">
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        <motion.div style={{ y }} className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(16,185,129,0.15)_0%,transparent_60%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_80%,rgba(59,130,246,0.08)_0%,transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_60%,rgba(245,158,11,0.06)_0%,transparent_40%)]" />
          <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "linear-gradient(hsl(152 40% 50%) 1px, transparent 1px), linear-gradient(90deg, hsl(152 40% 50%) 1px, transparent 1px)", backgroundSize: "80px 80px" }} />
        </motion.div>

        <motion.div style={{ opacity }} className="relative z-10 container mx-auto px-4 text-center max-w-5xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}>
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase border border-emerald-700/50 text-emerald-400 bg-emerald-900/30 mb-8">Global Mission Platform</span>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-7xl lg:text-8xl font-bold leading-tight mb-4">
            <span className="text-gradient-primary">Earth For All</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.35 }}
            className="text-xl md:text-2xl text-emerald-400/80 font-medium tracking-wider mb-4">धरती सबकी है</motion.p>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.45 }}
            className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto leading-relaxed mb-3">
            The Earth does not belong only to humans. Every animal, bird, tree, river, and living being has equal value.
          </motion.p>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.5 }}
            className="text-base text-white/40 max-w-xl mx-auto leading-relaxed mb-12">
            Our technology and progress must benefit all life — not just one species. Join the mission.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.55 }}
            className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/ideas" className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-medium px-8 h-14 rounded-xl text-base transition-all shadow-[0_0_30px_rgba(5,150,105,0.4)] hover:shadow-[0_0_50px_rgba(5,150,105,0.6)]">
              Join the Mission <ArrowRight className="w-5 h-5" />
            </a>
            <a href="/report" className="inline-flex items-center gap-2 border border-white/20 text-white hover:bg-white/5 font-medium px-8 h-14 rounded-xl text-base transition-all">
              Report an Issue
            </a>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.7 }}
            className="grid grid-cols-3 gap-6 mt-20 max-w-lg mx-auto">
            {[
              { value: totalIdeas || "--", label: "Ideas Shared" },
              { value: totalReports || "--", label: "Issues Reported" },
              { value: "Coming", label: "Articles" },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-emerald-400">{s.value}</div>
                <div className="text-xs text-white/40 mt-1 uppercase tracking-wider">{s.label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <span className="text-xs text-white/30 uppercase tracking-widest">Scroll</span>
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.5, repeat: Infinity }}
            className="w-5 h-8 border border-white/20 rounded-full flex items-start justify-center pt-1.5">
            <div className="w-1 h-1.5 rounded-full bg-white/40" />
          </motion.div>
        </motion.div>
      </section>

      <section className="py-8 container mx-auto px-4 max-w-2xl">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <div className={`bg-gradient-to-r ${todayTip.bg} border ${todayTip.border} rounded-2xl px-6 py-5 flex items-start gap-4`}>
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0 text-lg">🌱</div>
            <div>
              <div className={`text-xs font-semibold uppercase tracking-widest mb-1 ${todayTip.color}`}>
                आज का Green Tip — {todayTip.action}
              </div>
              <p className="text-white/100 text-sm leading-relaxed">{todayTip.tip}</p>
            </div>
          </div>
        </motion.div>
      </section>

      <section className="py-16 container mx-auto px-4">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={cv}>
          <motion.div variants={iv} className="text-center mb-12">
            <span className="text-xs font-semibold uppercase tracking-widest text-red-400/70">The Harsh Reality</span>
            <h2 className="text-3xl md:text-5xl font-bold text-white mt-2 mb-4">🌍 दुनिया की 6 बड़ी समस्याएं</h2>
            <p className="text-white/40 max-w-xl mx-auto">ये सिर्फ statistics नहीं हैं — यह हमारे ग्रह का SOS है।</p>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {GLOBAL_PROBLEMS.map((p) => (
              <motion.div key={p.title} variants={iv}
                className="bg-white/[0.03] border border-red-900/20 rounded-2xl p-5 text-center hover:border-red-800/40 transition-all">
                <div className="text-3xl mb-3">{p.emoji}</div>
                <div className="text-xl font-bold text-red-300 mb-1">{p.stat}</div>
                <div className="text-white/70 text-xs font-semibold mb-1">{p.title}</div>
                <div className="text-white/30 text-xs leading-relaxed">{p.desc}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      <section className="py-16 container mx-auto px-4">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }} variants={cv}>
          <motion.div variants={iv} className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Six Causes. One Planet.</h2>
            <p className="text-white/50 max-w-xl mx-auto text-lg">Every mission, every idea, every report is a step toward a world where all life thrives together.</p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {CAUSES.map((cause) => (
              <motion.div key={cause.href} variants={iv}>
                <a href={cause.href}>
                  <div className={`group relative overflow-hidden rounded-2xl border ${cause.border} bg-gradient-to-br ${cause.color} p-6 h-full cursor-pointer hover:scale-[1.02] transition-all duration-300 hover:shadow-[0_0_40px_rgba(16,185,129,0.1)]`}>
                    <div className="absolute inset-0 bg-gradient-to-br from-white/0 to-white/0 group-hover:from-white/[0.02] group-hover:to-white/[0.02] transition-all duration-500" />
                    <div className={`inline-block text-xs font-semibold px-3 py-1 rounded-full mb-4 ${cause.badge}`}>{cause.icon}{cause.label}</div>
                    <p className="text-white/60 text-sm leading-relaxed">{cause.desc}</p>
                    <div className="mt-6 flex items-center gap-2 text-white/40 group-hover:text-white/70 transition-colors text-sm">
                      <span>Explore</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </a>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      <section className="py-20 relative overflow-hidden bg-white/[0.02] border-y border-white/5">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(16,185,129,0.07)_0%,transparent_60%)] pointer-events-none" />
        <div className="container mx-auto px-4 max-w-4xl text-center relative z-10">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={cv}>
            <motion.div variants={iv} className="w-16 h-16 rounded-3xl bg-emerald-900/40 border border-emerald-700/40 flex items-center justify-center mx-auto mb-8">
              <Globe className="w-8 h-8 text-emerald-400" />
            </motion.div>
            <motion.h2 variants={iv} className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">हमारा संकल्प</motion.h2>
            <motion.p variants={iv} className="text-white/60 text-lg leading-relaxed mb-4 max-w-3xl mx-auto">
              हम एक ऐसी दुनिया बनाना चाहते हैं जहाँ हर शहर में साफ हवा हो, हर नदी में साफ पानी हो, हर सड़क पर जानवरों के लिए पानी हो, हर इमारत पर पेड़ हों, और हर इंसान अपनी ज़िम्मेदारी समझे।
            </motion.p>
            <motion.p variants={iv} className="text-white/40 text-base leading-relaxed max-w-2xl mx-auto">
              यह किसी एक सरकार का काम नहीं। यह हम सबका काम है — एक community, एक movement।
            </motion.p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 container mx-auto px-4">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={cv}>
          <motion.h2 variants={iv} className="text-3xl md:text-4xl font-bold text-white mb-12 text-center">🌱 हमारे Core Principles</motion.h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {PRINCIPLES.map((p) => {
              const Icon = p.icon;
              return (
                <motion.div key={p.title} variants={iv}
                  className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 text-center hover:border-white/20 transition-all">
                  <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-4">
                    <Icon className={`w-6 h-6 ${p.color}`} />
                  </div>
                  <h3 className={`font-semibold mb-2 ${p.color}`}>{p.title}</h3>
                  <p className="text-white/50 text-xs leading-relaxed">{p.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </section>

      {categoryData.length > 0 && (
        <section className="py-16 bg-white/[0.02] border-y border-white/5">
          <div className="container mx-auto px-4">
            <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={cv}
              className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div variants={iv}>
                <h2 className="text-3xl font-bold text-white mb-4">Community in Action</h2>
                <p className="text-white/50 mb-8">Ideas span every domain — from plastic-free cities to animal rescue technology. Together, we're mapping the future.</p>
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { n: totalIdeas, label: "Ideas", color: "text-emerald-400" },
                    { n: totalReports, label: "Reports", color: "text-amber-400" },
                    { n: "Soon", label: "Articles", color: "text-blue-400" },
                  ].map((s) => (
                    <div key={s.label} className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
                      <div className={`text-2xl font-bold ${s.color}`}>{s.n}</div>
                      <div className="text-xs text-white/40 mt-1">{s.label}</div>
                    </div>
                  ))}
                </div>
              </motion.div>
              <motion.div variants={iv} className="flex flex-col items-center">
                <h3 className="text-lg font-semibold text-white/70 mb-6">Ideas by Category</h3>
                <ResponsiveContainer width="100%" height={220}>
                  <PieChart>
                    <Pie data={categoryData} cx="50%" cy="50%" innerRadius={55} outerRadius={90} paddingAngle={3} dataKey="value">
                      {categoryData.map((_, i) => <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />)}
                    </Pie>
                    <Tooltip contentStyle={{ background: "hsl(152 47% 7%)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "8px", color: "white" }} />
                  </PieChart>
                </ResponsiveContainer>
                <div className="flex flex-wrap gap-3 justify-center mt-4">
                  {categoryData.map((d, i) => (
                    <div key={d.name} className="flex items-center gap-1.5 text-xs text-white/60">
                      <div className="w-2.5 h-2.5 rounded-full" style={{ background: CHART_COLORS[i % CHART_COLORS.length] }} />
                      {d.name}
                    </div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>
      )}

      {recentIdeas.length > 0 && (
        <section className="py-24 container mx-auto px-4">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={cv}>
            <motion.div variants={iv} className="flex items-center justify-between mb-12">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <Lightbulb className="w-5 h-5 text-amber-400" />
                  <span className="text-xs font-semibold uppercase tracking-widest text-amber-400/70">Community Ideas</span>
                </div>
                <h2 className="text-3xl font-bold text-white">Recent Ideas</h2>
              </div>
              <a href="/ideas" className="text-white/50 hover:text-white text-sm hidden sm:flex items-center gap-2 transition-colors">View all <ArrowRight className="w-4 h-4" /></a>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {recentIdeas.slice(0, 6).map((idea: any) => (
                <motion.div key={idea.id} variants={iv}
                  className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 hover:bg-white/[0.06] hover:border-white/20 transition-all duration-300 group">
                  <div className={`inline-block text-xs font-semibold px-2.5 py-1 rounded-full mb-4 border ${getCategoryStyle(idea.category)}`}>
                    {CATEGORY_LABELS[idea.category] ?? idea.category}
                  </div>
                  <h3 className="font-semibold text-white text-sm leading-snug mb-2 group-hover:text-emerald-300 transition-colors">{idea.title}</h3>
                  <p className="text-white/40 text-xs leading-relaxed line-clamp-3">{idea.description}</p>
                  <div className="mt-4 flex items-center justify-between text-xs text-white/30">
                    <span>{idea.authorName}</span>
                    <span className="flex items-center gap-1 text-emerald-500"><TrendingUp className="w-3 h-3" /> {idea.upvotes}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>
      )}

      {recentReports.length > 0 && (
        <section className="py-16 bg-white/[0.02] border-y border-white/5">
          <div className="container mx-auto px-4">
            <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={cv}>
              <motion.div variants={iv} className="flex items-center justify-between mb-10">
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <AlertTriangle className="w-5 h-5 text-red-400" />
                    <span className="text-xs font-semibold uppercase tracking-widest text-red-400/70">Active Reports</span>
                  </div>
                  <h2 className="text-3xl font-bold text-white">Recent Issues</h2>
                </div>
                <a href="/report" className="text-white/50 hover:text-white text-sm hidden sm:flex items-center gap-2 transition-colors">View all <ArrowRight className="w-4 h-4" /></a>
              </motion.div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {recentReports.slice(0, 4).map((report: any) => (
                  <motion.div key={report.id} variants={iv}
                    className="bg-white/[0.03] border border-white/10 rounded-xl p-5 flex gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2 flex-wrap">
                        <span className="text-xs border border-red-800/50 text-red-300 bg-red-900/20 px-2.5 py-0.5 rounded-full">{report.type}</span>
                        <span className={`text-xs px-2 py-0.5 rounded-full border ${report.status === "pending" ? "bg-yellow-900/40 text-yellow-300 border-yellow-700/50" : report.status === "in-progress" ? "bg-blue-900/40 text-blue-300 border-blue-700/50" : "bg-emerald-900/40 text-emerald-300 border-emerald-700/50"}`}>{report.status}</span>
                      </div>
                      <p className="text-white/70 text-sm line-clamp-2">{report.description}</p>
                      <p className="text-white/30 text-xs mt-2">{report.location}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
      )}

      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(16,185,129,0.12)_0%,transparent_60%)] pointer-events-none" />
        <div className="container mx-auto px-4 text-center relative z-10 max-w-3xl">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={cv}>
            <motion.div variants={iv} className="w-16 h-16 rounded-full bg-emerald-900/40 border border-emerald-700/40 flex items-center justify-center mx-auto mb-8">
              <Heart className="w-8 h-8 text-emerald-400" />
            </motion.div>
            <motion.h2 variants={iv} className="text-4xl md:text-5xl font-bold text-white mb-6">🌍 Earth Pledge</motion.h2>
            <motion.div variants={iv}
              className="bg-gradient-to-br from-emerald-900/20 to-teal-900/10 border border-emerald-800/30 rounded-2xl p-8 mb-10 text-left">
              <p className="text-white/70 text-base leading-relaxed italic text-center">
                "मैं वादा करता/करती हूँ कि मैं धरती की देखभाल करूंगा/करूंगी — न सिर्फ इंसानों के लिए, बल्कि हर उस जीव के लिए जो इस ग्रह को अपना घर मानता है। मैं छोटी-छोटी आदतें बदलूंगा/बदलूंगी, आवाज़ उठाऊंगा/उठाऊंगी, और दूसरों को inspire करूंगा/करूंगी। क्योंकि धरती सबकी है।"
              </p>
            </motion.div>
            <motion.p variants={iv} className="text-white/50 text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
              Share an idea. Report a problem. Plant a seed of change. Every action, no matter how small, is a vote for a better Earth.
            </motion.p>
            <motion.div variants={iv} className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/ideas" className="inline-flex items-center bg-emerald-600 hover:bg-emerald-500 text-white font-medium h-14 px-10 text-base rounded-xl transition-all shadow-[0_0_30px_rgba(5,150,105,0.4)] hover:shadow-[0_0_50px_rgba(5,150,105,0.6)]">Share Your Idea</a>
              <a href="/articles" className="inline-flex items-center border border-white/20 text-white hover:bg-white/5 font-medium h-14 px-10 text-base rounded-xl transition-all">Start Learning</a>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

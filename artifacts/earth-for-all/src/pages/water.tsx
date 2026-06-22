import { motion } from "framer-motion";
import { Droplets, BookOpen, Clock, Waves, AlertCircle, Lightbulb } from "lucide-react";
import { useListArticles, getListArticlesQueryKey } from "@workspace/api-client-react";

const GLOBAL_FACTS = [
  { n: "2.2 Billion", l: "लोगों को safe drinking water नहीं मिलता", sub: "यानी हर 3 में से 1 इंसान" },
  { n: "70%", l: "freshwater agriculture में जाता है", sub: "और उसका 40% बर्बाद होता है" },
  { n: "30%", l: "urban water pipeline leaks में खोता है", sub: "जो fix करना बेहद सस्ता है" },
  { n: "50%", l: "पानी बचाया जा सकता है smart irrigation से", sub: "technology already exist करती है" },
];

const INDIA_FACTS = [
  { stat: "21 शहर", desc: "2030 तक groundwater पूरी तरह खत्म हो जाएगा — Delhi, Bengaluru, Chennai सहित" },
  { stat: "600 Million", desc: "लोग India में high to extreme water stress में रहते हैं — WHO report" },
  { stat: "200,000", desc: "मौतें हर साल India में contaminated water से होती हैं" },
  { stat: "40% rivers", desc: "India की नदियाँ अब severely polluted हैं — Ganga, Yamuna, Sabarmati" },
];

const DUAL_WATER_DESIGN = {
  title: "💧 Dual-Use Water Station — आपका Original Idea",
  desc: "यह concept बेहद powerful है। एक ही infrastructure में दो level:",
  level1: "ऊपर: इंसानों के लिए standard tap (drinking height)",
  level2: "नीचे: जानवरों के लिए ground-level bowl (automatic refill)",
  benefit: "Extra cost: ₹500 प्रति station। Benefit: हर गर्मी में हजारों जानवरों की जान।",
  scale: "अगर India के 1000 cities में 1000 parks में लगाएं = 10 लाख water points = करोड़ों जानें बचेंगी।"
};

const SOLUTIONS = [
  { emoji: "🌧️", title: "Rainwater Harvesting", desc: "छत से पानी → pipe → tank → pump। एक घर 100,000 litre/साल collect कर सकता है। हर building को mandatory करना चाहिए।" },
  { emoji: "🔍", title: "AI Leak Detection", desc: "पानी के flow patterns analyze करके AI automatically pipe leaks detect करता है — repair से पहले। Cities 30% ज़्यादा पानी बचा सकती हैं।" },
  { emoji: "♻️", title: "Wastewater Recycling", desc: "Treated wastewater को irrigation, industrial cooling, toilet flushing के लिए reuse। Freshwater demand 40% कम हो जाती है।" },
  { emoji: "🌾", title: "Smart Irrigation", desc: "Soil moisture sensors पानी तब देते हैं जब ज़रूरत हो — शेड्यूल पर नहीं। Agricultural water use 50% कम।" },
  { emoji: "🦋", title: "Natural Wetlands", desc: "Constructed wetlands पानी को naturally filter करती हैं। No chemicals, no electricity — plants और bacteria मिलकर sewage को clean water बनाते हैं।" },
  { emoji: "📊", title: "Water Health Dashboard", desc: "हर शहर का real-time water quality map। Sensor data → public app → instant alerts अगर कोई नदी या तालाब polluted हो।" },
];

const RIVER_GUIDE = [
  "नदी किनारे कभी कचरा मत फेंकें",
  "Immersion ceremonies में eco-friendly materials use करें",
  "Industrial effluents की reporting करें",
  "Riparian buffer zones — नदी किनारे पेड़ लगाएं",
  "River clean-up drives organize करें",
  "Plastic bags नदी/समुद्र से 1 km दूर",
];

const iv = { hidden: { opacity: 0, y: 22 }, show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } } };
const cv = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.07 } } };

export default function Water() {
  const { data: articles } = useListArticles({ category: "water", limit: 9 }, { query: { queryKey: getListArticlesQueryKey({ category: "water", limit: 9 }) } });

  return (
    <div className="pt-24 pb-16 min-h-screen">
      {/* Hero */}
      <div className="relative overflow-hidden bg-[radial-gradient(ellipse_at_top,rgba(59,130,246,0.12)_0%,transparent_50%)] py-20">
        <div className="container mx-auto px-4 text-center max-w-4xl">
          <div className="w-20 h-20 rounded-3xl bg-blue-900/60 border border-blue-700/50 flex items-center justify-center mx-auto mb-8 shadow-[0_0_40px_rgba(59,130,246,0.2)]">
            <Droplets className="w-10 h-10 text-blue-400" />
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-300">Water for All</span>
          </h1>
          <p className="text-blue-400/80 text-lg font-medium mb-6">पानी सबका अधिकार है — इंसान हो या जानवर</p>
          <p className="text-white/50 text-lg leading-relaxed max-w-2xl mx-auto">
            पानी life है। Not just for humans — every animal, bird, fish, plant and microorganism.
            फिर भी हम इसे बर्बाद करते हैं, ज़हरीला करते हैं, और treat करते हैं जैसे यह infinite हो।
          </p>
        </div>
      </div>

      {/* Global Crisis */}
      <section className="py-12 container mx-auto px-4">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={cv}>
          <motion.h2 variants={iv} className="text-2xl font-bold text-white mb-6 text-center">🌍 Global Water Crisis</motion.h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {GLOBAL_FACTS.map((f) => (
              <motion.div key={f.l} variants={iv} className="bg-white/[0.03] border border-blue-900/40 rounded-2xl p-5 text-center">
                <div className="text-xl md:text-2xl font-bold text-blue-300 mb-1">{f.n}</div>
                <div className="text-white/60 text-xs font-medium mb-1">{f.l}</div>
                <div className="text-white/30 text-xs">{f.sub}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* India Crisis */}
      <section className="py-10 container mx-auto px-4">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={cv}>
          <motion.h2 variants={iv} className="text-2xl font-bold text-white mb-6 text-center">🇮🇳 India का Water Crisis</motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {INDIA_FACTS.map((f) => (
              <motion.div key={f.stat} variants={iv}
                className="bg-white/[0.03] border border-red-900/30 rounded-2xl p-5 flex gap-4">
                <AlertCircle className="w-8 h-8 text-red-400 shrink-0 mt-0.5" />
                <div>
                  <div className="text-lg font-bold text-red-300 mb-1">{f.stat}</div>
                  <p className="text-white/50 text-sm leading-relaxed">{f.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Dual Water Station — Original Idea Spotlight */}
      <section className="py-10 container mx-auto px-4 max-w-3xl">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={cv}>
          <motion.div variants={iv}
            className="bg-gradient-to-br from-blue-900/30 to-cyan-900/20 border border-blue-800/40 rounded-3xl p-8">
            <div className="flex items-center gap-3 mb-4">
              <Lightbulb className="w-8 h-8 text-blue-400" />
              <h2 className="text-xl font-bold text-white">{DUAL_WATER_DESIGN.title}</h2>
            </div>
            <p className="text-white/60 text-sm mb-4">{DUAL_WATER_DESIGN.desc}</p>
            <div className="space-y-3 mb-5">
              <div className="flex items-center gap-3 bg-blue-900/30 rounded-xl px-4 py-3">
                <div className="text-2xl">🚰</div>
                <div className="text-white/70 text-sm"><span className="text-blue-300 font-semibold">Level 1: </span>{DUAL_WATER_DESIGN.level1}</div>
              </div>
              <div className="flex items-center gap-3 bg-cyan-900/30 rounded-xl px-4 py-3">
                <div className="text-2xl">🐕</div>
                <div className="text-white/70 text-sm"><span className="text-cyan-300 font-semibold">Level 2: </span>{DUAL_WATER_DESIGN.level2}</div>
              </div>
            </div>
            <div className="bg-black/20 rounded-xl p-4">
              <p className="text-emerald-300 text-xs font-semibold mb-1">💰 Cost:</p>
              <p className="text-white/60 text-sm mb-3">{DUAL_WATER_DESIGN.benefit}</p>
              <p className="text-amber-300 text-xs font-semibold mb-1">🌍 Scale:</p>
              <p className="text-white/60 text-sm">{DUAL_WATER_DESIGN.scale}</p>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Solutions */}
      <section className="py-12 bg-white/[0.02] border-y border-white/5">
        <div className="container mx-auto px-4">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={cv}>
            <motion.h2 variants={iv} className="text-3xl font-bold text-white mb-10 text-center">🔧 Solutions — पानी बचाने के तरीके</motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {SOLUTIONS.map((s) => (
                <motion.div key={s.title} variants={iv}
                  className="bg-white/[0.03] border border-blue-900/30 rounded-2xl p-6 flex gap-4 hover:border-blue-700/40 transition-all">
                  <div className="text-3xl shrink-0">{s.emoji}</div>
                  <div>
                    <h3 className="font-semibold text-blue-300 mb-2">{s.title}</h3>
                    <p className="text-white/50 text-sm leading-relaxed">{s.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Rivers Guide */}
      <section className="py-12 container mx-auto px-4 max-w-2xl">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={cv}>
          <motion.h2 variants={iv} className="text-3xl font-bold text-white mb-6 text-center">
            <Waves className="w-8 h-8 inline mr-2 text-blue-400" />नदियों की रक्षा
          </motion.h2>
          <div className="grid grid-cols-1 gap-2">
            {RIVER_GUIDE.map((r, i) => (
              <motion.div key={r} variants={iv}
                className="flex items-start gap-3 bg-white/[0.03] border border-blue-900/30 rounded-xl px-4 py-3 hover:border-blue-700/40 transition-all">
                <div className="w-6 h-6 rounded-full bg-blue-900/50 border border-blue-700/50 flex items-center justify-center text-xs font-bold text-blue-400 shrink-0 mt-0.5">{i + 1}</div>
                <span className="text-white/70 text-sm">{r}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Personal Conservation */}
      <section className="py-10 bg-white/[0.02] border-y border-white/5">
        <div className="container mx-auto px-4 max-w-3xl">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={cv}>
            <motion.h2 variants={iv} className="text-2xl font-bold text-white mb-6 text-center">💧 आज से — Personal Water Conservation</motion.h2>
            <motion.div variants={iv} className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {[
                ["Dripping tap", "1 drip/sec = 3000 litre/year बर्बाद → तुरंत fix करें"],
                ["Shower vs Bucket", "4 min shower saves 60 litre vs 10 min"],
                ["Vehicle washing", "Hose नहीं, bucket use करें → 150 litre बचते हैं"],
                ["Vegetable water", "सब्जियां धोने का पानी plants को दें"],
                ["Animal water", "घर के बाहर एक कटोरी — जानवरों, पक्षियों के लिए"],
                ["Full loads", "Washing machine और dishwasher full load पर चलाएं"],
              ].map(([t, d]) => (
                <div key={t} className="bg-white/[0.03] border border-blue-900/30 rounded-xl p-4">
                  <p className="text-blue-300 text-xs font-semibold mb-1">{t}</p>
                  <p className="text-white/50 text-sm">{d}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Articles */}
      {Array.isArray(articles) && articles.length > 0 && (
        <section className="py-10 container mx-auto px-4">
          <h2 className="text-2xl font-bold text-white mb-6">📚 Related Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {articles.map((a) => (
              <div key={a.id} className="bg-white/[0.03] border border-white/10 rounded-2xl overflow-hidden hover:border-blue-700/40 transition-all group">
                <div className="h-36 bg-gradient-to-br from-blue-900/50 to-cyan-900/20 flex items-center justify-center">
                  <BookOpen className="w-10 h-10 text-blue-600/40" />
                </div>
                <div className="p-5">
                  <h3 className="font-semibold text-white text-sm leading-snug mb-2 group-hover:text-blue-300 transition-colors">{a.title}</h3>
                  <p className="text-white/40 text-xs line-clamp-2">{a.summary}</p>
                  <div className="mt-3 flex items-center gap-1.5 text-white/25 text-xs"><Clock className="w-3 h-3" />{a.readingTimeMinutes} min read</div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

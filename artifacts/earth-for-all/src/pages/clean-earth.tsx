import { motion } from "framer-motion";
import { Recycle, Trash2, Factory, Leaf, Home, Building2, Droplets, Zap, BookOpen, Clock, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import { useListArticles, getListArticlesQueryKey } from "@workspace/api-client-react";

const PROBLEMS = [
  { icon: Trash2, stat: "8 Million Tons", desc: "of plastic enter the ocean every year — one garbage truck every minute." },
  { icon: Factory, stat: "Only 9% Recycled", desc: "Of all plastic ever made, only 9% has been recycled. The rest is in landfills, oceans, or burned." },
  { icon: Leaf, stat: "Microplastics Everywhere", desc: "Found in human blood, breast milk, deep ocean trenches, Arctic ice, and rainfall." },
  { icon: Droplets, stat: "₹1 Lakh Crore/year", desc: "India loses this much annually to diseases caused by poor sanitation and waste management." },
];

const DAILY_HABITS = [
  "कचरा हमेशा सही जगह डालें — कभी सड़क पर नहीं",
  "गीला और सूखा कचरा अलग करें (Wet + Dry Segregation)",
  "प्लास्टिक का उपयोग कम करें — कपड़े का थैला रखें",
  "बार-बार इस्तेमाल होने वाली चीजें खरीदें (Reusable)",
  "टूटी चीजें मरम्मत करें — जल्दी मत फेंकें (Repair Culture)",
  "खाना बर्बाद मत करें — जरूरत के अनुसार ही बनाएं",
  "पानी और बिजली की बर्बादी रोकें",
  "पुराने कपड़े दोबारा उपयोग करें या दान करें",
  "E-waste (टूटे मोबाइल/इलेक्ट्रॉनिक) अलग जमा करें",
  "रसोई के कचरे से खाद बनाएं (Home Composting)",
  "सफाई के लिए कम हानिकारक उत्पाद अपनाएं",
  "बच्चों को सफाई की आदत सिखाएं — घर से शुरुआत",
];

const INNOVATIONS = [
  { title: "Smart Dustbins with AI", desc: "Computer vision bins that automatically sort waste and reward citizens with eco-points for correct disposal. Each bin sends fill-level data to optimize collection routes.", color: "border-emerald-800/40 text-emerald-300" },
  { title: "Zero Waste Cities", desc: "Cities like Kamikatsu, Japan achieved near-zero landfill waste through 45-category sorting. Indian cities like Indore are proving it works here too.", color: "border-teal-800/40 text-teal-300" },
  { title: "Plastic to Fuel", desc: "New pyrolysis technology converts non-recyclable plastic into diesel and petrol. 1 kg plastic = 1 litre fuel. Turns a problem into an energy resource.", color: "border-cyan-800/40 text-cyan-300" },
  { title: "Plastic Credits System", desc: "Pay coastal communities and fishermen for every kilogram of ocean plastic they collect — creating income while cleaning oceans.", color: "border-blue-800/40 text-blue-300" },
  { title: "Circular Economy Model", desc: "Design products made to be remade — packaging that becomes food for bacteria, plastics turned back into raw material in a closed loop.", color: "border-violet-800/40 text-violet-300" },
  { title: "AI Waste Sorter", desc: "Conveyor belt robots with cameras identify and sort 200+ types of materials at high speed, recovering 80% more recyclable material than manual sorting.", color: "border-purple-800/40 text-purple-300" },
];

const CITY_GUIDE = [
  { title: "घर (Home)", icon: Home, items: ["50 लीटर पानी रोज बचाएं", "दो डस्टबिन — गीला और सूखा", "छत पर वर्षा जल संग्रह", "LED बल्ब और solar charger"] },
  { title: "मोहल्ला (Neighborhood)", icon: Building2, items: ["हर 50 मीटर पर डस्टबिन", "Recycling collection point", "Animal water station", "Community composting pit"] },
  { title: "शहर (City)", icon: Building2, items: ["AI waste sorting centers", "Clean energy vehicles", "Zero plastic markets", "Urban micro-forests"] },
];

const FACTS_INDIA = [
  { n: "62 Million Tons", l: "कचरा भारत रोज पैदा करता है" },
  { n: "30%", l: "कचरे का रीसाइकल होता है — बाकी गायब" },
  { n: "1 Billion", l: "प्लास्टिक bags हर साल India में उपयोग" },
  { n: "50,000+", l: "कचरे से मरते जानवर हर साल सिर्फ प्लास्टिक खाने से" },
];

const iv = { hidden: { opacity: 0, y: 22 }, show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } } };
const cv = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.08 } } };

function ExpandableSection({ title, children }: { title: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-white/10 rounded-xl overflow-hidden">
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-white/5 transition-all">
        <span className="font-semibold text-white">{title}</span>
        {open ? <ChevronUp className="w-4 h-4 text-white/40" /> : <ChevronDown className="w-4 h-4 text-white/40" />}
      </button>
      {open && <div className="px-5 pb-5">{children}</div>}
    </div>
  );
}

export default function CleanEarth() {
  const { data: articles } = useListArticles({ category: "clean-earth", limit: 9 }, { query: { queryKey: getListArticlesQueryKey({ category: "clean-earth", limit: 9 }) } });

  return (
    <div className="pt-24 pb-16 min-h-screen">
      {/* Hero */}
      <div className="relative overflow-hidden bg-[radial-gradient(ellipse_at_top,rgba(16,185,129,0.12)_0%,transparent_50%)] py-20">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_50%,rgba(5,150,105,0.06)_0%,transparent_40%)] pointer-events-none" />
        <div className="container mx-auto px-4 text-center max-w-4xl relative z-10">
          <div className="w-20 h-20 rounded-3xl bg-emerald-900/60 border border-emerald-700/50 flex items-center justify-center mx-auto mb-8 shadow-[0_0_40px_rgba(16,185,129,0.2)]">
            <Recycle className="w-10 h-10 text-emerald-400" />
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-teal-300">Clean Earth</span>
          </h1>
          <p className="text-emerald-400/80 text-lg font-medium mb-6">सफाई सबकी जिम्मेदारी है — Academy</p>
          <p className="text-white/50 text-lg leading-relaxed max-w-2xl mx-auto">
            Plastic, waste, pollution — इनसे बचना हमारी choice है। 
            सिर्फ इंसानों के लिए नहीं — साफ धरती हर जीव का अधिकार है।
          </p>
        </div>
      </div>

      {/* India Stats */}
      <section className="py-12 container mx-auto px-4">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={cv} className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {FACTS_INDIA.map((f) => (
            <motion.div key={f.l} variants={iv} className="bg-white/[0.03] border border-red-900/30 rounded-2xl p-5 text-center">
              <div className="text-xl md:text-2xl font-bold text-red-300 mb-1">{f.n}</div>
              <div className="text-white/40 text-xs leading-relaxed">{f.l}</div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* The Problem */}
      <section className="py-12 container mx-auto px-4">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={cv}>
          <motion.h2 variants={iv} className="text-3xl font-bold text-white mb-8 text-center">🌍 Global Problem — समस्या की गहराई</motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {PROBLEMS.map((p) => {
              const Icon = p.icon;
              return (
                <motion.div key={p.stat} variants={iv} className="bg-white/[0.03] border border-red-900/30 rounded-2xl p-6 flex gap-4">
                  <div className="w-12 h-12 rounded-xl bg-red-900/30 border border-red-800/40 flex items-center justify-center shrink-0">
                    <Icon className="w-6 h-6 text-red-400" />
                  </div>
                  <div>
                    <p className="text-xl font-bold text-red-300 mb-1">{p.stat}</p>
                    <p className="text-white/50 text-sm leading-relaxed">{p.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </section>

      {/* Core Principles */}
      <section className="py-12 bg-white/[0.02] border-y border-white/5">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={cv}>
            <motion.h2 variants={iv} className="text-3xl font-bold text-white mb-6">🌱 सफाई का दर्शन</motion.h2>
            <motion.div variants={iv} className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { t: "जितना चाहिए उतना ही उपयोग", d: "Less is More — प्रकृति से लेना और लौटाना सीखें" },
                { t: "छोटी आदत, बड़ा बदलाव", d: "एक घर = एक पड़ोस = एक शहर = एक देश का बदलाव" },
                { t: "हर जीव के लिए सफाई", d: "प्लास्टिक से मरते जानवरों के लिए भी हमारी जिम्मेदारी है" },
              ].map((p) => (
                <div key={p.t} className="bg-emerald-900/20 border border-emerald-800/30 rounded-xl p-5">
                  <h3 className="font-semibold text-emerald-300 mb-2 text-sm">{p.t}</h3>
                  <p className="text-white/50 text-xs leading-relaxed">{p.d}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Daily Habits */}
      <section className="py-12 container mx-auto px-4">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={cv}>
          <motion.h2 variants={iv} className="text-3xl font-bold text-white mb-8 text-center">✅ रोज़ की आदतें — 12 Rules</motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-3xl mx-auto">
            {DAILY_HABITS.map((habit, i) => (
              <motion.div key={habit} variants={iv}
                className="flex items-start gap-3 bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 hover:border-emerald-700/40 transition-all">
                <div className="w-6 h-6 rounded-full bg-emerald-900/50 border border-emerald-700/50 flex items-center justify-center text-xs font-bold text-emerald-400 shrink-0 mt-0.5">{i + 1}</div>
                <span className="text-white/70 text-sm">{habit}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* City 3-Level Guide */}
      <section className="py-12 bg-white/[0.02] border-y border-white/5">
        <div className="container mx-auto px-4">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={cv}>
            <motion.h2 variants={iv} className="text-3xl font-bold text-white mb-10 text-center">🏙️ स्तर-दर-स्तर सफाई गाइड</motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {CITY_GUIDE.map((g) => {
                const Icon = g.icon;
                return (
                  <motion.div key={g.title} variants={iv} className="bg-white/[0.03] border border-emerald-900/30 rounded-2xl p-6">
                    <div className="flex items-center gap-3 mb-5">
                      <div className="w-10 h-10 rounded-xl bg-emerald-900/40 border border-emerald-800/50 flex items-center justify-center">
                        <Icon className="w-5 h-5 text-emerald-400" />
                      </div>
                      <h3 className="font-semibold text-white">{g.title}</h3>
                    </div>
                    <ul className="space-y-2">
                      {g.items.map((item) => (
                        <li key={item} className="flex items-start gap-2 text-white/60 text-sm">
                          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Solutions/Innovations */}
      <section className="py-12 container mx-auto px-4">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={cv}>
          <motion.h2 variants={iv} className="text-3xl font-bold text-white mb-10 text-center">🚀 Future Innovation — नई तकनीक</motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {INNOVATIONS.map((s) => (
              <motion.div key={s.title} variants={iv}
                className={`bg-white/[0.03] border ${s.color} rounded-2xl p-6 hover:bg-white/[0.05] transition-all`}>
                <h3 className="font-semibold mb-2">{s.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Expandable Deep Guide */}
      <section className="py-12 container mx-auto px-4 max-w-2xl">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={cv}>
          <motion.h2 variants={iv} className="text-3xl font-bold text-white mb-6 text-center">📖 विस्तृत गाइड</motion.h2>
          <div className="space-y-3">
            <ExpandableSection title="प्लास्टिक को कम कैसे करें? (Zero Plastic Life)">
              <ul className="space-y-2 mt-2">
                {["Shopping bag की जगह कपड़े का थैला", "Plastic bottle की जगह steel bottle", "Disposable cups की जगह steel cup", "Plastic wrap की जगह beeswax wrap", "Straws बिल्कुल बंद — stainless steel straw", "Shampoo bottle की जगह shampoo bar", "Plastic packaging वाले products कम खरीदें", "Bulk में खरीदें — कम packaging"].map(i => <li key={i} className="text-white/60 text-sm flex items-start gap-2"><div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0"/>{i}</li>)}
              </ul>
            </ExpandableSection>
            <ExpandableSection title="घर पर Composting कैसे करें?">
              <div className="text-white/60 text-sm leading-relaxed space-y-2">
                <p><span className="text-emerald-400 font-semibold">क्या डालें:</span> सब्जियों के छिलके, फलों के टुकड़े, चाय-पत्ती, अंडे के छिलके, पत्तियां</p>
                <p><span className="text-red-400 font-semibold">क्या न डालें:</span> मांस, डेयरी, तेल, बीमार पौधे</p>
                <p><span className="text-amber-400 font-semibold">प्रक्रिया:</span> एक मिट्टी का बर्तन लें → गीला-सूखा layer में डालें → हर हफ्ते मिलाएं → 2 महीने में खाद तैयार</p>
                <p><span className="text-blue-400 font-semibold">फायदा:</span> 1 परिवार = 50-70% कचरा कम + मुफ्त खाद</p>
              </div>
            </ExpandableSection>
            <ExpandableSection title="Recycling — क्या, कहाँ, कैसे?">
              <div className="grid grid-cols-2 gap-3 mt-2">
                {[
                  { c: "🟢 Green Bin", i: "गीला कचरा: सब्जी छिलके, खाना बचा, फूल" },
                  { c: "🔵 Blue Bin", i: "सूखा कचरा: कागज, डिब्बे, बोतलें, धातु" },
                  { c: "🔴 Red Bin", i: "हानिकारक: दवाइयां, बैटरी, E-waste" },
                  { c: "⚪ White Bin", i: "Sanitary: tissue, pads, diapers" },
                ].map(b => <div key={b.c} className="bg-white/5 rounded-lg p-3"><p className="text-white text-xs font-semibold mb-1">{b.c}</p><p className="text-white/50 text-xs">{b.i}</p></div>)}
              </div>
            </ExpandableSection>
          </div>
        </motion.div>
      </section>

      {/* Articles */}
      {articles && articles.length > 0 && (
        <section className="py-12 container mx-auto px-4">
          <h2 className="text-2xl font-bold text-white mb-8">📚 Related Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {articles.map((a) => (
              <div key={a.id} className="bg-white/[0.03] border border-white/10 rounded-2xl overflow-hidden hover:border-emerald-700/40 transition-all group cursor-pointer">
                <div className="h-36 bg-gradient-to-br from-emerald-900/50 to-teal-900/20 flex items-center justify-center">
                  <BookOpen className="w-10 h-10 text-emerald-600/40" />
                </div>
                <div className="p-5">
                  <h3 className="font-semibold text-white text-sm leading-snug mb-2 group-hover:text-emerald-300 transition-colors">{a.title}</h3>
                  <p className="text-white/40 text-xs line-clamp-2">{a.summary}</p>
                  <div className="mt-3 flex items-center gap-1.5 text-white/25 text-xs"><Clock className="w-3 h-3" />{a.readingTimeMinutes} min read</div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-12 container mx-auto px-4 max-w-2xl text-center">
        <div className="bg-gradient-to-br from-emerald-900/30 to-teal-900/20 border border-emerald-800/40 rounded-3xl p-10">
          <h2 className="text-2xl font-bold text-white mb-3">🌍 आज से शुरुआत करें</h2>
          <p className="text-white/60 mb-6 text-sm leading-relaxed">हर बड़ा बदलाव एक छोटे कदम से शुरू होता है। आज एक आदत बदलें — कल एक पड़ोस, परसों एक शहर।</p>
          <div className="inline-block bg-emerald-600 hover:bg-emerald-500 text-white px-8 py-3 rounded-xl font-semibold cursor-pointer transition-all text-sm">
            अपना आइडिया शेयर करें →
          </div>
        </div>
      </section>
    </div>
  );
}

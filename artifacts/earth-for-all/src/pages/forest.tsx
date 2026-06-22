import { motion } from "framer-motion";
import { TreePine, BookOpen, Clock, Leaf, Mountain } from "lucide-react";
import { useListArticles, getListArticlesQueryKey } from "@workspace/api-client-react";

const FACTS = [
  { number: "15 Billion", label: "पेड़ हर साल काटे जाते हैं — दुनिया में", sub: "हम केवल 5 billion रोपते हैं। घाटा 10 billion/साल।" },
  { number: "80%", label: "ज़मीनी जानवर जंगल में रहते हैं", sub: "जंगल खत्म = वो जानवर खत्म।" },
  { number: "2.6 Billion", label: "लोग जंगलों पर निर्भर हैं", sub: "आजीविका, खाना, पानी — सब जंगल से।" },
  { number: "1.5°C", label: "तापमान वृद्धि जंगल रोक रहे हैं", sub: "Carbon sink के बिना धरती जल जाएगी।" },
];

const TREE_BENEFITS = [
  { t: "1 पेड़ = 100 किलो CO₂/साल", d: "एक बड़ा पेड़ 100 kg carbon absorb करता है — एक कार की 6 महीने की drive के बराबर।" },
  { t: "1 पेड़ = 100 लोगों को ऑक्सीजन", d: "एक mature tree पर्याप्त oxygen produce करता है जो 100 लोगों के लिए एक दिन काफी हो।" },
  { t: "1 पेड़ = 10 AC का काम", d: "एक बड़ा पेड़ उतनी ठंडक देता है जितनी 10 room air conditioners — बिना electricity के।" },
  { t: "1 पेड़ = 100+ जीवों का घर", d: "एक पुराना पेड़ पक्षियों, कीड़ों, छोटे जानवरों सहित 100+ प्रजातियों का आवास है।" },
  { t: "1 पेड़ = 1000 लीटर पानी/साल", d: "जड़ें पानी ज़मीन में रोकती हैं, पत्तियां fog capture करती हैं, बारिश लाती हैं।" },
  { t: "100 साल = पुराना पेड़", d: "एक 100 साल का पेड़ 10 नए पेड़ों से ज़्यादा valuable है। एक बार कट गया, सदी लग जाएगी।" },
];

const SOLUTIONS = [
  { emoji: "🌳", title: "Urban Micro-Forest (Miyawaki Method)", desc: "एक parking lot की जगह में 2 साल में घना जंगल। Japanese method में native species को 10x speed पर लगाया जाता है। Delhi, Bengaluru, Mumbai में already शुरू।" },
  { emoji: "🏠", title: "Rooftop & Balcony Forests", desc: "हर छत एक संभावित जंगल है। Rooftop gardens: heat island effect कम करते हैं, birds को habitat देते हैं, food grow करते हैं, mental health सुधारते हैं।" },
  { emoji: "🌊", title: "River Forest Corridors", desc: "हर नदी के दोनों किनारों पर 50-meter green belt — जो wildlife highway बनाते हैं। Animal migration के लिए connected habitat।" },
  { emoji: "🏛️", title: "Old Tree Protection Law", desc: "100 साल पुराने पेड़ को legal protection चाहिए। उनकी value — carbon storage, biodiversity, cooling — अतुलनीय है। कानून बनाओ।" },
  { emoji: "🏫", title: "School Forest Program", desc: "हर school में एक छोटा जंगल। जो बच्चे पेड़ उगाते हैं वो बड़े होकर पेड़ काटने नहीं देते। Education = future protection।" },
  { emoji: "🌱", title: "Community Nurseries", desc: "हर मोहल्ले में free seed library और sapling nursery। पेड़ लगाना सबके लिए accessible — सिर्फ अमीरों के लिए नहीं।" },
  { emoji: "🏙️", title: "Vertical Forests", desc: "High-rise buildings covered in greenery — सैकड़ों trees per floor। Oxygen production, cooling, bird habitat, beauty। Milan, Singapore में proven।" },
  { emoji: "📱", title: "Tree Monitoring App", desc: "GPS tag पर हर planted tree। App दिखाए कौन से पेड़ लगाए, कौन से survive किए, कहाँ पानी चाहिए। Accountability + gamification।" },
];

const WHAT_YOU_CAN = [
  "हर साल कम से कम 1 पेड़ लगाएं — जन्मदिन पर ज़रूर",
  "अपने घर/दफ्तर के पास के पेड़ों को पानी दें",
  "अपने इलाके में tree cutting की रिपोर्ट करें",
  "Recycled या sustainably sourced wood products चुनें",
  "घर में बालकनी/खिड़की पर पौधे लगाएं",
  "शहर में tree-planting drives में participate करें",
  "बच्चों के साथ जाएं और पेड़ लगाएं — life lesson",
  "Miyawaki forest project को support करें अपने शहर में",
  "पुराने पेड़ों के बारे में local authority को लिखें",
];

const iv = { hidden: { opacity: 0, y: 22 }, show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } } };
const cv = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.07 } } };

export default function Forest() {
  const { data: articles } = useListArticles({ category: "forest", limit: 9 }, { query: { queryKey: getListArticlesQueryKey({ category: "forest", limit: 9 }) } });

  return (
    <div className="pt-24 pb-16 min-h-screen">
      {/* Hero */}
      <div className="relative overflow-hidden bg-[radial-gradient(ellipse_at_top,rgba(22,163,74,0.12)_0%,transparent_50%)] py-20">
        <div className="container mx-auto px-4 text-center max-w-4xl">
          <div className="w-20 h-20 rounded-3xl bg-green-900/60 border border-green-700/50 flex items-center justify-center mx-auto mb-8 shadow-[0_0_40px_rgba(22,163,74,0.2)]">
            <TreePine className="w-10 h-10 text-green-400" />
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-emerald-300">Forest & Nature</span>
          </h1>
          <p className="text-green-400/80 text-lg font-medium mb-6">पेड़ लगाओ, ज़िंदगी बचाओ</p>
          <p className="text-white/50 text-lg leading-relaxed max-w-2xl mx-auto">
            जंगल सिर्फ पेड़ नहीं हैं। वो धरती के फेफड़े हैं, लाखों प्रजातियों का घर हैं, 
            और हमारी civilization की नींव हैं। इन्हें खोना सिर्फ environmental loss नहीं — existential threat है।
          </p>
        </div>
      </div>

      {/* Key Facts */}
      <section className="py-12 container mx-auto px-4">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={cv} className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {FACTS.map((f) => (
            <motion.div key={f.label} variants={iv} className="bg-white/[0.03] border border-green-900/40 rounded-2xl p-5 text-center">
              <div className="text-xl md:text-2xl font-bold text-green-300 mb-1">{f.number}</div>
              <div className="text-white/60 text-xs font-medium mb-1">{f.label}</div>
              <div className="text-white/30 text-xs">{f.sub}</div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Why Trees Matter */}
      <section className="py-12 bg-white/[0.02] border-y border-white/5">
        <div className="container mx-auto px-4">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={cv}>
            <motion.h2 variants={iv} className="text-3xl font-bold text-white mb-10 text-center">🌳 एक पेड़ की ताकत — 6 Facts</motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {TREE_BENEFITS.map((b) => (
                <motion.div key={b.t} variants={iv}
                  className="bg-white/[0.03] border border-green-900/30 rounded-2xl p-6 hover:border-green-700/40 transition-all">
                  <h3 className="font-bold text-green-300 text-base mb-2">{b.t}</h3>
                  <p className="text-white/50 text-sm leading-relaxed">{b.d}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Solutions */}
      <section className="py-14 container mx-auto px-4">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={cv}>
          <motion.h2 variants={iv} className="text-3xl font-bold text-white mb-10 text-center">🌱 जंगल वापस लाने के तरीके</motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {SOLUTIONS.map((s) => (
              <motion.div key={s.title} variants={iv}
                className="bg-white/[0.03] border border-green-900/30 rounded-2xl p-6 flex gap-4 hover:border-green-700/40 transition-all">
                <div className="text-3xl shrink-0">{s.emoji}</div>
                <div>
                  <h3 className="font-semibold text-white mb-2">{s.title}</h3>
                  <p className="text-white/50 text-sm leading-relaxed">{s.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Miyawaki Method Spotlight */}
      <section className="py-12 container mx-auto px-4 max-w-3xl">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={cv}>
          <motion.div variants={iv}
            className="bg-gradient-to-br from-green-900/30 to-emerald-900/20 border border-green-800/40 rounded-3xl p-8">
            <div className="flex items-center gap-3 mb-4">
              <Mountain className="w-8 h-8 text-green-400" />
              <h2 className="text-2xl font-bold text-white">🔬 Miyawaki Method — क्या है?</h2>
            </div>
            <p className="text-white/70 leading-relaxed mb-5 text-sm">
              Japanese botanist Akira Miyawaki की technique में native species के seedlings को बहुत पास-पास लगाया जाता है।
              Plants एक-दूसरे से compete करते हैं → 10x तेज़ growth → 30x ज़्यादा biodiversity → 100x ज़्यादा carbon absorption।
            </p>
            <div className="grid grid-cols-3 gap-4">
              {[["2 साल", "में जंगल तैयार"], ["10x", "तेज़ growth"], ["30x", "ज़्यादा biodiversity"]].map(([n, l]) => (
                <div key={n} className="bg-black/20 rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-green-300">{n}</div>
                  <div className="text-white/40 text-xs mt-1">{l}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* What YOU can do */}
      <section className="py-12 container mx-auto px-4 max-w-2xl">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={cv}>
          <motion.h2 variants={iv} className="text-3xl font-bold text-white mb-6 text-center">🌱 आप क्या कर सकते हैं</motion.h2>
          <div className="grid grid-cols-1 gap-2">
            {WHAT_YOU_CAN.map((a, i) => (
              <motion.div key={a} variants={iv}
                className="flex items-start gap-3 bg-white/[0.03] border border-green-900/30 rounded-xl px-4 py-3 hover:border-green-700/40 transition-all">
                <div className="w-6 h-6 rounded-full bg-green-900/50 border border-green-700/50 flex items-center justify-center text-xs font-bold text-green-400 shrink-0 mt-0.5">{i + 1}</div>
                <span className="text-white/70 text-sm">{a}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Articles */}
      {Array.isArray(articles) && articles.length > 0 && (
        <section className="py-10 container mx-auto px-4">
          <h2 className="text-2xl font-bold text-white mb-6">📚 Related Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {articles.map((a) => (
              <div key={a.id} className="bg-white/[0.03] border border-white/10 rounded-2xl overflow-hidden hover:border-green-700/40 transition-all group">
                <div className="h-36 bg-gradient-to-br from-green-900/50 to-emerald-900/20 flex items-center justify-center">
                  <BookOpen className="w-10 h-10 text-green-600/40" />
                </div>
                <div className="p-5">
                  <h3 className="font-semibold text-white text-sm leading-snug mb-2 group-hover:text-green-300 transition-colors">{a.title}</h3>
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

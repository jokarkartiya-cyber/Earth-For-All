import { motion } from "framer-motion";
import { Zap, Cpu, Wifi, Sun, BookOpen, Clock, Eye, MapPin, Leaf, Building2 } from "lucide-react";
import { useListArticles, getListArticlesQueryKey } from "@workspace/api-client-react";

const INNOVATIONS = [
  {
    icon: Eye,
    title: "AI Animal Detection & Rescue",
    category: "Wildlife Tech",
    desc: "Cameras trained on thousands of animal images automatically identify injured, sick, or trapped animals on city streets and send real-time alerts to rescue teams within 30 seconds.",
    impact: "Response time: 30 min → 5 min",
    color: "border-indigo-800/40 bg-indigo-900/10",
    tag: "text-indigo-300 bg-indigo-900/30 border-indigo-700/40"
  },
  {
    icon: Wifi,
    title: "Pollution Sensor Networks",
    category: "Smart City",
    desc: "Low-cost IoT sensors on school rooftops, bus stops, and street lights monitor air, water, and noise pollution continuously — creating real-time open maps for every city.",
    impact: "₹5,000 sensor → city-wide data",
    color: "border-purple-800/40 bg-purple-900/10",
    tag: "text-purple-300 bg-purple-900/30 border-purple-700/40"
  },
  {
    icon: Sun,
    title: "Solar Animal Water Stations",
    category: "Animal Welfare",
    desc: "Solar panels power water pumps and automatic filling systems for street animals — zero electricity cost, deployable anywhere. Refills automatically when level drops.",
    impact: "50+ animals served per station/day",
    color: "border-amber-800/40 bg-amber-900/10",
    tag: "text-amber-300 bg-amber-900/30 border-amber-700/40"
  },
  {
    icon: Cpu,
    title: "AI Waste Sorting Robots",
    category: "Clean Earth",
    desc: "Conveyor belt robots with cameras identify 200+ material types and sort recyclables at high speed — recovering 80% more recyclable material than manual sorting. Already in Surat.",
    impact: "80% more recycling efficiency",
    color: "border-emerald-800/40 bg-emerald-900/10",
    tag: "text-emerald-300 bg-emerald-900/30 border-emerald-700/40"
  },
  {
    icon: MapPin,
    title: "Real-Time Environmental Dashboard",
    category: "Data for Earth",
    desc: "A city dashboard showing live air quality, water quality, tree density, animal reports, and plastic hotspots — all in one map. Citizens see problems. Government acts faster.",
    impact: "Transparency → faster action",
    color: "border-teal-800/40 bg-teal-900/10",
    tag: "text-teal-300 bg-teal-900/30 border-teal-700/40"
  },
  {
    icon: Leaf,
    title: "Tree Health Monitoring",
    category: "Forest Tech",
    desc: "GPS-tagged trees with soil moisture and health sensors. App shows which trees need water, which are diseased, which are being illegally cut. Automated logging alerts.",
    impact: "3x tree survival rate improvement",
    color: "border-green-800/40 bg-green-900/10",
    tag: "text-green-300 bg-green-900/30 border-green-700/40"
  },
];

const FUTURE_CITY = [
  { emoji: "💡", title: "Animal-Safe Street Lighting", desc: "Warm amber LED (2700K) बजाय harsh white LEDs के। Bats, birds, insects disoriented नहीं होते। Netherlands में proven — insect deaths 60% कम।" },
  { emoji: "🌉", title: "Wildlife Crossing Bridges (Ecoducts)", desc: "Highways के ऊपर जानवरों के लिए dedicated overpasses। Bandipur Tiger Reserve, NH-7 — India में शुरू हो गया। Roadkill 90% कम।" },
  { emoji: "🏗️", title: "Vertical Forests (Bosco Verticale)", desc: "Buildings जो trees से ढकी हों। Milan में एक building = 800 trees। Cooling, oxygen, bird habitat — सब एक structure में।" },
  { emoji: "🚗", title: "Zero-Emission City Zones", desc: "City centers में combustion vehicles बंद। Pollution sensors automatic enforcement करें। Clean air as a citizen right — not a privilege।" },
  { emoji: "🌧️", title: "Sponge Cities", desc: "Roads और rooftops जो rainwater absorb करते हैं। Underground tanks में store। Drought में use। Flooding कम। Shanghai, Tokyo में proven।" },
  { emoji: "🤖", title: "AI Urban Planning", desc: "AI decide करे कहाँ parks हों, कहाँ trees हों, कहाँ animal zones हों — data-driven, not politician-driven। Urban heat maps + biodiversity maps।" },
  { emoji: "📡", title: "Citizen Science Networks", desc: "Every citizen with a smartphone = a pollution/biodiversity monitor। Crowdsourced real-time data — birds spotted, plastic found, animals seen — creates living database।" },
  { emoji: "♻️", title: "Circular Economy Infrastructure", desc: "Every product designed for disassembly और reuse। Repair cafes, material banks, product-as-service। The city becomes its own resource mine।" },
];

const AI_IDEAS = [
  { q: "मेरे इलाके को साफ कैसे रखें?", a: "Location-specific waste management plan + nearest recycling centers + volunteer groups near you" },
  { q: "किस जानवर को क्या मदद चाहिए?", a: "Species-specific care guide + nearest rescue center + emergency contact + first aid steps" },
  { q: "मैं प्लास्टिक कम कैसे करूं?", a: "Personalized zero-plastic challenge + product alternatives + 30-day habit tracker" },
  { q: "मेरे शहर में कितना pollution है?", a: "Live AQI + water quality + noise data + comparison with healthy levels" },
];

const iv = { hidden: { opacity: 0, y: 22 }, show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } } };
const cv = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.07 } } };

export default function Technology() {
  const { data: articles } = useListArticles({ category: "technology", limit: 9 }, { query: { queryKey: getListArticlesQueryKey({ category: "technology", limit: 9 }) } });

  return (
    <div className="pt-24 pb-16 min-h-screen">
      {/* Hero */}
      <div className="relative overflow-hidden bg-[radial-gradient(ellipse_at_top,rgba(99,102,241,0.12)_0%,transparent_50%)] py-20">
        <div className="container mx-auto px-4 text-center max-w-4xl">
          <div className="w-20 h-20 rounded-3xl bg-indigo-900/60 border border-indigo-700/50 flex items-center justify-center mx-auto mb-8 shadow-[0_0_40px_rgba(99,102,241,0.2)]">
            <Zap className="w-10 h-10 text-indigo-400" />
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-300">Innovation Lab</span>
          </h1>
          <p className="text-indigo-400/80 text-lg font-medium mb-6">Technology सबके लिए — सिर्फ इंसानों के लिए नहीं</p>
          <p className="text-white/50 text-lg leading-relaxed max-w-2xl mx-auto">
            Technology nature की दुश्मन नहीं है। सही तरीके से use करें तो यह nature का 
            सबसे powerful ally बन सकती है जो कभी था।
          </p>
        </div>
      </div>

      {/* Vision statement */}
      <section className="py-8 container mx-auto px-4 max-w-3xl">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="bg-gradient-to-r from-indigo-900/30 to-purple-900/20 border border-indigo-800/30 rounded-2xl p-6 text-center">
          <p className="text-white/70 text-base leading-relaxed italic">
            "हमने दुनिया को इंसानों की सुविधा के हिसाब से design किया है। अगला कदम ऐसी दुनिया बनाना है जहाँ 
            इंसान, जानवर, पक्षी, पेड़-पौधे और प्रकृति — सभी की ज़रूरतों को ध्यान में रखकर technology बनाई जाए।"
          </p>
        </motion.div>
      </section>

      {/* Key Innovations */}
      <section className="py-12 container mx-auto px-4">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={cv}>
          <motion.h2 variants={iv} className="text-3xl font-bold text-white mb-10 text-center">🤖 6 Game-Changing Technologies</motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {INNOVATIONS.map((inn) => {
              const Icon = inn.icon;
              return (
                <motion.div key={inn.title} variants={iv}
                  className={`border ${inn.color} rounded-2xl p-6 hover:bg-white/[0.02] transition-all`}>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                      <Icon className="w-6 h-6 text-white/60" />
                    </div>
                    <div className="flex-1">
                      <div className={`inline-block text-xs font-semibold px-2 py-0.5 rounded-full border mb-2 ${inn.tag}`}>{inn.category}</div>
                      <h3 className="font-semibold text-white mb-2">{inn.title}</h3>
                      <p className="text-white/50 text-sm leading-relaxed mb-3">{inn.desc}</p>
                      <div className="flex items-center gap-2 text-xs">
                        <span className="text-emerald-400 font-semibold">Impact:</span>
                        <span className="text-white/40">{inn.impact}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </section>

      {/* Future Cities */}
      <section className="py-14 bg-white/[0.02] border-y border-white/5">
        <div className="container mx-auto px-4">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={cv}>
            <motion.div variants={iv} className="text-center mb-10">
              <Building2 className="w-10 h-10 text-indigo-400 mx-auto mb-3" />
              <h2 className="text-3xl font-bold text-white">🏙️ Future City Design — सभी जीवों के लिए</h2>
              <p className="text-white/40 mt-2 text-sm">आज cities इंसानों के लिए बनती हैं। भविष्य में सबके लिए बनेंगी।</p>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {FUTURE_CITY.map((f) => (
                <motion.div key={f.title} variants={iv}
                  className="bg-white/[0.03] border border-indigo-900/30 rounded-2xl p-5 hover:border-indigo-700/40 transition-all">
                  <div className="text-3xl mb-3">{f.emoji}</div>
                  <h3 className="font-semibold text-indigo-300 text-sm mb-2">{f.title}</h3>
                  <p className="text-white/50 text-xs leading-relaxed">{f.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Earth AI Assistant Preview */}
      <section className="py-14 container mx-auto px-4 max-w-3xl">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={cv}>
          <motion.div variants={iv} className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white">🤖 Earth AI Assistant</h2>
            <p className="text-white/40 mt-2 text-sm">Vision: एक AI जो environment के बारे में हर सवाल का जवाब दे</p>
          </motion.div>
          <div className="space-y-4">
            {AI_IDEAS.map((idea) => (
              <motion.div key={idea.q} variants={iv} className="bg-white/[0.03] border border-white/10 rounded-2xl overflow-hidden">
                <div className="bg-indigo-900/20 px-5 py-3 flex items-center gap-3">
                  <div className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center text-xs">👤</div>
                  <p className="text-white/100 text-sm font-medium">"{idea.q}"</p>
                </div>
                <div className="bg-emerald-900/10 px-5 py-3 flex items-start gap-3">
                  <div className="w-7 h-7 rounded-full bg-emerald-900/40 border border-emerald-700/40 flex items-center justify-center text-xs shrink-0">🤖</div>
                  <p className="text-white/60 text-sm">{idea.a}</p>
                </div>
              </motion.div>
            ))}
          </div>
          <motion.div variants={iv} className="mt-6 text-center">
            <div className="inline-block bg-indigo-900/40 border border-indigo-700/40 text-indigo-300 px-6 py-3 rounded-xl text-sm font-medium">
              🚀 Coming Soon — Earth AI Assistant
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Articles */}
      {Array.isArray(articles) && articles.length > 0 && (
        <section className="py-10 container mx-auto px-4">
          <h2 className="text-2xl font-bold text-white mb-6">📚 Related Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {articles.map((a) => (
              <div key={a.id} className="bg-white/[0.03] border border-white/10 rounded-2xl overflow-hidden hover:border-indigo-700/40 transition-all group">
                <div className="h-36 bg-gradient-to-br from-indigo-900/50 to-purple-900/20 flex items-center justify-center">
                  <BookOpen className="w-10 h-10 text-indigo-600/40" />
                </div>
                <div className="p-5">
                  <h3 className="font-semibold text-white text-sm leading-snug mb-2 group-hover:text-indigo-300 transition-colors">{a.title}</h3>
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

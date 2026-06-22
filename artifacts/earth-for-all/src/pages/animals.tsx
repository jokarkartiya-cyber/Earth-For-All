import { motion } from "framer-motion";
import { Shield, Droplets, Utensils, Zap, BookOpen, Clock, Heart, Camera, AlertTriangle } from "lucide-react";
import { useState } from "react";
import { useListArticles, getListArticlesQueryKey } from "@workspace/api-client-react";
import { Link } from "wouter";

const PROBLEMS = [
  { emoji: "🥵", title: "प्यास और भूख", desc: "गर्मियों में लाखों सड़क जानवर पानी के बिना तड़पते हैं। सिर्फ एक कटोरी पानी हर दिन एक जान बचा सकता है।", color: "border-amber-800/40" },
  { emoji: "🚗", title: "सड़क दुर्घटनाएं", desc: "भारत में हर साल लाखों जानवर वाहनों से टकराते हैं। Animal Crossing और speed bumps से 90% दुर्घटनाएं कम हो सकती हैं।", color: "border-red-800/40" },
  { emoji: "🏠", title: "आवास खत्म होना", desc: "शहर बढ़ रहे हैं, जंगल सिकुड़ रहे हैं। जानवरों के पास रहने की जगह नहीं — वे इंसानों के बीच आने को मजबूर हैं।", color: "border-orange-800/40" },
  { emoji: "🛍️", title: "Plastic से नुकसान", desc: "गायें, कुत्ते, पक्षी — सब प्लास्टिक खा लेते हैं। हर साल 50,000+ जानवर सिर्फ plastic ingestion से मरते हैं।", color: "border-purple-800/40" },
];

const HUNDRED_IDEAS = [
  { group: "💧 पानी और भोजन (1–20)", color: "emerald", items: [
    "हर मोहल्ले में साफ पानी के बर्तन रखना",
    "गर्मी में छायादार Animal Water Station बनाना",
    "नलों के नीचे जानवरों के लिए छोटी ट्रे डिज़ाइन करना",
    "पार्कों में Animal Water Points बनाना",
    "पक्षियों के लिए ऊंचाई पर पानी के बर्तन लगाना",
    "पक्षियों के लिए दाना Station बनाना",
    "बारिश और धूप से बचाव वाले Feeding Station",
    "Solar से चलने वाले Animal Water Station",
    "Smart Water Station जो level बनाए रखें",
    "Animal Water Map — जहाँ पानी है वो दिखाएं",
  ]},
  { group: "🏠 आश्रय (21–40)", color: "amber", items: [
    "सड़क जानवरों के लिए छोटे Shelter बनाना",
    "गर्मी-सर्दी से बचाव वाले घर",
    "पक्षियों के लिए घोंसले लगाना",
    "Bird Friendly Buildings डिज़ाइन करना",
    "बारिश में जानवरों के लिए अस्थायी छत",
    "Animal Rest Zones बनाना",
    "शहर की योजना में Animal Zones शामिल करना",
    "पेड़-पौधे बचाकर पक्षियों के घरों की रक्षा",
    "Recycled material से Animal Houses",
    "निर्माण में जानवरों के आवास का ध्यान",
  ]},
  { group: "🚑 बचाव और सुरक्षा (41–60)", color: "red", items: [
    "घायल जानवरों की सूचना वाला App",
    "Local स्वयंसेवक बचाव समूह",
    "Animal Ambulance Network को बढ़ावा",
    "Animal Crossing क्षेत्र बनाना",
    "रात में जानवर दिखाने वाली सड़क तकनीक",
    "खुले गड्ढे ढकना ताकि जानवर न गिरें",
    "प्लास्टिक खुला न छोड़ना",
    "बिजली के तारों की सुरक्षा",
    "आपदा में पशु बचाव योजना",
    "Drone से Animal Search & Rescue",
  ]},
  { group: "🤖 Technology (81–100)", color: "indigo", items: [
    "AI से घायल जानवरों की पहचान",
    "Smart Camera से Animal Movement ट्रैक करना",
    "Solar आधारित Animal Water Station",
    "Animal Friendly Smart Cities",
    "जानवरों के लिए सुरक्षित पुल और Underpass",
    "पक्षियों के लिए सुरक्षित कांच डिज़ाइन",
    "Smart Feeding Machine",
    "AI Animal Help Map",
    "Global Animal Protection Network",
    "Animal Safety Sensors",
  ]},
];

const TECH_SOLUTIONS = [
  { icon: Droplets, title: "Dual-Use Water Station", desc: "ऊपर इंसानों के लिए नल, नीचे जानवरों के लिए पानी का बर्तन। एक ही infrastructure — दो जिंदगियां बचती हैं। Solar powered। हर पार्क, हर सड़क।", color: "border-blue-800/40 bg-blue-900/10" },
  { icon: Camera, title: "AI Injury Detection Camera", desc: "Cameras trained on thousands of animal images — automatically identify injured animals on city streets, send real-time alerts to rescue volunteers. No human monitoring needed.", color: "border-purple-800/40 bg-purple-900/10" },
  { icon: Utensils, title: "Smart Feeding Station", desc: "AI-monitored feeding points track animal health, flag sick animals, alert volunteers — all solar powered. Can serve 50+ animals daily with automatic refilling.", color: "border-amber-800/40 bg-amber-900/10" },
  { icon: Zap, title: "Animal-Safe Street Lights", desc: "Warm amber LED (2700K) instead of harsh white — doesn't disorient bats, birds, and insects. Reduces insect deaths by 60%. Already used in Netherlands highways.", color: "border-yellow-800/40 bg-yellow-900/10" },
  { icon: Shield, title: "Wildlife Crossing Bridges", desc: "Dedicated overpasses and underpasses for animals to cross highways safely. Proven to reduce roadkill by 90% — Netherlands, Canada, India (NH-7) all using them.", color: "border-green-800/40 bg-green-900/10" },
  { icon: Heart, title: "Animal Rescue Drone", desc: "GPS-equipped drones patrol city parks at dawn and dusk when animals are most active, spotting injured or trapped animals and guiding rescue teams to exact locations.", color: "border-rose-800/40 bg-rose-900/10" },
];

const iv = { hidden: { opacity: 0, y: 22 }, show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } } };
const cv = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.07 } } };

const COLOR_MAP: Record<string, string> = {
  emerald: "border-emerald-800/30 text-emerald-400 bg-emerald-900/20",
  amber: "border-amber-800/30 text-amber-400 bg-amber-900/20",
  red: "border-red-800/30 text-red-400 bg-red-900/20",
  indigo: "border-indigo-800/30 text-indigo-400 bg-indigo-900/20",
};

export default function Animals() {
  const [activeGroup, setActiveGroup] = useState(0);
  const { data: articles } = useListArticles({ category: "animal-welfare", limit: 9 }, { query: { queryKey: getListArticlesQueryKey({ category: "animal-welfare", limit: 9 }) } });

  return (
    <div className="pt-24 pb-16 min-h-screen">
      {/* Hero */}
      <div className="relative overflow-hidden bg-[radial-gradient(ellipse_at_top,rgba(245,158,11,0.12)_0%,transparent_50%)] py-20">
        <div className="container mx-auto px-4 text-center max-w-4xl">
          <div className="w-20 h-20 rounded-3xl bg-amber-900/60 border border-amber-700/50 flex items-center justify-center mx-auto mb-8 shadow-[0_0_40px_rgba(245,158,11,0.2)]">
            <Shield className="w-10 h-10 text-amber-400" />
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-400 to-orange-300">Animal First</span>
          </h1>
          <p className="text-amber-400/80 text-lg font-medium mb-6">जानवर बोल नहीं सकते — हमें बोलना होगा</p>
          <p className="text-white/50 text-lg leading-relaxed max-w-2xl mx-auto">
            जानवर vote नहीं कर सकते, organize नहीं कर सकते, rights demand नहीं कर सकते।
            वो बस चुपचाप suffer कर सकते हैं — जब तक हम सुनना न चाहें।
          </p>
        </div>
      </div>

      {/* Problems */}
      <section className="py-14 container mx-auto px-4">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={cv}>
          <motion.h2 variants={iv} className="text-3xl font-bold text-white mb-10 text-center">😢 रोज़ क्या झेलते हैं जानवर</motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {PROBLEMS.map((p) => (
              <motion.div key={p.title} variants={iv} className={`bg-white/[0.03] border ${p.color} rounded-2xl p-6 flex gap-4`}>
                <div className="text-3xl shrink-0">{p.emoji}</div>
                <div>
                  <h3 className="font-semibold text-white text-lg mb-2">{p.title}</h3>
                  <p className="text-white/50 text-sm leading-relaxed">{p.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* 100 Ideas Interactive */}
      <section className="py-14 bg-white/[0.02] border-y border-white/5">
        <div className="container mx-auto px-4">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={cv}>
            <motion.div variants={iv} className="text-center mb-10">
              <h2 className="text-3xl font-bold text-white mb-2">💡 100 Animal Help Ideas</h2>
              <p className="text-white/40 text-sm">आपकी vision का पूरा blueprint — हर idea, हर solution</p>
            </motion.div>
            {/* Group tabs */}
            <div className="flex flex-wrap gap-3 justify-center mb-8">
              {HUNDRED_IDEAS.map((g, i) => (
                <button key={g.group} onClick={() => setActiveGroup(i)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all border ${activeGroup === i ? "bg-white/15 text-white border-white/30" : "border-white/10 text-white/50 hover:text-white"}`}>
                  {g.group.split(" (")[0]}
                </button>
              ))}
            </div>
            <motion.div key={activeGroup} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-3xl mx-auto">
              {HUNDRED_IDEAS[activeGroup].items.map((item, i) => (
                <div key={item} className={`flex items-start gap-3 border ${COLOR_MAP[HUNDRED_IDEAS[activeGroup].color]} rounded-xl px-4 py-3`}>
                  <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-xs font-bold text-white/60 shrink-0 mt-0.5">{i + 1}</div>
                  <span className="text-white/70 text-sm">{item}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Tech Solutions */}
      <section className="py-14 container mx-auto px-4">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={cv}>
          <motion.h2 variants={iv} className="text-3xl font-bold text-white mb-10 text-center">🤖 Technology for Animals</motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {TECH_SOLUTIONS.map((s) => {
              const Icon = s.icon;
              return (
                <motion.div key={s.title} variants={iv}
                  className={`border ${s.color} rounded-2xl p-6 flex gap-5 hover:bg-white/[0.03] transition-all`}>
                  <div className="w-12 h-12 rounded-xl bg-amber-900/30 border border-amber-800/40 flex items-center justify-center shrink-0">
                    <Icon className="w-6 h-6 text-amber-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white mb-2">{s.title}</h3>
                    <p className="text-white/50 text-sm leading-relaxed">{s.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </section>

      {/* What YOU can do */}
      <section className="py-14 bg-white/[0.02] border-y border-white/5">
        <div className="container mx-auto px-4 max-w-2xl">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={cv}>
            <motion.h2 variants={iv} className="text-3xl font-bold text-white mb-8 text-center">❤️ आप अभी क्या कर सकते हैं?</motion.h2>
            <div className="grid grid-cols-1 gap-2">
              {[
                "घर के बाहर एक कटोरी पानी रखें — रोज़ भरें",
                "पक्षियों के लिए दाना और पानी की छोटी ट्रे छत पर",
                "घायल जानवर देखें तो helpline call करें या report करें",
                "गाड़ी चलाते वक्त जानवरों के पास धीमी speed",
                "प्लास्टिक bags खुला मत छोड़ें — जानवर खा लेते हैं",
                "अपने पड़ोस में Animal Water Station बनाने की मुहिम शुरू करें",
                "Local animal rescue organization को support करें",
                "बच्चों को जानवरों से दयालु व्यवहार सिखाएं",
                "जानवरों को परेशान करने वाले लोगों को प्यार से समझाएं",
              ].map((a) => (
                <motion.div key={a} variants={iv}
                  className="flex items-start gap-3 bg-white/[0.03] border border-amber-900/30 rounded-xl px-4 py-3 hover:border-amber-700/40 transition-all">
                  <div className="w-5 h-5 rounded-full bg-amber-900/50 border border-amber-700/50 flex items-center justify-center shrink-0 mt-0.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                  </div>
                  <span className="text-white/70 text-sm">{a}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Report CTA */}
      <section className="py-10 container mx-auto px-4 max-w-xl text-center">
        <div className="bg-gradient-to-br from-amber-900/30 to-orange-900/20 border border-amber-800/40 rounded-3xl p-8">
          <AlertTriangle className="w-10 h-10 text-amber-400 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-white mb-2">घायल जानवर देखा?</h3>
          <p className="text-white/50 text-sm mb-5">अभी report करें — हमारी team या local volunteers मदद के लिए तैयार हैं।</p>
          <Link href="/report">
            <span className="inline-block bg-amber-600 hover:bg-amber-500 text-white px-8 py-3 rounded-xl font-semibold transition-all text-sm cursor-pointer">
              Report करें →
            </span>
          </Link>
        </div>
      </section>

      {/* Articles */}
      {Array.isArray(articles) && articles.length > 0 && (
        <section className="py-10 container mx-auto px-4">
          <h2 className="text-2xl font-bold text-white mb-6">📚 Related Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {articles.map((a) => (
              <div key={a.id} className="bg-white/[0.03] border border-white/10 rounded-2xl overflow-hidden hover:border-amber-700/40 transition-all group">
                <div className="h-36 bg-gradient-to-br from-amber-900/50 to-orange-900/20 flex items-center justify-center">
                  <BookOpen className="w-10 h-10 text-amber-600/40" />
                </div>
                <div className="p-5">
                  <h3 className="font-semibold text-white text-sm leading-snug mb-2 group-hover:text-amber-300 transition-colors">{a.title}</h3>
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

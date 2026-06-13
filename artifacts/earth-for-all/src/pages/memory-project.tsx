import { motion } from "framer-motion";
import { ArrowLeft, Heart, MessageSquare } from "lucide-react";
import { Link } from "wouter";
import { useState } from "react";

const iv = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } } };
const cv = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.1 } } };

const MEMORIES = [
  {
    id: 1,
    author: "Ramprasad Sharma, 78 — Jaipur, Rajasthan",
    era: "1960s",
    category: "Rivers",
    categoryColor: "bg-blue-900/50 text-blue-300 border-blue-700/50",
    emoji: "🌊",
    hindi: `"जब मैं बच्चा था, बाणगंगा नदी में पानी इतना साफ था कि तल में पत्थर गिने जा सकते थे। हम सुबह नहाते थे, माँ कपड़े धोती थी। नदी के किनारे बड़े-बड़े पेड़ थे। मछलियाँ इतनी थीं कि जाल फेंको तो भर जाए। अब वही नदी — मैंने अपनी आँखों से देखा है — बस पतली सी लकीर है, और वो भी गंदी।"`,
    english: "When I was a child, the Banganga river was so clear you could count the stones at the bottom. We bathed in the mornings, my mother washed clothes. There were large trees on the banks. Fish were so abundant that a single cast of the net would fill it. Now that same river — I've seen it with my own eyes — is just a thin dirty trickle.",
    tags: ["River", "Water", "Fish", "Rajasthan"],
  },
  {
    id: 2,
    author: "Savitri Devi, 82 — Darbhanga, Bihar",
    era: "1950s",
    category: "Forests",
    categoryColor: "bg-green-900/50 text-green-300 border-green-700/50",
    emoji: "🌳",
    hindi: `"हमारे गाँव के पास जंगल था — घना, गहरा। बचपन में हम उसमें खेलते थे। हिरण, खरगोश, अनगिनत पक्षी। रात को जुगनुओं की रोशनी में जंगल चमकता था। हाथी भी आते थे कभी-कभी। अब वहाँ कारखाना है। जुगनू मैंने अपने पोते को दिखाए नहीं — वो अब हैं नहीं।"`,
    english: "Near our village was a forest — dense, deep. In childhood we played in it. Deer, rabbits, countless birds. At night the forest would glow with firefly light. Even elephants would come sometimes. Now there's a factory there. I never got to show fireflies to my grandchildren — they're gone now.",
    tags: ["Forest", "Animals", "Biodiversity", "Bihar"],
  },
  {
    id: 3,
    author: "Abdul Rahman, 71 — Mangalore, Karnataka",
    era: "1970s",
    category: "Ocean",
    categoryColor: "bg-cyan-900/50 text-cyan-300 border-cyan-700/50",
    emoji: "🐠",
    hindi: `"मेरे बाप और दादा मछुआरे थे। जाल डालो — हर बार भरा आता था। अनगिनत प्रकार की मछलियाँ। Tuna, Kingfish, Pomfret सब आसानी से मिलते थे। पानी नीला था, साफ था। अब हम गहरे जाते हैं, बहुत गहरे — और फिर भी जाल आधा खाली आता है। समुद्र में कुछ बदल गया है।"`,
    english: "My father and grandfather were fishermen. Cast the net — it always came back full. Countless varieties of fish. Tuna, Kingfish, Pomfret all easily found. The water was blue, clear. Now we go deep, very deep — and still the net comes back half empty. Something has changed in the ocean.",
    tags: ["Ocean", "Fish", "Fishing", "Karnataka"],
  },
  {
    id: 4,
    author: "Bhikhu Bhai Patel, 75 — Anand, Gujarat",
    era: "1960s",
    category: "Agriculture",
    categoryColor: "bg-amber-900/50 text-amber-300 border-amber-700/50",
    emoji: "🌾",
    hindi: `"खेती में हम गाय का गोबर डालते थे — बस। कोई chemical नहीं। मिट्टी ऐसी थी कि मुट्ठी भरो तो खुशबू आए। एक बीघे में जितना होता था उसमें पूरा परिवार साल भर खाता था। अब double fertilizer डालो तो आधा होता है। मिट्टी मर गई है। कोई कहता नहीं, लेकिन मिट्टी मर गई है।"`,
    english: "For farming we used cow dung — just that. No chemicals. The soil was such that if you took a handful, it had a fragrance. From one bigha, enough for the whole family for a year. Now double the fertilizer and you get half. The soil has died. Nobody says it, but the soil has died.",
    tags: ["Agriculture", "Soil", "Traditional Farming", "Gujarat"],
  },
  {
    id: 5,
    author: "Meena Kumari, 68 — Almora, Uttarakhand",
    era: "1970s",
    category: "Mountains",
    categoryColor: "bg-violet-900/50 text-violet-300 border-violet-700/50",
    emoji: "🏔️",
    hindi: `"पहले हर साल बर्फ गिरती थी — भरपूर। घर तक बर्फ आती थी। बुग्याल में हरी घास, रंग-बिरंगे फूल। Brahmakamal खुद उगते थे। अब बर्फ कम है। Glacier पीछे हट रहे हैं। हम देख रहे हैं — हम पहाड़ों में रहने वाले सबसे पहले देख रहे हैं कि क्या हो रहा है। कोई सुनता नहीं।"`,
    english: "Earlier it snowed every year — abundantly. Snow would reach the house. The bugyals had green grass, colorful flowers. Brahmakamal would grow on its own. Now the snow is less. Glaciers are retreating. We are watching — those of us who live in the mountains are the first to see what's happening. Nobody listens.",
    tags: ["Glaciers", "Mountains", "Climate", "Uttarakhand"],
  },
  {
    id: 6,
    author: "Tribal Elder Soma Majhi, 83 — Mayurbhanj, Odisha",
    era: "1950s",
    category: "Traditional Knowledge",
    categoryColor: "bg-emerald-900/50 text-emerald-300 border-emerald-700/50",
    emoji: "🌿",
    hindi: `"हमारे पूर्वज जानते थे — कौन सा पेड़ कटाना, कौन सा नहीं। कितना लेना जंगल से। जंगल हमारी माँ थी। त्यौहार थे जंगल के लिए। हम पूजते थे पेड़ों को। इसीलिए जंगल बचा रहा सदियों। जब government आई और कहा हमें नहीं पता — तभी से जंगल कटना शुरू हुआ।"`,
    english: "Our ancestors knew — which trees to cut, which not to. How much to take from the forest. The forest was our mother. There were festivals for the forest. We worshipped the trees. That's why the forest survived for centuries. When the government came and said we didn't know — that's when the deforestation began.",
    tags: ["Tribal Knowledge", "Forest", "Traditional Wisdom", "Odisha"],
  },
  {
    id: 7,
    author: "Kalyani Ammal, 79 — Thanjavur, Tamil Nadu",
    era: "1960s",
    category: "Water Wisdom",
    categoryColor: "bg-teal-900/50 text-teal-300 border-teal-700/50",
    emoji: "💧",
    hindi: `"हमारे यहाँ हर गाँव में एरी (तालाब) था। हम उसकी देखभाल करते थे। गर्मी में भी पानी रहता था। मछलियाँ रहती थीं, कमल के फूल खिलते थे। बच्चे नहाते थे। धीरे-धीरे लोगों ने उसमें कचरा डालना शुरू किया। फिर भरा गया — construction के लिए। आज वहाँ एक mall है। बारिश में पूरी colony डूब जाती है।"`,
    english: "In every village here there was an 'eri' (pond). We took care of it. Even in summer there was water. Fish lived there, lotus flowers bloomed. Children swam in it. Gradually people started dumping waste in it. Then it was filled in — for construction. Today there's a mall there. In rains, the whole colony floods.",
    tags: ["Water", "Traditional Ponds", "Tamil Nadu", "Eris"],
  },
  {
    id: 8,
    author: "Lakhwinder Singh, 70 — Amritsar, Punjab",
    era: "1970s",
    category: "Agriculture",
    categoryColor: "bg-amber-900/50 text-amber-300 border-amber-700/50",
    emoji: "🦅",
    hindi: `"गेहूँ की कटाई के बाद खेतों में गिद्ध आते थे — हजारों। आकाश भर जाता था। वो मरे हुए जानवरों को साफ करते थे। कोई बीमारी नहीं फैलती थी। फिर यह diclofenac दवा आई गाय-भैंस के लिए। गिद्ध खाते थे — मर जाते थे। 10 साल में सब खत्म हो गए। अब कौए और आवारा कुत्ते हैं। Rabies बढ़ गया।"`,
    english: "After wheat harvest, vultures would come to the fields — thousands. The sky would fill with them. They cleaned up dead animals. No diseases spread. Then this diclofenac medicine came for cattle. Vultures would eat and die. In 10 years all gone. Now crows and stray dogs. Rabies has increased.",
    tags: ["Vultures", "Ecosystem", "Punjab", "Biodiversity"],
  },
];

const KNOWLEDGE_SYSTEMS = [
  { title: "Johad System (Rajasthan)", desc: "Traditional rainwater harvesting ponds — Rajendra Singh revived this ancient system and brought back 9 rivers. Johad = community-built check dam that holds rain water and recharges groundwater.", tags: ["Water", "Rajasthan", "Community"] },
  { title: "Sacred Groves (देववन)", desc: "India mein 100,000+ sacred groves — 'dev vans' — protected by communities for centuries. No cutting, no hunting. Some harbor species extinct elsewhere. Modern conservation accidentally confirmed this wisdom.", tags: ["Forest", "Religion", "Biodiversity"] },
  { title: "Khadins of Jaisalmer", desc: "2,000-year-old water harvesting system in Thar Desert. Crescent-shaped earthen embankment captures runoff. Behind it: fertile land for agriculture. No rainfall wasted. Modern engineers studied this for desert water management.", tags: ["Water", "Desert", "Ancient Tech"] },
  { title: "Appiko Movement (Karnataka)", desc: "'Appiko' means to hug — forest protection movement. 1983: Panduranga Hegde led villagers to hug trees to prevent logging. Inspired by Chipko. Won. Forests protected. Tribal knowledge of forest value vs government timber value.", tags: ["Forest", "Activism", "Karnataka"] },
  { title: "Bishnoi Community (Rajasthan)", desc: "Bishnoi community has protected wildlife for 500+ years as religious duty. 363 Bishnois sacrificed their lives in 1730 to protect trees — first known tree protection movement in history. Blackbuck thrives near their villages.", tags: ["Wildlife", "Religion", "Rajasthan"] },
  { title: "Surangam (Kerala/Karnataka)", desc: "Ancient horizontal wells — 'suranga' — carved into hillsides. No pumping needed — gravity-fed freshwater. Some are 300+ years old, still flowing. Used in drought conditions. Almost forgotten technology being rediscovered.", tags: ["Water", "Ancient Tech", "Kerala"] },
];

export default function MemoryProject() {
  const [likes, setLikes] = useState<Record<number, number>>({});

  return (
    <div className="pt-24 pb-16 min-h-screen">
      {/* Hero */}
      <div className="relative overflow-hidden bg-[radial-gradient(ellipse_at_top,rgba(245,158,11,0.07)_0%,transparent_55%)] py-14">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <Link href="/">
            <div className="inline-flex items-center gap-2 text-white/40 hover:text-white/70 transition-colors text-sm mb-8 cursor-pointer group">
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
              Back to Home
            </div>
          </Link>
          <div className="w-20 h-20 rounded-3xl bg-amber-900/60 border border-amber-700/50 flex items-center justify-center mx-auto mb-8 shadow-[0_0_40px_rgba(245,158,11,0.12)]">
            <span className="text-4xl">🌎</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-400 to-orange-300">One Earth</span>
            <br />
            <span className="text-white">Memory Project</span>
          </h1>
          <p className="text-amber-400/80 text-lg font-medium mb-4">बुजुर्गों की कहानियाँ — पृथ्वी की याददाश्त</p>
          <p className="text-white/50 text-sm max-w-2xl mx-auto leading-relaxed mb-8">
            जब data दिखाता है कि नदियाँ सूख गई हैं, जंगल कट गए हैं — 
            बुजुर्ग बताते हैं कि वो पहले कैसे थे। यह archive है 
            उन यादों का जो किताबों में नहीं हैं — सिर्फ़ लोगों के दिलों में हैं।
          </p>
          <div className="flex items-center justify-center gap-2 text-xs text-amber-400/60 italic">
            <span>📜</span>
            <span>"जो पीढ़ी अपना इतिहास नहीं जानती, वो अपना भविष्य नहीं बना सकती।"</span>
          </div>
        </div>
      </div>

      {/* Memory Cards */}
      <div className="container mx-auto px-4 max-w-4xl py-8">
        <div className="flex items-center gap-3 mb-6">
          <span className="text-lg">👴</span>
          <h2 className="text-xl font-bold text-white">Personal Memories Archive</h2>
          <span className="text-xs text-white/30 ml-auto">8 testimonials collected</span>
        </div>

        <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={cv} className="space-y-5">
          {MEMORIES.map(mem => (
            <motion.div key={mem.id} variants={iv}
              className="bg-gradient-to-br from-amber-900/20 to-orange-900/10 border border-amber-800/30 rounded-2xl overflow-hidden group hover:border-amber-700/50 transition-all">
              {/* Header */}
              <div className="px-6 py-4 border-b border-white/5 flex items-center justify-between gap-3 flex-wrap">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{mem.emoji}</span>
                  <div>
                    <div className="font-semibold text-white/80 text-sm">{mem.author}</div>
                    <div className="text-white/35 text-xs">{mem.era} — Oral History</div>
                  </div>
                </div>
                <span className={`text-xs px-2.5 py-0.5 rounded-full border font-medium ${mem.categoryColor}`}>{mem.category}</span>
              </div>

              {/* Content */}
              <div className="px-6 py-5">
                {/* Hindi Quote */}
                <blockquote className="text-white/75 text-sm leading-8 italic border-l-2 border-amber-600/50 pl-4 mb-4 font-serif">
                  {mem.hindi}
                </blockquote>
                {/* English Translation */}
                <div className="text-white/35 text-xs leading-relaxed italic">
                  {mem.english}
                </div>
              </div>

              {/* Footer */}
              <div className="px-6 py-3 border-t border-white/5 flex items-center justify-between">
                <div className="flex flex-wrap gap-1">
                  {mem.tags.map(tag => (
                    <span key={tag} className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 border border-white/8 text-white/35">{tag}</span>
                  ))}
                </div>
                <button
                  onClick={() => setLikes(l => ({ ...l, [mem.id]: (l[mem.id] || 0) + 1 }))}
                  className="flex items-center gap-1.5 text-xs text-white/30 hover:text-rose-400 transition-colors group">
                  <Heart className={`w-4 h-4 transition-all ${likes[mem.id] ? "text-rose-400 fill-rose-400" : "group-hover:scale-110"}`} />
                  {(likes[mem.id] || 0) + [12, 8, 23, 6, 17, 31, 9, 14][mem.id - 1]}
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Traditional Knowledge Systems */}
      <div className="container mx-auto px-4 max-w-4xl py-4">
        <div className="flex items-center gap-3 mb-6">
          <span className="text-lg">🌿</span>
          <h2 className="text-xl font-bold text-white">Ancient Environmental Knowledge Systems</h2>
        </div>
        <p className="text-white/45 text-sm mb-6 leading-relaxed">
          India में सैकड़ों-हजारों साल पुराने तरीके — जो modern science अब validate कर रही है। 
          यह हमारी सबसे बड़ी environmental heritage है।
        </p>
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={cv}
          className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {KNOWLEDGE_SYSTEMS.map(ks => (
            <motion.div key={ks.title} variants={iv}
              className="bg-white/[0.025] border border-white/10 hover:border-white/20 rounded-xl p-5 transition-all">
              <h3 className="font-bold text-emerald-300 mb-2">{ks.title}</h3>
              <p className="text-white/55 text-sm leading-relaxed mb-3">{ks.desc}</p>
              <div className="flex flex-wrap gap-1">
                {ks.tags.map(t => <span key={t} className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-900/30 border border-emerald-800/40 text-emerald-400/60">{t}</span>)}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Submit Your Memory CTA */}
      <div className="container mx-auto px-4 max-w-2xl text-center py-12">
        <div className="bg-gradient-to-br from-amber-900/30 to-orange-900/20 border border-amber-800/40 rounded-3xl p-10">
          <span className="text-4xl block mb-4">📝</span>
          <h2 className="text-2xl font-bold text-white mb-3">अपनी याद Share करें</h2>
          <p className="text-white/50 text-sm leading-relaxed mb-6">
            क्या आपके परिवार में कोई बुजुर्ग हैं जिन्होंने पहले की नदी, जंगल, 
            खेती, जानवर देखे हैं? उनकी कहानी यहाँ जोड़ें — 
            यह archive सबके लिए, हमेशा के लिए रहेगा।
          </p>
          <Link href="/ideas">
            <span className="inline-block bg-amber-600 hover:bg-amber-500 text-white px-8 py-3 rounded-xl font-semibold transition-all text-sm cursor-pointer">
              अपनी याद Submit करें →
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}

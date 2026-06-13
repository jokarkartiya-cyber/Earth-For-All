import { motion } from "framer-motion";
import { Zap, Cpu, Wifi, Sun, BookOpen, Clock } from "lucide-react";
import { useListArticles, getListArticlesQueryKey } from "@workspace/api-client-react";

const INNOVATIONS = [
  {
    icon: Cpu,
    title: "AI Animal Detection",
    desc: "Computer vision systems trained on thousands of animal images automatically identify injured, sick, or trapped animals on city streets and send real-time alerts to rescue teams.",
    color: "border-indigo-900/40 text-indigo-300",
    bg: "bg-indigo-900/20",
  },
  {
    icon: Wifi,
    title: "Pollution Sensor Networks",
    desc: "Low-cost IoT sensors on school rooftops, bus stops, and street lights continuously monitor air, water, and noise pollution — creating open-access real-time maps for every city.",
    color: "border-purple-900/40 text-purple-300",
    bg: "bg-purple-900/20",
  },
  {
    icon: Sun,
    title: "Solar-Powered Animal Infrastructure",
    desc: "Solar panels power water pumps, feeding stations, and AI cameras designed for street animals — requiring zero electricity from the grid, deployable anywhere.",
    color: "border-amber-900/40 text-amber-300",
    bg: "bg-amber-900/20",
  },
  {
    icon: Zap,
    title: "Smart Waste Sorting AI",
    desc: "Bins with embedded cameras that recognize and sort recyclables from organic waste automatically, feeding eco-point rewards to users' phones and transmitting fill-level data to optimize collection routes.",
    color: "border-emerald-900/40 text-emerald-300",
    bg: "bg-emerald-900/20",
  },
];

const FUTURE_CITIES = [
  { title: "Animal-Safe LED Lighting", desc: "Warm amber street lights (2700K) instead of harsh white LEDs that disorient bats, birds, and insects. Reduces insect deaths by 60%." },
  { title: "Wildlife Crossing Bridges", desc: "Dedicated overpasses and underpasses for animals to cross highways safely. Proven to reduce roadkill by 90% in multiple countries." },
  { title: "Vertical Forests", desc: "High-rise buildings covered in greenery — hundreds of trees per floor. Oxygen production, urban heat reduction, bird habitat, and beauty." },
  { title: "Zero-Emission Zones", desc: "City centers closed to combustion vehicles. Pollution sensors trigger automatic enforcement. Clean air as a citizen right." },
];

const iv = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } } };
const cv = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.08 } } };

export default function Technology() {
  const { data: articles } = useListArticles({ category: "technology", limit: 6 }, { query: { queryKey: getListArticlesQueryKey({ category: "technology", limit: 6 }) } });

  return (
    <div className="pt-24 pb-16 min-h-screen">
      <div className="relative overflow-hidden bg-[radial-gradient(ellipse_at_top,rgba(99,102,241,0.12)_0%,transparent_50%)] py-20">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <div className="w-16 h-16 rounded-2xl bg-indigo-900/60 border border-indigo-700/50 flex items-center justify-center mx-auto mb-6">
            <Zap className="w-8 h-8 text-indigo-400" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">Future Innovation Lab</h1>
          <p className="text-white/50 text-lg leading-relaxed">
            Technology is not the enemy of nature. Used wisely, it is the most powerful ally nature has ever had. 
            Here are the ideas that could change everything.
          </p>
        </div>
      </div>

      {/* AI & Tech Innovations */}
      <section className="py-16 container mx-auto px-4">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={cv}>
          <motion.h2 variants={iv} className="text-3xl font-bold text-white mb-10 text-center">AI &amp; Technology for Earth</motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {INNOVATIONS.map((inn) => {
              const Icon = inn.icon;
              return (
                <motion.div key={inn.title} variants={iv}
                  className={`bg-white/[0.03] border ${inn.color} rounded-2xl p-6 flex gap-5 hover:bg-white/[0.05] transition-all`}>
                  <div className={`w-12 h-12 rounded-xl ${inn.bg} border border-current/30 flex items-center justify-center shrink-0`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white mb-2">{inn.title}</h3>
                    <p className="text-white/50 text-sm leading-relaxed">{inn.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </section>

      {/* Future Cities */}
      <section className="py-16 bg-white/[0.02] border-y border-white/5">
        <div className="container mx-auto px-4">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={cv}>
            <motion.h2 variants={iv} className="text-3xl font-bold text-white mb-10 text-center">Cities Designed for All Life</motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {FUTURE_CITIES.map((f) => (
                <motion.div key={f.title} variants={iv}
                  className="bg-white/[0.03] border border-indigo-900/30 rounded-2xl p-6 hover:border-indigo-700/40 transition-all">
                  <h3 className="font-semibold text-indigo-300 text-lg mb-2">{f.title}</h3>
                  <p className="text-white/50 text-sm leading-relaxed">{f.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Articles */}
      {articles && articles.length > 0 && (
        <section className="py-16 container mx-auto px-4">
          <h2 className="text-2xl font-bold text-white mb-8">Related Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {articles.map((a) => (
              <div key={a.id} data-testid={`article-card-${a.id}`}
                className="bg-white/[0.03] border border-white/10 rounded-2xl overflow-hidden hover:border-indigo-700/40 transition-all group">
                <div className="h-36 bg-gradient-to-br from-indigo-900/40 to-transparent flex items-center justify-center">
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

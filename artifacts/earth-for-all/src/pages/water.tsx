import { motion } from "framer-motion";
import { Droplets, BookOpen, Clock } from "lucide-react";
import { useListArticles, getListArticlesQueryKey } from "@workspace/api-client-react";

const FACTS = [
  { number: "2.2 Billion", label: "People lack access to safe drinking water" },
  { number: "70%", label: "Of Earth's freshwater used in agriculture" },
  { number: "30%", label: "Of urban water lost to pipe leaks" },
  { number: "50%", label: "Reduction possible with smart irrigation" },
];

const SOLUTIONS = [
  { title: "Rainwater Harvesting", desc: "Collect monsoon and rain water from rooftops and paved surfaces. Store it in tanks. Use it for gardens, cleaning, and animal water stations all year round." },
  { title: "Dual-Use Water Systems", desc: "Design all public water infrastructure with two levels — taps for humans at standard height and ground-level bowls for animals. No extra cost, enormous impact." },
  { title: "Leak Detection AI", desc: "AI systems analyze water flow patterns and detect pipe leaks automatically, alerting municipalities before thousands of liters are wasted underground." },
  { title: "River Clean-up Networks", desc: "Organized citizen volunteer systems to remove garbage, industrial waste, and plastic from rivers — combined with legal action on polluters." },
  { title: "Wastewater Recycling", desc: "Treated wastewater can be reused for irrigation, industrial cooling, and toilet flushing — reducing freshwater demand by up to 40% in urban areas." },
  { title: "Smart Irrigation", desc: "Sensor-based irrigation systems that water crops only when the soil actually needs it, reducing agricultural water use by up to 50%." },
];

const iv = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } } };
const cv = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.08 } } };

export default function Water() {
  const { data: articles } = useListArticles({ category: "water", limit: 6 }, { query: { queryKey: getListArticlesQueryKey({ category: "water", limit: 6 }) } });

  return (
    <div className="pt-24 pb-16 min-h-screen">
      <div className="relative overflow-hidden bg-[radial-gradient(ellipse_at_top,rgba(59,130,246,0.12)_0%,transparent_50%)] py-20">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <div className="w-16 h-16 rounded-2xl bg-blue-900/60 border border-blue-700/50 flex items-center justify-center mx-auto mb-6">
            <Droplets className="w-8 h-8 text-blue-400" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">Water for All</h1>
          <p className="text-white/50 text-lg leading-relaxed">
            Water is life. Not just for humans — for every living being on this planet. 
            Yet we waste it, pollute it, and treat it as infinite. It is not.
          </p>
        </div>
      </div>

      {/* Stats */}
      <section className="py-12 container mx-auto px-4">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={cv} className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {FACTS.map((f) => (
            <motion.div key={f.label} variants={iv} className="bg-white/[0.03] border border-blue-900/40 rounded-2xl p-6 text-center">
              <div className="text-2xl font-bold text-blue-300 mb-1">{f.number}</div>
              <div className="text-white/40 text-xs">{f.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Solutions */}
      <section className="py-16 bg-white/[0.02] border-y border-white/5">
        <div className="container mx-auto px-4">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={cv}>
            <motion.h2 variants={iv} className="text-3xl font-bold text-white mb-10 text-center">Solutions</motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {SOLUTIONS.map((s) => (
                <motion.div key={s.title} variants={iv}
                  className="bg-white/[0.03] border border-blue-900/30 rounded-2xl p-6 hover:border-blue-700/40 transition-all">
                  <h3 className="font-semibold text-blue-300 mb-2">{s.title}</h3>
                  <p className="text-white/50 text-sm leading-relaxed">{s.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Actions */}
      <section className="py-16 container mx-auto px-4 max-w-2xl text-center">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={cv}>
          <motion.h2 variants={iv} className="text-3xl font-bold text-white mb-6">Conserve Water Today</motion.h2>
          <motion.div variants={iv} className="space-y-3">
            {[
              "Fix leaking taps immediately — one drip per second wastes 3000 liters per year",
              "Keep a bowl of water outside for birds and street animals",
              "Collect and reuse water used to wash vegetables",
              "Take shorter showers — 4 minutes vs. 10 saves 60 liters",
              "Use a bucket instead of a hose to wash vehicles",
              "Report water pipeline leaks to your municipality",
            ].map((a) => (
              <div key={a} className="flex items-center gap-3 bg-white/[0.03] border border-white/10 rounded-xl px-5 py-3 text-white/70 text-sm text-left">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-400 shrink-0" />
                {a}
              </div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* Articles */}
      {articles && articles.length > 0 && (
        <section className="py-16 container mx-auto px-4">
          <h2 className="text-2xl font-bold text-white mb-8">Related Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {articles.map((a) => (
              <div key={a.id} data-testid={`article-card-${a.id}`}
                className="bg-white/[0.03] border border-white/10 rounded-2xl overflow-hidden hover:border-blue-700/40 transition-all group">
                <div className="h-36 bg-gradient-to-br from-blue-900/40 to-transparent flex items-center justify-center">
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

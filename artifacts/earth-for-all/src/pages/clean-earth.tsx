import { motion } from "framer-motion";
import { Recycle, Trash2, Factory, Leaf } from "lucide-react";
import { useListArticles, getListArticlesQueryKey } from "@workspace/api-client-react";
import { Clock, BookOpen } from "lucide-react";

const PROBLEMS = [
  { icon: Trash2, title: "8 Million Tons", desc: "of plastic enter the ocean every year — equivalent to dumping a garbage truck every minute." },
  { icon: Factory, title: "Only 9% Recycled", desc: "Of all plastic ever made, only 9% has been recycled. The rest is in landfills, oceans, or burned." },
  { icon: Leaf, title: "Microplastics Everywhere", desc: "Microplastics are now found in human blood, breast milk, deep ocean trenches, and Arctic ice." },
];

const SOLUTIONS = [
  { title: "Smart Dustbins with AI", desc: "Computer vision bins that sort waste automatically and reward citizens with eco-points for correct disposal." },
  { title: "Zero Waste Cities", desc: "Cities like Kamikatsu, Japan have achieved near-zero landfill waste through 45-category sorting and community effort." },
  { title: "Plastic Credits", desc: "Pay coastal communities and fishermen for every kilogram of ocean plastic they collect — creating income and clean oceans." },
  { title: "Circular Economy", desc: "Design products that are made to be remade — packaging that becomes food for bacteria, plastics turned back into fuel." },
  { title: "Community Clean-up Networks", desc: "Organized citizen groups with GPS tracking, gamification, and social sharing that make cleaning up fun and measurable." },
  { title: "Composting Programs", desc: "Convert organic waste into rich compost at neighborhood scale — reducing landfill by 30% while feeding urban gardens." },
];

const iv = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } } };
const cv = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.08 } } };

export default function CleanEarth() {
  const { data: articles } = useListArticles({ category: "clean-earth", limit: 6 }, { query: { queryKey: getListArticlesQueryKey({ category: "clean-earth", limit: 6 }) } });

  return (
    <div className="pt-24 pb-16 min-h-screen">
      {/* Hero */}
      <div className="relative overflow-hidden bg-[radial-gradient(ellipse_at_top,rgba(16,185,129,0.12)_0%,transparent_50%)] py-20">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <div className="w-16 h-16 rounded-2xl bg-emerald-900/60 border border-emerald-700/50 flex items-center justify-center mx-auto mb-6">
            <Recycle className="w-8 h-8 text-emerald-400" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">Clean Earth Academy</h1>
          <p className="text-white/50 text-lg leading-relaxed">
            Plastic, waste, pollution — these are not inevitable. They are choices. And we can choose differently.
            Here's everything you need to know, and what you can do.
          </p>
        </div>
      </div>

      {/* The Problem */}
      <section className="py-16 container mx-auto px-4">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={cv}>
          <motion.h2 variants={iv} className="text-3xl font-bold text-white mb-10 text-center">The Scale of the Problem</motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PROBLEMS.map((p) => (
              <motion.div key={p.title} variants={iv} className="bg-white/[0.03] border border-red-900/30 rounded-2xl p-6">
                <p className="text-2xl font-bold text-red-300 mb-2">{p.title}</p>
                <p className="text-white/50 text-sm leading-relaxed">{p.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Solutions */}
      <section className="py-16 bg-white/[0.02] border-y border-white/5">
        <div className="container mx-auto px-4">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={cv}>
            <motion.h2 variants={iv} className="text-3xl font-bold text-white mb-10 text-center">Solutions That Work</motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {SOLUTIONS.map((s) => (
                <motion.div key={s.title} variants={iv}
                  className="bg-white/[0.03] border border-emerald-900/30 rounded-2xl p-6 hover:border-emerald-700/40 transition-all">
                  <h3 className="font-semibold text-emerald-300 mb-2">{s.title}</h3>
                  <p className="text-white/50 text-sm leading-relaxed">{s.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* What You Can Do */}
      <section className="py-16 container mx-auto px-4 max-w-2xl text-center">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={cv}>
          <motion.h2 variants={iv} className="text-3xl font-bold text-white mb-6">What You Can Do Today</motion.h2>
          <motion.div variants={iv} className="space-y-3">
            {[
              "Refuse single-use plastic — carry a bag, bottle, and container",
              "Sort your waste: dry, wet, and hazardous separately",
              "Compost food scraps at home or in a community bin",
              "Organize or join a neighborhood clean-up",
              "Choose products with less packaging",
              "Report illegal dumping using the Report page",
            ].map((action) => (
              <div key={action} className="flex items-center gap-3 bg-white/[0.03] border border-white/10 rounded-xl px-5 py-3 text-white/70 text-sm text-left">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                {action}
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
                className="bg-white/[0.03] border border-white/10 rounded-2xl overflow-hidden hover:border-emerald-700/40 transition-all group">
                <div className="h-36 bg-gradient-to-br from-emerald-900/40 to-transparent flex items-center justify-center">
                  <BookOpen className="w-10 h-10 text-emerald-600/40" />
                </div>
                <div className="p-5">
                  <h3 className="font-semibold text-white text-sm leading-snug mb-2 group-hover:text-emerald-300 transition-colors">{a.title}</h3>
                  <p className="text-white/40 text-xs line-clamp-2">{a.summary}</p>
                  <div className="mt-3 flex items-center gap-1.5 text-white/25 text-xs">
                    <Clock className="w-3 h-3" />{a.readingTimeMinutes} min read
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

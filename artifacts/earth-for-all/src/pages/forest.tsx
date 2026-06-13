import { motion } from "framer-motion";
import { TreePine, BookOpen, Clock } from "lucide-react";
import { useListArticles, getListArticlesQueryKey } from "@workspace/api-client-react";

const FACTS = [
  { number: "15 Billion", label: "Trees cut down every year globally" },
  { number: "1.5°C", label: "Temperature rise forests are helping prevent" },
  { number: "80%", label: "Of land species live in forests" },
  { number: "2.6 Billion", label: "People depend on forests for their livelihood" },
];

const SOLUTIONS = [
  { title: "Urban Micro-Forests", desc: "The Miyawaki method can create a dense, native forest in 2 years on a space as small as a parking lot. Cities worldwide are planting them in unused lots, schools, and medians." },
  { title: "Rooftop Gardens", desc: "Every rooftop in a city is a potential forest. Rooftop gardens reduce heat island effect, provide habitat for insects and birds, and grow food for communities." },
  { title: "River Corridors", desc: "Restoring 50-meter green belts along both banks of every river creates wildlife highways connecting fragmented habitats across cities and countryside." },
  { title: "Tree Protection Law", desc: "Old trees must be legally protected. A 100-year-old tree takes 100 years to replace. Their value — carbon storage, biodiversity, cooling — is irreplaceable." },
  { title: "School Forest Programs", desc: "Every school should have a small forest. Students who grow up nurturing trees become adults who protect them. Forest education changes the next generation." },
  { title: "Community Nurseries", desc: "Free seed libraries and sapling nurseries in every neighborhood make tree planting accessible to everyone, not just those with money to buy plants." },
];

const iv = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } } };
const cv = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.08 } } };

export default function Forest() {
  const { data: articles } = useListArticles({ category: "forest", limit: 6 }, { query: { queryKey: getListArticlesQueryKey({ category: "forest", limit: 6 }) } });

  return (
    <div className="pt-24 pb-16 min-h-screen">
      <div className="relative overflow-hidden bg-[radial-gradient(ellipse_at_top,rgba(22,163,74,0.12)_0%,transparent_50%)] py-20">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <div className="w-16 h-16 rounded-2xl bg-green-900/60 border border-green-700/50 flex items-center justify-center mx-auto mb-6">
            <TreePine className="w-8 h-8 text-green-400" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">Forest &amp; Nature</h1>
          <p className="text-white/50 text-lg leading-relaxed">
            Forests are not just trees. They are the lungs of the Earth, the home of millions of species, 
            and the ancient memory of our planet. Losing them is not just an environmental issue — it is an existential one.
          </p>
        </div>
      </div>

      {/* Stats */}
      <section className="py-12 container mx-auto px-4">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={cv} className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {FACTS.map((f) => (
            <motion.div key={f.label} variants={iv} className="bg-white/[0.03] border border-green-900/40 rounded-2xl p-6 text-center">
              <div className="text-2xl font-bold text-green-300 mb-1">{f.number}</div>
              <div className="text-white/40 text-xs">{f.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Solutions */}
      <section className="py-16 bg-white/[0.02] border-y border-white/5">
        <div className="container mx-auto px-4">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={cv}>
            <motion.h2 variants={iv} className="text-3xl font-bold text-white mb-10 text-center">Bringing Nature Back</motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {SOLUTIONS.map((s) => (
                <motion.div key={s.title} variants={iv}
                  className="bg-white/[0.03] border border-green-900/30 rounded-2xl p-6 hover:border-green-700/40 transition-all">
                  <h3 className="font-semibold text-green-300 mb-2">{s.title}</h3>
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
          <motion.h2 variants={iv} className="text-3xl font-bold text-white mb-6">Grow the Forest</motion.h2>
          <motion.div variants={iv} className="space-y-3">
            {[
              "Plant at least one tree every year",
              "Water and tend the trees already around you",
              "Protest illegal logging in your area and report it",
              "Choose recycled or sustainably sourced wood products",
              "Create a small garden or window plant box",
              "Participate in tree-planting drives in your city",
            ].map((a) => (
              <div key={a} className="flex items-center gap-3 bg-white/[0.03] border border-white/10 rounded-xl px-5 py-3 text-white/70 text-sm text-left">
                <div className="w-1.5 h-1.5 rounded-full bg-green-400 shrink-0" />
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
                className="bg-white/[0.03] border border-white/10 rounded-2xl overflow-hidden hover:border-green-700/40 transition-all group">
                <div className="h-36 bg-gradient-to-br from-green-900/40 to-transparent flex items-center justify-center">
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

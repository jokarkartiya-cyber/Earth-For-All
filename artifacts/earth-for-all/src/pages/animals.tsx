import { motion } from "framer-motion";
import { Shield, Droplets, Utensils, Zap, BookOpen, Clock } from "lucide-react";
import { useListArticles, getListArticlesQueryKey } from "@workspace/api-client-react";

const PROBLEMS = [
  { label: "Thirst & Hunger", desc: "Millions of street animals go without water or food daily, especially in summer. Simple interventions save thousands of lives." },
  { label: "Road Accidents", desc: "Animals lack safe crossings. Wildlife corridors and animal-friendly traffic systems can reduce roadkill by up to 90%." },
  { label: "Habitat Loss", desc: "Urban expansion destroys natural habitat. Animals have nowhere to go — they wander into traffic, homes, and danger." },
  { label: "Plastic Ingestion", desc: "Animals mistake plastic bags for food. Ingesting plastic causes slow, painful deaths for dogs, cows, birds, and marine life." },
];

const SOLUTIONS = [
  { icon: Droplets, title: "Dual-Use Water Stations", desc: "Public water stations with a tap for humans and a ground-level bowl for animals. Solar-powered. Every street corner, every public park." },
  { icon: Utensils, title: "Smart Feeding Stations", desc: "AI-monitored feeding points that track animal health, flag sick animals, and alert volunteers — all powered by solar energy." },
  { icon: Shield, title: "AI Injury Detection", desc: "Cameras trained on thousands of animal images automatically detect injured animals and notify rescue teams in real-time." },
  { icon: Zap, title: "Animal-Safe Infrastructure", desc: "Warm amber street lighting that doesn't disrupt animal navigation. Wildlife crossing bridges on highways. Green corridors through cities." },
];

const iv = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } } };
const cv = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.08 } } };

export default function Animals() {
  const { data: articles } = useListArticles({ category: "animal-welfare", limit: 6 }, { query: { queryKey: getListArticlesQueryKey({ category: "animal-welfare", limit: 6 }) } });

  return (
    <div className="pt-24 pb-16 min-h-screen">
      {/* Hero */}
      <div className="relative overflow-hidden bg-[radial-gradient(ellipse_at_top,rgba(245,158,11,0.12)_0%,transparent_50%)] py-20">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <div className="w-16 h-16 rounded-2xl bg-amber-900/60 border border-amber-700/50 flex items-center justify-center mx-auto mb-6">
            <Shield className="w-8 h-8 text-amber-400" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">Animal Protection</h1>
          <p className="text-white/50 text-lg leading-relaxed">
            Animals cannot speak for themselves. They cannot vote, cannot organize, cannot demand rights. 
            They can only suffer in silence — unless we choose to listen.
          </p>
        </div>
      </div>

      {/* Problems */}
      <section className="py-16 container mx-auto px-4">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={cv}>
          <motion.h2 variants={iv} className="text-3xl font-bold text-white mb-10 text-center">What Animals Face Every Day</motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {PROBLEMS.map((p) => (
              <motion.div key={p.label} variants={iv} className="bg-white/[0.03] border border-amber-900/30 rounded-2xl p-6">
                <h3 className="font-semibold text-amber-300 text-lg mb-2">{p.label}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{p.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Technology Solutions */}
      <section className="py-16 bg-white/[0.02] border-y border-white/5">
        <div className="container mx-auto px-4">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={cv}>
            <motion.h2 variants={iv} className="text-3xl font-bold text-white mb-10 text-center">Technology for Animals</motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {SOLUTIONS.map((s) => {
                const Icon = s.icon;
                return (
                  <motion.div key={s.title} variants={iv}
                    className="bg-white/[0.03] border border-amber-900/30 rounded-2xl p-6 flex gap-5 hover:border-amber-700/40 transition-all">
                    <div className="w-12 h-12 rounded-xl bg-amber-900/40 border border-amber-800/50 flex items-center justify-center shrink-0">
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
        </div>
      </section>

      {/* How to Help */}
      <section className="py-16 container mx-auto px-4 max-w-2xl text-center">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={cv}>
          <motion.h2 variants={iv} className="text-3xl font-bold text-white mb-6">How You Can Help</motion.h2>
          <motion.div variants={iv} className="space-y-3">
            {[
              "Keep a bowl of water outside your home for street animals",
              "Feed birds with a small tray of grain and fresh water",
              "Report injured animals using our Report page",
              "Slow down near animal crossing zones",
              "Carry a small first-aid kit for injured animals",
              "Support your local animal rescue organization",
              "Never leave plastic bags where animals can reach them",
            ].map((action) => (
              <div key={action} className="flex items-center gap-3 bg-white/[0.03] border border-white/10 rounded-xl px-5 py-3 text-white/70 text-sm text-left">
                <div className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0" />
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
                className="bg-white/[0.03] border border-white/10 rounded-2xl overflow-hidden hover:border-amber-700/40 transition-all group">
                <div className="h-36 bg-gradient-to-br from-amber-900/40 to-transparent flex items-center justify-center">
                  <BookOpen className="w-10 h-10 text-amber-600/40" />
                </div>
                <div className="p-5">
                  <h3 className="font-semibold text-white text-sm leading-snug mb-2 group-hover:text-amber-300 transition-colors">{a.title}</h3>
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

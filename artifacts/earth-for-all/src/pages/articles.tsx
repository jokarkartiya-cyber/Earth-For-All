import { useState } from "react";
import { motion } from "framer-motion";
import { BookOpen, Clock } from "lucide-react";
import { useListArticles, getListArticlesQueryKey } from "@workspace/api-client-react";

const CATEGORIES = [
  { value: undefined, label: "All" },
  { value: "clean-earth", label: "Clean Earth" },
  { value: "animal-welfare", label: "Animal Welfare" },
  { value: "forest", label: "Forest" },
  { value: "water", label: "Water" },
  { value: "technology", label: "Technology" },
];

const CATEGORY_STYLE: Record<string, string> = {
  "clean-earth": "border-emerald-700/50 text-emerald-300 bg-emerald-900/30",
  "animal-welfare": "border-amber-700/50 text-amber-300 bg-amber-900/30",
  "forest": "border-green-700/50 text-green-300 bg-green-900/30",
  "water": "border-blue-700/50 text-blue-300 bg-blue-900/30",
  "technology": "border-indigo-700/50 text-indigo-300 bg-indigo-900/30",
};

const CATEGORY_LABELS: Record<string, string> = {
  "clean-earth": "Clean Earth",
  "animal-welfare": "Animal Welfare",
  "forest": "Forest",
  "water": "Water",
  "technology": "Technology",
};

const GRADIENT: Record<string, string> = {
  "clean-earth": "from-emerald-900/50 to-emerald-800/10",
  "animal-welfare": "from-amber-900/50 to-amber-800/10",
  "forest": "from-green-900/50 to-green-800/10",
  "water": "from-blue-900/50 to-blue-800/10",
  "technology": "from-indigo-900/50 to-indigo-800/10",
};

export default function Articles() {
  const [activeCategory, setActiveCategory] = useState<string | undefined>(undefined);

  const { data: articles, isLoading } = useListArticles(
    activeCategory ? { category: activeCategory, limit: 50 } : { limit: 50 },
    { query: { queryKey: getListArticlesQueryKey(activeCategory ? { category: activeCategory, limit: 50 } : { limit: 50 }) } }
  );

  const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.07 } },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
  };

  return (
    <div className="pt-24 pb-16 min-h-screen">
      <div className="relative overflow-hidden bg-[radial-gradient(ellipse_at_top,rgba(59,130,246,0.1)_0%,transparent_50%)] py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <BookOpen className="w-6 h-6 text-blue-400" />
            <span className="text-xs font-semibold uppercase tracking-widest text-blue-400/70">Education Hub</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">Learn &amp; Explore</h1>
          <p className="text-white/50 text-lg max-w-xl mx-auto">
            Understanding the problems is the first step to solving them. Read, learn, and share.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 mt-8">
        {/* Category tabs */}
        <div className="flex flex-wrap gap-3 mb-10">
          {CATEGORIES.map((c) => (
            <button
              key={c.label}
              data-testid={`filter-${c.value ?? "all"}`}
              onClick={() => setActiveCategory(c.value)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all border ${activeCategory === c.value ? "bg-white/15 text-white border-white/30" : "border-white/10 text-white/50 hover:text-white hover:border-white/20"}`}
            >
              {c.label}
            </button>
          ))}
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="bg-white/[0.03] border border-white/10 rounded-2xl overflow-hidden animate-pulse h-64" />
            ))}
          </div>
        ) : Array.isArray(articles) && articles.length > 0 ? (
          <motion.div initial="hidden" animate="show" variants={containerVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article) => (
              <motion.div key={article.id} variants={itemVariants} data-testid={`article-card-${article.id}`}
                className="bg-white/[0.03] border border-white/10 rounded-2xl overflow-hidden hover:border-white/20 hover:scale-[1.02] transition-all duration-300 group cursor-pointer">
                <div className={`h-44 bg-gradient-to-br ${GRADIENT[article.category] ?? "from-white/5 to-transparent"} flex items-center justify-center relative`}>
                  <BookOpen className="w-12 h-12 text-white/10" />
                  <div className={`absolute top-4 left-4 text-xs font-semibold px-2.5 py-1 rounded-full border ${CATEGORY_STYLE[article.category] ?? "border-white/20 text-white/60 bg-white/5"}`}>
                    {CATEGORY_LABELS[article.category] ?? article.category}
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-semibold text-white text-sm leading-snug mb-2 group-hover:text-blue-300 transition-colors">{article.title}</h3>
                  <p className="text-white/40 text-xs leading-relaxed line-clamp-3">{article.summary}</p>
                  <div className="mt-4 flex items-center gap-2 text-white/25 text-xs">
                    <Clock className="w-3 h-3" />
                    {article.readingTimeMinutes} min read
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className="text-center py-24">
            <BookOpen className="w-12 h-12 mx-auto mb-4 text-white/20" />
            <h3 className="text-xl font-semibold text-white mb-2">Articles coming soon</h3>
            <p className="text-white/40">Check back soon for educational content.</p>
          </div>
        )}
      </div>
    </div>
  );
}

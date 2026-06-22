import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Lightbulb, Plus, ChevronUp, MessageSquare } from "lucide-react";
import { collection, query, orderBy, onSnapshot, addDoc, updateDoc, doc, increment, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useAuth } from "@/hooks/use-auth";
import { CommentSection } from "@/components/CommentSection";

const CATEGORIES = [
  { value: "clean-earth", label: "Clean Earth" },
  { value: "animal-welfare", label: "Animal Welfare" },
  { value: "forest", label: "Forest & Nature" },
  { value: "water", label: "Water Conservation" },
  { value: "technology", label: "Technology" },
  { value: "cities", label: "Future Cities" },
];

const CATEGORY_STYLE: Record<string, string> = {
  "clean-earth": "border-emerald-700/50 text-emerald-300 bg-emerald-900/30",
  "animal-welfare": "border-amber-700/50 text-amber-300 bg-amber-900/30",
  "forest": "border-green-700/50 text-green-300 bg-green-900/30",
  "water": "border-blue-700/50 text-blue-300 bg-blue-900/30",
  "technology": "border-indigo-700/50 text-indigo-300 bg-indigo-900/30",
  "cities": "border-orange-700/50 text-orange-300 bg-orange-900/30",
};

interface Idea {
  id: string;
  title: string;
  description: string;
  category: string;
  authorName: string;
  userId: string;
  upvotes: number;
  createdAt: any;
}

export default function Ideas() {
  const { user } = useAuth();
  const [activeCategory, setActiveCategory] = useState<string | undefined>(undefined);
  const [showForm, setShowForm] = useState(false);
  const [ideas, setIdeas] = useState<Idea[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const q = query(collection(db, "ideas"), orderBy("createdAt", "desc"));
    const unsub = onSnapshot(q, (snap) => {
      setIdeas(snap.docs.map((d) => ({ id: d.id, ...d.data() } as Idea)));
      setLoading(false);
    });
    return unsub;
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!user) return;
    if (title.length < 5 || description.length < 10 || !category) {
      setError("Title (5+ chars), description (10+ chars), and category required");
      return;
    }
    await addDoc(collection(db, "ideas"), {
      title, description, category,
      authorName: user.name,
      userId: user.id,
      upvotes: 0,
      createdAt: serverTimestamp(),
    });
    setTitle(""); setDescription(""); setCategory(""); setShowForm(false); setError("");
  }

  async function handleUpvote(id: string) {
    await updateDoc(doc(db, "ideas", id), { upvotes: increment(1) });
  }

  const filtered = activeCategory ? ideas.filter((i) => i.category === activeCategory) : ideas;

  const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.06 } },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 16 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
  };

  return (
    <div className="pt-24 pb-16 min-h-screen">
      <div className="relative overflow-hidden bg-[radial-gradient(ellipse_at_top,rgba(245,158,11,0.1)_0%,transparent_50%)] py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Lightbulb className="w-6 h-6 text-amber-400" />
            <span className="text-xs font-semibold uppercase tracking-widest text-amber-400/70">Community Ideas</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">Ideas Board</h1>
          <p className="text-white/50 text-lg max-w-xl mx-auto mb-8">
            Share your vision for a better Earth. Every idea, however small, can spark a revolution.
          </p>
          {user && (
            <button onClick={() => setShowForm(!showForm)}
              className="bg-amber-600 hover:bg-amber-500 text-white h-12 px-8 rounded-xl font-medium transition-all inline-flex items-center gap-2">
              <Plus className="w-4 h-4" /> Submit Your Idea
            </button>
          )}
        </div>
      </div>

      <div className="container mx-auto px-4 mt-8">
        {showForm && (
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
            className="bg-[#0a1a14] border border-white/10 rounded-2xl p-8 mb-10 max-w-2xl mx-auto">
            <h2 className="text-lg font-semibold text-white mb-6">Share Your Idea</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-xs text-white/60 font-medium mb-1.5 block">Idea Title</label>
                <input type="text" value={title} onChange={e => setTitle(e.target.value)} required
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder:text-white/20 outline-none focus:border-amber-500/50 transition-colors"
                  placeholder="e.g. Solar-powered animal water stations" />
              </div>
              <div>
                <label className="text-xs text-white/60 font-medium mb-1.5 block">Description</label>
                <textarea value={description} onChange={e => setDescription(e.target.value)} required
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder:text-white/20 outline-none focus:border-amber-500/50 transition-colors min-h-[100px]"
                  placeholder="Explain how this idea would help..." />
              </div>
              <div>
                <label className="text-xs text-white/60 font-medium mb-1.5 block">Category</label>
                <select value={category} onChange={e => setCategory(e.target.value)} required
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-amber-500/50 transition-colors">
                  <option value="" disabled className="text-white/30">Select a category</option>
                  {CATEGORIES.map((c) => <option key={c.value} value={c.value} className="text-white">{c.label}</option>)}
                </select>
              </div>
              {error && <p className="text-red-400 text-xs">{error}</p>}
              <div className="flex gap-3">
                <button type="submit" className="bg-amber-600 hover:bg-amber-500 text-white font-medium px-6 py-2.5 rounded-xl text-sm transition-all">Submit Idea</button>
                <button type="button" onClick={() => setShowForm(false)} className="text-white/50 hover:text-white px-4 py-2.5 text-sm">Cancel</button>
              </div>
            </form>
          </motion.div>
        )}

        <div className="flex flex-wrap gap-3 mb-8">
          <button onClick={() => setActiveCategory(undefined)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all border ${!activeCategory ? "bg-white/15 text-white border-white/30" : "border-white/10 text-white/50 hover:text-white hover:border-white/20"}`}>All</button>
          {CATEGORIES.map((c) => (
            <button key={c.value} onClick={() => setActiveCategory(c.value === activeCategory ? undefined : c.value)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all border ${activeCategory === c.value ? "bg-white/15 text-white border-white/30" : "border-white/10 text-white/50 hover:text-white hover:border-white/20"}`}>{c.label}</button>
          ))}
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {Array.from({ length: 6 }).map((_, i) => <div key={i} className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 animate-pulse h-44" />)}
          </div>
        ) : filtered.length > 0 ? (
          <motion.div initial="hidden" animate="show" variants={containerVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((idea) => (
              <motion.div key={idea.id} variants={itemVariants}
                className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 hover:bg-white/[0.06] hover:border-white/20 transition-all duration-300 group flex flex-col">
                <div className={`inline-block self-start text-xs font-semibold px-2.5 py-1 rounded-full mb-4 border ${CATEGORY_STYLE[idea.category] ?? "border-white/20 text-white/60 bg-white/5"}`}>
                  {CATEGORIES.find((c) => c.value === idea.category)?.label ?? idea.category}
                </div>
                <h3 className="font-semibold text-white text-sm leading-snug mb-2 group-hover:text-amber-300 transition-colors">{idea.title}</h3>
                <p className={`text-white/40 text-xs leading-relaxed ${expandedId !== idea.id ? "line-clamp-3" : ""}`}>{idea.description}</p>
                {idea.description.length > 150 && (
                  <button onClick={() => setExpandedId(expandedId === idea.id ? null : idea.id)} className="text-[11px] text-amber-400/60 hover:text-amber-300 mt-1 text-left">
                    {expandedId === idea.id ? "Show less" : "Read more"}
                  </button>
                )}
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-white/30 text-xs">{idea.authorName}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-white/20 text-xs flex items-center gap-1"><MessageSquare className="w-3 h-3" /> 0</span>
                    <button onClick={() => handleUpvote(idea.id)}
                      className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-emerald-800/50 text-emerald-400 hover:bg-emerald-900/30 transition-all text-xs font-semibold">
                      <ChevronUp className="w-3.5 h-3.5" /> {idea.upvotes}
                    </button>
                  </div>
                </div>
                <CommentSection itemId={idea.id} itemType="idea" />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className="text-center py-24">
            <div className="text-5xl mb-4">🌱</div>
            <h3 className="text-xl font-semibold text-white mb-2">Be the first to share an idea</h3>
            <p className="text-white/40">Every revolution starts with a single thought. What's yours?</p>
          </div>
        )}
      </div>
    </div>
  );
}

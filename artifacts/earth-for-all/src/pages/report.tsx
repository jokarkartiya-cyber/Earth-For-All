import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { AlertTriangle, MapPin, MessageSquare } from "lucide-react";
import { collection, query, orderBy, onSnapshot, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useAuth } from "@/hooks/use-auth";
import { CommentSection } from "@/components/CommentSection";

const TYPES = [
  { value: "pollution", label: "Air / Smoke Pollution" },
  { value: "garbage", label: "Garbage / Waste" },
  { value: "animal-emergency", label: "Animal Emergency" },
  { value: "tree-cutting", label: "Illegal Tree Cutting" },
  { value: "water-pollution", label: "Water Pollution" },
];

const TYPE_LABELS: Record<string, string> = { pollution: "Pollution", "animal-emergency": "Animal Emergency", "tree-cutting": "Tree Cutting", "water-pollution": "Water Pollution", garbage: "Garbage" };

const STATUS_STYLE: Record<string, string> = {
  pending: "bg-yellow-900/40 text-yellow-300 border-yellow-700/50",
  "in-progress": "bg-blue-900/40 text-blue-300 border-blue-700/50",
  resolved: "bg-emerald-900/40 text-emerald-300 border-emerald-700/50",
};

interface Report {
  id: string;
  type: string;
  description: string;
  location: string;
  reporterName: string;
  userId: string;
  status: string;
  createdAt: any;
}

export default function Report() {
  const { user } = useAuth();
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);
  const [type, setType] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const q = query(collection(db, "reports"), orderBy("createdAt", "desc"));
    const unsub = onSnapshot(q, (snap) => {
      setReports(snap.docs.map((d) => ({ id: d.id, ...d.data() } as Report)));
      setLoading(false);
    });
    return unsub;
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!user) return;
    if (!type || description.length < 10 || location.length < 3) {
      setError("Type, description (10+ chars), and location required");
      return;
    }
    await addDoc(collection(db, "reports"), {
      type, description, location,
      reporterName: user.name,
      userId: user.id,
      status: "pending",
      createdAt: serverTimestamp(),
    });
    setType(""); setDescription(""); setLocation(""); setError("");
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.07 } },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 16 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
  };

  return (
    <div className="pt-24 pb-16 min-h-screen">
      <div className="relative overflow-hidden bg-[radial-gradient(ellipse_at_top,rgba(239,68,68,0.08)_0%,transparent_50%)] py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <AlertTriangle className="w-6 h-6 text-red-400" />
            <span className="text-xs font-semibold uppercase tracking-widest text-red-400/70">Problem Reporting</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">Report an Issue</h1>
          <p className="text-white/50 text-lg max-w-xl mx-auto">
            Spotted pollution, an injured animal, or illegal tree cutting? Report it here. Your voice can save lives.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 mt-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h2 className="text-xl font-bold text-white mb-6">Submit a Report</h2>
            <div className="bg-[#0a1a14] border border-white/10 rounded-2xl p-8">
              {user ? (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="text-xs text-white/60 font-medium mb-1.5 block">Report Type</label>
                    <select value={type} onChange={e => setType(e.target.value)} required
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-red-500/50 transition-colors">
                      <option value="" disabled className="text-white/30">What are you reporting?</option>
                      {TYPES.map((t) => <option key={t.value} value={t.value} className="text-white">{t.label}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="text-xs text-white/60 font-medium mb-1.5 block">Description</label>
                    <textarea value={description} onChange={e => setDescription(e.target.value)} required
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder:text-white/20 outline-none focus:border-red-500/50 transition-colors min-h-[120px]"
                      placeholder="What did you see? Be specific — it helps authorities respond faster." />
                  </div>
                  <div>
                    <label className="text-xs text-white/60 font-medium mb-1.5 block">Location</label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                      <input type="text" value={location} onChange={e => setLocation(e.target.value)} required
                        className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white text-sm placeholder:text-white/20 outline-none focus:border-red-500/50 transition-colors"
                        placeholder="Street, neighborhood, city..." />
                    </div>
                  </div>
                  {error && <p className="text-red-400 text-xs">{error}</p>}
                  <button type="submit" className="w-full bg-red-700 hover:bg-red-600 text-white font-medium h-12 rounded-xl text-sm transition-all">
                    Submit Report
                  </button>
                </form>
              ) : (
                <p className="text-white/40 text-sm text-center py-8">Sign in to submit a report.</p>
              )}
            </div>
          </div>

          <div>
            <h2 className="text-xl font-bold text-white mb-6">Recent Reports</h2>
            {loading ? (
              <div className="space-y-4">
                {Array.from({ length: 5 }).map((_, i) => <div key={i} className="bg-white/[0.03] border border-white/10 rounded-xl p-5 animate-pulse h-24" />)}
              </div>
            ) : reports.length > 0 ? (
              <motion.div initial="hidden" animate="show" variants={containerVariants} className="space-y-4">
                {reports.map((report) => (
                  <motion.div key={report.id} variants={itemVariants}
                    className="bg-white/[0.03] border border-white/10 rounded-xl p-5 hover:bg-white/[0.05] transition-all">
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <span className="text-xs border border-red-800/50 text-red-300 bg-red-900/20 px-2.5 py-1 rounded-full font-medium">
                        {TYPE_LABELS[report.type] ?? report.type}
                      </span>
                      <span className={`text-xs px-2.5 py-1 rounded-full border ${STATUS_STYLE[report.status] ?? "bg-white/10 text-white/50 border-white/20"}`}>
                        {report.status}
                      </span>
                    </div>
                    <p className="text-white/70 text-sm line-clamp-2 mb-2">{report.description}</p>
                    <div className="flex items-center gap-1.5 text-white/30 text-xs">
                      <MapPin className="w-3 h-3" /> {report.location}
                      <span className="ml-auto text-white/20 text-[11px]">{report.reporterName}</span>
                    </div>
                    <CommentSection itemId={report.id} itemType="report" />
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <div className="text-center py-16 text-white/30">
                <AlertTriangle className="w-10 h-10 mx-auto mb-3 opacity-30" />
                <p>No reports yet. Be the first to report an issue.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Building2, Clock, MapPin, ChevronRight, MessageSquare, Send,
  CheckCircle2, AlertTriangle, ExternalLink, User, Phone, Mail, Search,
} from "lucide-react";
import { collection, query, where, orderBy, onSnapshot, updateDoc, doc, serverTimestamp, Timestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useAuth } from "@/hooks/use-auth";
import { useLocation } from "wouter";

const DEPARTMENTS = [
  { id: "pollution-board", name: "Pollution Control Board", emoji: "🏭", color: "from-emerald-600 to-teal-700" },
  { id: "municipal", name: "Municipal Corporation", emoji: "🏛️", color: "from-blue-600 to-indigo-700" },
  { id: "forest", name: "Forest Department", emoji: "🌳", color: "from-green-600 to-emerald-700" },
  { id: "animal-welfare", name: "Animal Welfare", emoji: "🐾", color: "from-amber-600 to-orange-700" },
  { id: "fire-services", name: "Fire Services", emoji: "🚒", color: "from-red-600 to-rose-700" },
  { id: "water-resources", name: "Water Resources Dept.", emoji: "💧", color: "from-cyan-600 to-blue-700" },
  { id: "local-admin", name: "Local Administration", emoji: "📋", color: "from-slate-600 to-gray-700" },
];

const TYPE_LABELS: Record<string, string> = {
  pollution: "Pollution", garbage: "Garbage/Waste",
  "animal-emergency": "Animal Emergency", "tree-cutting": "Tree Cutting",
  "water-pollution": "Water Pollution", "forest-fire": "Forest Fire",
  poaching: "Poaching/Hunting", other: "Other",
};

const SEVERITY_STYLE: Record<string, string> = {
  low: "text-green-400 bg-green-900/20 border-green-800/30",
  medium: "text-yellow-400 bg-yellow-900/20 border-yellow-800/30",
  high: "text-orange-400 bg-orange-900/20 border-orange-800/30",
  critical: "text-red-400 bg-red-900/20 border-red-800/30",
};

const STATUS_OPTIONS = [
  { value: "pending", label: "🟡 Pending", color: "text-yellow-300 bg-yellow-900/20" },
  { value: "in-progress", label: "🔵 Under Review", color: "text-blue-300 bg-blue-900/20" },
  { value: "resolved", label: "🟢 Resolved", color: "text-emerald-300 bg-emerald-900/20" },
];

interface Report {
  id: string;
  type: string;
  severity: string;
  description: string;
  location: string;
  latitude: number;
  longitude: number;
  photos: string[];
  reporterName: string;
  reporterPhone: string;
  reporterEmail: string;
  reporterDetailsVisible: boolean;
  status: string;
  assignedDepartment: string;
  departmentResponse: string;
  departmentResponseAt: Timestamp;
  createdAt: Timestamp;
  dateTime: Timestamp;
}

export default function Admin() {
  const { user } = useAuth();
  const [, navigate] = useLocation();
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const dept = user?.department ? DEPARTMENTS.find(d => d.id === user.department) : null;
  const isDepartmentAdmin = user?.role === "department" && !!user?.department;

  useEffect(() => {
    if (!loading && !isDepartmentAdmin) {
      navigate("/");
    }
  }, [loading, isDepartmentAdmin]);

  useEffect(() => {
    if (!user?.department) return;
    const q = query(
      collection(db, "reports"),
      where("assignedDepartment", "==", user.department),
      orderBy("createdAt", "desc")
    );
    const unsub = onSnapshot(q, (snap) => {
      setReports(snap.docs.map((d) => ({ id: d.id, ...d.data() } as Report)));
      setLoading(false);
    });
    return unsub;
  }, [user?.department]);

  async function handleStatusChange(reportId: string, newStatus: string) {
    await updateDoc(doc(db, "reports", reportId), { status: newStatus });
  }

  async function handleResponse(reportId: string, response: string) {
    if (!response.trim()) return;
    await updateDoc(doc(db, "reports", reportId), {
      departmentResponse: response.trim(),
      departmentResponseAt: serverTimestamp(),
    });
  }

  const filtered = reports.filter(r => {
    if (statusFilter !== "all" && r.status !== statusFilter) return false;
    if (search) {
      const q = search.toLowerCase();
      if (!r.description.toLowerCase().includes(q) && !r.location.toLowerCase().includes(q) && !r.reporterName.toLowerCase().includes(q)) return false;
    }
    return true;
  });

  if (loading) {
    return (
      <div className="pt-24 min-h-screen flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-2 border-emerald-500 border-t-transparent rounded-full" />
      </div>
    );
  }

  if (!isDepartmentAdmin) return null;

  return (
    <div className="pt-24 pb-16 min-h-screen">
      {/* Header */}
      <div className="relative overflow-hidden bg-[radial-gradient(ellipse_at_top,rgba(16,185,129,0.08)_0%,transparent_50%)] py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4 mb-4">
            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${dept?.color} flex items-center justify-center text-2xl shadow-lg`}>
              {dept?.emoji}
            </div>
            <div>
              <p className="text-[10px] text-emerald-400 font-semibold uppercase tracking-widest">Department Admin Panel</p>
              <h1 className="text-2xl md:text-3xl font-bold text-white">{dept?.name}</h1>
              <p className="text-white/40 text-sm">{reports.length} reports assigned</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 mt-8">
        {/* Filters */}
        <div className="flex flex-wrap gap-3 mb-6 items-center">
          <div className="relative flex-1 min-w-[200px] max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
            <input type="text" value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Search reports..."
              className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-white text-sm placeholder:text-white/20 outline-none focus:border-emerald-500/50 transition-colors" />
          </div>
          <div className="flex gap-2">
            {["all", "pending", "in-progress", "resolved"].map(s => (
              <button key={s} onClick={() => setStatusFilter(s)}
                className={`px-3.5 py-2 rounded-lg text-xs font-medium border transition-all ${
                  statusFilter === s
                    ? "bg-emerald-600 border-emerald-500 text-white"
                    : "bg-white/5 border-white/10 text-white/50 hover:text-white/80 hover:border-white/20"
                }`}>
                {s === "all" ? "All" : s === "in-progress" ? "Under Review" : s.charAt(0).toUpperCase() + s.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Reports List */}
        {filtered.length === 0 ? (
          <div className="text-center py-16 text-white/30">
            <CheckCircle2 className="w-12 h-12 mx-auto mb-4 opacity-30" />
            <p className="text-sm">No {statusFilter !== "all" ? statusFilter : ""} reports found</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filtered.map((report) => (
              <AdminReportCard key={report.id} report={report}
                onStatusChange={(s) => handleStatusChange(report.id, s)}
                onResponse={(r) => handleResponse(report.id, r)} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function AdminReportCard({ report, onStatusChange, onResponse }: {
  report: Report;
  onStatusChange: (status: string) => void;
  onResponse: (response: string) => void;
}) {
  const [responseText, setResponseText] = useState("");
  const [showResponse, setShowResponse] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/[0.03] border border-white/10 rounded-xl overflow-hidden hover:bg-white/[0.05] transition-all"
    >
      <div className="p-5 space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-xs bg-white/5 border border-white/10 px-2 py-0.5 rounded-full">
                {TYPE_LABELS[report.type] ?? report.type}
              </span>
              {report.severity && (
                <span className={`text-[10px] px-2 py-0.5 rounded-full border ${SEVERITY_STYLE[report.severity] || ""}`}>
                  {report.severity}
                </span>
              )}
            </div>
            <p className="text-white/70 text-sm leading-relaxed">{report.description}</p>
          </div>
        </div>

        {/* Info row */}
        <div className="flex flex-wrap gap-x-6 gap-y-1.5 text-[11px] text-white/40">
          <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {report.location}</span>
          {report.dateTime?.toDate && (
            <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {report.dateTime.toDate().toLocaleString()}</span>
          )}
          {report.reporterDetailsVisible && report.reporterPhone && (
            <span className="flex items-center gap-1"><Phone className="w-3 h-3" /> {report.reporterPhone}</span>
          )}
          {report.reporterDetailsVisible && report.reporterEmail && (
            <span className="flex items-center gap-1"><Mail className="w-3 h-3" /> {report.reporterEmail}</span>
          )}
        </div>

        {/* Existing response */}
        {report.departmentResponse && (
          <div className="bg-blue-900/10 border border-blue-800/20 rounded-lg p-3">
            <p className="text-[10px] text-blue-300 font-medium uppercase tracking-wider mb-1">Your Response</p>
            <p className="text-xs text-blue-200/80">{report.departmentResponse}</p>
          </div>
        )}

        {/* Actions */}
        <div className="flex flex-wrap items-center gap-3 pt-2 border-t border-white/5">
          {/* Status dropdown */}
          <div className="flex items-center gap-2">
            <span className="text-[10px] text-white/30">Status:</span>
            <select value={report.status} onChange={e => onStatusChange(e.target.value)}
              className="bg-white/5 border border-white/10 rounded-lg px-2.5 py-1.5 text-white text-xs outline-none focus:border-emerald-500/50 transition-colors">
              {STATUS_OPTIONS.map(s => (
                <option key={s.value} value={s.value}>{s.label}</option>
              ))}
            </select>
          </div>

          {/* Respond button */}
          <button onClick={() => setShowResponse(!showResponse)}
            className={`flex items-center gap-1.5 text-[10px] transition-colors ${
              showResponse ? "text-emerald-400" : "text-white/30 hover:text-white/60"
            }`}>
            <MessageSquare className="w-3 h-3" /> {showResponse ? "Cancel" : "Write Response"}
          </button>
        </div>

        {/* Response input */}
        {showResponse && (
          <div className="flex gap-2">
            <input type="text" value={responseText} onChange={e => setResponseText(e.target.value)}
              placeholder="Type department response..."
              className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-xs placeholder:text-white/20 outline-none focus:border-emerald-500/50 transition-colors" />
            <button onClick={() => { onResponse(responseText); setResponseText(""); setShowResponse(false); }}
              disabled={!responseText.trim()}
              className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-500 disabled:bg-emerald-600/50 text-white rounded-lg text-xs transition-all flex items-center gap-1.5">
              <Send className="w-3 h-3" /> Send
            </button>
          </div>
        )}
      </div>
    </motion.div>
  );
}

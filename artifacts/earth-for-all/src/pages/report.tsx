import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  AlertTriangle, MapPin, ExternalLink, Image, Video, MessageSquare,
  Shield, Clock, User, Phone, Mail, Eye, EyeOff, Building2, ChevronRight,
  ArrowRight, CheckCircle2, SendHorizonal,
} from "lucide-react";
import { collection, query, orderBy, onSnapshot, addDoc, updateDoc, doc, setDoc, serverTimestamp, Timestamp, arrayUnion } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useAuth } from "@/hooks/use-auth";
import { CommentSection } from "@/components/CommentSection";
import { LocationPicker } from "@/components/LocationPicker";
import { PhotoUpload } from "@/components/PhotoUpload";

/* ─── DEPARTMENTS ─── */
const DEPARTMENTS = [
  { id: "pollution-board", name: "Pollution Control Board", emoji: "🏭", tagline: "Air & water pollution control", color: "from-emerald-600 to-teal-700" },
  { id: "municipal", name: "Municipal Corporation", emoji: "🏛️", tagline: "Waste management & sanitation", color: "from-blue-600 to-indigo-700" },
  { id: "forest", name: "Forest Department", emoji: "🌳", tagline: "Forest, wildlife & tree protection", color: "from-green-600 to-emerald-700" },
  { id: "animal-welfare", name: "Animal Welfare", emoji: "🐾", tagline: "Animal rescue & protection", color: "from-amber-600 to-orange-700" },
  { id: "fire-services", name: "Fire Services", emoji: "🚒", tagline: "Fire emergencies & response", color: "from-red-600 to-rose-700" },
  { id: "water-resources", name: "Water Resources Dept.", emoji: "💧", tagline: "Water body protection", color: "from-cyan-600 to-blue-700" },
  { id: "local-admin", name: "Local Administration", emoji: "📋", tagline: "General administration", color: "from-slate-600 to-gray-700" },
];

const CATEGORY_TO_DEPT: Record<string, string> = {
  pollution: "pollution-board",
  garbage: "municipal",
  "animal-emergency": "animal-welfare",
  "tree-cutting": "forest",
  "water-pollution": "water-resources",
  "forest-fire": "forest",
  poaching: "forest",
  other: "local-admin",
};

const TYPES = [
  { value: "pollution", label: "Air / Smoke Pollution", emoji: "💨" },
  { value: "garbage", label: "Garbage / Waste", emoji: "🗑️" },
  { value: "animal-emergency", label: "Animal Emergency", emoji: "🐾" },
  { value: "tree-cutting", label: "Illegal Tree Cutting", emoji: "🌲" },
  { value: "water-pollution", label: "Water Pollution", emoji: "💧" },
  { value: "forest-fire", label: "Forest Fire", emoji: "🔥" },
  { value: "poaching", label: "Poaching / Hunting", emoji: "🏹" },
  { value: "other", label: "Other", emoji: "🔔" },
];

const TYPE_LABELS: Record<string, string> = Object.fromEntries(TYPES.map(t => [t.value, t.label]));
const TYPE_EMOJI: Record<string, string> = Object.fromEntries(TYPES.map(t => [t.value, t.emoji]));

const SEVERITIES = [
  { value: "low", label: "Low", color: "text-green-400", bg: "bg-green-900/20 border-green-800/30", icon: "🟢" },
  { value: "medium", label: "Medium", color: "text-yellow-400", bg: "bg-yellow-900/20 border-yellow-800/30", icon: "🟡" },
  { value: "high", label: "High", color: "text-orange-400", bg: "bg-orange-900/20 border-orange-800/30", icon: "🟠" },
  { value: "critical", label: "Critical", color: "text-red-400", bg: "bg-red-900/20 border-red-800/30", icon: "🔴" },
];
const SEVERITY_STYLE: Record<string, string> = Object.fromEntries(SEVERITIES.map(s => [s.value, `${s.color} ${s.bg}`]));

const STATUS_CONFIG = [
  { value: "pending", label: "Pending", color: "text-yellow-300", bg: "bg-yellow-900/40 border-yellow-700/50", icon: "🟡" },
  { value: "in-progress", label: "Under Review", color: "text-blue-300", bg: "bg-blue-900/40 border-blue-700/50", icon: "🔵" },
  { value: "resolved", label: "Resolved", color: "text-emerald-300", bg: "bg-emerald-900/40 border-emerald-700/50", icon: "🟢" },
];
const STATUS_STYLE: Record<string, string> = Object.fromEntries(STATUS_CONFIG.map(s => [s.value, `${s.color} ${s.bg}`]));

interface Report {
  id: string;
  type: string;
  severity: string;
  description: string;
  dateTime: Timestamp;
  location: string;
  latitude: number;
  longitude: number;
  photos: string[];
  reporterName: string;
  reporterPhone: string;
  reporterEmail: string;
  reporterDetailsVisible: boolean;
  userId: string;
  status: string;
  assignedDepartment: string;
  departmentResponse: string;
  departmentResponseAt: Timestamp;
  replies: ReplyItem[];
  createdAt: Timestamp;
}

interface ReplyItem {
  id: string;
  text: string;
  authorName: string;
  authorId: string;
  isOfficial: boolean;
  createdAt: Timestamp;
}

function getDept(id: string) {
  return DEPARTMENTS.find(d => d.id === id);
}

export default function Report() {
  const { user } = useAuth();
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);

  const [type, setType] = useState("");
  const [severity, setSeverity] = useState("");
  const [description, setDescription] = useState("");
  const [dateTime, setDateTime] = useState(() => {
    const now = new Date();
    now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
    return now.toISOString().slice(0, 16);
  });
  const [locationText, setLocationText] = useState("");
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [photos, setPhotos] = useState<string[]>([]);
  const [reporterName, setReporterName] = useState("");
  const [reporterPhone, setReporterPhone] = useState("");
  const [reporterEmail, setReporterEmail] = useState("");
  const [showReporterDetails, setShowReporterDetails] = useState(false);
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const assignedDept = type ? getDept(CATEGORY_TO_DEPT[type]) : null;

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
    if (!type || !severity || description.length < 10 || !locationText) {
      setError("Category, severity, description, and location are required");
      return;
    }
    const deptId = CATEGORY_TO_DEPT[type] || "local-admin";
    const reportRef = await addDoc(collection(db, "reports"), {
      type, severity, description,
      dateTime: Timestamp.fromDate(new Date(dateTime)),
      location: locationText, latitude, longitude,
      photos,
      reporterName: showReporterDetails ? reporterName || user.name : "",
      reporterPhone: showReporterDetails ? reporterPhone : "",
      reporterEmail: showReporterDetails ? reporterEmail : "",
      reporterDetailsVisible: showReporterDetails,
      reporterId: user.id,
      status: "pending",
      assignedDepartment: deptId,
      departmentResponse: "",
      departmentResponseAt: null,
      replies: [],
      createdAt: serverTimestamp(),
    });
    // Create notification + email for all users
    const notifId = `report_${reportRef.id}`;
    const deptName = getDept(deptId)?.name || "Department";
    const catLabel = TYPE_LABELS[type] || "Environmental";
    await setDoc(doc(db, "notifications", notifId), {
      type: "new-report",
      message: `New ${catLabel} report submitted → ${deptName}`,
      reportId: reportRef.id,
      reportType: type,
      department: deptId,
      read: false,
      emailStatus: "pending",
      createdAt: serverTimestamp(),
    });
    setType(""); setSeverity(""); setDescription("");
    const now = new Date(); now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
    setDateTime(now.toISOString().slice(0, 16));
    setLocationText(""); setLatitude(0); setLongitude(0); setPhotos([]);
    setReporterName(""); setReporterPhone(""); setReporterEmail("");
    setShowReporterDetails(false);
    setError(""); setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  }

  return (
    <div className="pt-24 pb-16 min-h-screen">
      <div className="relative overflow-hidden bg-[radial-gradient(ellipse_at_top,rgba(239,68,68,0.08)_0%,transparent_50%)] py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <AlertTriangle className="w-6 h-6 text-red-400" />
            <span className="text-xs font-semibold uppercase tracking-widest text-red-400/70">Report an Issue</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">Report an Issue</h1>
          <p className="text-white/50 text-lg max-w-xl mx-auto">
            Your report goes directly to the concerned government department for action.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 mt-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* ──── FORM ──── */}
          <div>
            <h2 className="text-xl font-bold text-white mb-6">Submit a Report</h2>

            {user ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Section: Basic Info */}
                <div className="bg-[#0a1a14] border border-white/10 rounded-2xl p-6 space-y-5">
                  <h3 className="text-xs font-semibold uppercase tracking-widest text-white/30 flex items-center gap-2">
                    <Shield className="w-3.5 h-3.5" /> Basic Information
                  </h3>

                  <div>
                    <label className="text-xs text-white/60 font-medium mb-1.5 block">Category <span className="text-red-400">*</span></label>
                    <select value={type} onChange={e => setType(e.target.value)} required
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-red-500/50 transition-colors appearance-none">
                      <option value="" disabled>Select category</option>
                      {TYPES.map(t => (
                        <option key={t.value} value={t.value}>{t.emoji} {t.label}</option>
                      ))}
                    </select>
                  </div>

                  {/* Auto-assigned department */}
                  {assignedDept && (
                    <div className="bg-gradient-to-r from-white/5 to-transparent border border-white/10 rounded-xl p-4 flex items-start gap-3">
                      <div className={`w-9 h-9 rounded-lg bg-gradient-to-br ${assignedDept.color} flex items-center justify-center text-lg shrink-0`}>
                        {assignedDept.emoji}
                      </div>
                      <div className="min-w-0">
                        <p className="text-[10px] text-white/30 uppercase tracking-wider mb-0.5">Assigned Department</p>
                        <p className="text-white/100 text-sm font-medium">{assignedDept.name}</p>
                        <p className="text-white/40 text-xs">{assignedDept.tagline}</p>
                        <div className="flex items-center gap-1 mt-1.5 text-[10px] text-emerald-400">
                          <ArrowRight className="w-3 h-3" /> Will be notified automatically
                        </div>
                      </div>
                    </div>
                  )}

                  <div>
                    <label className="text-xs text-white/60 font-medium mb-1.5 block">Severity <span className="text-red-400">*</span></label>
                    <div className="grid grid-cols-4 gap-2">
                      {SEVERITIES.map(s => (
                        <button key={s.value} type="button" onClick={() => setSeverity(s.value)}
                          className={`px-3 py-2.5 rounded-xl text-xs font-medium border transition-all text-center ${
                            severity === s.value
                              ? `${s.bg} ${s.color} border-current`
                              : "bg-white/5 border-white/10 text-white/40 hover:text-white/60 hover:border-white/20"
                          }`}>
                          <div className="text-base mb-0.5">{s.icon}</div>
                          {s.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-xs text-white/60 font-medium mb-1.5 block">Description <span className="text-red-400">*</span></label>
                    <textarea value={description} onChange={e => setDescription(e.target.value)} required rows={4}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder:text-white/20 outline-none focus:border-red-500/50 transition-colors resize-none"
                      placeholder="What did you see? Describe the issue in detail..." />
                  </div>

                  <div>
                    <label className="text-xs text-white/60 font-medium mb-1.5 block">Date & Time</label>
                    <div className="relative">
                      <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/30 pointer-events-none" />
                      <input type="datetime-local" value={dateTime} onChange={e => setDateTime(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white text-sm outline-none focus:border-red-500/50 transition-colors [color-scheme:dark]" />
                    </div>
                  </div>
                </div>

                {/* Section: Location */}
                <div className="bg-[#0a1a14] border border-white/10 rounded-2xl p-6 space-y-4">
                  <h3 className="text-xs font-semibold uppercase tracking-widest text-white/30 flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5" /> Location <span className="text-red-400">*</span>
                  </h3>
                  <LocationPicker onLocationSelect={(lat, lng, addr) => { setLatitude(lat); setLongitude(lng); setLocationText(addr); }} />
                </div>

                {/* Section: Proof */}
                <div className="bg-[#0a1a14] border border-white/10 rounded-2xl p-6 space-y-4">
                  <h3 className="text-xs font-semibold uppercase tracking-widest text-white/30 flex items-center gap-2">
                    <Image className="w-3.5 h-3.5" /> Photo / Video Proof
                  </h3>
                  <PhotoUpload onPhotosChange={setPhotos} max={5} />
                </div>

                {/* Section: Reporter Details */}
                <div className="bg-[#0a1a14] border border-white/10 rounded-2xl p-6 space-y-4">
                  <button type="button" onClick={() => setShowReporterDetails(!showReporterDetails)}
                    className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-white/30 hover:text-white/50 transition-colors w-full text-left">
                    <User className="w-3.5 h-3.5" />
                    Reporter Details
                    {showReporterDetails ? <EyeOff className="w-3 h-3 ml-auto" /> : <Eye className="w-3 h-3 ml-auto" />}
                  </button>
                  {showReporterDetails && (
                    <div className="space-y-4 pt-2">
                      <div>
                        <label className="text-xs text-white/60 font-medium mb-1.5 block">Your Name</label>
                        <input type="text" value={reporterName} onChange={e => setReporterName(e.target.value)}
                          placeholder={user.name}
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder:text-white/20 outline-none focus:border-emerald-500/50 transition-colors" />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="text-xs text-white/60 font-medium mb-1.5 block">Phone</label>
                          <div className="relative">
                            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/30 pointer-events-none" />
                            <input type="tel" value={reporterPhone} onChange={e => setReporterPhone(e.target.value)}
                              placeholder="+91 XXXXX XXXXX"
                              className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white text-sm placeholder:text-white/20 outline-none focus:border-emerald-500/50 transition-colors" />
                          </div>
                        </div>
                        <div>
                          <label className="text-xs text-white/60 font-medium mb-1.5 block">Email</label>
                          <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/30 pointer-events-none" />
                            <input type="email" value={reporterEmail} onChange={e => setReporterEmail(e.target.value)}
                              placeholder="email@example.com"
                              className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white text-sm placeholder:text-white/20 outline-none focus:border-emerald-500/50 transition-colors" />
                          </div>
                        </div>
                      </div>
                      <p className="text-[10px] text-white/20">Optional. Shared with department for follow-up.</p>
                    </div>
                  )}
                </div>

                {error && <p className="text-red-400 text-xs text-center">{error}</p>}
                {submitted && (
                  <div className="bg-emerald-900/20 border border-emerald-700/30 rounded-xl p-4 text-center">
                    <CheckCircle2 className="w-8 h-8 mx-auto mb-2 text-emerald-400" />
                    <p className="text-emerald-300 text-sm font-medium">Report Submitted!</p>
                    <p className="text-emerald-400/60 text-xs mt-1">Assigned department will review and respond.</p>
                  </div>
                )}

                <button type="submit"
                  className="w-full bg-red-700 hover:bg-red-600 text-white font-medium h-12 rounded-xl text-sm transition-all flex items-center justify-center gap-2">
                  <SendHorizonal className="w-4 h-4" />
                  Submit Report to Department
                </button>
              </form>
            ) : (
              <div className="bg-[#0a1a14] border border-white/10 rounded-2xl p-8 text-center">
                <AlertTriangle className="w-10 h-10 mx-auto mb-3 opacity-30 text-white/40" />
                <p className="text-white/40 text-sm mb-1">Sign in required</p>
                <p className="text-xs text-white/20">Please sign in to submit an environmental report.</p>
              </div>
            )}
          </div>

          {/* ──── REPORTS LIST ──── */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white">Recent Reports</h2>
              {!loading && <span className="text-xs text-white/30">{reports.length} total</span>}
            </div>
            {loading ? (
              <div className="space-y-4">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="bg-white/[0.03] border border-white/10 rounded-xl p-5 animate-pulse space-y-2">
                    <div className="h-4 bg-white/5 rounded w-1/4" />
                    <div className="h-3 bg-white/5 rounded w-full" />
                    <div className="h-3 bg-white/5 rounded w-2/3" />
                    <div className="h-20 bg-white/5 rounded w-full" />
                  </div>
                ))}
              </div>
            ) : reports.length > 0 ? (
              <div className="space-y-5">
                {reports.map((report) => (
                  <ReportCard key={report.id} report={report} />
                ))}
              </div>
            ) : (
              <div className="bg-[#0a1a14] border border-white/10 rounded-2xl p-12 text-center">
                <AlertTriangle className="w-12 h-12 mx-auto mb-4 opacity-20 text-white/30" />
                <p className="text-white/30 text-sm">No reports yet</p>
                <p className="text-xs text-white/20 mt-1">Submit the first environmental report.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ──── REPORT CARD ──── */
function ReportCard({ report }: { report: Report }) {
  const dept = getDept(report.assignedDepartment);
  const avatar = `https://api.dicebear.com/7.x/thumbs/svg?seed=${report.reporterName || report.userId}&scale=90`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="bg-white/[0.03] border border-white/10 rounded-xl overflow-hidden hover:bg-white/[0.05] transition-all"
    >
      <div className="p-5 space-y-3">
        {/* Header: Reporter + Status */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <img src={avatar} alt="" className="w-7 h-7 rounded-full bg-white/5" />
            <div>
              <p className="text-white/100 text-xs font-medium">
                {report.reporterName || "Anonymous"}
              </p>
              <p className="text-white/20 text-[10px] flex items-center gap-1">
                <Clock className="w-2.5 h-2.5" />
                {report.createdAt?.toDate?.() ? report.createdAt.toDate().toLocaleDateString() : "Just now"}
              </p>
            </div>
          </div>
          <span className={`text-[10px] px-2.5 py-1 rounded-full border font-medium ${STATUS_STYLE[report.status] || ""}`}>
            {STATUS_CONFIG.find(s => s.value === report.status)?.icon}{" "}
            {STATUS_CONFIG.find(s => s.value === report.status)?.label || report.status}
          </span>
        </div>

        {/* Category + Severity */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs bg-white/5 border border-white/10 px-2.5 py-1 rounded-full">
            {TYPE_EMOJI[report.type] ?? "🔔"} {TYPE_LABELS[report.type] ?? report.type}
          </span>
          {report.severity && (
            <span className={`text-[10px] px-2.5 py-1 rounded-full border font-medium ${SEVERITY_STYLE[report.severity] || ""}`}>
              {SEVERITIES.find(s => s.value === report.severity)?.icon}{" "}
              {SEVERITIES.find(s => s.value === report.severity)?.label || report.severity}
            </span>
          )}
        </div>

        {/* Department badge */}
        {dept && (
          <div className="flex items-center gap-2 bg-white/[0.02] border border-white/5 rounded-lg px-3 py-2">
            <div className={`w-7 h-7 rounded-lg bg-gradient-to-br ${dept.color} flex items-center justify-center text-sm shrink-0`}>
              {dept.emoji}
            </div>
            <div className="min-w-0">
              <p className="text-[10px] text-white/30 uppercase tracking-wider">Assigned To</p>
              <p className="text-white/70 text-xs font-medium truncate">{dept.name}</p>
            </div>
            <ChevronRight className="w-3.5 h-3.5 text-white/20 ml-auto shrink-0" />
          </div>
        )}

        {/* Description */}
        <p className="text-white/70 text-sm leading-relaxed">{report.description}</p>

        {/* Date & Time */}
        {report.dateTime?.toDate && (
          <div className="flex items-center gap-1.5 text-[11px] text-white/30">
            <Clock className="w-3 h-3" />
            Incident on: {report.dateTime.toDate().toLocaleString()}
          </div>
        )}

        {/* Photos / Videos */}
        {report.photos && report.photos.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {report.photos.slice(0, 4).map((url, i) => (
              <a key={i} href={url} target="_blank" rel="noopener noreferrer"
                className="group relative w-20 h-20 rounded-lg overflow-hidden border border-white/10 hover:border-emerald-500/50 transition-all shrink-0">
                {url.match(/videos\//) ? (
                  <>
                    <video src={url} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-7 h-7 rounded-full bg-black/50 flex items-center justify-center">
                        <span className="text-white text-xs">▶</span>
                      </div>
                    </div>
                  </>
                ) : (
                  <img src={url} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                )}
              </a>
            ))}
            {report.photos.length > 4 && (
              <div className="w-20 h-20 rounded-lg border border-white/10 bg-white/[0.02] flex items-center justify-center text-white/30 text-xs">
                +{report.photos.length - 4}
              </div>
            )}
          </div>
        )}

        {/* Map */}
        {report.latitude && report.longitude ? (
          <SmallMap lat={report.latitude} lng={report.longitude} address={report.location} />
        ) : (
          report.location && (
            <div className="flex items-center gap-1.5 text-white/40 text-xs bg-white/[0.02] rounded-lg px-3 py-2 border border-white/5">
              <MapPin className="w-3 h-3 shrink-0" />
              <span className="truncate">{report.location}</span>
            </div>
          )
        )}

        {/* Reporter Details */}
        {report.reporterDetailsVisible && (report.reporterPhone || report.reporterEmail) && (
          <div className="flex flex-wrap gap-3 text-[11px] text-white/30 bg-white/[0.02] rounded-lg px-3 py-2 border border-white/5">
            {report.reporterPhone && (
              <span className="flex items-center gap-1"><Phone className="w-3 h-3" /> {report.reporterPhone}</span>
            )}
            {report.reporterEmail && (
              <span className="flex items-center gap-1"><Mail className="w-3 h-3" /> {report.reporterEmail}</span>
            )}
          </div>
        )}
      </div>

      <ReplySection report={report} />
      <CommentSection itemId={report.id} itemType="report" />
    </motion.div>
  );
}

/* ──── REPLY SECTION (anyone can reply) ──── */
function ReplySection({ report }: { report: Report }) {
  const { user } = useAuth();
  const [text, setText] = useState("");
  const [sending, setSending] = useState(false);

  async function handleSubmit() {
    if (!text.trim() || !user) return;
    setSending(true);
    const reply: ReplyItem = {
      id: `${Date.now()}_${user.id}`,
      text: text.trim(),
      authorName: user.name,
      authorId: user.id,
      isOfficial: user.role === "department",
      createdAt: serverTimestamp() as Timestamp,
    };
    await updateDoc(doc(db, "reports", report.id), {
      replies: arrayUnion(reply),
    });
    setText("");
    setSending(false);
  }

  const allReplies: ReplyItem[] = [
    ...(report.replies || []),
  ].sort((a, b) => {
    const ta = a.createdAt?.toDate?.()?.getTime() || 0;
    const tb = b.createdAt?.toDate?.()?.getTime() || 0;
    return ta - tb;
  });

  return (
    <div className="px-5 pb-4 space-y-2">
      {/* Old departmentResponse (backward compat) */}
      {report.departmentResponse && (
        <div className="bg-blue-900/10 border border-blue-800/20 rounded-lg p-3">
          <div className="flex items-center gap-1.5 mb-1">
            <Building2 className="w-3.5 h-3.5 text-blue-400" />
            <span className="text-[10px] font-medium text-blue-300 uppercase tracking-wider">Department Response</span>
          </div>
          <p className="text-xs text-blue-200/80 leading-relaxed">{report.departmentResponse}</p>
        </div>
      )}

      {/* New replies */}
      {allReplies.map((r) => (
        <div key={r.id} className={`rounded-lg p-3 border ${r.isOfficial ? "bg-blue-900/10 border-blue-800/20" : "bg-white/[0.02] border-white/5"}`}>
          <div className="flex items-center gap-1.5 mb-1">
            <span className="text-[10px] font-medium text-white/60">{r.authorName}</span>
            {r.isOfficial && (
              <span className="text-[9px] bg-blue-600/20 text-blue-300 px-1.5 py-0.5 rounded-full border border-blue-500/20 flex items-center gap-0.5">
                <Shield className="w-2.5 h-2.5" /> Official
              </span>
            )}
            {r.createdAt?.toDate && (
              <span className="text-[10px] text-white/30 ml-auto">{r.createdAt.toDate().toLocaleDateString()}</span>
            )}
          </div>
          <p className="text-xs text-white/70 leading-relaxed">{r.text}</p>
        </div>
      ))}

      {/* Reply input */}
      <div className="flex gap-2 pt-1">
        <input type="text" value={text} onChange={e => setText(e.target.value)}
          placeholder="Write a public reply..."
          className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-xs placeholder:text-white/20 outline-none focus:border-emerald-500/50 transition-colors" />
        <button onClick={handleSubmit} disabled={!text.trim() || sending}
          className="px-3 py-2 bg-emerald-600 hover:bg-emerald-500 disabled:bg-emerald-600/50 text-white rounded-lg text-xs transition-all flex items-center gap-1.5">
          <SendHorizonal className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
}

/* ──── SMALL MAP ──── */
function SmallMap({ lat, lng, address }: { lat: number; lng: number; address?: string }) {
  const [MapContainer, setMapContainer] = useState<any>(null);
  const [TileLayer, setTileLayer] = useState<any>(null);
  const [Marker, setMarker] = useState<any>(null);
  const [Popup, setPopup] = useState<any>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    import("react-leaflet").then((mod) => {
      setMapContainer(() => mod.MapContainer);
      setTileLayer(() => mod.TileLayer);
      setMarker(() => mod.Marker);
      setPopup(() => mod.Popup);
      setReady(true);
    });
  }, []);

  if (!ready) return <div className="h-28 rounded-lg bg-white/5 animate-pulse" />;

  return (
    <div className="relative z-0 rounded-lg overflow-hidden border border-white/5 group" style={{ height: "140px" }}>
      <MapContainer center={[lat, lng]} zoom={15} scrollWheelZoom={false} style={{ height: "100%", width: "100%" }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[lat, lng]}>
          {Popup && address && <Popup>{address}</Popup>}
        </Marker>
      </MapContainer>
      <a href={`https://www.google.com/maps?q=${lat},${lng}`} target="_blank" rel="noopener noreferrer"
        className="absolute top-2 right-2 z-[1000] bg-black/60 hover:bg-black/80 backdrop-blur-sm text-white/70 hover:text-white text-[10px] px-2.5 py-1.5 rounded-md flex items-center gap-1.5 transition-all opacity-0 group-hover:opacity-100">
        <ExternalLink className="w-3 h-3" /> Maps
      </a>
      <div className="absolute bottom-2 left-2 z-[1000] bg-black/60 backdrop-blur-sm text-white/50 text-[10px] px-2 py-1 rounded-md flex items-center gap-1 max-w-[70%]">
        <MapPin className="w-2.5 h-2.5 shrink-0 text-emerald-400" />
        <span className="truncate">{address ?? `${lat.toFixed(4)}, ${lng.toFixed(4)}`}</span>
      </div>
    </div>
  );
}

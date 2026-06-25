import { useState } from "react";
import { User, Mail, Camera, BarChart3, Lightbulb, AlertTriangle, BookOpen, ArrowLeft } from "lucide-react";
import { Link } from "wouter";
import { useAuth } from "@/hooks/use-auth";

export default function Profile() {
  const { user, updateProfile } = useAuth();
  const [name, setName] = useState(user?.name || "");
  const [saved, setSaved] = useState(false);

  if (!user) return null;

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    await updateProfile({ name });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  const stats = [
    { icon: Lightbulb, label: "Ideas Shared", count: 3, color: "text-amber-400" },
    { icon: AlertTriangle, label: "Issues Reported", count: 1, color: "text-red-400" },
    { icon: BookOpen, label: "Articles Read", count: 7, color: "text-blue-400" },
  ];

  const activity = [
    { action: "You shared 'Plastic-free campus' idea", time: "2 days ago" },
    { action: "You reported 'Water logging in park'", time: "5 days ago" },
    { action: "You upvoted 'Street animal feeding stations'", time: "1 week ago" },
  ];

  return (
    <div className="pt-24 pb-16 min-h-screen">
      <div className="container mx-auto px-4 max-w-2xl">
        <Link href="/" className="inline-flex items-center gap-1.5 text-white/40 hover:text-white/60 text-sm mb-6 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to home
        </Link>

        <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-8 shadow-2xl mb-6">
          <div className="flex items-center gap-5">
            <div className="relative group">
              {user.avatar ? (
                <img src={user.avatar} alt="" className="w-16 h-16 rounded-full object-cover" />
              ) : (
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-700 flex items-center justify-center text-2xl font-bold text-white shadow-lg shadow-emerald-500/20">
                  {user.name.charAt(0).toUpperCase()}
                </div>
              )}
              <div className="absolute inset-0 rounded-full bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                <Camera className="w-5 h-5 text-white" />
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <h1 className="text-xl font-semibold text-white truncate">{user.name}</h1>
              <p className="text-white/50 text-sm truncate">{user.email}</p>
              <span className="inline-block mt-1 text-[11px] bg-emerald-500/10 text-emerald-400/80 px-2 py-0.5 rounded-full">
                {user.provider === "google.com" ? "Google" : "Email"} account
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-6">
          {stats.map(s => {
            const Icon = s.icon;
            return (
              <div key={s.label} className="bg-white/[0.02] border border-white/10 rounded-xl p-4 text-center hover:bg-white/[0.04] transition-colors">
                <Icon className={`w-5 h-5 ${s.color} mx-auto mb-2 opacity-80`} />
                <div className={`text-lg font-bold ${s.color}`}>{s.count}</div>
                <div className="text-[11px] text-white/35">{s.label}</div>
              </div>
            );
          })}
        </div>

        <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-8 shadow-2xl mb-6">
          <h2 className="text-base font-semibold text-white mb-6 flex items-center gap-2">
            <User className="w-4 h-4 text-emerald-400" /> Edit Profile
          </h2>
          <form onSubmit={handleSave} className="space-y-5">
            <div>
              <label className="text-xs text-white/50 font-medium mb-1.5 block">Name</label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                <input type="text" value={name} onChange={e => setName(e.target.value)} required
                  className="w-full bg-transparent border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white text-sm outline-none transition-all duration-200 focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/20" />
              </div>
            </div>
            <div>
              <label className="text-xs text-white/50 font-medium mb-1.5 block">Email</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
                <input type="email" value={user.email} disabled
                  className="w-full bg-transparent border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white/40 text-sm cursor-not-allowed" />
              </div>
            </div>
            <button type="submit"
              className="bg-emerald-600 hover:bg-emerald-500 text-white font-medium px-5 py-2.5 rounded-xl text-sm transition-all duration-200 hover:shadow-lg hover:shadow-emerald-500/25 flex items-center gap-2">
              {saved ? "Saved!" : "Save changes"}
            </button>
          </form>
        </div>

        <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-8 shadow-2xl">
          <h2 className="text-base font-semibold text-white mb-6 flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-emerald-400" /> Recent Activity
          </h2>
          <div className="space-y-1">
            {activity.map((a, i) => (
              <div key={i} className="flex items-center justify-between py-3 px-3 rounded-xl hover:bg-white/[0.02] transition-colors -mx-3">
                <span className="text-sm text-white/60">{a.action}</span>
                <span className="text-[11px] text-white/25 shrink-0 ml-4">{a.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

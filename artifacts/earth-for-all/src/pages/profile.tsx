import { useState } from "react";
import { User, Mail, Save, BarChart3, Lightbulb, AlertTriangle, BookOpen, ArrowLeft } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";

export default function Profile() {
  const { user, updateProfile } = useAuth();
  const [name, setName] = useState(user?.name || "");
  const [saved, setSaved] = useState(false);

  if (!user) return null;

  function handleSave(e: React.FormEvent) {
    e.preventDefault();
    updateProfile({ name });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  const stats = [
    { icon: Lightbulb, label: "Ideas Shared", count: 3, color: "text-amber-400", bg: "bg-amber-900/20" },
    { icon: AlertTriangle, label: "Issues Reported", count: 1, color: "text-red-400", bg: "bg-red-900/20" },
    { icon: BookOpen, label: "Articles Read", count: 7, color: "text-blue-400", bg: "bg-blue-900/20" },
  ];

  const activity = [
    { action: "Shared idea: 'Plastic-free campus'", time: "2 days ago" },
    { action: "Reported: 'Water logging in park'", time: "5 days ago" },
    { action: "Upvoted: 'Street animal feeding stations'", time: "1 week ago" },
  ];

  return (
    <div className="pt-24 pb-16 min-h-screen">
      <div className="container mx-auto px-4 max-w-3xl">
        <Link href="/" className="inline-flex items-center gap-1.5 text-white/40 hover:text-white/60 text-sm mb-6 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to home
        </Link>

        <div className="flex items-center gap-5 mb-10">
          <div className="w-16 h-16 rounded-full bg-emerald-600 flex items-center justify-center text-2xl font-bold text-white">
            {user.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">{user.name}</h1>
            <p className="text-white/50 text-sm">{user.email}</p>
            <span className="text-xs text-emerald-400/70">{user.provider === "google" ? "Google" : user.provider === "github" ? "GitHub" : "Email"} account</span>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-10">
          {stats.map(s => {
            const Icon = s.icon;
            return (
              <div key={s.label} className={`${s.bg} border border-white/10 rounded-xl p-4 text-center`}>
                <Icon className={`w-5 h-5 ${s.color} mx-auto mb-2`} />
                <div className={`text-xl font-bold ${s.color}`}>{s.count}</div>
                <div className="text-xs text-white/40">{s.label}</div>
              </div>
            );
          })}
        </div>

        <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 mb-8">
          <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2"><User className="w-4 h-4 text-emerald-400" /> Edit Profile</h2>
          <form onSubmit={handleSave} className="space-y-4">
            <div>
              <label className="text-xs text-white/60 font-medium mb-1.5 block">Name</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                <input type="text" value={name} onChange={e => setName(e.target.value)} required
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-white text-sm focus:outline-none focus:border-emerald-500/50 transition-colors" />
              </div>
            </div>
            <div>
              <label className="text-xs text-white/60 font-medium mb-1.5 block">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                <input type="email" value={user.email} disabled
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-white/50 text-sm cursor-not-allowed" />
              </div>
            </div>
            <Button type="submit" className="bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-sm">
              <Save className="w-4 h-4" /> {saved ? "Saved!" : "Save changes"}
            </Button>
          </form>
        </div>

        <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6">
          <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2"><BarChart3 className="w-4 h-4 text-emerald-400" /> Recent Activity</h2>
          <div className="space-y-3">
            {activity.map((a, i) => (
              <div key={i} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
                <span className="text-sm text-white/70">{a.action}</span>
                <span className="text-xs text-white/30">{a.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

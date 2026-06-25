import { useState, useEffect, useRef } from "react";
import { Bell, BellRing, Check, ExternalLink, Building2, MessageSquare } from "lucide-react";
import { collection, query, where, orderBy, onSnapshot, doc, getDocs, writeBatch, limit, Timestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useAuth } from "@/hooks/use-auth";
import { sendEmailNotification } from "@/lib/email";

interface Notification {
  id: string;
  type: "department-response" | "status-update" | "comment";
  message: string;
  reportId: string;
  reportType: string;
  department: string;
  read: boolean;
  createdAt: Timestamp;
}

export function NotificationBell() {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!user) return;
    const q = query(
      collection(db, "notifications"),
      orderBy("createdAt", "desc"),
      limit(20)
    );
    const unsub = onSnapshot(q, (snap) => {
      setNotifications(snap.docs.map((d) => ({ id: d.id, ...d.data() } as Notification)));
    });
    return unsub;
  }, [user]);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const unreadCount = notifications.filter(n => !n.read).length;

  async function markAllRead() {
    const batch = writeBatch(db);
    notifications.filter(n => !n.read).forEach((n) => {
      batch.update(doc(db, "notifications", n.id), { read: true });
    });
    await batch.commit();
  }

  function getIcon(type: string) {
    switch (type) {
      case "department-response": return <Building2 className="w-3.5 h-3.5 text-blue-400" />;
      case "status-update": return <Bell className="w-3.5 h-3.5 text-yellow-400" />;
      default: return <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />;
    }
  }

  if (!user) return null;

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => { setOpen(!open); if (!open && unreadCount > 0) markAllRead(); }}
        className="relative p-2 rounded-lg text-white/40 hover:text-white hover:bg-white/5 transition-all"
      >
        {unreadCount > 0 ? (
          <>
            <BellRing className="w-5 h-5 text-emerald-400" />
            <span className="absolute -top-0.5 -right-0.5 w-4.5 h-4.5 bg-emerald-500 rounded-full text-[9px] font-bold text-white flex items-center justify-center">
              {unreadCount > 9 ? "9+" : unreadCount}
            </span>
          </>
        ) : (
          <Bell className="w-5 h-5" />
        )}
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 w-80 bg-[#0d1f17] border border-white/10 rounded-xl shadow-2xl backdrop-blur-xl z-50 overflow-hidden">
          <div className="px-4 py-3 border-b border-white/10 flex items-center justify-between">
            <span className="text-xs font-medium text-white/70">Notifications</span>
            {unreadCount > 0 && (
              <button onClick={markAllRead} className="text-[10px] text-emerald-400 hover:text-emerald-300 transition-colors flex items-center gap-1">
                <Check className="w-3 h-3" /> Mark all read
              </button>
            )}
          </div>
          <div className="max-h-80 overflow-y-auto scrollbar-thin">
            {notifications.length === 0 ? (
              <div className="py-8 text-center text-white/20 text-xs">No notifications yet</div>
            ) : (
              notifications.map((n) => (
                <a key={n.id} href={`/report`}
                  className={`block px-4 py-3 border-b border-white/5 hover:bg-white/[0.03] transition-all ${
                    !n.read ? "bg-emerald-900/5" : ""
                  }`}>
                  <div className="flex gap-3">
                    <div className="mt-0.5">{getIcon(n.type)}</div>
                    <div className="min-w-0 flex-1">
                      <p className={`text-xs ${!n.read ? "text-white/80" : "text-white/50"} leading-relaxed`}>
                        {n.message}
                      </p>
                      <p className="text-[10px] text-white/20 mt-1">
                        {n.createdAt?.toDate?.() ? n.createdAt.toDate().toLocaleString() : ""}
                      </p>
                    </div>
                    <ExternalLink className="w-3 h-3 text-white/20 shrink-0 mt-1" />
                  </div>
                </a>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}

/* Watch for new department responses and auto-create notifications */
export function useDepartmentResponseWatcher() {
  useEffect(() => {
    const q = query(
      collection(db, "reports"),
      orderBy("createdAt", "desc"),
      limit(50)
    );
    const unsub = onSnapshot(q, async (snap) => {
      for (const docSnap of snap.docs) {
        const data = docSnap.data();
        if (!data.departmentResponse || !data.departmentResponseAt) continue;
        const notifId = `response_${docSnap.id}`;
        const existing = await getDocs(query(collection(db, "notifications"), where("__name__", "==", notifId)));
        if (existing.empty) {
          const deptNames: Record<string, string> = {
            "pollution-board": "Pollution Control Board",
            municipal: "Municipal Corporation",
            forest: "Forest Department",
            "animal-welfare": "Animal Welfare",
            "fire-services": "Fire Services",
            "water-resources": "Water Resources Dept.",
            "local-admin": "Local Administration",
          };
          const deptName = deptNames[data.assignedDepartment] || data.assignedDepartment || "Department";
          const typeLabels: Record<string, string> = {
            pollution: "Pollution", garbage: "Garbage/Waste",
            "animal-emergency": "Animal Emergency", "tree-cutting": "Tree Cutting",
            "water-pollution": "Water Pollution", "forest-fire": "Forest Fire",
            poaching: "Poaching/Hunting", other: "Issue",
          };
          const categoryLabel = typeLabels[data.type] || "Environmental";
          await writeBatch(db).set(doc(db, "notifications", notifId), {
            type: "department-response",
            message: `${deptName} responded to ${categoryLabel} report`,
            reportId: docSnap.id,
            reportType: data.type,
            department: data.assignedDepartment || "",
            read: false,
            emailStatus: "pending",
            createdAt: data.departmentResponseAt,
          }).commit();
        }
      }
    });
    return unsub;
  }, []);
}

/* Watch for pending notifications and send emails to all users */
export function useEmailSender() {
  useEffect(() => {
    const q = query(
      collection(db, "notifications"),
      where("emailStatus", "==", "pending"),
      limit(20)
    );
    const unsub = onSnapshot(q, async (snap) => {
      for (const notifSnap of snap.docs) {
        const notif = notifSnap.data() as Notification;
        if (!notif.message) continue;

        const appUrl = import.meta.env.VITE_APP_URL || "https://spontaneous-buttercream-c771ba.netlify.app";

        try {
          const profilesSnap = await getDocs(collection(db, "profiles"));
          const emails: string[] = [];
          profilesSnap.forEach((p) => {
            const e = p.data().email;
            if (e) emails.push(e);
          });

          const deptNames: Record<string, string> = {
            "pollution-board": "Pollution Control Board", municipal: "Municipal Corporation",
            forest: "Forest Department", "animal-welfare": "Animal Welfare",
            "fire-services": "Fire Services", "water-resources": "Water Resources Dept.",
            "local-admin": "Local Administration",
          };
          const deptName = deptNames[notif.department] || notif.department || "Department";
          const typeLabels: Record<string, string> = {
            pollution: "Pollution", garbage: "Garbage/Waste",
            "animal-emergency": "Animal Emergency", "tree-cutting": "Tree Cutting",
            "water-pollution": "Water Pollution", "forest-fire": "Forest Fire",
            poaching: "Poaching/Hunting", other: "Issue",
          };
          const category = typeLabels[notif.reportType] || notif.reportType || "Environmental";

          for (const toEmail of emails) {
            await sendEmailNotification({
              to_email: toEmail,
              deptName,
              category,
              message: notif.message,
              appUrl,
            });
          }

          await writeBatch(db).update(doc(db, "notifications", notifSnap.id), {
            emailStatus: "sent",
            emailSentTo: emails.length,
            emailSentAt: Timestamp.now(),
          }).commit();
        } catch (err) {
          console.error("Email send failed:", err);
          await writeBatch(db).update(doc(db, "notifications", notifSnap.id), {
            emailStatus: "failed",
          }).commit();
        }
      }
    });
    return unsub;
  }, []);
}

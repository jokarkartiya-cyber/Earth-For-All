import { useState, useEffect } from "react";
import { MessageSquare, Send, User } from "lucide-react";
import { collection, query, where, orderBy, onSnapshot, addDoc, serverTimestamp, type Timestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useAuth } from "@/hooks/use-auth";

interface Comment {
  id: string;
  text: string;
  authorName: string;
  userId: string;
  createdAt: Timestamp;
}

interface Props {
  itemId: string;
  itemType: "idea" | "report";
}

export function CommentSection({ itemId, itemType }: Props) {
  const { user } = useAuth();
  const [comments, setComments] = useState<Comment[]>([]);
  const [text, setText] = useState("");

  useEffect(() => {
    const q = query(collection(db, "comments"), where("itemId", "==", itemId), where("itemType", "==", itemType), orderBy("createdAt", "asc"));
    const unsub = onSnapshot(q, (snap) => {
      setComments(snap.docs.map((d) => ({ id: d.id, ...d.data() } as Comment)));
    });
    return unsub;
  }, [itemId, itemType]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!text.trim() || !user) return;
    await addDoc(collection(db, "comments"), {
      itemId,
      itemType,
      text: text.trim(),
      authorName: user.name,
      userId: user.id,
      createdAt: serverTimestamp(),
    });
    setText("");
  }

  return (
    <div className="mt-4 pt-4 border-t border-white/10">
      <div className="flex items-center gap-1.5 text-white/40 text-xs mb-3">
        <MessageSquare className="w-3.5 h-3.5" /> {comments.length} {comments.length === 1 ? "comment" : "comments"}
      </div>
      <div className="space-y-3 mb-3">
        {comments.map((c) => (
          <div key={c.id} className="flex gap-2.5">
            <div className="w-6 h-6 rounded-full bg-emerald-600/30 border border-emerald-500/30 flex items-center justify-center shrink-0 mt-0.5">
              <span className="text-[10px] font-bold text-emerald-300">{c.authorName.charAt(0).toUpperCase()}</span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-0.5">
                <span className="text-xs font-medium text-white/70">{c.authorName}</span>
                <span className="text-[10px] text-white/20">{c.createdAt?.toDate?.() ? new Date(c.createdAt.toDate()).toLocaleDateString() : "just now"}</span>
              </div>
              <p className="text-xs text-white/60">{c.text}</p>
            </div>
          </div>
        ))}
      </div>
      {user && (
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input type="text" value={text} onChange={e => setText(e.target.value)} placeholder="Add a comment..." maxLength={500}
            className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-xs placeholder:text-white/20 outline-none focus:border-emerald-500/50 transition-colors" />
          <button type="submit" disabled={!text.trim()}
            className="px-3 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg transition-colors disabled:opacity-30 disabled:cursor-not-allowed">
            <Send className="w-3.5 h-3.5" />
          </button>
        </form>
      )}
      {!user && <p className="text-[11px] text-white/20">Sign in to leave a comment</p>}
    </div>
  );
}

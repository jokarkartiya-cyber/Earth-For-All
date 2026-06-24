import { useState, useEffect, useRef } from "react";
import { MessageSquare, Send, Trash2, Clock } from "lucide-react";
import { collection, query, where, orderBy, onSnapshot, addDoc, deleteDoc, doc, serverTimestamp, type Timestamp } from "firebase/firestore";
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

function timeAgo(date: Date): string {
  const sec = Math.floor((Date.now() - date.getTime()) / 1000);
  if (sec < 60) return "just now";
  const min = Math.floor(sec / 60);
  if (min < 60) return `${min}m ago`;
  const hr = Math.floor(min / 60);
  if (hr < 24) return `${hr}h ago`;
  const days = Math.floor(hr / 24);
  if (days < 30) return `${days}d ago`;
  return date.toLocaleDateString();
}

export function CommentSection({ itemId, itemType }: Props) {
  const { user } = useAuth();
  const [comments, setComments] = useState<Comment[]>([]);
  const [text, setText] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const q = query(
      collection(db, "comments"),
      where("itemId", "==", itemId),
      where("itemType", "==", itemType),
      orderBy("createdAt", "asc")
    );
    const unsub = onSnapshot(q, (snap) => {
      setComments(snap.docs.map((d) => ({ id: d.id, ...d.data() } as Comment)));
    });
    return unsub;
  }, [itemId, itemType]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!text.trim() || !user || submitting) return;
    setSubmitting(true);
    await addDoc(collection(db, "comments"), {
      itemId, itemType,
      text: text.trim(),
      authorName: user.name,
      userId: user.id,
      createdAt: serverTimestamp(),
    });
    setText("");
    setSubmitting(false);
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
  }

  async function handleDelete(commentId: string) {
    await deleteDoc(doc(db, "comments", commentId));
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  }

  return (
    <div className="border-t border-white/10 px-5 py-4">
      <div className="flex items-center gap-1.5 text-white/40 text-xs mb-3">
        <MessageSquare className="w-3.5 h-3.5" />
        <span>{comments.length} {comments.length === 1 ? "comment" : "comments"}</span>
      </div>

      <div ref={listRef} className="space-y-3 mb-3 max-h-60 overflow-y-auto scrollbar-thin">
        {comments.length === 0 ? (
          <p className="text-white/20 text-[11px] text-center py-3">No comments yet</p>
        ) : (
          comments.map((c) => (
            <div key={c.id} className="flex gap-2.5 group">
              <div className="w-7 h-7 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                <span className="text-[11px] font-bold text-white">{c.authorName.charAt(0).toUpperCase()}</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="text-xs font-medium text-white/70">{c.authorName}</span>
                  <span className="text-[10px] text-white/20 flex items-center gap-1">
                    <Clock className="w-2.5 h-2.5" />
                    {c.createdAt?.toDate?.() ? timeAgo(c.createdAt.toDate()) : "just now"}
                  </span>
                </div>
                <p className="text-xs text-white/60 leading-relaxed">{c.text}</p>
              </div>
              {user && user.id === c.userId && (
                <button type="button" onClick={() => handleDelete(c.id)}
                  className="shrink-0 opacity-0 group-hover:opacity-100 text-white/20 hover:text-red-400 transition-all p-1">
                  <Trash2 className="w-3 h-3" />
                </button>
              )}
            </div>
          ))
        )}
      </div>

      {user ? (
        <form onSubmit={handleSubmit} className="relative">
          <div className="flex gap-2">
            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-700 flex items-center justify-center shrink-0">
              <span className="text-[11px] font-bold text-white">{user.name?.charAt(0).toUpperCase() ?? "?"}</span>
            </div>
            <div className="flex-1 relative">
              <input
                type="text" value={text} onChange={e => setText(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Write a comment... (Enter to send)"
                maxLength={500}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 pr-16 text-white text-xs placeholder:text-white/20 outline-none focus:border-emerald-500/50 transition-colors"
              />
              <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1.5">
                {text.length > 0 && (
                  <span className={`text-[10px] ${text.length > 450 ? "text-yellow-400" : "text-white/20"}`}>
                    {text.length}/500
                  </span>
                )}
                <button type="submit" disabled={!text.trim() || submitting}
                  className="text-emerald-400 hover:text-emerald-300 disabled:text-white/20 disabled:cursor-not-allowed transition-colors">
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </form>
      ) : (
        <p className="text-[11px] text-white/20 text-center py-2">Sign in to leave a comment</p>
      )}
    </div>
  );
}

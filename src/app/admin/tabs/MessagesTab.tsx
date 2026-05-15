"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Trash2, Mail, MailOpen, Eye } from "lucide-react";
import { markMessageRead, deleteContactMessage } from "@/app/actions";
import Toast, { useToast } from "@/components/Toast";

export default function MessagesTab({ messages }: { messages: any[] }) {
  const router = useRouter();
  const [loading, setLoading] = useState<string | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [expanded, setExpanded] = useState<string | null>(null);
  const { toast, showToast } = useToast();

  const unreadCount = messages.filter((m) => !m.read).length;

  const handleMarkRead = async (id: string) => {
    setLoading(id);
    await markMessageRead(id);
    router.refresh();
    setLoading(null);
  };

  const handleDelete = async (id: string) => {
    setLoading(id);
    await deleteContactMessage(id);
    setDeleteConfirm(null);
    showToast("Message deleted.");
    router.refresh();
    setLoading(null);
  };

  return (
    <div>
      <Toast {...toast} />
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-black text-white mb-2">Messages</h1>
          <p className="text-gray-500 text-sm">{messages.length} total • {unreadCount} unread</p>
        </div>
      </div>

      {deleteConfirm && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#0d0d0d] border border-white/10 rounded-2xl p-6 max-w-sm w-full">
            <h3 className="text-white font-bold mb-2">Delete Message?</h3>
            <p className="text-gray-500 text-sm mb-6">This action cannot be undone.</p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteConfirm(null)} className="flex-1 bg-white/5 border border-white/10 text-gray-400 py-2.5 rounded-xl text-sm hover:bg-white/10 transition-all">Cancel</button>
              <button onClick={() => handleDelete(deleteConfirm)} disabled={loading === deleteConfirm} className="flex-1 bg-red-500/20 border border-red-500/30 text-red-400 py-2.5 rounded-xl text-sm hover:bg-red-500/30 transition-all disabled:opacity-50">{loading === deleteConfirm ? "Deleting..." : "Delete"}</button>
            </div>
          </div>
        </div>
      )}

      {messages.length === 0 ? (
        <div className="text-center py-20"><p className="text-gray-600 text-sm">No messages yet.</p></div>
      ) : (
        <div className="space-y-3">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`bg-white/[0.03] border rounded-2xl p-5 transition-all cursor-pointer ${
                !msg.read ? "border-purple-500/20 bg-purple-500/[0.02]" : "border-white/[0.06]"
              } hover:border-white/15`}
              onClick={() => {
                setExpanded(expanded === msg.id ? null : msg.id);
                if (!msg.read) handleMarkRead(msg.id);
              }}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3 flex-1 min-w-0">
                  <div className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 ${
                    !msg.read ? "bg-purple-500/20 text-purple-400" : "bg-white/5 text-gray-600"
                  }`}>
                    {!msg.read ? <Mail size={16} /> : <MailOpen size={16} />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <p className={`font-bold text-sm ${!msg.read ? "text-white" : "text-gray-400"}`}>{msg.name}</p>
                      {!msg.read && <span className="w-2 h-2 rounded-full bg-purple-400 flex-shrink-0" />}
                    </div>
                    <p className="text-gray-500 text-xs font-mono">{msg.email}</p>
                    {expanded !== msg.id && (
                      <p className="text-gray-600 text-xs mt-1 truncate">{msg.message}</p>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <span className="text-gray-700 text-[10px] font-mono">{new Date(msg.createdAt).toLocaleDateString()}</span>
                  <button
                    onClick={(e) => { e.stopPropagation(); setDeleteConfirm(msg.id); }}
                    className="p-2 text-gray-700 hover:text-red-400 transition-colors"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
              {expanded === msg.id && (
                <div className="mt-4 pl-12 border-t border-white/5 pt-4">
                  <p className="text-gray-300 text-sm whitespace-pre-line">{msg.message}</p>
                  <a href={`mailto:${msg.email}`} className="inline-flex items-center gap-1.5 mt-3 text-xs text-cyan-400 hover:text-cyan-300 transition-colors">
                    <Mail size={12} /> Reply via Email
                  </a>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

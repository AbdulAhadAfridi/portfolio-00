"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, Pencil, Trash2, X, MessageCircle } from "lucide-react";
import { addChatbotQA, updateChatbotQA, deleteChatbotQA } from "@/app/actions";
import Toast, { useToast } from "@/components/Toast";

export default function ChatbotTab({ chatbotQAs }: { chatbotQAs: any[] }) {
  const router = useRouter();
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const { toast, showToast } = useToast();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const form = e.currentTarget;
    const formData = new FormData(form);
    try {
      if (editId) { await updateChatbotQA(editId, formData); showToast("Q&A updated!"); }
      else { await addChatbotQA(formData); showToast("Q&A added!"); }
      setShowForm(false); setEditId(null); form.reset(); router.refresh();
    } catch (err) { console.error(err); showToast("Failed to save", "error"); }
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    setLoading(true);
    await deleteChatbotQA(id);
    setDeleteConfirm(null);
    showToast("Q&A deleted!");
    router.refresh();
    setLoading(false);
  };

  const editItem = chatbotQAs.find((q) => q.id === editId);

  return (
    <div>
      <Toast {...toast} />
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-black text-white mb-2">Chatbot Q&A</h1>
          <p className="text-gray-500 text-sm">{chatbotQAs.length} question-answer pairs</p>
        </div>
        <button onClick={() => { setShowForm(true); setEditId(null); }} className="flex items-center gap-2 bg-teal-500/20 border border-teal-500/30 text-teal-400 px-4 py-2.5 rounded-xl text-sm font-bold hover:bg-teal-500/30 transition-all">
          <Plus size={16} /> Add Q&A
        </button>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => { setShowForm(false); setEditId(null); }}>
          <div className="w-full max-w-lg bg-[#0d0d0d] border border-white/10 rounded-2xl p-6 shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-white">{editId ? "Edit Q&A" : "Add Q&A"}</h3>
              <button onClick={() => { setShowForm(false); setEditId(null); }} className="text-gray-500 hover:text-white"><X size={20} /></button>
            </div>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs text-gray-400 font-mono">QUESTION / KEYWORDS</label>
                <input name="question" required defaultValue={editItem?.question || ""} placeholder="e.g. skills, technologies" className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-teal-500/50 transition-colors" />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs text-gray-400 font-mono">ANSWER</label>
                <textarea name="answer" required rows={5} defaultValue={editItem?.answer || ""} className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-teal-500/50 transition-colors resize-none" />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs text-gray-400 font-mono">CATEGORY (optional)</label>
                <input name="category" defaultValue={editItem?.category || ""} placeholder="e.g. General, Skills" className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-teal-500/50 transition-colors" />
              </div>
              <button type="submit" disabled={loading} className="bg-teal-500/20 border border-teal-500/30 text-teal-400 font-bold py-3 rounded-xl hover:bg-teal-500/30 transition-all disabled:opacity-50 text-sm mt-2">
                {loading ? "Saving..." : editId ? "Update" : "Add Q&A"}
              </button>
            </form>
          </div>
        </div>
      )}

      {deleteConfirm && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#0d0d0d] border border-white/10 rounded-2xl p-6 max-w-sm w-full">
            <h3 className="text-white font-bold mb-2">Delete Q&A?</h3>
            <p className="text-gray-500 text-sm mb-6">This cannot be undone.</p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteConfirm(null)} className="flex-1 bg-white/5 border border-white/10 text-gray-400 py-2.5 rounded-xl text-sm hover:bg-white/10 transition-all">Cancel</button>
              <button onClick={() => handleDelete(deleteConfirm)} disabled={loading} className="flex-1 bg-red-500/20 border border-red-500/30 text-red-400 py-2.5 rounded-xl text-sm hover:bg-red-500/30 transition-all disabled:opacity-50">{loading ? "Deleting..." : "Delete"}</button>
            </div>
          </div>
        </div>
      )}

      {chatbotQAs.length === 0 ? (
        <div className="text-center py-20"><p className="text-gray-600 text-sm">No chatbot Q&A pairs yet.</p></div>
      ) : (
        <div className="space-y-3">
          {chatbotQAs.map((qa) => (
            <div key={qa.id} className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-5 hover:border-white/10 transition-all">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <MessageCircle size={14} className="text-teal-400 flex-shrink-0" />
                    <p className="text-white font-bold text-sm">{qa.question}</p>
                    {qa.category && <span className="text-[10px] px-2 py-0.5 rounded-md bg-teal-500/10 border border-teal-500/20 text-teal-400">{qa.category}</span>}
                  </div>
                  <p className="text-gray-500 text-xs whitespace-pre-line line-clamp-3 ml-5">{qa.answer}</p>
                </div>
                <div className="flex gap-1 flex-shrink-0">
                  <button onClick={() => { setEditId(qa.id); setShowForm(true); }} className="p-2 text-gray-600 hover:text-cyan-400 transition-colors"><Pencil size={14} /></button>
                  <button onClick={() => setDeleteConfirm(qa.id)} className="p-2 text-gray-600 hover:text-red-400 transition-colors"><Trash2 size={14} /></button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

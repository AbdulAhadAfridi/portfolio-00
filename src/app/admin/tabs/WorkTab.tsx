"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, Pencil, Trash2, X } from "lucide-react";
import { addWork, updateWork, deleteWork } from "@/app/actions";
import Toast, { useToast } from "@/components/Toast";

export default function WorkTab({ works }: { works: any[] }) {
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
      if (editId) {
        await updateWork(editId, formData);
        showToast("Experience updated successfully!");
      } else {
        await addWork(formData);
        showToast("Experience added successfully!");
      }
      setShowForm(false);
      setEditId(null);
      form.reset();
      router.refresh();
    } catch (err) {
      console.error(err);
      showToast("Failed to save", "error");
    }
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    setLoading(true);
    await deleteWork(id);
    setDeleteConfirm(null);
    showToast("Experience deleted successfully!");
    router.refresh();
    setLoading(false);
  };

  const editItem = works.find((w) => w.id === editId);

  return (
    <div>
      <Toast {...toast} />
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-black text-white mb-2">Work Experience</h1>
          <p className="text-gray-500 text-sm">{works.length} entries total</p>
        </div>
        <button onClick={() => { setShowForm(true); setEditId(null); }} className="flex items-center gap-2 bg-green-500/20 border border-green-500/30 text-green-400 px-4 py-2.5 rounded-xl text-sm font-bold hover:bg-green-500/30 transition-all">
          <Plus size={16} /> Add Experience
        </button>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => { setShowForm(false); setEditId(null); }}>
          <div className="w-full max-w-lg bg-[#0d0d0d] border border-white/10 rounded-2xl p-6 shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-white">{editId ? "Edit Experience" : "Add Experience"}</h3>
              <button onClick={() => { setShowForm(false); setEditId(null); }} className="text-gray-500 hover:text-white"><X size={20} /></button>
            </div>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs text-gray-400 font-mono">ROLE / POSITION</label>
                <input name="role" required defaultValue={editItem?.role || ""} className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-green-500/50 transition-colors" />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs text-gray-400 font-mono">COMPANY</label>
                <input name="company" required defaultValue={editItem?.company || ""} className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-green-500/50 transition-colors" />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs text-gray-400 font-mono">DURATION</label>
                <input name="duration" required defaultValue={editItem?.duration || ""} placeholder="Jan 2023 - Present" className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-green-500/50 transition-colors" />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs text-gray-400 font-mono">DESCRIPTION</label>
                <textarea name="description" required rows={3} defaultValue={editItem?.description || ""} className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-green-500/50 transition-colors resize-none" />
              </div>
              <button type="submit" disabled={loading} className="bg-green-500/20 border border-green-500/30 text-green-400 font-bold py-3 rounded-xl hover:bg-green-500/30 transition-all disabled:opacity-50 text-sm mt-2">
                {loading ? "Saving..." : editId ? "Update" : "Add Experience"}
              </button>
            </form>
          </div>
        </div>
      )}

      {deleteConfirm && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#0d0d0d] border border-white/10 rounded-2xl p-6 max-w-sm w-full">
            <h3 className="text-white font-bold mb-2">Delete Experience?</h3>
            <p className="text-gray-500 text-sm mb-6">This action cannot be undone.</p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteConfirm(null)} className="flex-1 bg-white/5 border border-white/10 text-gray-400 py-2.5 rounded-xl text-sm hover:bg-white/10 transition-all">Cancel</button>
              <button onClick={() => handleDelete(deleteConfirm)} disabled={loading} className="flex-1 bg-red-500/20 border border-red-500/30 text-red-400 py-2.5 rounded-xl text-sm hover:bg-red-500/30 transition-all disabled:opacity-50">{loading ? "Deleting..." : "Delete"}</button>
            </div>
          </div>
        </div>
      )}

      {works.length === 0 ? (
        <div className="text-center py-20"><p className="text-gray-600 text-sm">No work experience added yet.</p></div>
      ) : (
        <div className="space-y-4">
          {works.map((work) => (
            <div key={work.id} className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-5 hover:border-white/10 transition-all flex items-start gap-4">
              <div className="w-3 h-3 rounded-full bg-green-400 border-4 border-[#0a0a0a] mt-1.5 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <h3 className="text-white font-bold">{work.role}</h3>
                <p className="text-green-400 text-sm">{work.company} <span className="text-gray-600 text-xs ml-2">{work.duration}</span></p>
                <p className="text-gray-500 text-xs mt-2 line-clamp-2">{work.description}</p>
              </div>
              <div className="flex gap-1 flex-shrink-0">
                <button onClick={() => { setEditId(work.id); setShowForm(true); }} className="p-2 text-gray-600 hover:text-cyan-400 transition-colors"><Pencil size={14} /></button>
                <button onClick={() => setDeleteConfirm(work.id)} className="p-2 text-gray-600 hover:text-red-400 transition-colors"><Trash2 size={14} /></button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

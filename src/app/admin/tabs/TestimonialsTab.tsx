"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, Pencil, Trash2, X, Star } from "lucide-react";
import { addTestimonial, updateTestimonial, deleteTestimonial } from "@/app/actions";
import Toast, { useToast } from "@/components/Toast";

export default function TestimonialsTab({ testimonials }: { testimonials: any[] }) {
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
        await updateTestimonial(editId, formData);
        showToast("Testimonial updated successfully!");
      } else {
        await addTestimonial(formData);
        showToast("Testimonial added successfully!");
      }
      setShowForm(false);
      setEditId(null);
      form.reset();
      router.refresh();
    } catch (err) {
      console.error(err);
      showToast("Failed to save testimonial", "error");
    }
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    setLoading(true);
    await deleteTestimonial(id);
    setDeleteConfirm(null);
    showToast("Testimonial deleted successfully!");
    router.refresh();
    setLoading(false);
  };

  const editItem = testimonials.find((t) => t.id === editId);

  return (
    <div>
      <Toast {...toast} />
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-black text-white mb-2">Testimonials</h1>
          <p className="text-gray-500 text-sm">{testimonials.length} testimonials total</p>
        </div>
        <button onClick={() => { setShowForm(true); setEditId(null); }} className="flex items-center gap-2 bg-yellow-500/20 border border-yellow-500/30 text-yellow-400 px-4 py-2.5 rounded-xl text-sm font-bold hover:bg-yellow-500/30 transition-all">
          <Plus size={16} /> Add Testimonial
        </button>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => { setShowForm(false); setEditId(null); }}>
          <div className="w-full max-w-lg bg-[#0d0d0d] border border-white/10 rounded-2xl p-6 shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-white">{editId ? "Edit Testimonial" : "Add Testimonial"}</h3>
              <button onClick={() => { setShowForm(false); setEditId(null); }} className="text-gray-500 hover:text-white"><X size={20} /></button>
            </div>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs text-gray-400 font-mono">NAME</label>
                  <input name="name" required defaultValue={editItem?.name || ""} className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-yellow-500/50 transition-colors" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs text-gray-400 font-mono">ROLE / COMPANY</label>
                  <input name="role" required defaultValue={editItem?.role || ""} className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-yellow-500/50 transition-colors" />
                </div>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs text-gray-400 font-mono">TESTIMONIAL CONTENT</label>
                <textarea name="content" required rows={4} defaultValue={editItem?.content || ""} className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-yellow-500/50 transition-colors resize-none" />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs text-gray-400 font-mono">IMAGE URL (optional)</label>
                <input name="imageUrl" defaultValue={editItem?.imageUrl || ""} className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-yellow-500/50 transition-colors" />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs text-gray-400 font-mono">RATING (1-5)</label>
                <input name="rating" type="number" min="1" max="5" defaultValue={editItem?.rating || 5} className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-yellow-500/50 transition-colors w-24" />
              </div>
              <button type="submit" disabled={loading} className="bg-yellow-500/20 border border-yellow-500/30 text-yellow-400 font-bold py-3 rounded-xl hover:bg-yellow-500/30 transition-all disabled:opacity-50 text-sm mt-2">
                {loading ? "Saving..." : editId ? "Update" : "Add Testimonial"}
              </button>
            </form>
          </div>
        </div>
      )}

      {deleteConfirm && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#0d0d0d] border border-white/10 rounded-2xl p-6 max-w-sm w-full">
            <h3 className="text-white font-bold mb-2">Delete Testimonial?</h3>
            <p className="text-gray-500 text-sm mb-6">This action cannot be undone.</p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteConfirm(null)} className="flex-1 bg-white/5 border border-white/10 text-gray-400 py-2.5 rounded-xl text-sm hover:bg-white/10 transition-all">Cancel</button>
              <button onClick={() => handleDelete(deleteConfirm)} disabled={loading} className="flex-1 bg-red-500/20 border border-red-500/30 text-red-400 py-2.5 rounded-xl text-sm hover:bg-red-500/30 transition-all disabled:opacity-50">{loading ? "Deleting..." : "Delete"}</button>
            </div>
          </div>
        </div>
      )}

      {testimonials.length === 0 ? (
        <div className="text-center py-20"><p className="text-gray-600 text-sm">No testimonials yet.</p></div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {testimonials.map((t) => (
            <div key={t.id} className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-5 hover:border-white/10 transition-all">
              <div className="flex items-center gap-1 mb-3">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={12} className={i < t.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-700"} />
                ))}
              </div>
              <p className="text-gray-400 text-sm italic mb-4 line-clamp-3">&ldquo;{t.content}&rdquo;</p>
              <div className="flex items-center justify-between pt-3 border-t border-white/5">
                <div className="flex items-center gap-3">
                  {t.imageUrl ? (
                    <img src={t.imageUrl} alt={t.name} className="w-8 h-8 rounded-full object-cover" />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-yellow-500/20 flex items-center justify-center text-yellow-400 text-xs font-bold">{t.name.charAt(0)}</div>
                  )}
                  <div>
                    <p className="text-white text-sm font-bold">{t.name}</p>
                    <p className="text-gray-600 text-xs">{t.role}</p>
                  </div>
                </div>
                <div className="flex gap-1">
                  <button onClick={() => { setEditId(t.id); setShowForm(true); }} className="p-2 text-gray-600 hover:text-cyan-400 transition-colors"><Pencil size={14} /></button>
                  <button onClick={() => setDeleteConfirm(t.id)} className="p-2 text-gray-600 hover:text-red-400 transition-colors"><Trash2 size={14} /></button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

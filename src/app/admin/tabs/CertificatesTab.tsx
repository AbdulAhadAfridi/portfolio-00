"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, Pencil, Trash2, X, ExternalLink } from "lucide-react";
import { addCertificate, updateCertificate, deleteCertificate } from "@/app/actions";
import Toast, { useToast } from "@/components/Toast";

export default function CertificatesTab({ certificates }: { certificates: any[] }) {
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
        await updateCertificate(editId, formData);
        showToast("Certificate updated successfully!");
      } else {
        await addCertificate(formData);
        showToast("Certificate added successfully!");
      }
      setShowForm(false);
      setEditId(null);
      form.reset();
      router.refresh();
    } catch (err) {
      console.error(err);
      showToast("Failed to save certificate", "error");
    }
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    setLoading(true);
    await deleteCertificate(id);
    setDeleteConfirm(null);
    showToast("Certificate deleted successfully!");
    router.refresh();
    setLoading(false);
  };

  const editItem = certificates.find((c) => c.id === editId);

  return (
    <div>
      <Toast {...toast} />
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-black text-white mb-2">Certificates</h1>
          <p className="text-gray-500 text-sm">{certificates.length} certificates total</p>
        </div>
        <button onClick={() => { setShowForm(true); setEditId(null); }} className="flex items-center gap-2 bg-cyan-500/20 border border-cyan-500/30 text-cyan-400 px-4 py-2.5 rounded-xl text-sm font-bold hover:bg-cyan-500/30 transition-all">
          <Plus size={16} /> Add Certificate
        </button>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => { setShowForm(false); setEditId(null); }}>
          <div className="w-full max-w-lg bg-[#0d0d0d] border border-white/10 rounded-2xl p-6 shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-white">{editId ? "Edit Certificate" : "Add Certificate"}</h3>
              <button onClick={() => { setShowForm(false); setEditId(null); }} className="text-gray-500 hover:text-white"><X size={20} /></button>
            </div>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs text-gray-400 font-mono">TITLE</label>
                <input name="title" required defaultValue={editItem?.title || ""} className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-cyan-500/50 transition-colors" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs text-gray-400 font-mono">ISSUER</label>
                  <input name="issuer" required defaultValue={editItem?.issuer || ""} className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-cyan-500/50 transition-colors" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs text-gray-400 font-mono">DATE</label>
                  <input name="date" required defaultValue={editItem?.date || ""} placeholder="Jan 2024" className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-cyan-500/50 transition-colors" />
                </div>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs text-gray-400 font-mono">IMAGE URL (optional)</label>
                <input name="imageUrl" defaultValue={editItem?.imageUrl || ""} className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-cyan-500/50 transition-colors" />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs text-gray-400 font-mono">CREDENTIAL URL (optional)</label>
                <input name="credUrl" defaultValue={editItem?.credUrl || ""} className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-cyan-500/50 transition-colors" />
              </div>
              <button type="submit" disabled={loading} className="bg-cyan-500/20 border border-cyan-500/30 text-cyan-400 font-bold py-3 rounded-xl hover:bg-cyan-500/30 transition-all disabled:opacity-50 text-sm mt-2">
                {loading ? "Saving..." : editId ? "Update" : "Add Certificate"}
              </button>
            </form>
          </div>
        </div>
      )}

      {deleteConfirm && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#0d0d0d] border border-white/10 rounded-2xl p-6 max-w-sm w-full">
            <h3 className="text-white font-bold mb-2">Delete Certificate?</h3>
            <p className="text-gray-500 text-sm mb-6">This action cannot be undone.</p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteConfirm(null)} className="flex-1 bg-white/5 border border-white/10 text-gray-400 py-2.5 rounded-xl text-sm hover:bg-white/10 transition-all">Cancel</button>
              <button onClick={() => handleDelete(deleteConfirm)} disabled={loading} className="flex-1 bg-red-500/20 border border-red-500/30 text-red-400 py-2.5 rounded-xl text-sm hover:bg-red-500/30 transition-all disabled:opacity-50">{loading ? "Deleting..." : "Delete"}</button>
            </div>
          </div>
        </div>
      )}

      {certificates.length === 0 ? (
        <div className="text-center py-20"><p className="text-gray-600 text-sm">No certificates yet.</p></div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {certificates.map((cert) => (
            <div key={cert.id} className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-5 hover:border-white/10 transition-all">
              {cert.imageUrl && <div className="h-28 rounded-xl overflow-hidden mb-3 bg-white/5"><img src={cert.imageUrl} alt={cert.title} className="w-full h-full object-cover" /></div>}
              <h3 className="text-white font-bold text-sm mb-1">{cert.title}</h3>
              <p className="text-cyan-400 text-xs mb-1">{cert.issuer}</p>
              <p className="text-gray-600 text-xs font-mono">{cert.date}</p>
              <div className="flex items-center justify-between pt-3 mt-3 border-t border-white/5">
                <div className="flex gap-1">
                  <button onClick={() => { setEditId(cert.id); setShowForm(true); }} className="p-2 text-gray-600 hover:text-cyan-400 transition-colors"><Pencil size={14} /></button>
                  <button onClick={() => setDeleteConfirm(cert.id)} className="p-2 text-gray-600 hover:text-red-400 transition-colors"><Trash2 size={14} /></button>
                </div>
                {cert.credUrl && <a href={cert.credUrl} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-cyan-400 transition-colors"><ExternalLink size={14} /></a>}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

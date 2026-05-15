"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, Pencil, Trash2, X, ExternalLink } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { addProject, updateProject, deleteProject } from "@/app/actions";
import Toast, { useToast } from "@/components/Toast";

export default function ProjectsTab({ projects }: { projects: any[] }) {
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
        await updateProject(editId, formData);
        showToast("Project updated successfully!");
      } else {
        await addProject(formData);
        showToast("Project added successfully!");
      }
      setShowForm(false);
      setEditId(null);
      form.reset();
      router.refresh();
    } catch (err) {
      console.error(err);
      showToast("Failed to save project", "error");
    }
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    setLoading(true);
    await deleteProject(id);
    setDeleteConfirm(null);
    showToast("Project deleted successfully!");
    router.refresh();
    setLoading(false);
  };

  const editProject = projects.find((p) => p.id === editId);

  return (
    <div>
      <Toast {...toast} />
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-black text-white mb-2">Projects</h1>
          <p className="text-gray-500 text-sm">{projects.length} projects total</p>
        </div>
        <button
          onClick={() => { setShowForm(true); setEditId(null); }}
          className="flex items-center gap-2 bg-cyan-500/20 border border-cyan-500/30 text-cyan-400 px-4 py-2.5 rounded-xl text-sm font-bold hover:bg-cyan-500/30 transition-all"
        >
          <Plus size={16} /> Add Project
        </button>
      </div>

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => { setShowForm(false); setEditId(null); }}>
          <div className="w-full max-w-lg bg-[#0d0d0d] border border-white/10 rounded-2xl p-6 shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-white">{editId ? "Edit Project" : "Add New Project"}</h3>
              <button onClick={() => { setShowForm(false); setEditId(null); }} className="text-gray-500 hover:text-white"><X size={20} /></button>
            </div>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs text-gray-400 font-mono">TITLE</label>
                <input name="title" required defaultValue={editProject?.title || ""} className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-cyan-500/50 transition-colors" />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs text-gray-400 font-mono">DESCRIPTION</label>
                <textarea name="description" required rows={3} defaultValue={editProject?.description || ""} className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-cyan-500/50 transition-colors resize-none" />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs text-gray-400 font-mono">TECH STACK (comma separated)</label>
                <input name="techStack" required defaultValue={editProject?.techStack || ""} placeholder="React, Next.js, Node.js" className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-cyan-500/50 transition-colors" />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs text-gray-400 font-mono">IMAGE URL (optional)</label>
                <input name="imageUrl" defaultValue={editProject?.imageUrl || ""} className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-cyan-500/50 transition-colors" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs text-gray-400 font-mono">DEMO URL</label>
                  <input name="demoUrl" defaultValue={editProject?.demoUrl || ""} className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-cyan-500/50 transition-colors" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs text-gray-400 font-mono">GITHUB URL</label>
                  <input name="githubUrl" defaultValue={editProject?.githubUrl || ""} className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-cyan-500/50 transition-colors" />
                </div>
              </div>
              <button type="submit" disabled={loading} className="bg-cyan-500/20 border border-cyan-500/30 text-cyan-400 font-bold py-3 rounded-xl hover:bg-cyan-500/30 transition-all disabled:opacity-50 text-sm mt-2">
                {loading ? "Saving..." : editId ? "Update Project" : "Add Project"}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#0d0d0d] border border-white/10 rounded-2xl p-6 max-w-sm w-full">
            <h3 className="text-white font-bold mb-2">Delete Project?</h3>
            <p className="text-gray-500 text-sm mb-6">This action cannot be undone.</p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteConfirm(null)} className="flex-1 bg-white/5 border border-white/10 text-gray-400 py-2.5 rounded-xl text-sm hover:bg-white/10 transition-all">Cancel</button>
              <button onClick={() => handleDelete(deleteConfirm)} disabled={loading} className="flex-1 bg-red-500/20 border border-red-500/30 text-red-400 py-2.5 rounded-xl text-sm hover:bg-red-500/30 transition-all disabled:opacity-50">
                {loading ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Projects Grid */}
      {projects.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-gray-600 text-sm">No projects yet. Add your first project!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {projects.map((project) => (
            <div key={project.id} className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-5 hover:border-white/10 transition-all group">
              {project.imageUrl && (
                <div className="h-36 rounded-xl overflow-hidden mb-4 bg-white/5">
                  <img src={project.imageUrl} alt={project.title} className="w-full h-full object-cover" />
                </div>
              )}
              <h3 className="text-white font-bold mb-1">{project.title}</h3>
              <p className="text-gray-500 text-xs mb-3 line-clamp-2">{project.description}</p>
              <div className="flex flex-wrap gap-1 mb-4">
                {project.techStack.split(",").slice(0, 4).map((t: string) => (
                  <span key={t} className="text-[10px] px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-gray-400 font-mono">{t.trim()}</span>
                ))}
              </div>
              <div className="flex items-center gap-2 pt-3 border-t border-white/5">
                <button onClick={() => { setEditId(project.id); setShowForm(true); }} className="flex items-center gap-1.5 text-xs text-cyan-400 hover:text-cyan-300 transition-colors">
                  <Pencil size={12} /> Edit
                </button>
                <button onClick={() => setDeleteConfirm(project.id)} className="flex items-center gap-1.5 text-xs text-red-400 hover:text-red-300 transition-colors ml-auto">
                  <Trash2 size={12} /> Delete
                </button>
                {project.demoUrl && (
                  <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white transition-colors"><ExternalLink size={14} /></a>
                )}
                {project.githubUrl && (
                  <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white transition-colors"><FaGithub size={14} /></a>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

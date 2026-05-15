"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle, XCircle, Trash2, Star } from "lucide-react";
import { approveReview, rejectReview, deleteReview } from "@/app/actions";
import Toast, { useToast } from "@/components/Toast";

export default function ReviewsTab({ reviews }: { reviews: any[] }) {
  const router = useRouter();
  const [filter, setFilter] = useState<"all" | "pending" | "approved" | "rejected">("all");
  const [loading, setLoading] = useState<string | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const { toast, showToast } = useToast();

  const filtered = filter === "all" ? reviews : reviews.filter((r) => r.status === filter);
  const counts = {
    all: reviews.length,
    pending: reviews.filter((r) => r.status === "pending").length,
    approved: reviews.filter((r) => r.status === "approved").length,
    rejected: reviews.filter((r) => r.status === "rejected").length,
  };

  const handleApprove = async (id: string) => {
    setLoading(id);
    await approveReview(id);
    showToast("Review approved! Now visible on website.");
    router.refresh();
    setLoading(null);
  };

  const handleReject = async (id: string) => {
    setLoading(id);
    await rejectReview(id);
    showToast("Review rejected.", "info");
    router.refresh();
    setLoading(null);
  };

  const handleDelete = async (id: string) => {
    setLoading(id);
    await deleteReview(id);
    setDeleteConfirm(null);
    showToast("Review deleted.");
    router.refresh();
    setLoading(null);
  };

  const statusColors: Record<string, { bg: string; border: string; text: string }> = {
    pending: { bg: "bg-yellow-500/10", border: "border-yellow-500/20", text: "text-yellow-400" },
    approved: { bg: "bg-green-500/10", border: "border-green-500/20", text: "text-green-400" },
    rejected: { bg: "bg-red-500/10", border: "border-red-500/20", text: "text-red-400" },
  };

  return (
    <div>
      <Toast {...toast} />
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-black text-white mb-2">Visitor Reviews</h1>
          <p className="text-gray-500 text-sm">{reviews.length} reviews total • {counts.pending} pending approval</p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 mb-6">
        {(["all", "pending", "approved", "rejected"] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-xl text-xs font-bold tracking-wider transition-all ${
              filter === f
                ? "bg-cyan-500/20 border border-cyan-500/30 text-cyan-400"
                : "bg-white/5 border border-white/10 text-gray-500 hover:text-white hover:bg-white/10"
            }`}
          >
            {f.toUpperCase()} ({counts[f]})
          </button>
        ))}
      </div>

      {/* Delete Confirmation */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#0d0d0d] border border-white/10 rounded-2xl p-6 max-w-sm w-full">
            <h3 className="text-white font-bold mb-2">Delete Review?</h3>
            <p className="text-gray-500 text-sm mb-6">This action cannot be undone.</p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteConfirm(null)} className="flex-1 bg-white/5 border border-white/10 text-gray-400 py-2.5 rounded-xl text-sm hover:bg-white/10 transition-all">Cancel</button>
              <button onClick={() => handleDelete(deleteConfirm)} disabled={loading === deleteConfirm} className="flex-1 bg-red-500/20 border border-red-500/30 text-red-400 py-2.5 rounded-xl text-sm hover:bg-red-500/30 transition-all disabled:opacity-50">{loading === deleteConfirm ? "Deleting..." : "Delete"}</button>
            </div>
          </div>
        </div>
      )}

      {filtered.length === 0 ? (
        <div className="text-center py-20"><p className="text-gray-600 text-sm">No {filter === "all" ? "" : filter} reviews.</p></div>
      ) : (
        <div className="space-y-4">
          {filtered.map((review) => {
            const sc = statusColors[review.status] || statusColors.pending;
            return (
              <div key={review.id} className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-5 hover:border-white/10 transition-all">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2 flex-wrap">
                      <div className="w-9 h-9 rounded-full bg-pink-500/20 flex items-center justify-center text-pink-400 text-xs font-bold flex-shrink-0">
                        {review.name.charAt(0)}
                      </div>
                      <div>
                        <p className="text-white font-bold text-sm">{review.name}</p>
                        <p className="text-gray-600 text-xs">{review.role}</p>
                      </div>
                      <span className={`text-[10px] px-2.5 py-1 rounded-full ${sc.bg} ${sc.border} ${sc.text} font-bold tracking-wider border`}>
                        {review.status.toUpperCase()}
                      </span>
                    </div>
                    <div className="flex items-center gap-1 mb-2">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} size={11} className={i < review.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-700"} />
                      ))}
                    </div>
                    <p className="text-gray-400 text-sm">{review.content}</p>
                    <p className="text-gray-700 text-[10px] font-mono mt-2">{new Date(review.createdAt).toLocaleDateString()}</p>
                  </div>
                  <div className="flex flex-col gap-1 flex-shrink-0">
                    {review.status === "pending" && (
                      <>
                        <button onClick={() => handleApprove(review.id)} disabled={loading === review.id} className="p-2 text-green-500 hover:text-green-400 hover:bg-green-500/10 rounded-lg transition-all" title="Approve">
                          <CheckCircle size={18} />
                        </button>
                        <button onClick={() => handleReject(review.id)} disabled={loading === review.id} className="p-2 text-red-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all" title="Reject">
                          <XCircle size={18} />
                        </button>
                      </>
                    )}
                    {review.status === "rejected" && (
                      <button onClick={() => handleApprove(review.id)} disabled={loading === review.id} className="p-2 text-green-500 hover:text-green-400 hover:bg-green-500/10 rounded-lg transition-all" title="Approve">
                        <CheckCircle size={18} />
                      </button>
                    )}
                    {review.status === "approved" && (
                      <button onClick={() => handleReject(review.id)} disabled={loading === review.id} className="p-2 text-yellow-500 hover:text-yellow-400 hover:bg-yellow-500/10 rounded-lg transition-all" title="Revoke">
                        <XCircle size={18} />
                      </button>
                    )}
                    <button onClick={() => setDeleteConfirm(review.id)} className="p-2 text-gray-600 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all" title="Delete">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

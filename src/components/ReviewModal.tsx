"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Star, Send, CheckCircle } from "lucide-react";

interface ReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ReviewModal({ isOpen, onClose }: ReviewModalProps) {
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [content, setContent] = useState("");
  const [rating, setRating] = useState(5);
  const [hoveredStar, setHoveredStar] = useState(0);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle"
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");

    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, role, content, rating }),
      });

      if (res.ok) {
        setStatus("sent");
        setTimeout(() => {
          onClose();
          setStatus("idle");
          setName("");
          setRole("");
          setContent("");
          setRating(5);
        }, 2500);
      } else {
        setStatus("error");
        setTimeout(() => setStatus("idle"), 3000);
      }
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 3000);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[70]"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed inset-0 z-[80] flex items-center justify-center px-4"
          >
            <div className="w-full max-w-lg bg-[#0a0a0a]/95 border border-white/10 rounded-2xl backdrop-blur-xl shadow-2xl shadow-black/50 overflow-hidden">
              {/* Header */}
              <div className="px-6 py-5 border-b border-white/10 flex items-center justify-between bg-white/[0.02]">
                <div>
                  <h3 className="text-lg font-bold text-white">
                    Share Your Experience
                  </h3>
                  <p className="text-gray-500 text-xs mt-0.5">
                    Your review will appear after approval
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-all"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Success State */}
              {status === "sent" ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="px-6 py-16 text-center"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.1, type: "spring" }}
                  >
                    <CheckCircle
                      size={56}
                      className="text-green-400 mx-auto mb-4"
                    />
                  </motion.div>
                  <h4 className="text-xl font-bold text-white mb-2">
                    Thank You!
                  </h4>
                  <p className="text-gray-400 text-sm">
                    Your review has been submitted and will appear on the website
                    after approval.
                  </p>
                </motion.div>
              ) : (
                /* Form */
                <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-4">
                  {/* Name */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs text-gray-400 font-mono tracking-wider">
                      YOUR NAME
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="John Doe"
                      required
                      className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 outline-none focus:border-purple-500/50 transition-colors text-sm"
                    />
                  </div>

                  {/* Role */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs text-gray-400 font-mono tracking-wider">
                      YOUR ROLE / COMPANY
                    </label>
                    <input
                      type="text"
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      placeholder="CEO at TechCorp"
                      required
                      className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 outline-none focus:border-purple-500/50 transition-colors text-sm"
                    />
                  </div>

                  {/* Rating */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs text-gray-400 font-mono tracking-wider">
                      RATING
                    </label>
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onMouseEnter={() => setHoveredStar(star)}
                          onMouseLeave={() => setHoveredStar(0)}
                          onClick={() => setRating(star)}
                          className="p-1 transition-transform hover:scale-110"
                        >
                          <Star
                            size={24}
                            className={
                              star <= (hoveredStar || rating)
                                ? "text-yellow-400 fill-yellow-400"
                                : "text-gray-700"
                            }
                          />
                        </button>
                      ))}
                      <span className="text-gray-500 text-xs ml-2">
                        {rating}/5
                      </span>
                    </div>
                  </div>

                  {/* Review Content */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs text-gray-400 font-mono tracking-wider">
                      YOUR EXPERIENCE
                    </label>
                    <textarea
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      placeholder="Share your experience working with Abdul Ahad..."
                      required
                      rows={4}
                      className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 outline-none focus:border-purple-500/50 transition-colors resize-none text-sm"
                    />
                  </div>

                  {/* Error */}
                  {status === "error" && (
                    <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm px-4 py-3 rounded-xl">
                      Failed to submit. Please try again.
                    </div>
                  )}

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="group flex items-center justify-center gap-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 text-white font-bold py-3.5 rounded-xl hover:from-purple-500/30 hover:to-pink-500/30 transition-all disabled:opacity-50 text-sm tracking-wider"
                  >
                    {status === "sending" ? (
                      <div className="w-5 h-5 border-2 border-purple-400/30 border-t-purple-400 rounded-full animate-spin" />
                    ) : (
                      <>
                        <Send
                          size={16}
                          className="group-hover:translate-x-0.5 transition-transform"
                        />
                        Submit Review
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

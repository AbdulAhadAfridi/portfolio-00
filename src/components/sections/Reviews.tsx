"use client";
import { motion } from "framer-motion";
import { Star, Quote, MessageSquarePlus } from "lucide-react";
import { useState } from "react";
import ReviewModal from "@/components/ReviewModal";

interface Review {
  id: string;
  name: string;
  role: string;
  content: string;
  rating: number;
  createdAt: Date | string;
}

export default function Reviews({ reviews }: { reviews: Review[] }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <section className="py-16 sm:py-20 lg:py-28 px-4 sm:px-8 lg:px-16 xl:px-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute top-1/2 right-0 w-[600px] h-[600px] bg-pink-500/3 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16"
        >
          <span className="text-pink-400 font-mono text-xs sm:text-sm tracking-widest mb-3 block">
            VISITOR EXPERIENCES
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white mb-4">
            What Visitors <span className="text-pink-400">Say</span>
          </h2>
          <p className="text-gray-500 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed mb-8">
            Real feedback from people who have visited my portfolio and worked with me.
          </p>

          {/* Share Your Experience Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowModal(true)}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-500/20 to-purple-500/20 border border-pink-500/30 text-white font-bold px-6 sm:px-8 py-3 sm:py-4 rounded-xl hover:from-pink-500/30 hover:to-purple-500/30 transition-all text-xs sm:text-sm tracking-wider shadow-lg shadow-pink-500/5"
          >
            <MessageSquarePlus size={18} />
            Share Your Experience
          </motion.button>
        </motion.div>

        {/* Reviews Grid */}
        {reviews.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {reviews.map((review, i) => (
              <motion.div
                key={review.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="group bg-white/[0.02] border border-white/[0.06] rounded-2xl p-6 hover:border-pink-500/20 hover:bg-white/[0.04] transition-all duration-300 relative overflow-hidden"
              >
                {/* Top accent line */}
                <div className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-transparent via-pink-500 to-transparent" />

                {/* Quote icon */}
                <Quote size={20} className="text-pink-500/15 mb-3" />

                {/* Rating */}
                <div className="flex items-center gap-1 mb-3">
                  {Array.from({ length: 5 }).map((_, starIdx) => (
                    <Star
                      key={starIdx}
                      size={13}
                      className={
                        starIdx < review.rating
                          ? "text-yellow-400 fill-yellow-400"
                          : "text-gray-700"
                      }
                    />
                  ))}
                </div>

                {/* Content */}
                <p className="text-gray-300 text-sm leading-relaxed mb-5 italic">
                  &ldquo;{review.content}&rdquo;
                </p>

                {/* Author */}
                <div className="flex items-center gap-3 pt-4 border-t border-white/5">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-pink-500/20 to-purple-500/20 border border-pink-500/20 flex items-center justify-center text-white font-bold text-xs">
                    {review.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-white font-bold text-sm">{review.name}</p>
                    <p className="text-gray-500 text-xs">{review.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center py-12"
          >
            <p className="text-gray-600 text-sm">Be the first to share your experience!</p>
          </motion.div>
        )}
      </div>

      {/* Review Modal */}
      <ReviewModal isOpen={showModal} onClose={() => setShowModal(false)} />
    </section>
  );
}

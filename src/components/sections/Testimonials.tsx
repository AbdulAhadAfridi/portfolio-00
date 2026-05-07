"use client";
import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { useEffect, useState } from "react";

interface Testimonial {
  id: string;
  name: string;
  role: string;
  content: string;
  imageUrl?: string | null;
  rating: number;
}

export default function Testimonials({ testimonials }: { testimonials: Testimonial[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (testimonials.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  if (testimonials.length === 0) return null;

  return (
    <section className="py-16 sm:py-20 lg:py-28 px-4 sm:px-8 lg:px-16 xl:px-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute bottom-0 left-1/4 w-[600px] h-[600px] bg-purple-500/3 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16"
        >
          <span className="text-purple-400 font-mono text-xs sm:text-sm tracking-widest mb-3 block">
            TESTIMONIALS
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white mb-4">
            What People <span className="text-purple-400">Say</span>
          </h2>
          <p className="text-gray-500 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Feedback from clients and collaborators I&apos;ve worked with.
          </p>
        </motion.div>

        {/* Testimonials Carousel */}
        <div className="relative max-w-4xl mx-auto">
          {testimonials.map((testimonial, i) => (
            <motion.div
              key={testimonial.id}
              initial={false}
              animate={{
                opacity: i === currentIndex ? 1 : 0,
                scale: i === currentIndex ? 1 : 0.95,
                y: i === currentIndex ? 0 : 20,
              }}
              transition={{ duration: 0.5 }}
              className={`${i === currentIndex ? "relative" : "absolute inset-0"} ${i !== currentIndex ? "pointer-events-none" : ""}`}
            >
              <div className="glass-panel rounded-2xl sm:rounded-3xl p-8 sm:p-12 text-center relative">
                {/* Quote icon */}
                <div className="absolute top-6 left-6 sm:top-8 sm:left-8">
                  <Quote size={32} className="text-purple-500/20" />
                </div>

                {/* Rating */}
                <div className="flex items-center justify-center gap-1 mb-6">
                  {Array.from({ length: 5 }).map((_, starIndex) => (
                    <Star
                      key={starIndex}
                      size={16}
                      className={
                        starIndex < testimonial.rating
                          ? "text-yellow-400 fill-yellow-400"
                          : "text-gray-700"
                      }
                    />
                  ))}
                </div>

                {/* Content */}
                <p className="text-gray-300 text-base sm:text-lg md:text-xl leading-relaxed mb-8 italic max-w-2xl mx-auto">
                  &ldquo;{testimonial.content}&rdquo;
                </p>

                {/* Author */}
                <div className="flex items-center justify-center gap-4">
                  {testimonial.imageUrl ? (
                    <img
                      src={testimonial.imageUrl}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full object-cover border border-purple-500/30"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500/20 to-cyan-500/20 border border-purple-500/30 flex items-center justify-center text-white font-bold text-sm">
                      {testimonial.name.charAt(0)}
                    </div>
                  )}
                  <div className="text-left">
                    <p className="text-white font-bold text-sm sm:text-base">
                      {testimonial.name}
                    </p>
                    <p className="text-gray-500 text-xs sm:text-sm">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}

          {/* Dots */}
          {testimonials.length > 1 && (
            <div className="flex items-center justify-center gap-2 mt-8">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentIndex(i)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    i === currentIndex
                      ? "bg-purple-400 w-6 shadow-[0_0_10px_rgba(168,85,247,0.5)]"
                      : "bg-gray-700 hover:bg-gray-600"
                  }`}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

"use client";
import { motion } from "framer-motion";
import { Award, ExternalLink } from "lucide-react";

interface Certificate {
  id: string;
  title: string;
  issuer: string;
  date: string;
  imageUrl?: string | null;
  credUrl?: string | null;
}

export default function Certificates({ certificates }: { certificates: Certificate[] }) {
  if (certificates.length === 0) return null;

  return (
    <section className="py-16 sm:py-20 lg:py-28 px-4 sm:px-8 lg:px-16 xl:px-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute top-1/2 right-0 w-[400px] h-[400px] bg-yellow-500/3 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16"
        >
          <span className="text-yellow-400 font-mono text-xs sm:text-sm tracking-widest mb-3 block">
            ACHIEVEMENTS
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white mb-4">
            Certifications & <span className="text-yellow-400">Awards</span>
          </h2>
        </motion.div>

        {/* Certificates Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {certificates.map((cert, i) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="group bg-white/[0.02] border border-white/[0.06] rounded-2xl overflow-hidden hover:border-yellow-500/20 hover:bg-white/[0.04] transition-all duration-300"
            >
              {/* Certificate Image */}
              {cert.imageUrl && (
                <div className="relative h-40 overflow-hidden">
                  <img
                    src={cert.imageUrl}
                    alt={cert.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent" />
                </div>
              )}

              <div className="p-5 sm:p-6">
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center flex-shrink-0">
                    <Award size={18} className="text-yellow-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm sm:text-base font-bold text-white group-hover:text-yellow-300 transition-colors leading-snug">
                      {cert.title}
                    </h3>
                    <p className="text-gray-500 text-xs sm:text-sm mt-1">
                      {cert.issuer}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between mt-4 pt-3 border-t border-white/5">
                  <span className="text-gray-600 text-xs font-mono">
                    {cert.date}
                  </span>
                  {cert.credUrl && (
                    <a
                      href={cert.credUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-xs text-yellow-400 hover:text-yellow-300 transition-colors font-mono"
                    >
                      <ExternalLink size={12} />
                      VERIFY
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

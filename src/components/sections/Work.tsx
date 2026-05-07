"use client";
import { motion } from "framer-motion";

export default function Work({ works, services }: { works: any[], services: any[] }) {
  if (works.length === 0 && services.length === 0) return null;

  return (
    <section id="experience" className="py-16 sm:py-20 lg:py-28 px-4 sm:px-8 lg:px-16 xl:px-24 relative z-10 flex flex-col gap-16 sm:gap-20">

      {works.length > 0 && (
        <div className="max-w-7xl mx-auto w-full">
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold mb-8 sm:mb-12 text-white text-center lg:text-left"
          >
            WORK <span className="text-green-400">EXPERIENCE</span>
          </motion.h2>

          <div className="flex flex-col gap-6 sm:gap-8 border-l border-white/10 pl-6 sm:pl-8 ml-2 sm:ml-4">
            {works.map((w, i) => (
              <motion.div
                key={w.id}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative"
              >
                <div className="absolute -left-[29px] sm:-left-[37px] top-1 w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-green-400 border-4 border-black" />
                <h3 className="text-lg sm:text-2xl font-bold text-white">{w.role}</h3>
                <h4 className="text-sm sm:text-lg text-green-400 mb-2">
                  {w.company}
                  <span className="text-gray-500 text-xs sm:text-sm ml-2">{w.duration}</span>
                </h4>
                <p className="text-gray-400 max-w-2xl text-xs sm:text-base">{w.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {services.length > 0 && (
        <div className="max-w-7xl mx-auto w-full">
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold mb-8 sm:mb-12 text-white text-center lg:text-left"
          >
            MY <span className="text-purple-400">SERVICES</span>
          </motion.h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {services.map((s, i) => (
              <motion.div
                key={s.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white/5 border border-white/10 p-5 sm:p-6 rounded-xl hover:bg-white/10 transition-colors"
              >
                <h3 className="text-base sm:text-xl font-bold text-white mb-2 sm:mb-4">{s.title}</h3>
                <p className="text-gray-400 text-xs sm:text-base">{s.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

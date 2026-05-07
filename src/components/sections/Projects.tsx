"use client";
import { motion } from "framer-motion";

export default function Projects({ projects }: { projects: any[] }) {
  if (!projects || projects.length === 0) return null;

  return (
    <section id="projects" className="py-20 px-8 md:px-24 relative z-10">
      <motion.h2 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-4xl md:text-5xl font-bold mb-12 text-white"
      >
        LATEST <span className="text-cyan-400">PROJECTS</span>
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((p, i) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="group relative bg-black/40 border border-white/10 rounded-xl overflow-hidden hover:border-cyan-500/50 transition-colors"
          >
            <div className="p-6">
              <h3 className="text-xl font-bold text-white mb-2">{p.title}</h3>
              <p className="text-cyan-400 text-sm mb-4 font-mono">{p.techStack}</p>
              <p className="text-gray-400 text-sm">{p.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

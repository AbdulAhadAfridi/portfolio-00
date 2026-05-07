"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { ExternalLink, ArrowRight } from "lucide-react";
import { FaGithub } from "react-icons/fa";

interface Project {
  id: string;
  title: string;
  description: string;
  techStack: string;
  imageUrl?: string | null;
  demoUrl?: string | null;
  githubUrl?: string | null;
}

const PROJECT_COLORS = ["#00e5ff", "#a855f7", "#22c55e", "#f59e0b", "#06b6d4", "#ec4899"];

export default function FeaturedProjects({ projects }: { projects: Project[] }) {
  if (projects.length === 0) return null;

  const featured = projects.slice(0, 4);

  return (
    <section
      id="projects"
      className="py-16 sm:py-20 lg:py-28 px-4 sm:px-8 lg:px-16 xl:px-24 relative overflow-hidden"
    >
      {/* Background */}
      <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-cyan-500/3 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-12 sm:mb-16"
        >
          <div>
            <span className="text-cyan-400 font-mono text-xs sm:text-sm tracking-widest mb-3 block">
              MY WORK
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white">
              Featured <span className="text-cyan-400">Projects</span>
            </h2>
          </div>
          <Link
            href="/projects"
            className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 text-sm font-mono tracking-wider transition-colors group"
          >
            VIEW ALL
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {featured.map((project, i) => {
            const color = PROJECT_COLORS[i % PROJECT_COLORS.length];
            const techs = project.techStack.split(",").map((t) => t.trim());

            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                className="group relative bg-white/[0.02] border border-white/[0.06] rounded-2xl overflow-hidden hover:border-cyan-500/20 transition-all duration-300"
              >
                {/* Project Image / Gradient Placeholder */}
                <div
                  className="relative h-48 sm:h-56 overflow-hidden"
                  style={{
                    background: project.imageUrl
                      ? undefined
                      : `linear-gradient(135deg, ${color}15, ${color}05)`,
                  }}
                >
                  {project.imageUrl ? (
                    <img
                      src={project.imageUrl}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span
                        className="text-6xl font-black opacity-10"
                        style={{ color }}
                      >
                        {project.title.substring(0, 2).toUpperCase()}
                      </span>
                    </div>
                  )}
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent" />

                  {/* Top accent line */}
                  <div
                    className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      background: `linear-gradient(90deg, transparent, ${color}, transparent)`,
                    }}
                  />
                </div>

                {/* Content */}
                <div className="p-5 sm:p-6">
                  <h3 className="text-lg sm:text-xl font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-gray-500 text-xs sm:text-sm leading-relaxed mb-4 line-clamp-2">
                    {project.description}
                  </p>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {techs.slice(0, 5).map((tech) => (
                      <span
                        key={tech}
                        className="text-[10px] sm:text-xs px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-gray-400 font-mono"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Links */}
                  <div className="flex items-center gap-3 pt-3 border-t border-white/5">
                    <Link
                      href={`/projects/${project.id}`}
                      className="text-xs text-cyan-400 hover:text-cyan-300 font-mono tracking-wider transition-colors"
                    >
                      CASE STUDY →
                    </Link>
                    {project.demoUrl && (
                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-xs text-gray-500 hover:text-white transition-colors"
                      >
                        <ExternalLink size={12} />
                        LIVE
                      </a>
                    )}
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-xs text-gray-500 hover:text-white transition-colors"
                      >
                        <FaGithub size={12} />
                        CODE
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

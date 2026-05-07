"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { ExternalLink, ArrowLeft } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { useState } from "react";

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

export default function ProjectsGrid({ projects }: { projects: Project[] }) {
  const [filter, setFilter] = useState("All");

  // Extract unique techs for filter
  const allTechs = new Set<string>();
  projects.forEach((p) => {
    p.techStack.split(",").forEach((t) => {
      const trimmed = t.trim();
      if (trimmed) allTechs.add(trimmed);
    });
  });
  const techFilters = ["All", ...Array.from(allTechs).slice(0, 8)];

  const filtered = filter === "All"
    ? projects
    : projects.filter((p) =>
        p.techStack.toLowerCase().includes(filter.toLowerCase())
      );

  return (
    <section className="min-h-screen pt-28 sm:pt-32 pb-16 sm:pb-20 px-4 sm:px-8 lg:px-16 xl:px-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-cyan-500/3 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-purple-500/3 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12 sm:mb-16"
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-gray-500 hover:text-cyan-400 text-sm font-mono mb-6 transition-colors"
          >
            <ArrowLeft size={14} />
            BACK HOME
          </Link>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white mb-4">
            All <span className="text-cyan-400">Projects</span>
          </h1>
          <p className="text-gray-500 text-sm sm:text-base max-w-2xl leading-relaxed">
            A complete showcase of my work — from full-stack applications to frontend interfaces and backend systems.
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap gap-2 mb-10"
        >
          {techFilters.map((tech) => (
            <button
              key={tech}
              onClick={() => setFilter(tech)}
              className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-[10px] sm:text-xs font-mono tracking-wider transition-all duration-300 ${
                filter === tech
                  ? "bg-cyan-500/15 border border-cyan-500/30 text-cyan-400"
                  : "bg-white/[0.02] border border-white/5 text-gray-500 hover:text-gray-300 hover:border-white/10"
              }`}
            >
              {tech}
            </button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((project, i) => {
            const color = PROJECT_COLORS[i % PROJECT_COLORS.length];
            const techs = project.techStack.split(",").map((t) => t.trim());

            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                className="group relative bg-white/[0.02] border border-white/[0.06] rounded-2xl overflow-hidden hover:border-cyan-500/20 transition-all duration-300"
              >
                {/* Image */}
                <div
                  className="relative h-44 sm:h-52 overflow-hidden"
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
                      <span className="text-7xl font-black opacity-10" style={{ color }}>
                        {project.title.substring(0, 2).toUpperCase()}
                      </span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent" />
                  <div
                    className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      background: `linear-gradient(90deg, transparent, ${color}, transparent)`,
                    }}
                  />
                </div>

                {/* Content */}
                <div className="p-5 sm:p-6">
                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-gray-500 text-xs sm:text-sm leading-relaxed mb-4 line-clamp-2">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {techs.slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        className="text-[10px] px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-gray-400 font-mono"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

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

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg">No projects found for this filter.</p>
          </div>
        )}
      </div>
    </section>
  );
}

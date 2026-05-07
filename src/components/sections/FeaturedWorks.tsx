// "use client";
// import { motion, AnimatePresence } from "framer-motion";
// import { useState } from "react";
// import Link from "next/link";
// import { ExternalLink } from "lucide-react";

// const CATEGORIES = ["All Works", "Full Stack", "Backend", "Cloud", "Python"];

// const FEATURED_PROJECTS = [
//   {
//     id: "1",
//     title: "Cloud SaaS Platform",
//     description: "Enterprise-grade cloud management platform with real-time monitoring and auto-scaling.",
//     techStack: ["Next.js", "Python", "AWS", "Docker"],
//     category: "Cloud",
//     color: "#00e5ff",
//   },
//   {
//     id: "2",
//     title: "Data Engine",
//     description: "High-performance data processing pipeline with real-time analytics dashboard.",
//     techStack: ["TypeScript", "Node.js", "SQL", "Redis"],
//     category: "Backend",
//     color: "#a855f7",
//   },
//   {
//     id: "3",
//     title: "Real-Time Collab",
//     description: "Collaborative workspace with live editing, video calls, and AI-powered suggestions.",
//     techStack: ["React", "Node.js", "WebSocket", "MongoDB"],
//     category: "Full Stack",
//     color: "#22c55e",
//   },
//   {
//     id: "4",
//     title: "AI Analytics Suite",
//     description: "Machine learning-powered business analytics with predictive modeling and dashboards.",
//     techStack: ["Python", "TensorFlow", "FastAPI", "React"],
//     category: "Python",
//     color: "#f59e0b",
//   },
//   {
//     id: "5",
//     title: "DevOps Pipeline",
//     description: "Automated CI/CD pipeline with container orchestration and infrastructure as code.",
//     techStack: ["Docker", "Kubernetes", "Terraform", "Go"],
//     category: "Cloud",
//     color: "#06b6d4",
//   },
// ];

// const TECH_ICONS: Record<string, string> = {
//   "Next.js": "N",
//   "Python": "Py",
//   "AWS": "☁",
//   "Docker": "🐳",
//   "TypeScript": "TS",
//   "Node.js": "⬢",
//   "SQL": "DB",
//   "Redis": "◆",
//   "React": "⚛",
//   "WebSocket": "⚡",
//   "MongoDB": "🍃",
//   "TensorFlow": "TF",
//   "FastAPI": "⚡",
//   "Kubernetes": "☸",
//   "Terraform": "△",
//   "Go": "Go",
// };

// export default function FeaturedWorks({ projects }: { projects?: any[] }) {
//   const [activeCategory, setActiveCategory] = useState("All Works");
//   const [hoveredProject, setHoveredProject] = useState<string | null>(null);

//   const displayProjects = projects && projects.length > 0
//     ? projects.map((p, i) => ({
//         id: p.id,
//         title: p.title,
//         description: p.description,
//         techStack: p.techStack?.split(",").map((s: string) => s.trim()) || [],
//         category: "Full Stack",
//         color: ["#00e5ff", "#a855f7", "#22c55e", "#f59e0b", "#06b6d4"][i % 5],
//         demoUrl: p.demoUrl,
//         githubUrl: p.githubUrl,
//       }))
//     : FEATURED_PROJECTS;

//   const filteredProjects = activeCategory === "All Works"
//     ? displayProjects
//     : displayProjects.filter((p) => p.category === activeCategory);

//   return (
//     <section
//       id="work"
//       className="py-16 sm:py-20 lg:py-28 px-4 sm:px-8 lg:px-16 xl:px-24 relative overflow-hidden"
//     >
//       {/* Blueprint background */}
//       <div
//         className="absolute inset-0 opacity-[0.03] pointer-events-none"
//         style={{
//           backgroundImage: `
//             linear-gradient(rgba(0,229,255,0.3) 1px, transparent 1px),
//             linear-gradient(90deg, rgba(0,229,255,0.3) 1px, transparent 1px)
//           `,
//           backgroundSize: "60px 60px",
//           animation: "blueprint-drift 8s ease-in-out infinite",
//         }}
//       />

//       {/* Floating code snippets - desktop only */}
//       <div className="absolute top-20 right-20 text-cyan-500/[0.04] font-mono text-xs leading-loose pointer-events-none select-none hidden xl:block">
//         <pre>{`const deploy = async () => {
//   await build();
//   await test();
//   return push('production');
// }`}</pre>
//       </div>

//       <div className="max-w-7xl mx-auto">
//         {/* Section Header - stacked on mobile */}
//         <div className="flex flex-col lg:flex-row items-start gap-8 sm:gap-12 relative z-10">
//           {/* Left Side - Title */}
//           <motion.div
//             initial={{ opacity: 0, x: -60 }}
//             whileInView={{ opacity: 1, x: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.8 }}
//             className="w-full lg:w-1/4 flex flex-col gap-3 text-center lg:text-left"
//           >
//             <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-[0.9]">
//               FEATURED
//               <br />
//               <span className="text-cyan-400">WORKS</span>
//             </h2>
//             <p className="text-gray-500 text-xs sm:text-sm mt-2 sm:mt-4 max-w-xs mx-auto lg:mx-0 leading-relaxed">
//               A curated selection of projects showcasing full-stack engineering and system design.
//             </p>
//           </motion.div>

//           {/* Center - Crystal Panels */}
//           <div className="lg:flex-1 w-full flex justify-center items-center min-h-[300px] sm:min-h-[400px] perspective-container">
//             <div className="relative w-full max-w-2xl">
//               {/* Light column - hidden on mobile */}
//               <div
//                 className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 hidden sm:block"
//                 style={{
//                   background: "linear-gradient(180deg, transparent, rgba(0,229,255,0.3), transparent)",
//                   animation: "shimmer 3s ease-in-out infinite",
//                 }}
//               />

//               {/* Crystal Panels */}
//               <AnimatePresence mode="wait">
//                 <motion.div
//                   key={activeCategory}
//                   initial={{ opacity: 0 }}
//                   animate={{ opacity: 1 }}
//                   exit={{ opacity: 0 }}
//                   transition={{ duration: 0.4 }}
//                   className="flex flex-col gap-4 sm:gap-6"
//                 >
//                   {filteredProjects.map((project, index) => (
//                     <motion.div
//                       key={project.id}
//                       initial={{ opacity: 0, y: 30 }}
//                       whileInView={{ opacity: 1, y: 0 }}
//                       viewport={{ once: true }}
//                       transition={{ duration: 0.5, delay: index * 0.1 }}
//                       whileHover={{
//                         scale: 1.02,
//                         transition: { duration: 0.2 },
//                       }}
//                       onMouseEnter={() => setHoveredProject(project.id)}
//                       onMouseLeave={() => setHoveredProject(null)}
//                       className="glass-panel rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 relative group"
//                     >
//                       {/* Glow accent line */}
//                       <div
//                         className="absolute top-0 left-4 right-4 sm:left-6 sm:right-6 h-px transition-all duration-500"
//                         style={{
//                           background: hoveredProject === project.id
//                             ? `linear-gradient(90deg, transparent, ${project.color}, transparent)`
//                             : "linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)",
//                         }}
//                       />

//                       <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 sm:gap-4">
//                         <div className="flex-1">
//                           <span
//                             className="text-[10px] sm:text-xs font-mono tracking-widest mb-1 sm:mb-2 block transition-colors duration-300"
//                             style={{ color: hoveredProject === project.id ? project.color : "#6b7280" }}
//                           >
//                             PROJECT {String(index + 1).padStart(2, "0")}
//                           </span>
//                           <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-1 sm:mb-2 group-hover:text-cyan-300 transition-colors">
//                             {project.title}
//                           </h3>
//                           <p className="text-gray-400 text-xs sm:text-sm leading-relaxed max-w-md">
//                             {project.description}
//                           </p>
//                         </div>

//                         {/* Tech stack icons */}
//                         <div className="flex flex-wrap gap-1.5 sm:gap-2">
//                           {project.techStack.slice(0, 4).map((tech: string) => (
//                             <div
//                               key={tech}
//                               className="w-7 h-7 sm:w-9 sm:h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-[10px] sm:text-xs font-mono text-cyan-400 group-hover:border-cyan-500/30 transition-colors"
//                               title={tech}
//                             >
//                               {TECH_ICONS[tech] || tech.substring(0, 2)}
//                             </div>
//                           ))}
//                         </div>
//                       </div>

//                       {/* Bottom bar */}
//                       <div className="flex items-center justify-between gap-3 mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-white/5">
//                         <div className="flex items-center gap-2 sm:gap-3 overflow-hidden">
//                           <span
//                             className="text-[10px] sm:text-xs px-2 sm:px-3 py-0.5 sm:py-1 rounded-full border font-mono flex-shrink-0"
//                             style={{
//                               borderColor: `${project.color}30`,
//                               color: project.color,
//                               backgroundColor: `${project.color}08`,
//                             }}
//                           >
//                             {project.category}
//                           </span>
//                           <span className="text-gray-600 text-[10px] sm:text-xs font-mono truncate hidden sm:inline">
//                             {project.techStack.join(" • ")}
//                           </span>
//                         </div>

//                         {/* View Project link */}
//                         {"demoUrl" in project && (project as any).demoUrl && (
//                           <a
//                             href={(project as any).demoUrl}
//                             target="_blank"
//                             rel="noopener noreferrer"
//                             className="flex items-center gap-1 text-[10px] sm:text-xs text-gray-500 hover:text-cyan-400 transition-colors font-mono"
//                           >
//                             <ExternalLink size={12} />
//                             VIEW
//                           </a>
//                         )}
//                       </div>
//                     </motion.div>
//                   ))}
//                 </motion.div>
//               </AnimatePresence>
//             </div>
//           </div>

//           {/* Right Side - Category Filters */}
//           <motion.div
//             initial={{ opacity: 0, x: 60 }}
//             whileInView={{ opacity: 1, x: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.8, delay: 0.3 }}
//             className="w-full lg:w-auto flex lg:flex-col gap-2 sm:gap-3 flex-wrap justify-center lg:justify-start order-first lg:order-last"
//           >
//             {CATEGORIES.map((cat, i) => (
//               <motion.button
//                 key={cat}
//                 initial={{ opacity: 0, x: 20 }}
//                 whileInView={{ opacity: 1, x: 0 }}
//                 viewport={{ once: true }}
//                 transition={{ delay: 0.4 + i * 0.1 }}
//                 onClick={() => setActiveCategory(cat)}
//                 className={`flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2 sm:py-3 rounded-lg text-[10px] sm:text-sm font-mono tracking-wider transition-all duration-300 text-left ${
//                   activeCategory === cat
//                     ? "bg-cyan-500/10 border border-cyan-500/30 text-cyan-400"
//                     : "bg-white/[0.02] border border-white/5 text-gray-500 hover:text-gray-300 hover:border-white/10"
//                 }`}
//               >
//                 <span
//                   className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full transition-all flex-shrink-0 ${
//                     activeCategory === cat
//                       ? "bg-cyan-400 shadow-[0_0_8px_rgba(0,229,255,0.5)]"
//                       : "bg-gray-700"
//                   }`}
//                 />
//                 [{cat}]
//               </motion.button>
//             ))}
//           </motion.div>
//         </div>
//       </div>
//     </section>
//   );
// }

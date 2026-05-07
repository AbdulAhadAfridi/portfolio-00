"use client";
import { motion } from "framer-motion";
import { Download, ArrowLeft, Briefcase, GraduationCap, Code2, Server, Globe, Bot, Database, Smartphone } from "lucide-react";
import Link from "next/link";

interface Work {
  id: string;
  role: string;
  company: string;
  duration: string;
  description: string;
}

interface SiteSettings {
  cvUrl: string;
  email: string;
  phone: string;
  location: string;
}

const SKILLS_GROUPS = [
  {
    title: "Frontend",
    icon: Code2,
    color: "#00e5ff",
    items: ["React.js", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "HTML5/CSS3"],
  },
  {
    title: "Backend",
    icon: Server,
    color: "#a855f7",
    items: ["Node.js", "Python", "FastAPI", "Django", "Express.js", "REST APIs"],
  },
  {
    title: "Database",
    icon: Database,
    color: "#22c55e",
    items: ["PostgreSQL", "MongoDB", "SQLite", "Prisma ORM", "Redis"],
  },
  {
    title: "Tools & Other",
    icon: Globe,
    color: "#f59e0b",
    items: ["Git/GitHub", "Docker", "VS Code", "Vercel", "Linux", "CI/CD"],
  },
];

export default function ResumePageContent({ works, settings }: { works: Work[]; settings: SiteSettings }) {
  return (
    <div className="min-h-screen">
      <section className="pt-28 sm:pt-32 pb-16 px-4 sm:px-8 lg:px-16 xl:px-24 relative overflow-hidden">
        <div className="absolute top-1/4 right-1/4 w-[600px] h-[600px] bg-purple-500/3 rounded-full blur-[150px] pointer-events-none" />

        <div className="max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Link href="/" className="inline-flex items-center gap-2 text-gray-500 hover:text-cyan-400 text-sm font-mono mb-6 transition-colors">
              <ArrowLeft size={14} /> BACK HOME
            </Link>
          </motion.div>

          {/* Header */}
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="mb-12 sm:mb-16">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white mb-4">
              My <span className="text-cyan-400">Resume</span>
            </h1>
            <p className="text-gray-500 text-sm sm:text-base max-w-2xl leading-relaxed mb-8">
              A summary of my professional experience, skills, and education.
            </p>
            {settings.cvUrl && (
              <a
                href={settings.cvUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-500/30 text-white font-bold px-8 py-4 rounded-xl hover:from-cyan-500/30 hover:to-purple-500/30 transition-all text-sm tracking-wider hover:shadow-[0_0_30px_rgba(0,229,255,0.2)]"
              >
                <Download size={18} /> DOWNLOAD CV
              </a>
            )}
          </motion.div>

          {/* Skills */}
          <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-16">
            <h2 className="text-2xl sm:text-3xl font-black text-white mb-8">
              <span className="text-cyan-400 font-mono text-xs tracking-widest block mb-2">SKILLS</span>
              Technical Expertise
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {SKILLS_GROUPS.map((group, i) => (
                <motion.div
                  key={group.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-5 sm:p-6 hover:border-cyan-500/20 transition-all"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${group.color}15`, border: `1px solid ${group.color}30` }}>
                      <group.icon size={18} style={{ color: group.color }} />
                    </div>
                    <h3 className="text-white font-bold">{group.title}</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <span key={item} className="text-xs px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-gray-400 font-mono">{item}</span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Experience */}
          {works.length > 0 && (
            <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-16">
              <h2 className="text-2xl sm:text-3xl font-black text-white mb-8">
                <span className="text-green-400 font-mono text-xs tracking-widest block mb-2">EXPERIENCE</span>
                Work History
              </h2>
              <div className="relative">
                <div className="absolute left-4 sm:left-6 top-0 bottom-0 w-px bg-gradient-to-b from-green-500/30 via-green-500/10 to-transparent" />
                <div className="flex flex-col gap-6">
                  {works.map((work, i) => (
                    <motion.div key={work.id} initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="relative pl-12 sm:pl-16">
                      <div className="absolute left-2.5 sm:left-4 top-1 w-3 h-3 rounded-full bg-green-400 border-2 border-[#0a0a0a] shadow-[0_0_10px_rgba(34,197,94,0.5)]" />
                      <div className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-5 hover:border-green-500/20 transition-all">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
                          <h3 className="text-white font-bold">{work.role} <span className="text-green-400">@ {work.company}</span></h3>
                          <span className="text-gray-500 text-xs font-mono flex items-center gap-1.5"><Briefcase size={12} />{work.duration}</span>
                        </div>
                        <p className="text-gray-400 text-sm leading-relaxed">{work.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* Contact */}
          <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center py-12 border-t border-white/5">
            <p className="text-gray-500 text-sm mb-4">Interested in working together?</p>
            <Link href="/contact" className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-500/30 text-white font-bold px-8 py-4 rounded-xl hover:from-cyan-500/30 hover:to-purple-500/30 transition-all text-sm tracking-wider">
              GET IN TOUCH →
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

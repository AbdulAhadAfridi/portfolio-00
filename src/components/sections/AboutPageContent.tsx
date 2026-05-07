"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import { Award, ExternalLink, Briefcase, ArrowLeft, Code2, Server, Globe, Bot } from "lucide-react";
import Link from "next/link";

interface Work {
  id: string;
  role: string;
  company: string;
  duration: string;
  description: string;
}

interface Certificate {
  id: string;
  title: string;
  issuer: string;
  date: string;
  imageUrl?: string | null;
  credUrl?: string | null;
}

interface SiteSettings {
  aboutText: string;
  email: string;
  phone: string;
  location: string;
}

const SKILLS = [
  { name: "React.js / Next.js", level: 95, color: "#00e5ff" },
  { name: "TypeScript", level: 90, color: "#3178c6" },
  { name: "Node.js", level: 88, color: "#22c55e" },
  { name: "Python", level: 85, color: "#f59e0b" },
  { name: "Tailwind CSS", level: 92, color: "#06b6d4" },
  { name: "SQL / Prisma", level: 82, color: "#a855f7" },
  { name: "Docker", level: 75, color: "#2496ed" },
  { name: "Git / GitHub", level: 90, color: "#f97316" },
];

const HIGHLIGHTS = [
  { icon: Code2, label: "Frontend Expert", desc: "React, Next.js, TypeScript", color: "#00e5ff" },
  { icon: Server, label: "Backend Dev", desc: "Node.js, Python, FastAPI", color: "#a855f7" },
  { icon: Globe, label: "Full Stack", desc: "End-to-end applications", color: "#22c55e" },
  { icon: Bot, label: "AI Integration", desc: "Chatbots & automation", color: "#ec4899" },
];

export default function AboutPageContent({
  works,
  certificates,
  settings,
}: {
  works: Work[];
  certificates: Certificate[];
  settings: SiteSettings;
}) {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="pt-28 sm:pt-32 pb-16 sm:pb-20 px-4 sm:px-8 lg:px-16 xl:px-24 relative overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-cyan-500/5 rounded-full blur-[150px] pointer-events-none" />

        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-gray-500 hover:text-cyan-400 text-sm font-mono mb-6 transition-colors"
            >
              <ArrowLeft size={14} />
              BACK HOME
            </Link>
          </motion.div>

          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
            {/* Photo */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="relative w-56 h-56 sm:w-72 sm:h-72 md:w-80 md:h-80">
                <div className="w-full h-full rounded-full bg-gradient-to-b from-gray-800 to-black overflow-hidden relative border border-gray-800 shadow-[0_0_50px_rgba(0,255,255,0.1)]">
                  <Image
                    src="/images/profile-about.jpeg"
                    alt="Abdul Ahad Afridi"
                    fill
                    className="object-cover opacity-80 mix-blend-luminosity"
                  />
                </div>
                <div className="absolute -inset-3 rounded-full border border-cyan-500/10" />
              </div>
            </motion.div>

            {/* Text */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex-1 text-center lg:text-left"
            >
              <span className="text-cyan-400 font-mono mb-3 tracking-widest text-xs sm:text-sm block">
                ABOUT ME
              </span>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-black mb-6 text-white leading-tight">
                Abdul Ahad <span className="text-cyan-400">Afridi</span>
              </h1>
              <p className="text-sm sm:text-base md:text-lg leading-relaxed text-gray-400 mb-6 max-w-2xl">
                {settings.aboutText ||
                  "Web Developer | Frontend Engineer | Python Developer with experience building scalable web applications using React.js, Next.js, Node.js, and Python. Skilled in responsive design, microservices architecture, CMS development, and AI chatbot integration. Passionate about creating high-performance, production-ready solutions from concept to deployment."}
              </p>

              {/* Quick Info */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl px-4 py-3">
                  <FaPhone className="text-cyan-400 text-sm flex-shrink-0" />
                  <span className="text-gray-400 text-xs sm:text-sm font-mono">{settings.phone}</span>
                </div>
                <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl px-4 py-3">
                  <FaEnvelope className="text-cyan-400 text-sm flex-shrink-0" />
                  <span className="text-gray-400 text-xs sm:text-sm font-mono">{settings.email}</span>
                </div>
                <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl px-4 py-3">
                  <FaMapMarkerAlt className="text-cyan-400 text-sm flex-shrink-0" />
                  <span className="text-gray-400 text-xs sm:text-sm font-mono">{settings.location}</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Highlights */}
      <section className="py-12 px-4 sm:px-8 lg:px-16 xl:px-24">
        <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-4">
          {HIGHLIGHTS.map((h, i) => (
            <motion.div
              key={h.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-5 text-center hover:border-cyan-500/20 transition-all"
            >
              <div
                className="w-12 h-12 rounded-xl mx-auto mb-3 flex items-center justify-center"
                style={{ backgroundColor: `${h.color}15`, border: `1px solid ${h.color}30` }}
              >
                <h.icon size={22} style={{ color: h.color }} />
              </div>
              <h3 className="text-white font-bold text-sm mb-1">{h.label}</h3>
              <p className="text-gray-500 text-xs">{h.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Skills */}
      <section className="py-16 sm:py-20 px-4 sm:px-8 lg:px-16 xl:px-24">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="text-cyan-400 font-mono text-xs sm:text-sm tracking-widest mb-3 block">
              PROFICIENCY
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white">
              Technical <span className="text-cyan-400">Skills</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {SKILLS.map((skill, i) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="group"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors">
                    {skill.name}
                  </span>
                  <span className="text-xs text-gray-500 font-mono">{skill.level}%</span>
                </div>
                <div className="h-2 bg-white/5 rounded-full overflow-hidden border border-white/5">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: i * 0.1 }}
                    className="h-full rounded-full"
                    style={{
                      background: `linear-gradient(90deg, ${skill.color}40, ${skill.color})`,
                      boxShadow: `0 0 10px ${skill.color}40`,
                    }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Work Experience */}
      {works.length > 0 && (
        <section className="py-16 sm:py-20 px-4 sm:px-8 lg:px-16 xl:px-24">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <span className="text-green-400 font-mono text-xs sm:text-sm tracking-widest mb-3 block">
                EXPERIENCE
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white">
                Work <span className="text-green-400">History</span>
              </h2>
            </motion.div>

            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-4 sm:left-6 top-0 bottom-0 w-px bg-gradient-to-b from-green-500/30 via-green-500/10 to-transparent" />

              <div className="flex flex-col gap-8">
                {works.map((work, i) => (
                  <motion.div
                    key={work.id}
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.15 }}
                    className="relative pl-12 sm:pl-16"
                  >
                    {/* Dot */}
                    <div className="absolute left-2.5 sm:left-4 top-1 w-3 h-3 rounded-full bg-green-400 border-2 border-[#0a0a0a] shadow-[0_0_10px_rgba(34,197,94,0.5)]" />

                    <div className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-5 sm:p-6 hover:border-green-500/20 transition-all">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
                        <h3 className="text-white font-bold text-base sm:text-lg">
                          {work.role} <span className="text-green-400">@ {work.company}</span>
                        </h3>
                        <span className="text-gray-500 text-xs font-mono flex items-center gap-1.5">
                          <Briefcase size={12} />
                          {work.duration}
                        </span>
                      </div>
                      <p className="text-gray-400 text-sm leading-relaxed">{work.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Certificates */}
      {certificates.length > 0 && (
        <section className="py-16 sm:py-20 px-4 sm:px-8 lg:px-16 xl:px-24">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <span className="text-yellow-400 font-mono text-xs sm:text-sm tracking-widest mb-3 block">
                ACHIEVEMENTS
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white">
                Certifications & <span className="text-yellow-400">Awards</span>
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {certificates.map((cert, i) => (
                <motion.div
                  key={cert.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  whileHover={{ y: -4 }}
                  className="group bg-white/[0.02] border border-white/[0.06] rounded-2xl overflow-hidden hover:border-yellow-500/20 transition-all"
                >
                  {cert.imageUrl && (
                    <div className="relative h-40 overflow-hidden">
                      <img src={cert.imageUrl} alt={cert.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent" />
                    </div>
                  )}
                  <div className="p-5 sm:p-6">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-xl bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center flex-shrink-0">
                        <Award size={18} className="text-yellow-400" />
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-white group-hover:text-yellow-300 transition-colors">{cert.title}</h3>
                        <p className="text-gray-500 text-xs mt-1">{cert.issuer}</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between mt-4 pt-3 border-t border-white/5">
                      <span className="text-gray-600 text-xs font-mono">{cert.date}</span>
                      {cert.credUrl && (
                        <a href={cert.credUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-xs text-yellow-400 hover:text-yellow-300 transition-colors font-mono">
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
      )}
    </div>
  );
}

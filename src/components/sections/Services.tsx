"use client";
import { motion } from "framer-motion";
import {
  Globe, Smartphone, Code2, Server, Bot, Rocket,
  Wrench, Layout, Database, Shield,
  Palette, Cpu, Wifi, Zap, Cloud, Lock, FileCode, Monitor,
  type LucideIcon,
} from "lucide-react";

const ICON_MAP: Record<string, LucideIcon> = {
  Globe, Smartphone, Code2, Server, Bot, Rocket,
  Wrench, Layout, Database, Shield,
  Palette, Cpu, Wifi, Zap, Cloud, Lock, FileCode, Monitor,
};

const FALLBACK_COLORS = ["#00e5ff", "#a855f7", "#22c55e", "#f59e0b", "#ec4899", "#06b6d4", "#8b5cf6", "#14b8a6", "#f97316", "#ef4444"];

const DEFAULT_SERVICES = [
  { title: "Custom Website Development", description: "Fully tailored websites built from scratch to match your brand, vision, and business needs with pixel-perfect execution.", icon: "Globe", color: "#00e5ff" },
  { title: "Responsive Web Design", description: "Beautiful, mobile-first designs that look and perform flawlessly on every device — phones, tablets, and desktops.", icon: "Smartphone", color: "#a855f7" },
  { title: "Frontend Development (React / Next.js)", description: "Fast, interactive, and SEO-optimized front-end applications built with React.js and Next.js for a premium user experience.", icon: "Code2", color: "#22c55e" },
  { title: "Python Backend Development", description: "Robust, scalable server-side solutions using Python, FastAPI, and Django for data processing and API development.", icon: "Server", color: "#f59e0b" },
  { title: "AI Chatbot Integration", description: "Intelligent chatbot systems powered by AI to automate customer support, lead generation, and user engagement.", icon: "Bot", color: "#ec4899" },
  { title: "Landing Pages for Startups", description: "High-converting landing pages designed for startups — fast loading, visually stunning, and optimized for conversions.", icon: "Rocket", color: "#06b6d4" },
  { title: "Website Optimization & Maintenance", description: "Speed optimization, bug fixes, security updates, and ongoing maintenance to keep your website running at peak performance.", icon: "Wrench", color: "#8b5cf6" },
  { title: "CMS Development", description: "Custom content management systems and admin dashboards so you can manage your website content independently.", icon: "Layout", color: "#14b8a6" },
  { title: "Database & API Design", description: "Efficient database architecture and RESTful/GraphQL APIs designed for scalability and optimal performance.", icon: "Database", color: "#f97316" },
  { title: "E-Commerce Solutions", description: "Full e-commerce platforms with payment integration, inventory management, and seamless checkout experiences.", icon: "Shield", color: "#ef4444" },
];

interface ServicesProps {
  dbServices?: { id: string; title: string; description: string; icon?: string | null }[];
}

export default function Services({ dbServices }: ServicesProps) {
  const services = dbServices && dbServices.length > 0
    ? dbServices.map((s, i) => ({
        ...s,
        color: FALLBACK_COLORS[i % FALLBACK_COLORS.length],
        iconName: s.icon || "Code2",
      }))
    : DEFAULT_SERVICES.map((s, i) => ({ ...s, id: `default-${i}`, iconName: s.icon, color: s.color }));

  return (
    <section
      id="services"
      className="py-16 sm:py-20 lg:py-28 px-4 sm:px-8 lg:px-16 xl:px-24 relative overflow-hidden"
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-500/3 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16"
        >
          <span className="text-cyan-400 font-mono text-xs sm:text-sm tracking-widest mb-3 block">
            WHAT I OFFER
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white mb-4">
            Professional <span className="text-cyan-400">Services</span>
          </h2>
          <p className="text-gray-500 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Build your dream website with professional web development services. From frontend to backend, I deliver end-to-end solutions.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {services.map((service, i) => {
            const IconComponent = ICON_MAP[service.iconName] || Code2;
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="group bg-white/[0.02] border border-white/[0.06] rounded-2xl p-5 sm:p-6 hover:border-cyan-500/20 hover:bg-white/[0.04] transition-all duration-300 relative overflow-hidden"
              >
                <div
                  className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: `linear-gradient(90deg, transparent, ${service.color}, transparent)` }}
                />
                <div
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center mb-4 transition-all duration-300 group-hover:shadow-lg"
                  style={{ backgroundColor: `${service.color}10`, border: `1px solid ${service.color}20` }}
                >
                  <IconComponent size={20} style={{ color: service.color }} className="sm:w-[22px] sm:h-[22px]" />
                </div>
                <h3 className="text-sm sm:text-base font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors leading-snug">
                  {service.title}
                </h3>
                <p className="text-gray-500 text-xs sm:text-sm leading-relaxed">
                  {service.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center mt-12 sm:mt-16"
        >
          <a
            href="#contact"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-500/30 text-white font-bold px-6 sm:px-8 py-3 sm:py-4 rounded-xl hover:from-cyan-500/30 hover:to-purple-500/30 transition-all text-xs sm:text-sm tracking-wider"
          >
            <Rocket size={16} />
            LET&apos;S BUILD TOGETHER
          </a>
        </motion.div>
      </div>
    </section>
  );
}

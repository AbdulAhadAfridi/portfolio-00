"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

interface AboutProps {
  settings?: {
    aboutText?: string;
    phone?: string;
    email?: string;
    location?: string;
  };
}

export default function About({ settings }: AboutProps) {
  const aboutText = settings?.aboutText && settings.aboutText.length > 0
    ? settings.aboutText
    : "Web Developer | Frontend Engineer | Python Developer with experience building scalable web applications using React.js, Next.js, Node.js, and Python. Skilled in responsive design, microservices architecture, CMS development, and AI chatbot integration. Passionate about creating high-performance, production-ready solutions from concept to deployment.";
  const phone = settings?.phone || "0312-8760904";
  const email = settings?.email || "abdulahadafridi@gmail.com";
  const location = settings?.location || "Pakistan";

  return (
    <section
      id="about"
      className="py-16 sm:py-20 lg:py-28 px-4 sm:px-8 lg:px-16 xl:px-24 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-20">
        {/* Left Column - Photo */}
        <div className="flex justify-center lg:justify-start items-center w-full lg:w-auto z-10">
          <motion.div
            whileInView={{ x: 0, opacity: 1 }}
            initial={{ x: -100, opacity: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              animate={{ y: [-12, 12, -12] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="relative w-56 h-56 sm:w-72 sm:h-72 md:w-80 md:h-80 lg:w-[380px] lg:h-[380px]"
            >
              <div className="w-full h-full rounded-full bg-gradient-to-b from-gray-800 to-black overflow-hidden relative border border-gray-800 shadow-[0_0_50px_rgba(0,255,255,0.1)]">
                <Image
                  src="/images/profile-about.jpeg"
                  alt="Abdul Ahad Afridi"
                  fill
                  className="object-cover opacity-80 mix-blend-luminosity"
                />
              </div>
              {/* Decorative ring */}
              <div className="absolute -inset-3 rounded-full border border-cyan-500/10" />
            </motion.div>
          </motion.div>
        </div>

        {/* Right Column - Text */}
        <motion.div
          whileInView={{ x: 0, opacity: 1 }}
          initial={{ x: 100, opacity: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left z-10"
        >
          <span className="text-cyan-400 font-mono mb-3 sm:mb-6 tracking-widest text-xs sm:text-sm">
            ABOUT ME
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-4 sm:mb-6 text-white leading-tight">
            Abdul Ahad <span className="text-cyan-400">Afridi</span>
          </h2>
          <p className="text-sm sm:text-base md:text-lg leading-relaxed text-gray-400 mb-6 max-w-2xl">
            {aboutText}
          </p>

          {/* Quick Info Cards */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto">
            <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl px-4 py-3">
              <FaPhone className="text-cyan-400 text-sm flex-shrink-0" />
              <span className="text-gray-400 text-xs sm:text-sm font-mono">{phone}</span>
            </div>
            <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl px-4 py-3">
              <FaEnvelope className="text-cyan-400 text-sm flex-shrink-0" />
              <span className="text-gray-400 text-xs sm:text-sm font-mono">{email}</span>
            </div>
            <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl px-4 py-3">
              <FaMapMarkerAlt className="text-cyan-400 text-sm flex-shrink-0" />
              <span className="text-gray-400 text-xs sm:text-sm font-mono">{location}</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

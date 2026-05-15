"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

const SKILLS_TEXT = "NEXT.JS • NODE.JS • PYTHON • REACT • DOCKER • SQL • TYPESCRIPT • CLOUD • ";

interface HeroProps {
  settings?: {
    heroTitle?: string;
    heroSubtitle?: string;
  };
}

export default function Hero({ settings }: HeroProps) {
  const [isHovered, setIsHovered] = useState(false);
  const characters = SKILLS_TEXT.split("");

  const title = settings?.heroTitle || "ABDUL AHAD";
  const subtitle = settings?.heroSubtitle || "Web Developer | Frontend Engineer | Python Developer";
  const nameParts = title.split(" ");
  const firstName = nameParts[0] || "";
  const lastName = nameParts.slice(1).join(" ") || "";

  return (
    <section
      id="home"
      className="min-h-screen pt-20 sm:pt-24 pb-12 sm:pb-20 px-4 sm:px-8 lg:px-16 xl:px-24 flex flex-col lg:flex-row items-center justify-between relative overflow-hidden gap-8 lg:gap-4"
    >
      {/* Subtle radial glow backgrounds */}
      <div className="absolute top-1/4 left-1/4 w-[300px] sm:w-[600px] h-[300px] sm:h-[600px] bg-cyan-500/5 rounded-full blur-[80px] sm:blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[250px] sm:w-[500px] h-[250px] sm:h-[500px] bg-purple-500/5 rounded-full blur-[80px] sm:blur-[120px] pointer-events-none" />

      {/* Left Column - Name */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left z-10 order-2 lg:order-1"
      >
        <span className="text-cyan-400 font-mono mb-2 sm:mb-4 text-xs sm:text-sm md:text-base tracking-wider">
          Hello! I&apos;m
        </span>
        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black leading-[0.9] uppercase tracking-tight">
          {firstName}
          <br />
          {lastName}
        </h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-gray-500 text-xs sm:text-sm md:text-base mt-4 sm:mt-6 max-w-xs leading-relaxed"
        >
          {subtitle} — crafting scalable digital experiences.
        </motion.p>
        {/* Mobile CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="flex gap-3 mt-6 lg:hidden"
        >
          <a
            href="#contact"
            className="px-5 py-2.5 bg-cyan-500/20 border border-cyan-500/30 rounded-xl text-cyan-400 text-xs font-bold tracking-wider hover:bg-cyan-500/30 transition-all"
          >
            HIRE ME
          </a>
          <a
            href="#work"
            className="px-5 py-2.5 bg-white/5 border border-white/10 rounded-xl text-gray-400 text-xs font-bold tracking-wider hover:bg-white/10 transition-all"
          >
            VIEW WORK
          </a>
        </motion.div>
      </motion.div>

      {/* Center Column - Avatar with Rotating Ring */}
      <div className="flex-shrink-0 relative flex justify-center items-center z-10 order-1 lg:order-2">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative flex items-center justify-center w-[280px] h-[280px] sm:w-[340px] sm:h-[340px] md:w-[400px] md:h-[400px] lg:w-[420px] lg:h-[420px]"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Outer glow ring */}
          <div className="absolute inset-0 rounded-full border border-cyan-500/20" />
          <div className="absolute inset-2 rounded-full border border-cyan-500/10" />

          {/* Spinning skill ring */}
          <div
            className="absolute inset-0 hidden sm:block"
            style={{
              animation: isHovered ? "none" : "spin 20s linear infinite",
            }}
          >
            {characters.map((char, i) => {
              const rotation = (i / characters.length) * 360;
              return (
                <span
                  key={i}
                  className="absolute left-1/2 top-0 text-[10px] sm:text-xs md:text-sm font-bold text-cyan-400 drop-shadow-[0_0_6px_rgba(0,229,255,0.4)]"
                  style={{
                    transformOrigin: "0 170px",
                    transform: `rotate(${rotation}deg)`,
                    marginLeft: "-0.3em",
                  }}
                >
                  {char}
                </span>
              );
            })}
          </div>

          {/* Mobile simplified ring glow */}
          <div className="absolute inset-4 rounded-full border border-cyan-500/10 sm:hidden" />
          <div className="absolute inset-8 rounded-full border border-cyan-400/5 sm:hidden" />

          {/* Inner ring decoration */}
          <div className="absolute w-[180px] h-[180px] sm:w-[220px] sm:h-[220px] md:w-[280px] md:h-[280px] rounded-full border border-white/5" />

          {/* Center Avatar */}
          <motion.div
            animate={{ y: [-8, 8, -8] }}
            transition={{
              repeat: Infinity,
              duration: 4,
              ease: "easeInOut",
            }}
            className="relative w-[160px] h-[160px] sm:w-[200px] sm:h-[200px] md:w-[250px] md:h-[250px] rounded-full overflow-hidden shadow-[0_0_50px_rgba(0,229,255,0.2)] border-2 border-cyan-500/20"
          >
            <Image
              src="/images/hero-avatar.png"
              alt={`${title} - Developer`}
              fill
              className="object-cover"
              priority
            />
          </motion.div>
        </motion.div>
      </div>

      {/* Right Column - Title */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="flex-1 flex flex-col items-center lg:items-end text-center lg:text-right z-10 order-3"
      >
        <span className="text-cyan-400 font-mono mb-2 lg:mr-12 tracking-wider text-xs sm:text-sm">
          A Full Stack
        </span>
        <div className="relative">
          <h2 className="text-[15vw] sm:text-[12vw] lg:text-[7vw] font-black leading-none text-texture opacity-80 pointer-events-none select-none">
            DEVELOPER
          </h2>
          <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-white absolute bottom-1 sm:bottom-4 lg:bottom-8 right-0 lg:right-12">
            ENGINEER
          </h2>
        </div>
      </motion.div>
    </section>
  );
}

"use client";
import { useState } from "react";
import { motion } from "framer-motion";

export default function IntroLoader({ onComplete }: { onComplete: () => void }) {
  const [isLeaving, setIsLeaving] = useState(false);

  const handleToggle = () => {
    setIsLeaving(true);
    setTimeout(() => {
      onComplete();
    }, 800);
  };

  return (
    <motion.div
      initial={{ y: 0 }}
      animate={{ y: isLeaving ? "-100%" : 0 }}
      transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
      className="fixed inset-0 z-[10000] flex items-center justify-between px-12 md:px-24 bg-[#e8f2f0] text-black overflow-hidden"
    >
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="text-xs md:text-sm tracking-widest font-bold whitespace-nowrap"
      >
        FULL STACK DEVELOPER
      </motion.div>
      
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, delay: 0.4 }}
        onClick={handleToggle}
        className="flex items-center gap-4 bg-black text-white px-8 py-4 rounded-full hover:scale-105 transition-transform shadow-2xl"
      >
        <span className="text-sm font-bold tracking-widest">WELCOME</span>
        <div className="w-3 h-3 bg-white rounded-full animate-pulse" />
      </motion.button>

      <motion.div
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="text-xs md:text-sm tracking-widest font-bold whitespace-nowrap"
      >
        SOFTWARE ENGINEER
      </motion.div>
    </motion.div>
  );
}


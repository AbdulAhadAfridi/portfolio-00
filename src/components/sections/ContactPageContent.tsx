"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import { Mail, MapPin, Send, Phone, ArrowLeft } from "lucide-react";
import { FaWhatsapp, FaInstagram, FaLinkedin, FaTwitter, FaGithub } from "react-icons/fa";
import Link from "next/link";

export default function ContactPageContent() {
  const [formState, setFormState] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormState("sending");
    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.get("name"),
          email: formData.get("email"),
          message: formData.get("message"),
        }),
      });

      if (res.ok) {
        setFormState("sent");
        form.reset();
        setTimeout(() => setFormState("idle"), 3000);
      } else {
        setFormState("error");
        setTimeout(() => setFormState("idle"), 3000);
      }
    } catch {
      setFormState("error");
      setTimeout(() => setFormState("idle"), 3000);
    }
  };

  return (
    <div className="min-h-screen">
      <section className="pt-28 sm:pt-32 pb-16 sm:pb-20 px-4 sm:px-8 lg:px-16 xl:px-24 relative overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-cyan-500/5 rounded-full blur-[150px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-[150px] pointer-events-none" />

        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Link href="/" className="inline-flex items-center gap-2 text-gray-500 hover:text-cyan-400 text-sm font-mono mb-6 transition-colors">
              <ArrowLeft size={14} /> BACK HOME
            </Link>
          </motion.div>

          <div className="flex flex-col lg:flex-row items-start gap-12 lg:gap-16">
            {/* Left */}
            <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} className="flex-1 w-full">
              <span className="text-cyan-400 font-mono mb-4 tracking-widest text-xs sm:text-sm block">GET IN TOUCH</span>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-8 text-white leading-tight">
                Let&apos;s work<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">together.</span>
              </h1>

              <div className="flex flex-col gap-6 mt-12">
                <div className="flex items-center gap-4 text-gray-400">
                  <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0">
                    <Mail size={18} className="text-cyan-400" />
                  </div>
                  <div>
                    <p className="text-white font-medium">Email</p>
                    <p className="text-sm">abdulahadafridi@gmail.com</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-gray-400">
                  <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0">
                    <Phone size={18} className="text-cyan-400" />
                  </div>
                  <div>
                    <p className="text-white font-medium">Phone / WhatsApp</p>
                    <p className="text-sm">+92 312-8760904</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-gray-400">
                  <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0">
                    <MapPin size={18} className="text-cyan-400" />
                  </div>
                  <div>
                    <p className="text-white font-medium">Location</p>
                    <p className="text-sm">Pakistan — Available Worldwide</p>
                  </div>
                </div>
              </div>

              {/* Socials */}
              <div className="flex items-center gap-4 mt-10">
                <a href="https://github.com/AAhadAfridi" target="_blank" rel="noopener noreferrer" className="w-11 h-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:border-white/20 transition-all"><FaGithub size={18} /></a>
                <a href="https://wa.me/923128760904" target="_blank" rel="noopener noreferrer" className="w-11 h-11 rounded-xl bg-green-500/10 border border-green-500/20 flex items-center justify-center text-green-400 hover:bg-green-500/20 transition-all"><FaWhatsapp size={18} /></a>
                <a href="https://instagram.com/a.ahad_afridi" target="_blank" rel="noopener noreferrer" className="w-11 h-11 rounded-xl bg-pink-500/10 border border-pink-500/20 flex items-center justify-center text-pink-400 hover:bg-pink-500/20 transition-all"><FaInstagram size={18} /></a>
                <a href="https://linkedin.com/in/abdul-ahad-afridb74D303/" target="_blank" rel="noopener noreferrer" className="w-11 h-11 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 hover:bg-blue-500/20 transition-all"><FaLinkedin size={18} /></a>
                <a href="https://twitter.com/AAhadAfridi" target="_blank" rel="noopener noreferrer" className="w-11 h-11 rounded-xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400 hover:bg-sky-500/20 transition-all"><FaTwitter size={18} /></a>
              </div>
            </motion.div>

            {/* Right - Form */}
            <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="flex-1 w-full">
              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                <div className="flex flex-col gap-2">
                  <label htmlFor="contact-name" className="text-sm text-gray-400 font-mono tracking-wider">NAME</label>
                  <input id="contact-name" name="name" type="text" required placeholder="Your name" className="bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white placeholder-gray-600 outline-none focus:border-cyan-500/50 transition-colors" />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="contact-email" className="text-sm text-gray-400 font-mono tracking-wider">EMAIL</label>
                  <input id="contact-email" name="email" type="email" required placeholder="your@email.com" className="bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white placeholder-gray-600 outline-none focus:border-cyan-500/50 transition-colors" />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="contact-message" className="text-sm text-gray-400 font-mono tracking-wider">MESSAGE</label>
                  <textarea id="contact-message" name="message" required rows={5} placeholder="Tell me about your project..." className="bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white placeholder-gray-600 outline-none focus:border-cyan-500/50 transition-colors resize-none" />
                </div>
                <button type="submit" disabled={formState === "sending"} className="group flex items-center justify-center gap-3 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-500/30 text-white font-bold py-4 rounded-xl hover:from-cyan-500/30 hover:to-purple-500/30 transition-all disabled:opacity-50 text-sm tracking-wider">
                  {formState === "idle" && <><Send size={16} className="group-hover:translate-x-1 transition-transform" /> Send Message</>}
                  {formState === "sending" && "Sending..."}
                  {formState === "sent" && "✓ Message Sent!"}
                  {formState === "error" && "✕ Failed. Try Again."}
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}

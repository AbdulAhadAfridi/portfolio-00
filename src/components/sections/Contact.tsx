"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import { Mail, MapPin, Send, Phone } from "lucide-react";
import { FaWhatsapp, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";

interface ContactProps {
  settings?: {
    email?: string;
    phone?: string;
    location?: string;
    whatsappUrl?: string;
    instagramUrl?: string;
    linkedinUrl?: string;
    twitterUrl?: string;
  };
}

export default function Contact({ settings }: ContactProps) {
  const [formState, setFormState] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const email = settings?.email || "abdulahadafridi@gmail.com";
  const phone = settings?.phone || "+92 312-8760904";
  const whatsappUrl = settings?.whatsappUrl || "https://wa.me/923128760904";
  const instagramUrl = settings?.instagramUrl || "https://instagram.com/a.ahad_afridi";
  const linkedinUrl = settings?.linkedinUrl || "https://linkedin.com/in/abdul-ahad-afridb74D303/";
  const twitterUrl = settings?.twitterUrl || "https://twitter.com/AAhadAfridi";

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
    <section
      id="contact"
      className="py-16 sm:py-20 lg:py-28 px-4 sm:px-8 lg:px-16 xl:px-24 relative z-10"
    >
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-start justify-between gap-10 sm:gap-12 lg:gap-16">
        {/* Left side - Info */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex-1 w-full text-center lg:text-left"
        >
          <span className="text-cyan-400 font-mono mb-3 sm:mb-4 tracking-widest text-xs sm:text-sm block">
            GET IN TOUCH
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 sm:mb-8 text-white leading-tight">
            Let&apos;s work<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
              together.
            </span>
          </h2>

          <div className="flex flex-col gap-4 sm:gap-6 mt-8 sm:mt-12">
            <div className="flex items-center gap-4 text-gray-400 justify-center lg:justify-start">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0">
                <Mail size={18} className="text-cyan-400 sm:w-5 sm:h-5" />
              </div>
              <div className="text-left">
                <p className="text-white font-medium text-sm sm:text-base">Email</p>
                <p className="text-xs sm:text-sm">{email}</p>
              </div>
            </div>

            <div className="flex items-center gap-4 text-gray-400 justify-center lg:justify-start">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0">
                <Phone size={18} className="text-cyan-400 sm:w-5 sm:h-5" />
              </div>
              <div className="text-left">
                <p className="text-white font-medium text-sm sm:text-base">Phone / WhatsApp</p>
                <p className="text-xs sm:text-sm">{phone}</p>
              </div>
            </div>

            <div className="flex items-center gap-4 text-gray-400 justify-center lg:justify-start">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0">
                <MapPin size={18} className="text-cyan-400 sm:w-5 sm:h-5" />
              </div>
              <div className="text-left">
                <p className="text-white font-medium text-sm sm:text-base">Location</p>
                <p className="text-xs sm:text-sm">Available Worldwide</p>
              </div>
            </div>
          </div>

          {/* Social links */}
          <div className="flex items-center gap-4 mt-8 justify-center lg:justify-start">
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-xl bg-green-500/10 border border-green-500/20 flex items-center justify-center text-green-400 hover:bg-green-500/20 transition-colors">
              <FaWhatsapp size={18} />
            </a>
            <a href={instagramUrl} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-xl bg-pink-500/10 border border-pink-500/20 flex items-center justify-center text-pink-400 hover:bg-pink-500/20 transition-colors">
              <FaInstagram size={18} />
            </a>
            <a href={linkedinUrl} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 hover:bg-blue-500/20 transition-colors">
              <FaLinkedin size={18} />
            </a>
            <a href={twitterUrl} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400 hover:bg-sky-500/20 transition-colors">
              <FaTwitter size={18} />
            </a>
          </div>
        </motion.div>

        {/* Right side - Form */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex-1 w-full"
        >
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 sm:gap-6">
            <div className="flex flex-col gap-1.5 sm:gap-2">
              <label htmlFor="name" className="text-[10px] sm:text-sm text-gray-400 font-mono tracking-wider">NAME</label>
              <input id="name" name="name" type="text" required placeholder="Your name" className="bg-white/5 border border-white/10 rounded-xl px-4 sm:px-5 py-3 sm:py-4 text-white placeholder-gray-600 outline-none focus:border-cyan-500/50 transition-colors text-sm sm:text-base" />
            </div>

            <div className="flex flex-col gap-1.5 sm:gap-2">
              <label htmlFor="email" className="text-[10px] sm:text-sm text-gray-400 font-mono tracking-wider">EMAIL</label>
              <input id="email" name="email" type="email" required placeholder="your@email.com" className="bg-white/5 border border-white/10 rounded-xl px-4 sm:px-5 py-3 sm:py-4 text-white placeholder-gray-600 outline-none focus:border-cyan-500/50 transition-colors text-sm sm:text-base" />
            </div>

            <div className="flex flex-col gap-1.5 sm:gap-2">
              <label htmlFor="message" className="text-[10px] sm:text-sm text-gray-400 font-mono tracking-wider">MESSAGE</label>
              <textarea id="message" name="message" required rows={4} placeholder="Tell me about your project..." className="bg-white/5 border border-white/10 rounded-xl px-4 sm:px-5 py-3 sm:py-4 text-white placeholder-gray-600 outline-none focus:border-cyan-500/50 transition-colors resize-none text-sm sm:text-base" />
            </div>

            <button
              type="submit"
              disabled={formState === "sending"}
              className="group flex items-center justify-center gap-2 sm:gap-3 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-500/30 text-white font-bold py-3 sm:py-4 rounded-xl hover:from-cyan-500/30 hover:to-purple-500/30 transition-all disabled:opacity-50 text-xs sm:text-sm tracking-wider"
            >
              {formState === "idle" && (
                <>
                  <Send size={16} className="group-hover:translate-x-1 transition-transform" />
                  Send Message
                </>
              )}
              {formState === "sending" && "Sending..."}
              {formState === "sent" && "✓ Message Sent!"}
              {formState === "error" && "✕ Failed. Try Again."}
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}

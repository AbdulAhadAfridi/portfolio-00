"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { FaGithub, FaLinkedin, FaTwitter, FaInstagram, FaWhatsapp } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";

const NAV_LINKS = [
  { label: "HOME", href: "/" },
  { label: "ABOUT", href: "/about" },
  { label: "PROJECTS", href: "/projects" },
  { label: "SERVICES", href: "/services" },
  { label: "RESUME", href: "/resume" },
  { label: "CONTACT", href: "/contact" },
];

const SOCIAL_LINKS = [
  { icon: FaGithub, href: "https://github.com/AAhadAfridi", label: "GitHub" },
  { icon: FaLinkedin, href: "https://linkedin.com/in/abdul-ahad-afridb74D303/", label: "LinkedIn" },
  { icon: FaTwitter, href: "https://twitter.com/AAhadAfridi", label: "Twitter" },
  { icon: FaInstagram, href: "https://instagram.com/a.ahad_afridi", label: "Instagram" },
  { icon: FaWhatsapp, href: "https://wa.me/923128760904", label: "WhatsApp" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
      document.body.style.overflowX = "hidden";
    }
  }, [isOpen]);

  const closeMenu = () => setIsOpen(false);

  return (
    <>
      {/* Top Bar */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-[#0a0a0a]/80 backdrop-blur-xl border-b border-white/5 py-3 px-4 sm:px-6 lg:px-12"
            : "bg-transparent py-4 px-4 sm:px-6 lg:px-12"
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <Link href="/#home" className="flex items-center gap-2 sm:gap-3 z-50 group">
            <div className="relative w-8 h-8 sm:w-10 sm:h-10 rounded-lg overflow-hidden border border-cyan-500/30 group-hover:border-cyan-400/60 transition-colors shadow-[0_0_15px_rgba(0,229,255,0.1)]">
              <Image
                src="/images/logo.png"
                alt="AA Logo"
                fill
                className="object-cover"
                priority
              />
            </div>
            <div className="hidden sm:flex flex-col leading-none">
              <span className="text-white font-bold text-sm tracking-wider">ABDUL AHAD</span>
              <span className="text-cyan-400 text-[10px] font-mono tracking-widest">DEVELOPER</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="px-4 py-2 text-xs tracking-widest font-bold text-gray-400 hover:text-white transition-colors rounded-lg hover:bg-white/5"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop Social Icons + Resume */}
          <div className="hidden lg:flex items-center gap-4">
            <div className="flex items-center gap-3 text-gray-500">
              {SOCIAL_LINKS.slice(0, 4).map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-cyan-400 transition-colors"
                  aria-label={s.label}
                >
                  <s.icon size={16} />
                </a>
              ))}
            </div>
            <div className="w-px h-5 bg-white/10" />
            <a
              href="/resume.pdf"
              className="text-xs font-bold tracking-widest text-cyan-400 hover:text-cyan-300 border border-cyan-500/30 px-4 py-2 rounded-lg hover:bg-cyan-500/5 transition-all"
            >
              RESUME
            </a>
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden z-50 relative w-10 h-10 flex items-center justify-center rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? (
              <X size={20} className="text-white" />
            ) : (
              <Menu size={20} className="text-white" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Fullscreen Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-[#0a0a0a]/95 backdrop-blur-2xl flex flex-col items-center justify-center lg:hidden"
          >
            {/* Navigation Links */}
            <nav className="flex flex-col items-center gap-2">
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ delay: i * 0.08 }}
                >
                  <Link
                    href={link.href}
                    onClick={closeMenu}
                    className="text-2xl sm:text-3xl font-black tracking-widest text-white hover:text-cyan-400 transition-colors py-3 block"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </nav>

            {/* Divider */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="w-48 h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent my-8"
            />

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex items-center gap-6"
            >
              {SOCIAL_LINKS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={closeMenu}
                  className="text-gray-500 hover:text-cyan-400 transition-colors"
                  aria-label={s.label}
                >
                  <s.icon size={22} />
                </a>
              ))}
            </motion.div>

            {/* Resume Button */}
            <motion.a
              href="/resume.pdf"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="mt-8 text-sm font-bold tracking-widest text-cyan-400 border border-cyan-500/30 px-6 py-3 rounded-xl hover:bg-cyan-500/10 transition-all"
            >
              DOWNLOAD RESUME
            </motion.a>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="mt-8 text-center"
            >
              <p className="text-gray-600 text-xs font-mono">abdulahadafridi@gmail.com</p>
              <p className="text-gray-600 text-xs font-mono mt-1">+92 312-8760904</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

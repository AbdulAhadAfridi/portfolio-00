import { FaGithub, FaLinkedin, FaTwitter, FaInstagram, FaWhatsapp } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/10 px-4 sm:px-8 lg:px-16 xl:px-24 py-8 sm:py-12">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 sm:gap-8">
        <div className="text-gray-500 text-xs sm:text-sm text-center sm:text-left">
          © {new Date().getFullYear()} Abdul Ahad Afridi. All rights reserved.
        </div>

        <div className="flex items-center gap-4 sm:gap-6">
          <a href="https://github.com/AAhadAfridi" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white transition-colors" aria-label="GitHub">
            <FaGithub size={16} className="sm:w-[18px] sm:h-[18px]" />
          </a>
          <a href="https://linkedin.com/in/abdul-ahad-afridb74D303/" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white transition-colors" aria-label="LinkedIn">
            <FaLinkedin size={16} className="sm:w-[18px] sm:h-[18px]" />
          </a>
          <a href="https://twitter.com/AAhadAfridi" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white transition-colors" aria-label="Twitter">
            <FaTwitter size={16} className="sm:w-[18px] sm:h-[18px]" />
          </a>
          <a href="https://instagram.com/a.ahad_afridi" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white transition-colors" aria-label="Instagram">
            <FaInstagram size={16} className="sm:w-[18px] sm:h-[18px]" />
          </a>
          <a href="https://wa.me/923128760904" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-green-400 transition-colors" aria-label="WhatsApp">
            <FaWhatsapp size={16} className="sm:w-[18px] sm:h-[18px]" />
          </a>
        </div>

        <a href="#home" className="text-gray-500 hover:text-cyan-400 transition-colors text-xs sm:text-sm">
          ↑ Back to top
        </a>
      </div>
    </footer>
  );
}

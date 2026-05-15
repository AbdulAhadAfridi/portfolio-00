import { FaGithub, FaLinkedin, FaTwitter, FaInstagram, FaWhatsapp } from "react-icons/fa";

interface FooterProps {
  settings?: {
    githubUrl?: string;
    linkedinUrl?: string;
    twitterUrl?: string;
    instagramUrl?: string;
    whatsappUrl?: string;
  };
}

export default function Footer({ settings }: FooterProps) {
  const githubUrl = settings?.githubUrl || "https://github.com/AAhadAfridi";
  const linkedinUrl = settings?.linkedinUrl || "https://linkedin.com/in/abdul-ahad-afridb74D303/";
  const twitterUrl = settings?.twitterUrl || "https://twitter.com/AAhadAfridi";
  const instagramUrl = settings?.instagramUrl || "https://instagram.com/a.ahad_afridi";
  const whatsappUrl = settings?.whatsappUrl || "https://wa.me/923128760904";

  return (
    <footer className="relative z-10 border-t border-white/10 px-4 sm:px-8 lg:px-16 xl:px-24 py-8 sm:py-12">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 sm:gap-8">
        <div className="text-gray-500 text-xs sm:text-sm text-center sm:text-left">
          © {new Date().getFullYear()} Abdul Ahad Afridi. All rights reserved.
        </div>

        <div className="flex items-center gap-4 sm:gap-6">
          <a href={githubUrl} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white transition-colors" aria-label="GitHub">
            <FaGithub size={16} className="sm:w-[18px] sm:h-[18px]" />
          </a>
          <a href={linkedinUrl} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white transition-colors" aria-label="LinkedIn">
            <FaLinkedin size={16} className="sm:w-[18px] sm:h-[18px]" />
          </a>
          <a href={twitterUrl} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white transition-colors" aria-label="Twitter">
            <FaTwitter size={16} className="sm:w-[18px] sm:h-[18px]" />
          </a>
          <a href={instagramUrl} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white transition-colors" aria-label="Instagram">
            <FaInstagram size={16} className="sm:w-[18px] sm:h-[18px]" />
          </a>
          <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-green-400 transition-colors" aria-label="WhatsApp">
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

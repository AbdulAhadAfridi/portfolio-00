import Link from "next/link";
import { Briefcase, LayoutDashboard, Settings, Code, MessageSquare, Award, Star, Bot } from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-[#0a0a0a] text-white">
      {/* Sidebar */}
      <aside className="w-64 border-r border-white/10 p-6 flex flex-col gap-8 bg-black/50 sticky top-0 h-screen overflow-y-auto">
        <div className="font-bold tracking-widest text-xl text-cyan-400">ADMIN</div>
        <nav className="flex flex-col gap-3">
          <Link href="/admin" className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors text-sm">
            <LayoutDashboard size={18} />
            Dashboard
          </Link>
          <Link href="/admin?tab=projects" className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors text-sm">
            <Code size={18} />
            Projects
          </Link>
          <Link href="/admin?tab=services" className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors text-sm">
            <Settings size={18} />
            Services
          </Link>
          <Link href="/admin?tab=work" className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors text-sm">
            <Briefcase size={18} />
            Work Experience
          </Link>
          <Link href="/admin?tab=testimonials" className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors text-sm">
            <Star size={18} />
            Testimonials
          </Link>
          <Link href="/admin?tab=certificates" className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors text-sm">
            <Award size={18} />
            Certificates
          </Link>
          <Link href="/admin?tab=chatbot" className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors text-sm">
            <Bot size={18} />
            Chatbot Q&A
          </Link>
          <Link href="/admin?tab=settings" className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors text-sm">
            <MessageSquare size={18} />
            Site Settings
          </Link>

          <div className="border-t border-white/10 my-4" />

          <Link href="/" className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors text-sm">
            ← Back to Site
          </Link>
        </nav>
      </aside>
      
      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-8 sm:p-12">
        {children}
      </main>
    </div>
  );
}

"use client";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  Briefcase,
  LayoutDashboard,
  Settings,
  Code,
  MessageSquare,
  Award,
  Star,
  Bot,
  Users,
  Mail,
} from "lucide-react";

const NAV_ITEMS = [
  { tab: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { tab: "projects", label: "Projects", icon: Code },
  { tab: "services", label: "Services", icon: Settings },
  { tab: "work", label: "Work Experience", icon: Briefcase },
  { tab: "testimonials", label: "Testimonials", icon: Star },
  { tab: "reviews", label: "Visitor Reviews", icon: Users },
  { tab: "certificates", label: "Certificates", icon: Award },
  { tab: "chatbot", label: "Chatbot Q&A", icon: Bot },
  { tab: "messages", label: "Messages", icon: Mail },
  { tab: "settings", label: "Site Settings", icon: MessageSquare },
];

export default function AdminSidebar({ email }: { email: string }) {
  const searchParams = useSearchParams();
  const currentTab = searchParams.get("tab") || "dashboard";

  return (
    <nav className="flex flex-col gap-1 flex-1">
      {NAV_ITEMS.map((item) => {
        const isActive = currentTab === item.tab;
        return (
          <Link
            key={item.tab}
            href={`/admin?tab=${item.tab}`}
            className={`flex items-center gap-3 transition-all text-sm px-3 py-2.5 rounded-lg ${
              isActive
                ? "bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 font-semibold shadow-[0_0_15px_rgba(0,229,255,0.05)]"
                : "text-gray-400 hover:text-white hover:bg-white/5 border border-transparent"
            }`}
          >
            <item.icon size={18} className={isActive ? "text-cyan-400" : ""} />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}

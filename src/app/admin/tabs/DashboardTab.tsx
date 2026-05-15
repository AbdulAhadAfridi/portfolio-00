"use client";
import { Code, Settings, Briefcase, Star, Users, Award, Bot, Mail, MessageSquare, TrendingUp, Eye } from "lucide-react";
import Link from "next/link";

interface DashboardTabProps {
  projects: any[];
  services: any[];
  works: any[];
  testimonials: any[];
  certificates: any[];
  chatbotQAs: any[];
  reviews: any[];
  messages: any[];
  pendingReviews: any[];
  unreadMessages: any[];
}

export default function DashboardTab({
  projects, services, works, testimonials, certificates, chatbotQAs,
  reviews, messages, pendingReviews, unreadMessages,
}: DashboardTabProps) {
  const stats = [
    { label: "Projects", value: projects.length, icon: Code, color: "#00e5ff", tab: "projects" },
    { label: "Services", value: services.length, icon: Settings, color: "#a855f7", tab: "services" },
    { label: "Work Exp.", value: works.length, icon: Briefcase, color: "#22c55e", tab: "work" },
    { label: "Testimonials", value: testimonials.length, icon: Star, color: "#f59e0b", tab: "testimonials" },
    { label: "Certificates", value: certificates.length, icon: Award, color: "#06b6d4", tab: "certificates" },
    { label: "Reviews", value: reviews.length, icon: Users, color: "#ec4899", tab: "reviews" },
    { label: "Messages", value: messages.length, icon: Mail, color: "#8b5cf6", tab: "messages" },
    { label: "Chatbot Q&A", value: chatbotQAs.length, icon: Bot, color: "#14b8a6", tab: "chatbot" },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-black text-white mb-2">Dashboard</h1>
        <p className="text-gray-500 text-sm">Overview of your portfolio content</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {stats.map((stat) => (
          <Link
            key={stat.label}
            href={`/admin?tab=${stat.tab}`}
            className="group bg-white/[0.03] border border-white/[0.06] rounded-2xl p-5 hover:border-white/20 transition-all duration-300"
          >
            <div className="flex items-center justify-between mb-3">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ backgroundColor: `${stat.color}15`, border: `1px solid ${stat.color}30` }}
              >
                <stat.icon size={18} style={{ color: stat.color }} />
              </div>
              <TrendingUp size={14} className="text-gray-700 group-hover:text-gray-500 transition-colors" />
            </div>
            <p className="text-2xl font-black text-white">{stat.value}</p>
            <p className="text-gray-500 text-xs font-mono tracking-wider mt-1">{stat.label}</p>
          </Link>
        ))}
      </div>

      {/* Alert Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {pendingReviews.length > 0 && (
          <Link
            href="/admin?tab=reviews"
            className="bg-yellow-500/5 border border-yellow-500/20 rounded-2xl p-5 hover:bg-yellow-500/10 transition-all"
          >
            <div className="flex items-center gap-3 mb-2">
              <Eye size={18} className="text-yellow-400" />
              <span className="text-yellow-400 font-bold text-sm">{pendingReviews.length} Pending Reviews</span>
            </div>
            <p className="text-gray-500 text-xs">Click to review and approve/reject visitor experiences</p>
          </Link>
        )}
        {unreadMessages.length > 0 && (
          <Link
            href="/admin?tab=messages"
            className="bg-purple-500/5 border border-purple-500/20 rounded-2xl p-5 hover:bg-purple-500/10 transition-all"
          >
            <div className="flex items-center gap-3 mb-2">
              <Mail size={18} className="text-purple-400" />
              <span className="text-purple-400 font-bold text-sm">{unreadMessages.length} Unread Messages</span>
            </div>
            <p className="text-gray-500 text-xs">Click to read new contact form submissions</p>
          </Link>
        )}
      </div>

      {/* Recent Activity */}
      <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-6">
        <h3 className="text-white font-bold mb-4">Recent Activity</h3>
        <div className="space-y-3">
          {[...messages.slice(0, 3).map((m: any) => ({
            type: "message",
            text: `New message from ${m.name}`,
            time: new Date(m.createdAt).toLocaleDateString(),
            color: "#8b5cf6",
          })),
          ...reviews.filter((r: any) => r.status === "pending").slice(0, 3).map((r: any) => ({
            type: "review",
            text: `Review from ${r.name} (pending)`,
            time: new Date(r.createdAt).toLocaleDateString(),
            color: "#f59e0b",
          }))].sort(() => -1).slice(0, 5).map((item, i) => (
            <div key={i} className="flex items-center gap-3 text-sm">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
              <span className="text-gray-400 flex-1">{item.text}</span>
              <span className="text-gray-600 text-xs font-mono">{item.time}</span>
            </div>
          ))}
          {messages.length === 0 && reviews.filter((r: any) => r.status === "pending").length === 0 && (
            <p className="text-gray-600 text-sm">No recent activity</p>
          )}
        </div>
      </div>
    </div>
  );
}

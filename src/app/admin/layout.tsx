import Link from "next/link";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { LogOut } from "lucide-react";
import AdminSidebar from "./AdminSidebar";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Check authentication (middleware handles redirects, this is for session data)
  let session = null;
  try {
    session = await auth.api.getSession({
      headers: await headers(),
    });
  } catch {
    // Session check failed
  }

  // If no session (login page or middleware let it through), render children only
  if (!session) {
    return <>{children}</>;
  }

  return (
    <div className="flex min-h-screen bg-[#0a0a0a] text-white">
      {/* Sidebar */}
      <aside className="w-64 border-r border-white/10 p-6 flex flex-col gap-8 bg-black/50 sticky top-0 h-screen overflow-y-auto">
        <div>
          <div className="font-bold tracking-widest text-xl text-cyan-400">
            ADMIN
          </div>
          <p className="text-gray-600 text-[10px] font-mono mt-1 truncate">
            {session.user.email}
          </p>
        </div>

        {/* Client component for active tab highlighting */}
        <AdminSidebar email={session.user.email} />

        <div className="flex flex-col gap-1">
          <div className="border-t border-white/10 mb-3" />

          <Link
            href="/"
            className="flex items-center gap-3 text-gray-400 hover:text-white hover:bg-white/5 transition-all text-sm px-3 py-2 rounded-lg"
          >
            ← Back to Site
          </Link>

          <form
            action={async () => {
              "use server";
              const { headers: h } = await import("next/headers");
              const { auth: a } = await import("@/lib/auth");
              const reqHeaders = await h();
              const sess = await a.api.getSession({ headers: reqHeaders });
              if (sess) {
                await a.api.signOut({ headers: reqHeaders });
              }
              const { redirect: r } = await import("next/navigation");
              r("/admin/login");
            }}
          >
            <button
              type="submit"
              className="flex items-center gap-3 text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all text-sm px-3 py-2 rounded-lg w-full"
            >
              <LogOut size={18} />
              Sign Out
            </button>
          </form>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-8 sm:p-12">{children}</main>
    </div>
  );
}

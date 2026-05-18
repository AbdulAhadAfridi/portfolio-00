import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Only protect /admin routes (except /admin/login)
  if (pathname.startsWith("/admin") && !pathname.startsWith("/admin/login")) {
    // Check for Better Auth session cookie (including secure cookie for prod)
    const hasSession = request.cookies.has("better-auth.session_token") || 
                       request.cookies.has("__Secure-better-auth.session_token");

    if (!hasSession) {
      const loginUrl = new URL("/admin/login", request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  // If authenticated user visits login page, redirect to dashboard
  if (pathname.startsWith("/admin/login")) {
    const hasSession = request.cookies.has("better-auth.session_token") || 
                       request.cookies.has("__Secure-better-auth.session_token");

    if (hasSession) {
      const adminUrl = new URL("/admin", request.url);
      return NextResponse.redirect(adminUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};

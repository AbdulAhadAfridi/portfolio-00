import { createAuthClient } from "better-auth/react";

// Auto-detect base URL from the browser origin so it works on
// localhost, Vercel preview deployments, and custom domains
// without requiring a NEXT_PUBLIC env var.
const getBaseURL = () => {
  if (typeof window !== "undefined") {
    return window.location.origin;
  }
  return process.env.NEXT_PUBLIC_BETTER_AUTH_URL || process.env.BETTER_AUTH_URL || "http://localhost:3000";
};

export const authClient = createAuthClient({
  baseURL: getBaseURL(),
});

export const { signIn, signOut, useSession } = authClient;

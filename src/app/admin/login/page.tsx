"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { signIn, authClient } from "@/lib/auth-client";
import { Lock, Mail, Eye, EyeOff, ArrowRight, UserPlus } from "lucide-react";
import { motion } from "framer-motion";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [checkingUsers, setCheckingUsers] = useState(true);
  const [hasUsers, setHasUsers] = useState(true);
  const router = useRouter();

  // Check if any admin user exists
  useEffect(() => {
    async function check() {
      try {
        const res = await fetch("/api/auth/check-admin");
        const data = await res.json();
        setHasUsers(data.hasAdmin);
        if (!data.hasAdmin) setIsSignUp(true);
      } catch {
        setHasUsers(true);
      }
      setCheckingUsers(false);
    }
    check();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (isSignUp) {
        // Double-check server-side that no admin exists yet
        const checkRes = await fetch("/api/auth/check-admin", { method: "POST" });
        if (!checkRes.ok) {
          const checkData = await checkRes.json();
          setError(checkData.error || "Registration is disabled.");
          setLoading(false);
          return;
        }

        // Sign up new admin
        const result = await authClient.signUp.email({
          email,
          password,
          name: name || "Admin",
        });

        if (result.error) {
          setError(result.error.message || "Registration failed");
          setLoading(false);
          return;
        }

        router.push("/admin");
        router.refresh();
      } else {
        // Sign in
        const result = await signIn.email({ email, password });

        if (result.error) {
          setError(result.error.message || "Invalid credentials");
          setLoading(false);
          return;
        }

        router.push("/admin");
        router.refresh();
      }
    } catch {
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  if (checkingUsers) {
    return (
      <div className="w-full max-w-md px-4 text-center">
        <div className="w-8 h-8 border-2 border-cyan-400/30 border-t-cyan-400 rounded-full animate-spin mx-auto" />
      </div>
    );
  }

  return (
    <div className="w-full max-w-md px-4">
      {/* Background effects */}
      <div className="fixed top-1/4 left-1/4 w-[400px] h-[400px] bg-cyan-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="fixed bottom-1/4 right-1/4 w-[400px] h-[400px] bg-purple-500/5 rounded-full blur-[120px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-purple-500/20 border border-cyan-500/30 flex items-center justify-center"
          >
            {isSignUp ? <UserPlus size={28} className="text-cyan-400" /> : <Lock size={28} className="text-cyan-400" />}
          </motion.div>
          <h1 className="text-3xl font-black text-white mb-2">
            {isSignUp ? "Create Admin Account" : "Admin Login"}
          </h1>
          <p className="text-gray-500 text-sm">
            {isSignUp
              ? "Set up your admin account to manage the portfolio"
              : "Sign in to manage your portfolio"}
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-8 backdrop-blur-xl shadow-2xl shadow-black/50">
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            {/* Name (Sign Up only) */}
            {isSignUp && (
              <div className="flex flex-col gap-2">
                <label className="text-xs text-gray-400 font-mono tracking-wider">
                  NAME
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Admin Name"
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-gray-600 outline-none focus:border-cyan-500/50 transition-colors text-sm"
                />
              </div>
            )}

            {/* Email */}
            <div className="flex flex-col gap-2">
              <label className="text-xs text-gray-400 font-mono tracking-wider">
                EMAIL
              </label>
              <div className="relative">
                <Mail
                  size={16}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600"
                />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@example.com"
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-xl pl-11 pr-4 py-3.5 text-white placeholder-gray-600 outline-none focus:border-cyan-500/50 transition-colors text-sm"
                />
              </div>
            </div>

            {/* Password */}
            <div className="flex flex-col gap-2">
              <label className="text-xs text-gray-400 font-mono tracking-wider">
                PASSWORD
              </label>
              <div className="relative">
                <Lock
                  size={16}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600"
                />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  minLength={6}
                  className="w-full bg-white/5 border border-white/10 rounded-xl pl-11 pr-12 py-3.5 text-white placeholder-gray-600 outline-none focus:border-cyan-500/50 transition-colors text-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gray-400 transition-colors"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Error */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm px-4 py-3 rounded-xl"
              >
                {error}
              </motion.div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="group flex items-center justify-center gap-3 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-500/30 text-white font-bold py-4 rounded-xl hover:from-cyan-500/30 hover:to-purple-500/30 transition-all disabled:opacity-50 text-sm tracking-wider mt-2"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-cyan-400/30 border-t-cyan-400 rounded-full animate-spin" />
              ) : (
                <>
                  {isSignUp ? "Create Account" : "Sign In"}
                  <ArrowRight
                    size={16}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </>
              )}
            </button>
          </form>
        </div>

        {/* Footer */}
        <p className="text-center text-gray-600 text-xs mt-6">
          {isSignUp
            ? "This is a one-time setup. Only one admin account is allowed."
            : "Only authorized administrators can access this panel."}
        </p>
      </motion.div>
    </div>
  );
}

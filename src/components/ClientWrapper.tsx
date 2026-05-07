"use client";
import { useEffect } from "react";

export default function ClientWrapper({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    document.body.style.overflow = "auto";
    document.body.style.overflowX = "hidden";
  }, []);

  return (
    <div className="opacity-100 pointer-events-auto">
      {children}
    </div>
  );
}

"use client";

import TeamShowcase from "@/components/ui/team-showcase";
import ThemeToggle from "@/components/ThemeToggle";

export default function TeamPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 relative" style={{ background: "var(--color-bg)", color: "var(--color-text)", transition: "background-color 0.4s ease" }}>
      {/* Top right theme toggle */}
      <div style={{ position: "absolute", top: "24px", right: "24px" }}>
        <ThemeToggle />
      </div>

      <div className="w-full max-w-5xl text-center mb-12">
        <h1 
          className="font-display font-bold uppercase tracking-tight" 
          style={{ 
            fontSize: "clamp(2rem, 5vw, 3rem)", 
            color: "var(--color-text)",
            marginBottom: "12px",
            letterSpacing: "-1px"
          }}
        >
          Our Creative Team
        </h1>
        <p className="font-body" style={{ color: "var(--color-text-secondary)", fontSize: "1.1rem", maxWidth: "600px", margin: "0 auto" }}>
          Meet the minds shaping digital experiences and cinematic art.
        </p>
      </div>

      <TeamShowcase />
    </div>
  );
}

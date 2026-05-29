"use client";

import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

export const InteractiveAurora = ({ className }: { className?: string }) => {
  const [mounted, setMounted] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  // Mouse position tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for the glowing orb
  const springConfig = { damping: 25, stiffness: 150, mass: 0.5 };
  const orbX = useSpring(mouseX, springConfig);
  const orbY = useSpring(mouseY, springConfig);

  useEffect(() => {
    setMounted(true);
    // Center the orb initially
    mouseX.set(typeof window !== "undefined" ? window.innerWidth / 3 : 500);
    mouseY.set(typeof window !== "undefined" ? window.innerHeight / 3 : 500);
    
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isHovering) setIsHovering(true);
    };

    const handleMouseLeave = () => {
      setIsHovering(false);
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.body.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.body.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [mouseX, mouseY, isHovering]);

  if (!mounted) return null;

  return (
    <div className={cn("fixed inset-0 w-full h-full overflow-hidden pointer-events-none z-0 hidden dark:block", className)}>
      {/* 1. Base Aurora Gradients (Animated via CSS) */}
      <div className="absolute inset-0 opacity-40 dark:opacity-60 mix-blend-screen dark:mix-blend-color-dodge">
        <div className="absolute top-[-20%] left-[-10%] w-[70vw] h-[70vw] rounded-full bg-[radial-gradient(circle_at_center,var(--color-accent-skin)_0%,transparent_60%)] blur-[100px] opacity-60 animate-blob" />
        <div className="absolute top-[20%] right-[-20%] w-[60vw] h-[60vw] rounded-full bg-[radial-gradient(circle_at_center,#6366f1_0%,transparent_60%)] blur-[120px] opacity-40 animate-blob animation-delay-2000" />
        <div className="absolute bottom-[-20%] left-[20%] w-[80vw] h-[80vw] rounded-full bg-[radial-gradient(circle_at_center,#a855f7_0%,transparent_60%)] blur-[120px] opacity-30 animate-blob animation-delay-4000" />
      </div>

      {/* 2. Interactive Glowing Orb that follows the mouse */}
      <motion.div
        className="absolute top-0 left-0 w-[250px] h-[250px] rounded-full bg-[radial-gradient(circle_at_center,var(--color-accent-skin)_0%,transparent_70%)] blur-[80px] z-10 mix-blend-screen dark:mix-blend-color-dodge transition-opacity duration-700"
        style={{
          x: orbX,
          y: orbY,
          translateX: "-50%",
          translateY: "-50%",
          opacity: isHovering ? 0.8 : 0,
        }}
      />

      {/* 3. Floating Particles (Subtle geometric tech aesthetic) */}
      <div className="absolute inset-0 z-20">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white/20 dark:bg-white/40 shadow-[0_0_8px_rgba(255,255,255,0.3)] animate-float-particle"
            style={{
              width: Math.random() * 4 + 2 + "px",
              height: Math.random() * 4 + 2 + "px",
              left: Math.random() * 100 + "%",
              top: Math.random() * 100 + "%",
              animationDuration: Math.random() * 10 + 15 + "s",
              animationDelay: "-" + Math.random() * 10 + "s",
            }}
          />
        ))}
      </div>

      {/* 4. Film Grain Overlay */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.75\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\' opacity=\'0.03\'/%3E%3C/svg%3E')] pointer-events-none opacity-100 z-30 mix-blend-overlay" />

      {/* CSS Animations */}
      <style>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 15s infinite alternate ease-in-out;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        
        @keyframes float-particle {
          0% { transform: translateY(0) translateX(0) scale(1); opacity: 0; }
          20% { opacity: 1; }
          80% { opacity: 1; }
          100% { transform: translateY(-100vh) translateX(50px) scale(0.5); opacity: 0; }
        }
        .animate-float-particle {
          animation: float-particle linear infinite;
        }
      `}</style>
    </div>
  );
};

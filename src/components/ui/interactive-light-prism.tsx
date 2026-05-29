"use client";

import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

export const InteractiveLightPrism = ({ className }: { className?: string }) => {
  const [mounted, setMounted] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  // Mouse position tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for the glowing prismatic orb
  const springConfig = { damping: 25, stiffness: 120, mass: 0.8 };
  const orbX = useSpring(mouseX, springConfig);
  const orbY = useSpring(mouseY, springConfig);

  useEffect(() => {
    setMounted(true);
    // Center initially
    mouseX.set(typeof window !== "undefined" ? window.innerWidth / 2 : 500);
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
    <div className={cn("fixed inset-0 w-full h-full overflow-hidden pointer-events-none z-0 dark:hidden bg-[#E8EAED]", className)}>
      
      {/* 1. Base Pastel Liquid Blobs (Animated via CSS) */}
      <div className="absolute inset-0 opacity-70 mix-blend-multiply">
        {/* Soft Gold/Peach */}
        <div className="absolute top-[-10%] left-[10%] w-[60vw] h-[60vw] rounded-full bg-[radial-gradient(circle_at_center,#FCE3BA_0%,transparent_70%)] blur-[90px] opacity-80 animate-blob-light" />
        {/* Sky Blue */}
        <div className="absolute top-[20%] right-[-10%] w-[55vw] h-[55vw] rounded-full bg-[radial-gradient(circle_at_center,#BBE1FA_0%,transparent_70%)] blur-[100px] opacity-70 animate-blob-light animation-delay-3000" />
        {/* Soft Lavender/Pink */}
        <div className="absolute bottom-[-15%] left-[30%] w-[70vw] h-[70vw] rounded-full bg-[radial-gradient(circle_at_center,#E2C4FF_0%,transparent_70%)] blur-[110px] opacity-60 animate-blob-light animation-delay-6000" />
      </div>

      {/* 2. Interactive Prismatic Orb that follows the mouse */}
      <motion.div
        className="absolute top-0 left-0 w-[500px] h-[500px] rounded-full z-10 transition-opacity duration-700 mix-blend-overlay"
        style={{
          x: orbX,
          y: orbY,
          translateX: "-50%",
          translateY: "-50%",
          opacity: isHovering ? 1 : 0,
          background: "radial-gradient(circle at center, rgba(255, 255, 255, 0.8) 0%, rgba(200, 230, 255, 0.4) 30%, rgba(255, 220, 180, 0.2) 60%, transparent 80%)",
          filter: "blur(60px)",
        }}
      />

      {/* 3. Subtle Topographic / Dotted Grid that highlights near mouse */}
      <div 
        className="absolute inset-0 z-[5] opacity-30"
        style={{
          backgroundImage: "radial-gradient(circle at 2px 2px, rgba(0,0,0,0.15) 1px, transparent 0)",
          backgroundSize: "32px 32px"
        }}
      />
      

      
      {/* 4. Film Grain Overlay for Tactile Premium Feel */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.85\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\' opacity=\'0.04\'/%3E%3C/svg%3E')] pointer-events-none z-20 mix-blend-overlay" />

      {/* Synchronize mask position with mouse */}
      <InteractiveGridMask mouseX={mouseX} mouseY={mouseY} isHovering={isHovering} />

      {/* CSS Animations */}
      <style>{`
        @keyframes blob-light {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(40px, -40px) scale(1.05); }
          66% { transform: translate(-30px, 30px) scale(0.95); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob-light {
          animation: blob-light 20s infinite alternate ease-in-out;
        }
        .animation-delay-3000 {
          animation-delay: 3s;
        }
        .animation-delay-6000 {
          animation-delay: 6s;
        }
      `}</style>
    </div>
  );
};

// Helper component to update the grid mask efficiently without re-rendering the whole component
function InteractiveGridMask({ mouseX, mouseY, isHovering }: { mouseX: any, mouseY: any, isHovering: boolean }) {
  useEffect(() => {
    const updateMask = () => {
      const maskEl = document.getElementById('grid-mask');
      if (maskEl) {
        maskEl.style.webkitMaskImage = `radial-gradient(${isHovering ? '300px' : '0px'} circle at ${mouseX.get()}px ${mouseY.get()}px, black 0%, transparent 100%)`;
        maskEl.style.maskImage = `radial-gradient(${isHovering ? '300px' : '0px'} circle at ${mouseX.get()}px ${mouseY.get()}px, black 0%, transparent 100%)`;
      }
    };
    
    const unsubscribeX = mouseX.onChange(updateMask);
    const unsubscribeY = mouseY.onChange(updateMask);
    
    return () => {
      unsubscribeX();
      unsubscribeY();
    };
  }, [mouseX, mouseY, isHovering]);

  return (
    <div
      id="grid-mask"
      className="absolute inset-0 z-[6] pointer-events-none transition-opacity duration-500"
      style={{
        opacity: isHovering ? 1 : 0,
        backgroundImage: "radial-gradient(circle at 2px 2px, rgba(0,0,0,0.5) 1.5px, transparent 0)",
        backgroundSize: "32px 32px",
        WebkitMaskImage: "radial-gradient(0px circle at 0px 0px, black 0%, transparent 100%)",
        maskImage: "radial-gradient(0px circle at 0px 0px, black 0%, transparent 100%)",
      }}
    />
  );
}

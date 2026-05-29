"use client";

import React from "react";
import { cn } from "@/lib/utils";

export const MinimalBackground = ({ className }: { className?: string }) => {
  return (
    <div className={cn("absolute inset-0 w-full h-full z-0 pointer-events-none dark:hidden overflow-hidden bg-[#D2D4D6]", className)}>
      <style>{`
        /* Slow Breathing Spotlight (Light Mode) */
        .silk-spotlight-light {
          position: absolute;
          top: -15%;
          left: 15%;
          width: 80vw;
          height: 80vw;
          background: radial-gradient(circle at center, rgba(196, 139, 113, 0.06) 0%, rgba(59, 130, 246, 0.02) 40%, transparent 70%);
          filter: blur(85px);
          animation: breathingLight 15s ease-in-out infinite alternate;
          z-index: 1;
        }

        /* Slowly Undulating Liquid Silk Waves (Light Mode) */
        .silk-wave-container-light {
          position: absolute;
          bottom: -5%;
          left: -10%;
          width: 120%;
          height: 60%;
          z-index: 2;
          opacity: 0.42;
          filter: blur(1px);
          will-change: transform;
        }

        .silk-wave-light {
          position: absolute;
          width: 100%;
          height: 100%;
          transform-origin: center bottom;
        }

        .silk-wave-1-light {
          fill: url(#silk-grad-1-light);
          animation: waveAnimation1 22s ease-in-out infinite alternate;
        }

        .silk-wave-2-light {
          fill: url(#silk-grad-2-light);
          animation: waveAnimation2 28s ease-in-out infinite alternate;
          opacity: 0.75;
        }

        .silk-wave-3-light {
          fill: url(#silk-grad-3-light);
          animation: waveAnimation3 34s ease-in-out infinite alternate;
          opacity: 0.5;
        }

        /* Floating Copper Stardust (Embers) */
        .stardust-container-light {
          position: absolute;
          inset: 0;
          z-index: 3;
        }

        .dust-particle-light {
          position: absolute;
          border-radius: 50%;
          background: var(--color-accent-skin, #C48B71);
          box-shadow: 0 0 12px var(--color-accent-skin, #C48B71);
          will-change: transform, opacity;
        }

        .dust-1-light { width: 6px; height: 6px; left: 15%; top: 80%; opacity: 0.4; animation: riseDust1 24s linear infinite; }
        .dust-2-light { width: 8px; height: 8px; left: 45%; top: 90%; opacity: 0.6; animation: riseDust2 28s linear infinite; }
        .dust-3-light { width: 5px; height: 5px; left: 75%; top: 75%; opacity: 0.5; animation: riseDust3 22s linear infinite; }
        .dust-4-light { width: 7px; height: 7px; left: 30%; top: 60%; opacity: 0.3; animation: riseDust1 32s linear infinite; }
        .dust-5-light { width: 9px; height: 9px; left: 85%; top: 65%; opacity: 0.5; animation: riseDust2 26s linear infinite; }
        .dust-6-light { width: 6px; height: 6px; left: 60%; top: 85%; opacity: 0.4; animation: riseDust3 30s linear infinite; }

        /* Animations */
        @keyframes breathingLight {
          0% { transform: scale(1) translate(0, 0); }
          100% { transform: scale(1.15) translate(3%, 4%); }
        }

        @keyframes waveAnimation1 {
          0% { transform: translateY(0) scaleY(1) rotate(0deg); }
          100% { transform: translateY(4%) scaleY(1.1) rotate(2deg); }
        }

        @keyframes waveAnimation2 {
          0% { transform: translateY(0) scaleY(1) rotate(0deg); }
          100% { transform: translateY(-5%) scaleY(0.95) rotate(-3deg); }
        }

        @keyframes waveAnimation3 {
          0% { transform: translateY(0) scaleY(1) rotate(0deg); }
          100% { transform: translateY(3%) scaleY(1.05) rotate(1.5deg); }
        }

        @keyframes riseDust1 {
          0% { transform: translateY(0) translateX(0) scale(1); opacity: 0; }
          10% { opacity: 0.5; }
          90% { opacity: 0.5; }
          100% { transform: translateY(-60vh) translateX(50px) scale(0.6); opacity: 0; }
        }

        @keyframes riseDust2 {
          0% { transform: translateY(0) translateX(0) scale(0.8); opacity: 0; }
          15% { opacity: 0.7; }
          85% { opacity: 0.7; }
          100% { transform: translateY(-70vh) translateX(-60px) scale(1.2); opacity: 0; }
        }

        @keyframes riseDust3 {
          0% { transform: translateY(0) translateX(0) scale(1.1); opacity: 0; }
          12% { opacity: 0.6; }
          88% { opacity: 0.6; }
          100% { transform: translateY(-55vh) translateX(30px) scale(0.5); opacity: 0; }
        }
      `}</style>

      {/* Breathing Strobe Spotlight */}
      <div className="silk-spotlight-light pointer-events-none" />

      {/* Undulating Liquid Silk Waves */}
      <svg className="silk-wave-container-light" viewBox="0 0 1440 600" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="silk-grad-1-light" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(196, 139, 113, 0.08)" />
            <stop offset="50%" stopColor="rgba(59, 130, 246, 0.03)" />
            <stop offset="100%" stopColor="rgba(210, 212, 214, 0.95)" />
          </linearGradient>
          <linearGradient id="silk-grad-2-light" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="rgba(196, 181, 253, 0.06)" />
            <stop offset="50%" stopColor="rgba(196, 139, 113, 0.04)" />
            <stop offset="100%" stopColor="rgba(210, 212, 214, 0.95)" />
          </linearGradient>
          <linearGradient id="silk-grad-3-light" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(147, 197, 253, 0.05)" />
            <stop offset="100%" stopColor="rgba(210, 212, 214, 0.95)" />
          </linearGradient>
        </defs>
        
        {/* Soft flowing wave paths */}
        <path className="silk-wave-light silk-wave-1-light" d="M0,320 C320,400 480,240 800,320 C1120,400 1280,280 1440,320 L1440,600 L0,600 Z" />
        <path className="silk-wave-light silk-wave-2-light" d="M0,280 C300,180 600,380 900,280 C1200,180 1350,280 1440,300 L1440,600 L0,600 Z" />
        <path className="silk-wave-light silk-wave-3-light" d="M0,360 C240,280 480,440 720,360 C960,280 1200,360 1440,320 L1440,600 L0,600 Z" />
      </svg>

      {/* Floating Copper Stardust Embers */}
      <div className="stardust-container-light">
        <div className="dust-particle-light dust-1-light" />
        <div className="dust-particle-light dust-2-light" />
        <div className="dust-particle-light dust-3-light" />
        <div className="dust-particle-light dust-4-light" />
        <div className="dust-particle-light dust-5-light" />
        <div className="dust-particle-light dust-6-light" />
      </div>

      {/* Physical Film Grain for tactile elegance */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\' opacity=\'0.02\'/%3E%3C/svg%3E')] pointer-events-none opacity-85 z-[4]" />

      {/* Bottom overlay fade */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#D2D4D6] z-[4]" />
    </div>
  );
};

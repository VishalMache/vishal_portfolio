'use client';

import React from 'react';
import { cn } from "@/lib/utils";

interface SilkBackgroundProps extends React.HTMLAttributes<HTMLDivElement> {}

export const SilkBackground = ({ className, ...props }: SilkBackgroundProps) => {
  return (
    <div className={cn("absolute inset-0 w-full h-full z-0 pointer-events-none hidden dark:block overflow-hidden bg-[#131415]", className)} {...props}>
      <style>{`
        /* Slow Breathing Spotlight */
        .silk-spotlight {
          position: absolute;
          top: -15%;
          left: 15%;
          width: 80vw;
          height: 80vw;
          background: radial-gradient(circle at center, rgba(217, 156, 129, 0.08) 0%, rgba(99, 102, 241, 0.03) 40%, transparent 70%);
          filter: blur(85px);
          animation: breathingDark 15s ease-in-out infinite alternate;
          z-index: 1;
        }

        /* Slowly Undulating Liquid Silk Waves */
        .silk-wave-container {
          position: absolute;
          bottom: -5%;
          left: -10%;
          width: 120%;
          height: 60%;
          z-index: 2;
          opacity: 0.38;
          filter: blur(1px);
          will-change: transform;
        }

        .silk-wave {
          position: absolute;
          width: 100%;
          height: 100%;
          transform-origin: center bottom;
        }

        .silk-wave-1 {
          fill: url(#silk-grad-1);
          animation: waveAnimation1 22s ease-in-out infinite alternate;
        }

        .silk-wave-2 {
          fill: url(#silk-grad-2);
          animation: waveAnimation2 28s ease-in-out infinite alternate;
          opacity: 0.75;
        }

        .silk-wave-3 {
          fill: url(#silk-grad-3);
          animation: waveAnimation3 34s ease-in-out infinite alternate;
          opacity: 0.5;
        }

        /* Floating Copper Stardust (Embers) */
        .stardust-container {
          position: absolute;
          inset: 0;
          z-index: 3;
        }

        .dust-particle {
          position: absolute;
          border-radius: 50%;
          background: var(--color-accent-skin, #D99C81);
          box-shadow: 0 0 12px var(--color-accent-skin, #D99C81);
          will-change: transform, opacity;
        }

        .dust-1 { width: 6px; height: 6px; left: 15%; top: 80%; opacity: 0.4; animation: riseDust1 24s linear infinite; }
        .dust-2 { width: 8px; height: 8px; left: 45%; top: 90%; opacity: 0.6; animation: riseDust2 28s linear infinite; }
        .dust-3 { width: 5px; height: 5px; left: 75%; top: 75%; opacity: 0.5; animation: riseDust3 22s linear infinite; }
        .dust-4 { width: 7px; height: 7px; left: 30%; top: 60%; opacity: 0.3; animation: riseDust1 32s linear infinite; }
        .dust-5 { width: 9px; height: 9px; left: 85%; top: 65%; opacity: 0.5; animation: riseDust2 26s linear infinite; }
        .dust-6 { width: 6px; height: 6px; left: 60%; top: 85%; opacity: 0.4; animation: riseDust3 30s linear infinite; }

        /* Animations */
        @keyframes breathingDark {
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
      <div className="silk-spotlight pointer-events-none" />

      {/* Undulating Liquid Silk Waves */}
      <svg className="silk-wave-container" viewBox="0 0 1440 600" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="silk-grad-1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(217, 156, 129, 0.08)" />
            <stop offset="50%" stopColor="rgba(99, 102, 241, 0.03)" />
            <stop offset="100%" stopColor="rgba(19, 20, 21, 0.95)" />
          </linearGradient>
          <linearGradient id="silk-grad-2" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="rgba(168, 85, 247, 0.06)" />
            <stop offset="50%" stopColor="rgba(217, 156, 129, 0.04)" />
            <stop offset="100%" stopColor="rgba(19, 20, 21, 0.95)" />
          </linearGradient>
          <linearGradient id="silk-grad-3" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(59, 130, 246, 0.05)" />
            <stop offset="100%" stopColor="rgba(19, 20, 21, 0.95)" />
          </linearGradient>
        </defs>
        
        {/* Soft flowing wave paths */}
        <path className="silk-wave silk-wave-1" d="M0,320 C320,400 480,240 800,320 C1120,400 1280,280 1440,320 L1440,600 L0,600 Z" />
        <path className="silk-wave silk-wave-2" d="M0,280 C300,180 600,380 900,280 C1200,180 1350,280 1440,300 L1440,600 L0,600 Z" />
        <path className="silk-wave silk-wave-3" d="M0,360 C240,280 480,440 720,360 C960,280 1200,360 1440,320 L1440,600 L0,600 Z" />
      </svg>

      {/* Floating Copper Stardust Embers */}
      <div className="stardust-container">
        <div className="dust-particle dust-1" />
        <div className="dust-particle dust-2" />
        <div className="dust-particle dust-3" />
        <div className="dust-particle dust-4" />
        <div className="dust-particle dust-5" />
        <div className="dust-particle dust-6" />
      </div>

      {/* Physical Film Grain for tactile elegance */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\' opacity=\'0.02\'/%3E%3C/svg%3E')] pointer-events-none opacity-85 z-[4]" />

      {/* Bottom overlay fade */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#131415] z-[4]" />
    </div>
  );
};

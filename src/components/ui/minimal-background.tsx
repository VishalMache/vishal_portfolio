"use client";

import React from "react";
import { cn } from "@/lib/utils";

export const MinimalBackground = ({ className }: { className?: string }) => {
  return (
    <div className={cn("absolute inset-0 w-full h-full z-0 pointer-events-none dark:hidden overflow-hidden", className)}>
      <style>{`
        /* accent lines container */
        .accent-lines {
          position: absolute;
          inset: 0;
          pointer-events: none;
        }

        /* base line visuals */
        .hline, .vline {
          position: absolute;
          background: var(--color-border, #A6A9AC);
          opacity: .4;
        }

        /* horizontal lines */
        .hline {
          height: 1px; left: 0; right: 0;
          transform: scaleX(0);
          transform-origin: 50% 50%;
          animation: drawX 800ms cubic-bezier(.22,.61,.36,1) forwards;
        }
        .hline:nth-child(1){ top: 20%; animation-delay: 150ms; }
        .hline:nth-child(2){ top: 50%; animation-delay: 280ms; }
        .hline:nth-child(3){ top: 80%; animation-delay: 410ms; }

        /* vertical lines */
        .vline {
          width: 1px; top: 0; bottom: 0;
          transform: scaleY(0);
          transform-origin: 50% 0%;
          animation: drawY 900ms cubic-bezier(.22,.61,.36,1) forwards;
        }
        .vline:nth-child(4){ left: 20%; animation-delay: 520ms; }
        .vline:nth-child(5){ left: 50%; animation-delay: 640ms; }
        .vline:nth-child(6){ left: 80%; animation-delay: 760ms; }

        /* subtle gradient shimmer while drawing */
        .hline::after, .vline::after{
          content:"";
          position:absolute;
          inset:0;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.8), transparent);
          opacity:0;
          animation: shimmer 900ms ease-out forwards;
        }
        .hline:nth-child(1)::after{ animation-delay: 150ms; }
        .hline:nth-child(2)::after{ animation-delay: 280ms; }
        .hline:nth-child(3)::after{ animation-delay: 410ms; }
        .vline:nth-child(4)::after{ animation-delay: 520ms; }
        .vline:nth-child(5)::after{ animation-delay: 640ms; }
        .vline:nth-child(6)::after{ animation-delay: 760ms; }

        /* keyframes */
        @keyframes drawX {
          0% { transform: scaleX(0); opacity: 0; }
          60% { opacity: .6; }
          100% { transform: scaleX(1); opacity: .4; }
        }
        @keyframes drawY {
          0% { transform: scaleY(0); opacity: 0; }
          60% { opacity: .6; }
          100% { transform: scaleY(1); opacity: .4; }
        }
        @keyframes shimmer {
          0% { opacity: .0; }
          30% { opacity: .7; }
          100% { opacity: 0; }
        }
      `}</style>

      {/* Accent Lines */}
      <div className="accent-lines">
        <div className="hline" />
        <div className="hline" />
        <div className="hline" />
        <div className="vline" />
        <div className="vline" />
        <div className="vline" />
      </div>
      
      {/* Soft gradient overlay to blend perfectly with the hero section */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[var(--color-bg)]/20 to-[var(--color-bg)]" />
    </div>
  );
};

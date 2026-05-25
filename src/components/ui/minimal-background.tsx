"use client";

import React, { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

export const MinimalBackground = ({ className }: { className?: string }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const setSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    setSize();

    type Particle = {
      x: number;
      y: number;
      speed: number;
      opacity: number;
      fadeDelay: number;
      fadeStart: number;
      fadingOut: boolean;
    };

    let particles: Particle[] = [];
    let raf = 0;

    const count = () => Math.floor((canvas.width * canvas.height) / 7000);

    const make = (randomY = true): Particle => {
      const fadeDelay = Math.random() * 600 + 100;
      return {
        x: Math.random() * canvas.width,
        y: randomY ? Math.random() * canvas.height : -10, // Start just above screen if resetting
        speed: Math.random() / 5 + 0.1,
        opacity: 0.7,
        fadeDelay,
        fadeStart: Date.now() + fadeDelay,
        fadingOut: false,
      };
    };

    const reset = (p: Particle) => {
      const newP = make(false);
      p.x = newP.x;
      p.y = newP.y;
      p.speed = newP.speed;
      p.opacity = newP.opacity;
      p.fadeDelay = newP.fadeDelay;
      p.fadeStart = newP.fadeStart;
      p.fadingOut = newP.fadingOut;
    };

    const init = () => {
      particles = [];
      for (let i = 0; i < count(); i++) particles.push(make(true));
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.y += p.speed;
        if (p.y > canvas.height + 10) reset(p);
        if (!p.fadingOut && Date.now() > p.fadeStart) p.fadingOut = true;
        if (p.fadingOut) {
          p.opacity -= 0.008;
          if (p.opacity <= 0) reset(p);
        }
        
        // Dark particles for light mode background
        ctx.fillStyle = `rgba(19, 20, 21, ${p.opacity * 0.4})`;
        ctx.fillRect(p.x, p.y, 1.5, Math.random() * 2 + 1);
      });
      raf = requestAnimationFrame(draw);
    };

    const onResize = () => {
      setSize();
      init();
    };

    window.addEventListener("resize", onResize);
    init();
    raf = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(raf);
    };
  }, []);

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
          will-change: transform, opacity;
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

        /* canvas */
        .particleCanvas {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          opacity: 1;
        }
      `}</style>

      {/* Particles */}
      <canvas ref={canvasRef} className="particleCanvas" />

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

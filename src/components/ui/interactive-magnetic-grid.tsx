"use client";

import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

class Point {
  x: number;
  y: number;
  originX: number;
  originY: number;
  vx: number;
  vy: number;
  friction: number;
  springFactor: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
    this.originX = x;
    this.originY = y;
    this.vx = 0;
    this.vy = 0;
    this.friction = 0.85; // How fast it slows down
    this.springFactor = 0.1; // How fast it snaps back to origin
  }

  update(mouse: { x: number; y: number; radius: number; active: boolean }) {
    // Distance from mouse
    const dx = this.x - mouse.x;
    const dy = this.y - mouse.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    // Magnetic Repulsion
    if (mouse.active && distance < mouse.radius) {
      const force = (mouse.radius - distance) / mouse.radius;
      const angle = Math.atan2(dy, dx);
      
      const pushX = Math.cos(angle) * force * 5; // Strength of repulsion
      const pushY = Math.sin(angle) * force * 5;
      
      this.vx += pushX;
      this.vy += pushY;
    }

    // Spring back to origin
    const dxOrigin = this.originX - this.x;
    const dyOrigin = this.originY - this.y;
    
    this.vx += dxOrigin * this.springFactor;
    this.vy += dyOrigin * this.springFactor;

    // Apply friction
    this.vx *= this.friction;
    this.vy *= this.friction;

    // Update position
    this.x += this.vx;
    this.y += this.vy;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, 1.5, 0, Math.PI * 2);
    ctx.fill();
  }
}

export const InteractiveMagneticGrid = ({ className }: { className?: string }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let points: Point[] = [];
    let animationFrameId: number;
    const spacing = 40; // Space between grid points

    const mouse = {
      x: -1000,
      y: -1000,
      radius: 120, // Size of the magnetic field
      active: false,
    };

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initGrid();
    };

    const initGrid = () => {
      points = [];
      const cols = Math.floor(canvas.width / spacing) + 2;
      const rows = Math.floor(canvas.height / spacing) + 2;
      
      const offsetX = (canvas.width - (cols - 1) * spacing) / 2;
      const offsetY = (canvas.height - (rows - 1) * spacing) / 2;

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          points.push(new Point(offsetX + i * spacing, offsetY + j * spacing));
        }
      }
    };

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw lines between points to create the "mesh" effect
      ctx.strokeStyle = "rgba(0, 0, 0, 0.04)";
      ctx.lineWidth = 1;
      
      // We only draw lines to right and bottom neighbors for performance and clean look
      const cols = Math.floor(canvas.width / spacing) + 2;
      const rows = Math.floor(canvas.height / spacing) + 2;
      
      ctx.beginPath();
      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const index = i * rows + j;
          const p = points[index];
          if (!p) continue;
          
          p.update(mouse);

          // Connect to the point below
          if (j < rows - 1) {
            const pBottom = points[index + 1];
            if (pBottom) {
              ctx.moveTo(p.x, p.y);
              ctx.lineTo(pBottom.x, pBottom.y);
            }
          }
          // Connect to the point right
          if (i < cols - 1) {
            const pRight = points[index + rows];
            if (pRight) {
              ctx.moveTo(p.x, p.y);
              ctx.lineTo(pRight.x, pRight.y);
            }
          }
        }
      }
      ctx.stroke();

      // Draw points
      ctx.fillStyle = "rgba(0, 0, 0, 0.15)";
      for (const p of points) {
        p.draw(ctx);
      }

      animationFrameId = requestAnimationFrame(render);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.active = true;
    };

    const handleMouseLeave = () => {
      mouse.active = false;
      mouse.x = -1000;
      mouse.y = -1000;
    };

    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", handleMouseMove);
    document.body.addEventListener("mouseleave", handleMouseLeave);

    resize();
    render();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      document.body.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, [mounted]);

  if (!mounted) return null;

  return (
    <div className={cn("fixed inset-0 w-full h-full z-0 dark:hidden bg-[#F3F4F6]", className)}>
      <canvas
        ref={canvasRef}
        className="block w-full h-full"
      />
      
      {/* Soft spotlight following the mouse for an extra premium feel */}
      <div 
        id="magnetic-glow"
        className="absolute inset-0 pointer-events-none opacity-0 transition-opacity duration-300"
        style={{
          background: "radial-gradient(250px circle at -1000px -1000px, rgba(255, 255, 255, 0.8), transparent 100%)",
        }}
      />

      <style>{`
        /* Mouse tracking for the spotlight via a simple listener to avoid react state overhead */
      `}</style>
      
      {/* We use a tiny script attached to window to update the gradient position smoothly without React re-renders */}
      <div 
        ref={(el) => {
          if (!el) return;
          const handleGlow = (e: MouseEvent) => {
            const glow = document.getElementById("magnetic-glow");
            if (glow) {
              glow.style.background = `radial-gradient(250px circle at ${e.clientX}px ${e.clientY}px, rgba(255, 255, 255, 0.9), transparent 100%)`;
              glow.style.opacity = "1";
            }
          };
          const hideGlow = () => {
            const glow = document.getElementById("magnetic-glow");
            if (glow) glow.style.opacity = "0";
          };
          window.addEventListener("mousemove", handleGlow);
          document.body.addEventListener("mouseleave", hideGlow);
          
          // Cleanup attached to the ref
          (el as any)._cleanup = () => {
            window.removeEventListener("mousemove", handleGlow);
            document.body.removeEventListener("mouseleave", hideGlow);
          };
        }}
        className="hidden"
      />
    </div>
  );
};

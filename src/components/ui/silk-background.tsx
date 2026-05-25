'use client';

import React, { useEffect, useRef } from 'react';
import { cn } from "@/lib/utils";

interface SilkBackgroundProps extends React.HTMLAttributes<HTMLDivElement> {}

export const SilkBackground = ({ className, ...props }: SilkBackgroundProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let time = 0;
    const speed = 0.02;
    const scale = 2;
    const noiseIntensity = 0.8;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      // We limit the height to the window height since it's an absolute background for hero,
      // though typically Hero uses full height anyway.
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Simple noise function
    const noise = (x: number, y: number) => {
      const G = 2.71828;
      const rx = G * Math.sin(G * x);
      const ry = G * Math.sin(G * y);
      return (rx * ry * (1 + x)) % 1;
    };

    const animate = () => {
      const { width, height } = canvas;
      
      // Create gradient background matching the portfolio's dark theme
      const gradient = ctx.createLinearGradient(0, 0, width, height);
      gradient.addColorStop(0, '#131415'); // var(--color-bg) in dark mode
      gradient.addColorStop(0.5, '#1D1E20'); // var(--color-bg-alt)
      gradient.addColorStop(1, '#131415');
      
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      // Create silk-like pattern
      const imageData = ctx.createImageData(width, height);
      const data = imageData.data;

      for (let x = 0; x < width; x += 2) {
        for (let y = 0; y < height; y += 2) {
          const u = (x / width) * scale;
          const v = (y / height) * scale;
          
          const tOffset = speed * time;
          let tex_x = u;
          let tex_y = v + 0.03 * Math.sin(8.0 * tex_x - tOffset);

          const pattern = 0.6 + 0.4 * Math.sin(
            5.0 * (tex_x + tex_y + 
              Math.cos(3.0 * tex_x + 5.0 * tex_y) + 
              0.02 * tOffset) +
            Math.sin(20.0 * (tex_x + tex_y - 0.1 * tOffset))
          );

          const rnd = noise(x, y);
          const intensity = Math.max(0, pattern - rnd / 15.0 * noiseIntensity);
          
          // Muted Bronze/Copper color to match var(--color-accent-skin)
          const r = Math.floor(173 * intensity);
          const g = Math.floor(124 * intensity);
          const b = Math.floor(103 * intensity);
          const a = 255;

          const index = (y * width + x) * 4;
          if (index < data.length) {
            // Because we step by 2, we should fill 4 pixels (a 2x2 block) for performance
            // But to keep it simple, we just fill the exact pixel
            data[index] = r;
            data[index + 1] = g;
            data[index + 2] = b;
            data[index + 3] = a;
            
            // Fill adjacent pixels for the 2x2 block (simple upscaling)
            if (x + 1 < width) {
              data[index + 4] = r; data[index + 5] = g; data[index + 6] = b; data[index + 7] = a;
            }
            if (y + 1 < height) {
              const rowBelow = index + width * 4;
              if (rowBelow < data.length) {
                data[rowBelow] = r; data[rowBelow + 1] = g; data[rowBelow + 2] = b; data[rowBelow + 3] = a;
                if (x + 1 < width) {
                  data[rowBelow + 4] = r; data[rowBelow + 5] = g; data[rowBelow + 6] = b; data[rowBelow + 7] = a;
                }
              }
            }
          }
        }
      }

      ctx.putImageData(imageData, 0, 0);

      // Add subtle overlay for depth
      const overlayGradient = ctx.createRadialGradient(
        width / 2, height / 2, 0,
        width / 2, height / 2, Math.max(width, height) / 2
      );
      overlayGradient.addColorStop(0, 'rgba(0, 0, 0, 0.1)');
      overlayGradient.addColorStop(1, 'rgba(0, 0, 0, 0.4)');
      
      ctx.fillStyle = overlayGradient;
      ctx.fillRect(0, 0, width, height);

      time += 1;
      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <div className={cn("absolute inset-0 w-full h-full z-0 pointer-events-none hidden dark:block overflow-hidden", className)} {...props}>
      <canvas 
        ref={canvasRef}
        className="absolute inset-0 w-full h-full opacity-60 mix-blend-screen"
      />
      {/* Gradient Overlay to soften the effect behind content */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#131415]/20 to-[#131415]" />
    </div>
  );
};

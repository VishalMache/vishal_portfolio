'use client';

import React from 'react';
import { cn } from "@/lib/utils";

interface SilkBackgroundProps extends React.HTMLAttributes<HTMLDivElement> {}

export const SilkBackground = ({ className, ...props }: SilkBackgroundProps) => {
  return (
    <div className={cn("absolute inset-0 w-full h-full z-0 pointer-events-none hidden dark:block overflow-hidden", className)} {...props}>
      {/* CSS-only silk gradient — replaces the expensive per-pixel canvas animation */}
      <div 
        className="absolute inset-0 w-full h-full opacity-60"
        style={{
          background: `
            radial-gradient(ellipse at 30% 20%, rgba(173, 124, 103, 0.15) 0%, transparent 50%),
            radial-gradient(ellipse at 70% 60%, rgba(173, 124, 103, 0.10) 0%, transparent 50%),
            radial-gradient(ellipse at 50% 80%, rgba(173, 124, 103, 0.08) 0%, transparent 40%),
            linear-gradient(135deg, #131415 0%, #1D1E20 50%, #131415 100%)
          `,
          mixBlendMode: 'screen',
        }}
      />
      {/* Gradient Overlay to soften the effect behind content */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#131415]/20 to-[#131415]" />
    </div>
  );
};

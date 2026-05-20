"use client";

import React, { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { cn } from "@/lib/utils";

interface MagneticCardProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: string; // e.g., rgba(99, 102, 241, 0.15)
  onClick?: () => void;
  layoutId?: string;
}

export function MagneticCard({
  children,
  className,
  glowColor = "rgba(255, 255, 255, 0.15)",
  onClick,
  layoutId,
}: MagneticCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  // Mouse coordinates relative to card bounds
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for tilt rotation
  const rotateXSpring = useSpring(0, { damping: 25, stiffness: 150 });
  const rotateYSpring = useSpring(0, { damping: 25, stiffness: 150 });

  // Spring coordinates for spotlight gradient overlay
  const spotlightX = useSpring(0, { damping: 40, stiffness: 200 });
  const spotlightY = useSpring(0, { damping: 40, stiffness: 200 });

  // Transform coordinates to degrees of tilt
  const rotateX = useTransform(rotateXSpring, [-0.5, 0.5], [10, -10]);
  const rotateY = useTransform(rotateYSpring, [-0.5, 0.5], [-10, 10]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    // Mouse coordinates relative to top-left of the card
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Normalize coordinates from -0.5 to 0.5
    const xPct = x / width - 0.5;
    const yPct = y / height - 0.5;

    rotateXSpring.set(yPct);
    rotateYSpring.set(xPct);

    // Spotlight coordinates (percentages for radial gradient background)
    spotlightX.set((x / width) * 100);
    spotlightY.set((y / height) * 100);
  };

  const handleMouseLeave = () => {
    rotateXSpring.set(0);
    rotateYSpring.set(0);
    // Move spotlight out of view
    spotlightX.set(-100);
    spotlightY.set(-100);
  };

  return (
    <motion.div
      ref={cardRef}
      layoutId={layoutId}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{
        rotateX: rotateX,
        rotateY: rotateY,
        transformStyle: "preserve-3d",
      }}
      className={cn(
        "relative rounded-2xl border border-border bg-surface overflow-hidden cursor-none select-none transition-all duration-300 shadow-sm hover:shadow-2xl",
        className
      )}
    >
      {/* 3D tilt depth highlights */}
      <div style={{ transform: "translateZ(0px)" }} className="absolute inset-0 z-0">
        {/* Dynamic spotlight tracking gradient */}
        <motion.div
          className="absolute inset-0 pointer-events-none transition-opacity duration-300 opacity-0 group-hover:opacity-100"
          style={{
            background: useTransform(
              [spotlightX, spotlightY],
              ([x, y]) => `radial-gradient(400px circle at ${x}% ${y}%, ${glowColor}, transparent 80%)`
            ),
          }}
        />
      </div>

      {/* Internal card content with translation depth */}
      <div
        style={{
          transform: "translateZ(30px)",
          transformStyle: "preserve-3d",
        }}
        className="relative z-10 w-full h-full"
      >
        {children}
      </div>
    </motion.div>
  );
}

"use client";

import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

export function CustomCursor() {
  const [cursorType, setCursorType] = useState<"default" | "view" | "close" | "pointer">("default");
  const [isVisible, setIsVisible] = useState(false);

  // Position of raw mouse cursor
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Smooth springs for delayed trailing physics
  const springConfig = { damping: 40, stiffness: 350, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Hide custom cursor on touch devices
    const isTouchDevice = () => {
      return "ontouchstart" in window || navigator.maxTouchPoints > 0;
    };

    if (isTouchDevice()) {
      return;
    }

    setIsVisible(true);

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      // Ascend tree to find closest interactive element with data-cursor attribute
      const cursorAttrEl = target.closest("[data-cursor]");
      if (cursorAttrEl) {
        const type = cursorAttrEl.getAttribute("data-cursor");
        if (type === "view" || type === "close" || type === "pointer") {
          setCursorType(type as any);
          return;
        }
      }

      // Check standard links and buttons
      const isInteractive = target.closest("a, button, [role='button']");
      if (isInteractive) {
        setCursorType("pointer");
      } else {
        setCursorType("default");
      }
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handleMouseOver);

    // Hide default cursor globally
    document.body.style.cursor = "none";
    
    // Inject custom cursor CSS to force none on all interactive items
    const style = document.createElement("style");
    style.innerHTML = `
      a, button, [role='button'], input, select, textarea, [data-cursor] {
        cursor: none !important;
      }
    `;
    document.head.appendChild(style);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleMouseOver);
      document.body.style.cursor = "auto";
      document.head.removeChild(style);
    };
  }, [cursorX, cursorY]);

  if (!isVisible) return null;

  // Determine size & content based on the active hover target type
  const variants = {
    default: {
      width: 8,
      height: 8,
      backgroundColor: "var(--color-accent)",
      border: "0px solid transparent",
    },
    pointer: {
      width: 40,
      height: 40,
      backgroundColor: "rgba(255, 255, 255, 0.05)",
      border: "1px solid var(--color-accent)",
    },
    view: {
      width: 84,
      height: 84,
      backgroundColor: "var(--color-accent)",
      border: "1px solid var(--color-accent)",
    },
    close: {
      width: 84,
      height: 84,
      backgroundColor: "var(--color-accent)",
      border: "1px solid var(--color-accent)",
    },
  };

  return (
    <>
      {/* Outer spring-trailing ring or dot */}
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[9999] flex items-center justify-center text-center font-display font-bold text-[10px] tracking-wider uppercase overflow-hidden"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: "-50%",
          translateY: "-50%",
          mixBlendMode: cursorType === "default" ? "difference" : "normal",
        }}
        animate={cursorType}
        variants={variants}
        transition={{ type: "spring", stiffness: 450, damping: 30, mass: 0.2 }}
      >
        {cursorType === "view" && (
          <motion.span
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-bg font-semibold select-none"
          >
            View
          </motion.span>
        )}
        {cursorType === "close" && (
          <motion.span
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-bg font-semibold select-none"
          >
            Close
          </motion.span>
        )}
      </motion.div>
    </>
  );
}

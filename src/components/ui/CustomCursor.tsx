"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "motion/react";

export function CustomCursor() {
  const [cursorType, setCursorType] = useState<"default" | "view" | "close" | "pointer">("default");
  const [isVisible, setIsVisible] = useState(false);
  const [guideText, setGuideText] = useState<string | null>(null);
  const [displayedGuide, setDisplayedGuide] = useState<string | null>(null);

  // Delay timer ref so guide doesn't flash on fast scroll
  const guideTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearGuideTimer = () => {
    if (guideTimerRef.current) {
      clearTimeout(guideTimerRef.current);
      guideTimerRef.current = null;
    }
  };

  // Position of raw mouse cursor
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Smooth springs for delayed trailing physics
  const springConfig = { damping: 40, stiffness: 350, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  // Softer spring for the tooltip pill (trails more lazily)
  const pillSpringConfig = { damping: 35, stiffness: 200, mass: 0.8 };
  const pillX = useSpring(cursorX, pillSpringConfig);
  const pillY = useSpring(cursorY, pillSpringConfig);

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

      // --- Priority 1: data-cursor attribute (view / close / pointer) ---
      const cursorAttrEl = target.closest("[data-cursor]");
      if (cursorAttrEl) {
        const type = cursorAttrEl.getAttribute("data-cursor");
        if (type === "view" || type === "close" || type === "pointer") {
          setCursorType(type as "default" | "view" | "close" | "pointer");
          // Hide guide when on interactive cursor elements
          clearGuideTimer();
          setGuideText(null);
          return;
        }
      }

      // --- Priority 2: standard interactive elements ---
      const isInteractive = target.closest("a, button, [role='button'], input, select, textarea");
      if (isInteractive) {
        setCursorType("pointer");
        // Hide guide when on interactive elements
        clearGuideTimer();
        setGuideText(null);
        return;
      }

      // --- Priority 3: data-cursor-guide zones ---
      setCursorType("default");
      const guideEl = target.closest("[data-cursor-guide]");
      if (guideEl) {
        const text = guideEl.getAttribute("data-cursor-guide") || null;
        // Only update if the text has changed
        setGuideText(text);
      } else {
        clearGuideTimer();
        setGuideText(null);
      }
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handleMouseOver);

    // Hide default cursor globally
    document.body.style.cursor = "none";
    
    // Inject custom cursor CSS to force none on all interactive items
    const style = document.createElement("style");
    style.innerHTML = `
      a, button, [role='button'], input, select, textarea, [data-cursor], [data-cursor-guide] {
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

  // Delayed guide text display — prevents flashing on fast scrolling
  useEffect(() => {
    if (guideText) {
      guideTimerRef.current = setTimeout(() => {
        setDisplayedGuide(guideText);
      }, 300);
    } else {
      setDisplayedGuide(null);
    }
    return () => {
      if (guideTimerRef.current) clearTimeout(guideTimerRef.current);
    };
  }, [guideText]);

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

  // Only show guide pill when cursor is in default mode and text is available
  const showGuidePill = cursorType === "default" && displayedGuide !== null;

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

      {/* Guide Tooltip Pill — trails the cursor with lazy spring physics */}
      <AnimatePresence>
        {showGuidePill && (
          <motion.div
            key={displayedGuide}
            className="cursor-guide-pill"
            initial={{ opacity: 0, scale: 0.85, y: 6 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 4 }}
            transition={{ type: "spring", stiffness: 400, damping: 30, mass: 0.3 }}
            style={{
              x: pillX,
              y: pillY,
              translateX: "12px",
              translateY: "12px",
            }}
          >
            <span className="cursor-guide-pill__text">{displayedGuide}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

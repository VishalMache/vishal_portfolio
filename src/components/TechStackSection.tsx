"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import MultiOrbitSemiCircle from "./ui/multi-orbit-semi-circle";
import TechMemoryGame from "./ui/TechMemoryGame";

export default function TechStackSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [showGame, setShowGame] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll(".tech-reveal");
    elements.forEach((el) => observer.observe(el));

    return () => elements.forEach((el) => observer.unobserve(el));
  }, []);

  return (
    <section id="tech-stack" className="tech-section" ref={sectionRef}>
      <div className="tech-container">
        {/* Section Header outside the IDE */}
        <div className="tech-header tech-reveal text-center">
          <h2 className="section-title">Tech Stack</h2>
          <p className="tech-subtitle mx-auto">
            The tools, languages, and frameworks I use to bring ideas to life.
          </p>
        </div>

        {/* IDE Mockup Window */}
        <div className="ide-frame tech-reveal">
          {/* IDE Header */}
          <div className="ide-header">
            <div className="ide-controls">
              <span className="ide-dot ide-dot--close" />
              <span className="ide-dot ide-dot--minimize" />
              <span className="ide-dot ide-dot--maximize" />
            </div>
            <div className="ide-tabs">
              <div className="ide-tab ide-tab--active">
                <span className="ide-tab-icon">⚙️</span>
                <span>tech-stack.config</span>
                <span className="ide-tab-close">×</span>
              </div>
              <div className="ide-tab">
                <span className="ide-tab-icon">👤</span>
                <span>profile.json</span>
                <span className="ide-tab-close">×</span>
              </div>
              <div className="ide-tab">
                <span className="ide-tab-icon">📝</span>
                <span>about-me.md</span>
                <span className="ide-tab-close">×</span>
              </div>
            </div>
            <div className="ide-breadcrumbs">
              <span>vishal_portfolio</span> &gt; <span>src</span> &gt; <span>components</span> &gt; <span>tech-stack</span>
            </div>
          </div>

          {/* IDE Body */}
          <div className="ide-body">
            {/* Sidebar Navigation */}
            <div className="ide-sidebar">
              <div className="ide-sidebar-title">Explorer</div>
              <div className="ide-tree-node">📁 src</div>
              <div className="ide-tree-node" style={{ paddingLeft: "1rem" }}>📁 components</div>
              <div className="ide-tree-node" style={{ paddingLeft: "1.5rem" }}>📁 ui</div>
              <div className="ide-tree-node ide-tree-node--active" style={{ paddingLeft: "2rem" }}>
                ⚙️ tech-stack
              </div>
              <div className="ide-tree-node" style={{ paddingLeft: "1rem" }}>👤 profile.json</div>
              <div className="ide-tree-node" style={{ paddingLeft: "1rem" }}>📝 about-me.md</div>
            </div>

            {/* Editor Workspace */}
            <div className="ide-editor">
              {/* Line Numbers */}
              <div className="ide-line-numbers">
                {Array.from({ length: 22 }).map((_, i) => (
                  <span key={i} className="block text-right pr-2">
                    {(i + 1).toString().padStart(2, "0")}
                  </span>
                ))}
              </div>

              {/* Preview Panel */}
              <div className="ide-preview">
                {/* Render the tech stack orbits directly inside the editor area without section title/description */}
                <MultiOrbitSemiCircle title="" description="" />
              </div>
            </div>
          </div>

          {/* IDE Bottom status bar */}
          <div className="ide-status">
            <div className="ide-status-item">
              <span>🌿 main</span>
              <span className="ml-2">⚠️ 0</span>
              <span className="ml-2">🚫 0</span>
            </div>
            <div className="ide-status-item">
              <span>Ln 12, Col 8</span>
              <span className="ml-3">Spaces: 2</span>
              <span className="ml-3">UTF-8</span>
            </div>
          </div>
        </div>

        {/* Interactive Play Prompt */}
        <div className="mt-8 flex flex-row justify-center items-center gap-3 font-display text-sm md:text-base tech-reveal">
          <span className="text-text-secondary tracking-wide">
            {showGame ? "Having fun?" : "Wanna have some fun?"}
          </span>
          <button
            onClick={() => setShowGame((v) => !v)}
            className="relative group px-5 py-2.5 rounded-full overflow-hidden transition-all duration-300 shadow-sm border border-border/80 bg-surface/50 dark:bg-zinc-900/50 hover:bg-text hover:text-bg hover:scale-105 active:scale-95 flex items-center gap-2"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-violet-500/10 via-pink-500/10 to-amber-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            <span className="relative font-bold uppercase tracking-wider text-xs md:text-sm">
              {showGame ? "Hide" : "Play"}
            </span>
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500 group-hover:bg-emerald-400">
              <span className="absolute -inset-0.5 rounded-full bg-emerald-500 opacity-75 animate-ping group-hover:bg-emerald-400" />
            </span>
          </button>
        </div>

        {/* Memory Game */}
        <AnimatePresence>
          {showGame && (
            <motion.div
              initial={{ opacity: 0, height: 0, y: -10 }}
              animate={{ opacity: 1, height: "auto", y: 0 }}
              exit={{ opacity: 0, height: 0, y: -10 }}
              transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
              className="overflow-hidden"
            >
              <TechMemoryGame onClose={() => setShowGame(false)} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import MultiOrbitSemiCircle from "./ui/multi-orbit-semi-circle";
import TechMemoryGame from "./ui/TechMemoryGame";
import { GitHubCalendar } from "./ui/git-hub-calendar";
import { Gamepad2, X, Sparkles } from "lucide-react";

export default function TechStackSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [showGame, setShowGame] = useState(false);
  const [isIdeRunning, setIsIdeRunning] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.2 }
    );

    const elements = document.querySelectorAll(".tech-reveal");
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section id="tech-stack" className="tech-section" ref={sectionRef} data-cursor-guide="The tools & frameworks I use to bring ideas to life.">
      <div className="tech-container">
        {/* Section Header outside the IDE */}
        <div className="tech-header tech-reveal text-center mb-10">
          <h2 className="section-title">Tech Stack & Activity</h2>
          <p className="tech-subtitle mx-auto text-[var(--color-accent-skin)]">
            The tools, languages, and frameworks I use to bring ideas to life.
          </p>
        </div>

        {/* IDE Mockup Window */}
        <div className="ide-frame tech-reveal">
          {/* IDE Header */}
          <div className="ide-header flex justify-between items-center w-full pr-4">
            <div className="flex items-center">
              <div className="ide-controls">
                <span className="ide-dot ide-dot--close" />
                <span className="ide-dot ide-dot--minimize" />
                <span className="ide-dot ide-dot--maximize" />
              </div>
              <div className="ide-tabs flex">
                <div className="ide-tab ide-tab--active">
                  <span className="ide-tab-icon">⚙️</span>
                  <span>tech-stack.tsx</span>
                  <span className="ide-tab-close">×</span>
                </div>
                <div className="ide-tab hidden sm:flex">
                  <span className="ide-tab-icon">📝</span>
                  <span>about-me.md</span>
                  <span className="ide-tab-close">×</span>
                </div>
              </div>
            </div>
            <button 
              onClick={() => setIsIdeRunning(!isIdeRunning)}
              className={`flex items-center gap-2 px-4 py-1.5 rounded-md text-xs font-bold uppercase tracking-wider transition-all duration-300 shadow-lg ${
                isIdeRunning 
                  ? 'bg-rose-500 text-white hover:bg-rose-600 shadow-rose-500/20' 
                  : 'bg-emerald-500 text-white hover:bg-emerald-600 shadow-emerald-500/20'
              }`}
            >
              {isIdeRunning ? "⏹ Stop" : "▶ Run"}
            </button>
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
              <div className="ide-preview relative w-full overflow-hidden">
                <AnimatePresence mode="wait">
                  {!isIdeRunning ? (
                    <motion.div
                      key="code"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.3 }}
                      className="absolute inset-0 p-6 md:p-8 font-mono text-[11px] md:text-sm text-left overflow-auto whitespace-pre leading-relaxed z-10 bg-[#1e1e1e]"
                      style={{ color: '#abb2bf' }}
                    >
                      <span style={{color: '#c678dd'}}>import</span> React <span style={{color: '#c678dd'}}>from</span> <span style={{color: '#98c379'}}>'react'</span>;<br/>
                      <span style={{color: '#c678dd'}}>import</span> {'{'} MultiOrbitSemiCircle {'}'} <span style={{color: '#c678dd'}}>from</span> <span style={{color: '#98c379'}}>'@/components/ui'</span>;<br/>
                      <br/>
                      <span style={{color: '#c678dd'}}>export function</span> <span style={{color: '#61afef'}}>TechStack</span>() {'{'}<br/>
                      {'  '}<span style={{color: '#5c6370', fontStyle: 'italic'}}>// Initialize core capabilities</span><br/>
                      {'  '}<span style={{color: '#c678dd'}}>const</span> tech = {'{'}<br/>
                      {'    '}frontend: [<span style={{color: '#98c379'}}>'React'</span>, <span style={{color: '#98c379'}}>'Next.js'</span>, <span style={{color: '#98c379'}}>'TailwindCSS'</span>],<br/>
                      {'    '}mobile: [<span style={{color: '#98c379'}}>'Flutter'</span>, <span style={{color: '#98c379'}}>'Dart'</span>],<br/>
                      {'    '}backend: [<span style={{color: '#98c379'}}>'Node.js'</span>, <span style={{color: '#98c379'}}>'Firebase'</span>, <span style={{color: '#98c379'}}>'Supabase'</span>]<br/>
                      {'  }'};<br/>
                      <br/>
                      {'  '}<div className="inline-block mt-1 mb-2 px-3 py-1.5 rounded-md bg-emerald-500/10 border border-emerald-500/30">
                        <span style={{color: '#34d399', fontWeight: 'bold', fontStyle: 'italic', letterSpacing: '0.5px'}}>// ✨ Click the "▶ Run" button above to compile and execute!</span>
                      </div><br/>
                      {'  '}<span style={{color: '#c678dd'}}>return</span> (<br/>
                      {'    '}<span style={{color: '#e06c75'}}>&lt;</span><span style={{color: '#e5c07b'}}>div</span> <span style={{color: '#d19a66'}}>className</span>=<span style={{color: '#98c379'}}>"flex h-full"</span><span style={{color: '#e06c75'}}>&gt;</span><br/>
                      {'      '}<span style={{color: '#e06c75'}}>&lt;</span><span style={{color: '#e5c07b'}}>MultiOrbitSemiCircle</span> <br/>
                      {'        '}<span style={{color: '#d19a66'}}>data</span>={'{'}tech{'}'}<br/>
                      {'        '}<span style={{color: '#d19a66'}}>animate</span>={'{'}<span style={{color: '#d19a66'}}>true</span>{'}'}<br/>
                      {'      '}<span style={{color: '#e06c75'}}>/&gt;</span><br/>
                      {'    '}<span style={{color: '#e06c75'}}>&lt;/</span><span style={{color: '#e5c07b'}}>div</span><span style={{color: '#e06c75'}}>&gt;</span><br/>
                      {'  '});<br/>
                      {'}'}<br/>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="preview"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                      className="w-full h-full relative z-20"
                    >
                      <MultiOrbitSemiCircle title="" description="" />
                    </motion.div>
                  )}
                </AnimatePresence>
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

        {/* GitHub Contributions Calendar */}
        <div className="w-full max-w-4xl mx-auto mt-20 mb-8 tech-reveal">
          <h3 className="font-display font-bold text-xl mb-4 text-text pl-2 border-l-4 border-[var(--color-accent-skin)]">GitHub Contributions</h3>
          <GitHubCalendar username="VishalMache" />
        </div>

        {/* Interactive Play Prompt */}
        <motion.div 
          className="mt-20 flex flex-col sm:flex-row justify-center items-center gap-4 tech-reveal"
          animate={{ y: [0, -3, 0] }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <span 
            className="text-text-secondary text-lg md:text-xl italic flex items-center gap-2 select-none"
            style={{ fontFamily: 'var(--font-serif)' }}
          >
            <Sparkles className="w-4 h-4 text-amber-500 dark:text-amber-400 animate-pulse" />
            {showGame ? "Enjoying the challenge?" : "Discover an interactive secret?"}
          </span>

          <div className="relative">
            <motion.button
              onClick={() => setShowGame((v) => !v)}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="relative group px-6 py-3 rounded-full overflow-hidden transition-all duration-300 shadow-xl border border-white/20 dark:border-zinc-800/80 bg-zinc-950/95 text-white hover:border-white/30 flex items-center gap-3.5"
            >
              {/* Shimmering glass sheen highlight */}
              <motion.span 
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent pointer-events-none"
                initial={{ x: "-100%" }}
                whileHover={{ x: "100%" }}
                transition={{ 
                  repeat: Infinity, 
                  repeatType: "loop", 
                  duration: 1.6, 
                  ease: "linear" 
                }}
              />

              {/* Shimmer effect inside */}
              <span className="absolute inset-0 bg-gradient-to-r from-violet-500/20 via-pink-500/20 to-amber-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

              {/* Animated Gamepad or Close Icon */}
              <span className="relative z-10 transition-transform duration-300 group-hover:scale-110">
                {showGame ? (
                  <motion.span
                    initial={{ rotate: -90, scale: 0.8 }}
                    animate={{ rotate: 0, scale: 1 }}
                    exit={{ rotate: 90, scale: 0.8 }}
                    transition={{ duration: 0.2 }}
                    className="block animate-none"
                  >
                    <X className="w-[18px] h-[18px] text-rose-400" />
                  </motion.span>
                ) : (
                  <motion.span
                    animate={{ rotate: [0, -10, 10, -10, 0] }}
                    transition={{
                      duration: 2.5,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    className="block"
                  >
                    <Gamepad2 className="w-[18px] h-[18px] text-pink-400" />
                  </motion.span>
                )}
              </span>

              {/* Text Label */}
              <span 
                className="relative z-10 font-medium text-lg md:text-xl text-zinc-100"
                style={{ fontFamily: 'var(--font-serif)' }}
              >
                {showGame ? "Close Game" : "Play Memory Game"}
              </span>

              {/* Double wave ripple ping status badge */}
              <span className="relative flex h-2 w-2">
                <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${showGame ? "bg-red-400" : "bg-emerald-400"} opacity-75`}></span>
                <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${showGame ? "bg-red-400" : "bg-emerald-400"} opacity-40 delay-300`}></span>
                <span className={`relative inline-flex rounded-full h-2 w-2 ${showGame ? "bg-red-500" : "bg-emerald-500"}`}></span>
              </span>
            </motion.button>
          </div>
        </motion.div>

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

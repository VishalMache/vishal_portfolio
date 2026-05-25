"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { projects } from "@/lib/data";
import { cn } from "@/lib/utils";
import { ArrowUpRight, Info, Globe, Cpu, Smartphone, Sparkles, Layers } from "lucide-react";

type ProjectType = typeof projects[number];

const CATEGORIES = ["All", "Mobile Apps", "Web Apps", "AI & Security"];

const PROJECT_IMAGES: Record<string, string> = {};

export default function ProjectsSection() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedProject, setSelectedProject] = useState<ProjectType | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  // Dynamic filter mapping based on tech stack/project metadata
  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      if (activeCategory === "All") return true;
      if (activeCategory === "Mobile Apps") {
        return project.tech.some(t => ["Flutter", "Dart"].includes(t));
      }
      if (activeCategory === "Web Apps") {
        return project.tech.some(t => ["React", "Next.js", "Flask", "Node.js"].includes(t)) && project.id !== "cyphex" && project.id !== "quantisense";
      }
      if (activeCategory === "AI & Security") {
        return (
          project.id === "quantisense" ||
          project.id === "screeni" ||
          project.id === "cyphex" ||
          project.tech.some(t => ["Gemini", "LangChain", "Security"].includes(t))
        );
      }
      return true;
    });
  }, [activeCategory]);

  const col1 = filteredProjects.filter((_, i) => i % 3 === 0);
  const col2 = filteredProjects.filter((_, i) => i % 3 === 1);
  const col3 = filteredProjects.filter((_, i) => i % 3 === 2);

  return (
    <section id="projects" className="py-12 md:py-24 px-6 md:px-12 lg:px-24 bg-bg border-t border-border/50 relative overflow-hidden transition-colors duration-500" data-cursor-guide="A curated showcase of my best work. Click any project to explore.">
      {/* Background ambient light */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-bg-alt/5 to-transparent pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h2 className="section-title text-left my-2">Selected Work</h2>
            <p className="font-body text-text-tertiary text-sm md:text-base max-w-md mt-4 leading-relaxed">
              A curated collection of mobile applications, full-stack web platforms, and intelligent agent pipelines.
            </p>
          </div>

          {/* Dynamic Filtering Tabs */}
          <div 
            className="flex flex-nowrap overflow-x-auto no-scrollbar gap-1 bg-surface p-1 rounded-full border border-border/50 self-start md:self-end max-w-full"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            <style dangerouslySetInnerHTML={{__html: `
              .no-scrollbar::-webkit-scrollbar { display: none; }
            `}} />
            {CATEGORIES.map((category) => {
              const isActive = activeCategory === category;
              return (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`relative whitespace-nowrap px-3.5 py-1.5 font-display text-[10px] sm:text-xs font-semibold uppercase tracking-wider rounded-full transition-colors duration-200 ${
                    isActive ? "text-[var(--color-accent-skin)]" : "text-text-secondary hover:text-text"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeFilter"
                      className="absolute inset-0 bg-bg-alt/80 border border-[var(--color-accent-skin)]/40 rounded-full shadow-inner"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{category}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex flex-col lg:flex-row items-stretch gap-12 lg:gap-16 w-full mt-8">
          <div className="flex gap-3 md:gap-4 w-full max-w-md sm:max-w-lg md:max-w-xl lg:w-[480px] xl:w-[540px] mx-auto lg:mx-0 shrink-0 justify-start">
            
            {/* Column 1 */}
            <div className="flex-1 flex flex-col gap-3 md:gap-4">
              {col1.map((project) => (
                <ProjectPhotoCard
                  key={project.id}
                  project={project}
                  className="w-full aspect-[4/5]"
                  hoveredId={hoveredId}
                  onHover={setHoveredId}
                  onClick={() => setSelectedProject(project)}
                />
              ))}
            </div>

            {/* Column 2 */}
            <div className="flex-1 flex flex-col gap-3 md:gap-4 mt-[36px] sm:mt-[48px] md:mt-[56px] lg:mt-[68px]">
              {col2.map((project) => (
                <ProjectPhotoCard
                  key={project.id}
                  project={project}
                  className="w-full aspect-[4/5]"
                  hoveredId={hoveredId}
                  onHover={setHoveredId}
                  onClick={() => setSelectedProject(project)}
                />
              ))}
            </div>

            {/* Column 3 */}
            <div className="flex-1 flex flex-col gap-3 md:gap-4 mt-[16px] sm:mt-[22px] md:mt-[26px] lg:mt-[32px]">
              {col3.map((project) => (
                <ProjectPhotoCard
                  key={project.id}
                  project={project}
                  className="w-full aspect-[4/5]"
                  hoveredId={hoveredId}
                  onHover={setHoveredId}
                  onClick={() => setSelectedProject(project)}
                />
              ))}
            </div>
          </div>

          {/* ── Right: typographic project list ── */}
          <div className="flex flex-col gap-4 pt-4 lg:pt-8 flex-1 w-full justify-start">
            <div className="flex flex-col gap-1 w-full">
              <AnimatePresence mode="popLayout">
                {filteredProjects.map((project) => (
                  <motion.div
                    key={project.id}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ProjectRow
                      project={project}
                      hoveredId={hoveredId}
                      onHover={setHoveredId}
                      onClick={() => setSelectedProject(project)}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Immersive Shared Layout Expansion Modal */}
        <AnimatePresence>
          {selectedProject && (
            <div className="fixed inset-0 z-[500] flex items-center justify-center p-4">
              {/* Darkened backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedProject(null)}
                className="absolute inset-0 bg-zinc-950/40 backdrop-blur-md dark:bg-zinc-950/70"
              />

              {/* Expanded Card detail box */}
              <motion.div
                layoutId={`project-card-${selectedProject.id}`}
                className="relative bg-surface dark:bg-zinc-900 w-full max-w-2xl rounded-2xl border border-border/50 shadow-2xl p-6 md:p-8 overflow-hidden z-10 flex flex-col justify-between max-h-[90vh] overflow-y-auto"
              >
                <div className="flex flex-col gap-6 relative z-10">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="font-body text-[10px] font-bold tracking-widest text-[var(--color-accent-skin)] uppercase px-3 py-1 rounded-full border border-[var(--color-accent-skin)]/20 bg-[var(--color-accent-skin)]/10">
                        {selectedProject.role}
                      </span>
                      <h3 className="font-display font-extrabold text-3xl md:text-4xl text-text mt-4">
                        {selectedProject.title}
                      </h3>
                    </div>
                    {/* Close trigger */}
                    <button
                      onClick={() => setSelectedProject(null)}
                      className="w-8 h-8 rounded-full bg-bg-alt flex items-center justify-center text-text-secondary hover:text-text hover:bg-border transition-all duration-300 z-50 shrink-0"
                      aria-label="Close details"
                    >
                      ✕
                    </button>
                  </div>

                  {/* Clean Image Container */}
                  <div className="relative w-full h-[250px] md:h-[300px] rounded-xl overflow-hidden border border-border/50 shadow-sm bg-bg-alt/30 flex items-center justify-center p-4">
                    <img
                      src={PROJECT_IMAGES[selectedProject.id] || selectedProject.image}
                      alt={selectedProject.title}
                      className="max-w-full max-h-full object-contain drop-shadow-xl rounded-lg"
                    />
                  </div>

                  {/* Tech stack row */}
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.tech.map((t) => (
                      <span
                        key={t}
                        className="font-body text-xs bg-bg-alt text-text px-3 py-1.5 rounded-md font-medium border border-border/30"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <p className="font-body text-base md:text-lg text-text-sec leading-relaxed">
                    {selectedProject.description}
                  </p>
                </div>

                <div className="mt-8 flex flex-col sm:flex-row justify-between items-center gap-4 border-t border-border/30 pt-6 relative z-10">
                  <div className="flex w-full sm:w-auto gap-3">
                    <a
                      href={selectedProject.link || "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 sm:flex-none px-6 py-2.5 font-display text-sm font-semibold rounded-lg bg-text text-bg hover:opacity-90 transition-all duration-300 flex items-center justify-center gap-2"
                    >
                      Live App <ArrowUpRight size={16} />
                    </a>
                    <a
                      href={(selectedProject as any).github || "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 sm:flex-none px-6 py-2.5 font-display text-sm font-semibold rounded-lg border border-border/50 bg-surface text-text hover:bg-bg-alt transition-all duration-300 flex items-center justify-center gap-2"
                    >
                      GitHub
                    </a>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────
   Project photo card 
───────────────────────────────────────── */

function ProjectPhotoCard({
  project,
  className,
  hoveredId,
  onHover,
  onClick,
}: {
  project: ProjectType;
  className: string;
  hoveredId: string | null;
  onHover: (id: string | null) => void;
  onClick: () => void;
}) {
  const isActive = hoveredId === project.id;
  const isDimmed = hoveredId !== null && !isActive;

  return (
    <div
      className={cn(
        'overflow-hidden rounded-2xl cursor-pointer flex-shrink-0 transition-all duration-500 relative group border border-border/20 shadow-md',
        className,
        isDimmed ? 'opacity-40 scale-[0.97] blur-[1px]' : 'opacity-100 scale-100 blur-0',
        isActive && 'shadow-xl ring-2 ring-border/20 ring-offset-4 ring-offset-bg dark:ring-offset-zinc-950 scale-[1.02]'
      )}
      onMouseEnter={() => onHover(project.id)}
      onMouseLeave={() => onHover(null)}
      onClick={onClick}
    >
      {/* Soft glowing ambient spotlight behind active card */}
      {isActive && (
        <div
          className="absolute inset-0 opacity-20 blur-2xl transition-opacity duration-500 pointer-events-none"
          style={{
            background: `radial-gradient(circle at center, ${project.color}, transparent 70%)`
          }}
        />
      )}

      <img
        src={PROJECT_IMAGES[project.id] || project.image}
        alt={project.title}
        className="w-full h-full object-cover object-top transition-all duration-700 ease-out"
        style={{
          filter: isActive ? 'grayscale(0) brightness(1.02) contrast(1.02)' : 'grayscale(0.95) brightness(0.7) contrast(0.95)',
        }}
      />
      
      {/* Overlay hover tag representation */}
      <div className={cn(
        "absolute bottom-3 left-3 right-3 bg-zinc-950/80 dark:bg-zinc-900/90 backdrop-blur-md border border-white/10 p-2.5 rounded-xl z-20 flex justify-between items-center transition-all duration-300",
        isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
      )}>
        <div className="text-left">
          <p className="text-[9px] font-display font-medium uppercase tracking-wider text-zinc-400">{project.role}</p>
          <h4 className="text-xs font-semibold text-white mt-0.5">{project.title}</h4>
        </div>
        <span className="text-zinc-400 group-hover:text-[var(--color-accent-skin)] transition-colors">
          <ArrowUpRight size={14} />
        </span>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   Project list row
───────────────────────────────────────── */

function ProjectRow({
  project,
  hoveredId,
  onHover,
  onClick,
}: {
  project: ProjectType;
  hoveredId: string | null;
  onHover: (id: string | null) => void;
  onClick: () => void;
}) {
  const isActive = hoveredId === project.id;
  const isDimmed = hoveredId !== null && !isActive;

  return (
    <div
      className={cn(
        'cursor-pointer transition-all duration-300 py-4 border-b border-border/20 flex flex-col justify-center relative group',
        isDimmed ? 'opacity-40' : 'opacity-100',
      )}
      onMouseEnter={() => onHover(project.id)}
      onMouseLeave={() => onHover(null)}
      onClick={onClick}
    >
      {/* Title block */}
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center gap-3">
          <span
            className={cn(
              'h-3 rounded-[5px] flex-shrink-0 transition-all duration-500 ease-out',
              isActive ? 'w-6' : 'bg-text/25 w-3',
            )}
            style={{
              backgroundColor: isActive ? project.color : undefined
            }}
          />
          <span
            className={cn(
              'text-lg md:text-xl font-display font-bold tracking-tight transition-colors duration-300',
              isActive ? 'text-text' : 'text-text/75',
            )}
          >
            {project.title}
          </span>
        </div>

        {/* Quick actions that slide in on hover */}
        <div
          className={cn(
            'flex items-center gap-2 transition-all duration-300',
            isActive
              ? 'opacity-100 translate-x-0'
              : 'opacity-0 -translate-x-4 pointer-events-none',
          )}
        >
          <button
            onClick={(e) => {
              e.stopPropagation();
              onClick();
            }}
            className="p-1.5 rounded-full border border-border/40 hover:border-border hover:bg-surface/50 text-text transition-all duration-150 hover:scale-110 flex items-center justify-center"
            title="View Details"
          >
            <Info size={12} />
          </button>
          
          {project.link && project.link !== "#" && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="p-1.5 rounded-full bg-text text-bg hover:opacity-90 transition-all duration-150 hover:scale-110 flex items-center justify-center"
              title="Launch App"
            >
              <ArrowUpRight size={12} />
            </a>
          )}
        </div>
      </div>

      {/* Role and short tech summary */}
      <div className="flex items-center justify-between mt-2 pl-6">
        <p className="text-[9px] md:text-xs font-body font-semibold uppercase tracking-[0.2em] text-text-tertiary">
          {project.role}
        </p>
        
        {/* Condensed tech badges that pop up when active */}
        <div className={cn(
          "flex gap-1 transition-all duration-300",
          isActive ? "opacity-100 translate-x-0" : "opacity-40 translate-x-0"
        )}>
          {project.tech.slice(0, 3).map((t) => (
            <span key={t} className="text-[8px] md:text-[9px] font-body bg-surface border border-border/20 text-text-secondary px-1.5 py-0.5 rounded-md">
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

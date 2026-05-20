"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { projects } from "@/lib/data";
import { MagneticCard } from "./ui/MagneticCard";
import Image from "next/image";

type ProjectType = typeof projects[number];

const CATEGORIES = ["All", "Mobile Apps", "Web Apps", "AI & Security"];

export default function ProjectsSection() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedProject, setSelectedProject] = useState<ProjectType | null>(null);

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

  return (
    <section id="projects" className="py-24 px-6 md:px-12 lg:px-24 bg-bg border-t border-border/50 relative">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h2 className="font-display font-extrabold text-4xl md:text-5xl tracking-tight text-text leading-tight">
              Selected <span className="underline decoration-accent decoration-2 underline-offset-8">Projects</span>
            </h2>
            <p className="font-body text-text-tertiary text-sm md:text-base max-w-md mt-4 leading-relaxed">
              A curated collection of mobile applications, full-stack web platforms, and intelligent agent pipelines.
            </p>
          </div>

          {/* Dynamic Filtering Tabs */}
          <div className="flex flex-wrap gap-2 bg-surface p-1 rounded-full border border-border/50 self-start md:self-end">
            {CATEGORIES.map((category) => {
              const isActive = activeCategory === category;
              return (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className="relative px-5 py-2 font-display text-xs md:text-sm font-semibold uppercase tracking-wider text-text-secondary hover:text-text rounded-full transition-colors duration-200"
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeFilter"
                      className="absolute inset-0 bg-bg-alt/80 border border-border/60 rounded-full shadow-inner"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{category}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Dynamic Project Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="group h-[400px]"
              >
                <MagneticCard
                  layoutId={`project-card-${project.id}`}
                  glowColor={`${project.color}25`}
                  onClick={() => setSelectedProject(project)}
                  className="h-full w-full flex flex-col justify-between p-6 border border-border/40 group-hover:border-border transition-colors duration-300"
                >
                  <div className="flex flex-col gap-4 w-full h-full justify-between" data-cursor="view">
                    {/* Project Top Segment: Title and Tape Effect */}
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="font-body text-xs font-semibold tracking-widest text-text-tertiary uppercase">
                          {project.role}
                        </span>
                        <h3 className="font-display font-bold text-2xl text-text mt-1">
                          {project.title}
                        </h3>
                      </div>
                      
                      {/* Decorative brand icon dot */}
                      <span
                        className="w-3 h-3 rounded-full shadow-md shrink-0 mt-2"
                        style={{ backgroundColor: project.color, boxShadow: `0 0 12px ${project.color}` }}
                      />
                    </div>

                    {/* Project Visual Body: Elegant Graphic / Fallback Backdrop */}
                    <div className="relative w-full h-44 rounded-xl overflow-hidden bg-bg-alt/20 border border-border/20 flex items-center justify-center group-hover:scale-[1.02] transition-transform duration-500">
                      {/* Interactive mesh gradient that morphs on hover */}
                      <div
                        className="absolute inset-0 opacity-40 group-hover:opacity-60 transition-opacity duration-500 blur-xl"
                        style={{
                          background: `radial-gradient(circle at 30% 30%, ${project.color}30, transparent 60%), 
                                       radial-gradient(circle at 70% 70%, var(--color-bg-alt)50, transparent 60%)`
                        }}
                      />
                      
                      <div className="absolute inset-0 bg-gradient-to-tr from-surface/90 to-transparent z-10" />

                      {/* Display abstract layout text representation */}
                      <div className="relative z-20 flex flex-col items-center select-none text-center">
                        <span className="font-display font-black text-6xl opacity-10 tracking-widest uppercase mb-1">
                          {project.title.substring(0, 2)}
                        </span>
                        <div className="flex flex-wrap gap-1 px-4 justify-center">
                          {project.tech.map(t => (
                            <span key={t} className="font-body text-[9px] bg-bg/80 border border-border/30 text-text-secondary px-2 py-0.5 rounded-full">
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Bottom segment */}
                    <div className="flex justify-between items-center mt-2">
                      <p className="font-body text-xs text-text-tertiary line-clamp-2 max-w-[80%]">
                        {project.description}
                      </p>
                      <div className="w-8 h-8 rounded-full border border-border/60 flex items-center justify-center bg-surface group-hover:bg-accent group-hover:text-bg transition-colors duration-300">
                        <span className="text-sm font-semibold font-display">→</span>
                      </div>
                    </div>
                  </div>
                </MagneticCard>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

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
                className="absolute inset-0 bg-bg-alt/70 backdrop-blur-md"
              />

              {/* Expanded Card detail box */}
              <motion.div
                layoutId={`project-card-${selectedProject.id}`}
                className="relative bg-surface w-full max-w-2xl rounded-3xl border border-border shadow-2xl p-8 md:p-12 overflow-hidden z-10 flex flex-col justify-between"
              >
                {/* Dynamic Spotlight backdrop overlay in the modal */}
                <div
                  className="absolute -top-40 -right-40 w-96 h-96 rounded-full blur-3xl opacity-20 pointer-events-none"
                  style={{ backgroundColor: selectedProject.color }}
                />

                <div className="flex flex-col gap-6" data-cursor="close">
                  {/* Close floating badge trigger */}
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="absolute top-6 right-6 w-10 h-10 rounded-full border border-border/50 bg-bg/80 flex items-center justify-center text-text hover:bg-accent hover:text-bg transition-all duration-300"
                    aria-label="Close details"
                  >
                    ✕
                  </button>

                  <div>
                    <span className="font-body text-xs font-semibold tracking-widest text-text-tertiary uppercase px-3 py-1 rounded-full border border-border/40 bg-bg/50">
                      {selectedProject.role}
                    </span>
                    <h3 className="font-display font-extrabold text-3xl md:text-4xl text-text mt-4">
                      {selectedProject.title}
                    </h3>
                  </div>

                  {/* Tech stack row */}
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.tech.map((t) => (
                      <span
                        key={t}
                        className="font-body text-xs bg-bg border border-border/60 text-text-secondary px-3 py-1 rounded-full font-medium"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* Ambient graphic segment */}
                  <div
                    className="relative w-full h-48 rounded-2xl overflow-hidden border border-border/30 flex items-center justify-center"
                    style={{
                      background: `linear-gradient(135deg, ${selectedProject.color}15, var(--color-bg-alt)30)`
                    }}
                  >
                    <div
                      className="absolute w-72 h-72 rounded-full blur-3xl opacity-30"
                      style={{ backgroundColor: selectedProject.color }}
                    />
                    <span className="font-display font-black text-7xl opacity-5 tracking-widest uppercase">
                      {selectedProject.title}
                    </span>
                  </div>

                  <p className="font-body text-sm md:text-base text-text-secondary leading-relaxed mt-2">
                    {selectedProject.description}
                  </p>
                </div>

                <div className="mt-8 flex justify-end gap-4 border-t border-border/30 pt-6">
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="px-6 py-2.5 font-display text-xs md:text-sm font-semibold uppercase tracking-wider rounded-full border border-border text-text hover:bg-bg-alt/30 transition-all duration-200"
                  >
                    Close Details
                  </button>
                  <a
                    href={selectedProject.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-2.5 font-display text-xs md:text-sm font-semibold uppercase tracking-wider rounded-full bg-accent text-bg hover:bg-accent-light transition-all duration-200 flex items-center gap-2"
                  >
                    Launch App <span>↗</span>
                  </a>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

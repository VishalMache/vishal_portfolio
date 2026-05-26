"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Trophy, Code, Target, Rocket, Medal } from "lucide-react";

const milestones = [
  {
    id: "innovare",
    icon: Rocket,
    title: "Tech Lead",
    subtitle: "INNOVARE (IEEE Student Chapter)",
    date: "2023 - Present",
    description: "Leading technical initiatives, organizing hackathons, and fostering a culture of innovation and learning.",
    gradient: "from-[var(--color-accent-skin)]/20 to-[var(--color-accent-skin)]/5",
    iconColor: "text-[var(--color-accent-skin)]",
  },
  {
    id: "ai-hackathon",
    icon: Trophy,
    title: "1st Place Winner",
    subtitle: "AI Agent Hackathon",
    date: "2023",
    description: "Built an autonomous AI agent solution.",
    gradient: "from-[var(--color-accent-skin)]/20 to-[var(--color-accent-skin)]/5",
    iconColor: "text-[var(--color-accent-skin)]",
  },
  {
    id: "codebhoomi",
    icon: Medal,
    title: "2nd Runner Up",
    subtitle: "Codebhoomi Datathon",
    date: "2023",
    description: "Data-driven problem solving under pressure.",
    gradient: "from-[var(--color-accent-skin)]/20 to-[var(--color-accent-skin)]/5",
    iconColor: "text-[var(--color-accent-skin)]",
  },
  {
    id: "sih",
    icon: Target,
    title: "Internal Round Cleared",
    subtitle: "Smart India Hackathon (SIH)",
    date: "2023",
    description: "Selected to represent the institution.",
    gradient: "from-[var(--color-accent-skin)]/20 to-[var(--color-accent-skin)]/5",
    iconColor: "text-[var(--color-accent-skin)]",
  },
  {
    id: "active-competitor",
    icon: Code,
    title: "Active Competitor",
    subtitle: "Multiple National-Level Hackathons",
    date: "Ongoing",
    description: "Constantly pushing boundaries and building innovative solutions at scale.",
    gradient: "from-[var(--color-accent-skin)]/20 to-[var(--color-accent-skin)]/5",
    iconColor: "text-[var(--color-accent-skin)]",
  },
];

const MilestoneCard = ({ milestone, index }: { milestone: any; index: number }) => {
  const Icon = milestone.icon;
  
  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-20%" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="relative flex flex-col md:flex-row gap-5 md:gap-8 items-start group py-6"
    >
      {/* Floating Glowing Icon Orb */}
      <div className="relative shrink-0">
        <div className={`absolute inset-0 bg-gradient-to-br ${milestone.gradient} blur-xl opacity-50 group-hover:opacity-100 transition-opacity duration-700 rounded-full`} />
        <div className={`relative w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/40 dark:bg-black/40 border border-black/5 dark:border-white/10 flex items-center justify-center backdrop-blur-md shadow-sm group-hover:scale-110 transition-transform duration-500 group-hover:border-[var(--color-accent-skin)]/30`}>
          <Icon size={20} strokeWidth={1.5} className={`${milestone.iconColor} group-hover:text-[var(--color-accent-skin)] transition-colors duration-500`} />
        </div>
      </div>

      <div className="pt-0 md:pt-1 relative z-10">
        <h3 className="text-xl md:text-2xl font-display font-bold text-text group-hover:text-[var(--color-accent-skin)] transition-colors duration-500 tracking-tight">
          {milestone.title}
        </h3>
        <p className="text-base md:text-lg font-medium text-text-sec mt-1 mb-3">
          {milestone.subtitle}
        </p>
        <p className="text-sm md:text-base leading-relaxed text-text-tertiary max-w-lg border-l-2 border-transparent group-hover:border-[var(--color-accent-skin)]/30 pl-0 group-hover:pl-4 transition-all duration-500">
          {milestone.description}
        </p>
      </div>
    </motion.div>
  );
};

export default function MilestonesSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Create a subtle parallax effect for the sticky section background or elements
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const yParallax = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacityFade = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <section 
      id="journey" 
      className="relative py-12 md:py-24 lg:py-32 overflow-visible bg-[var(--color-bg)]"
      ref={containerRef}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-start lg:justify-between gap-16 lg:gap-24 relative">
          
          {/* Left Column: Sticky Title */}
          <div className="w-full lg:w-5/12 lg:sticky lg:top-32 lg:h-[calc(100vh-16rem)] flex flex-col justify-center">
            <motion.div>
              <span className="inline-block py-1.5 px-4 rounded-full bg-[var(--color-accent-skin)]/10 text-[var(--color-accent-skin)] text-sm font-semibold tracking-wider uppercase mb-6 border border-[var(--color-accent-skin)]/20 shadow-sm">
                Milestones
              </span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-text mb-6 tracking-tight leading-tight">
                The <br className="hidden lg:block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-accent-skin)] to-[#A36D53]">Journey</span> <br className="hidden lg:block" />
                So Far.
              </h2>
              <p className="text-base md:text-lg text-text-sec leading-relaxed max-w-lg border-l-2 border-[var(--color-accent-skin)]/30 pl-6">
                A timeline of leadership, competitive programming, and building solutions that push boundaries.
              </p>
              
              {/* Optional Decorative Elements */}
              <motion.div 
                style={{ y: yParallax }}
                className="absolute -z-10 -left-20 top-20 w-72 h-72 bg-[var(--color-accent-skin)]/5 rounded-full blur-[80px]" 
              />
            </motion.div>
          </div>

          {/* Right Column: Scrolling Cards */}
          <div className="w-full lg:w-6/12 xl:w-5/12 flex flex-col space-y-10 md:space-y-16 lg:pt-32 lg:pb-16">
            {milestones.map((milestone, index) => (
              <MilestoneCard key={milestone.id} milestone={milestone} index={index} />
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}


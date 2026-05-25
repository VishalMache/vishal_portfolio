"use client";

import { motion } from "framer-motion";
import { education, passions, services, personalInfo } from "@/lib/data";
import { GraduationCap, PenTool, Coffee, BrainCircuit, Gamepad2, Smartphone, Globe, Server, Bot, Code } from "lucide-react";

const iconMap: Record<string, React.ElementType> = {
  PenTool, Coffee, BrainCircuit, Gamepad2, Smartphone, Globe, Server, Bot, GraduationCap, Code
};

export default function AboutSection() {
  return (
    <section id="about" className="py-12 md:py-24 lg:py-32 bg-[var(--color-bg)] text-text relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20 max-w-4xl"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold tracking-tight mb-8">About Me</h2>
          <div className="text-xl md:text-2xl text-text-sec leading-relaxed space-y-6">
            <p>{personalInfo.bio}</p>
          </div>
        </motion.div>

        {/* Education */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-24 max-w-4xl"
        >
          <h3 className="text-sm font-bold tracking-[0.2em] text-[var(--color-accent-skin)] uppercase mb-8 pb-4 border-b border-black/10 dark:border-white/10">
            Education
          </h3>
          <div className="pl-0 md:pl-4">
             <h4 className="text-3xl font-bold mb-3">{education.degree}</h4>
             <p className="text-xl text-text-sec mb-6">{education.university}</p>
             <p className="text-text-tertiary font-medium uppercase tracking-widest text-sm">
                {education.period} <span className="mx-4 opacity-30">|</span> CGPA: {education.cgpa}
             </p>
          </div>
        </motion.div>

        {/* Two Column Layout for Capabilities & Passions */}
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
          
          {/* Capabilities */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:w-1/2"
          >
            <h3 className="text-sm font-bold tracking-[0.2em] text-[var(--color-accent-skin)] uppercase mb-10 pb-4 border-b border-black/10 dark:border-white/10">
              Capabilities
            </h3>
            <div className="flex flex-col gap-10 pl-0 md:pl-4">
               {services.map(s => {
                  const Icon = iconMap[s.iconName] || Globe;
                  return (
                     <div key={s.title} className="flex items-start gap-5 group">
                        <div className="p-3 rounded-full bg-[var(--color-accent-skin)]/10 text-[var(--color-accent-skin)] shrink-0 mt-1">
                          <Icon size={24} strokeWidth={1.5} />
                        </div>
                        <div>
                          <h4 className="text-xl font-bold mb-2">{s.title}</h4>
                          <p className="text-text-sec leading-relaxed">{s.description}</p>
                        </div>
                     </div>
                  );
               })}
            </div>
          </motion.div>

          {/* What I Love */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:w-1/2"
          >
            <h3 className="text-sm font-bold tracking-[0.2em] text-[var(--color-accent-skin)] uppercase mb-10 pb-4 border-b border-black/10 dark:border-white/10">
              What I Love
            </h3>
            <div className="flex flex-col gap-10 pl-0 md:pl-4">
               {passions.map(p => {
                  const Icon = iconMap[p.iconName] || Coffee;
                  return (
                     <div key={p.title} className="flex items-start gap-5 group">
                        <div className="p-3 rounded-full bg-black/5 dark:bg-white/5 text-text-tertiary group-hover:bg-[var(--color-accent-skin)]/10 group-hover:text-[var(--color-accent-skin)] transition-colors duration-300 shrink-0 mt-1">
                          <Icon size={24} strokeWidth={1.5} />
                        </div>
                        <div>
                          <h4 className="text-xl font-bold mb-2 transition-colors duration-300 group-hover:text-[var(--color-accent-skin)]">{p.title}</h4>
                          <p className="text-text-sec leading-relaxed">{p.description}</p>
                        </div>
                     </div>
                  );
               })}
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}

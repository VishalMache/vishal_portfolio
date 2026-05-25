"use client";

import React from "react";
import { Mail, ArrowUpRight, Code2, Briefcase, MessageSquare } from "lucide-react";
import { personalInfo } from "@/lib/data";

export default function ContactSection() {
  return (
    <section id="contact" className="py-24 sm:py-32 bg-[var(--color-bg)] relative overflow-hidden">
      {/* Subtle Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[var(--color-accent-skin)]/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <span className="inline-block py-1.5 px-4 rounded-full bg-[var(--color-accent-skin)]/10 text-[var(--color-accent-skin)] text-sm font-semibold tracking-wider uppercase mb-6 border border-[var(--color-accent-skin)]/20 shadow-sm">
          Get In Touch
        </span>
        
        <h2 className="text-3xl md:text-4xl font-display font-bold text-text mb-6">
          Let's build something amazing together.
        </h2>
        
        <p className="text-base md:text-lg text-text-sec max-w-2xl mx-auto mb-10 leading-relaxed font-body">
          I'm currently available for new opportunities. Whether you have a question, a project idea, or just want to say hi, I'll try my best to get back to you!
        </p>

        <a 
          href={`mailto:${personalInfo.email}`}
          className="inline-flex items-center gap-2 px-8 py-4 bg-text text-bg hover:opacity-90 transition-all rounded-full font-display font-semibold text-base shadow-[0_0_20px_color-mix(in_srgb,var(--color-text)_20%,transparent)] hover:scale-105 active:scale-95"
        >
          <Mail size={18} />
          Say Hello
        </a>

        <div className="mt-20 pt-10 border-t border-border/50 flex flex-wrap justify-center items-center gap-x-8 gap-y-4">
          <a href={personalInfo.github} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-text-sec hover:text-[var(--color-accent-skin)] transition-colors font-medium text-sm">
            <Code2 size={16} /> GitHub <ArrowUpRight size={14} className="opacity-50" />
          </a>
          <a href={personalInfo.linkedin} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-text-sec hover:text-[var(--color-accent-skin)] transition-colors font-medium text-sm">
            <Briefcase size={16} /> LinkedIn <ArrowUpRight size={14} className="opacity-50" />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noreferrer" className="flex items-center gap-2 text-text-sec hover:text-[var(--color-accent-skin)] transition-colors font-medium text-sm">
            <MessageSquare size={16} /> Twitter <ArrowUpRight size={14} className="opacity-50" />
          </a>
        </div>
      </div>
    </section>
  );
}

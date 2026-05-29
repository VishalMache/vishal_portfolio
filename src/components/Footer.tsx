"use client";

import React from "react";
import { personalInfo } from "@/lib/data";
import { Trophy, Mail, Phone } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="w-full bg-[var(--color-bg-alt)] border-t border-border/40 relative z-20 pt-12 md:pt-16 pb-24 md:pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Column 1: Branding & Info */}
          <div className="flex flex-col space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[var(--color-accent-skin)]/10 flex items-center justify-center border border-[var(--color-accent-skin)]/20 shadow-sm">
                <span className="font-display font-bold text-[var(--color-accent-skin)] text-lg">VM</span>
              </div>
              <span className="font-display font-bold text-xl text-text">{personalInfo.name}</span>
            </div>
            <div className="space-y-3">
              <p className="text-sm font-medium text-text-sec">Android & Full-Stack Developer</p>
            </div>
          </div>

          {/* Column 2: Site Links */}
          <div className="flex flex-col space-y-6">
            <h4 className="font-display font-bold text-text text-lg">Site</h4>
            <nav className="flex flex-col space-y-4">
              {['Home', 'About', 'Milestones', 'Projects', 'Tech Stack'].map((item) => (
                <a key={item} href={`#${item.toLowerCase().replace(' ', '-')}`} className="text-sm font-medium text-text-sec hover:text-[var(--color-accent-skin)] transition-colors w-fit">
                  {item}
                </a>
              ))}
            </nav>
          </div>

          {/* Column 3: Projects */}
          <div className="flex flex-col space-y-6">
            <h4 className="font-display font-bold text-text text-lg">Projects</h4>
            <div className="flex flex-col space-y-5">
              <a href="#projects" className="group cursor-pointer block">
                <p className="text-sm font-medium text-text-sec group-hover:text-[var(--color-accent-skin)] transition-colors">SyncMe</p>
                <p className="text-xs text-text-tertiary mt-1">Real-time Location Tracking</p>
              </a>
              <a href="#projects" className="group cursor-pointer block">
                <p className="text-sm font-medium text-text-sec group-hover:text-[var(--color-accent-skin)] transition-colors">Quantisense</p>
                <p className="text-xs text-text-tertiary mt-1">Multi-agent AI Architecture</p>
              </a>
              <a href="#projects" className="group cursor-pointer block">
                <p className="text-sm font-medium text-text-sec group-hover:text-[var(--color-accent-skin)] transition-colors">Cyphex</p>
                <p className="text-xs text-text-tertiary mt-1">Cybersecurity Platform</p>
              </a>
            </div>
          </div>

          {/* Column 4: Contact Card */}
          <div className="flex flex-col h-full">
            <div className="bg-surface/50 dark:bg-zinc-800/40 border border-border/50 backdrop-blur-md rounded-2xl p-6 md:p-8 relative overflow-hidden group shadow-sm h-full flex flex-col justify-center transition-all hover:border-[var(--color-accent-skin)]/30">
              
              {/* Subtle Ambient Glow */}
              <div className="absolute -top-12 -right-12 w-40 h-40 bg-[var(--color-accent-skin)]/10 rounded-full blur-[50px] pointer-events-none group-hover:bg-[var(--color-accent-skin)]/20 transition-colors" />

              <h4 className="font-display font-bold text-text text-2xl mb-2 relative z-10">Get in touch</h4>
              <p className="text-sm text-text-sec leading-relaxed mb-8 relative z-10">
                Have an idea, opportunity, or problem worth solving? Let's talk.
              </p>
              
              <div className="mt-auto relative z-10 flex flex-col space-y-4">
                <a 
                  href="mailto:mr.vishalmache@gmail.com"
                  className="inline-flex items-center gap-3 text-[13px] sm:text-sm font-medium text-text-tertiary hover:text-[var(--color-accent-skin)] transition-colors break-words"
                >
                  <div className="w-8 h-8 rounded-full bg-border/40 dark:bg-black/20 flex items-center justify-center shrink-0">
                    <Mail size={14} className="text-text-sec" />
                  </div>
                  mr.vishalmache@gmail.com
                </a>
                
                <a 
                  href="tel:+91"
                  className="inline-flex items-center gap-3 text-sm font-medium text-text-tertiary hover:text-[var(--color-accent-skin)] transition-colors"
                >
                  <div className="w-8 h-8 rounded-full bg-border/40 dark:bg-black/20 flex items-center justify-center shrink-0">
                    <Phone size={14} className="text-text-sec" />
                  </div>
                  +91 XXXXX XXXXX
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border/40 flex justify-center items-center">
          <p className="text-xs sm:text-sm font-medium text-text-tertiary font-body text-center">
            &copy; {currentYear} {personalInfo.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

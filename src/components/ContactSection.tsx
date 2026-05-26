"use client";

import React, { useState } from "react";
import { Mail, ArrowUpRight, Code2, Briefcase, MessageSquare, Send } from "lucide-react";
import { personalInfo } from "@/lib/data";

export default function ContactSection() {
  const [message, setMessage] = useState("");

  const handleWhatsAppSend = () => {
    if (!message.trim()) return;
    // Format the phone number to remove spaces and pluses
    const formattedPhone = personalInfo.phone.replace(/[^0-9]/g, "");
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${formattedPhone}?text=${encodedMessage}`, "_blank");
    setMessage(""); // Optional: clear message after sending
  };

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
          I'm currently available for new opportunities. Whether you have a question, a project idea, or just want to say hi, send me a direct message!
        </p>

        {/* WhatsApp Message Box */}
        <div className="max-w-xl mx-auto bg-black/5 dark:bg-white/5 p-2 rounded-3xl border border-black/10 dark:border-white/10 shadow-lg backdrop-blur-sm flex flex-col sm:flex-row gap-2 relative z-20 transition-all duration-500 hover:shadow-xl">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message here..."
            className="w-full bg-transparent border-none outline-none resize-none px-4 py-4 text-text placeholder:text-text-sec/60 min-h-[60px] sm:h-auto font-body transition-all duration-300"
            rows={1}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleWhatsAppSend();
              }
            }}
          />
          <button
            onClick={handleWhatsAppSend}
            disabled={!message.trim()}
            className="flex-shrink-0 flex items-center justify-center gap-2 px-8 py-3 bg-[var(--color-accent-skin)] text-white hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-500 ease-out rounded-full font-display font-semibold text-base shadow-[0_0_20px_color-mix(in_srgb,var(--color-accent-skin)_40%,transparent)] hover:scale-[1.05] active:scale-95"
          >
            <Send size={18} />
            <span className="hidden sm:inline">Send</span>
          </button>
        </div>
        <p className="mt-4 text-xs text-text-sec/60 font-mono">
          Or reach out via email: <a href={`mailto:${personalInfo.email}`} className="underline hover:text-[var(--color-accent-skin)] transition-colors">{personalInfo.email}</a>
        </p>

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

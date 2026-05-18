"use client";

import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import MenuOverlay from "@/components/MenuOverlay";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import TechStackSection from "@/components/TechStackSection";
import ThemeToggle from "@/components/ThemeToggle";
import Preloader from "@/components/Preloader";
import { personalInfo } from "@/lib/data";

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="app-layout">
      <Preloader />
      {/* Persistent sidebar (desktop) */}
      <Sidebar onMenuToggle={() => setIsMenuOpen(true)} />

      {/* Mobile header */}
      <header className="mobile-header">
        <div className="mobile-header__logo">VM</div>
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <ThemeToggle />
          <button
            className="mobile-header__menu"
            onClick={() => setIsMenuOpen(true)}
            aria-label="Open menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </header>

      {/* Full-screen menu overlay */}
      <MenuOverlay
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
      />

      {/* Main content */}
      <main className="main-content">
        <HeroSection />
        <AboutSection />
        <TechStackSection />
      </main>
    </div>
  );
}

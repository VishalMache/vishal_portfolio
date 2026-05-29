"use client";

import FloatingNavbar from "@/components/FloatingNavbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import TechStackSection from "@/components/TechStackSection";
import ProjectsSection from "@/components/ProjectsSection";
import Preloader from "@/components/Preloader";
import { CustomCursor } from "@/components/ui/CustomCursor";
import AiAssistant from "@/components/AiAssistant";
import { InteractiveAurora } from "@/components/ui/interactive-aurora";
import { InteractiveMagneticGrid } from "@/components/ui/interactive-magnetic-grid";

import MilestonesSection from "@/components/MilestonesSection";

import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="app-layout">
      <CustomCursor />
      <Preloader />
      
      {/* Global Interactive Backgrounds */}
      <InteractiveAurora />
      <InteractiveMagneticGrid />

      {/* Floating minimalist branding logo */}
      <a
        href="#home"
        onClick={(e) => {
          e.preventDefault();
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
        className="floating-logo"
        aria-label="Home"
      >
        VM
      </a>

      {/* Premium floating capsule navbar */}
      <FloatingNavbar />

      {/* Main content */}
      <main className="main-content">
        <HeroSection />
        <AboutSection />
        <MilestonesSection />
        <ProjectsSection />
        <TechStackSection />
        <ContactSection />
        <Footer />
      </main>

      {/* AI Assistant Chat Bar */}
      <AiAssistant />
    </div>
  );
}


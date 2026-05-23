"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Home, User, Cpu, LayoutGrid, Sun, Moon } from "lucide-react";

export default function FloatingNavbar() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const [activeSection, setActiveSection] = useState("home");

  // Handle mounting on client to prevent server/client mismatch
  useEffect(() => {
    setMounted(true);

    const handleScroll = () => {
      const sections = ["home", "about", "tech-stack", "projects"];
      // Look at scroll position offsetted by some viewport spacing for a natural transition
      const scrollPosition = window.scrollY + window.innerHeight / 3;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    // Trigger once on mount
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!mounted) {
    return null; // Render nothing on server
  }

  const handleScrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className="floating-nav" role="navigation" aria-label="Floating Navigation" data-cursor-guide="Navigation — jump to any section instantly.">
      {/* Rotated Brand Title Text (Desktop only) */}
      <div className="floating-nav__text-wrapper">
        <span className="floating-nav__text">
          Vishal Mache &bull; Dev &amp; Designer
        </span>
      </div>

      {/* Main Container of Navigation Items */}
      <div className="floating-nav__container">
        
        {/* Section 1: Core Navigation (Home, About, Stacks, Projects) */}
        <div className="floating-nav__item-group">
          {/* Home */}
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
              setActiveSection("home");
            }}
            className={`floating-nav__btn ${activeSection === "home" ? "active" : ""}`}
            aria-label="Home"
          >
            <Home size={17} strokeWidth={1.75} />
            <span className="floating-nav__tooltip">Home</span>
          </a>

          {/* About Me */}
          <a
            href="#about"
            onClick={(e) => {
              e.preventDefault();
              handleScrollTo("about");
              setActiveSection("about");
            }}
            className={`floating-nav__btn ${activeSection === "about" ? "active" : ""}`}
            aria-label="About Me"
          >
            <User size={17} strokeWidth={1.75} />
            <span className="floating-nav__tooltip">About</span>
          </a>

          {/* Stacks */}
          <a
            href="#tech-stack"
            onClick={(e) => {
              e.preventDefault();
              handleScrollTo("tech-stack");
              setActiveSection("tech-stack");
            }}
            className={`floating-nav__btn ${activeSection === "tech-stack" ? "active" : ""}`}
            aria-label="Tech Stack"
          >
            <Cpu size={17} strokeWidth={1.75} />
            <span className="floating-nav__tooltip">Stacks</span>
          </a>

          {/* Projects */}
          <a
            href="#projects"
            onClick={(e) => {
              e.preventDefault();
              handleScrollTo("projects");
              setActiveSection("projects");
            }}
            className={`floating-nav__btn ${activeSection === "projects" ? "active" : ""}`}
            aria-label="Projects"
          >
            <LayoutGrid size={17} strokeWidth={1.75} />
            <span className="floating-nav__tooltip">Projects</span>
          </a>
        </div>

        {/* Divider */}
        <div className="floating-nav__divider" />

        {/* Section 2: Utilities (Theme Mode Toggle) */}
        <div className="floating-nav__item-group relative">
          
          {/* Theme Toggle */}
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="floating-nav__btn theme-btn"
            aria-label="Toggle Dark Mode"
          >
            {theme === "dark" ? (
              <Sun size={17} strokeWidth={1.75} className="rotate-transition" />
            ) : (
              <Moon size={17} strokeWidth={1.75} className="rotate-transition" />
            )}
            <span className="floating-nav__tooltip">
              {theme === "dark" ? "Light Mode" : "Dark Mode"}
            </span>
          </button>

        </div>
      </div>
    </nav>
  );
}

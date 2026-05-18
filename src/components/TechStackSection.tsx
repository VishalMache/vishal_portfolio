"use client";

import { useEffect, useRef } from "react";
import { 
  SiPython, SiJavascript, SiTypescript, SiDart, 
  SiFlutter, SiReact, SiNextdotjs, SiFlask, 
  SiSupabase, SiFirebase, SiPostgresql, SiSqlite, 
  SiFigma, SiAndroidstudio 
} from "react-icons/si";
import { FaJava, FaGitAlt, FaGithub, FaTerminal } from "react-icons/fa";
import { Dock, DockIcon } from "./ui/dock";

const TECH_CATEGORIES = [
  {
    title: "Languages",
    description: "Core programming languages I use to build robust and scalable logic.",
    skills: [
      { name: "Python", icon: SiPython, color: "#3776AB" },
      { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
      { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E" },
      { name: "Dart", icon: SiDart, color: "#0175C2" },
      { name: "Java", icon: FaJava, color: "#007396" },
    ]
  },
  {
    title: "Frameworks & Libraries",
    description: "Tools for creating immersive frontends and robust API services.",
    skills: [
      { name: "Flutter", icon: SiFlutter, color: "#02569B" },
      { name: "React", icon: SiReact, color: "#61DAFB" },
      { name: "Next.js", icon: SiNextdotjs, color: "#000000" },
      { name: "Flask", icon: SiFlask, color: "#000000" },
    ]
  },
  {
    title: "Backend & Database",
    description: "Engines and systems for data persistence and authentication.",
    skills: [
      { name: "Supabase", icon: SiSupabase, color: "#3ECF8E" },
      { name: "Firebase", icon: SiFirebase, color: "#FFCA28" },
      { name: "PostgreSQL", icon: SiPostgresql, color: "#4169E1" },
      { name: "SQLite", icon: SiSqlite, color: "#003B57" },
    ]
  },
  {
    title: "Development Tools",
    description: "Environments and utilities to accelerate design and deployment.",
    skills: [
      { name: "VS Code", icon: FaTerminal, color: "#007ACC" },
      { name: "Figma", icon: SiFigma, color: "#F24E1E" },
      { name: "Git", icon: FaGitAlt, color: "#F05032" },
      { name: "GitHub", icon: FaGithub, color: "#181717" },
      { name: "Android Studio", icon: SiAndroidstudio, color: "#3DDC84" },
    ]
  }
];

export default function TechStackSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll(".tech-reveal");
    elements.forEach((el) => observer.observe(el));

    return () => elements.forEach((el) => observer.unobserve(el));
  }, []);

  return (
    <section id="tech-stack" className="tech-section" ref={sectionRef}>
      <div className="tech-container">
        {/* Section Header */}
        <div className="tech-header tech-reveal">
          <h2 className="section-title">Tech Stack</h2>
          <p className="tech-subtitle">The tools, environments, and languages I use to bring products to life.</p>
          <div className="section-line"></div>
        </div>

        {/* 2x2 Grid of Tech Categories */}
        <div className="tech-grid">
          {TECH_CATEGORIES.map((category, catIndex) => (
            <div 
              key={category.title} 
              className="tech-card tech-reveal" 
              style={{ transitionDelay: `${catIndex * 0.1}s` }}
            >
              <h3 className="tech-card-title">{category.title}</h3>
              <p className="tech-card-desc">{category.description}</p>
              
              <Dock className="tech-dock" iconSize={36} maxAdditionalSize={8}>
                {category.skills.map((skill) => {
                  const Icon = skill.icon;
                  return (
                    <DockIcon
                      key={skill.name}
                      name={skill.name}
                      href={`#${skill.name.toLowerCase()}`}
                      style={{ '--hover-color': skill.color } as React.CSSProperties}
                    >
                      <Icon />
                    </DockIcon>
                  );
                })}
              </Dock>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

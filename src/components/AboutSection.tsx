"use client";

import { useEffect, useRef } from "react";
import { education, passions, services } from "@/lib/data";
import { GraduationCap, Smartphone, Globe, Database, Cpu } from "lucide-react";
import { MagneticCard } from "@/components/ui/MagneticCard";
import { BorderBeam } from "@/components/ui/border-beam";

export default function AboutSection() {
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

    const elements = document.querySelectorAll(".reveal");
    elements.forEach((el) => observer.observe(el));

    return () => elements.forEach((el) => observer.unobserve(el));
  }, []);

  return (
    <section id="about" className="about" ref={sectionRef} data-cursor-guide="My story, education & what drives me as a creator.">
      <div className="about__container">
        {/* Section Header */}
        <div className="about__header reveal">
          <h2 className="section-title">About Me</h2>
          <div className="section-line"></div>
        </div>

        {/* 2-Column Balanced Bento Grid */}
        <div className="about__row reveal" style={{ transitionDelay: "0.1s" }}>
          {/* Column 1: Summary & Education */}
          <div className="about__row-col">
            {/* Block 1.1: Summary */}
            <div className="about__section-block">
              <h3 className="about__col-title">Summary</h3>
              <div className="about__summary-tagline">
                Bridging tactile design &amp; precise engineering to build software that feels alive.
              </div>
              <p className="about__bio">
                I&apos;m a developer and designer who believes in the power of beautiful, functional interfaces. My journey started with a curiosity for how things work and evolved into a passion for crafting digital experiences that people love to use.
              </p>
              <p className="about__bio">
                My approach blends technical precision with creative vision, ensuring every pixel serves a purpose, from seamless animations to optimized data flows.
              </p>
            </div>

            {/* Block 1.2: Education */}
            <div className="about__section-block" style={{ marginTop: "2.5rem" }}>
              <h3 className="about__col-title">Education</h3>
              <div className="education-capsule">
                <div className="education-capsule__icon-box">
                  <GraduationCap size={20} />
                </div>
                <div className="education-capsule__content">
                  <h4 className="education-capsule__degree">{education.degree}</h4>
                  <p className="education-capsule__uni">{education.university}</p>
                  <div className="education-capsule__meta">
                    <span>{education.period}</span>
                    <span className="dot">•</span>
                    <span className="education-capsule__badge">CGPA: {education.cgpa}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Column 2: Capabilities & Passions stacked */}
          <div className="about__row-col">
            {/* What I Do (Capabilities strips) */}
            <div className="about__section-block">
              <h3 className="about__col-title">What I Do</h3>
              <div className="about__capabilities-list">
                {services.map((service, index) => {
                  
                  // Assign custom card-specific high-fidelity parameters
                  let glowColor = "rgba(255, 255, 255, 0.05)";
                  let colorFrom = "var(--color-text)";
                  let colorTo = "var(--color-border)";
                  let ambientClass = "ambient-silver";
                  
                  const titleLower = service.title.toLowerCase();
                  if (titleLower.includes("mobile")) {
                    glowColor = "rgba(161, 161, 170, 0.08)";
                    colorFrom = "#E4E4E7";
                    colorTo = "#3F3F46";
                    ambientClass = "ambient-silver";
                  } else if (titleLower.includes("web")) {
                    glowColor = "rgba(228, 200, 165, 0.08)";
                    colorFrom = "#F3E1CD";
                    colorTo = "#544638";
                    ambientClass = "ambient-gold";
                  } else if (titleLower.includes("backend")) {
                    glowColor = "rgba(129, 140, 248, 0.08)";
                    colorFrom = "#C7D2FE";
                    colorTo = "#312E81";
                    ambientClass = "ambient-steel";
                  } else if (titleLower.includes("ai")) {
                    glowColor = "rgba(94, 234, 212, 0.08)";
                    colorFrom = "#99F6E4";
                    colorTo = "#115E59";
                    ambientClass = "ambient-cyan";
                  }

                  const getIcon = (title: string) => {
                    switch (title.toLowerCase()) {
                      case "mobile apps":
                        return <Smartphone size={16} strokeWidth={1.5} />;
                      case "web apps & sites":
                        return <Globe size={16} strokeWidth={1.5} />;
                      case "backend & apis":
                        return <Database size={16} strokeWidth={1.5} />;
                      case "ai features":
                        return <Cpu size={16} strokeWidth={1.5} />;
                      default:
                        return <Globe size={16} strokeWidth={1.5} />;
                    }
                  };

                  return (
                    <MagneticCard
                      key={index}
                      className="what-i-do__card group"
                      glowColor={glowColor}
                    >
                      {/* Layered Backlight Glowing Effect */}
                      <div className={`what-i-do__card-ambient ${ambientClass}`} />
                      
                      {/* Animated Light Border Beam */}
                      <BorderBeam
                        borderWidth={1.2}
                        size={120}
                        duration={7}
                        colorFrom={colorFrom}
                        colorTo={colorTo}
                        className="opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      />

                      {/* Card Content */}
                      <div className="what-i-do__card-inner">
                        <div className="what-i-do__icon-frame">
                          {getIcon(service.title)}
                        </div>
                        
                        <div className="what-i-do__card-body">
                          <h4 className="what-i-do__card-title">{service.title}</h4>
                          <p className="what-i-do__card-desc">{service.description}</p>
                        </div>
                      </div>
                    </MagneticCard>
                  );
                })}
              </div>
            </div>

            {/* Column 3: What I Love (Passions grid) */}
            <div className="about__section-block" style={{ marginTop: "2.5rem" }}>
              <h3 className="about__col-title">What I Love</h3>
              <div className="passions-grid">
                {passions.map((passion, index) => (
                  <div key={index} className="passion-card">
                    <div className="passion-card__icon">{passion.icon}</div>
                    <div className="passion-card__content">
                      <h4 className="passion-card__title">{passion.title}</h4>
                      <p className="passion-card__desc">{passion.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

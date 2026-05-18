"use client";

import { useEffect, useRef } from "react";
import { personalInfo, skills, education, services } from "@/lib/data";

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
    <section id="about" className="about" ref={sectionRef}>
      <div className="about__container">
        {/* Section Header */}
        <div className="about__header reveal">
          <h2 className="section-title">About Me</h2>
          <div className="section-line"></div>
        </div>

        {/* 2-Column Grid */}
        <div className="about__grid">
          
          {/* Column 1: Journey & Education */}
          <div className="about__col reveal" style={{ transitionDelay: "0.1s" }}>
            <h3 className="about__col-title">The Journey</h3>
            <p className="about__bio">
              I'm a developer and designer who believes in the power of beautiful, functional interfaces. My journey started with a curiosity for how things work and evolved into a passion for crafting digital experiences that people love to use.
            </p>
            <p className="about__bio">
              My approach blends technical precision with creative vision, ensuring every pixel serves a purpose.
            </p>

            <h3 className="about__col-title" style={{ marginTop: "2rem" }}>Education</h3>
            <div className="about__education">
              <h4 className="about__edu-degree">{education.degree}</h4>
              <p className="about__edu-uni">{education.university}</p>
              <p className="about__edu-meta">
                <span>{education.period}</span>
                <span className="dot">•</span>
                <span>CGPA: {education.cgpa}</span>
              </p>
            </div>
          </div>

          {/* Column 2: What I Do */}
          <div className="about__col reveal" style={{ transitionDelay: "0.2s" }}>
            <h3 className="about__col-title">What I Do</h3>
            <div className="services-list">
              {services.map((service, index) => (
                <div key={index} className="service-item">
                  <div className="service-content">
                    <h4 className="service-title">{service.title}</h4>
                    <p className="service-desc">{service.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

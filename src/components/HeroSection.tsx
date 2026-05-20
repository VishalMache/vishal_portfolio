"use client";

import { personalInfo } from "@/lib/data";
import Image from "next/image";
import { ShiningText } from "@/components/ui/shining-text";

export default function HeroSection() {
  return (
    <section id="home" className="hero">
      {/* Left — Text content */}
      <div className="hero__content">
        {/* Availability badge */}
        <div className="hero__availability">
          <ShiningText text={personalInfo.availability} />
        </div>

        {/* Greeting */}
        <p className="hero__greeting">Hello, I&apos;m</p>

        {/* Name */}
        <h1 className="hero__name">
          Vishal
          <br />
          <span className="hero__name-accent">Mache</span>
        </h1>

        {/* Tagline */}
        <p className="hero__tagline">{personalInfo.tagline}</p>

        {/* Description */}
        <p className="hero__description">{personalInfo.bio}</p>

        {/* CTAs */}
        <div className="hero__cta-group">
          <a href="#projects" className="hero__cta">
            View My Work
            <span className="hero__cta-arrow">→</span>
          </a>
          <a href="#contact" className="hero__cta-secondary">
            Get in Touch
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>

      {/* Right — Photo Container */}
      <div className="hero__image-container">
        <div className="hero__image-wrapper">
          <div className="hero__image-inner">
            <Image
              src="/vishal-hero-enhanced.png"
              alt="Vishal Mache — Developer & Designer"
              fill
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
              className="hero__image"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

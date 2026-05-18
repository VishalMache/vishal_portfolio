"use client";

import { navLinks, personalInfo } from "@/lib/data";

interface MenuOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MenuOverlay({ isOpen, onClose }: MenuOverlayProps) {
  const handleLinkClick = () => {
    onClose();
  };

  return (
    <div className={`menu-overlay ${isOpen ? "active" : ""}`}>
      {/* Backdrop */}
      <div className="menu-overlay__backdrop" />

      {/* Close button */}
      <button
        className="menu-overlay__close"
        onClick={onClose}
        aria-label="Close menu"
      >
        ✕
      </button>

      {/* Navigation links */}
      <nav className="menu-overlay__nav">
        {navLinks.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="menu-overlay__link"
            onClick={handleLinkClick}
          >
            {link.label}
          </a>
        ))}
      </nav>

      {/* Social links */}
      <div className="menu-overlay__socials">
        <a
          href={personalInfo.github}
          target="_blank"
          rel="noopener noreferrer"
          className="menu-overlay__social-link"
        >
          GitHub
        </a>
        <a
          href={personalInfo.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="menu-overlay__social-link"
        >
          LinkedIn
        </a>
        <a
          href={`mailto:${personalInfo.email}`}
          className="menu-overlay__social-link"
        >
          Email
        </a>
      </div>
    </div>
  );
}

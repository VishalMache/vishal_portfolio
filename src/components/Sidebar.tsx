"use client";

import { useState } from "react";
import { navLinks, personalInfo } from "@/lib/data";
import ThemeToggle from "./ThemeToggle";

export default function Sidebar({
  onMenuToggle,
}: {
  onMenuToggle: () => void;
}) {
  return (
    <aside className="sidebar" aria-label="Sidebar navigation">
      {/* Logo */}
      <a href="#home" className="sidebar__logo" aria-label="Home">
        VM
      </a>

      {/* Vertical rotated text */}
      <span className="sidebar__text">
        Vishal Mache &bull; Developer &amp; Designer
      </span>

      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "24px" }}>
        {/* Theme Toggle */}
        <ThemeToggle />

        {/* Menu hamburger */}
        <button
          className="sidebar__menu-btn"
          onClick={onMenuToggle}
          aria-label="Open menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </aside>
  );
}

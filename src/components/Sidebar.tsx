"use client";

import { useRouter, usePathname } from "next/navigation";
import { personalInfo } from "@/lib/data";
import ThemeToggle from "./ThemeToggle";
import { MenuContainer, MenuItem } from "./ui/fluid-menu";
import { Menu as MenuIcon, X, Home, User, Users, Mail, Image as ImageIcon } from "lucide-react";

export default function Sidebar({
  onMenuToggle,
}: {
  onMenuToggle: () => void;
}) {
  const router = useRouter();
  const pathname = usePathname();

  const handleNav = (hash: string) => {
    if (pathname !== '/') {
      router.push('/#' + hash);
    } else {
      window.location.hash = hash;
    }
  };

  return (
    <aside className="sidebar" aria-label="Sidebar navigation">
      {/* Logo */}
      <a href="/#home" className="sidebar__logo" aria-label="Home">
        VM
      </a>

      {/* Vertical rotated text */}
      <span className="sidebar__text">
        Vishal Mache &bull; Developer &amp; Designer
      </span>

      <div style={{ zIndex: 100 }}>
        {/* Fluid Menu Container replacing standard hamburger and integrating ThemeToggle */}
        <MenuContainer>
          <MenuItem 
            icon={
              <div className="menu-toggle-icon-wrapper">
                <div className="menu-icon-hamburger">
                  <MenuIcon size={22} strokeWidth={1.5} style={{ color: "var(--color-bg)" }} />
                </div>
                <div className="menu-icon-close">
                  <X size={22} strokeWidth={1.5} style={{ color: "var(--color-bg)" }} />
                </div>
              </div>
            } 
          />
          <MenuItem 
            icon={<Home size={22} strokeWidth={1.5} />} 
            onClick={() => handleNav("home")}
          />
          <MenuItem 
            icon={<User size={22} strokeWidth={1.5} />} 
            onClick={() => handleNav("about")}
          />
          <MenuItem 
            icon={<ImageIcon size={22} strokeWidth={1.5} />} 
            onClick={() => router.push("/gallery")}
          />
          <MenuItem 
            icon={<Users size={22} strokeWidth={1.5} />} 
            onClick={() => router.push("/team")}
          />
          {/* Theme Toggle integrated directly inside the fluid stack! */}
          <ThemeToggle />
          <MenuItem 
            icon={<Mail size={22} strokeWidth={1.5} />} 
            onClick={() => window.location.href = `mailto:${personalInfo.email}`}
          />
        </MenuContainer>
      </div>
    </aside>
  );
}

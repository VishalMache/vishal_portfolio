"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface MenuProps {
  trigger: React.ReactNode;
  children: React.ReactNode;
  align?: "left" | "right";
  showChevron?: boolean;
}

export function Menu({ trigger, children, align = "left", showChevron = true }: MenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fluid-menu">
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="fluid-menu-trigger"
        role="button"
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        {trigger}
        {showChevron && (
          <ChevronDown className="ml-2 -mr-1 h-4 w-4" style={{ color: "var(--color-text-tertiary)" }} aria-hidden="true" />
        )}
      </div>

      {isOpen && (
        <div
          className="fluid-menu-dropdown"
          style={{ right: align === "right" ? "0" : "auto", left: align === "left" ? "0" : "auto" }}
          role="menu"
          aria-orientation="vertical"
        >
          <div className="fluid-menu-dropdown-inner" role="none">
            {children}
          </div>
        </div>
      )}
    </div>
  );
}

interface MenuItemProps {
  children?: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  icon?: React.ReactNode;
  isActive?: boolean;
}

export function MenuItem({ children, onClick, disabled = false, icon, isActive = false }: MenuItemProps) {
  return (
    <button
      className={cn(
        "fluid-menu-item",
        disabled && "disabled",
        isActive && "active"
      )}
      role="menuitem"
      onClick={onClick}
      disabled={disabled}
    >
      <span className="fluid-menu-item-inner">
        {icon && (
          <span className="fluid-menu-item-icon">
            {icon}
          </span>
        )}
        {children}
      </span>
    </button>
  );
}

export function MenuContainer({ children }: { children: React.ReactNode }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const childrenArray = React.Children.toArray(children);

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="fluid-menu-container" data-expanded={isExpanded}>
      {/* Container for all items */}
      <div style={{ position: "relative" }}>
        {/* First item - always visible */}
        <div 
          className="fluid-menu-trigger-card"
          onClick={handleToggle}
        >
          {childrenArray[0]}
        </div>

        {/* Other items */}
        {childrenArray.slice(1).map((child, index) => (
          <div 
            key={index} 
            className="fluid-menu-child-wrapper"
            style={{
              transform: `translateY(${isExpanded ? (index + 1) * -76 : 0}px)`, /* Generates perfect upward spacing */
              opacity: isExpanded ? 1 : 0,
              zIndex: 40 - index,
              clipPath: index === childrenArray.length - 2 
                ? "circle(50% at 50% 50%)" 
                : "circle(50% at 50% 55%)",
              transition: `transform ${isExpanded ? '350ms' : '300ms'} cubic-bezier(0.16, 1, 0.3, 1),
                         opacity ${isExpanded ? '250ms' : '300ms'}`,
              backfaceVisibility: 'hidden',
              perspective: 1000,
              WebkitFontSmoothing: 'antialiased',
              pointerEvents: isExpanded ? "auto" : "none"
            }}
          >
            {child}
          </div>
        ))}
      </div>
    </div>
  );
}

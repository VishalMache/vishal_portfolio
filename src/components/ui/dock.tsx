"use client";

import * as React from "react";
import { useRef } from "react";
import { cn } from "@/lib/utils";

interface DockProps {
  className?: string;
  children: React.ReactNode;
  maxAdditionalSize?: number;
  iconSize?: number;
}

interface DockIconProps {
  className?: string;
  src?: string;
  href: string;
  name: string;
  handleIconHover?: (e: React.MouseEvent<HTMLLIElement>) => void;
  children?: React.ReactNode;
  iconSize?: number;
  style?: React.CSSProperties;
}

type ScaleValueParams = [number, number];

export const scaleValue = function (
  value: number,
  from: ScaleValueParams,
  to: ScaleValueParams
): number {
  const scale = (to[1] - to[0]) / (from[1] - from[0]);
  const capped = Math.min(from[1], Math.max(from[0], value)) - from[0];
  return Math.floor(capped * scale + to[0]);
};

export function DockIcon({
  className,
  src,
  href,
  name,
  handleIconHover,
  children,
  iconSize = 48,
  style,
}: DockIconProps) {
  const ref = useRef<HTMLLIElement | null>(null);

  return (
    <li
      ref={ref}
      style={
        {
          "--icon-size": `${iconSize}px`,
          ...style,
        } as React.CSSProperties
      }
      onMouseMove={handleIconHover}
      className={cn("dock-icon-item", className)}
    >
      <a
        href={href}
        className="dock-link"
        aria-label={name}
      >
        <span className="dock-tooltip">
          {name}
        </span>
        {src ? (
          <img
            src={src}
            alt={name}
            style={{ width: "100%", height: "100%", objectFit: "contain", borderRadius: "inherit" }}
          />
        ) : (
          children
        )}
      </a>
    </li>
  );
}

export function Dock({
  className,
  children,
  maxAdditionalSize = 6,
  iconSize = 48,
}: DockProps) {
  const dockRef = useRef<HTMLDivElement | null>(null);

  const handleIconHover = (e: React.MouseEvent<HTMLLIElement>) => {
    if (!dockRef.current) return;
    const mousePos = e.clientX;
    const iconPosLeft = e.currentTarget.getBoundingClientRect().left;
    const iconWidth = e.currentTarget.getBoundingClientRect().width;

    const cursorDistance = (mousePos - iconPosLeft) / iconWidth;
    const offsetPixels = scaleValue(
      cursorDistance,
      [0, 1],
      [maxAdditionalSize * -1, maxAdditionalSize]
    );

    dockRef.current.style.setProperty(
      "--dock-offset-left",
      `${offsetPixels * -1}px`
    );

    dockRef.current.style.setProperty(
      "--dock-offset-right",
      `${offsetPixels}px`
    );
  };

  return (
    <nav ref={dockRef} role="navigation" aria-label="Main Dock" className="dock-nav-wrapper">
      <ul className={cn("dock-container", className)}>
        {React.Children.map(children, (child) =>
          React.isValidElement<DockIconProps>(child)
            ? React.cloneElement(child as React.ReactElement<DockIconProps>, {
                handleIconHover,
                iconSize,
              })
            : child
        )}
      </ul>
    </nav>
  );
}

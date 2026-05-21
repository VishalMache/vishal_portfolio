"use client";
import React, { useState, useEffect, useRef } from "react";

export interface TechItem {
  name: string;
  icon: string;
}

const DEFAULT_INNER: TechItem[] = [
  { name: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
  { name: "TypeScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
  { name: "JavaScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
  { name: "Dart", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dart/dart-original.svg" },
  { name: "Java", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" },
  { name: "Kotlin", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kotlin/kotlin-original.svg" },
];

const DEFAULT_MIDDLE: TechItem[] = [
  { name: "Flutter", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg" },
  { name: "React", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
  { name: "Next.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-line.svg" },
  { name: "Flask", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg" },
  { name: "Supabase", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/supabase/supabase-original.svg" },
  { name: "Firebase", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-original.svg" },
  { name: "Tailwind CSS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg" },
  { name: "Prisma", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/prisma/prisma-original.svg" },
];

const DEFAULT_OUTER: TechItem[] = [
  { name: "PostgreSQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" },
  { name: "SQLite", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sqlite/sqlite-original.svg" },
  { name: "Figma", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg" },
  { name: "Git", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
  { name: "GitHub", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" },
  { name: "VS Code", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg" },
  { name: "Android Studio", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/androidstudio/androidstudio-original.svg" },
  { name: "Webflow", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/webflow/webflow-original.svg" },
  { name: "HTML5", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
  { name: "CSS3", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" },
];

interface SemiCircleOrbitProps {
  radius: number;
  centerX: number;
  centerY: number;
  items: TechItem[];
  count: number;
  iconSize: number;
}

function SemiCircleOrbit({ radius, centerX, centerY, items, count, iconSize }: SemiCircleOrbitProps) {
  return (
    <>
      {/* Semi-circle glow background */}
      <div className="absolute inset-0 flex justify-center">
        <div
          className="
            w-[1000px] h-[1000px] rounded-full 
            bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.02),transparent_70%)]
            dark:bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.02),transparent_70%)]
            blur-3xl 
            -mt-40 
            pointer-events-none
          "
          style={{ zIndex: 0 }}
        />
      </div>

      {/* Orbit icons */}
      {Array.from({ length: count }).map((_, index) => {
        const item = items[index % items.length];
        const angle = count === 1 ? 90 : (index / (count - 1)) * 180;
        const x = radius * Math.cos((angle * Math.PI) / 180);
        const y = radius * Math.sin((angle * Math.PI) / 180);

        // Tooltip positioning — above or below based on angle
        const tooltipAbove = angle > 90;

        const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
          const img = e.currentTarget;
          const name = item?.name || "";
          const slugs: Record<string, string> = {
            "next.js": "nextdotjs",
            "vs code": "visualstudiocode",
            "android studio": "androidstudio",
            "sqlite": "sqlite",
            "shadcn/ui": "shadcnui",
            "framer": "framer",
            "ai features": "openai",
            "tailwinds css": "tailwindcss",
            "tailwind css": "tailwindcss"
          };
          const slug = slugs[name.toLowerCase()] || name.toLowerCase().replace(/[^a-z0-9]/g, "");
          img.src = `https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/${slug}.svg`;
          
          img.onerror = () => {
            img.src = "https://pub-940ccf6255b54fa799a9b01050e6c227.r2.dev/github-icon.svg"; // fallback
          };
        };

        return (
          <div
            key={index}
            className="absolute flex flex-col items-center group"
            style={{
              left: `${centerX + x - iconSize / 2}px`,
              top: `${centerY - y - iconSize / 2}px`,
              zIndex: 5,
            }}
          >
            {item?.icon ? (
              <img
                src={item.icon}
                alt={item.name}
                width={iconSize}
                height={iconSize}
                onError={handleImageError}
                className="object-contain cursor-pointer transition-all duration-300 hover:scale-125 dark:invert-[0.1] dark:hover:invert-0 hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]"
                style={{ minWidth: iconSize, minHeight: iconSize }}
              />
            ) : null}

            {/* Tooltip */}
            <div
              className={`absolute ${
                tooltipAbove ? "bottom-[calc(100%+8px)]" : "top-[calc(100%+8px)]"
              } hidden group-hover:block w-28 rounded-lg bg-black px-2 py-1 text-xs text-white shadow-lg text-center`}
            >
              {item?.name || `App ${index + 1}`}
              <div
                className={`absolute left-1/2 -translate-x-1/2 w-2 h-2 rotate-45 bg-black ${
                  tooltipAbove ? "top-full" : "bottom-full"
                }`}
              ></div>
            </div>
          </div>
        );
      })}
    </>
  );
}

interface MultiOrbitSemiCircleProps {
  innerItems?: TechItem[];
  middleItems?: TechItem[];
  outerItems?: TechItem[];
  title?: string;
  description?: string;
}

export default function MultiOrbitSemiCircle({
  innerItems = DEFAULT_INNER,
  middleItems = DEFAULT_MIDDLE,
  outerItems = DEFAULT_OUTER,
  title = "Tech Stack",
  description = "The tools, languages, and frameworks I use to bring ideas to life."
}: MultiOrbitSemiCircleProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(500);

  useEffect(() => {
    if (!containerRef.current) return;
    
    // First immediate measurement
    setContainerWidth(containerRef.current.getBoundingClientRect().width);

    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        setContainerWidth(entry.contentRect.width);
      }
    });

    resizeObserver.observe(containerRef.current);
    return () => resizeObserver.disconnect();
  }, []);

  const iconSize =
    containerWidth < 480
      ? Math.max(20, containerWidth * 0.05)
      : containerWidth < 768
      ? Math.max(24, containerWidth * 0.06)
      : Math.max(28, containerWidth * 0.06);

  const baseWidth = Math.max(240, Math.min(containerWidth - iconSize - 64, 680));
  const centerX = baseWidth / 2;
  const centerY = baseWidth * 0.5;

  const hasHeader = !!(title || description);

  return (
    <div ref={containerRef} className={`relative w-full flex flex-col items-center ${hasHeader ? "py-12" : "py-4"}`}>
      <div className="relative flex flex-col items-center text-center z-10 w-full">
        {title && <h2 className="section-title text-center my-4">{title}</h2>}
        {description && (
          <p className="mb-12 max-w-2xl text-gray-600 dark:text-gray-400 lg:text-lg px-4">
            {description}
          </p>
        )}

        {/* Orbit container */}
        <div
          className="relative mx-auto mt-4"
          style={{ width: baseWidth, height: baseWidth * 0.55 }}
        >
          {/* Semi-circular dotted orbit lines for premium look */}
          <div 
            className="absolute rounded-full border border-dashed border-gray-300 dark:border-gray-800 -translate-x-1/2 pointer-events-none"
            style={{
              width: baseWidth * 0.44,
              height: baseWidth * 0.44,
              left: centerX,
              top: centerY - (baseWidth * 0.22),
              zIndex: 1
            }}
          />
          <div 
            className="absolute rounded-full border border-dashed border-gray-300 dark:border-gray-800 -translate-x-1/2 pointer-events-none"
            style={{
              width: baseWidth * 0.72,
              height: baseWidth * 0.72,
              left: centerX,
              top: centerY - (baseWidth * 0.36),
              zIndex: 1
            }}
          />
          <div 
            className="absolute rounded-full border border-dashed border-gray-300 dark:border-gray-800 -translate-x-1/2 pointer-events-none"
            style={{
              width: baseWidth * 1.0,
              height: baseWidth * 1.0,
              left: centerX,
              top: centerY - (baseWidth * 0.5),
              zIndex: 1
            }}
          />

          <SemiCircleOrbit radius={baseWidth * 0.22} centerX={centerX} centerY={centerY} items={innerItems} count={6} iconSize={iconSize} />
          <SemiCircleOrbit radius={baseWidth * 0.36} centerX={centerX} centerY={centerY} items={middleItems} count={8} iconSize={iconSize} />
          <SemiCircleOrbit radius={baseWidth * 0.5} centerX={centerX} centerY={centerY} items={outerItems} count={10} iconSize={iconSize} />
        </div>
      </div>
    </div>
  );
}

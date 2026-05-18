"use client";

import { useState, useEffect } from "react";

const greetings = [
  "Hello",
  "Bonjour",
  "Ciao",
  "Hola",
  "こんにちは",
  "Guten tag",
  "नमस्ते"
];

export default function Preloader() {
  const [index, setIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // If we've shown all greetings, hide preloader
    if (index === greetings.length - 1) {
      setTimeout(() => {
        setIsLoaded(true);
      }, 600); // stay on last greeting a bit longer
      return;
    }

    const timer = setTimeout(() => {
      setIndex((prev) => prev + 1);
    }, 150); // fast switch between words (150ms)

    return () => clearTimeout(timer);
  }, [index]);

  if (isLoaded) return null;

  return (
    <div className={`preloader ${index === greetings.length - 1 ? 'preloader--sliding' : ''}`}>
      <div className="preloader__text">
        <span className="preloader__dot"></span>
        {greetings[index]}
      </div>
    </div>
  );
}

import type { Metadata } from "next";
import { ThemeProvider } from "@/components/ThemeProvider";
import "./globals.css";

export const metadata: Metadata = {
  title: "Vishal Mache — Developer & Designer",
  description:
    "Portfolio of Vishal Mache — Mobile & Web Developer specializing in Flutter, React, Next.js, and AI-powered features. Available for freelance.",
  keywords: [
    "Vishal Mache",
    "developer",
    "designer",
    "portfolio",
    "React",
    "Next.js",
    "Flutter",
    "frontend",
    "freelance",
  ],
  openGraph: {
    title: "Vishal Mache — Developer & Designer",
    description:
      "Crafting fast, polished mobile apps and web applications — from idea to live deployment.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}

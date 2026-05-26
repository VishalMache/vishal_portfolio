"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import FloatingNavbar from "@/components/FloatingNavbar";
import { CustomCursor } from "@/components/ui/CustomCursor";

const imagesData = [
  { src: '/gallery/ai hackathon.jpg', id: '01' },
  { src: '/gallery/crest.jpg', id: '02' },
  { src: '/gallery/crest2.jpg', id: '03' },
  { src: '/gallery/datathon1.jpg', id: '04' },
  { src: '/gallery/datathon2.jpg', id: '05' },
  { src: '/gallery/ieee hack1.jpg', id: '06' },
  { src: '/gallery/ieee hack2.jpg', id: '07' },
  { src: '/gallery/ieee hack3.gif', id: '08' },
  { src: '/gallery/vishwanova1.jpg', id: '09' },
  { src: '/gallery/vishwanova2.jpg', id: '10' },
  { src: '/gallery/vishwanova3.jpg', id: '11' },
  { src: '/gallery/wa-image-1.jpeg', id: '12' },
  { src: '/gallery/wa-image-2.jpeg', id: '13' },
  { src: '/gallery/wa-image-3.jpeg', id: '14' },
  { src: '/gallery/wa-image-4.jpeg', id: '15' },
  { src: '/gallery/wa-image-5.jpeg', id: '16' },
  { src: '/gallery/wa-image-6.jpeg', id: '17' },
  { src: '/gallery/wa-image-7.jpeg', id: '18' },
];

// Split specifically for desktop to keep 1, 5, and 2 in the center column
// We move imagesData[11] (Moment 12) to the beginning of col1
const col1 = [imagesData[11], imagesData[2], imagesData[3], imagesData[5], imagesData[8], imagesData[14]];
const col2 = [imagesData[0], imagesData[4], imagesData[1], imagesData[12], imagesData[15], imagesData[17]]; // Moment 1, 5, 2 in center
const col3 = [imagesData[6], imagesData[7], imagesData[9], imagesData[10], imagesData[13], imagesData[16]];

// Create a custom mobile order to put Moment 12 at the beginning
const mobileImages = [imagesData[11], ...imagesData.filter((_, idx) => idx !== 11)];

export default function GalleryPage() {
  const ImageCard = ({ img, idx }: { img: { src: string, id: string }, idx: number }) => (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 30 },
        show: { opacity: 1, y: 0, transition: { ease: "easeOut", duration: 0.8 } }
      }}
      className="relative group overflow-hidden rounded-[1.5rem] bg-black/5 dark:bg-white/5 shadow-sm hover:shadow-2xl transition-shadow duration-500 w-full"
    >
      <img
        src={img.src}
        alt={`Gallery photo ${img.id}`}
        className="w-full h-auto object-cover transform transition-all duration-[0.8s] group-hover:scale-[1.03] filter grayscale-[0.8] contrast-125 opacity-80 group-hover:grayscale-0 group-hover:contrast-100 group-hover:opacity-100"
        loading="lazy"
      />
      
      {/* Subtle overlay that appears on hover */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6 pointer-events-none">
        <span className="text-white/90 font-mono text-xs tracking-widest uppercase transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
          Moment {img.id}
        </span>
      </div>
    </motion.div>
  );

  return (
    <main className="min-h-screen bg-[var(--color-bg)] text-text relative">
      <CustomCursor />
      <FloatingNavbar />
      
      {/* Sticky Header with Frosted Glass */}
      <header className="sticky top-0 z-50 w-full bg-[var(--color-bg)]/70 backdrop-blur-xl border-b border-black/5 dark:border-white/5 py-4 px-6 md:px-12 flex items-center justify-between transition-all">
        <Link href="/" className="inline-flex items-center gap-2 text-text hover:text-[var(--color-accent-skin)] transition-colors text-sm uppercase tracking-widest font-medium group">
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          <span className="hidden md:inline">Back to Home</span>
        </Link>
        <h1 className="text-2xl md:text-3xl font-display font-bold tracking-tight m-0 text-center flex-1">
          Event <span className="font-serif italic font-light text-[var(--color-accent-skin)]">Gallery</span>
        </h1>
        <div className="w-[100px] hidden md:block" /> {/* Spacer to balance flex layout */}
      </header>

      {/* Main Content Area */}
      <div className="px-4 md:px-8 lg:px-12 pt-12 pb-32 max-w-[1800px] mx-auto w-full">
        <motion.div 
          initial="hidden"
          animate="show"
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1
              }
            }
          }}
        >
          {/* Desktop/Tablet 3-Column Layout */}
          <div className="hidden md:grid md:grid-cols-3 gap-6">
            <div className="flex flex-col gap-6">
              {col1.map((img, idx) => <ImageCard img={img} idx={idx} key={img.id} />)}
            </div>
            <div className="flex flex-col gap-6">
              {col2.map((img, idx) => <ImageCard img={img} idx={idx} key={img.id} />)}
            </div>
            <div className="flex flex-col gap-6">
              {col3.map((img, idx) => <ImageCard img={img} idx={idx} key={img.id} />)}
            </div>
          </div>

          {/* Mobile 1-Column Layout */}
          <div className="md:hidden flex flex-col gap-6">
             {mobileImages.map((img, idx) => <ImageCard img={img} idx={idx} key={img.id} />)}
          </div>
        </motion.div>
      </div>
    </main>
  );
}

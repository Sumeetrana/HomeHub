"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";
import { PropertyImage } from "@/types";

interface PropertyGalleryProps {
  images: PropertyImage[];
  title: string;
}

export default function PropertyGallery({ images, title }: PropertyGalleryProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const displayImages = images.length > 0 ? images : [
    { id: "placeholder", url: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&q=80", isPrimary: true, order: 0 },
  ];

  const openLightbox = (index: number) => {
    setActiveIndex(index);
    setLightboxOpen(true);
  };

  const prev = () => setActiveIndex((i) => (i === 0 ? displayImages.length - 1 : i - 1));
  const next = () => setActiveIndex((i) => (i === displayImages.length - 1 ? 0 : i + 1));

  return (
    <>
      {/* Gallery Grid */}
      <div className="grid grid-cols-4 gap-2 h-[420px] rounded-2xl overflow-hidden">
        {/* Main image */}
        <div
          className="col-span-2 row-span-2 relative cursor-pointer group"
          onClick={() => openLightbox(0)}
        >
          <Image
            src={displayImages[0]?.url}
            alt={title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          <div className="absolute inset-0 bg-dark-950/0 group-hover:bg-dark-950/20 transition-colors flex items-center justify-center">
            <ZoomIn className="h-8 w-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        </div>

        {/* Side images */}
        {displayImages.slice(1, 5).map((img, i) => (
          <div
            key={img.id}
            className="relative cursor-pointer group overflow-hidden"
            onClick={() => openLightbox(i + 1)}
          >
            <Image
              src={img.url}
              alt={`${title} — image ${i + 2}`}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              sizes="25vw"
            />
            {i === 3 && displayImages.length > 5 && (
              <div className="absolute inset-0 bg-dark-950/60 flex items-center justify-center">
                <span className="text-white font-bold text-xl">+{displayImages.length - 5}</span>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] bg-dark-950/95 backdrop-blur-sm flex items-center justify-center"
            onClick={() => setLightboxOpen(false)}
          >
            <button
              className="absolute top-4 right-4 w-10 h-10 rounded-full glass flex items-center justify-center text-white hover:text-gold-400 transition-colors"
              onClick={() => setLightboxOpen(false)}
            >
              <X className="h-5 w-5" />
            </button>

            <button
              className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full glass flex items-center justify-center text-white hover:text-gold-400"
              onClick={(e) => { e.stopPropagation(); prev(); }}
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative w-full max-w-4xl h-[70vh] mx-8"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={displayImages[activeIndex]?.url}
                alt={title}
                fill
                className="object-contain"
                sizes="100vw"
              />
            </motion.div>

            <button
              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full glass flex items-center justify-center text-white hover:text-gold-400"
              onClick={(e) => { e.stopPropagation(); next(); }}
            >
              <ChevronRight className="h-5 w-5" />
            </button>

            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-dark-300 text-sm">
              {activeIndex + 1} / {displayImages.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

export interface HeroSlide {
  src: string;
  alt: string;
  category: string;
}

const DEFAULT_SLIDES: HeroSlide[] = [
  {
    src: "/images/campus-main-entrance.jpg",
    alt: "Santosh Group of Educational Institutions main campus entrance and grounds",
    category: "Main Campus & Institutional Grounds",
  },
  {
    src: "/images/campus-courtyard-panorama.jpg",
    alt: "Panoramic view of Santosh Group courtyard, academic buildings, and campus trees",
    category: "Central Courtyard & Campus Quad",
  },
  {
    src: "/images/campus-academic-corridor.jpg",
    alt: "Architectural corridor and classroom wings at Santosh Group of Institutions",
    category: "Academic Corridors & Wings",
  },
  {
    src: "/images/campus-school-entrance.jpg",
    alt: "Santosh English School and High School entrance gate with students in Bangarpet",
    category: "Santosh English School & Campus Gate",
  },
  {
    src: "/images/campus-building-facade.jpg",
    alt: "Santosh Group of Institutions academic building facade with institutional signage",
    category: "Academic Complex & Building Facade",
  },
];

interface HeroCarouselProps {
  slides?: HeroSlide[];
  intervalMs?: number;
}

export default function HeroCarousel({
  slides = DEFAULT_SLIDES,
  intervalMs = 5500,
}: HeroCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);

  const safeSlides = slides && slides.length > 0 ? slides : DEFAULT_SLIDES;

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % safeSlides.length);
  }, [safeSlides.length]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + safeSlides.length) % safeSlides.length);
  }, [safeSlides.length]);

  // Autoplay timer with pause on hover
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      nextSlide();
    }, intervalMs);
    return () => clearInterval(timer);
  }, [nextSlide, intervalMs, isPaused]);

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      prevSlide();
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      nextSlide();
    }
  };

  // Touch swipe handling
  const handleTouchStart = (e: React.TouchEvent) => {
    if (!e.touches || e.touches.length === 0) return;
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null || !e.changedTouches || e.changedTouches.length === 0) return;
    const touchEndX = e.changedTouches[0].clientX;
    const deltaX = touchEndX - touchStartX.current;
    if (deltaX > 40) {
      prevSlide();
    } else if (deltaX < -40) {
      nextSlide();
    }
    touchStartX.current = null;
  };

  const currentSlide = safeSlides[currentIndex] || safeSlides[0];

  return (
    <div
      role="region"
      aria-label="Campus photography carousel"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className="group relative w-full h-80 sm:h-[460px] lg:h-[540px] overflow-hidden border border-taupe bg-charcoal/5 select-none focus:outline-none focus:ring-1 focus:ring-charcoal"
    >
      {/* Slides with gentle fade + slight scale transition */}
      {safeSlides.map((slide, idx) => {
        const isActive = idx === currentIndex;
        return (
          <div
            key={slide.src}
            className={`absolute inset-0 transition-all duration-1200 ease-out ${
              isActive
                ? "opacity-100 scale-100 z-10 pointer-events-auto"
                : "opacity-0 scale-105 z-0 pointer-events-none"
            }`}
            aria-hidden={!isActive}
          >
            <Image
              src={slide.src}
              alt={slide.alt}
              fill
              sizes="(max-width: 1280px) 100vw, 1280px"
              priority={idx === 0}
              className="object-cover object-center"
              onError={(e) => {
                // Prevent unhandled error event from propagating to window.onerror
                e.preventDefault();
              }}
            />
          </div>
        );
      })}

      {/* Subtle Navigation: Left Arrow */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          prevSlide();
        }}
        aria-label="Previous slide"
        className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-charcoal/35 hover:bg-charcoal/80 text-white/90 hover:text-white backdrop-blur-sm border border-white/20 flex items-center justify-center transition-all opacity-70 sm:opacity-0 sm:group-hover:opacity-100 hover:opacity-100 focus:opacity-100"
      >
        <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
      </button>

      {/* Subtle Navigation: Right Arrow */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          nextSlide();
        }}
        aria-label="Next slide"
        className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-charcoal/35 hover:bg-charcoal/80 text-white/90 hover:text-white backdrop-blur-sm border border-white/20 flex items-center justify-center transition-all opacity-70 sm:opacity-0 sm:group-hover:opacity-100 hover:opacity-100 focus:opacity-100"
      >
        <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
      </button>

      {/* Contextual Category Label (Bottom-Left) */}
      <div className="absolute left-3 sm:left-6 bottom-3 sm:bottom-6 z-20 bg-charcoal/70 backdrop-blur-md border border-white/15 px-3 py-1.5 sm:px-3.5 sm:py-1.5 text-white">
        <span className="font-sans text-[10px] sm:text-xs tracking-widest uppercase font-medium text-white/90">
          {currentSlide.category}
        </span>
      </div>

      {/* Institutional Slide Indicator: 01 / 07 (Bottom-Right) */}
      <div className="absolute right-3 sm:right-6 bottom-3 sm:bottom-6 z-20 bg-charcoal/70 backdrop-blur-md border border-white/15 px-3 py-1.5 sm:px-3.5 sm:py-1.5 text-white flex items-center gap-1.5">
        <span className="font-mono text-xs sm:text-sm font-semibold tracking-wider">
          {String(currentIndex + 1).padStart(2, "0")}
        </span>
        <span className="text-white/40 text-xs sm:text-sm font-mono">/</span>
        <span className="font-mono text-xs sm:text-sm text-white/60 tracking-wider">
          {String(safeSlides.length).padStart(2, "0")}
        </span>
      </div>

      {/* Hairline Progress Strip */}
      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white/20 z-20">
        <div
          className="h-full bg-gold transition-all duration-500 ease-out"
          style={{ width: `${((currentIndex + 1) / safeSlides.length) * 100}%` }}
        />
      </div>
    </div>
  );
}

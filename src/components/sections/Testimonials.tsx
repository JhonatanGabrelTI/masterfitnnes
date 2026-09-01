"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { ContentData } from "@/data/content";

interface TestimonialsProps {
  data: ContentData["testimonials"];
}

export default function Testimonials({ data }: TestimonialsProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  // Map avatars to high quality Unsplash faces
  const unsplashAvatars = [
    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=150", // Guy
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150", // Girl
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150", // Guy
  ];

  // Auto scroll testimonials
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % data.length);
    }, 6000); // 6 seconds
    return () => clearInterval(timer);
  }, [data.length]);

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % data.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + data.length) % data.length);
  };

  return (
    <section id="depoimentos" className="relative py-24 bg-brand-black/95 z-10 overflow-hidden border-b border-brand-white/5">
      
      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-red/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-brand-red font-extrabold uppercase tracking-widest text-xs mb-3 block">
            DEPOIMENTOS DOS ATLETAS
          </span>
          <h2 className="font-title font-black text-3xl md:text-5xl text-brand-white tracking-tighter uppercase">
            QUEM TREINA, RECOMENDA
          </h2>
          <div className="w-12 h-1 bg-brand-red mx-auto mt-4" />
        </div>

        {/* 3D Depth Carousel Container */}
        <div className="relative flex flex-col items-center justify-center min-h-[380px] w-full max-w-4xl mx-auto">
          
          <div className="relative w-full flex justify-center items-center gap-4 md:gap-8 h-[280px]">
            {data.map((item, idx) => {
              // Calculate positional relations
              let position = "hidden";
              
              if (idx === activeIndex) {
                position = "active";
              } else if (idx === (activeIndex + 1) % data.length) {
                position = "next";
              } else if (idx === (activeIndex - 1 + data.length) % data.length) {
                position = "prev";
              }

              // Styling values based on relative position
              const isCenter = position === "active";
              const isSide = position === "prev" || position === "next";

              if (position === "hidden") return null;

              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{
                    opacity: isCenter ? 1 : 0.4,
                    scale: isCenter ? 1.05 : 0.88,
                    x: position === "prev" ? "-15%" : position === "next" ? "15%" : "0%",
                    zIndex: isCenter ? 10 : 5,
                  }}
                  transition={{ type: "spring", stiffness: 100, damping: 18 }}
                  className={`absolute w-[90%] md:w-[60%] p-6 md:p-8 flex flex-col justify-between h-full bg-brand-dark-gray border select-none ${
                    isCenter
                      ? "border-brand-red neon-glow-red"
                      : "border-brand-white/5 cursor-pointer"
                  }`}
                  onClick={() => {
                    if (isSide) setActiveIndex(idx);
                  }}
                >
                  <div className="flex justify-between items-start">
                    <Quote className="w-8 h-8 text-brand-red opacity-30" />
                    
                    {/* Stars */}
                    <div className="flex gap-1">
                      {Array.from({ length: item.rating }).map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-brand-red text-brand-red" />
                      ))}
                    </div>
                  </div>

                  <p className="text-brand-white/80 text-xs md:text-sm leading-relaxed my-4 italic font-light">
                    &ldquo;{item.text}&rdquo;
                  </p>

                  <div className="flex items-center gap-4 border-t border-brand-white/5 pt-4">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={unsplashAvatars[idx] || item.image}
                      alt={item.name}
                      className="w-10 h-10 rounded-full object-cover border border-brand-white/20"
                    />
                    <div>
                      <h4 className="font-title font-bold text-xs uppercase text-brand-white">
                        {item.name}
                      </h4>
                      <p className="text-[10px] text-brand-white/40 uppercase tracking-widest font-extrabold mt-0.5">
                        {item.role}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center gap-4 mt-8">
            <button
              onClick={handlePrev}
              className="p-3 bg-brand-white/5 hover:bg-brand-red/10 border border-brand-white/10 hover:border-brand-red text-brand-white hover:text-brand-red transition-all"
              aria-label="Previous Testimonial"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            
            {/* Dots indicators */}
            <div className="flex gap-2">
              {data.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveIndex(idx)}
                  className={`w-2 h-2 transition-all duration-300 rounded-none ${
                    activeIndex === idx ? "w-6 bg-brand-red" : "bg-brand-white/20"
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            <button
              onClick={handleNext}
              className="p-3 bg-brand-white/5 hover:bg-brand-red/10 border border-brand-white/10 hover:border-brand-red text-brand-white hover:text-brand-red transition-all"
              aria-label="Next Testimonial"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
}

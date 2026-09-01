"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { ContentData } from "@/data/content";

interface TestimonialsProps {
  data: ContentData["testimonials"];
}

export default function Testimonials({ data }: TestimonialsProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const unsplashAvatars = [
    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=150",
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150",
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150",
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setActiveIndex((prev) => (prev + 1) % data.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [data.length]);

  const handleNext = () => {
    setDirection(1);
    setActiveIndex((prev) => (prev + 1) % data.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setActiveIndex((prev) => (prev - 1 + data.length) % data.length);
  };

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
      scale: 0.8,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0,
      scale: 0.8,
    }),
  };

  const currentTestimonial = data[activeIndex];

  return (
    <section id="depoimentos" className="relative py-32 bg-brand-black z-10 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-brand-red/5 rounded-full blur-3xl"
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-20"
        >
          <motion.span 
            className="text-brand-red font-extrabold uppercase tracking-[0.3em] text-xs mb-4 block"
            initial={{ opacity: 0, letterSpacing: "0.5em" }}
            whileInView={{ opacity: 1, letterSpacing: "0.3em" }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            DEPOIMENTOS DOS ATLETAS
          </motion.span>
          <h2 className="font-title font-black text-4xl md:text-6xl text-brand-white tracking-tighter uppercase mb-6">
            QUEM TREINA, RECOMENDA
          </h2>
          <motion.div 
            className="w-16 h-1.5 bg-brand-red mx-auto"
            initial={{ width: 0 }}
            whileInView={{ width: 64 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          />
        </motion.div>

        {/* Carousel Container */}
        <div className="relative flex flex-col items-center justify-center min-h-[400px] w-full max-w-4xl mx-auto">
          
          {/* Main testimonial card */}
          <div className="relative w-full h-[320px] flex items-center justify-center">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={activeIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ type: "spring", stiffness: 200, damping: 25 }}
                className="absolute w-[90%] md:w-[70%] p-8 md:p-10 flex flex-col justify-between h-full bg-gradient-to-b from-brand-dark-gray to-brand-black border border-brand-red/30 shadow-[0_0_40px_rgba(255,30,30,0.15)]"
              >
                {/* Top section */}
                <div className="flex justify-between items-start">
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: 0.2, type: "spring" }}
                  >
                    <Quote className="w-12 h-12 text-brand-red/20" />
                  </motion.div>
                  
                  {/* Stars */}
                  <div className="flex gap-1.5">
                    {Array.from({ length: currentTestimonial.rating }).map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ scale: 0, rotate: -90 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ delay: 0.3 + i * 0.1, type: "spring" }}
                      >
                        <Star className="w-5 h-5 fill-brand-red text-brand-red" />
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Quote text */}
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-brand-white/80 text-sm md:text-lg leading-relaxed my-6 italic font-light"
                >
                  &ldquo;{currentTestimonial.text}&rdquo;
                </motion.p>

                {/* Author info */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                  className="flex items-center gap-5 border-t border-brand-white/10 pt-6"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <motion.img
                    src={unsplashAvatars[activeIndex] || currentTestimonial.image}
                    alt={currentTestimonial.name}
                    className="w-14 h-14 rounded-full object-cover border-2 border-brand-red shadow-[0_0_15px_rgba(255,30,30,0.3)]"
                    whileHover={{ scale: 1.1 }}
                  />
                  <div>
                    <h4 className="font-title font-bold text-sm uppercase text-brand-white tracking-wider">
                      {currentTestimonial.name}
                    </h4>
                    <p className="text-[10px] text-brand-red/70 uppercase tracking-[0.2em] font-extrabold mt-1">
                      {currentTestimonial.role}
                    </p>
                  </div>
                </motion.div>

                {/* Decorative corner accents */}
                <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-brand-red" />
                <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-brand-red" />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center gap-6 mt-12">
            <motion.button
              onClick={handlePrev}
              whileHover={{ scale: 1.1, x: -3 }}
              whileTap={{ scale: 0.9 }}
              className="p-4 bg-brand-white/5 hover:bg-brand-red/10 border border-brand-white/10 hover:border-brand-red text-brand-white hover:text-brand-red transition-all duration-300"
              aria-label="Previous Testimonial"
            >
              <ChevronLeft className="w-6 h-6" />
            </motion.button>
            
            {/* Dots indicators */}
            <div className="flex gap-3">
              {data.map((_, idx) => (
                <motion.button
                  key={idx}
                  onClick={() => {
                    setDirection(idx > activeIndex ? 1 : -1);
                    setActiveIndex(idx);
                  }}
                  className={`h-2 transition-all duration-300 ${
                    activeIndex === idx ? "bg-brand-red" : "bg-brand-white/20 hover:bg-brand-white/40"
                  }`}
                  animate={{
                    width: activeIndex === idx ? 32 : 8,
                    boxShadow: activeIndex === idx ? "0 0 10px rgba(255,30,30,0.5)" : "none",
                  }}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            <motion.button
              onClick={handleNext}
              whileHover={{ scale: 1.1, x: 3 }}
              whileTap={{ scale: 0.9 }}
              className="p-4 bg-brand-white/5 hover:bg-brand-red/10 border border-brand-white/10 hover:border-brand-red text-brand-white hover:text-brand-red transition-all duration-300"
              aria-label="Next Testimonial"
            >
              <ChevronRight className="w-6 h-6" />
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  );
}

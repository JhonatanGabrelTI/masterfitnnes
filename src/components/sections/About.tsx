"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Dumbbell, Target, ShieldCheck } from "lucide-react";
import { ContentData } from "@/data/content";

interface AboutProps {
  data: ContentData["about"];
}

export default function About({ data }: AboutProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Track scroll position of the section to create Parallax
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Parallax translation for the image
  const imgY = useTransform(scrollYProgress, [0, 1], [-60, 60]);

  // Motion variants for text content
  const textVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring" as const,
        stiffness: 80,
        damping: 15,
      },
    },
  };

  return (
    <section 
      ref={containerRef}
      id="sobre" 
      className="relative py-24 bg-brand-black overflow-hidden z-10"
    >
      {/* Decorative Energy Lines in background */}
      <div className="absolute inset-0 pointer-events-none opacity-10">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="line-glow" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FF1E1E" stopOpacity="0" />
              <stop offset="50%" stopColor="#FF1E1E" stopOpacity="1" />
              <stop offset="100%" stopColor="#FF1E1E" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d="M-100,200 L1200,600 M200,-50 L800,800 M900,100 L300,900" stroke="url(#line-glow)" strokeWidth="1.5" fill="none" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Left Column: Parallax Image */}
          <div className="lg:col-span-6 relative h-[400px] md:h-[600px] overflow-hidden border border-brand-white/10 group">
            {/* Red accent frame corner */}
            <div className="absolute -top-1 -left-1 w-8 h-8 border-t-4 border-l-4 border-brand-red z-20" />
            <div className="absolute -bottom-1 -right-1 w-8 h-8 border-b-4 border-r-4 border-brand-red z-20" />
            
            {/* Parallax Image container */}
            <motion.div 
              style={{ y: imgY }} 
              className="absolute -top-20 -bottom-20 left-0 right-0 w-full"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img 
                src="https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=1200" 
                alt="Treino na Master Fitness" 
                className="w-full h-full object-cover grayscale brightness-90 contrast-110 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
              />
            </motion.div>
            
            {/* Dark overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-brand-black/40 to-transparent pointer-events-none" />
          </div>

          {/* Right Column: Content */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={textVariants}
            >
              <span className="text-brand-red font-extrabold uppercase tracking-widest text-xs mb-3 block">
                CONHEÇA A MASTER FITNESS
              </span>
              
              <h2 className="font-title font-black text-3xl md:text-5xl text-brand-white tracking-tighter uppercase mb-6 leading-tight">
                {data.title}
              </h2>
              
              <p className="text-brand-white/90 text-md font-semibold leading-relaxed mb-6 border-l-2 border-brand-red pl-4">
                {data.subtitle}
              </p>
              
              <div className="space-y-4 text-brand-white/70 text-sm md:text-base mb-10 leading-relaxed">
                <p>{data.text1}</p>
                <p>{data.text2}</p>
              </div>

              {/* Core Pillars */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-brand-white/10">
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-3">
                    <Dumbbell className="w-5 h-5 text-brand-red" />
                    <h4 className="font-bold text-xs uppercase text-brand-white tracking-wider">Estrutura</h4>
                  </div>
                  <p className="text-xs text-brand-white/50">Equipamentos modernos e área livre de treino.</p>
                </div>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-3">
                    <Target className="w-5 h-5 text-brand-red" />
                    <h4 className="font-bold text-xs uppercase text-brand-white tracking-wider">Foco</h4>
                  </div>
                  <p className="text-xs text-brand-white/50">Acompanhamento e programas de resultado.</p>
                </div>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-3">
                    <ShieldCheck className="w-5 h-5 text-brand-red" />
                    <h4 className="font-bold text-xs uppercase text-brand-white tracking-wider">Qualidade</h4>
                  </div>
                  <p className="text-xs text-brand-white/50">Profissionais experientes certificados.</p>
                </div>
              </div>

            </motion.div>
          </div>
          
        </div>
      </div>
    </section>
  );
}

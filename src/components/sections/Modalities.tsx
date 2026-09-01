"use client";

import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ContentData } from "@/data/content";
import { ArrowRight } from "lucide-react";

interface ModalitiesProps {
  data: ContentData["modalities"];
}

function ModalityCard({ title, description, image, index }: { title: string; description: string; image: string; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Motion values for smooth 3D effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Spring physics for smooth animation
  const springConfig = { damping: 15, stiffness: 150 };
  const rotateX = useSpring(useTransform(y, [-150, 150], [10, -10]), springConfig);
  const rotateY = useSpring(useTransform(x, [-150, 150], [-10, 10]), springConfig);

  // Glow position
  const glowX = useSpring(useTransform(x, [-150, 150], [0, 100]), springConfig);
  const glowY = useSpring(useTransform(y, [-150, 150], [0, 100]), springConfig);

  // Map default images to high-performance Unsplash assets
  const unsplashImages: Record<string, string> = {
    "Musculação": "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=600",
    "Aula de Funcional": "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=600",
    "Aula de ABS": "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=600",
    "Aula de Jump": "https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=600",
    "Bike Indoor (Spinning)": "https://images.unsplash.com/photo-1538797539774-1213dba5451c?q=80&w=600",
  };

  const displayImage = image || unsplashImages[title];

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    x.set(e.clientX - centerX);
    y.set(e.clientY - centerY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 80, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ 
        duration: 0.6, 
        delay: index * 0.1,
        type: "spring",
        stiffness: 100,
      }}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className="relative h-[420px] w-full bg-brand-dark-gray border border-brand-white/5 overflow-hidden group cursor-pointer"
    >
      {/* Dynamic Glow Spotlight */}
      <motion.div
        className="absolute inset-0 pointer-events-none z-20"
        style={{
          background: useTransform(
            [glowX, glowY],
            ([gx, gy]) => `radial-gradient(circle 200px at ${gx}% ${gy}%, rgba(255, 30, 30, 0.25), transparent 80%)`
          ),
          opacity: isHovered ? 1 : 0,
        }}
      />

      {/* Animated border gradient */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10">
        <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-brand-red to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-brand-red to-transparent" />
        <div className="absolute top-0 left-0 h-full w-[2px] bg-gradient-to-b from-transparent via-brand-red to-transparent" />
        <div className="absolute top-0 right-0 h-full w-[2px] bg-gradient-to-b from-transparent via-brand-red to-transparent" />
      </div>

      {/* Grid Pattern inside card */}
      <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.02)_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none z-10" />

      {/* Image with parallax effect */}
      <motion.div 
        className="absolute inset-0 bg-brand-black"
        style={{ transform: "translateZ(-50px)" }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <motion.img
          src={displayImage}
          alt={title}
          className="w-full h-full object-cover grayscale brightness-75"
          animate={{
            scale: isHovered ? 1.15 : 1,
            grayscale: isHovered ? 0 : 1,
            brightness: isHovered ? 1.1 : 0.75,
          }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />
        {/* Linear overlay */}
        <motion.div 
          className="absolute inset-0 z-10"
          animate={{
            background: isHovered 
              ? "linear-gradient(to top, rgba(5,5,5,1) 0%, rgba(5,5,5,0.7) 40%, rgba(5,5,5,0.3) 100%)"
              : "linear-gradient(to top, rgba(5,5,5,1) 0%, rgba(5,5,5,0.5) 50%, rgba(5,5,5,0.2) 100%)",
          }}
          transition={{ duration: 0.4 }}
        />
      </motion.div>

      {/* Card Content */}
      <div className="relative z-20 h-full flex flex-col justify-end p-8" style={{ transform: "translateZ(30px)" }}>
        {/* Animated icon bar */}
        <motion.div
          className="w-12 h-1.5 bg-brand-red mb-4"
          animate={{ width: isHovered ? 64 : 48 }}
          transition={{ duration: 0.3 }}
        />
        
        <motion.h3 
          className="font-title font-black text-2xl md:text-3xl uppercase text-brand-white tracking-tighter mb-3"
          animate={{ 
            color: isHovered ? "#FF1E1E" : "#FFFFFF",
            x: isHovered ? 8 : 0,
          }}
          transition={{ duration: 0.3 }}
        >
          {title}
        </motion.h3>
        
        <motion.p 
          className="text-brand-white/60 text-sm leading-relaxed max-w-xs"
          animate={{ 
            color: isHovered ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.6)",
          }}
          transition={{ duration: 0.3 }}
        >
          {description}
        </motion.p>

        {/* Reveal on hover - CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 20 }}
          transition={{ duration: 0.3 }}
          className="mt-4 flex items-center gap-2 text-brand-red font-bold text-sm uppercase tracking-wider"
        >
          <span>Saiba mais</span>
          <ArrowRight className="w-4 h-4" />
        </motion.div>
      </div>

      {/* Corner accents */}
      <motion.div 
        className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 z-30"
        animate={{ borderColor: isHovered ? "#FF1E1E" : "rgba(255,255,255,0.1)" }}
        transition={{ duration: 0.3 }}
      />
      <motion.div 
        className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 z-30"
        animate={{ borderColor: isHovered ? "#FF1E1E" : "rgba(255,255,255,0.1)" }}
        transition={{ duration: 0.3 }}
      />
      <motion.div 
        className="absolute bottom-4 left-4 w-6 h-6 border-b-2 border-l-2 z-30"
        animate={{ borderColor: isHovered ? "#FF1E1E" : "rgba(255,255,255,0.1)" }}
        transition={{ duration: 0.3 }}
      />
      <motion.div 
        className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 z-30"
        animate={{ borderColor: isHovered ? "#FF1E1E" : "rgba(255,255,255,0.1)" }}
        transition={{ duration: 0.3 }}
      />

      {/* Floating number */}
      <div className="absolute top-6 right-6 font-title font-black text-6xl text-brand-white/5 z-10 pointer-events-none">
        {String(index + 1).padStart(2, "0")}
      </div>
    </motion.div>
  );
}

export default function Modalities({ data }: ModalitiesProps) {
  return (
    <section id="modalidades" className="relative py-32 bg-brand-black z-10 overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          className="absolute -top-40 -right-40 w-80 h-80 border border-brand-red/5 rounded-full"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-40 -left-40 w-96 h-96 border border-brand-red/5 rounded-full"
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
            MODALIDADES
          </motion.span>
          <h2 className="font-title font-black text-4xl md:text-6xl text-brand-white tracking-tighter uppercase mb-6">
            ESCOLHA O SEU CAMINHO
          </h2>
          <motion.div 
            className="w-16 h-1.5 bg-brand-red mx-auto mb-8"
            initial={{ width: 0 }}
            whileInView={{ width: 64 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          />
          <p className="text-brand-white/60 text-base md:text-lg leading-relaxed">
            Oferecemos uma variedade de modalidades de treinamento focadas em performance e superação de limites.
          </p>
        </motion.div>

        {/* Modalities Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {data.map((modality, idx) => (
            <ModalityCard
              key={modality.id}
              title={modality.title}
              description={modality.description}
              image={modality.image}
              index={idx}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

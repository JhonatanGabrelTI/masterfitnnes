"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { ContentData } from "@/data/content";

interface ModalitiesProps {
  data: ContentData["modalities"];
}

function ModalityCard({ title, description, image, index }: { title: string; description: string; image: string; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [glowPos, setGlowPos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

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
    const width = rect.width;
    const height = rect.height;

    // Mouse coordinates relative to card
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    // Calculate rotation angles (-15deg to 15deg)
    const rX = ((mouseY - height / 2) / height) * -15;
    const rY = ((mouseX - width / 2) / width) * 15;

    setRotateX(rX);
    setRotateY(rY);
    setGlowPos({ x: mouseX, y: mouseY });
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
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
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative interactive-card h-[380px] w-full bg-brand-dark-gray border border-brand-white/5 overflow-hidden group cursor-pointer flex flex-col justify-end p-6"
      style={{
        transformStyle: "preserve-3d",
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(${isHovered ? "-8px" : "0px"})`,
        transition: isHovered ? "none" : "all 0.5s ease",
      }}
    >
      {/* Dynamic Glow Spotlight */}
      <div
        className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20"
        style={{
          background: `radial-gradient(circle 180px at ${glowPos.x}px ${glowPos.y}px, rgba(255, 30, 30, 0.18), transparent 80%)`,
        }}
      />

      {/* Grid Pattern inside card */}
      <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.015)_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none z-10" />

      {/* Image Overlay */}
      <div className="absolute inset-0 bg-brand-black">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={displayImage}
          alt={title}
          className="w-full h-full object-cover grayscale opacity-40 group-hover:scale-110 group-hover:grayscale-0 group-hover:opacity-65 transition-all duration-700"
        />
        {/* Linear overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-brand-black/35 to-transparent z-10" />
      </div>

      {/* Card Content */}
      <div className="relative z-20 flex flex-col gap-2" style={{ transform: "translateZ(30px)" }}>
        <span className="w-8 h-1 bg-brand-red mb-2 transition-all duration-500 group-hover:w-16" />
        <h3 className="font-title font-black text-2xl uppercase text-brand-white tracking-tighter group-hover:text-brand-red transition-colors duration-300">
          {title}
        </h3>
        <p className="text-brand-white/60 text-xs md:text-sm leading-relaxed max-w-xs group-hover:text-brand-white/80 transition-colors duration-300">
          {description}
        </p>
      </div>

      {/* Corner borders indicators */}
      <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-brand-white/10 group-hover:border-brand-red transition-colors duration-300" />
      <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-brand-white/10 group-hover:border-brand-red transition-colors duration-300" />
      <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-brand-white/10 group-hover:border-brand-red transition-colors duration-300" />
      <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-brand-white/10 group-hover:border-brand-red transition-colors duration-300" />
    </motion.div>
  );
}

export default function Modalities({ data }: ModalitiesProps) {
  return (
    <section id="modalidades" className="relative py-24 bg-brand-black/95 z-10">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-brand-red font-extrabold uppercase tracking-widest text-xs mb-3 block">
            MODALIDADES
          </span>
          <h2 className="font-title font-black text-3xl md:text-5xl text-brand-white tracking-tighter uppercase">
            ESCOLHA O SEU CAMINHO
          </h2>
          <div className="w-12 h-1 bg-brand-red mx-auto mt-4 mb-6" />
          <p className="text-brand-white/50 text-sm md:text-base">
            Oferecemos uma variedade de modalidades de treinamento focadas em performance e superação de limites.
          </p>
        </div>

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

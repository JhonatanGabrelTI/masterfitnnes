"use client";

import { useRef, useState, useEffect } from "react";
import { Eye } from "lucide-react";
import { ContentData } from "@/data/content";

interface TransformationsProps {
  data: ContentData["transformations"];
}

function ImageSlider({ before, after }: { before: string; after: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [sliderPos, setSliderPos] = useState(50); // percentage 0-100
  const [isDragging, setIsDragging] = useState(false);

  const handleMove = (clientX: number) => {
    const container = containerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPos(percentage);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging && e.buttons !== 1) return;
    handleMove(e.clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length === 0) return;
    handleMove(e.touches[0].clientX);
  };

  useEffect(() => {
    const handleMouseUp = () => setIsDragging(false);
    window.addEventListener("mouseup", handleMouseUp);
    return () => window.removeEventListener("mouseup", handleMouseUp);
  }, []);

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onTouchMove={handleTouchMove}
      onMouseDown={() => setIsDragging(true)}
      onTouchStart={() => setIsDragging(true)}
      className="relative w-full h-[350px] md:h-[480px] overflow-hidden border border-brand-white/10 select-none cursor-ew-resize group"
    >
      {/* After Image (Full background) */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={after}
        alt="Depois"
        className="absolute inset-0 w-full h-full object-cover pointer-events-none brightness-110 contrast-105"
      />
      <span className="absolute bottom-4 right-4 px-3 py-1 bg-brand-red text-brand-white font-title font-extrabold text-[10px] uppercase tracking-widest z-10 neon-glow-red">
        DEPOIS
      </span>

      {/* Before Image (Clipping layer) */}
      <div
        className="absolute inset-0 pointer-events-none overflow-hidden"
        style={{ clipPath: `polygon(0 0, ${sliderPos}% 0, ${sliderPos}% 100%, 0 100%)` }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={before}
          alt="Antes"
          className="absolute inset-0 w-full h-full object-cover pointer-events-none grayscale brightness-75"
        />
      </div>
      <span className="absolute bottom-4 left-4 px-3 py-1 bg-brand-black/80 border border-brand-white/10 text-brand-white/70 font-title font-extrabold text-[10px] uppercase tracking-widest z-10">
        ANTES
      </span>

      {/* Slider Bar */}
      <div
        className="absolute top-0 bottom-0 w-1 bg-brand-red z-20 pointer-events-none shadow-[0_0_10px_rgba(255,30,30,0.8)]"
        style={{ left: `${sliderPos}%` }}
      >
        {/* Slider Handle */}
        <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-brand-black border-2 border-brand-red flex items-center justify-center z-30 shadow-lg cursor-ew-resize group-hover:scale-110 transition-transform duration-250">
          <div className="flex gap-1">
            <span className="w-1 h-3 bg-brand-red rounded-full" />
            <span className="w-1 h-3 bg-brand-red rounded-full" />
          </div>
        </div>
      </div>

      {/* Instructions Overlay */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 bg-brand-black/60 backdrop-blur-sm border border-brand-white/5 pointer-events-none flex items-center gap-2 z-10 text-[9px] uppercase tracking-widest text-brand-white/80">
        <Eye className="w-3.5 h-3.5 text-brand-red" />
        Arraste para comparar
      </div>
    </div>
  );
}

export default function Transformations({ data }: TransformationsProps) {
  const [activeIdx, setActiveIdx] = useState(0);

  // Map local files to high quality Unsplash fitness photos showing transformations
  const unsplashTransformations = [
    {
      before: "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?q=80&w=600", // Guy lifting weights
      after: "https://images.unsplash.com/photo-1567013127542-490d757e51fc?q=80&w=600", // Ripped bodybuilder
    },
    {
      before: "https://images.unsplash.com/photo-1518310383802-640c2de311b2?q=80&w=600", // Rope training
      after: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=600", // ABS fitness model
    },
  ];

  return (
    <section id="resultados" className="relative py-24 bg-brand-black z-10 border-b border-brand-white/5">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Left Column: Descriptions and Selectors */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <span className="text-brand-red font-extrabold uppercase tracking-widest text-xs mb-3 block">
              EVOLUÇÃO DOS ALUNOS
            </span>
            <h2 className="font-title font-black text-3xl md:text-5xl text-brand-white tracking-tighter uppercase mb-6 leading-tight">
              RESULTADOS COMPROVADOS
            </h2>
            <div className="w-12 h-1 bg-brand-red mb-6" />
            <p className="text-brand-white/60 text-sm md:text-base leading-relaxed mb-8">
              A dedicação molda os resultados. Veja de perto as incríveis transformações físicas dos alunos que confiaram no método Master Fitness.
            </p>

            {/* Students Switchers */}
            <div className="flex flex-col gap-3">
              {data.map((student, idx) => (
                <button
                  key={student.id}
                  onClick={() => setActiveIdx(idx)}
                  className={`p-4 text-left border transition-all duration-300 ${
                    activeIdx === idx
                      ? "border-brand-red bg-brand-red/5"
                      : "border-brand-white/5 bg-brand-white/2 hover:bg-brand-white/5"
                  }`}
                >
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-title font-bold text-sm uppercase text-brand-white">
                      {student.studentName}
                    </span>
                    <span className="text-[10px] text-brand-red font-black uppercase tracking-wider">
                      {idx === 0 ? "Ganho de Massa" : "Perda de Gordura"}
                    </span>
                  </div>
                  <p className="text-xs text-brand-white/50 leading-relaxed truncate max-w-xs md:max-w-sm">
                    {student.description}
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* Right Column: Draggable Slider */}
          <div className="lg:col-span-7">
            <ImageSlider
              before={unsplashTransformations[activeIdx]?.before || data[activeIdx].beforeImage}
              after={unsplashTransformations[activeIdx]?.after || data[activeIdx].afterImage}
            />
          </div>

        </div>

      </div>
    </section>
  );
}

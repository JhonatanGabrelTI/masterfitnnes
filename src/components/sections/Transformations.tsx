"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Eye, MoveHorizontal } from "lucide-react";
import { ContentData } from "@/data/content";

interface TransformationsProps {
  data: ContentData["transformations"];
}

function ImageSlider({ before, after, label }: { before: string; after: string; label: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [sliderPos, setSliderPos] = useState(48);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    const stopDragging = () => setIsDragging(false);
    window.addEventListener("mouseup", stopDragging);
    window.addEventListener("touchend", stopDragging);
    return () => {
      window.removeEventListener("mouseup", stopDragging);
      window.removeEventListener("touchend", stopDragging);
    };
  }, []);

  const handleMove = (clientX: number) => {
    const container = containerRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    setSliderPos(Math.max(3, Math.min(97, ((clientX - rect.left) / rect.width) * 100)));
  };

  return (
    <div
      ref={containerRef}
      onMouseDown={(event) => {
        setIsDragging(true);
        handleMove(event.clientX);
      }}
      onMouseMove={(event) => {
        if (isDragging || event.buttons === 1) handleMove(event.clientX);
      }}
      onTouchStart={(event) => {
        setIsDragging(true);
        handleMove(event.touches[0].clientX);
      }}
      onTouchMove={(event) => handleMove(event.touches[0].clientX)}
      className="group relative h-[430px] w-full cursor-ew-resize touch-pan-y select-none overflow-hidden border border-white/10 md:h-[620px]"
      aria-label={`Comparação de evolução de ${label}`}
    >
      <Image src={after} alt="" fill sizes="(max-width: 1024px) 100vw, 58vw" className="pointer-events-none scale-110 object-cover opacity-40 blur-xl" aria-hidden="true" />
      <Image src={after} alt={`Depois de ${label}`} fill sizes="(max-width: 1024px) 100vw, 58vw" className="pointer-events-none object-contain" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/10" />

      <div
        className="absolute inset-0 overflow-hidden"
        style={{ clipPath: `polygon(0 0, ${sliderPos}% 0, ${sliderPos}% 100%, 0 100%)` }}
      >
        <Image src={before} alt="" fill sizes="(max-width: 1024px) 100vw, 58vw" className="pointer-events-none scale-110 object-cover opacity-40 blur-xl grayscale" aria-hidden="true" />
        <Image src={before} alt={`Antes de ${label}`} fill sizes="(max-width: 1024px) 100vw, 58vw" className="pointer-events-none object-contain grayscale brightness-75" />
        <div className="absolute inset-0 bg-black/10" />
      </div>

      <span className="absolute bottom-5 left-5 border border-white/10 bg-brand-black/85 px-4 py-2 text-[9px] font-black uppercase tracking-[0.22em] text-white/65 backdrop-blur-md">Antes</span>
      <span className="absolute bottom-5 right-5 bg-brand-red px-4 py-2 text-[9px] font-black uppercase tracking-[0.22em] text-white shadow-[0_8px_25px_rgba(255,30,30,.25)]">Depois</span>

      <div className="absolute left-1/2 top-5 flex -translate-x-1/2 items-center gap-2 border border-white/10 bg-black/60 px-4 py-2 text-[8px] font-black uppercase tracking-[0.18em] text-white/72 backdrop-blur-md">
        <Eye className="h-3.5 w-3.5 text-brand-red" /> Arraste para comparar
      </div>

      <div className="pointer-events-none absolute inset-y-0 z-20 w-[2px] bg-brand-red shadow-[0_0_16px_rgba(255,30,30,.95)]" style={{ left: `${sliderPos}%` }}>
        <motion.div
          animate={{ scale: isDragging ? 1.12 : 1 }}
          className="absolute left-1/2 top-1/2 grid h-14 w-14 -translate-x-1/2 -translate-y-1/2 place-items-center border-2 border-brand-red bg-brand-black shadow-[0_0_30px_rgba(255,30,30,.3)]"
        >
          <MoveHorizontal className="h-5 w-5 text-white" />
        </motion.div>
      </div>
    </div>
  );
}

export default function Transformations({ data }: TransformationsProps) {
  const [activeIdx, setActiveIdx] = useState(0);
  const activeStudent = data[activeIdx];

  if (!activeStudent) return null;

  return (
    <section id="resultados" className="section-shell border-b border-white/5 bg-brand-black">
      <div className="absolute inset-0 gym-grid opacity-20" />
      <div className="relative mx-auto max-w-[1440px] px-5 md:px-10 lg:px-14">
        <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <div className="section-kicker"><span>04</span> Evolução dos alunos</div>
            <h2 className="section-title mb-7 mt-5">Resultados comprovados</h2>
            <p className="mb-10 max-w-xl text-sm leading-7 text-white/52 md:text-base">
              A dedicação molda os resultados. Veja de perto as incríveis transformações físicas dos alunos que confiaram no método Master Fitness.
            </p>

            <div className="border-l border-t border-white/10">
              {data.map((student, index) => {
                const active = activeIdx === index;
                return (
                  <button
                    key={student.id}
                    onClick={() => setActiveIdx(index)}
                    className={`group relative flex w-full items-center gap-5 border-r border-b p-5 text-left transition-all duration-400 md:p-6 ${
                      active ? "border-brand-red/60 bg-brand-red/[0.07]" : "border-white/10 bg-white/[0.015] hover:bg-white/[0.04]"
                    }`}
                  >
                    <span className={`font-title text-xl font-black transition-colors ${active ? "text-brand-red" : "text-white/20"}`}>0{index + 1}</span>
                    <span className="min-w-0 flex-1">
                      <span className="block font-title text-base font-black uppercase tracking-tight text-white">{student.studentName}</span>
                      <span className="mt-1 block truncate text-xs text-white/42">{student.description}</span>
                    </span>
                    <ArrowUpRight className={`h-5 w-5 shrink-0 transition-all ${active ? "text-brand-red" : "text-white/20 group-hover:text-white"}`} />
                    {active && <motion.span layoutId="active-result" className="absolute inset-y-0 left-[-1px] w-[3px] bg-brand-red shadow-[0_0_14px_rgba(255,30,30,.7)]" />}
                  </button>
                );
              })}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeStudent.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="mt-7 border-l-2 border-brand-red pl-5"
              >
                <span className="text-[9px] font-black uppercase tracking-[0.22em] text-brand-red">História de evolução</span>
                <h3 className="mt-2 font-title text-xl font-black uppercase text-white">{activeStudent.title}</h3>
                <p className="mt-2 text-xs leading-5 text-white/48">{activeStudent.description}</p>
              </motion.div>
            </AnimatePresence>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 45 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative lg:col-span-7"
          >
            <span className="absolute -right-2 -top-12 hidden font-title text-[8rem] font-black leading-none text-white/[0.025] md:block">0{activeIdx + 1}</span>
            <AnimatePresence mode="wait">
              <motion.div key={activeStudent.id} initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.01 }} transition={{ duration: 0.4 }}>
                <ImageSlider before={activeStudent.beforeImage} after={activeStudent.afterImage} label={activeStudent.studentName} />
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

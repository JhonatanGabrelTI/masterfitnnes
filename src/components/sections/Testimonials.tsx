"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Quote, Star } from "lucide-react";
import { ContentData } from "@/data/content";

interface TestimonialsProps {
  data: ContentData["testimonials"];
}

export default function Testimonials({ data }: TestimonialsProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = data[activeIndex];

  useEffect(() => {
    if (!data.length) return;
    const timer = window.setInterval(() => setActiveIndex((index) => (index + 1) % data.length), 7000);
    return () => window.clearInterval(timer);
  }, [data.length]);

  if (!active) return null;

  const go = (direction: number) => setActiveIndex((index) => (index + direction + data.length) % data.length);

  return (
    <section id="depoimentos" className="section-shell light-section border-b border-black/5">
      <div className="absolute inset-0 gym-grid opacity-20" />
      <div className="absolute left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-red/[0.045] blur-[110px]" />

      <div className="relative mx-auto max-w-[1440px] px-5 md:px-10 lg:px-14">
        <div className="light-copy mb-14 flex flex-col justify-between gap-7 md:flex-row md:items-end">
          <div>
            <div className="section-kicker"><span>05</span> Depoimentos dos atletas</div>
            <h2 className="section-title mt-5">Quem treina, recomenda</h2>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => go(-1)} className="grid h-12 w-12 place-items-center border border-black/10 bg-white text-black transition-all hover:border-brand-red hover:text-brand-red" aria-label="Depoimento anterior">
              <ArrowLeft className="h-5 w-5" />
            </button>
            <button onClick={() => go(1)} className="grid h-12 w-12 place-items-center bg-brand-red text-white transition-transform hover:-translate-y-1" aria-label="Próximo depoimento">
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="relative min-h-[510px] overflow-hidden border border-white/10 bg-brand-black md:min-h-[470px]">
          <span className="absolute right-6 top-3 font-title text-[9rem] font-black leading-none text-white/[0.025] md:right-12 md:text-[15rem]">“</span>
          <AnimatePresence mode="wait">
            <motion.article
              key={active.id}
              initial={{ opacity: 0, x: 45 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -35 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="grid min-h-[510px] md:min-h-[470px] md:grid-cols-[0.72fr_1.28fr]"
            >
              <div className="relative min-h-[230px] overflow-hidden border-b border-white/10 md:min-h-full md:border-b-0 md:border-r">
                <Image src={active.image} alt="" fill sizes="(max-width: 768px) 100vw, 36vw" className="scale-110 object-cover opacity-45 blur-xl" aria-hidden="true" />
                <Image src={active.image} alt={active.name} fill sizes="(max-width: 768px) 100vw, 36vw" className="object-contain transition-transform duration-1000 hover:scale-[1.025]" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/10" />
                <span className="absolute bottom-5 left-5 border border-white/10 bg-black/60 px-3 py-2 text-[9px] font-black uppercase tracking-[0.2em] text-white/75 backdrop-blur-md">Aluno Master</span>
              </div>

              <div className="relative flex flex-col justify-between p-7 md:p-12 lg:p-16">
                <div>
                  <div className="mb-7 flex items-center justify-between">
                    <Quote className="h-8 w-8 text-brand-red" />
                    <div className="flex gap-1">
                      {Array.from({ length: active.rating }).map((_, index) => <Star key={index} className="h-4 w-4 fill-brand-red text-brand-red" />)}
                    </div>
                  </div>
                  <blockquote className="max-w-3xl font-title text-xl font-semibold leading-relaxed text-white/88 md:text-3xl md:leading-snug">
                    “{active.text}”
                  </blockquote>
                </div>

                <div className="mt-9 flex items-end justify-between gap-5 border-t border-white/10 pt-6">
                  <div>
                    <h3 className="font-title text-lg font-black uppercase tracking-tight text-white">{active.name}</h3>
                    <p className="mt-1 text-[9px] font-black uppercase tracking-[0.2em] text-brand-red">{active.role}</p>
                  </div>
                  <span className="font-title text-sm font-black text-white/22">0{activeIndex + 1} / 0{data.length}</span>
                </div>
              </div>
            </motion.article>
          </AnimatePresence>

          <div className="absolute inset-x-0 bottom-0 flex h-[3px] bg-white/5">
            {data.map((item, index) => (
              <button key={item.id} onClick={() => setActiveIndex(index)} className="relative h-full flex-1" aria-label={`Ver depoimento ${index + 1}`}>
                {activeIndex === index && <motion.span layoutId="testimonial-progress" className="absolute inset-0 bg-brand-red" />}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

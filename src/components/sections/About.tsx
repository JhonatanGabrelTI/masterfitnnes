"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { Dumbbell, ShieldCheck, Target } from "lucide-react";
import { ContentData } from "@/data/content";

interface AboutProps {
  data: ContentData["about"];
}

const pillars = [
  { icon: Dumbbell, title: "Estrutura", text: "Equipamentos modernos e área livre de treino." },
  { icon: Target, title: "Foco", text: "Acompanhamento e programas de resultado." },
  { icon: ShieldCheck, title: "Qualidade", text: "Profissionais experientes certificados." },
];

export default function About({ data }: AboutProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], [-35, 35]);

  return (
    <section ref={containerRef} id="sobre" className="section-shell light-section">
      <div className="absolute right-0 top-0 h-48 w-48 border-l border-b border-white/5 gym-grid opacity-60" />
      <div className="relative mx-auto grid max-w-[1440px] gap-14 px-5 md:px-10 lg:grid-cols-12 lg:items-center lg:gap-20 lg:px-14">
        <motion.div
          initial={{ opacity: 0, x: -45 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative lg:col-span-6"
        >
          <div className="relative ml-4 h-[460px] overflow-hidden border border-white/10 md:h-[650px] md:ml-8">
            <motion.div style={{ y: imageY }} className="absolute -inset-y-12 inset-x-0">
              <Image
                src={data.imageUrl}
                alt="Estrutura da Master Fitness"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover brightness-[1.12] contrast-[1.04] transition-transform duration-1000 hover:scale-[1.035]"
              />
            </motion.div>
            <div className="absolute inset-0 bg-gradient-to-t from-brand-black/48 via-transparent to-black/5" />
            <div className="absolute inset-0 ring-1 ring-inset ring-white/10" />
            <div className="absolute bottom-0 left-0 border-r border-t border-white/10 bg-brand-black/85 px-6 py-5 backdrop-blur-md md:px-8">
              <span className="block text-[9px] font-black uppercase tracking-[0.28em] text-brand-red">Desde o primeiro treino</span>
              <span className="mt-1 block font-title text-2xl font-black uppercase text-white">Estrutura para evoluir</span>
            </div>
          </div>
          <div className="absolute -left-1 top-10 hidden h-48 w-[3px] bg-brand-red shadow-[0_0_20px_rgba(255,30,30,.65)] md:block" />
          <div className="absolute -bottom-6 right-[-6px] z-10 hidden h-44 w-44 border border-brand-red/35 md:block">
            <div className="absolute inset-3 border border-white/10 gym-grid" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
          className="light-copy lg:col-span-6"
        >
          <div className="section-kicker"><span>01</span> Conheça a Master Fitness</div>
          <h2 className="section-title mt-5 max-w-[680px]">{data.title}</h2>
          <p className="mt-7 border-l-2 border-brand-red pl-5 text-base font-semibold leading-relaxed text-black/80 md:text-lg">
            {data.subtitle}
          </p>
          <div className="mt-7 max-w-2xl space-y-4 text-sm leading-7 text-black/58 md:text-base">
            <p>{data.text1}</p>
            <p>{data.text2}</p>
          </div>

          <div className="mt-10 grid border-l border-t border-black/10 sm:grid-cols-3">
            {pillars.map(({ icon: Icon, title, text }, index) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + index * 0.1 }}
                className="group border-r border-b border-black/10 bg-white/55 p-5 transition-all hover:-translate-y-1 hover:bg-white hover:shadow-[0_18px_45px_rgba(0,0,0,.08)]"
              >
                <Icon className="h-5 w-5 text-brand-red transition-transform group-hover:-translate-y-1" />
                <h3 className="mt-5 text-xs font-black uppercase tracking-[0.14em] text-black">{title}</h3>
                <p className="mt-2 text-xs leading-5 text-black/50">{text}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

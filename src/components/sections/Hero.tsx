"use client";

import { motion } from "framer-motion";
import { ArrowDown, ArrowUpRight, MessageCircle } from "lucide-react";
import Image from "next/image";
import { ContentData } from "@/data/content";

interface HeroProps {
  data: ContentData["hero"];
}

export default function Hero({ data }: HeroProps) {
  const titleWords = data.title.split(" ");

  return (
    <section className="relative min-h-[760px] w-full overflow-hidden bg-brand-black pt-32 lg:h-screen lg:min-h-[820px] lg:pt-0">
      <div className="absolute inset-0">
        <Image
          src="/images/campaigns/treino-monstro.jpeg"
          alt="Treino na Master Fitness"
          fill
          priority
          sizes="100vw"
          className="scale-[1.025] object-cover object-center opacity-55"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,#050505_0%,rgba(5,5,5,.92)_28%,rgba(5,5,5,.52)_62%,rgba(5,5,5,.35)_100%)]" />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-transparent to-black/65" />
        <div className="absolute inset-0 hero-vignette" />
        <div className="absolute inset-0 gym-grid opacity-25" />
      </div>

      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.2, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        className="absolute left-0 top-[42%] h-px w-[20vw] origin-left bg-gradient-to-r from-brand-red to-transparent"
      />

      <div className="relative z-10 mx-auto flex min-h-[calc(100vh-1px)] max-w-[1440px] items-center px-5 py-20 md:px-10 lg:px-14 lg:pt-28">
        <div className="w-full max-w-[940px]">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.65, delay: 0.25 }}
            className="mb-7 flex items-center gap-4"
          >
            <span className="h-px w-10 bg-brand-red" />
            <span className="text-[10px] font-black uppercase tracking-[0.34em] text-white/72 md:text-xs">
              Performance & Disciplina em Ibaiti
            </span>
          </motion.div>

          <h1 className="max-w-[920px] font-title text-[clamp(3.7rem,8.2vw,8.2rem)] font-black uppercase leading-[0.82] tracking-[-0.055em] text-white">
            {titleWords.map((word, index) => {
              const highlighted = word === "MELHOR" || word === "VERSÃO";
              return (
                <span key={`${word}-${index}`} className="mr-[0.18em] inline-block overflow-hidden pb-[0.08em]">
                  <motion.span
                    initial={{ y: "115%", rotate: 3 }}
                    animate={{ y: 0, rotate: 0 }}
                    transition={{
                      duration: 0.8,
                      delay: 0.35 + index * 0.08,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className={`inline-block ${highlighted ? "text-brand-red text-neon-glow" : "text-white"}`}
                  >
                    {word}
                  </motion.span>
                </span>
              );
            })}
          </h1>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.95 }}
            className="mt-7 grid max-w-[830px] gap-8 border-l border-brand-red/70 pl-5 md:grid-cols-[1fr_auto] md:items-end md:pl-7"
          >
            <p className="max-w-xl text-base leading-relaxed text-white/66 md:text-lg">
              {data.subtitle}
            </p>

            <div className="hidden text-right md:block">
              <span className="block text-[9px] font-bold uppercase tracking-[0.28em] text-white/35">Master Fitness</span>
              <span className="mt-1 block font-title text-lg font-black uppercase tracking-tight text-white">Ibaiti · Paraná</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.1 }}
            className="mt-10 flex flex-col gap-3 sm:flex-row"
          >
            <a
              href={data.enrollLink}
              target="_blank"
              rel="noopener noreferrer"
              className="premium-button group min-w-[245px] bg-brand-red text-white"
            >
              <span>Quero me matricular</span>
              <ArrowUpRight className="h-5 w-5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
            <a
              href={data.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="premium-button group min-w-[235px] border border-white/20 bg-black/20 text-white backdrop-blur-md hover:border-brand-red/70 hover:bg-brand-red/10"
            >
              <MessageCircle className="h-5 w-5 text-brand-red transition-transform group-hover:scale-110" />
              <span>Falar no WhatsApp</span>
            </a>
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-0 right-0 z-10 hidden items-stretch border-l border-t border-white/10 bg-brand-black/80 backdrop-blur-md md:flex">
        {["Foco", "Força", "Evolução"].map((word, index) => (
          <motion.div
            key={word}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 + index * 0.1 }}
            className="flex min-w-[132px] items-center gap-3 border-r border-white/10 px-5 py-4"
          >
            <span className="font-title text-xs font-black text-brand-red">0{index + 1}</span>
            <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-white/70">{word}</span>
          </motion.div>
        ))}
      </div>

      <motion.button
        onClick={() => document.getElementById("stats")?.scrollIntoView({ behavior: "smooth" })}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.35 }}
        className="absolute bottom-6 left-5 z-20 flex items-center gap-3 text-[9px] font-black uppercase tracking-[0.26em] text-white/40 transition-colors hover:text-white md:left-10 lg:left-14"
        aria-label="Ir para a próxima seção"
      >
        <span className="grid h-10 w-10 place-items-center border border-white/15 bg-black/20">
          <motion.span animate={{ y: [0, 5, 0] }} transition={{ repeat: Infinity, duration: 1.6 }}>
            <ArrowDown className="h-4 w-4 text-brand-red" />
          </motion.span>
        </span>
        Explore
      </motion.button>
    </section>
  );
}

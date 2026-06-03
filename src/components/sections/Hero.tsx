"use client";

import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { ContentData } from "@/data/content";

interface HeroProps {
  data: ContentData["hero"];
}

export default function Hero({ data }: HeroProps) {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 40, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 15,
      },
    },
  };

  const titleWords = data.title.split(" ");

  const wordVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: (i: number) => ({
      y: 0,
      opacity: 1,
      transition: {
        type: "spring" as const,
        stiffness: 120,
        damping: 12,
        delay: i * 0.1,
      },
    }),
  };

  const handleScrollToStats = () => {
    const nextSection = document.getElementById("stats");
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden z-10">
      {/* Video Background */}
      <div className="absolute inset-0 w-full h-full bg-brand-black">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-45 scale-[1.05]"
          poster="/images/hero-bg.png"
        >
          {/* Using a high-performance, looping fitness video from pexels or unspash source */}
          <source
            src="https://player.vimeo.com/external/494951381.sd.mp4?s=d04e3391740924ec9d9ecf0f2cf7c1abfb874403&profile_id=165&oauth2_token_id=57447761"
            type="video/mp4"
          />
        </video>
        {/* Futuristic Red Radial and linear overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-transparent to-brand-black/80" />
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-brand-black/20 to-brand-black/90" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-brand-red/10 via-transparent to-transparent pointer-events-none" />
      </div>

      {/* Hero Content */}
      <div className="relative max-w-5xl mx-auto px-6 text-center z-10 flex flex-col items-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center"
        >
          {/* Visual tag */}
          <motion.span
            variants={itemVariants}
            className="px-4 py-1 border border-brand-red/40 bg-brand-red/10 text-brand-white text-xs uppercase tracking-widest font-extrabold mb-6 rounded-none flex items-center gap-2"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-brand-red animate-pulse" />
            Performance & Disciplina em Ibaiti
          </motion.span>

          {/* Cinematic Title */}
          <h1 className="font-title font-black text-5xl md:text-7xl lg:text-8.5xl tracking-tighter text-brand-white leading-none uppercase mb-6 drop-shadow-[0_5px_15px_rgba(0,0,0,0.8)]">
            {titleWords.map((word, i) => (
              <span key={i} className="inline-block overflow-hidden mr-3">
                <motion.span
                  custom={i}
                  variants={wordVariants}
                  className={`inline-block ${
                    word === "MELHOR" || word === "VERSÃO" ? "animate-glow-pulse" : "animate-float-white"
                  }`}
                  style={{
                    color: word === "MELHOR" || word === "VERSÃO" ? "#FF1E1E" : "#FFFFFF",
                    animationDelay: `${i * 0.15}s`,
                  }}
                >
                  {word}
                </motion.span>
              </span>
            ))}
          </h1>

          {/* Subtitle */}
          <motion.p
            variants={itemVariants}
            className="text-lg md:text-xl text-brand-white/80 max-w-2xl font-light mb-10 tracking-wide"
          >
            {data.subtitle}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-5 justify-center w-full max-w-md sm:max-w-none"
          >
            {/* Primary CTA (Pulsing Glow) */}
            <a
              href={data.enrollLink}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-brand-red text-brand-white font-title font-bold text-sm uppercase tracking-widest transition-all duration-300 relative overflow-hidden group hover:scale-105 active:scale-95 neon-glow-red flex items-center justify-center animate-shine-button"
            >
              {/* Pulsing overlay */}
              <div className="absolute inset-0 bg-brand-red-neon/30 blur-lg rounded-full scale-0 group-hover:scale-150 transition-transform duration-700" />
              <span className="relative z-10">Quero Me Matricular</span>
              <span className="absolute bottom-0 left-0 w-full h-[3px] bg-brand-white/40 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
            </a>

            {/* Secondary CTA (WhatsApp) */}
            <a
              href={data.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-transparent border-2 border-brand-white/20 hover:border-brand-red hover:bg-brand-red/5 text-brand-white font-title font-bold text-sm uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-2 hover:scale-105 active:scale-95 group"
            >
              <MessageCircle className="w-5 h-5 text-brand-white group-hover:text-brand-red group-hover:scale-110 transition-all duration-300" />
              <span>Falar no WhatsApp</span>
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Down Indicator */}
      <motion.button
        onClick={handleScrollToStats}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: [0.3, 1, 0.3], y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut", delay: 1.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 cursor-pointer"
        aria-label="Scroll Down"
      >
        <span className="text-[10px] text-brand-white/40 uppercase tracking-widest font-extrabold">EXPLORE</span>
        <div className="w-7 h-11 rounded-full border border-brand-white/20 flex justify-center p-1.5 bg-brand-black/20 backdrop-blur-sm">
          <div className="w-1 h-2.5 rounded-full bg-brand-red animate-bounce" />
        </div>
      </motion.button>
    </section>
  );
}

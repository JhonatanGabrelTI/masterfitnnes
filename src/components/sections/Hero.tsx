"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { ContentData } from "@/data/content";
import { useRef } from "react";

interface HeroProps {
  data: ContentData["hero"];
}

export default function Hero({ data }: HeroProps) {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Parallax effect on scroll
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 60, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 12,
      },
    },
  };

  const titleWords = data.title.split(" ");

  const wordVariants = {
    hidden: { y: 80, opacity: 0, rotateX: -40 },
    visible: (i: number) => ({
      y: 0,
      opacity: 1,
      rotateX: 0,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 10,
        delay: i * 0.08,
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
    <section
      ref={containerRef}
      className="relative h-screen w-full flex items-center justify-center overflow-hidden z-10"
    >
      {/* Animated Background with Parallax */}
      <motion.div
        style={{ y, scale }}
        className="absolute inset-0 w-full h-full bg-brand-black"
      >
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-50"
          poster="/images/hero-bg.png"
        >
          <source
            src="https://player.vimeo.com/external/494951381.sd.mp4?s=d04e3391740924ec9d9ecf0f2cf7c1abfb874403&profile_id=165&oauth2_token_id=57447761"
            type="video/mp4"
          />
        </video>
        {/* Enhanced overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-brand-black/60 to-brand-black/90" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-brand-red/15 via-transparent to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(255,30,30,0.1)_0%,_transparent_50%)] animate-breathe" />
      </motion.div>

      {/* Animated particles overlay */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-brand-red rounded-full"
            initial={{
              x: `${20 + i * 15}%`,
              y: "100%",
              opacity: 0,
            }}
            animate={{
              y: "-100%",
              opacity: [0, 0.6, 0],
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              delay: i * 1.5,
              ease: "linear",
            }}
          />
        ))}
      </div>

      {/* Hero Content */}
      <motion.div
        style={{ opacity }}
        className="relative max-w-5xl mx-auto px-6 text-center z-10 flex flex-col items-center"
      >
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center"
        >
          {/* Animated tag with glow */}
          <motion.span
            variants={itemVariants}
            className="px-5 py-2 border border-brand-red/50 bg-brand-red/10 text-brand-white text-xs uppercase tracking-[0.25em] font-extrabold mb-8 rounded-full backdrop-blur-sm flex items-center gap-3 animate-border-glow"
          >
            <span className="w-2 h-2 rounded-full bg-brand-red animate-pulse shadow-[0_0_10px_rgba(255,30,30,0.8)]" />
            Performance & Disciplina em Ibaiti
          </motion.span>

          {/* Cinematic Title with 3D effect */}
          <h1 className="font-title font-black text-5xl md:text-7xl lg:text-9xl tracking-tighter text-brand-white leading-[0.9] uppercase mb-8 drop-shadow-[0_5px_25px_rgba(0,0,0,0.9)]">
            {titleWords.map((word, i) => (
              <span key={i} className="inline-block overflow-hidden mr-3 md:mr-5">
                <motion.span
                  custom={i}
                  variants={wordVariants}
                  className={`inline-block ${
                    word === "MELHOR" || word === "VERSÃO" ? "animate-glow-pulse" : "animate-float-white"
                  }`}
                  style={{
                    color: word === "MELHOR" || word === "VERSÃO" ? "#FF1E1E" : "#FFFFFF",
                    animationDelay: `${i * 0.15}s`,
                    textShadow: word === "MELHOR" || word === "VERSÃO" 
                      ? "0 0 30px rgba(255,30,30,0.6), 0 0 60px rgba(255,30,30,0.3)" 
                      : "none",
                  }}
                >
                  {word}
                </motion.span>
              </span>
            ))}
          </h1>

          {/* Subtitle with typing effect */}
          <motion.p
            variants={itemVariants}
            className="text-lg md:text-2xl text-brand-white/80 max-w-2xl font-light mb-12 tracking-wide leading-relaxed"
          >
            {data.subtitle}
          </motion.p>

          {/* CTA Buttons with enhanced animations */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-5 justify-center w-full max-w-lg sm:max-w-none"
          >
            {/* Primary CTA */}
            <motion.a
              href={data.enrollLink}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-5 bg-gradient-to-r from-brand-red to-brand-red-neon text-brand-white font-title font-bold text-sm uppercase tracking-widest relative overflow-hidden group animate-pulse-glow flex items-center justify-center"
            >
              {/* Animated background shimmer */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                initial={{ x: "-100%" }}
                animate={{ x: "200%" }}
                transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
              />
              <span className="relative z-10 flex items-center gap-2">
                Quero Me Matricular
                <motion.span
                  initial={{ x: 0 }}
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  →
                </motion.span>
              </span>
              {/* Bottom glow line */}
              <motion.div
                className="absolute bottom-0 left-0 h-[3px] bg-white/60"
                initial={{ width: "0%" }}
                whileHover={{ width: "100%" }}
                transition={{ duration: 0.3 }}
              />
            </motion.a>

            {/* Secondary CTA */}
            <motion.a
              href={data.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-5 bg-transparent border-2 border-brand-white/30 hover:border-brand-red text-brand-white font-title font-bold text-sm uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-3 group backdrop-blur-sm"
            >
              <MessageCircle className="w-5 h-5 text-brand-white group-hover:text-brand-red group-hover:scale-110 transition-all duration-300" />
              <span>Falar no WhatsApp</span>
            </motion.a>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Enhanced Scroll Down Indicator */}
      <motion.button
        onClick={handleScrollToStats}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-3 cursor-pointer group"
        aria-label="Scroll Down"
      >
        <span className="text-[10px] text-brand-white/50 uppercase tracking-[0.3em] font-extrabold group-hover:text-brand-red transition-colors">
          EXPLORE
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          className="w-8 h-14 rounded-full border-2 border-brand-white/30 group-hover:border-brand-red flex justify-center p-2 bg-brand-black/40 backdrop-blur-sm"
        >
          <motion.div
            animate={{ height: ["30%", "60%", "30%"] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            className="w-1.5 rounded-full bg-brand-red shadow-[0_0_10px_rgba(255,30,30,0.8)]"
          />
        </motion.div>
      </motion.button>

      {/* Side decorative elements */}
      <div className="absolute left-8 top-1/2 -translate-y-1/2 hidden lg:flex flex-col gap-4">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ delay: 1.5 + i * 0.2 }}
            className="w-8 h-[2px] bg-gradient-to-r from-brand-red to-transparent origin-left"
          />
        ))}
      </div>
      <div className="absolute right-8 top-1/2 -translate-y-1/2 hidden lg:flex flex-col gap-4 items-end">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ delay: 1.5 + i * 0.2 }}
            className="w-8 h-[2px] bg-gradient-to-l from-brand-red to-transparent origin-right"
          />
        ))}
      </div>
    </section>
  );
}

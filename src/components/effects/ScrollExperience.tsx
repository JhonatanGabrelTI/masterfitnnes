"use client";

import { useEffect, useState } from "react";
import { ArrowUp, MessageCircle } from "lucide-react";
import { motion, useScroll, useSpring } from "framer-motion";

interface ScrollExperienceProps {
  whatsappUrl: string;
}

export default function ScrollExperience({ whatsappUrl }: ScrollExperienceProps) {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 26, mass: 0.35 });
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowTop(window.scrollY > window.innerHeight * 1.5);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.div
        style={{ scaleX: progress }}
        className="fixed inset-x-0 top-0 z-[150] h-[3px] origin-left bg-brand-red shadow-[0_0_16px_rgba(255,30,30,.8)]"
      />

      <div className="fixed bottom-5 right-4 z-[80] flex flex-col items-end gap-3 md:bottom-7 md:right-7">
        <motion.button
          initial={false}
          animate={{ opacity: showTop ? 1 : 0, y: showTop ? 0 : 10, pointerEvents: showTop ? "auto" : "none" }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="grid h-11 w-11 place-items-center border border-white/10 bg-brand-black/90 text-white/65 shadow-xl backdrop-blur-md transition-colors hover:border-brand-red hover:text-brand-red"
          aria-label="Voltar ao topo"
        >
          <ArrowUp className="h-4 w-4" />
        </motion.button>

        <motion.a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.5, type: "spring", stiffness: 180, damping: 16 }}
          className="group relative flex h-14 items-center overflow-hidden border border-brand-red/60 bg-brand-black/92 text-white shadow-[0_12px_40px_rgba(0,0,0,.55)] backdrop-blur-xl md:h-16"
          aria-label="Falar com a Master Fitness pelo WhatsApp"
        >
          <span className="absolute inset-0 bg-brand-red/0 transition-colors group-hover:bg-brand-red/10" />
          <span className="relative hidden border-r border-white/10 px-5 text-[9px] font-black uppercase tracking-[0.2em] text-white/70 md:block">
            Fale com a gente
          </span>
          <span className="relative grid h-14 w-14 place-items-center bg-brand-red md:h-16 md:w-16">
            <span className="absolute inset-0 animate-ping bg-brand-red opacity-20" />
            <MessageCircle className="relative h-6 w-6" />
          </span>
        </motion.a>
      </div>
    </>
  );
}

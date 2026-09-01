"use client";

import { motion } from "framer-motion";

export default function Marquee() {
  const words = [
    "MASTER FITNESS", "DISCIPLINA", "FOCO", "PERFORMANCE", "SUPERAÇÃO", "RESULTADOS", 
    "SAÚDE", "FORÇA", "COMPROMISSO", "EVOLUÇÃO", "ALTA INTENSIDADE"
  ];
  
  const repeatedWords = [...words, ...words, ...words];

  return (
    <div className="relative w-full py-6 bg-gradient-to-r from-brand-red via-brand-red-neon to-brand-red overflow-hidden border-y border-brand-red/30 select-none z-10 flex items-center shadow-[0_0_30px_rgba(255,30,30,0.3)]">
      {/* Animated shine effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
        animate={{ x: ["-100%", "200%"] }}
        transition={{ duration: 3, repeat: Infinity, repeatDelay: 2, ease: "easeInOut" }}
      />
      
      <div className="flex whitespace-nowrap animate-marquee gap-10 relative z-10">
        {repeatedWords.map((word, i) => (
          <motion.div 
            key={i} 
            className="flex items-center gap-10"
            whileHover={{ scale: 1.05 }}
          >
            <span className="font-title font-black text-base md:text-lg tracking-[0.2em] text-brand-white uppercase">
              {word}
            </span>
            <motion.span 
              className="w-2.5 h-2.5 bg-brand-white rotate-45 shrink-0"
              animate={{ rotate: [45, 225, 45] }}
              transition={{ duration: 4, repeat: Infinity, delay: i * 0.1 }}
            />
          </motion.div>
        ))}
      </div>
      
      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-33.33%);
          }
        }
        .animate-marquee {
          display: flex;
          animation: marquee 30s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
}

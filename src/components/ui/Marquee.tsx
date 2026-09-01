"use client";

export default function Marquee() {
  const words = [
    "MASTER FITNESS", "DISCIPLINA", "FOCO", "PERFORMANCE", "SUPERAÇÃO", "RESULTADOS", 
    "SAÚDE", "FORÇA", "COMPROMISSO", "EVOLUÇÃO", "ALTA INTENSIDADE"
  ];
  
  // Repeat words to ensure continuous flow
  const repeatedWords = [...words, ...words, ...words];

  return (
    <div className="relative w-full py-5 bg-brand-red overflow-hidden border-y border-brand-red-neon/30 select-none z-10 flex items-center shadow-[0_0_20px_rgba(255,30,30,0.2)]">
      <div className="flex whitespace-nowrap animate-marquee gap-8">
        {repeatedWords.map((word, i) => (
          <div key={i} className="flex items-center gap-8">
            <span className="font-title font-black text-sm md:text-base tracking-widest text-brand-white uppercase">
              {word}
            </span>
            <span className="w-2 h-2 bg-brand-white rotate-45 shrink-0 opacity-80" />
          </div>
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
          animation: marquee 25s linear infinite;
        }
      `}</style>
    </div>
  );
}

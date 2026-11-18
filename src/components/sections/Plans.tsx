"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { ContentData } from "@/data/content";

interface PlansProps {
  data: ContentData["plans"];
  whatsappEnrollUrl: string;
}

export default function Plans({ data }: PlansProps) {
  return (
    <section id="planos" className="section-shell light-section">
      
      {/* Background glowing effects */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[350px] h-[350px] bg-brand-red/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[350px] h-[350px] bg-brand-red/3 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-[1440px] px-5 md:px-10 lg:px-14">
        
        {/* Section Header */}
        <div className="light-copy text-center max-w-2xl mx-auto mb-20">
          <div className="section-kicker justify-center"><span>06</span> Nossos planos</div>
          <h2 className="section-title mx-auto mt-5">
            ESCOLHA O SEU DESAFIO
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-sm leading-6 text-black/52 md:text-base">
            Selecione o plano ideal para as suas metas e inicie sua transformação hoje mesmo.
          </p>
        </div>

        {/* Plans Grid */}
        <div className="mx-auto grid max-w-6xl grid-cols-1 items-stretch gap-4 md:grid-cols-3">
          {data.map((plan, index) => {
            const isRec = plan.recommended;

            return (
              <motion.div
                key={plan.id}
                initial={{ opacity: 1, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`plan-card group relative flex min-h-[570px] select-none flex-col justify-between overflow-hidden border bg-[#0f0f0f] p-7 text-white transition-all duration-500 lg:p-9 ${
                  isRec
                    ? "z-20 border-brand-red md:-translate-y-4 shadow-[0_28px_80px_rgba(255,30,30,.14)]"
                    : "z-10 border-white/10 hover:-translate-y-2 hover:border-white/25"
                }`}
              >
                <span className="absolute right-5 top-5 font-title text-6xl font-black text-white/[0.025]">0{index + 1}</span>
                {/* Recommended Badge */}
                {isRec && (
                  <span className="absolute left-0 top-0 z-20 bg-brand-red px-5 py-2 font-title text-[9px] font-black uppercase tracking-[0.2em] text-white">
                    MAIS ESCOLHIDO
                  </span>
                )}

                {/* Plan Header */}
                <div>
                  <h3 className={`mb-6 mt-3 font-title text-xs font-extrabold uppercase tracking-[0.2em] ${
                    isRec ? "text-brand-red" : "text-white/70"
                  }`}>
                    {plan.name}
                  </h3>
                  
                  <div className="mb-5 flex items-baseline gap-1">
                    <span className="text-2xl font-light text-white">R$</span>
                    <span className="font-title text-5xl font-black tracking-[-0.06em] text-white md:text-6xl">
                      {plan.price}
                    </span>
                    <span className="text-sm text-white/45">/{plan.period}</span>
                  </div>

                  <p className="mb-8 text-xs font-light leading-relaxed text-white/60 md:text-sm">
                    {plan.description}
                  </p>

                  <hr className="mb-8 border-white/10" />

                  {/* Features List */}
                  <ul className="flex flex-col gap-4 mb-8">
                    {plan.features.map((feature, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-3">
                        <div className={`p-0.5 rounded-none border mt-0.5 ${
                          isRec 
                            ? "bg-brand-red/10 border-brand-red/30 text-brand-red" 
                            : "border-white/15 bg-white/5 text-white/70"
                        }`}>
                          <Check className="w-3.5 h-3.5" />
                        </div>
                        <span className="text-xs font-medium leading-tight text-white/85 md:text-sm">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA Button */}
                <a
                  href={`https://wa.me/5543996335162?text=Ol%C3%A1%21+Gostaria+de+me+matricular+no+${encodeURIComponent(plan.name)}.+Vim+pelo+site+oficial+e+gostaria+de+saber+quais+s%C3%A3o+os+pr%C3%B3ximos+passos%21`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-full py-4 text-center font-title font-bold text-xs uppercase tracking-widest rounded-none transition-all duration-300 relative overflow-hidden flex items-center justify-center ${
                    isRec
                      ? "bg-brand-red hover:bg-brand-red-neon text-white shadow-[0_4px_15px_rgba(255,30,30,0.3)] hover:scale-[1.02] active:scale-[0.98] animate-shine-button"
                      : "border border-white/15 bg-white/5 text-white hover:border-white/35 hover:bg-white/10 active:scale-[0.98]"
                  }`}
                >
                  <span className="relative z-10">{plan.ctaText}</span>
                </a>
              </motion.div>
            );
          })}
        </div>

        {/* Gym Consultation Note */}
        <div className="text-center mt-12 text-black/45 text-xs md:text-sm max-w-lg mx-auto leading-relaxed border-t border-black/10 pt-8">
          * Outras opções de planos e condições de pagamento podem ser consultadas diretamente na recepção da academia.
        </div>

      </div>
    </section>
  );
}

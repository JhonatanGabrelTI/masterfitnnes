"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { ContentData } from "@/data/content";

interface PlansProps {
  data: ContentData["plans"];
  whatsappEnrollUrl: string;
}

export default function Plans({ data, whatsappEnrollUrl }: PlansProps) {
  return (
    <section id="planos" className="relative py-24 bg-brand-black z-10">
      
      {/* Background glowing effects */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[350px] h-[350px] bg-brand-red/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[350px] h-[350px] bg-brand-red/3 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-20">
          <span className="text-brand-red font-extrabold uppercase tracking-widest text-xs mb-3 block">
            NOSSOS PLANOS
          </span>
          <h2 className="font-title font-black text-3xl md:text-5xl text-brand-white tracking-tighter uppercase">
            ESCOLHA O SEU DESAFIO
          </h2>
          <div className="w-12 h-1 bg-brand-red mx-auto mt-4 mb-6" />
          <p className="text-brand-white/50 text-sm md:text-base">
            Selecione o plano ideal para as suas metas e inicie sua transformação hoje mesmo.
          </p>
        </div>

        {/* Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch max-w-6xl mx-auto">
          {data.map((plan, index) => {
            const isRec = plan.recommended;

            return (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`relative flex flex-col justify-between p-8 bg-brand-dark-gray border select-none group transition-all duration-300 ${
                  isRec
                    ? "border-brand-red scale-105 md:translate-y-[-8px] neon-glow-red z-20"
                    : "border-brand-white/5 hover:border-brand-white/20 z-10"
                }`}
              >
                {/* Recommended Badge */}
                {isRec && (
                  <span className="absolute top-0 right-1/2 translate-x-1/2 -translate-y-1/2 bg-brand-red text-brand-white font-title font-black text-[10px] uppercase tracking-widest px-4 py-1.5 shadow-[0_4px_10px_rgba(255,30,30,0.5)] z-20">
                    MAIS ESCOLHIDO
                  </span>
                )}

                {/* Plan Header */}
                <div>
                  <h3 className={`font-title font-extrabold text-xs tracking-widest uppercase mb-4 ${
                    isRec ? "text-brand-red" : "text-brand-white/60"
                  }`}>
                    {plan.name}
                  </h3>
                  
                  <div className="flex items-baseline gap-1 mb-4">
                    <span className="text-brand-white text-2xl font-light">R$</span>
                    <span className="text-brand-white text-5xl md:text-6xl font-title font-black tracking-tighter">
                      {plan.price}
                    </span>
                    <span className="text-brand-white/40 text-sm">/{plan.period}</span>
                  </div>

                  <p className="text-brand-white/50 text-xs md:text-sm leading-relaxed mb-8 font-light">
                    {plan.description}
                  </p>

                  <hr className="border-brand-white/5 mb-8" />

                  {/* Features List */}
                  <ul className="flex flex-col gap-4 mb-8">
                    {plan.features.map((feature, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-3">
                        <div className={`p-0.5 rounded-none border mt-0.5 ${
                          isRec 
                            ? "bg-brand-red/10 border-brand-red/30 text-brand-red" 
                            : "bg-brand-white/5 border-brand-white/10 text-brand-white/60"
                        }`}>
                          <Check className="w-3.5 h-3.5" />
                        </div>
                        <span className="text-brand-white/80 text-xs md:text-sm font-medium leading-tight">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA Button */}
                <a
                  href={`https://wa.me/5543996335162?text=Ol%C3%A1%21+Vim+pelo+site+da+Master+Fitness+e+gostaria+de+me+matricular+no+${encodeURIComponent(plan.name)}%21`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-full py-4 text-center font-title font-bold text-xs uppercase tracking-widest rounded-none transition-all duration-300 relative overflow-hidden flex items-center justify-center ${
                    isRec
                      ? "bg-brand-red hover:bg-brand-red-neon text-brand-white shadow-[0_4px_15px_rgba(255,30,30,0.3)] hover:scale-[1.02] active:scale-[0.98]"
                      : "bg-brand-white/5 hover:bg-brand-white/10 border border-brand-white/10 hover:border-brand-white/35 text-brand-white active:scale-[0.98]"
                  }`}
                >
                  <span className="relative z-10">{plan.ctaText}</span>
                </a>
              </motion.div>
            );
          })}
        </div>

        {/* Gym Consultation Note */}
        <div className="text-center mt-12 text-brand-white/40 text-xs md:text-sm max-w-lg mx-auto leading-relaxed border-t border-brand-white/5 pt-8">
          * Outras opções de planos e condições de pagamento podem ser consultadas diretamente na recepção da academia.
        </div>

      </div>
    </section>
  );
}

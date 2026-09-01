"use client";

import { motion } from "framer-motion";
import { Check, Star, ArrowRight } from "lucide-react";
import { ContentData } from "@/data/content";

interface PlansProps {
  data: ContentData["plans"];
  whatsappEnrollUrl: string;
}

export default function Plans({ data, whatsappEnrollUrl }: PlansProps) {
  return (
    <section id="planos" className="relative py-32 bg-brand-black z-10 overflow-hidden">
      {/* Animated background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-brand-red/5 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-brand-red/5 rounded-full blur-3xl"
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-20"
        >
          <motion.span 
            className="text-brand-red font-extrabold uppercase tracking-[0.3em] text-xs mb-4 block"
            initial={{ opacity: 0, letterSpacing: "0.5em" }}
            whileInView={{ opacity: 1, letterSpacing: "0.3em" }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            NOSSOS PLANOS
          </motion.span>
          <h2 className="font-title font-black text-4xl md:text-6xl text-brand-white tracking-tighter uppercase mb-6">
            ESCOLHA O SEU DESAFIO
          </h2>
          <motion.div 
            className="w-16 h-1.5 bg-brand-red mx-auto mb-8"
            initial={{ width: 0 }}
            whileInView={{ width: 64 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          />
          <p className="text-brand-white/60 text-base md:text-lg leading-relaxed">
            Selecione o plano ideal para as suas metas e inicie sua transformação hoje mesmo.
          </p>
        </motion.div>

        {/* Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch max-w-6xl mx-auto">
          {data.map((plan, index) => {
            const isRec = plan.recommended;

            return (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 80, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ 
                  duration: 0.6, 
                  delay: index * 0.15,
                  type: "spring",
                  stiffness: 100,
                }}
                whileHover={{ y: -12, transition: { duration: 0.3 } }}
                className={`relative flex flex-col justify-between p-10 bg-gradient-to-b from-brand-dark-gray to-brand-black border select-none group transition-all duration-500 ${
                  isRec
                    ? "border-brand-red shadow-[0_0_40px_rgba(255,30,30,0.2)] z-20 md:scale-105"
                    : "border-brand-white/10 hover:border-brand-white/30 z-10"
                }`}
              >
                {/* Animated border glow for recommended */}
                {isRec && (
                  <motion.div
                    className="absolute inset-0 border-2 border-brand-red opacity-50"
                    animate={{ opacity: [0.3, 0.6, 0.3] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                )}

                {/* Recommended Badge */}
                {isRec && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="absolute top-0 right-1/2 translate-x-1/2 -translate-y-1/2 z-30"
                  >
                    <div className="relative">
                      <span className="bg-gradient-to-r from-brand-red to-brand-red-neon text-brand-white font-title font-black text-[10px] uppercase tracking-widest px-6 py-2 shadow-[0_4px_20px_rgba(255,30,30,0.5)] flex items-center gap-2">
                        <Star className="w-3 h-3 fill-current" />
                        MAIS ESCOLHIDO
                      </span>
                    </div>
                  </motion.div>
                )}

                {/* Background glow on hover */}
                <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${
                  isRec ? "bg-brand-red/5" : "bg-brand-white/5"
                }`} />

                {/* Plan Header */}
                <div className="relative z-10">
                  <motion.h3 
                    className={`font-title font-extrabold text-xs tracking-[0.2em] uppercase mb-6 ${
                      isRec ? "text-brand-red" : "text-brand-white/60"
                    }`}
                    animate={{ color: isRec ? "#FF1E1E" : "rgba(255,255,255,0.6)" }}
                  >
                    {plan.name}
                  </motion.h3>
                  
                  <div className="flex items-baseline gap-1 mb-6">
                    <span className="text-brand-white/60 text-2xl font-light">R$</span>
                    <motion.span 
                      className="text-brand-white text-5xl md:text-7xl font-title font-black tracking-tighter"
                      initial={{ scale: 0.5, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 + index * 0.1, type: "spring" }}
                    >
                      {plan.price}
                    </motion.span>
                    <span className="text-brand-white/40 text-sm">/{plan.period}</span>
                  </div>

                  <p className="text-brand-white/50 text-sm leading-relaxed mb-8 font-light min-h-[60px]">
                    {plan.description}
                  </p>

                  <motion.hr 
                    className="border-brand-white/10 mb-8"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                  />

                  {/* Features List */}
                  <ul className="flex flex-col gap-4 mb-10">
                    {plan.features.map((feature, fIdx) => (
                      <motion.li 
                        key={fIdx} 
                        className="flex items-start gap-4"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.5 + index * 0.1 + fIdx * 0.05 }}
                      >
                        <motion.div 
                          className={`p-1 border mt-0.5 transition-all duration-300 ${
                            isRec 
                              ? "bg-brand-red/10 border-brand-red/50 text-brand-red" 
                              : "bg-brand-white/5 border-brand-white/20 text-brand-white/60 group-hover:border-brand-white/40"
                          }`}
                          whileHover={{ scale: 1.2 }}
                        >
                          <Check className="w-4 h-4" />
                        </motion.div>
                        <span className="text-brand-white/80 text-sm font-medium leading-tight">
                          {feature}
                        </span>
                      </motion.li>
                    ))}
                  </ul>
                </div>

                {/* CTA Button */}
                <motion.a
                  href={`https://wa.me/5543996335162?text=Ol%C3%A1%21+Gostaria+de+me+matricular+no+${encodeURIComponent(plan.name)}.+Vim+pelo+site+oficial+e+gostaria+de+saber+quais+s%C3%A3o+os+pr%C3%B3ximos+passos%21`}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full py-5 text-center font-title font-bold text-xs uppercase tracking-widest transition-all duration-300 relative overflow-hidden flex items-center justify-center gap-3 group/btn ${
                    isRec
                      ? "bg-gradient-to-r from-brand-red to-brand-red-neon text-brand-white shadow-[0_4px_20px_rgba(255,30,30,0.4)] animate-pulse-glow"
                      : "bg-brand-white/5 hover:bg-brand-white/10 border border-brand-white/10 hover:border-brand-white/35 text-brand-white"
                  }`}
                >
                  {/* Shimmer effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "200%" }}
                    transition={{ duration: 0.6 }}
                  />
                  <span className="relative z-10">{plan.ctaText}</span>
                  <ArrowRight className="w-4 h-4 relative z-10 group-hover/btn:translate-x-1 transition-transform" />
                </motion.a>

                {/* Bottom accent line */}
                <motion.div 
                  className={`absolute bottom-0 left-0 h-1 ${isRec ? "bg-brand-red" : "bg-brand-white/20 group-hover:bg-brand-white/40"}`}
                  initial={{ width: "0%" }}
                  whileInView={{ width: "100%" }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.6 + index * 0.1 }}
                />
              </motion.div>
            );
          })}
        </div>

        {/* Gym Consultation Note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
          className="text-center mt-16 text-brand-white/40 text-sm max-w-lg mx-auto leading-relaxed border-t border-brand-white/10 pt-10"
        >
          * Outras opções de planos e condições de pagamento podem ser consultadas diretamente na recepção da academia.
        </motion.div>
      </div>
    </section>
  );
}

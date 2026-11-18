"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Users, Award, ShieldCheck, Zap } from "lucide-react";
import { ContentData } from "@/data/content";

interface StatsProps {
  data: ContentData["stats"];
}

function Counter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10px" });
  const [currentValue, setCurrentValue] = useState(0);

  useEffect(() => {
    if (isInView) {
      const start = 0;
      const end = value;
      if (start === end) return;

      const duration = 2000; // 2 seconds
      const startTime = performance.now();

      const animate = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function outQuad
        const easeProgress = progress * (2 - progress);
        
        const current = Math.floor(easeProgress * (end - start) + start);
        setCurrentValue(current);

        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };

      requestAnimationFrame(animate);
    }
  }, [isInView, value]);

  return (
    <span ref={ref} className="font-title font-black text-4xl md:text-6xl text-brand-white tracking-tighter">
      {currentValue.toLocaleString()}
      {suffix}
    </span>
  );
}

export default function Stats({ data }: StatsProps) {
  const statsList = [
    {
      id: "students",
      label: "Alunos Ativos",
      value: data.students,
      suffix: "+",
      icon: <Users className="w-8 h-8 text-white" />,
      description: "Evoluindo diariamente",
    },
    {
      id: "years",
      label: "Anos de Experiência",
      value: data.years,
      suffix: "+",
      icon: <Award className="w-8 h-8 text-white" />,
      description: "Liderando resultados",
    },
    {
      id: "transformations",
      label: "Transformações Reais",
      value: data.transformations,
      suffix: "+",
      icon: <Zap className="w-8 h-8 text-white" />,
      description: "Corpos e mentes forjados",
    },
    {
      id: "equipments",
      label: "Nossa Estrutura",
      value: 100, // represent modern equipments as 100% modern
      suffix: "",
      customVal: data.equipments,
      icon: <ShieldCheck className="w-8 h-8 text-white" />,
      description: "Aparelhos de última geração",
    },
  ];

  return (
    <section id="stats" className="red-section relative z-10 overflow-hidden border-y border-white/15">
      <div className="absolute inset-0 gym-grid opacity-30" />
      <div className="relative mx-auto max-w-[1440px] px-5 py-10 md:px-10 lg:px-14 lg:py-0">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {statsList.map((stat, index) => (
            <motion.div
              key={stat.id}
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative flex min-h-[190px] flex-col justify-between overflow-hidden border-b border-white/20 p-7 sm:border-r lg:border-b-0 lg:px-8 lg:py-10"
            >
              <span className="absolute right-5 top-4 font-title text-6xl font-black text-white/[0.025]">0{index + 1}</span>
              <div className="absolute inset-x-0 bottom-0 h-[2px] origin-left scale-x-0 bg-brand-red transition-transform duration-500 group-hover:scale-x-100" />
              
              <div className="flex justify-between items-start">
                <div className="grid h-12 w-12 place-items-center border border-white/25 bg-black/15 transition-all duration-300 group-hover:-translate-y-1 group-hover:bg-black/25">
                  {stat.icon}
                </div>
                <div className="text-right">
                  {stat.customVal ? (
                    <span className="block max-w-[155px] pt-2 font-title text-xl font-black uppercase leading-none text-white md:text-2xl">
                      {stat.customVal}
                    </span>
                  ) : (
                    <Counter value={stat.value} suffix={stat.suffix} />
                  )}
                </div>
              </div>
              
              <div className="mt-7">
                <h3 className="text-sm font-black uppercase tracking-[0.12em] text-white">
                  {stat.label}
                </h3>
                <p className="mt-1.5 text-xs font-medium text-white/42">
                  {stat.description}
                </p>
              </div>
              
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Users, Award, ShieldAlert, Zap } from "lucide-react";
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
      icon: <Users className="w-8 h-8 text-brand-red" />,
      description: "Evoluindo diariamente",
    },
    {
      id: "years",
      label: "Anos de Experiência",
      value: data.years,
      suffix: "+",
      icon: <Award className="w-8 h-8 text-brand-red" />,
      description: "Liderando resultados",
    },
    {
      id: "transformations",
      label: "Transformações Reais",
      value: data.transformations,
      suffix: "+",
      icon: <Zap className="w-8 h-8 text-brand-red" />,
      description: "Corpos e mentes forjados",
    },
    {
      id: "equipments",
      label: "Nossa Estrutura",
      value: 100, // represent modern equipments as 100% modern
      suffix: "",
      customVal: data.equipments,
      icon: <ShieldAlert className="w-8 h-8 text-brand-red" />,
      description: "Aparelhos de última geração",
    },
  ];

  return (
    <section id="stats" className="relative py-20 bg-gradient-to-b from-brand-black to-brand-dark-gray border-y border-brand-white/5 z-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {statsList.map((stat, index) => (
            <motion.div
              key={stat.id}
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative p-6 glass-card glass-card-hover overflow-hidden group flex flex-col justify-between min-h-[180px]"
            >
              {/* Backlight effect */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-brand-red/5 rounded-full blur-2xl group-hover:bg-brand-red/10 transition-colors duration-500" />
              
              <div className="flex justify-between items-start">
                <div className="p-3 bg-brand-white/5 border border-brand-white/10 rounded-none group-hover:border-brand-red/30 transition-all duration-300">
                  {stat.icon}
                </div>
                <div className="text-right">
                  {stat.customVal ? (
                    <span className="font-title font-black text-xl md:text-2xl text-brand-white uppercase block leading-none pt-2">
                      {stat.customVal}
                    </span>
                  ) : (
                    <Counter value={stat.value} suffix={stat.suffix} />
                  )}
                </div>
              </div>
              
              <div className="mt-6">
                <h3 className="text-md font-bold uppercase tracking-wider text-brand-white">
                  {stat.label}
                </h3>
                <p className="text-xs text-brand-white/50 font-medium mt-1">
                  {stat.description}
                </p>
              </div>
              
              {/* Glowing bottom line */}
              <div className="absolute bottom-0 left-0 w-0 h-1 bg-brand-red transition-all duration-500 group-hover:w-full" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

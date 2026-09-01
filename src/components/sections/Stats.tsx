"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useSpring, useTransform } from "framer-motion";
import { Users, Award, Zap, Dumbbell } from "lucide-react";
import { ContentData } from "@/data/content";

interface StatsProps {
  data: ContentData["stats"];
}

function AnimatedCounter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10px" });
  const spring = useSpring(0, { stiffness: 50, damping: 20 });
  const display = useTransform(spring, (v) => Math.floor(v).toLocaleString());

  useEffect(() => {
    if (isInView) {
      spring.set(value);
    }
  }, [isInView, value, spring]);

  const [displayValue, setDisplayValue] = useState("0");

  useEffect(() => {
    const unsubscribe = display.on("change", (v) => {
      setDisplayValue(v);
    });
    return unsubscribe;
  }, [display]);

  return (
    <span ref={ref} className="font-title font-black text-4xl md:text-6xl text-brand-white tracking-tighter">
      {displayValue}
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
      icon: <Users className="w-8 h-8" />,
      description: "Evoluindo diariamente",
      gradient: "from-brand-red/20 to-transparent",
    },
    {
      id: "years",
      label: "Anos de Experiência",
      value: data.years,
      suffix: "+",
      icon: <Award className="w-8 h-8" />,
      description: "Liderando resultados",
      gradient: "from-brand-red/15 to-transparent",
    },
    {
      id: "transformations",
      label: "Transformações Reais",
      value: data.transformations,
      suffix: "+",
      icon: <Zap className="w-8 h-8" />,
      description: "Corpos e mentes forjados",
      gradient: "from-brand-red/20 to-transparent",
    },
    {
      id: "equipments",
      label: "Nossa Estrutura",
      value: 100,
      suffix: "",
      customVal: data.equipments,
      icon: <Dumbbell className="w-8 h-8" />,
      description: "Aparelhos de última geração",
      gradient: "from-brand-red/15 to-transparent",
    },
  ];

  return (
    <section id="stats" className="relative py-24 bg-gradient-to-b from-brand-black via-brand-dark-gray to-brand-black border-y border-brand-white/5 z-10 overflow-hidden">
      {/* Animated background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{
            background: [
              "radial-gradient(circle at 20% 50%, rgba(255,30,30,0.08) 0%, transparent 50%)",
              "radial-gradient(circle at 80% 50%, rgba(255,30,30,0.08) 0%, transparent 50%)",
              "radial-gradient(circle at 20% 50%, rgba(255,30,30,0.08) 0%, transparent 50%)",
            ],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0"
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-brand-red font-extrabold uppercase tracking-[0.3em] text-xs mb-3 block">
            NÚMEROS QUE FALAM
          </span>
          <h2 className="font-title font-black text-3xl md:text-5xl text-brand-white tracking-tighter uppercase">
            RESULTADOS COMPROVADOS
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {statsList.map((stat, index) => (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, y: 60, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ 
                duration: 0.6, 
                delay: index * 0.1,
                type: "spring",
                stiffness: 100,
              }}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="relative p-8 glass-card overflow-hidden group flex flex-col justify-between min-h-[200px] border border-brand-white/5 hover:border-brand-red/30 transition-all duration-500"
            >
              {/* Animated gradient background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
              
              {/* Corner accents */}
              <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-brand-red/0 group-hover:border-brand-red transition-all duration-300" />
              <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-brand-red/0 group-hover:border-brand-red transition-all duration-300" />
              
              <div className="flex justify-between items-start relative z-10">
                <motion.div 
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="p-3 bg-brand-red/10 border border-brand-red/20 text-brand-red group-hover:bg-brand-red group-hover:text-brand-white transition-all duration-300"
                >
                  {stat.icon}
                </motion.div>
                <div className="text-right">
                  {stat.customVal ? (
                    <span className="font-title font-black text-xl md:text-2xl text-brand-white uppercase block leading-none pt-2">
                      {stat.customVal}
                    </span>
                  ) : (
                    <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                  )}
                </div>
              </div>
              
              <div className="mt-6 relative z-10">
                <h3 className="text-md font-bold uppercase tracking-wider text-brand-white group-hover:text-brand-red transition-colors duration-300">
                  {stat.label}
                </h3>
                <p className="text-xs text-brand-white/50 font-medium mt-1">
                  {stat.description}
                </p>
              </div>
              
              {/* Animated bottom line */}
              <motion.div 
                className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-brand-red to-brand-red-neon"
                initial={{ width: "0%" }}
                whileInView={{ width: "100%" }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
              />

              {/* Floating particles on hover */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-1 h-1 bg-brand-red rounded-full"
                    initial={{ 
                      x: `${30 + i * 20}%`, 
                      y: "100%",
                      opacity: 0 
                    }}
                    animate={{ 
                      y: "-20%",
                      opacity: [0, 0.8, 0]
                    }}
                    transition={{
                      duration: 2 + i * 0.5,
                      repeat: Infinity,
                      delay: i * 0.3,
                      ease: "easeOut"
                    }}
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

"use client";

import { ArrowUpRight, BellRing, Dumbbell, MessageCircle, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";
import FestiveSleigh from "@/components/effects/FestiveSleigh";

const vipUrl = "https://chat.whatsapp.com/Kgpl7ycW4cuCTwR9U9JT40?s=hd&p=i&iam=2";
const benefits = [
  { icon: BellRing, title: "Avisos em primeira mão", copy: "Novidades, horários e comunicados importantes sem perder nada." },
  { icon: Dumbbell, title: "Conteúdo exclusivo", copy: "Dicas, motivação e informações para manter o foco nos treinos." },
  { icon: ShieldCheck, title: "Comunidade Master", copy: "Um canal direto para ficar ainda mais perto da nossa equipe." },
];

export default function VIPGroup() {
  return (
    <section id="grupo-vip" className="red-section relative z-10 overflow-hidden pb-24 pt-56 text-white md:pb-32 md:pt-64">
      <FestiveSleigh />
      <div className="absolute inset-0 gym-grid opacity-20" /><div className="absolute -right-20 -top-28 h-96 w-96 rounded-full border-[70px] border-white/[0.06]" />
      <div className="relative mx-auto max-w-[1440px] px-5 md:px-10 lg:px-14"><div className="grid items-end gap-12 lg:grid-cols-[1.1fr_.9fr] lg:gap-20">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }}>
          <div className="mb-6 flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.3em] text-white/70"><MessageCircle className="h-4 w-4" /> Grupo oficial no WhatsApp</div>
          <h2 className="font-title text-[clamp(3rem,7vw,6.7rem)] font-black uppercase leading-[0.86] tracking-[-0.06em]">Entre para o<br /><span className="text-black">grupo VIP</span></h2>
          <p className="mt-7 max-w-2xl text-base leading-7 text-white/80 md:text-lg">Faça parte da comunidade Master Fitness e receba tudo o que importa diretamente no seu WhatsApp.</p>
          <a href={vipUrl} target="_blank" rel="noopener noreferrer" className="premium-button group mt-9 min-w-[280px] bg-black text-white shadow-[0_20px_50px_rgba(0,0,0,.28)]">Entrar no grupo VIP <ArrowUpRight className="h-5 w-5 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" /></a>
        </motion.div>
        <div className="grid gap-3">{benefits.map((benefit, index) => <motion.div key={benefit.title} initial={{ opacity: 0, x: 35 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }} className="flex gap-5 border border-white/20 bg-black/15 p-5 backdrop-blur-sm md:p-6"><div className="grid h-12 w-12 shrink-0 place-items-center bg-black text-brand-red"><benefit.icon className="h-5 w-5" /></div><div><h3 className="font-title text-lg font-black uppercase tracking-tight text-white">{benefit.title}</h3><p className="mt-1 text-sm leading-6 text-white/70">{benefit.copy}</p></div></motion.div>)}</div>
      </div></div>
    </section>
  );
}

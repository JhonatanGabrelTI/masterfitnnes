"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import { ContentData } from "@/data/content";

interface ModalitiesProps {
  data: ContentData["modalities"];
}

export default function Modalities({ data }: ModalitiesProps) {
  return (
    <section id="modalidades" className="section-shell bg-[#090909]">
      <div className="absolute inset-0 gym-grid opacity-20" />
      <div className="relative mx-auto max-w-[1440px] px-5 md:px-10 lg:px-14">
        <div className="mb-14 flex flex-col justify-between gap-7 md:flex-row md:items-end lg:mb-16">
          <div>
            <div className="section-kicker"><span>02</span> Modalidades</div>
            <h2 className="section-title mt-5">Escolha o seu caminho</h2>
          </div>
          <p className="max-w-md text-sm leading-6 text-white/48 md:text-right">
            Oferecemos uma variedade de modalidades de treinamento focadas em performance e superação de limites.
          </p>
        </div>

        <div className="grid auto-rows-[340px] grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-12">
          {data.map((modality, index) => (
            <motion.article
              key={modality.id}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.65, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
              className={`interactive-card group relative overflow-hidden border border-white/10 bg-brand-dark-gray ${
                index === 0 ? "lg:col-span-7 lg:row-span-2" : index === 1 || index === 2 ? "lg:col-span-5" : index === 3 ? "lg:col-span-5" : "lg:col-span-7"
              }`}
            >
              <Image src={modality.image} alt="" fill sizes="(max-width: 768px) 100vw, 50vw" className="scale-110 object-cover opacity-40 blur-xl" aria-hidden="true" />
              <Image
                src={modality.image}
                alt={modality.title}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-contain transition-all duration-1000 group-hover:scale-[1.035]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/35 to-black/5" />
              <div className="absolute inset-0 bg-brand-red/0 transition-colors duration-500 group-hover:bg-brand-red/[0.035]" />
              <span className="absolute right-5 top-5 font-title text-xs font-black tracking-[0.18em] text-white/45">0{index + 1}</span>
              <div className="absolute inset-x-0 bottom-0 p-6 md:p-8">
                <span className="mb-4 block h-[3px] w-10 bg-brand-red transition-all duration-500 group-hover:w-20" />
                <div className="flex items-end justify-between gap-5">
                  <div>
                    <h3 className={`font-title font-black uppercase tracking-[-0.025em] text-white ${index === 0 ? "text-4xl md:text-6xl" : "text-2xl md:text-3xl"}`}>
                      {modality.title}
                    </h3>
                    <p className={`mt-3 max-w-xl text-xs leading-5 text-white/62 md:text-sm ${index === 0 ? "md:block" : "lg:line-clamp-2"}`}>
                      {modality.description}
                    </p>
                  </div>
                  <span className="hidden h-11 w-11 shrink-0 place-items-center border border-white/15 bg-black/30 text-white transition-all group-hover:border-brand-red group-hover:bg-brand-red md:grid">
                    <ArrowUpRight className="h-5 w-5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </span>
                </div>
              </div>
              <div className="absolute inset-x-0 bottom-0 h-[2px] origin-left scale-x-0 bg-brand-red transition-transform duration-500 group-hover:scale-x-100" />
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

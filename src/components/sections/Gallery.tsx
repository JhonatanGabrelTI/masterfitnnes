"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";
import { ContentData } from "@/data/content";

interface GalleryProps {
  data: ContentData["gallery"];
}

export default function Gallery({ data }: GalleryProps) {
  const [activeImageIdx, setActiveImageIdx] = useState<number | null>(null);
  const [filter, setFilter] = useState("Todos");

  const categories = ["Todos", "Infraestrutura", "Treino", "Comunidade"];

  // Map local files to high quality Unsplash photos
  const unsplashGalleryUrls = [
    "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=800",
    "https://images.unsplash.com/photo-1518310383802-640c2de311b2?q=80&w=800",
    "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=800",
    "https://images.unsplash.com/photo-1538797539774-1213dba5451c?q=80&w=800",
    "https://images.unsplash.com/photo-1574680096145-d05b474e2155?q=80&w=800",
    "https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?q=80&w=800",
  ];

  const getFilteredItems = () => {
    if (filter === "Todos") return data;
    return data.filter((item) => item.category === filter);
  };

  const filteredItems = getFilteredItems();

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activeImageIdx === null) return;
    setActiveImageIdx((activeImageIdx + 1) % filteredItems.length);
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activeImageIdx === null) return;
    setActiveImageIdx(
      (activeImageIdx - 1 + filteredItems.length) % filteredItems.length
    );
  };

  return (
    <section id="galeria" className="relative py-24 bg-brand-dark-gray z-10">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
          <div>
            <span className="text-brand-red font-extrabold uppercase tracking-widest text-xs mb-3 block">
              NOSSO ESPAÇO
            </span>
            <h2 className="font-title font-black text-3xl md:text-5xl text-brand-white tracking-tighter uppercase leading-none">
              GALERIA PREMIUM
            </h2>
            <div className="w-12 h-1 bg-brand-red mt-4" />
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setFilter(cat);
                  setActiveImageIdx(null);
                }}
                className={`px-4 py-2 text-xs uppercase tracking-widest font-extrabold transition-all duration-300 ${
                  filter === cat
                    ? "bg-brand-red text-brand-white neon-glow-red"
                    : "bg-brand-white/5 text-brand-white/60 hover:text-brand-white hover:bg-brand-white/10"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Pinterest Grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
          {filteredItems.map((item, index) => {
            // Pick image URL
            const urlIdx = data.findIndex((d) => d.id === item.id);
            const imgUrl = item.image || unsplashGalleryUrls[urlIdx !== -1 ? urlIdx : index % 6];

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                onClick={() => setActiveImageIdx(index)}
                className="break-inside-avoid relative overflow-hidden group border border-brand-white/5 cursor-pointer"
              >
                {/* Image */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={imgUrl}
                  alt={item.title}
                  className="w-full object-cover grayscale brightness-90 group-hover:scale-105 group-hover:grayscale-0 transition-all duration-700"
                />
                
                {/* Zoom overlay on Hover */}
                <div className="absolute inset-0 bg-brand-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                  <div className="absolute top-4 right-4 p-2 bg-brand-red text-brand-white rounded-none">
                    <ZoomIn className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] text-brand-red font-black uppercase tracking-widest mb-1">
                    {item.category}
                  </span>
                  <h4 className="font-title font-bold text-lg text-brand-white uppercase leading-none">
                    {item.title}
                  </h4>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Lightbox Modal */}
        <AnimatePresence>
          {activeImageIdx !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveImageIdx(null)}
              className="fixed inset-0 z-[110] bg-brand-black/95 backdrop-blur-md flex items-center justify-center p-4 md:p-10"
            >
              <button
                onClick={() => setActiveImageIdx(null)}
                className="absolute top-6 right-6 text-brand-white hover:text-brand-red transition-colors p-2 z-[120]"
                aria-label="Close Lightbox"
              >
                <X className="w-8 h-8" />
              </button>

              <div className="relative max-w-5xl max-h-[85vh] w-full flex items-center justify-center">
                {/* Prev Button */}
                <button
                  onClick={handlePrev}
                  className="absolute left-2 md:left-4 p-3 bg-brand-black/50 border border-brand-white/10 hover:border-brand-red text-brand-white hover:text-brand-red transition-all z-[120]"
                  aria-label="Previous Image"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>

                {/* Main Image */}
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  transition={{ type: "spring", damping: 25, stiffness: 200 }}
                  onClick={(e) => e.stopPropagation()}
                  className="relative overflow-hidden border border-brand-white/10 max-h-[80vh] flex flex-col justify-end"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={
                      filteredItems[activeImageIdx].image ||
                      unsplashGalleryUrls[
                        data.findIndex((d) => d.id === filteredItems[activeImageIdx].id)
                      ]
                    }
                    alt={filteredItems[activeImageIdx].title}
                    className="max-w-full max-h-[75vh] object-contain mx-auto"
                  />
                  <div className="bg-brand-black/85 border-t border-brand-white/10 p-4 text-center">
                    <span className="text-[9px] text-brand-red font-black uppercase tracking-wider block mb-1">
                      {filteredItems[activeImageIdx].category}
                    </span>
                    <h3 className="font-title font-black text-xl text-brand-white uppercase">
                      {filteredItems[activeImageIdx].title}
                    </h3>
                  </div>
                </motion.div>

                {/* Next Button */}
                <button
                  onClick={handleNext}
                  className="absolute right-2 md:right-4 p-3 bg-brand-black/50 border border-brand-white/10 hover:border-brand-red text-brand-white hover:text-brand-red transition-all z-[120]"
                  aria-label="Next Image"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

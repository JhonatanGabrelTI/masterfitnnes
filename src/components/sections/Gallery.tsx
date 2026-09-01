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
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const categories = ["Todos", "Infraestrutura", "Treino", "Comunidade"];

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
    <section id="galeria" className="relative py-32 bg-brand-dark-gray z-10 overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
          className="absolute -top-60 -right-60 w-[500px] h-[500px] border border-brand-red/5 rounded-full"
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row justify-between items-start md:items-end mb-20 gap-8"
        >
          <div>
            <motion.span 
              className="text-brand-red font-extrabold uppercase tracking-[0.3em] text-xs mb-4 block"
              initial={{ opacity: 0, letterSpacing: "0.5em" }}
              whileInView={{ opacity: 1, letterSpacing: "0.3em" }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              NOSSO ESPAÇO
            </motion.span>
            <h2 className="font-title font-black text-4xl md:text-6xl text-brand-white tracking-tighter uppercase leading-none">
              GALERIA PREMIUM
            </h2>
            <motion.div 
              className="w-16 h-1.5 bg-brand-red mt-6"
              initial={{ width: 0 }}
              whileInView={{ width: 64 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
            />
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-3">
            {categories.map((cat, idx) => (
              <motion.button
                key={cat}
                onClick={() => {
                  setFilter(cat);
                  setActiveImageIdx(null);
                }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-5 py-2.5 text-xs uppercase tracking-[0.15em] font-extrabold transition-all duration-300 ${
                  filter === cat
                    ? "bg-brand-red text-brand-white shadow-[0_0_20px_rgba(255,30,30,0.4)]"
                    : "bg-brand-white/5 text-brand-white/60 hover:text-brand-white hover:bg-brand-white/10 border border-brand-white/10"
                }`}
              >
                {cat}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Pinterest Grid */}
        <motion.div 
          layout
          className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, index) => {
              const urlIdx = data.findIndex((d) => d.id === item.id);
              const imgUrl = item.image || unsplashGalleryUrls[urlIdx !== -1 ? urlIdx : index % 6];

              return (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  onClick={() => setActiveImageIdx(index)}
                  onMouseEnter={() => setHoveredIdx(index)}
                  onMouseLeave={() => setHoveredIdx(null)}
                  className="break-inside-avoid relative overflow-hidden group cursor-pointer border border-brand-white/5 hover:border-brand-red/30 transition-all duration-500"
                >
                  {/* Image */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <motion.img
                    src={imgUrl}
                    alt={item.title}
                    className="w-full object-cover grayscale brightness-90"
                    animate={{
                      scale: hoveredIdx === index ? 1.1 : 1,
                      grayscale: hoveredIdx === index ? 0 : 1,
                      brightness: hoveredIdx === index ? 1.1 : 0.9,
                    }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                  />
                  
                  {/* Zoom overlay on Hover */}
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-t from-brand-black/90 via-brand-black/40 to-transparent flex flex-col justify-end p-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: hoveredIdx === index ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <motion.div
                      className="absolute top-4 right-4 p-2.5 bg-brand-red text-brand-white"
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: hoveredIdx === index ? 1 : 0, rotate: hoveredIdx === index ? 0 : -180 }}
                      transition={{ duration: 0.4, type: "spring" }}
                    >
                      <ZoomIn className="w-5 h-5" />
                    </motion.div>
                    <motion.span 
                      className="text-[10px] text-brand-red font-black uppercase tracking-[0.2em] mb-2"
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: hoveredIdx === index ? 0 : 20, opacity: hoveredIdx === index ? 1 : 0 }}
                      transition={{ duration: 0.3, delay: 0.1 }}
                    >
                      {item.category}
                    </motion.span>
                    <motion.h4 
                      className="font-title font-bold text-xl text-brand-white uppercase leading-none"
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: hoveredIdx === index ? 0 : 20, opacity: hoveredIdx === index ? 1 : 0 }}
                      transition={{ duration: 0.3, delay: 0.15 }}
                    >
                      {item.title}
                    </motion.h4>
                  </motion.div>

                  {/* Corner accents */}
                  <motion.div
                    className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-brand-red"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: hoveredIdx === index ? 1 : 0, scale: hoveredIdx === index ? 1 : 0.5 }}
                    transition={{ duration: 0.3 }}
                  />
                  <motion.div
                    className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-brand-red"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: hoveredIdx === index ? 1 : 0, scale: hoveredIdx === index ? 1 : 0.5 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* Lightbox Modal */}
        <AnimatePresence>
          {activeImageIdx !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveImageIdx(null)}
              className="fixed inset-0 z-[110] bg-brand-black/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-10"
            >
              <motion.button
                onClick={() => setActiveImageIdx(null)}
                className="absolute top-6 right-6 text-brand-white hover:text-brand-red transition-colors p-3 z-[120] bg-brand-black/50 border border-brand-white/10 hover:border-brand-red"
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                aria-label="Close Lightbox"
              >
                <X className="w-8 h-8" />
              </motion.button>

              <div className="relative max-w-5xl max-h-[85vh] w-full flex items-center justify-center">
                {/* Prev Button */}
                <motion.button
                  onClick={handlePrev}
                  className="absolute left-2 md:left-4 p-4 bg-brand-black/50 border border-brand-white/10 hover:border-brand-red text-brand-white hover:text-brand-red transition-all z-[120]"
                  whileHover={{ scale: 1.1, x: -5 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label="Previous Image"
                >
                  <ChevronLeft className="w-6 h-6" />
                </motion.button>

                {/* Main Image */}
                <motion.div
                  key={activeImageIdx}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
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
                  <motion.div 
                    className="bg-brand-black/90 border-t border-brand-white/10 p-5 text-center"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <span className="text-[10px] text-brand-red font-black uppercase tracking-[0.2em] block mb-2">
                      {filteredItems[activeImageIdx].category}
                    </span>
                    <h3 className="font-title font-black text-2xl text-brand-white uppercase">
                      {filteredItems[activeImageIdx].title}
                    </h3>
                  </motion.div>
                </motion.div>

                {/* Next Button */}
                <motion.button
                  onClick={handleNext}
                  className="absolute right-2 md:right-4 p-4 bg-brand-black/50 border border-brand-white/10 hover:border-brand-red text-brand-white hover:text-brand-red transition-all z-[120]"
                  whileHover={{ scale: 1.1, x: 5 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label="Next Image"
                >
                  <ChevronRight className="w-6 h-6" />
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

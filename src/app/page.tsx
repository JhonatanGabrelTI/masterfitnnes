"use client";

import { useContent } from "@/hooks/useContent";
import Navbar from "@/components/ui/Navbar";
import SmoothScroll from "@/components/effects/SmoothScroll";
import CustomCursor from "@/components/effects/CustomCursor";
import EnergyBackground from "@/components/effects/EnergyBackground";
import Hero from "@/components/sections/Hero";
import Stats from "@/components/sections/Stats";
import About from "@/components/sections/About";
import Modalities from "@/components/sections/Modalities";
import Gallery from "@/components/sections/Gallery";
import Transformations from "@/components/sections/Transformations";
import Testimonials from "@/components/sections/Testimonials";
import Plans from "@/components/sections/Plans";
import Footer from "@/components/sections/Footer";
import { Dumbbell } from "lucide-react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";

export default function Home() {
  const { content, isLoaded } = useContent();

  useEffect(() => {
    // Register service worker for PWA support
    if (typeof window !== "undefined" && "serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js").then(
        (reg) => console.log("Service Worker registered on scope:", reg.scope),
        (err) => console.error("Service Worker registration failed:", err)
      );
    }
  }, []);

  return (
    <>
      {/* Dynamic Theme Components */}
      <CustomCursor />
      <EnergyBackground />

      <AnimatePresence mode="wait">
        {!isLoaded ? (
          /* Custom Premium Loader */
          <motion.div
            key="loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 w-full h-full bg-brand-black z-[9999] flex flex-col items-center justify-center gap-4"
          >
            <div className="relative mb-4">
              <Image
                src="/logo.png"
                alt="Master Fitness Ibaiti"
                width={200}
                height={80}
                className="h-20 w-auto object-contain animate-pulse"
                priority
              />
              <div className="absolute inset-0 bg-brand-red/10 blur-xl rounded-full scale-150 animate-ping opacity-30" />
            </div>
            <div className="w-24 h-[2px] bg-brand-white/10 overflow-hidden relative mt-2">
              <div className="absolute top-0 bottom-0 left-0 w-1/2 bg-brand-red animate-[loading_1.5s_infinite_ease-in-out]" />
            </div>
            
            <style jsx global>{`
              @keyframes loading {
                0% { left: -50%; }
                100% { left: 100%; }
              }
            `}</style>
          </motion.div>
        ) : (
          /* Main Page Wrapper with Lenis Scroll */
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <SmoothScroll>
              <Navbar />
              
              <main className="relative z-10 w-full min-h-screen">
                <Hero data={content.hero} />
                <Stats data={content.stats} />
                <About data={content.about} />
                <Modalities data={content.modalities} />
                <Gallery data={content.gallery} />
                <Transformations data={content.transformations} />
                <Testimonials data={content.testimonials} />
                <Plans data={content.plans} whatsappEnrollUrl={content.hero.enrollLink} />
              </main>

              <Footer data={content.contact} />
            </SmoothScroll>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Sobre", href: "#sobre" },
    { label: "Modalidades", href: "#modalidades" },
    { label: "Galeria", href: "#galeria" },
    { label: "Resultados", href: "#resultados" },
    { label: "Depoimentos", href: "#depoimentos" },
    { label: "Planos", href: "#planos" },
  ];

  const handleScrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.querySelector(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 left-0 w-full z-[100] transition-all duration-300 ${
          isScrolled
            ? "bg-brand-black/80 backdrop-blur-md py-4 border-b border-brand-white/10"
            : "bg-transparent py-6"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          {/* Logo */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="flex items-center group cursor-pointer"
          >
            <div className="relative group-hover:scale-105 transition-transform duration-500 flex items-center h-12">
              <Image
                src="/logo.png"
                alt="Master Fitness Ibaiti"
                width={150}
                height={50}
                className="h-10 w-auto object-contain"
                priority
              />
            </div>
          </a>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleScrollTo(link.href);
                }}
                className="text-sm font-semibold tracking-wider uppercase text-brand-white/80 hover:text-brand-red transition-colors duration-300 relative py-2 group"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-brand-red transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden lg:flex items-center gap-4">
            <a
              href="#planos"
              onClick={(e) => {
                e.preventDefault();
                handleScrollTo("#planos");
              }}
              className="px-6 py-2.5 bg-transparent border border-brand-red text-brand-white font-bold text-xs uppercase tracking-widest rounded-none hover:bg-brand-red transition-all duration-300 relative overflow-hidden group neon-glow-red"
            >
              <span className="relative z-10">Matricule-se</span>
              <span className="absolute inset-0 w-0 bg-brand-red transition-all duration-300 group-hover:w-full" />
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden text-brand-white focus:outline-none"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[99] bg-brand-black/95 backdrop-blur-lg flex flex-col justify-center items-center gap-8 lg:hidden"
          >
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleScrollTo(link.href);
                }}
                className="text-2xl font-title font-bold tracking-widest uppercase text-brand-white hover:text-brand-red transition-colors duration-300"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#planos"
              onClick={(e) => {
                e.preventDefault();
                handleScrollTo("#planos");
              }}
              className="mt-4 px-8 py-3 bg-brand-red text-brand-white font-bold text-sm uppercase tracking-widest hover:bg-brand-red-neon transition-colors duration-300 neon-glow-red"
            >
              Matricule-se
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

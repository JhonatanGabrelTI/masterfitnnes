"use client";

import { useEffect, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";

const navLinks = [
  { label: "Sobre", href: "#sobre" },
  { label: "Modalidades", href: "#modalidades" },
  { label: "Galeria", href: "#galeria" },
  { label: "Resultados", href: "#resultados" },
  { label: "Depoimentos", href: "#depoimentos" },
  { label: "Planos", href: "#planos" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 32);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScrollTo = (id: string) => {
    setMobileMenuOpen(false);
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <motion.nav
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="fixed inset-x-0 top-0 z-[100] px-3 pt-3 md:px-6 md:pt-5"
      >
        <div
          className={`mx-auto flex max-w-[1440px] items-center justify-between border transition-all duration-500 ${
            isScrolled
              ? "border-white/10 bg-brand-black/90 py-2 shadow-[0_18px_60px_rgba(0,0,0,.4)] backdrop-blur-xl"
              : "border-white/10 bg-black/30 py-3 backdrop-blur-md"
          } px-3 md:px-4`}
        >
          <a
            href="#"
            onClick={(event) => {
              event.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="group relative flex h-[58px] w-[174px] shrink-0 items-center justify-center overflow-hidden border border-white/10 bg-[#111c28] md:h-[66px] md:w-[205px]"
            aria-label="Voltar ao início"
          >
            <span className="absolute inset-y-0 left-0 w-[3px] bg-brand-red shadow-[0_0_18px_rgba(255,30,30,.8)]" />
            <span className="absolute -right-12 top-0 h-full w-20 -skew-x-12 bg-white/[0.025] transition-transform duration-700 group-hover:-translate-x-52" />
            <Image
              src="/logo.png"
              alt="Master Fitness Ibaiti"
              width={150}
              height={150}
              className="h-[120px] w-[120px] max-w-none object-contain transition-transform duration-500 group-hover:scale-[1.03] md:h-[140px] md:w-[140px]"
              priority
            />
          </a>

          <div className="hidden items-center gap-1 xl:flex">
            {navLinks.map((link, index) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(event) => {
                  event.preventDefault();
                  handleScrollTo(link.href);
                }}
                className="group relative px-3 py-3 text-[11px] font-bold uppercase tracking-[0.16em] text-white/66 transition-colors hover:text-white"
              >
                <span className="mr-1 text-[8px] text-brand-red/75">0{index + 1}</span>
                {link.label}
                <span className="absolute inset-x-3 bottom-1 h-px origin-left scale-x-0 bg-brand-red transition-transform duration-300 group-hover:scale-x-100" />
              </a>
            ))}
          </div>

          <a
            href="#planos"
            onClick={(event) => {
              event.preventDefault();
              handleScrollTo("#planos");
            }}
            className="group hidden h-[52px] items-center gap-3 bg-brand-red px-6 font-title text-xs font-black uppercase tracking-[0.16em] text-white transition-all hover:bg-brand-red-neon lg:flex"
          >
            Matricule-se
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>

          <button
            onClick={() => setMobileMenuOpen((open) => !open)}
            className="grid h-[50px] w-[50px] place-items-center border border-white/10 bg-white/[0.04] text-white lg:hidden"
            aria-label={mobileMenuOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            animate={{ opacity: 1, clipPath: "inset(0 0 0% 0)" }}
            exit={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[90] flex flex-col justify-center bg-brand-black/98 px-8 pt-24 backdrop-blur-xl lg:hidden"
          >
            <div className="absolute inset-0 gym-grid opacity-40" />
            <div className="relative mx-auto flex w-full max-w-lg flex-col">
              {navLinks.map((link, index) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(event) => {
                    event.preventDefault();
                    handleScrollTo(link.href);
                  }}
                  className="flex items-center justify-between border-b border-white/10 py-5 font-title text-3xl font-black uppercase tracking-tight text-white transition-colors hover:text-brand-red"
                >
                  <span>{link.label}</span>
                  <span className="text-xs tracking-widest text-brand-red">0{index + 1}</span>
                </a>
              ))}
              <a
                href="#planos"
                onClick={(event) => {
                  event.preventDefault();
                  handleScrollTo("#planos");
                }}
                className="mt-8 flex items-center justify-center gap-3 bg-brand-red px-8 py-5 font-title text-sm font-black uppercase tracking-[0.18em] text-white"
              >
                Matricule-se <ArrowUpRight className="h-5 w-5" />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

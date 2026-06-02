"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, Phone, MapPin, Send, CheckCircle } from "lucide-react";
import { ContentData } from "@/data/content";

interface FooterProps {
  data: ContentData["contact"];
}

export default function Footer({ data }: FooterProps) {
  const [formData, setFormData] = useState({ name: "", phone: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;

    setIsSubmitting(true);
    
    // Simulate sending contact (e.g. mock API call or opening WhatsApp with pre-filled content)
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      
      // Optionally redirect to WhatsApp with the form values
      const text = `Ol%C3%A1%21+Meu+nome+%C3%A9+${encodeURIComponent(formData.name)}.+Telefone%3A+${encodeURIComponent(formData.phone)}.+Mensagem%3A+${encodeURIComponent(formData.message)}`;
      const waUrl = `${data.whatsapp}&text=${text}`;
      window.open(waUrl, "_blank");

      // Reset form
      setFormData({ name: "", phone: "", message: "" });
      
      // Reset success state after 5 seconds
      setTimeout(() => setIsSuccess(false), 5000);
    }, 1500);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <footer className="relative bg-brand-black border-t border-brand-white/5 z-10 overflow-hidden">
      
      {/* FINAL CTA SECTION (Integrated in Footer top) */}
      <div className="relative py-24 md:py-36 w-full flex items-center justify-center overflow-hidden border-b border-brand-white/5">
        
        {/* Dynamic Video / Graphic Background */}
        <div className="absolute inset-0 w-full h-full bg-brand-black">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover opacity-35 scale-[1.03]"
          >
            <source
              src="https://player.vimeo.com/external/494951381.sd.mp4?s=d04e3391740924ec9d9ecf0f2cf7c1abfb874403&profile_id=165&oauth2_token_id=57447761"
              type="video/mp4"
            />
          </video>
          {/* Neon overlay grid and red aura */}
          <div className="absolute inset-0 bg-gradient-to-b from-brand-black via-transparent to-brand-black" />
          <div className="absolute inset-0 bg-radial-gradient from-brand-red/10 to-brand-black/90 pointer-events-none" />
        </div>

        <div className="relative max-w-4xl mx-auto px-6 text-center z-10 flex flex-col items-center">
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center"
          >
            <h2 className="font-title font-black text-4xl md:text-7xl text-brand-white tracking-tighter uppercase mb-8 leading-none drop-shadow-[0_4px_10px_rgba(0,0,0,0.8)]">
              SUA EVOLUÇÃO <br />
              <span className="text-brand-red text-neon-glow">COMEÇA AGORA</span>
            </h2>

            <a
              href={data.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="px-10 py-5 bg-brand-red text-brand-white font-title font-black text-sm uppercase tracking-widest transition-all duration-300 relative overflow-hidden group hover:scale-105 active:scale-95 neon-glow-red flex items-center justify-center"
            >
              {/* Pulsing glow */}
              <div className="absolute inset-0 bg-brand-red-neon/30 blur-lg rounded-full scale-0 group-hover:scale-150 transition-transform duration-700" />
              <span className="relative z-10">MATRICULE-SE</span>
            </a>
          </motion.div>
        </div>

      </div>

      {/* CONTACT & MAPS & INFO GRID */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          {/* Column 1: Info & Map */}
          <div className="lg:col-span-6 space-y-8">
            <div>
              <span className="font-title font-black text-2xl tracking-tighter text-brand-white">
                MASTER<span className="text-brand-red">FITNESS</span>
              </span>
              <p className="text-xs text-brand-white/40 uppercase tracking-widest font-extrabold mt-1">
                FORJANDO RESULTADOS EM IBAITI
              </p>
            </div>

            {/* Contact details */}
            <div className="space-y-4 text-brand-white/70">
              <div className="flex items-start gap-4">
                <MapPin className="w-5 h-5 text-brand-red shrink-0 mt-1" />
                <p className="text-sm leading-relaxed">{data.address}</p>
              </div>
              <div className="flex items-center gap-4">
                <Phone className="w-5 h-5 text-brand-red shrink-0" />
                <p className="text-sm">{data.phone}</p>
              </div>
            </div>

            {/* Operating Hours */}
            <div className="p-4 bg-brand-white/5 border border-brand-white/10">
              <h4 className="text-[10px] text-brand-red uppercase tracking-widest font-black mb-3">
                Horários de Funcionamento
              </h4>
              <div className="space-y-1.5 text-sm text-brand-white/70">
                <div className="flex justify-between">
                  <span>Seg à Sex</span>
                  <span className="text-brand-white font-semibold">05:00 - 00:00</span>
                </div>
                <div className="flex justify-between">
                  <span>Sábado</span>
                  <span className="text-brand-white font-semibold">08:00 - 18:00</span>
                </div>
                <div className="flex justify-between">
                  <span>Domingo</span>
                  <span className="text-brand-white font-semibold">13:00 - 17:00</span>
                </div>
              </div>
            </div>

            {/* Social handles */}
            <div className="flex gap-4">
              <a
                href={data.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-brand-white/5 border border-brand-white/10 hover:border-brand-red text-brand-white hover:text-brand-red transition-all"
                aria-label="Instagram Link"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
              </a>
              <a
                href={data.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-brand-white/5 border border-brand-white/10 hover:border-brand-red text-brand-white hover:text-brand-red transition-all"
                aria-label="WhatsApp Link"
              >
                <MessageCircle className="w-5 h-5" />
              </a>
            </div>

            {/* Google Map */}
            <div className="w-full h-[220px] border border-brand-white/10 overflow-hidden relative">
              <iframe
                title="Google Maps Master Fitness Ibaiti"
                src={data.mapsEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0, filter: "grayscale(1) invert(0.9) contrast(1.2)" }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          {/* Column 2: Contact Form */}
          <div className="lg:col-span-6 flex flex-col justify-between">
            <div className="p-8 bg-brand-dark-gray border border-brand-white/5 relative">
              <h3 className="font-title font-black text-2xl text-brand-white uppercase mb-6 tracking-tighter">
                FALE CONOSCO
              </h3>
              
              <AnimatePresence mode="wait">
                {isSuccess ? (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="flex flex-col items-center justify-center py-12 text-center"
                  >
                    <CheckCircle className="w-16 h-16 text-brand-red mb-4 animate-bounce" />
                    <h4 className="font-title font-bold text-lg text-brand-white uppercase mb-2">
                      MENSAGEM ENVIADA!
                    </h4>
                    <p className="text-xs text-brand-white/50 max-w-xs">
                      Redirecionando você para o nosso atendimento no WhatsApp...
                    </p>
                  </motion.div>
                ) : (
                  <motion.form
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    className="space-y-6"
                  >
                    {/* Name input */}
                    <div>
                      <label htmlFor="name" className="block text-[10px] text-brand-white/50 uppercase tracking-widest font-black mb-2">
                        Nome Completo
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full bg-brand-black border border-brand-white/10 focus:border-brand-red px-4 py-3 text-sm text-brand-white placeholder-brand-white/20 focus:outline-none transition-colors duration-300"
                        placeholder="Seu nome"
                      />
                    </div>

                    {/* Phone input */}
                    <div>
                      <label htmlFor="phone" className="block text-[10px] text-brand-white/50 uppercase tracking-widest font-black mb-2">
                        Telefone / WhatsApp
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full bg-brand-black border border-brand-white/10 focus:border-brand-red px-4 py-3 text-sm text-brand-white placeholder-brand-white/20 focus:outline-none transition-colors duration-300"
                        placeholder="(43) 99999-9999"
                      />
                    </div>

                    {/* Message input */}
                    <div>
                      <label htmlFor="message" className="block text-[10px] text-brand-white/50 uppercase tracking-widest font-black mb-2">
                        Mensagem (Opcional)
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={3}
                        value={formData.message}
                        onChange={handleInputChange}
                        className="w-full bg-brand-black border border-brand-white/10 focus:border-brand-red px-4 py-3 text-sm text-brand-white placeholder-brand-white/20 focus:outline-none transition-colors duration-300 resize-none"
                        placeholder="Gostaria de saber mais sobre..."
                      />
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-4 bg-brand-red text-brand-white font-title font-bold text-xs uppercase tracking-widest transition-all duration-300 relative overflow-hidden flex items-center justify-center gap-2 group hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
                    >
                      <Send className="w-3.5 h-3.5 group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform" />
                      <span>{isSubmitting ? "ENVIANDO..." : "ENVIAR MENSAGEM"}</span>
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </div>

        </div>

        {/* Brand Copyright */}
        <div className="border-t border-brand-white/5 mt-20 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-brand-white/35 font-medium">
          <p>© {new Date().getFullYear()} Master Fitness Ibaiti. Todos os direitos reservados.</p>
          <a
            href="/admin"
            className="hover:text-brand-red transition-colors uppercase tracking-widest text-[10px] font-black"
          >
            Painel Admin
          </a>
        </div>
      </div>
    </footer>
  );
}

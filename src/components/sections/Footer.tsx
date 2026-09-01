"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, Phone, MapPin, Send, CheckCircle, Instagram } from "lucide-react";
import { ContentData } from "@/data/content";

interface FooterProps {
  data: ContentData["contact"];
}

export default function Footer({ data }: FooterProps) {
  const [formData, setFormData] = useState({ name: "", phone: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;

    setIsSubmitting(true);
    
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      
      const text = `Ol%C3%A1%21+Meu+nome+%C3%A9+${encodeURIComponent(formData.name)}.+Telefone%3A+${encodeURIComponent(formData.phone)}.+Mensagem%3A+${encodeURIComponent(formData.message)}`;
      const waUrl = `${data.whatsapp}&text=${text}`;
      window.open(waUrl, "_blank");

      setFormData({ name: "", phone: "", message: "" });
      
      setTimeout(() => setIsSuccess(false), 5000);
    }, 1500);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <footer className="relative bg-brand-black border-t border-brand-white/5 z-10 overflow-hidden">
      
      {/* FINAL CTA SECTION */}
      <div className="relative py-32 md:py-44 w-full flex items-center justify-center overflow-hidden border-b border-brand-white/5">
        
        {/* Dynamic Video Background */}
        <div className="absolute inset-0 w-full h-full bg-brand-black">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover opacity-40 scale-[1.03]"
          >
            <source
              src="https://player.vimeo.com/external/494951381.sd.mp4?s=d04e3391740924ec9d9ecf0f2cf7c1abfb874403&profile_id=165&oauth2_token_id=57447761"
              type="video/mp4"
            />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-brand-black via-brand-black/70 to-brand-black" />
          <motion.div
            animate={{
              background: [
                "radial-gradient(circle at 30% 50%, rgba(255,30,30,0.15) 0%, transparent 50%)",
                "radial-gradient(circle at 70% 50%, rgba(255,30,30,0.15) 0%, transparent 50%)",
                "radial-gradient(circle at 30% 50%, rgba(255,30,30,0.15) 0%, transparent 50%)",
              ],
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-0"
          />
        </div>

        <div className="relative max-w-4xl mx-auto px-6 text-center z-10 flex flex-col items-center">
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center"
          >
            <motion.h2
              className="font-title font-black text-5xl md:text-8xl text-brand-white tracking-tighter uppercase mb-10 leading-none drop-shadow-[0_4px_20px_rgba(0,0,0,0.8)]"
              initial={{ y: 40, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              SUA EVOLUÇÃO <br />
              <span className="text-brand-red" style={{ textShadow: "0 0 40px rgba(255,30,30,0.6), 0 0 80px rgba(255,30,30,0.3)" }}>
                COMEÇA AGORA
              </span>
            </motion.h2>

            <motion.a
              href={data.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.95 }}
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="px-12 py-6 bg-gradient-to-r from-brand-red to-brand-red-neon text-brand-white font-title font-black text-base uppercase tracking-widest transition-all duration-300 relative overflow-hidden group animate-pulse-glow flex items-center justify-center"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                initial={{ x: "-100%" }}
                animate={{ x: "200%" }}
                transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
              />
              <span className="relative z-10 flex items-center gap-3">
                MATRICULE-SE
                <motion.span
                  initial={{ x: 0 }}
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  →
                </motion.span>
              </span>
            </motion.a>
          </motion.div>
        </div>
      </div>

      {/* CONTACT & MAPS & INFO GRID */}
      <div className="max-w-7xl mx-auto px-6 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          {/* Column 1: Info & Map */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6 space-y-8"
          >
            <div>
              <span className="font-title font-black text-3xl tracking-tighter text-brand-white">
                MASTER<span className="text-brand-red">FITNESS</span>
              </span>
              <p className="text-xs text-brand-white/40 uppercase tracking-[0.2em] font-extrabold mt-2">
                FORJANDO RESULTADOS EM IBAITI
              </p>
            </div>

            {/* Contact details */}
            <div className="space-y-5">
              <motion.div 
                className="flex items-start gap-4 group"
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="p-2 bg-brand-red/10 border border-brand-red/20 text-brand-red group-hover:bg-brand-red group-hover:text-brand-white transition-all duration-300">
                  <MapPin className="w-5 h-5" />
                </div>
                <p className="text-sm text-brand-white/70 leading-relaxed pt-1">{data.address}</p>
              </motion.div>
              <motion.div 
                className="flex items-center gap-4 group"
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="p-2 bg-brand-red/10 border border-brand-red/20 text-brand-red group-hover:bg-brand-red group-hover:text-brand-white transition-all duration-300">
                  <Phone className="w-5 h-5" />
                </div>
                <p className="text-sm text-brand-white/70">{data.phone}</p>
              </motion.div>
            </div>

            {/* Operating Hours */}
            <motion.div 
              className="p-6 bg-brand-white/5 border border-brand-white/10 hover:border-brand-red/30 transition-all duration-300"
              whileHover={{ y: -3 }}
            >
              <h4 className="text-[10px] text-brand-red uppercase tracking-[0.2em] font-black mb-4">
                Horários de Funcionamento
              </h4>
              <div className="space-y-2 text-sm text-brand-white/70">
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
            </motion.div>

            {/* Social handles */}
            <div className="flex gap-4">
              <motion.a
                href={data.instagram}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, y: -3 }}
                whileTap={{ scale: 0.95 }}
                className="p-4 bg-brand-white/5 border border-brand-white/10 hover:border-brand-red text-brand-white hover:text-brand-red transition-all duration-300"
                aria-label="Instagram Link"
              >
                <Instagram className="w-5 h-5" />
              </motion.a>
              <motion.a
                href={data.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, y: -3 }}
                whileTap={{ scale: 0.95 }}
                className="p-4 bg-brand-white/5 border border-brand-white/10 hover:border-brand-red text-brand-white hover:text-brand-red transition-all duration-300"
                aria-label="WhatsApp Link"
              >
                <MessageCircle className="w-5 h-5" />
              </motion.a>
            </div>

            {/* Google Map */}
            <motion.div 
              className="w-full h-[250px] border border-brand-white/10 overflow-hidden relative group"
              whileHover={{ borderColor: "rgba(255,30,30,0.3)" }}
            >
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
              <div className="absolute inset-0 bg-brand-red/0 group-hover:bg-brand-red/5 transition-all duration-300 pointer-events-none" />
            </motion.div>
          </motion.div>

          {/* Column 2: Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-6 flex flex-col justify-between"
          >
            <div className="p-10 bg-gradient-to-b from-brand-dark-gray to-brand-black border border-brand-white/10 relative overflow-hidden">
              {/* Background glow */}
              <div className="absolute top-0 right-0 w-40 h-40 bg-brand-red/5 rounded-full blur-3xl" />
              
              <h3 className="font-title font-black text-3xl text-brand-white uppercase mb-8 tracking-tighter relative z-10">
                FALE CONOSCO
              </h3>
              
              <AnimatePresence mode="wait">
                {isSuccess ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="flex flex-col items-center justify-center py-16 text-center"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
                    >
                      <CheckCircle className="w-20 h-20 text-brand-red mb-6" />
                    </motion.div>
                    <h4 className="font-title font-bold text-xl text-brand-white uppercase mb-3">
                      MENSAGEM ENVIADA!
                    </h4>
                    <p className="text-sm text-brand-white/50 max-w-xs">
                      Redirecionando você para o nosso atendimento no WhatsApp...
                    </p>
                  </motion.div>
                ) : (
                  <motion.form
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    className="space-y-6 relative z-10"
                  >
                    {/* Name input */}
                    <motion.div
                      animate={{ x: focusedField === "name" ? 5 : 0 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <label htmlFor="name" className="block text-[10px] text-brand-white/50 uppercase tracking-[0.2em] font-black mb-3">
                        Nome Completo
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          id="name"
                          name="name"
                          required
                          value={formData.name}
                          onChange={handleInputChange}
                          onFocus={() => setFocusedField("name")}
                          onBlur={() => setFocusedField(null)}
                          className="w-full bg-brand-black border border-brand-white/10 focus:border-brand-red px-5 py-4 text-sm text-brand-white placeholder-brand-white/20 focus:outline-none transition-all duration-300 focus:shadow-[0_0_20px_rgba(255,30,30,0.2)]"
                          placeholder="Seu nome"
                        />
                        <motion.div
                          className="absolute bottom-0 left-0 h-0.5 bg-brand-red"
                          initial={{ width: "0%" }}
                          animate={{ width: focusedField === "name" ? "100%" : "0%" }}
                          transition={{ duration: 0.3 }}
                        />
                      </div>
                    </motion.div>

                    {/* Phone input */}
                    <motion.div
                      animate={{ x: focusedField === "phone" ? 5 : 0 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <label htmlFor="phone" className="block text-[10px] text-brand-white/50 uppercase tracking-[0.2em] font-black mb-3">
                        Telefone / WhatsApp
                      </label>
                      <div className="relative">
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          required
                          value={formData.phone}
                          onChange={handleInputChange}
                          onFocus={() => setFocusedField("phone")}
                          onBlur={() => setFocusedField(null)}
                          className="w-full bg-brand-black border border-brand-white/10 focus:border-brand-red px-5 py-4 text-sm text-brand-white placeholder-brand-white/20 focus:outline-none transition-all duration-300 focus:shadow-[0_0_20px_rgba(255,30,30,0.2)]"
                          placeholder="(43) 99999-9999"
                        />
                        <motion.div
                          className="absolute bottom-0 left-0 h-0.5 bg-brand-red"
                          initial={{ width: "0%" }}
                          animate={{ width: focusedField === "phone" ? "100%" : "0%" }}
                          transition={{ duration: 0.3 }}
                        />
                      </div>
                    </motion.div>

                    {/* Message input */}
                    <motion.div
                      animate={{ x: focusedField === "message" ? 5 : 0 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <label htmlFor="message" className="block text-[10px] text-brand-white/50 uppercase tracking-[0.2em] font-black mb-3">
                        Mensagem (Opcional)
                      </label>
                      <div className="relative">
                        <textarea
                          id="message"
                          name="message"
                          rows={4}
                          value={formData.message}
                          onChange={handleInputChange}
                          onFocus={() => setFocusedField("message")}
                          onBlur={() => setFocusedField(null)}
                          className="w-full bg-brand-black border border-brand-white/10 focus:border-brand-red px-5 py-4 text-sm text-brand-white placeholder-brand-white/20 focus:outline-none transition-all duration-300 resize-none focus:shadow-[0_0_20px_rgba(255,30,30,0.2)]"
                          placeholder="Gostaria de saber mais sobre..."
                        />
                        <motion.div
                          className="absolute bottom-0 left-0 h-0.5 bg-brand-red"
                          initial={{ width: "0%" }}
                          animate={{ width: focusedField === "message" ? "100%" : "0%" }}
                          transition={{ duration: 0.3 }}
                        />
                      </div>
                    </motion.div>

                    {/* Submit Button */}
                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full py-5 bg-gradient-to-r from-brand-red to-brand-red-neon text-brand-white font-title font-bold text-xs uppercase tracking-widest transition-all duration-300 relative overflow-hidden flex items-center justify-center gap-3 group disabled:opacity-50 shadow-[0_4px_20px_rgba(255,30,30,0.3)]"
                    >
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                        initial={{ x: "-100%" }}
                        whileHover={{ x: "200%" }}
                        transition={{ duration: 0.6 }}
                      />
                      <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform relative z-10" />
                      <span className="relative z-10">{isSubmitting ? "ENVIANDO..." : "ENVIAR MENSAGEM"}</span>
                    </motion.button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>

        {/* Brand Copyright */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="border-t border-brand-white/5 mt-24 pt-10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-brand-white/35 font-medium"
        >
          <p>© {new Date().getFullYear()} Master Fitness Ibaiti. Todos os direitos reservados.</p>
          <a
            href="/admin"
            className="hover:text-brand-red transition-colors uppercase tracking-[0.2em] text-[10px] font-black"
          >
            Painel Admin
          </a>
        </motion.div>
      </div>
    </footer>
  );
}

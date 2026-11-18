"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, CheckCircle, MapPin, MessageCircle, Phone, Send } from "lucide-react";
import { ContentData } from "@/data/content";
import VisitCounter from "@/components/ui/VisitCounter";

interface FooterProps {
  data: ContentData["contact"];
}

const hours = [
  ["Seg à Sex", "05:00 — 00:00"],
  ["Sábado", "08:00 — 18:00"],
  ["Domingo", "13:00 — 17:00"],
];

export default function Footer({ data }: FooterProps) {
  const [formData, setFormData] = useState({ name: "", phone: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!formData.name || !formData.phone) return;
    setIsSubmitting(true);

    window.setTimeout(() => {
      const message = `Olá! Meu nome é ${formData.name}. Telefone: ${formData.phone}. Mensagem: ${formData.message}`;
      const whatsappBase = data.whatsapp.split("?")[0];
      window.open(`${whatsappBase}?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
      setIsSubmitting(false);
      setIsSuccess(true);
      setFormData({ name: "", phone: "", message: "" });
      window.setTimeout(() => setIsSuccess(false), 5000);
    }, 900);
  };

  const updateField = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((current) => ({ ...current, [event.target.name]: event.target.value }));
  };

  return (
    <footer className="relative z-10 overflow-hidden border-t border-white/5 bg-brand-black">
      <section className="relative flex min-h-[650px] items-center justify-center overflow-hidden border-b border-white/10 py-28 text-center md:py-36">
        <div className="absolute inset-0 bg-brand-black">
          <Image src="/images/campaigns/mais-forte.jpeg" alt="Você é mais forte do que pensa" fill sizes="100vw" className="scale-[1.03] object-cover object-center opacity-35" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,#050505_0%,rgba(5,5,5,.35)_45%,#050505_100%)]" />
          <div className="absolute inset-0 hero-vignette" />
          <div className="absolute inset-0 gym-grid opacity-25" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 mx-auto flex max-w-5xl flex-col items-center px-5"
        >
          <span className="mb-7 text-[10px] font-black uppercase tracking-[0.34em] text-white/55">O próximo nível espera por você</span>
          <h2 className="font-title text-[clamp(3.5rem,9vw,8rem)] font-black uppercase leading-[0.82] tracking-[-0.06em] text-white">
            Sua evolução<br /><span className="text-brand-red text-neon-glow">começa agora</span>
          </h2>
          <p className="mt-8 max-w-xl text-sm leading-6 text-white/55 md:text-base">Comece hoje a construir sua melhor versão ao lado de quem entende de resultado.</p>
          <a href={data.whatsapp} target="_blank" rel="noopener noreferrer" className="premium-button group mt-9 min-w-[250px] bg-brand-red text-white">
            Matricule-se agora <ArrowUpRight className="h-5 w-5 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
          </a>
        </motion.div>

        <div className="absolute bottom-0 left-0 hidden border-r border-t border-white/10 bg-black/55 px-8 py-5 text-left backdrop-blur-md md:block">
          <span className="block text-[8px] font-black uppercase tracking-[0.25em] text-brand-red">Master Fitness</span>
          <span className="mt-1 block font-title text-sm font-black uppercase text-white">Forjando resultados em Ibaiti</span>
        </div>
      </section>

      <div className="relative mx-auto max-w-[1440px] px-5 py-20 md:px-10 lg:px-14 lg:py-28">
        <div className="absolute inset-0 gym-grid opacity-15" />
        <div className="relative grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <div className="flex h-[92px] w-[250px] items-center justify-center overflow-hidden border border-white/10 bg-[#111c28]">
              <Image src="/logo.png" alt="Master Fitness Ibaiti" width={150} height={150} className="h-[170px] w-[170px] max-w-none object-contain" />
            </div>
            <p className="mt-6 max-w-md text-sm leading-6 text-white/45">Estrutura, acompanhamento e energia para transformar disciplina em resultados de verdade.</p>

            <div className="mt-9 space-y-4">
              <div className="flex items-start gap-4 border-b border-white/10 pb-4 text-sm text-white/65">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-brand-red" />
                <span>{data.address}</span>
              </div>
              <div className="flex items-center gap-4 border-b border-white/10 pb-4 text-sm text-white/65">
                <Phone className="h-5 w-5 shrink-0 text-brand-red" />
                <span>{data.phone}</span>
              </div>
            </div>

            <div className="mt-8 border border-white/10 bg-white/[0.018] p-5">
              <span className="text-[9px] font-black uppercase tracking-[0.22em] text-brand-red">Horários de funcionamento</span>
              <div className="mt-4 space-y-3">
                {hours.map(([day, time]) => (
                  <div key={day} className="flex items-center justify-between gap-4 text-xs">
                    <span className="text-white/42">{day}</span>
                    <span className="font-bold text-white/82">{time}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-5 flex gap-3">
              <a href={data.instagram} target="_blank" rel="noopener noreferrer" className="grid h-12 w-12 place-items-center border border-white/10 bg-white/[0.025] text-white transition-all hover:border-brand-red hover:text-brand-red" aria-label="Instagram da Master Fitness">
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect width="20" height="20" x="2" y="2" rx="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" x2="17.51" y1="6.5" y2="6.5" /></svg>
              </a>
              <a href={data.whatsapp} target="_blank" rel="noopener noreferrer" className="grid h-12 w-12 place-items-center bg-brand-red text-white transition-transform hover:-translate-y-1" aria-label="WhatsApp da Master Fitness">
                <MessageCircle className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="border border-white/10 bg-brand-dark-gray/80 p-6 backdrop-blur-md md:p-9 lg:p-10">
              <div className="mb-8 flex items-end justify-between gap-5 border-b border-white/10 pb-6">
                <div>
                  <span className="text-[9px] font-black uppercase tracking-[0.22em] text-brand-red">Atendimento</span>
                  <h3 className="mt-2 font-title text-3xl font-black uppercase tracking-tight text-white">Fale conosco</h3>
                </div>
                <Send className="h-6 w-6 text-white/15" />
              </div>

              <AnimatePresence mode="wait">
                {isSuccess ? (
                  <motion.div key="success" initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="flex min-h-[350px] flex-col items-center justify-center text-center">
                    <CheckCircle className="h-14 w-14 text-brand-red" />
                    <h4 className="mt-5 font-title text-2xl font-black uppercase text-white">Mensagem preparada</h4>
                    <p className="mt-2 max-w-xs text-xs leading-5 text-white/45">Abrimos o WhatsApp para você continuar o atendimento.</p>
                  </motion.div>
                ) : (
                  <motion.form key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid gap-5 md:grid-cols-2">
                      <Field label="Nome completo" name="name" type="text" value={formData.name} placeholder="Seu nome" onChange={updateField} />
                      <Field label="Telefone / WhatsApp" name="phone" type="tel" value={formData.phone} placeholder="(43) 99999-9999" onChange={updateField} />
                    </div>
                    <div>
                      <label htmlFor="message" className="mb-2 block text-[9px] font-black uppercase tracking-[0.18em] text-white/45">Mensagem <span className="text-white/20">(opcional)</span></label>
                      <textarea id="message" name="message" rows={5} value={formData.message} onChange={updateField} className="w-full resize-none border border-white/10 bg-brand-black px-4 py-3 text-sm text-white outline-none transition-colors placeholder:text-white/20 focus:border-brand-red" placeholder="Gostaria de saber mais sobre..." />
                    </div>
                    <button type="submit" disabled={isSubmitting} className="premium-button group w-full bg-brand-red text-white disabled:opacity-50">
                      <Send className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                      {isSubmitting ? "Preparando..." : "Enviar pelo WhatsApp"}
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>

            <div className="mt-5 h-[250px] overflow-hidden border border-white/10">
              <iframe title="Google Maps Master Fitness Ibaiti" src={data.mapsEmbedUrl} width="100%" height="100%" style={{ border: 0, filter: "grayscale(1) invert(.9) contrast(1.15)" }} allowFullScreen={false} loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
            </div>
          </div>
        </div>

        <div className="relative mt-20 flex justify-center border-t border-white/10 pt-10">
          <VisitCounter />
        </div>

        <div className="relative mt-10 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-7 text-[10px] font-medium text-white/30 md:flex-row">
          <p>© {new Date().getFullYear()} Master Fitness Ibaiti. Todos os direitos reservados.</p>
          <a href="/admin" className="font-black uppercase tracking-[0.2em] transition-colors hover:text-brand-red">Painel Admin</a>
        </div>
      </div>
    </footer>
  );
}

interface FieldProps {
  label: string;
  name: string;
  type: string;
  value: string;
  placeholder: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

function Field({ label, name, type, value, placeholder, onChange }: FieldProps) {
  return (
    <div>
      <label htmlFor={name} className="mb-2 block text-[9px] font-black uppercase tracking-[0.18em] text-white/45">{label}</label>
      <input id={name} name={name} type={type} required value={value} onChange={onChange} className="w-full border border-white/10 bg-brand-black px-4 py-3 text-sm text-white outline-none transition-colors placeholder:text-white/20 focus:border-brand-red" placeholder={placeholder} />
    </div>
  );
}

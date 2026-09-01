"use client";

import { useState, useCallback } from "react";
import { useContent } from "@/hooks/useContent";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Lock, Save, RefreshCw, LogOut, LayoutGrid, Award, Info, CreditCard, PhoneCall, Check, AlertCircle, Eye, Plus, Trash2, Image as ImageIcon, Star, ChevronRight, Dumbbell, Users, Zap, Heart, X } from "lucide-react";
import { ContentData } from "@/data/content";

function Toast({ message, type, onClose }: { message: string; type: "success" | "error"; onClose: () => void }) {
  return (
    <motion.div initial={{ opacity: 0, y: 50, scale: 0.9 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 20, scale: 0.9 }} className={`fixed bottom-24 right-6 z-[200] flex items-center gap-3 px-6 py-4 ${type === "success" ? "bg-green-500/20 border-green-500/50" : "bg-red-500/20 border-red-500/50"} border backdrop-blur-md`}>
      {type === "success" ? <Check className="w-5 h-5 text-green-400" /> : <AlertCircle className="w-5 h-5 text-red-400" />}
      <span className="text-sm text-brand-white font-medium">{message}</span>
      <button onClick={onClose} className="ml-2 text-brand-white/50 hover:text-brand-white"><X className="w-4 h-4" /></button>
    </motion.div>
  );
}

function ConfirmDialog({ message, onConfirm, onCancel }: { message: string; onConfirm: () => void; onCancel: () => void }) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[300] bg-brand-black/80 backdrop-blur-sm flex items-center justify-center p-4" onClick={onCancel}>
      <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} onClick={(e) => e.stopPropagation()} className="bg-brand-dark-gray border border-brand-white/10 p-8 max-w-md w-full">
        <div className="flex items-center gap-3 mb-4"><div className="p-3 bg-brand-red/10 border border-brand-red/30"><AlertCircle className="w-6 h-6 text-brand-red" /></div><h3 className="font-title font-bold text-lg text-brand-white uppercase">Confirmar</h3></div>
        <p className="text-brand-white/70 mb-8">{message}</p>
        <div className="flex gap-4">
          <button onClick={onCancel} className="flex-1 py-3 border border-brand-white/20 text-brand-white font-bold text-sm uppercase tracking-wider hover:bg-brand-white/5 transition-colors">Cancelar</button>
          <button onClick={onConfirm} className="flex-1 py-3 bg-brand-red text-brand-white font-bold text-sm uppercase tracking-wider hover:bg-brand-red-neon transition-colors">Confirmar</button>
        </div>
      </motion.div>
    </motion.div>
  );
}

function ImageInputWithPreview({ value, onChange, label }: { value: string; onChange: (val: string) => void; label: string }) {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        if (!ctx) return;
        const MAX = 800;
        let w = img.width, h = img.height;
        if (w > h) { if (w > MAX) { h *= MAX / w; w = MAX; } } else { if (h > MAX) { w *= MAX / h; h = MAX; } }
        canvas.width = w; canvas.height = h;
        ctx.drawImage(img, 0, 0, w, h);
        onChange(canvas.toDataURL("image/jpeg", 0.70));
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
  };
  return (
    <div className="space-y-2">
      <label className="block text-[10px] text-brand-white/60 uppercase tracking-widest font-bold">{label}</label>
      <div className="flex gap-3 items-start">
        <div className="flex-grow space-y-2">
          <div className="relative group"><input type="file" accept="image/*" onChange={handleFileChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" /><div className="w-full bg-brand-black border border-brand-white/10 group-hover:border-brand-red/50 px-4 py-3 text-sm text-brand-white/70 group-hover:text-brand-white flex items-center gap-3 justify-center transition-all duration-300 cursor-pointer"><ImageIcon className="w-4 h-4 text-brand-red" /><span>Enviar Imagem</span></div></div>
          <input type="text" value={value.startsWith("data:") ? "" : value} onChange={(e) => onChange(e.target.value)} placeholder="Ou cole o link da imagem..." className="w-full bg-brand-black border border-brand-white/10 focus:border-brand-red px-4 py-2.5 text-xs text-brand-white placeholder-brand-white/30 focus:outline-none transition-all duration-300" />
        </div>
        <div className="w-20 h-20 border border-brand-white/10 bg-brand-black flex items-center justify-center overflow-hidden shrink-0">{value ? (<img src={value} alt="Preview" className="w-full h-full object-cover" onError={(e) => { (e.target as HTMLElement).style.display = "none"; }} />) : <ImageIcon className="w-6 h-6 text-brand-white/20" />}</div>
      </div>
    </div>
  );
}

function CollapsibleSection({ title, children, onDelete, isExpanded, onToggle }: { title: string; children: React.ReactNode; onDelete: () => void; isExpanded: boolean; onToggle: () => void }) {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="border border-brand-white/10 bg-brand-black overflow-hidden">
      <div className="p-4 flex justify-between items-center cursor-pointer hover:bg-brand-white/5 transition-colors" onClick={onToggle}>
        <div className="flex items-center gap-3"><motion.div animate={{ rotate: isExpanded ? 90 : 0 }} transition={{ duration: 0.2 }}><ChevronRight className="w-4 h-4 text-brand-red" /></motion.div><span className="font-bold text-sm text-brand-white">{title}</span></div>
        <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={(e) => { e.stopPropagation(); onDelete(); }} className="p-2 text-brand-white/30 hover:text-brand-red hover:bg-brand-red/10 transition-colors"><Trash2 className="w-4 h-4" /></motion.button>
      </div>
      <AnimatePresence>{isExpanded && (<motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} className="overflow-hidden"><div className="p-5 border-t border-brand-white/10 space-y-4">{children}</div></motion.div>)}</AnimatePresence>
    </motion.div>
  );
}

const tabs = [
  { id: "hero", label: "Hero", icon: LayoutGrid },
  { id: "stats", label: "Numeros", icon: Award },
  { id: "about", label: "Sobre", icon: Info },
  { id: "modalities", label: "Modalidades", icon: Dumbbell },
  { id: "gallery", label: "Galeria", icon: ImageIcon },
  { id: "transformations", label: "Resultados", icon: Zap },
  { id: "testimonials", label: "Depoimentos", icon: Heart },
  { id: "plans", label: "Planos", icon: CreditCard },
  { id: "contact", label: "Contato", icon: PhoneCall },
];

export default function AdminPage() {
  const { content, updateContent, resetContent, isLoaded } = useContent();
  const [password, setPassword] = useState("");
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [authError, setAuthError] = useState(false);
  const [activeTab, setActiveTab] = useState("hero");
  const [expandedItem, setExpandedItem] = useState<string | null>(null);
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "success" | "error">("idle");
  const [adminData, setAdminData] = useState<ContentData | null>(null);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);
  const [confirmDialog, setConfirmDialog] = useState<{ message: string; onConfirm: () => void } | null>(null);
  const ADMIN_PASSWORD = "Marcelo2026";

  const showToast = useCallback((message: string, type: "success" | "error") => { setToast({ message, type }); setTimeout(() => setToast(null), 4000); }, []);
  const handleLogin = (e: React.FormEvent) => { e.preventDefault(); if (password === ADMIN_PASSWORD) { setIsAuthorized(true); setAuthError(false); setAdminData(JSON.parse(JSON.stringify(content))); } else { setAuthError(true); } };
  const handleSave = () => { if (!adminData) return; setSaveStatus("saving"); try { updateContent(adminData); setSaveStatus("success"); showToast("Salvo com sucesso!", "success"); setTimeout(() => setSaveStatus("idle"), 3000); } catch { setSaveStatus("error"); showToast("Erro ao salvar!", "error"); setTimeout(() => setSaveStatus("idle"), 3000); } };
  const handleReset = () => { setConfirmDialog({ message: "Deseja redefinir todo o conteudo para os padroes de fabrica?", onConfirm: () => { resetContent(); window.location.reload(); } }); };
  const handleLogout = () => { setIsAuthorized(false); setPassword(""); setAdminData(null); };
  const addItem = (type: string, newItem: object) => { if (!adminData) return; const key = type as keyof ContentData; setAdminData({ ...adminData, [key]: [...(adminData[key] as object[]), newItem] }); };
  const removeItem = (type: string, idx: number) => { if (!adminData) return; const key = type as keyof ContentData; const updated = [...(adminData[key] as object[])]; updated.splice(idx, 1); setAdminData({ ...adminData, [key]: updated }); };

  if (!isLoaded || (isAuthorized && !adminData)) { return (<div className="min-h-screen bg-brand-black flex items-center justify-center"><motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }}><RefreshCw className="w-10 h-10 text-brand-red" /></motion.div></div>); }

  if (!isAuthorized) {
    return (
      <div className="min-h-screen bg-brand-black flex items-center justify-center px-6 relative overflow-hidden">
        <div className="absolute inset-0"><div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,30,30,0.08),transparent_60%)]" /><motion.div animate={{ rotate: 360 }} transition={{ duration: 120, repeat: Infinity, ease: "linear" }} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-brand-red/5 rounded-full" /></div>
        <motion.div initial={{ scale: 0.9, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="w-full max-w-md p-10 bg-brand-dark-gray border border-brand-white/10 z-10 relative">
          <div className="flex flex-col items-center text-center mb-10"><motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2, type: "spring" }} className="p-5 bg-brand-red/10 border border-brand-red/30 mb-6"><Lock className="w-10 h-10 text-brand-red" /></motion.div><h1 className="font-title font-black text-3xl text-brand-white uppercase tracking-tighter">PAINEL ADMIN</h1><p className="text-sm text-brand-white/50 mt-2 uppercase tracking-widest font-medium">Master Fitness Ibaiti</p></div>
          <form onSubmit={handleLogin} className="space-y-6">
            <div><label className="block text-[10px] text-brand-white/60 uppercase tracking-widest font-bold mb-3">Senha de Acesso</label><input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} className="w-full bg-brand-black border border-brand-white/10 focus:border-brand-red px-5 py-4 text-base text-brand-white placeholder-brand-white/20 focus:outline-none transition-all duration-300 focus:shadow-[0_0_20px_rgba(255,30,30,0.2)]" placeholder="Digite sua senha" /><AnimatePresence>{authError && (<motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="flex items-center gap-2 mt-3 text-sm text-brand-red"><AlertCircle className="w-4 h-4 shrink-0" /><span>Senha incorreta!</span></motion.div>)}</AnimatePresence></div>
            <motion.button type="submit" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-full py-5 bg-gradient-to-r from-brand-red to-brand-red-neon text-brand-white font-title font-bold text-sm uppercase tracking-widest transition-all duration-300 shadow-[0_4px_20px_rgba(255,30,30,0.3)]">Entrar no Painel</motion.button>
          </form>
          <div className="text-center mt-8"><Link href="/" className="text-sm text-brand-white/40 hover:text-brand-white transition-colors uppercase tracking-widest font-medium">Voltar ao Site</Link></div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-black text-brand-white flex flex-col">
      <header className="bg-brand-dark-gray/95 backdrop-blur-md border-b border-brand-white/10 py-4 px-6 md:px-10 sticky top-0 z-[50]"><div className="max-w-7xl mx-auto flex justify-between items-center"><div className="flex items-center gap-4"><span className="font-title font-black text-2xl tracking-tighter text-brand-white">MASTER<span className="text-brand-red">FITNESS</span></span><span className="px-3 py-1 border border-brand-white/20 bg-brand-white/5 text-[10px] uppercase tracking-widest font-bold text-brand-white/60">Admin</span></div><div className="flex items-center gap-3"><Link href="/" target="_blank" className="flex items-center gap-2 px-4 py-2 border border-brand-white/10 hover:border-brand-white/30 text-sm font-medium uppercase tracking-wider transition-all duration-300 hover:bg-brand-white/5"><Eye className="w-4 h-4" /><span className="hidden sm:inline">Ver Site</span></Link><button onClick={handleLogout} className="flex items-center gap-2 px-4 py-2 border border-brand-red/30 hover:bg-brand-red/10 text-brand-red text-sm font-medium uppercase tracking-wider transition-all duration-300"><LogOut className="w-4 h-4" /><span className="hidden sm:inline">Sair</span></button></div></div></header>
      <div className="flex-1 flex flex-col lg:flex-row max-w-7xl w-full mx-auto">
        <aside className="lg:w-72 bg-brand-dark-gray border-b lg:border-b-0 lg:border-r border-brand-white/10 p-4 lg:p-6"><nav className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-x-visible pb-2 lg:pb-0">{tabs.map((tab) => { const Icon = tab.icon; return (<motion.button key={tab.id} onClick={() => { setActiveTab(tab.id); setExpandedItem(null); }} whileHover={{ x: 4 }} whileTap={{ scale: 0.98 }} className={`flex-shrink-0 lg:w-full flex items-center gap-3 px-4 py-3 text-sm uppercase tracking-wider font-bold transition-all duration-300 text-left border ${activeTab === tab.id ? "bg-brand-red border-brand-red text-brand-white shadow-[0_4px_15px_rgba(255,30,30,0.3)]" : "border-transparent text-brand-white/60 hover:text-brand-white hover:bg-brand-white/5"}`}><Icon className="w-5 h-5" /><span>{tab.label}</span></motion.button>); })}</nav><div className="hidden lg:block mt-8 pt-6 border-t border-brand-white/10"><motion.button onClick={handleReset} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-full flex items-center justify-center gap-2 px-4 py-3 border border-brand-red/30 text-brand-red text-sm uppercase tracking-widest font-bold hover:bg-brand-red/10 transition-all duration-300"><RefreshCw className="w-4 h-4" />Redefinir</motion.button></div></aside>
        <main className="flex-1 p-6 md:p-8 pb-32 overflow-y-auto"><AnimatePresence mode="wait"><motion.div key={activeTab} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}>{activeTab === "hero" && adminData && (<div className="space-y-8"><div><h2 className="font-title font-black text-2xl uppercase text-brand-white mb-2">Hero - Banner Inicial</h2><p className="text-brand-white/50 text-sm">Configure a secao principal da pagina inicial</p></div><div className="space-y-6"><div><label className="block text-[10px] text-brand-white/60 uppercase tracking-widest font-bold mb-3">Titulo do Banner</label><input type="text" value={adminData.hero.title} onChange={(e) => setAdminData({...adminData, hero: {...adminData.hero, title: e.target.value}})} className="w-full bg-brand-black border border-brand-white/10 focus:border-brand-red px-5 py-4 text-base text-brand-white focus:outline-none transition-all duration-300" /></div><div><label className="block text-[10px] text-brand-white/60 uppercase tracking-widest font-bold mb-3">Subtitulo</label><textarea value={adminData.hero.subtitle} onChange={(e) => setAdminData({...adminData, hero: {...adminData.hero, subtitle: e.target.value}})} rows={3} className="w-full bg-brand-black border border-brand-white/10 focus:border-brand-red px-5 py-4 text-base text-brand-white focus:outline-none resize-none transition-all duration-300" /></div><div className="grid grid-cols-1 md:grid-cols-2 gap-6"><div><label className="block text-[10px] text-brand-white/60 uppercase tracking-widest font-bold mb-3">Link WhatsApp (Matricula)</label><input type="text" value={adminData.hero.enrollLink} onChange={(e) => setAdminData({...adminData, hero: {...adminData.hero, enrollLink: e.target.value}})} className="w-full bg-brand-black border border-brand-white/10 focus:border-brand-red px-5 py-4 text-sm text-brand-white focus:outline-none transition-all duration-300" /></div><div><label className="block text-[10px] text-brand-white/60 uppercase tracking-widest font-bold mb-3">Numero WhatsApp (Display)</label><input type="text" value={adminData.hero.whatsappNumber} onChange={(e) => setAdminData({...adminData, hero: {...adminData.hero, whatsappNumber: e.target.value}})} className="w-full bg-brand-black border border-brand-white/10 focus:border-brand-red px-5 py-4 text-sm text-brand-white focus:outline-none transition-all duration-300" /></div></div></div></div>)}</motion.div></AnimatePresence></main>
      </div>
      <div className="fixed bottom-0 left-0 w-full z-[100] bg-brand-dark-gray/95 backdrop-blur-md border-t border-brand-red/20 p-4 md:p-6 flex justify-center md:justify-end items-center shadow-[0_-10px_30px_rgba(0,0,0,0.5)]"><motion.button onClick={handleSave} disabled={saveStatus === "saving"} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-full md:w-auto flex justify-center items-center gap-3 px-10 py-4 bg-gradient-to-r from-brand-red to-brand-red-neon text-brand-white font-title font-bold text-sm uppercase tracking-widest transition-all duration-300 disabled:opacity-50 shadow-[0_4px_20px_rgba(255,30,30,0.3)]">{saveStatus === "saving" && <RefreshCw className="w-5 h-5 animate-spin" />}{saveStatus === "success" && <Check className="w-5 h-5" />}{saveStatus === "idle" && <Save className="w-5 h-5" />}<span>{saveStatus === "saving" ? "SALVANDO..." : saveStatus === "success" ? "SALVO!" : "SALVAR"}</span></motion.button></div>
      <AnimatePresence>{toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}</AnimatePresence>
      <AnimatePresence>{confirmDialog && <ConfirmDialog message={confirmDialog.message} onConfirm={() => { confirmDialog.onConfirm(); setConfirmDialog(null); }} onCancel={() => setConfirmDialog(null)} />}</AnimatePresence>
    </div>
  );
}

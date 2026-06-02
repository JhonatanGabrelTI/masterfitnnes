"use client";

import { useState } from "react";
import { useContent } from "@/hooks/useContent";
import { motion } from "framer-motion";
import Link from "next/link";
import { 
  Lock, Save, RefreshCw, LogOut, LayoutGrid, Award, 
  Info, Sparkles, CreditCard, PhoneCall, Check, AlertCircle, Eye
} from "lucide-react";
import { ContentData } from "@/data/content";

export default function AdminPage() {
  const { content, updateContent, resetContent, isLoaded } = useContent();
  const [password, setPassword] = useState("");
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [authError, setAuthError] = useState(false);
  const [activeTab, setActiveTab] = useState("hero");
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "success" | "error">("idle");
  const [adminData, setAdminData] = useState<ContentData | null>(null);

  // Simple secure mock password
  const ADMIN_PASSWORD = "masterfitness";

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthorized(true);
      setAuthError(false);
      setAdminData(JSON.parse(JSON.stringify(content))); // Deep clone content state
    } else {
      setAuthError(true);
    }
  };

  const handleSave = () => {
    if (!adminData) return;
    setSaveStatus("saving");
    try {
      updateContent(adminData);
      setSaveStatus("success");
      setTimeout(() => setSaveStatus("idle"), 3000);
    } catch {
      setSaveStatus("error");
      setTimeout(() => setSaveStatus("idle"), 3000);
    }
  };

  const handleReset = () => {
    if (window.confirm("Deseja realmente redefinir todo o conteúdo do site para os padrões de fábrica?")) {
      resetContent();
      window.location.reload();
    }
  };

  const handleLogout = () => {
    setIsAuthorized(false);
    setPassword("");
    setAdminData(null);
  };

  if (!isLoaded || (isAuthorized && !adminData)) {
    return (
      <div className="min-h-screen bg-brand-black flex items-center justify-center">
        <RefreshCw className="w-8 h-8 text-brand-red animate-spin" />
      </div>
    );
  }

  // Authorization Form Screen
  if (!isAuthorized) {
    return (
      <div className="min-h-screen bg-brand-black flex items-center justify-center px-6 relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,30,30,0.05),transparent_60%)]" />
        
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="w-full max-w-md p-8 bg-brand-dark-gray border border-brand-white/10 z-10 relative"
        >
          <div className="flex flex-col items-center text-center mb-8">
            <div className="p-4 bg-brand-red/10 border border-brand-red/30 rounded-none mb-4">
              <Lock className="w-8 h-8 text-brand-red" />
            </div>
            <h1 className="font-title font-black text-2xl text-brand-white uppercase tracking-tighter">
              PAINEL ADMINISTRATIVO
            </h1>
            <p className="text-xs text-brand-white/40 mt-1 uppercase tracking-widest font-extrabold">
              Master Fitness Ibaiti
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-[10px] text-brand-white/50 uppercase tracking-widest font-black mb-2">
                Senha de Acesso
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-brand-black border border-brand-white/10 focus:border-brand-red px-4 py-3 text-sm text-brand-white placeholder-brand-white/10 focus:outline-none transition-colors duration-300"
                placeholder="Insira a senha admin"
              />
              {authError && (
                <div className="flex items-center gap-2 mt-2 text-xs text-brand-red">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>Senha incorreta! Dica: &apos;masterfitness&apos;</span>
                </div>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-brand-red text-brand-white font-title font-bold text-xs uppercase tracking-widest transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] neon-glow-red"
            >
              ENTRAR NO PAINEL
            </button>
          </form>
          
          <div className="text-center mt-6">
            <Link href="/" className="text-xs text-brand-white/40 hover:text-brand-white transition-colors uppercase tracking-widest font-black">
              Voltar ao Site
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  // Admin Dashboard Content Wrapper
  return (
    <div className="min-h-screen bg-brand-black text-brand-white flex flex-col z-10 relative">
      
      {/* Header bar */}
      <header className="bg-brand-dark-gray border-b border-brand-white/5 py-4 px-6 md:px-12 flex justify-between items-center sticky top-0 z-[50]">
        <div className="flex items-center gap-3">
          <span className="font-title font-black text-xl tracking-tighter text-brand-white">
            MASTER<span className="text-brand-red">FITNESS</span>
          </span>
          <span className="px-2 py-0.5 border border-brand-white/15 bg-brand-white/5 text-[9px] uppercase tracking-widest font-extrabold text-brand-white/60">
            Painel Admin
          </span>
        </div>

        <div className="flex items-center gap-4">
          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-1.5 px-3 py-1.5 border border-brand-white/10 hover:border-brand-white/30 text-xs font-bold uppercase tracking-wider transition-colors duration-300"
          >
            <Eye className="w-4 h-4" />
            <span>Ver Site</span>
          </Link>
          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 px-3 py-1.5 border border-brand-red/30 hover:bg-brand-red/10 text-brand-red text-xs font-bold uppercase tracking-wider transition-colors duration-300"
          >
            <LogOut className="w-4 h-4" />
            <span>Sair</span>
          </button>
        </div>
      </header>

      {/* Main Grid Workspace */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-0 max-w-7xl w-full mx-auto p-4 md:p-8">
        
        {/* Sidebar Nav Tabs */}
        <aside className="lg:col-span-3 bg-brand-dark-gray border border-brand-white/5 p-4 flex flex-col gap-2 h-fit">
          {[
            { id: "hero", label: "Hero (Início)", icon: <LayoutGrid className="w-4 h-4" /> },
            { id: "stats", label: "Números", icon: <Award className="w-4 h-4" /> },
            { id: "about", label: "Sobre Nós", icon: <Info className="w-4 h-4" /> },
            { id: "modalities", label: "Modalidades", icon: <Sparkles className="w-4 h-4" /> },
            { id: "plans", label: "Planos", icon: <CreditCard className="w-4 h-4" /> },
            { id: "contact", label: "Contato / Redes", icon: <PhoneCall className="w-4 h-4" /> },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 text-xs uppercase tracking-wider font-extrabold transition-all duration-300 text-left border ${
                activeTab === tab.id
                  ? "bg-brand-red border-brand-red text-brand-white shadow-[0_2px_10px_rgba(255,30,30,0.25)]"
                  : "border-transparent text-brand-white/60 hover:text-brand-white hover:bg-brand-white/5"
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}

          <hr className="border-brand-white/5 my-4" />

          {/* Dangerous Zone */}
          <button
            onClick={handleReset}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 border border-brand-red/20 text-brand-red text-xs uppercase tracking-widest font-black hover:bg-brand-red/5 transition-all duration-300"
          >
            Redefinir Dados
          </button>
        </aside>

        {/* Content edit block */}
        <main className="lg:col-span-9 bg-brand-dark-gray border border-l-0 lg:border-l border-brand-white/5 p-6 md:p-8 flex flex-col justify-between">
          <div className="space-y-8">
            
            {/* TAB: HERO */}
            {activeTab === "hero" && adminData && (
              <div className="space-y-6">
                <h3 className="font-title font-black text-xl uppercase border-b border-brand-white/5 pb-2 text-brand-red">
                  Seção Hero (Banner Inicial)
                </h3>
                
                <div className="grid grid-cols-1 gap-6">
                  <div>
                    <label className="block text-[10px] text-brand-white/50 uppercase tracking-widest font-bold mb-2">
                      Título do Banner (Cinema)
                    </label>
                    <input
                      type="text"
                      value={adminData.hero.title}
                      onChange={(e) => setAdminData({
                        ...adminData,
                        hero: { ...adminData.hero, title: e.target.value }
                      })}
                      className="w-full bg-brand-black border border-brand-white/10 focus:border-brand-red px-4 py-3 text-sm text-brand-white focus:outline-none"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-[10px] text-brand-white/50 uppercase tracking-widest font-bold mb-2">
                      Subtítulo descritivo
                    </label>
                    <textarea
                      value={adminData.hero.subtitle}
                      onChange={(e) => setAdminData({
                        ...adminData,
                        hero: { ...adminData.hero, subtitle: e.target.value }
                      })}
                      rows={3}
                      className="w-full bg-brand-black border border-brand-white/10 focus:border-brand-red px-4 py-3 text-sm text-brand-white focus:outline-none resize-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-[10px] text-brand-white/50 uppercase tracking-widest font-bold mb-2">
                        Link do WhatsApp (Matrícula)
                      </label>
                      <input
                        type="text"
                        value={adminData.hero.enrollLink}
                        onChange={(e) => setAdminData({
                          ...adminData,
                          hero: { ...adminData.hero, enrollLink: e.target.value }
                        })}
                        className="w-full bg-brand-black border border-brand-white/10 focus:border-brand-red px-4 py-3 text-sm text-brand-white focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] text-brand-white/50 uppercase tracking-widest font-bold mb-2">
                        Número do WhatsApp (Display)
                      </label>
                      <input
                        type="text"
                        value={adminData.hero.whatsappNumber}
                        onChange={(e) => setAdminData({
                          ...adminData,
                          hero: { ...adminData.hero, whatsappNumber: e.target.value }
                        })}
                        className="w-full bg-brand-black border border-brand-white/10 focus:border-brand-red px-4 py-3 text-sm text-brand-white focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB: STATS */}
            {activeTab === "stats" && adminData && (
              <div className="space-y-6">
                <h3 className="font-title font-black text-xl uppercase border-b border-brand-white/5 pb-2 text-brand-red">
                  Seção de Números de Impacto
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[10px] text-brand-white/50 uppercase tracking-widest font-bold mb-2">
                      Quantidade de Alunos
                    </label>
                    <input
                      type="number"
                      value={adminData.stats.students}
                      onChange={(e) => setAdminData({
                        ...adminData,
                        stats: { ...adminData.stats, students: parseInt(e.target.value) || 0 }
                      })}
                      className="w-full bg-brand-black border border-brand-white/10 focus:border-brand-red px-4 py-3 text-sm text-brand-white focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] text-brand-white/50 uppercase tracking-widest font-bold mb-2">
                      Anos de Experiência
                    </label>
                    <input
                      type="number"
                      value={adminData.stats.years}
                      onChange={(e) => setAdminData({
                        ...adminData,
                        stats: { ...adminData.stats, years: parseInt(e.target.value) || 0 }
                      })}
                      className="w-full bg-brand-black border border-brand-white/10 focus:border-brand-red px-4 py-3 text-sm text-brand-white focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] text-brand-white/50 uppercase tracking-widest font-bold mb-2">
                      Quantidade de Transformações
                    </label>
                    <input
                      type="number"
                      value={adminData.stats.transformations}
                      onChange={(e) => setAdminData({
                        ...adminData,
                        stats: { ...adminData.stats, transformations: parseInt(e.target.value) || 0 }
                      })}
                      className="w-full bg-brand-black border border-brand-white/10 focus:border-brand-red px-4 py-3 text-sm text-brand-white focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] text-brand-white/50 uppercase tracking-widest font-bold mb-2">
                      Destaque Estrutura
                    </label>
                    <input
                      type="text"
                      value={adminData.stats.equipments}
                      onChange={(e) => setAdminData({
                        ...adminData,
                        stats: { ...adminData.stats, equipments: e.target.value }
                      })}
                      className="w-full bg-brand-black border border-brand-white/10 focus:border-brand-red px-4 py-3 text-sm text-brand-white focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* TAB: ABOUT */}
            {activeTab === "about" && adminData && (
              <div className="space-y-6">
                <h3 className="font-title font-black text-xl uppercase border-b border-brand-white/5 pb-2 text-brand-red">
                  Seção Sobre Nós
                </h3>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-[10px] text-brand-white/50 uppercase tracking-widest font-bold mb-2">
                      Título Principal
                    </label>
                    <input
                      type="text"
                      value={adminData.about.title}
                      onChange={(e) => setAdminData({
                        ...adminData,
                        about: { ...adminData.about, title: e.target.value }
                      })}
                      className="w-full bg-brand-black border border-brand-white/10 focus:border-brand-red px-4 py-3 text-sm text-brand-white focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] text-brand-white/50 uppercase tracking-widest font-bold mb-2">
                      Subtítulo / Frase Destaque
                    </label>
                    <input
                      type="text"
                      value={adminData.about.subtitle}
                      onChange={(e) => setAdminData({
                        ...adminData,
                        about: { ...adminData.about, subtitle: e.target.value }
                      })}
                      className="w-full bg-brand-black border border-brand-white/10 focus:border-brand-red px-4 py-3 text-sm text-brand-white focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] text-brand-white/50 uppercase tracking-widest font-bold mb-2">
                      Parágrafo de Introdução (1)
                    </label>
                    <textarea
                      value={adminData.about.text1}
                      onChange={(e) => setAdminData({
                        ...adminData,
                        about: { ...adminData.about, text1: e.target.value }
                      })}
                      rows={3}
                      className="w-full bg-brand-black border border-brand-white/10 focus:border-brand-red px-4 py-3 text-sm text-brand-white focus:outline-none resize-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] text-brand-white/50 uppercase tracking-widest font-bold mb-2">
                      Parágrafo Complementar (2)
                    </label>
                    <textarea
                      value={adminData.about.text2}
                      onChange={(e) => setAdminData({
                        ...adminData,
                        about: { ...adminData.about, text2: e.target.value }
                      })}
                      rows={3}
                      className="w-full bg-brand-black border border-brand-white/10 focus:border-brand-red px-4 py-3 text-sm text-brand-white focus:outline-none resize-none"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* TAB: MODALITIES */}
            {activeTab === "modalities" && adminData && (
              <div className="space-y-6">
                <h3 className="font-title font-black text-xl uppercase border-b border-brand-white/5 pb-2 text-brand-red">
                  Gerenciar Modalidades
                </h3>
                
                <div className="space-y-6 max-h-[50vh] overflow-y-auto pr-2">
                  {adminData.modalities.map((mod, idx) => (
                    <div key={mod.id} className="p-4 border border-brand-white/5 bg-brand-black space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-xs uppercase text-brand-red">
                          Modalidade #{idx + 1}
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[9px] text-brand-white/50 uppercase tracking-widest font-bold mb-1">
                            Título
                          </label>
                          <input
                            type="text"
                            value={mod.title}
                            onChange={(e) => {
                              const updated = [...adminData.modalities];
                              updated[idx].title = e.target.value;
                              setAdminData({ ...adminData, modalities: updated });
                            }}
                            className="w-full bg-brand-dark-gray border border-brand-white/10 focus:border-brand-red px-3 py-2 text-xs text-brand-white focus:outline-none"
                          />
                        </div>

                        <div>
                          <label className="block text-[9px] text-brand-white/50 uppercase tracking-widest font-bold mb-1">
                            Link da imagem
                          </label>
                          <input
                            type="text"
                            value={mod.image}
                            onChange={(e) => {
                              const updated = [...adminData.modalities];
                              updated[idx].image = e.target.value;
                              setAdminData({ ...adminData, modalities: updated });
                            }}
                            className="w-full bg-brand-dark-gray border border-brand-white/10 focus:border-brand-red px-3 py-2 text-xs text-brand-white focus:outline-none"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[9px] text-brand-white/50 uppercase tracking-widest font-bold mb-1">
                          Descrição
                        </label>
                        <input
                          type="text"
                          value={mod.description}
                          onChange={(e) => {
                            const updated = [...adminData.modalities];
                            updated[idx].description = e.target.value;
                            setAdminData({ ...adminData, modalities: updated });
                          }}
                          className="w-full bg-brand-dark-gray border border-brand-white/10 focus:border-brand-red px-3 py-2 text-xs text-brand-white focus:outline-none"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB: PLANS */}
            {activeTab === "plans" && adminData && (
              <div className="space-y-6">
                <h3 className="font-title font-black text-xl uppercase border-b border-brand-white/5 pb-2 text-brand-red">
                  Gerenciar Planos e Preços
                </h3>
                
                <div className="space-y-6 max-h-[50vh] overflow-y-auto pr-2">
                  {adminData.plans.map((plan, idx) => (
                    <div key={plan.id} className="p-4 border border-brand-white/5 bg-brand-black space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-xs uppercase text-brand-red">
                          {plan.name}
                        </span>
                        
                        <label className="flex items-center gap-2 cursor-pointer select-none text-xs">
                          <input
                            type="checkbox"
                            checked={plan.recommended}
                            onChange={(e) => {
                              // Reset recommendation of other plans first, only allow 1 recommended
                              const updated = adminData.plans.map((p, pIdx) => ({
                                ...p,
                                recommended: pIdx === idx ? e.target.checked : false
                              }));
                              setAdminData({ ...adminData, plans: updated });
                            }}
                            className="accent-brand-red"
                          />
                          <span>Mais Recomendado</span>
                        </label>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-[9px] text-brand-white/50 uppercase tracking-widest font-bold mb-1">
                            Nome do Plano
                          </label>
                          <input
                            type="text"
                            value={plan.name}
                            onChange={(e) => {
                              const updated = [...adminData.plans];
                              updated[idx].name = e.target.value;
                              setAdminData({ ...adminData, plans: updated });
                            }}
                            className="w-full bg-brand-dark-gray border border-brand-white/10 focus:border-brand-red px-3 py-2 text-xs text-brand-white focus:outline-none"
                          />
                        </div>

                        <div>
                          <label className="block text-[9px] text-brand-white/50 uppercase tracking-widest font-bold mb-1">
                            Preço (R$)
                          </label>
                          <input
                            type="text"
                            value={plan.price}
                            onChange={(e) => {
                              const updated = [...adminData.plans];
                              updated[idx].price = e.target.value;
                              setAdminData({ ...adminData, plans: updated });
                            }}
                            className="w-full bg-brand-dark-gray border border-brand-white/10 focus:border-brand-red px-3 py-2 text-xs text-brand-white focus:outline-none"
                          />
                        </div>

                        <div>
                          <label className="block text-[9px] text-brand-white/50 uppercase tracking-widest font-bold mb-1">
                            Período
                          </label>
                          <input
                            type="text"
                            value={plan.period}
                            onChange={(e) => {
                              const updated = [...adminData.plans];
                              updated[idx].period = e.target.value;
                              setAdminData({ ...adminData, plans: updated });
                            }}
                            className="w-full bg-brand-dark-gray border border-brand-white/10 focus:border-brand-red px-3 py-2 text-xs text-brand-white focus:outline-none"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[9px] text-brand-white/50 uppercase tracking-widest font-bold mb-1">
                          Descrição Rápida
                        </label>
                        <input
                          type="text"
                          value={plan.description}
                          onChange={(e) => {
                            const updated = [...adminData.plans];
                            updated[idx].description = e.target.value;
                            setAdminData({ ...adminData, plans: updated });
                          }}
                          className="w-full bg-brand-dark-gray border border-brand-white/10 focus:border-brand-red px-3 py-2 text-xs text-brand-white focus:outline-none"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB: CONTACT */}
            {activeTab === "contact" && adminData && (
              <div className="space-y-6">
                <h3 className="font-title font-black text-xl uppercase border-b border-brand-white/5 pb-2 text-brand-red">
                  Informações de Contato e Redes Sociais
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[10px] text-brand-white/50 uppercase tracking-widest font-bold mb-2">
                      Endereço da Academia
                    </label>
                    <input
                      type="text"
                      value={adminData.contact.address}
                      onChange={(e) => setAdminData({
                        ...adminData,
                        contact: { ...adminData.contact, address: e.target.value }
                      })}
                      className="w-full bg-brand-black border border-brand-white/10 focus:border-brand-red px-4 py-3 text-sm text-brand-white focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] text-brand-white/50 uppercase tracking-widest font-bold mb-2">
                      Telefone Geral
                    </label>
                    <input
                      type="text"
                      value={adminData.contact.phone}
                      onChange={(e) => setAdminData({
                        ...adminData,
                        contact: { ...adminData.contact, phone: e.target.value }
                      })}
                      className="w-full bg-brand-black border border-brand-white/10 focus:border-brand-red px-4 py-3 text-sm text-brand-white focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] text-brand-white/50 uppercase tracking-widest font-bold mb-2">
                      Link do Perfil do Instagram
                    </label>
                    <input
                      type="text"
                      value={adminData.contact.instagram}
                      onChange={(e) => setAdminData({
                        ...adminData,
                        contact: { ...adminData.contact, instagram: e.target.value }
                      })}
                      className="w-full bg-brand-black border border-brand-white/10 focus:border-brand-red px-4 py-3 text-sm text-brand-white focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] text-brand-white/50 uppercase tracking-widest font-bold mb-2">
                      Link do WhatsApp Direto (Footer)
                    </label>
                    <input
                      type="text"
                      value={adminData.contact.whatsapp}
                      onChange={(e) => setAdminData({
                        ...adminData,
                        contact: { ...adminData.contact, whatsapp: e.target.value }
                      })}
                      className="w-full bg-brand-black border border-brand-white/10 focus:border-brand-red px-4 py-3 text-sm text-brand-white focus:outline-none"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-[10px] text-brand-white/50 uppercase tracking-widest font-bold mb-2">
                      Google Maps Embed URL (src do Iframe)
                    </label>
                    <input
                      type="text"
                      value={adminData.contact.mapsEmbedUrl}
                      onChange={(e) => setAdminData({
                        ...adminData,
                        contact: { ...adminData.contact, mapsEmbedUrl: e.target.value }
                      })}
                      className="w-full bg-brand-black border border-brand-white/10 focus:border-brand-red px-4 py-3 text-sm text-brand-white focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            )}

          </div>

          {/* Bottom Save Action Controls */}
          <div className="flex justify-between items-center mt-8 border-t border-brand-white/5 pt-6">
            <span className="text-xs text-brand-white/40 font-medium">
              A senha padrão é: <strong className="text-brand-white/70">masterfitness</strong>
            </span>
            
            <button
              onClick={handleSave}
              disabled={saveStatus === "saving"}
              className="flex items-center gap-2 px-8 py-4 bg-brand-red hover:bg-brand-red-neon text-brand-white font-title font-bold text-xs uppercase tracking-widest transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 neon-glow-red"
            >
              {saveStatus === "saving" && <RefreshCw className="w-4 h-4 animate-spin" />}
              {saveStatus === "success" && <Check className="w-4 h-4 text-green-400" />}
              {saveStatus === "idle" && <Save className="w-4 h-4" />}
              <span>
                {saveStatus === "saving" && "SALVANDO..."}
                {saveStatus === "success" && "SALVO COM SUCESSO!"}
                {saveStatus === "error" && "ERRO AO SALVAR"}
                {saveStatus === "idle" && "SALVAR ALTERAÇÕES"}
              </span>
            </button>
          </div>

        </main>
      </div>

    </div>
  );
}

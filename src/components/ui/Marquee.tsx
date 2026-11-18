const words = ["MASTER FITNESS", "DISCIPLINA", "FOCO", "PERFORMANCE", "SUPERAÇÃO", "RESULTADOS", "SAÚDE", "FORÇA", "COMPROMISSO", "EVOLUÇÃO", "ALTA INTENSIDADE"];

function WordSet({ hidden = false }: { hidden?: boolean }) {
  return <div className="marquee-set" aria-hidden={hidden || undefined}>{words.map((word) => <span className="marquee-item" key={word}>{word}<i className="marquee-diamond" aria-hidden="true" /></span>)}</div>;
}

export default function Marquee() {
  return <div className="marquee-shell relative z-10 w-full select-none overflow-hidden border-y border-white/10 bg-[#090909] py-5"><div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-red to-transparent" /><div className="marquee-track"><WordSet /><WordSet hidden /></div></div>;
}

export interface ContentData {
  version?: number;
  hero: {
    title: string;
    subtitle: string;
    enrollLink: string;
    whatsappLink: string;
    whatsappNumber: string;
  };
  stats: {
    students: number;
    years: number;
    transformations: number;
    equipments: string;
  };
  about: {
    title: string;
    subtitle: string;
    text1: string;
    text2: string;
    imageUrl: string;
  };
  modalities: {
    id: string;
    title: string;
    description: string;
    image: string;
  }[];
  gallery: {
    id: string;
    title: string;
    image: string;
    category: string;
  }[];
  transformations: {
    id: string;
    title: string;
    description: string;
    beforeImage: string;
    afterImage: string;
    studentName: string;
  }[];
  testimonials: {
    id: string;
    name: string;
    role: string;
    text: string;
    image: string;
    rating: number;
  }[];
  plans: {
    id: string;
    name: string;
    price: string;
    period: string;
    description: string;
    features: string[];
    recommended: boolean;
    ctaText: string;
  }[];
  contact: {
    instagram: string;
    whatsapp: string;
    address: string;
    phone: string;
    mapsEmbedUrl: string;
  };
}

export const defaultContent: ContentData = {
  version: 4,
  hero: {
    title: "FORJE A SUA MELHOR VERSÃO",
    subtitle: "Mais que uma academia, um estilo de vida. Treine na Master Fitness Ibaiti.",
    enrollLink: "https://wa.me/5543996335162?text=Ol%C3%A1%21+Quero+me+matricular+na+Master+Fitness%21",
    whatsappLink: "https://wa.me/5543996335162?text=Ol%C3%A1%21+Gostaria+de+saber+mais+sobre+a+academia.",
    whatsappNumber: "(43) 99633-5162",
  },
  stats: {
    students: 14000,
    years: 10,
    transformations: 500,
    equipments: "Equipamentos Modernos",
  },
  about: {
    title: "A SUA JORNADA DE EVOLUÇÃO COMEÇA AQUI",
    subtitle: "Mais do que uma academia, somos o seu centro de alta performance em Ibaiti.",
    text1: "Fundada com o propósito de transformar vidas através da disciplina e do treinamento físico, a Master Fitness Ibaiti oferece uma infraestrutura de alto padrão para quem busca superar limites.",
    text2: "Com profissionais altamente qualificados, equipamentos de última geração e um ambiente focado em resultados, estamos prontos para apoiar cada passo da sua evolução física e mental.",
    imageUrl: "/images/gym-about.png",
  },
  modalities: [
    {
      id: "musculacao",
      title: "Musculação",
      description: "Treinos personalizados para ganho de força, hipertrofia e definição muscular com acompanhamento profissional.",
      image: "/images/mod-musculacao.png",
    },
    {
      id: "funcional",
      title: "Aula de Funcional",
      description: "Treinamento dinâmico focado em força e condicionamento geral. Segundas, quartas e sextas das 18:20 às 19:00.",
      image: "/images/mod-funcional.png",
    },
    {
      id: "abs",
      title: "Aula de ABS",
      description: "Foco total na definição, estabilização e fortalecimento do core/abdômen. Terças e quintas das 19:00 às 19:20/19:30.",
      image: "/images/mod-musculacao.png",
    },
    {
      id: "jump",
      title: "Aula de Jump",
      description: "Treinos coreografados em mini-trampolins. Alta queima calórica e energia. Terças e quintas das 18:20 às 19:00.",
      image: "/images/mod-coletivas.png",
    },
    {
      id: "bike",
      title: "Bike Indoor (Spinning)",
      description: "Simulação de percursos e treinos de alta intensidade em bicicletas estáticas. Excelente para o coração e pernas.",
      image: "/images/mod-cardio.png",
    },
  ],
  gallery: [
    { id: "g1", title: "Área de Pesos Livres", image: "/images/gal-1.png", category: "Infraestrutura" },
    { id: "g2", title: "Treinamento Funcional", image: "/images/gal-2.png", category: "Treino" },
    { id: "g3", title: "Equipamentos Importados", image: "/images/gal-3.png", category: "Infraestrutura" },
    { id: "g4", title: "Área de Cardio Integrada", image: "/images/gal-4.png", category: "Infraestrutura" },
    { id: "g5", title: "Foco e Determinação", image: "/images/gal-5.png", category: "Treino" },
    { id: "g6", title: "Comunidade Master Fitness", image: "/images/gal-6.png", category: "Comunidade" },
  ],
  transformations: [
    {
      id: "t1",
      title: "Evolução do Felipe - 12 Meses",
      description: "Foco total na hipertrofia e reeducação alimentar, com ganho expressivo de massa muscular magra.",
      beforeImage: "/images/gal-2.png",
      afterImage: "/images/gal-5.png",
      studentName: "Felipe Rodrigues",
    },
    {
      id: "t2",
      title: "Evolução da Mariana - 6 Meses",
      description: "Foco no emagrecimento saudável e fortalecimento geral do core e membros inferiores.",
      beforeImage: "/images/gal-3.png",
      afterImage: "/images/gal-1.png",
      studentName: "Mariana Silva",
    },
  ],
  testimonials: [
    {
      id: "d1",
      name: "Guilherme Santos",
      role: "Aluno há 2 anos",
      text: "A Master Fitness mudou minha rotina. O suporte dos professores e a qualidade dos aparelhos são incomparáveis. Consegui alcançar resultados que nunca imaginei antes.",
      image: "/images/gal-5.png",
      rating: 5,
    },
    {
      id: "d2",
      name: "Beatriz Oliveira",
      role: "Aluna há 8 meses",
      text: "Excelente infraestrutura e ambiente acolhedor. O programa de emagrecimento realmente funciona! Perdi 15kg e me sinto com muito mais disposição.",
      image: "/images/gal-3.png",
      rating: 5,
    },
    {
      id: "d3",
      name: "Lucas Pinheiro",
      role: "Aluno há 3 anos",
      text: "A melhor academia de Ibaiti, disparado! O visual é incrível, a energia é contagiante e os equipamentos são de altíssimo nível. Recomendo muito!",
      image: "/images/gal-1.png",
      rating: 5,
    },
  ],
  plans: [
    {
      id: "p1",
      name: "PLANO ANUAL",
      price: "98,99",
      period: "mês",
      description: "O cliente que fidelizar o ano com a Master paga muito menos!",
      features: [
        "Fidelização de 12 meses",
        "Apenas 12x de R$ 98,99 no cartão",
        "Acesso total à musculação",
        "Acompanhamento e suporte profissional",
      ],
      recommended: true,
      ctaText: "GARANTIR PLANO ANUAL",
    },
    {
      id: "p2",
      name: "HORÁRIO PROMOCIONAL",
      price: "80,00",
      period: "mês",
      description: "Treine nos horários especiais e economize muito mais!",
      features: [
        "Treine das 10h às 15h OU das 22h às 00h",
        "Semestral: apenas 6x de R$ 80,00 no cartão",
        "Acesso total à estrutura nestes períodos",
        "Ideal para quem tem rotina flexível",
      ],
      recommended: false,
      ctaText: "APROVEITAR PROMOÇÃO",
    },
    {
      id: "p3",
      name: "PLANO FAMÍLIA",
      price: "100,00",
      period: "mês/pessoa",
      description: "Traga mais 2 pessoas para treinar e ganhe super descontos!",
      features: [
        "Semestral: 6x de R$ 100,00 no cartão por pessoa",
        "Opção de pagamento à vista por R$ 600,00",
        "Válido para grupos de 3 pessoas se matriculando juntas",
        "Treine com motivação extra em grupo",
      ],
      recommended: false,
      ctaText: "CADASTRAR FAMÍLIA",
    },
  ],
  contact: {
    instagram: "https://instagram.com/masterfitness.ibaiti",
    whatsapp: "https://wa.me/5543996335162",
    address: "Av. Gov. Paulo Cruz Pimentel, 12 - Centro, Ibaiti - PR",
    phone: "(43) 99633-5162",
    mapsEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14557.575239103009!2d-50.197940250000004!3d-23.99847115!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94eaa115d91136b7%3A0xc47e33526a0b1275!2sIbaiti%2C%20PR%2C%2084900-000!5e0!3m2!1spt-BR!2sbr!4v1717351000000!5m2!1spt-BR!2sbr",
  },
};

export const PRODUCTS = [
  {
    id: "mel-silvestre-cerrado",
    name: "Mel Silvestre Puro Néctar Goiano",
    tagline: "Colhido das ricas floradas nativas do Cerrado Goiano",
    description: "Mel 100% puro e natural, sem adição de glicose ou conservantes. Extraído a frio para preservar todas as enzimas ativas, vitaminas e antioxidantes naturais. Sabor encorpado com notas florais suaves.",
    category: "mel",
    badge: "Mais Vendido",
    rating: 4.9,
    reviewsCount: 142,
    images: {
      "280g": "/products/mel280g.png",
      "500g": "/products/mel500g.png",
      "700g": "/products/mel700g.png",
      "1000g": "/products/mel1000g.png",
      "1440g": "/products/mel1440g.png"
    },
    // The exact 5 variations from the Nuvemshop store
    variants: [
      { weight: "280g", label: "Bisnaga 280g", price: 24.90, oldPrice: 28.00, popular: false, desc: "Bico dosador prático para o dia a dia" },
      { weight: "500g", label: "Frasco 500g", price: 38.90, oldPrice: 44.00, popular: true, desc: "Tamanho ideal para a mesa do café" },
      { weight: "700g", label: "Pote 700g", price: 49.90, oldPrice: 56.00, popular: false, desc: "Embalagem de vidro tradicional e charmosa" },
      { weight: "1000g", label: "Pote 1kg", price: 64.90, oldPrice: 75.00, popular: true, desc: "Melhor custo-benefício para uso regular" },
      { weight: "1440g", label: "Balde Gourmet 1.44kg", price: 86.90, oldPrice: 99.00, popular: false, desc: "Para famílias e receitas especiais" }
    ],
    features: [
      "100% Puro da Flora do Cerrado",
      "Extração a frio sem aquecimento",
      "Rico em flavonoides e minerais",
      "Origem garantida: Goiânia / GO"
    ]
  },
  {
    id: "favo-de-mel-puro",
    name: "Favo de Mel Silvestre em Caixa Acrílica",
    tagline: "O mel em seu estado mais puro e sagrado, direto da colmeia",
    description: "Pedaço generoso de favo natural repleto de mel dourado. A cera de abelha é 100% natural e comestível, rica em própolis nativo e pólen. Uma experiência gastronômica inigualável.",
    category: "favo",
    badge: "Exclusivo",
    rating: 5.0,
    reviewsCount: 68,
    images: {
      "350g": "https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=800&q=80",
    },
    variants: [
      { weight: "350g", label: "Favo 350g", price: 45.00, oldPrice: 52.00, popular: true, desc: "Caixa acrílica cristal transparente, perfeito para presentear" },
      { weight: "700g", label: "Favo 700g", price: 79.90, oldPrice: 92.00, popular: false, desc: "Favo duplo para tábuas de queijos nobres" }
    ],
    features: [
      "Cera 100% natural e mastigável",
      "Nunca centrifugado ou processado",
      "Harmoniza com queijo canastra e castanhas",
      "Edição limitada por safra"
    ]
  },
  {
    id: "extrato-propolis-verde",
    name: "Extrato de Própolis Verde Concentrado 30ml",
    tagline: "Escudo natural de imunidade com alta concentração de bioativos",
    description: "Produzido a partir do Alecrim-do-Campo através de apicultura especializada. Rico em Artepillina-C, o mais potente agente antimicrobiano e fortalecedor imunológico da natureza.",
    category: "propolis",
    badge: "Saúde & Imunidade",
    rating: 4.9,
    reviewsCount: 95,
    images: {
      "30ml": "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=800&q=80",
    },
    variants: [
      { weight: "30ml", label: "Frasco Conta-Gotas 30ml", price: 29.90, oldPrice: 35.00, popular: true, desc: "Extrato alcoólico 11% matéria seca mínima" },
      { weight: "30ml-aquoso", label: "Aquoso Sem Álcool 30ml", price: 32.90, oldPrice: 38.00, popular: false, desc: "Ideal para crianças e pessoas sensíveis" }
    ],
    features: [
      "Concentração de Artepillina-C",
      "Ação anti-inflamatória e antiviral",
      "Própolis pura selecionada",
      "Rende mais de 60 doses"
    ]
  },
  {
    id: "composto-mel-propolis-spray",
    name: "Spray Composto de Mel com Própolis, Agrião e Guaco",
    tagline: "Alívio imediato para a garganta e suporte respiratório",
    description: "Fórmula clássica e refrescante que une a suavidade do Mel Néctar Goiano ao poder do Própolis e extratos fitoterápicos de agrião e guaco. Essencial para mudanças de tempo.",
    category: "propolis",
    badge: "Indispensável",
    rating: 4.8,
    reviewsCount: 84,
    images: {
      "35ml": "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=800&q=80",
    },
    variants: [
      { weight: "35ml", label: "Spray 35ml", price: 19.90, oldPrice: 24.00, popular: true, desc: "Frasco com válvula dosadora em spray para bolsa ou mesa" },
      { weight: "Kit 3x", label: "Kit 3 Frascos", price: 49.90, oldPrice: 59.70, popular: false, desc: "Economize levando 3 unidades para a família" }
    ],
    features: [
      "Alívio rápido da irritação na garganta",
      "Sem corantes artificiais",
      "Sabor mentolado e suave",
      "Prático para carregar no bolso"
    ]
  },
  {
    id: "kit-imunidade-total",
    name: "Kit Imunidade Cerrado Total (Mel + Própolis + Spray)",
    tagline: "O combo mais completo para a saúde da sua família",
    description: "Reunimos nossos 3 maiores campeões de cuidados naturais: 1x Pote de Mel Silvestre 1kg + 1x Própolis Verde Concentrado 30ml + 1x Spray Mel & Própolis 35ml.",
    category: "kits",
    badge: "Super Combo (18% OFF)",
    rating: 5.0,
    reviewsCount: 112,
    images: {
      "kit": "/products/mel1000g.png",
    },
    variants: [
      { weight: "kit", label: "Kit Completo 3 Itens", price: 98.90, oldPrice: 120.00, popular: true, desc: "Mel 1kg + Própolis Verde + Spray Garganta" }
    ],
    features: [
      "Economia imediata de R$ 21,10",
      "Brinde: Colher dosadora de mel em madeira",
      "Embalado para presente ecológico",
      "Frete reduzido para todo Brasil"
    ]
  },
  {
    id: "combo-familia-3x1kg",
    name: "Trio Especial Mel Néctar Goiano 3x 1kg",
    tagline: "Estoque garantido de mel puro na sua casa com FRETE GRÁTIS",
    description: "3 potes de 1kg do nosso premiado Mel Silvestre Puro. Ideal para lares que substituíram completamente o açúcar refinado por um adoçante nutritivo e 100% natural.",
    category: "kits",
    badge: "Frete Grátis",
    rating: 4.9,
    reviewsCount: 57,
    images: {
      "3kg": "/products/mel1000g.png",
    },
    variants: [
      { weight: "3kg", label: "3 Potes de 1kg (Total 3kg)", price: 179.90, oldPrice: 205.00, popular: true, desc: "Equivale a R$ 59,96 por kg (Super econômico)" }
    ],
    features: [
      "Frete Grátis elegível no checkout",
      "Validade de 2 anos (mel puro não estraga)",
      "Lote fresco recém-envasado em Goiânia",
      "Certificado de pureza laboratorial"
    ]
  }
];

export const STORE_INFO = {
  name: "BR Apicultura - Mel Néctar Goiano",
  shortName: "Mel Néctar Goiano",
  tagline: "Unidade de Processamento de Produtos das Abelhas",
  location: "Rua C, 287 - Goiânia / GO",
  phone: "(62) 98622-2199",
  whatsappNumber: "5562986222199",
  email: "vendas@brapicultura.com.br",
  instagram: "@melnectargoiano",
  pixKey: "vendas@brapicultura.com.br",
  pixBeneficiary: "BR Apicultura & Mel Néctar Goiano Ltda",
  freeShippingThreshold: 150.00
};


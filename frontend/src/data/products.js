export const PRODUCTS = [
  {
    id: "mel-pote-1000g",
    name: "Mel Silvestre Puro Pote 1.000g (1 kg)",
    tagline: "O tamanho campeão de vendas com o melhor custo-benefício",
    description: "Mel 100% puro e natural colhido das floradas silvestres do Cerrado Goiano. Extraído e filtrado a frio em nossa Unidade de Processamento em Goiânia, preservando enzimas vivas, vitaminas e aroma inconfundível.",
    category: "potes",
    badge: "Mais Vendido",
    rating: 5.0,
    reviewsCount: 164,
    images: {
      "1000g": "/products/mel1000g.png",
    },
    variants: [
      { weight: "1000g", label: "Pote 1kg", price: 64.90, oldPrice: 75.00, popular: true, desc: "Pote generoso de 1 kg para uso diário da família" }
    ],
    features: [
      "100% Puro da Flora do Cerrado",
      "Extração a frio sem aquecimento",
      "Rico em flavonoides e minerais",
      "Origem garantida: Goiânia / GO"
    ]
  },
  {
    id: "mel-frasco-500g",
    name: "Mel Silvestre Puro Frasco 500g",
    tagline: "A medida perfeita para a mesa do café da manhã",
    description: "Frasco dosador ergonômico com 500g do mais puro Mel Silvestre Néctar Goiano. Ideal para adoçar frutas, iogurtes, cafés e sucos naturais com praticidade e elegância.",
    category: "individuais",
    badge: "Destaque",
    rating: 4.9,
    reviewsCount: 118,
    images: {
      "500g": "/products/mel500g.png",
    },
    variants: [
      { weight: "500g", label: "Frasco 500g", price: 38.90, oldPrice: 44.00, popular: true, desc: "Frasco prático para servir na mesa sem sujeira" }
    ],
    features: [
      "Frasco fácil de servir",
      "Mel cru sem adição de glicose",
      "Doçura suave com notas florais",
      "Direto do produtor em Goiânia"
    ]
  },
  {
    id: "mel-bisnaga-280g",
    name: "Mel Silvestre Puro Bisnaga 280g",
    tagline: "Bico dosador anti-gotas ideal para a rotina diária",
    description: "Embalagem compacta e prática de 280g, perfeita para levar ao trabalho, viagens ou pré-treino. Bico dosador que facilita o uso em frutas e receitas rápidas sem deixar mel escorrer.",
    category: "individuais",
    badge: "Super Prático",
    rating: 4.8,
    reviewsCount: 92,
    images: {
      "280g": "/products/mel280g.png",
    },
    variants: [
      { weight: "280g", label: "Bisnaga 280g", price: 24.90, oldPrice: 28.00, popular: true, desc: "Bico corta-gotas que não suja a embalagem" }
    ],
    features: [
      "Excelente para pré-treino e energia rápida",
      "Bico dosador econômico",
      "Cabe na bolsa ou mochila",
      "Mel 100% natural do Cerrado"
    ]
  },
  {
    id: "mel-pote-700g",
    name: "Mel Silvestre Puro Pote 700g",
    tagline: "A clássica embalagem tradicional de vidro",
    description: "Pote de vidro tradicional com 700g de Mel Silvestre Néctar Goiano. Excelente conservação natural das propriedades nutricionais e aroma denso com notas florais exclusivas de Goiás.",
    category: "potes",
    badge: "Tradicional",
    rating: 4.9,
    reviewsCount: 76,
    images: {
      "700g": "/products/mel700g.png",
    },
    variants: [
      { weight: "700g", label: "Pote 700g", price: 49.90, oldPrice: 56.00, popular: true, desc: "Embalagem clássica com fechamento hermético" }
    ],
    features: [
      "Embalagem que preserva sabor e pureza",
      "Mel de colheita recente e fresca",
      "Zero conservantes ou aditivos",
      "Envasado com rigor sanitário em Goiânia"
    ]
  },
  {
    id: "mel-balde-1440g",
    name: "Mel Silvestre Puro Balde 1.440g (1,44 kg)",
    tagline: "O tamanho econômico para quem ama e consome mel de verdade",
    description: "Balde especial com 1,44 kg de puro Mel Néctar Goiano. A escolha mais vantajosa para culinária saudável, preparo de pães, granolas, chás, e famílias que substituíram 100% do açúcar refinado.",
    category: "economicos",
    badge: "Super Econômico",
    rating: 5.0,
    reviewsCount: 88,
    images: {
      "1440g": "/products/mel1440g.png",
    },
    variants: [
      { weight: "1440g", label: "Balde 1.44kg", price: 86.90, oldPrice: 99.00, popular: true, desc: "Menor valor por quilo de mel puro" }
    ],
    features: [
      "Máxima economia por kg",
      "Ideal para receitas e culinária fit",
      "Alça reforçada para fácil manuseio",
      "Validade de 2 anos"
    ]
  },
  {
    id: "combo-familia-3x1kg",
    name: "Trio Mel Silvestre Néctar Goiano 3x 1kg (Total 3kg)",
    tagline: "Estoque garantido na sua casa com FRETE GRÁTIS para todo o Brasil",
    description: "3 potes de 1.000g (1 kg cada) do nosso puro Mel Silvestre. O combo favorito dos clientes com entrega gratuita garantida e desconto progressivo imediato.",
    category: "economicos",
    badge: "Frete Grátis Brasil",
    rating: 5.0,
    reviewsCount: 135,
    images: {
      "3kg": "/products/mel1000g.png",
    },
    variants: [
      { weight: "3kg", label: "3 Potes de 1kg (Total 3kg)", price: 179.90, oldPrice: 205.00, popular: true, desc: "Equivale a apenas R$ 59,96 por kg (Super econômico)" }
    ],
    features: [
      "FRETE GRÁTIS elegível direto no checkout",
      "Economia imediata de mais de R$ 25,00",
      "Lote recém-envasado na sede em Goiânia",
      "Embalado com proteção anti-impacto reforçada"
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

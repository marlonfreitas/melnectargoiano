import React from 'react';
import { Star, CheckCircle, Quote } from 'lucide-react';

export default function ReviewsSection() {
  const reviews = [
    {
      name: "Mariana Alencar",
      city: "Goiânia - GO",
      rating: 5,
      date: "Há 4 dias",
      product: "Mel Silvestre Pote 1kg",
      text: "Simplesmente o melhor mel que já provei em Goiânia! Já comprei outros que pareciam açúcar derretido, mas o Néctar Goiano tem aquele aroma de florada nativa inconfundível. Dá para sentir a pureza na hora.",
      verified: true
    },
    {
      name: "Rodrigo Mendonça",
      city: "Brasília - DF",
      rating: 5,
      date: "Há 1 semana",
      product: "Trio Especial 3x 1kg",
      text: "Comprei o combo de 3 potes para mandar para Brasília. Chegou super rápido, muito bem embalado com plástico bolha e sem nenhum vazamento. Uso todo dia antes do treino de bike e no pré-treino.",
      verified: true
    },
    {
      name: "Dra. Cláudia Vasconcelos",
      city: "Anápolis - GO",
      rating: 5,
      date: "Há 2 semanas",
      product: "Extrato de Própolis Verde + Spray",
      text: "Como médica, sempre indico própolis verde de boa procedência. A concentração desse extrato é excelente, arde na medida certa mostrando a presença da Artepillina-C. O spray salvou minha garganta nos plantões.",
      verified: true
    },
    {
      name: "Eduardo Ribeiro",
      city: "São Paulo - SP",
      rating: 5,
      date: "Há 3 semanas",
      product: "Favo de Mel 350g em Caixa",
      text: "O favo é espetacular! Coloquei numa tábua de queijos brie e gorgonzola para os amigos e foi o comentário da noite. Cera macia, mel escorrendo perfeito. Virei cliente fiel da BR Apicultura.",
      verified: true
    }
  ];

  return (
    <section className="py-16 sm:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-2">
          <div className="flex items-center justify-center gap-1 text-amber-500 mb-2">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-5 h-5 fill-current" />
            ))}
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
            Quem Experimenta o Mel Goiano Não Troca
          </h2>
          <p className="text-stone-600 text-sm sm:text-base">
            Mais de 1.800 avaliações de clientes satisfeitos em Goiás e em todo o Brasil.
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {reviews.map((r, idx) => (
            <div
              key={idx}
              className="bg-stone-50 rounded-2xl p-6 border border-stone-200/80 shadow-xs flex flex-col justify-between hover:shadow-md transition"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex text-amber-400">
                    {[...Array(r.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <span className="text-[11px] text-stone-400">{r.date}</span>
                </div>

                <p className="text-xs sm:text-sm text-stone-700 leading-relaxed italic">
                  "{r.text}"
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-stone-200/60">
                <div className="flex items-center justify-between">
                  <div>
                    <h5 className="font-bold text-stone-900 text-sm flex items-center gap-1">
                      {r.name}
                      {r.verified && (
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-600" title="Compra Verificada" />
                      )}
                    </h5>
                    <span className="text-xs text-stone-500">{r.city}</span>
                  </div>
                </div>
                <div className="mt-2 text-[11px] text-amber-800 font-medium bg-amber-100/60 px-2 py-0.5 rounded-md inline-block">
                  Comprou: {r.product}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

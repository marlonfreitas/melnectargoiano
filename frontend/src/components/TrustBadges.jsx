import React from 'react';
import { ShieldCheck, Truck, Sparkles, HeartHandshake } from 'lucide-react';

export default function TrustBadges() {
  const badges = [
    {
      icon: ShieldCheck,
      title: "100% Puro & Laudo de Pureza",
      desc: "Sem glicose de milho, sem aditivos químicos ou aquecimento."
    },
    {
      icon: Truck,
      title: "Entrega Segura em Todo Brasil",
      desc: "Embalagens reforçadas anti-vazamento. Frete grátis acima de R$ 120."
    },
    {
      icon: Sparkles,
      title: "Direto da Origem em Goiânia",
      desc: "Unidade de Processamento das Abelhas com rigoroso padrão higiênico."
    },
    {
      icon: HeartHandshake,
      title: "Apicultura Sustentável",
      desc: "Preservação da flora do Cerrado e respeito ao ciclo das abelhas."
    }
  ];

  return (
    <section className="bg-amber-50/70 border-y border-amber-200/60 py-8 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {badges.map((b, idx) => {
          const Icon = b.icon;
          return (
            <div key={idx} className="flex items-start gap-4 p-4 rounded-xl bg-white/80 border border-amber-100 shadow-sm hover:shadow-md transition">
              <div className="p-3 bg-amber-500/15 text-amber-700 rounded-lg shrink-0">
                <Icon className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-semibold text-stone-900 text-sm mb-1">{b.title}</h4>
                <p className="text-xs text-stone-600 leading-relaxed">{b.desc}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}


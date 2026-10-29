import React, { useState } from 'react';
import { CheckCircle2, XCircle, Droplets, Flame, Sparkles, Snowflake } from 'lucide-react';

export default function PureHoneyGuide() {
  const [activeTest, setActiveTest] = useState(0);

  const tests = [
    {
      title: "O Teste da Água",
      icon: Droplets,
      desc: "Coloque uma colher de mel em um copo com água em temperatura ambiente.",
      pureResult: "O Mel Puro Néctar Goiano desce em fio e fica concentrado no fundo sem se dissolver de imediato.",
      fakeResult: "O mel adulterado com xarope ou água se dissolve rapidamente e turva o copo."
    },
    {
      title: "Cristalização Natural",
      icon: Snowflake,
      desc: "Todo mel 100% puro e cru tende a cristalizar em temperaturas mais amenas.",
      pureResult: "Cristaliza de forma uniforme e aveludada. É o maior atestado biológico de pureza e ausência de fervura!",
      fakeResult: "Xaropes artificiais de glicose ou méis superaquecidos nunca cristalizam porque estão mortos."
    },
    {
      title: "O Teste do Papel Toalha",
      icon: Flame,
      desc: "Pingue uma gota de mel sobre uma folha de papel toalha ou guardanapo.",
      pureResult: "A gota permanece intacta como uma pérola por minutos, sem ser absorvida ou manchar o outro lado.",
      fakeResult: "O mel batizado com água/açúcar é absorvido rapidamente molhando o papel."
    }
  ];

  return (
    <section id="teste-pureza" className="py-16 sm:py-24 bg-white border-y border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Educação & Transparência</span>
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
            Como Saber se o Mel é 100% Puro?
          </h2>
          <p className="text-stone-600 text-base leading-relaxed">
            Mais de 60% dos méis comercializados em prateleiras comuns contêm xarope de milho ou foram superaquecidos, perdendo todas as enzimas benéficas. Veja a diferença com o nosso <strong>Mel Néctar Goiano</strong>:
          </p>
        </div>

        {/* Interactive Comparison Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
          
          {/* Comparison Table */}
          <div className="lg:col-span-7 bg-stone-50 rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-sm space-y-6">
            <h3 className="text-xl font-bold text-stone-900 border-b border-stone-200 pb-3 flex items-center justify-between">
              <span>Comparativo de Qualidade</span>
              <span className="text-xs font-normal text-stone-500">Direto de Goiás</span>
            </h3>

            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-white border border-amber-200 shadow-xs">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-bold text-amber-900 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    Mel Néctar Goiano (BR Apicultura)
                  </span>
                  <span className="text-[11px] font-bold bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full">
                    Garantido
                  </span>
                </div>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Centrifugado e filtrado a frio. Rico em enzimas vivas (diastase, invertase), flavonoides da flora do Cerrado, minerais e aroma floral inconfundível. 0% adição de açúcar.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-rose-100 shadow-xs opacity-85">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-bold text-rose-950 flex items-center gap-2">
                    <XCircle className="w-4 h-4 text-rose-500" />
                    Méis Comuns de Mercado / Xaropes
                  </span>
                  <span className="text-[11px] font-bold bg-rose-100 text-rose-800 px-2 py-0.5 rounded-full">
                    Cuidado
                  </span>
                </div>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Frequentemente pasteurizados a altas temperaturas (destruindo enzimas) ou misturados com xarope de glicose para render mais. Sabor plano de caramelo artificial.
                </p>
              </div>
            </div>

            <div className="pt-2 text-xs text-stone-500 flex items-center gap-2">
              <span>📍 Unidade de Processamento: Rua C, 287 - Goiânia/GO</span>
            </div>
          </div>

          {/* Interactive Test Accordion / Tabs */}
          <div className="lg:col-span-5 bg-gradient-to-b from-amber-500/10 to-transparent rounded-3xl p-6 sm:p-8 border border-amber-300/80 shadow-sm space-y-4">
            <h4 className="text-base font-bold text-stone-900 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-600" />
              <span>Faça o Teste na Sua Casa:</span>
            </h4>

            <div className="space-y-2">
              {tests.map((t, idx) => {
                const Icon = t.icon;
                const isOpen = activeTest === idx;
                return (
                  <div
                    key={idx}
                    className={`rounded-xl border transition ${
                      isOpen
                        ? 'bg-white border-amber-400 shadow-sm'
                        : 'bg-white/60 border-stone-200 hover:bg-white cursor-pointer'
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => setActiveTest(idx)}
                      className="w-full text-left p-3.5 flex items-center justify-between gap-3 font-semibold text-sm text-stone-800 cursor-pointer"
                    >
                      <span className="flex items-center gap-2">
                        <Icon className="w-4 h-4 text-amber-600" />
                        {t.title}
                      </span>
                      <span className="text-xs text-amber-700 font-bold">
                        {isOpen ? '▲' : '▼'}
                      </span>
                    </button>

                    {isOpen && (
                      <div className="px-3.5 pb-4 pt-1 space-y-3 text-xs border-t border-amber-100">
                        <p className="text-stone-600 italic">{t.desc}</p>
                        <div className="p-2.5 rounded-lg bg-emerald-50 text-emerald-900 border border-emerald-200">
                          <strong>No Mel Puro:</strong> {t.pureResult}
                        </div>
                        <div className="p-2.5 rounded-lg bg-rose-50 text-rose-900 border border-rose-200">
                          <strong>No Mel Falso:</strong> {t.fakeResult}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="pt-3 text-center">
              <a
                href="#produtos"
                className="inline-flex items-center gap-2 text-xs font-bold text-amber-800 hover:text-amber-950 underline"
              >
                Garantir meu mel 100% puro agora →
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}


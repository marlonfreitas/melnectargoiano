import React, { useState } from 'react';
import { Sparkles, Shield, Zap, Smile, Heart, Check, ShoppingBag } from 'lucide-react';
import { PRODUCTS } from '../data/products';

export default function HealthQuiz({ onAddToCart }) {
  const [goal, setGoal] = useState('imunidade');

  const goals = [
    {
      id: 'imunidade',
      icon: Shield,
      title: 'Aumentar Imunidade & Defesa',
      subtitle: 'Enzimas ativas e flavonoides do Cerrado Goiano.',
      recommendedProductId: 'mel-pote-1000g',
      reason: 'O mel silvestre cru de 1kg mantém todas as enzimas vivas e nutrientes que auxiliam na defesa biológica natural do organismo.'
    },
    {
      id: 'energia',
      icon: Zap,
      title: 'Energia Pré-Treino & Esporte',
      subtitle: 'Carboidrato natural de rápida absorção muscular.',
      recommendedProductId: 'mel-bisnaga-280g',
      reason: 'A bisnaga dosadora de 280g é prática para carregar na mochila, cicloturismo ou academia, fornecendo energia limpa imediata.'
    },
    {
      id: 'mesa',
      icon: Smile,
      title: 'Mesa de Café & Frutas',
      subtitle: 'Praticidade diária para toda a família.',
      recommendedProductId: 'mel-frasco-500g',
      reason: 'O frasco dosador de 500g tem formato ergonômico perfeito para a mesa, adoçando frutas, panquecas e queijos sem sujar a mesa.'
    },
    {
      id: 'familia',
      icon: Heart,
      title: 'Substituir Açúcar com Economia',
      subtitle: 'Estoque para a casa com Frete Grátis Brasil.',
      recommendedProductId: 'combo-familia-3x1kg',
      reason: 'Combo mais econômico da loja com 3kg de mel puro e Frete Grátis para adoçar sucos, bolos e receitas saudáveis.'
    }
  ];

  const currentGoal = goals.find((g) => g.id === goal);
  const recommendedProduct = PRODUCTS.find((p) => p.id === currentGoal.recommendedProductId);

  const handleAddRecommended = () => {
    if (!recommendedProduct) return;
    const v = recommendedProduct.variants[0];
    onAddToCart({
      id: `${recommendedProduct.id}-${v.weight}`,
      productId: recommendedProduct.id,
      name: recommendedProduct.name,
      variant: v,
      image: recommendedProduct.images[v.weight] || Object.values(recommendedProduct.images)[0],
      price: v.price
    });
  };

  return (
    <section id="quiz-saude" className="py-16 sm:py-20 bg-stone-900 text-white relative overflow-hidden">
      {/* Decorative background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold uppercase tracking-wider border border-amber-500/30">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Consultor Apícola Interativo</span>
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Descubra o Produto Ideal Para a Sua Saúde
          </h2>
          <p className="text-stone-300 text-sm sm:text-base">
            Selecione qual é o seu principal objetivo hoje para ver a indicação dos nossos especialistas da BR Apicultura.
          </p>
        </div>

        {/* Goal Selector Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {goals.map((item) => {
            const Icon = item.icon;
            const isSelected = item.id === goal;
            return (
              <button
                key={item.id}
                onClick={() => setGoal(item.id)}
                type="button"
                className={`p-5 rounded-2xl text-left transition duration-200 border cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'bg-amber-500/20 border-amber-400 text-amber-200 shadow-lg shadow-amber-500/10 ring-1 ring-amber-400'
                    : 'bg-stone-800/80 border-stone-700 hover:border-stone-600 text-stone-300'
                }`}
              >
                <div>
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${
                    isSelected ? 'bg-amber-500 text-stone-950' : 'bg-stone-700 text-stone-300'
                  }`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <h4 className="font-bold text-white text-base leading-tight mb-1">{item.title}</h4>
                  <p className="text-xs text-stone-400 leading-relaxed">{item.subtitle}</p>
                </div>

                <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs">
                  <span className={isSelected ? 'text-amber-400 font-bold' : 'text-stone-500'}>
                    {isSelected ? '✓ Selecionado' : 'Clique para ver'}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Recommendation Showcase Card */}
        {recommendedProduct && (
          <div className="bg-gradient-to-br from-stone-800 to-stone-850 border border-amber-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              <div className="lg:col-span-4">
                <div className="relative aspect-square rounded-2xl overflow-hidden border-2 border-amber-400/30 bg-stone-900/60 flex items-center justify-center p-4">
                  <img
                    src={recommendedProduct.images[recommendedProduct.variants[0].weight] || Object.values(recommendedProduct.images)[0]}
                    alt={recommendedProduct.name}
                    className="w-full h-full object-contain drop-shadow-xl"
                  />
                  <div className="absolute top-3 left-3 bg-amber-500 text-stone-950 text-xs font-bold px-2.5 py-1 rounded-md">
                    Indicação Especial
                  </div>
                </div>
              </div>

              <div className="lg:col-span-8 space-y-4">
                <div>
                  <span className="text-amber-400 text-xs font-bold tracking-wider uppercase">
                    Por que esta é a melhor escolha para seu objetivo:
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
                    {recommendedProduct.name}
                  </h3>
                  <p className="text-amber-200/90 text-sm font-medium mt-1">
                    "{currentGoal.reason}"
                  </p>
                </div>

                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-stone-300 pt-2">
                  {recommendedProduct.features.map((feat, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>

                <div className="pt-4 border-t border-stone-700 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div>
                    <span className="text-xs text-stone-400 block">Preço promocional</span>
                    <span className="text-2xl font-extrabold text-amber-400">
                      R$ {recommendedProduct.variants[0].price.toFixed(2).replace('.', ',')}
                    </span>
                    {recommendedProduct.variants[0].oldPrice && (
                      <span className="text-xs text-stone-400 line-through ml-2">
                        R$ {recommendedProduct.variants[0].oldPrice.toFixed(2).replace('.', ',')}
                      </span>
                    )}
                  </div>

                  <button
                    onClick={handleAddRecommended}
                    type="button"
                    className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-sm flex items-center justify-center gap-2 shadow-lg transition active:scale-95 cursor-pointer"
                  >
                    <ShoppingBag className="w-4 h-4 text-stone-900" />
                    <span>Adicionar Indicação ao Carrinho</span>
                  </button>
                </div>

              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
}


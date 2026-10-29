import React, { useState, useMemo } from 'react';
import ProductCard from './ProductCard';
import { PRODUCTS } from '../data/products';
import { Search, Sparkles, Filter } from 'lucide-react';

export default function ProductCatalog({ onAddToCart }) {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { id: 'all', label: 'Todos os Produtos' },
    { id: 'mel', label: '🍯 Mel Silvestre (5 Tamanhos)' },
    { id: 'favo', label: '🐝 Favos Puros' },
    { id: 'propolis', label: '🌿 Própolis & Imunidade' },
    { id: 'kits', label: '🎁 Kits com Desconto' },
  ];

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((p) => {
      const matchesCategory = activeCategory === 'all' || p.category === activeCategory;
      const matchesSearch =
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.tagline.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  return (
    <section id="produtos" className="py-16 sm:py-24 bg-stone-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Colheita Artesanal & Fresca</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
            Nossos Produtos das Abelhas do Cerrado
          </h2>
          <p className="text-base text-stone-600">
            Cada embalagem é envasada com carinho e inspeção em nossa Unidade de Processamento em Goiânia. Escolha a quantidade ideal para seu consumo ou presente.
          </p>
        </div>

        {/* Filter and Search Bar */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4 mb-10 pb-6 border-b border-stone-200">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 w-full lg:w-auto">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition cursor-pointer ${
                  activeCategory === cat.id
                    ? 'bg-amber-500 text-stone-950 shadow-sm'
                    : 'bg-white hover:bg-stone-100 text-stone-700 border border-stone-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Buscar mel, favo, própolis..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-stone-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 shadow-xs"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-stone-400 hover:text-stone-700"
              >
                Limpar
              </button>
            )}
          </div>
        </div>

        {/* Product Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-stone-300">
            <p className="text-stone-500 text-base">Nenhum produto encontrado para sua busca.</p>
            <button
              onClick={() => { setActiveCategory('all'); setSearchQuery(''); }}
              className="mt-3 px-4 py-2 text-xs font-bold text-amber-700 hover:underline"
            >
              Ver todos os produtos
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={onAddToCart}
              />
            ))}
          </div>
        )}

        {/* Bottom Banner inside Catalog: Packaging Breakdown */}
        <div id="tamanhos" className="mt-16 bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 rounded-3xl p-6 sm:p-10 text-stone-950 shadow-xl relative overflow-hidden">
          <div className="relative z-10 max-w-3xl">
            <span className="px-3 py-1 rounded-full bg-stone-900 text-amber-300 text-xs font-bold uppercase tracking-wide">
              Guia de Embalagens BR Apicultura
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-stone-950 mt-3 mb-2">
              Qual tamanho de mel escolher?
            </h3>
            <p className="text-sm sm:text-base text-stone-900 mb-6 leading-relaxed">
              Disponibilizamos 5 tamanhos pensados para cada perfil:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 text-xs">
              <div className="bg-white/95 p-3 rounded-2xl border border-amber-300 shadow-sm flex flex-col items-center text-center">
                <div className="h-24 w-full flex items-center justify-center mb-2">
                  <img src="/products/mel280g.png" alt="Bisnaga 280g" className="max-h-full object-contain drop-shadow" />
                </div>
                <span className="font-bold text-amber-900 block text-sm">280g (Bisnaga)</span>
                <p className="text-stone-700 mt-1">Prática para frutas, iogurtes e sem sujeira.</p>
              </div>

              <div className="bg-white/95 p-3 rounded-2xl border border-amber-300 shadow-sm flex flex-col items-center text-center">
                <div className="h-24 w-full flex items-center justify-center mb-2">
                  <img src="/products/mel500g.png" alt="Frasco 500g" className="max-h-full object-contain drop-shadow" />
                </div>
                <span className="font-bold text-amber-900 block text-sm">500g (Frasco)</span>
                <p className="text-stone-700 mt-1">O campeão do café da manhã em família.</p>
              </div>

              <div className="bg-white/95 p-3 rounded-2xl border border-amber-300 shadow-sm flex flex-col items-center text-center">
                <div className="h-24 w-full flex items-center justify-center mb-2">
                  <img src="/products/mel700g.png" alt="Pote 700g" className="max-h-full object-contain drop-shadow" />
                </div>
                <span className="font-bold text-amber-900 block text-sm">700g (Pote)</span>
                <p className="text-stone-700 mt-1">Pote clássico generoso para quem ama mel puro.</p>
              </div>

              <div className="bg-white/95 p-3 rounded-2xl border border-amber-300 shadow-sm flex flex-col items-center text-center">
                <div className="h-24 w-full flex items-center justify-center mb-2">
                  <img src="/products/mel1000g.png" alt="Pote 1kg" className="max-h-full object-contain drop-shadow" />
                </div>
                <span className="font-bold text-amber-900 block text-sm">1.000g (1 kg)</span>
                <p className="text-stone-700 mt-1">Excelente custo-benefício diário.</p>
              </div>

              <div className="bg-white/95 p-3 rounded-2xl border border-amber-300 shadow-sm flex flex-col items-center text-center">
                <div className="h-24 w-full flex items-center justify-center mb-2">
                  <img src="/products/mel1440g.png" alt="Balde 1.44kg" className="max-h-full object-contain drop-shadow" />
                </div>
                <span className="font-bold text-amber-900 block text-sm">1.440g (Balde)</span>
                <p className="text-stone-700 mt-1">Para culinária, chás e economia máxima.</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}


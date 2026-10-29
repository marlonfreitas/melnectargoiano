import React, { useState, useMemo } from 'react';
import ProductCard from './ProductCard';
import { PRODUCTS } from '../data/products';
import { Search, Sparkles, Filter, ShoppingBag } from 'lucide-react';

export default function ProductCatalog({ onAddToCart }) {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const handleQuickAdd = (productId) => {
    const prod = PRODUCTS.find((p) => p.id === productId);
    if (!prod) return;
    const v = prod.variants[0];
    onAddToCart({
      id: `${prod.id}-${v.weight}`,
      productId: prod.id,
      name: prod.name,
      variant: v,
      image: prod.images[v.weight] || Object.values(prod.images)[0],
      price: v.price
    });
  };

  const categories = [
    { id: 'all', label: 'Todas as Embalagens' },
    { id: 'individuais', label: '🍯 Bisnagas & Frascos (280g e 500g)' },
    { id: 'potes', label: '✨ Potes Clássicos (700g e 1 kg)' },
    { id: 'economicos', label: '📦 Balde & Combos (1.44kg e 3kg)' },
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
            Nossas Embalagens de Mel Silvestre Puro
          </h2>
          <p className="text-base text-stone-600">
            Cada frasco e pote é envasado a frio com inspeção e carinho em nossa Unidade de Processamento em Goiânia. Escolha a embalagem ideal para sua rotina.
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
              placeholder="Buscar tamanho (280g, 500g, 700g, 1kg...)"
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
          <div className="relative z-10 w-full">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
              <div>
                <span className="px-3.5 py-1 rounded-full bg-stone-950 text-amber-300 text-xs font-bold uppercase tracking-wider inline-block">
                  Guia de Embalagens BR Apicultura
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-stone-950 mt-3 mb-1">
                  Qual tamanho de mel escolher?
                </h3>
                <p className="text-sm sm:text-base text-stone-900 font-medium">
                  Disponibilizamos 5 embalagens oficiais envasadas a frio para atender a todas as rotinas:
                </p>
              </div>
              <div className="text-xs text-stone-900 bg-white/40 backdrop-blur-xs px-3.5 py-2 rounded-xl font-semibold shrink-0">
                🍯 100% Puro &bull; Extraído em Goiânia / GO
              </div>
            </div>

            {/* 5 Cards spanning full width */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 w-full">
              {/* 280g */}
              <div className="bg-white rounded-2xl p-4 border border-amber-300 shadow-md flex flex-col justify-between items-center text-center hover:-translate-y-1 transition duration-200">
                <div className="w-full">
                  <div className="h-28 w-full flex items-center justify-center mb-2">
                    <img src="/products/mel280g.png" alt="Mel 280 G" className="max-h-full object-contain drop-shadow" />
                  </div>
                  <h4 className="font-extrabold text-stone-900 text-sm">MEL 280 G</h4>
                  <div className="text-xl font-black text-rose-600 my-1">R$ 13,00</div>
                  <p className="text-xs text-stone-600 mt-1 leading-snug">Prática para frutas, iogurtes e sem sujeira.</p>
                </div>
                <button
                  type="button"
                  onClick={() => handleQuickAdd('mel-bisnaga-280g')}
                  className="mt-4 w-full py-2.5 px-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm transition active:scale-95 cursor-pointer"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>COMPRAR</span>
                </button>
              </div>

              {/* 500g */}
              <div className="bg-white rounded-2xl p-4 border border-amber-300 shadow-md flex flex-col justify-between items-center text-center hover:-translate-y-1 transition duration-200">
                <div className="w-full">
                  <div className="h-28 w-full flex items-center justify-center mb-2">
                    <img src="/products/mel500g.png" alt="Mel 500 G" className="max-h-full object-contain drop-shadow" />
                  </div>
                  <h4 className="font-extrabold text-stone-900 text-sm">MEL 500 G</h4>
                  <div className="text-xl font-black text-rose-600 my-1">R$ 23,00</div>
                  <p className="text-xs text-stone-600 mt-1 leading-snug">O campeão do café da manhã em família.</p>
                </div>
                <button
                  type="button"
                  onClick={() => handleQuickAdd('mel-frasco-500g')}
                  className="mt-4 w-full py-2.5 px-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm transition active:scale-95 cursor-pointer"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>COMPRAR</span>
                </button>
              </div>

              {/* 700g */}
              <div className="bg-white rounded-2xl p-4 border border-amber-300 shadow-md flex flex-col justify-between items-center text-center hover:-translate-y-1 transition duration-200">
                <div className="w-full">
                  <div className="h-28 w-full flex items-center justify-center mb-2">
                    <img src="/products/mel700g.png" alt="Mel 700 G" className="max-h-full object-contain drop-shadow" />
                  </div>
                  <h4 className="font-extrabold text-stone-900 text-sm">MEL 700 G</h4>
                  <div className="text-xl font-black text-rose-600 my-1">R$ 32,00</div>
                  <p className="text-xs text-stone-600 mt-1 leading-snug">Pote clássico generoso para quem ama mel puro.</p>
                </div>
                <button
                  type="button"
                  onClick={() => handleQuickAdd('mel-pote-700g')}
                  className="mt-4 w-full py-2.5 px-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm transition active:scale-95 cursor-pointer"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>COMPRAR</span>
                </button>
              </div>

              {/* 1000g */}
              <div className="bg-white rounded-2xl p-4 border-2 border-stone-900 shadow-lg flex flex-col justify-between items-center text-center relative hover:-translate-y-1 transition duration-200">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-stone-900 text-amber-300 text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full shadow-xs">
                  Mais Vendido
                </div>
                <div className="w-full pt-1">
                  <div className="h-28 w-full flex items-center justify-center mb-2">
                    <img src="/products/mel1000g.png" alt="Mel 1 KG" className="max-h-full object-contain drop-shadow" />
                  </div>
                  <h4 className="font-extrabold text-stone-900 text-sm">MEL 1 KG</h4>
                  <div className="text-xl font-black text-rose-600 my-1">R$ 45,00</div>
                  <p className="text-xs text-stone-600 mt-1 leading-snug">Excelente custo-benefício diário familiar.</p>
                </div>
                <button
                  type="button"
                  onClick={() => handleQuickAdd('mel-pote-1000g')}
                  className="mt-4 w-full py-2.5 px-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm transition active:scale-95 cursor-pointer"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>COMPRAR</span>
                </button>
              </div>

              {/* 1440g */}
              <div className="bg-white rounded-2xl p-4 border border-amber-300 shadow-md flex flex-col justify-between items-center text-center hover:-translate-y-1 transition duration-200">
                <div className="w-full">
                  <div className="h-28 w-full flex items-center justify-center mb-2">
                    <img src="/products/mel1440g.png" alt="Mel 1,44 KG" className="max-h-full object-contain drop-shadow" />
                  </div>
                  <h4 className="font-extrabold text-stone-900 text-sm">MEL 1,44 KG</h4>
                  <div className="text-xl font-black text-rose-600 my-1">R$ 60,00</div>
                  <p className="text-xs text-stone-600 mt-1 leading-snug">Para culinária, chás e economia máxima.</p>
                </div>
                <button
                  type="button"
                  onClick={() => handleQuickAdd('mel-balde-1440g')}
                  className="mt-4 w-full py-2.5 px-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm transition active:scale-95 cursor-pointer"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>COMPRAR</span>
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}


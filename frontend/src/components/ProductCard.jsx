import React, { useState } from 'react';
import { Star, ShoppingBag, Check, Sparkles, Info } from 'lucide-react';

export default function ProductCard({ product, onAddToCart, onBuyNow }) {
  const [selectedVariantIdx, setSelectedVariantIdx] = useState(0);
  const [addedAnimation, setAddedAnimation] = useState(false);

  const currentVariant = product.variants[selectedVariantIdx] || product.variants[0];
  const currentImage = product.images[currentVariant.weight] || Object.values(product.images)[0];

  const handleAdd = () => {
    onAddToCart({
      id: `${product.id}-${currentVariant.weight}`,
      productId: product.id,
      name: product.name,
      variant: currentVariant,
      image: currentImage,
      price: currentVariant.price
    });

    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 1500);
  };

  return (
    <div className="group bg-white rounded-2xl border border-stone-200/90 hover:border-amber-400 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
      {/* Product Image & Badges */}
      <div className="relative aspect-square w-full overflow-hidden bg-gradient-to-b from-stone-50 via-amber-50/40 to-amber-100/25 flex items-center justify-center p-3 sm:p-4">
        <img
          src={currentImage}
          alt={`${product.name} - ${currentVariant.label}`}
          className="w-full h-full object-contain drop-shadow-md group-hover:scale-108 transition-transform duration-500"
          loading="lazy"
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {product.badge && (
            <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-500 text-stone-950 shadow-xs">
              {product.badge}
            </span>
          )}
          {currentVariant.oldPrice && (
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-600 text-white shadow-xs">
              {Math.round(((currentVariant.oldPrice - currentVariant.price) / currentVariant.oldPrice) * 100)}% OFF
            </span>
          )}
        </div>

        {/* Star Rating Badge */}
        <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-md px-2 py-1 rounded-lg text-xs font-semibold text-stone-800 flex items-center gap-1 shadow-xs">
          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
          <span>{product.rating}</span>
          <span className="text-stone-400 text-[10px]">({product.reviewsCount})</span>
        </div>
      </div>

      {/* Content Area */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-amber-700">
            BR Apicultura • 100% Puro
          </span>
          <h3 className="text-base sm:text-lg font-bold text-stone-900 group-hover:text-amber-700 transition leading-snug mt-1">
            {product.name}
          </h3>
          <p className="text-xs text-stone-600 line-clamp-2 mt-1 leading-relaxed">
            {product.description}
          </p>
        </div>

        {/* Interactive Variant/Weight Selector */}
        {product.variants.length > 1 && (
          <div className="space-y-1.5 pt-1">
            <div className="flex items-center justify-between text-xs text-stone-500">
              <span className="font-semibold text-stone-700">Escolha a embalagem:</span>
              <span className="text-amber-700 font-medium">{currentVariant.weight}</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {product.variants.map((v, idx) => {
                const isSelected = selectedVariantIdx === idx;
                return (
                  <button
                    key={v.weight}
                    onClick={() => setSelectedVariantIdx(idx)}
                    type="button"
                    className={`px-2.5 py-1 text-xs rounded-lg font-medium transition cursor-pointer ${
                      isSelected
                        ? 'bg-stone-900 text-amber-300 ring-2 ring-amber-400 shadow-xs'
                        : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
                    }`}
                  >
                    {v.weight}
                  </button>
                );
              })}
            </div>
            {currentVariant.desc && (
              <p className="text-[11px] text-stone-500 italic mt-1">
                💡 {currentVariant.desc}
              </p>
            )}
          </div>
        )}

        {/* Pricing Block */}
        <div className="pt-2 border-t border-stone-100 flex items-baseline justify-between">
          <div>
            {currentVariant.oldPrice && (
              <span className="text-xs text-stone-400 line-through block">
                R$ {currentVariant.oldPrice.toFixed(2).replace('.', ',')}
              </span>
            )}
            <div className="text-2xl font-extrabold text-stone-900">
              <span className="text-sm font-semibold text-stone-500 mr-0.5">R$</span>
              {currentVariant.price.toFixed(2).replace('.', ',')}
            </div>
          </div>
          <span className="text-[11px] font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
            Em até 3x s/ juros
          </span>
        </div>

        {/* Action Button */}
        <button
          onClick={handleAdd}
          type="button"
          className={`w-full py-3 px-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition duration-200 cursor-pointer shadow-xs active:scale-98 ${
            addedAnimation
              ? 'bg-emerald-600 text-white'
              : 'bg-amber-500 hover:bg-amber-600 text-stone-950 hover:shadow-md'
          }`}
        >
          {addedAnimation ? (
            <>
              <Check className="w-4 h-4 text-white" />
              <span>Adicionado ao Carrinho!</span>
            </>
          ) : (
            <>
              <ShoppingBag className="w-4 h-4 text-stone-900" />
              <span>Adicionar ao Carrinho</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}


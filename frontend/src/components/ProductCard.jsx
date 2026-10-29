import React, { useState } from 'react';
import { ShieldCheck, ShoppingBag, Check, Truck, ChevronDown, ChevronUp, MapPin } from 'lucide-react';
import { formatCEP } from '../data/shippingService';

export default function ProductCard({ 
  product, 
  onAddToCart, 
  userCep = '', 
  onCalculateShipping, 
  shippingAddress, 
  shippingOptions = [],
  onOpenCart 
}) {
  const [selectedVariantIdx, setSelectedVariantIdx] = useState(0);
  const [addedAnimation, setAddedAnimation] = useState(false);
  const [showShippingCalc, setShowShippingCalc] = useState(false);
  const [cepInput, setCepInput] = useState(userCep);
  const [calcLoading, setCalcLoading] = useState(false);
  const [calcError, setCalcError] = useState('');

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

  const handleCalculate = async (e) => {
    if (e) e.preventDefault();
    if (!onCalculateShipping) return;
    setCalcError('');
    setCalcLoading(true);
    const res = await onCalculateShipping(cepInput);
    setCalcLoading(false);
    if (!res.success) {
      setCalcError(res.error || 'CEP não encontrado');
    }
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

        {/* Certified Badge */}
        <div className="absolute bottom-3 right-3 bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-lg text-[11px] font-bold text-stone-800 flex items-center gap-1.5 shadow-xs border border-stone-200">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span>SIE 1718/26</span>
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

        {/* Interactive Variant/Weight Selector or Single Weight Display */}
        {product.variants.length > 1 ? (
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
        ) : (
          <div className="pt-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-amber-50 text-amber-900 border border-amber-200 text-xs font-semibold">
              <span>⚖️ Peso Líquido: <strong>{currentVariant.weight}</strong></span>
            </div>
            {currentVariant.desc && (
              <p className="text-[11px] text-stone-500 italic mt-1.5">
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

        {/* Shipping Simulator Inline */}
        <div className="border-t border-stone-100 pt-2.5">
          <button
            type="button"
            onClick={() => setShowShippingCalc(!showShippingCalc)}
            className="w-full flex items-center justify-between text-xs text-stone-600 hover:text-amber-800 transition py-1"
          >
            <span className="flex items-center gap-1.5 font-medium">
              <Truck className="w-3.5 h-3.5 text-amber-600" />
              <span>Simular frete e prazo para este produto</span>
            </span>
            {showShippingCalc ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>

          {showShippingCalc && (
            <div className="mt-2 p-3 bg-stone-50 rounded-xl border border-stone-200 space-y-2 text-xs">
              <form onSubmit={handleCalculate} className="flex gap-2">
                <input
                  type="text"
                  placeholder="00000-000"
                  maxLength={9}
                  value={cepInput}
                  onChange={(e) => setCepInput(formatCEP(e.target.value))}
                  className="w-full px-3 py-1.5 bg-white border border-stone-300 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-amber-500 font-mono"
                />
                <button
                  type="submit"
                  disabled={calcLoading}
                  className="px-3 py-1.5 bg-stone-900 text-white rounded-lg font-bold hover:bg-stone-800 transition shrink-0 cursor-pointer text-xs"
                >
                  {calcLoading ? '...' : 'Calcular'}
                </button>
              </form>

              {calcError && <p className="text-[11px] text-rose-600">{calcError}</p>}

              {shippingAddress && shippingOptions.length > 0 && (
                <div className="space-y-1.5 pt-1 border-t border-stone-200">
                  <div className="flex items-center gap-1 text-[11px] font-bold text-stone-700">
                    <MapPin className="w-3 h-3 text-amber-600" />
                    <span>Envio para {shippingAddress.city}/{shippingAddress.state}:</span>
                  </div>
                  {shippingOptions.map((opt) => (
                    <div key={opt.id} className="flex items-center justify-between text-[11px] py-1 border-b border-stone-200/60 last:border-none">
                      <span className="text-stone-700">{opt.name}</span>
                      <div className="text-right">
                        <span className="font-bold text-stone-900">
                          {opt.price === 0 ? (
                            <strong className="text-emerald-700">GRÁTIS</strong>
                          ) : (
                            `R$ ${opt.price.toFixed(2).replace('.', ',')}`
                          )}
                        </span>
                        <span className="text-[10px] text-stone-500 block">{opt.estimate}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
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

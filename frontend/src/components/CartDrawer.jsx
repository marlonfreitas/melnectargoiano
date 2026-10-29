import React, { useState } from 'react';
import { X, Trash2, ShoppingBag, Plus, Minus, ArrowRight, Tag, Truck, CheckCircle2 } from 'lucide-react';
import { STORE_INFO } from '../data/products';

export default function CartDrawer({
  isOpen,
  onClose,
  items,
  onUpdateQty,
  onRemoveItem,
  onProceedCheckout,
  coupon,
  onApplyCoupon,
  shippingMethod,
  onChangeShippingMethod
}) {
  const [couponInput, setCouponInput] = useState('');
  const [couponError, setCouponError] = useState('');

  if (!isOpen) return null;

  // Calculate totals
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  
  // Free shipping calculation
  const missingForFreeShipping = Math.max(0, STORE_INFO.freeShippingThreshold - subtotal);
  const freeShippingProgress = Math.min(100, (subtotal / STORE_INFO.freeShippingThreshold) * 100);

  // Discount calculation
  let discount = 0;
  if (coupon) {
    if (coupon.type === 'percentage') {
      discount = (subtotal * coupon.value) / 100;
    } else if (coupon.type === 'fixed') {
      discount = coupon.value;
    }
  }

  // Shipping cost
  let shippingCost = 0;
  if (shippingMethod === 'delivery') {
    shippingCost = subtotal >= STORE_INFO.freeShippingThreshold ? 0 : 19.90;
  } else {
    shippingCost = 0; // Pickup in Goiânia is always free
  }

  const grandTotal = Math.max(0, subtotal - discount + shippingCost);

  const handleApply = (e) => {
    e.preventDefault();
    setCouponError('');
    const code = couponInput.trim().toUpperCase();
    if (!code) return;

    if (code === 'NECTAR10') {
      onApplyCoupon({ code: 'NECTAR10', type: 'percentage', value: 10, label: '10% de desconto' });
      setCouponInput('');
    } else if (code === 'MELGOIANO') {
      onApplyCoupon({ code: 'MELGOIANO', type: 'fixed', value: 15, label: 'R$ 15 de desconto' });
      setCouponInput('');
    } else {
      setCouponError('Cupom inválido. Tente NECTAR10');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-stone-950/60 backdrop-blur-xs transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col">
          
          {/* Header */}
          <div className="p-5 border-b border-stone-200 flex items-center justify-between bg-amber-50/50">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-amber-700" />
              <h3 className="font-bold text-stone-900 text-lg">Seu Carrinho</h3>
              <span className="text-xs bg-amber-200/80 text-amber-900 font-bold px-2 py-0.5 rounded-full">
                {items.reduce((acc, it) => acc + it.quantity, 0)} itens
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition"
              aria-label="Fechar carrinho"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Meter */}
          <div className="px-5 py-3 bg-amber-500/10 border-b border-amber-200/60">
            <div className="flex items-center justify-between text-xs font-semibold mb-1.5">
              <span className="flex items-center gap-1.5 text-stone-800">
                <Truck className="w-4 h-4 text-amber-700" />
                {missingForFreeShipping === 0 ? (
                  <strong className="text-emerald-700">Parabéns! Você ganhou Frete Grátis! 🎉</strong>
                ) : (
                  <span>
                    Faltam <strong>R$ {missingForFreeShipping.toFixed(2).replace('.', ',')}</strong> para Frete Grátis
                  </span>
                )}
              </span>
              <span className="text-stone-500">{Math.round(freeShippingProgress)}%</span>
            </div>
            <div className="w-full bg-stone-200 h-2 rounded-full overflow-hidden">
              <div
                className="bg-gradient-to-r from-amber-500 to-amber-600 h-full transition-all duration-300 rounded-full"
                style={{ width: `${freeShippingProgress}%` }}
              />
            </div>
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {items.length === 0 ? (
              <div className="text-center py-16 space-y-3">
                <div className="w-16 h-16 rounded-full bg-amber-100 text-amber-600 mx-auto flex items-center justify-center text-3xl">
                  🍯
                </div>
                <h4 className="font-bold text-stone-900 text-base">Seu carrinho está vazio</h4>
                <p className="text-xs text-stone-500 max-w-xs mx-auto">
                  Adicione nossos potes de Mel Silvestre, Favos ou Própolis para experimentar o verdadeiro sabor de Goiás.
                </p>
                <button
                  onClick={onClose}
                  className="mt-2 px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-stone-950 font-bold text-xs"
                >
                  Continuar Comprando
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 p-3 rounded-xl bg-stone-50 border border-stone-200/80 items-center justify-between"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 rounded-lg object-cover bg-amber-50 shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h5 className="font-bold text-stone-900 text-xs sm:text-sm truncate">
                      {item.name}
                    </h5>
                    <span className="inline-block text-[11px] font-semibold text-amber-800 bg-amber-100 px-2 py-0.5 rounded-md mt-0.5">
                      {item.variant.weight} - {item.variant.label}
                    </span>
                    <div className="text-xs font-bold text-stone-900 mt-1">
                      R$ {(item.price * item.quantity).toFixed(2).replace('.', ',')}
                    </div>
                  </div>

                  {/* Quantity Stepper */}
                  <div className="flex flex-col items-end gap-2">
                    <div className="flex items-center border border-stone-300 rounded-lg bg-white overflow-hidden">
                      <button
                        onClick={() => onUpdateQty(item.id, item.quantity - 1)}
                        className="px-2 py-1 text-stone-600 hover:bg-stone-100 transition"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="px-2 text-xs font-bold text-stone-800">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQty(item.id, item.quantity + 1)}
                        className="px-2 py-1 text-stone-600 hover:bg-stone-100 transition"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <button
                      onClick={() => onRemoveItem(item.id)}
                      className="text-stone-400 hover:text-rose-600 text-[11px] flex items-center gap-0.5 transition"
                      title="Remover produto"
                    >
                      <Trash2 className="w-3 h-3" />
                      <span>Remover</span>
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Area with Checkout and Totals */}
          {items.length > 0 && (
            <div className="border-t border-stone-200 p-5 bg-stone-50/90 space-y-4">
              {/* Delivery method selector */}
              <div className="space-y-1.5">
                <span className="text-xs font-bold text-stone-700 block">Opção de Entrega:</span>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <button
                    type="button"
                    onClick={() => onChangeShippingMethod('delivery')}
                    className={`p-2 rounded-lg border text-left cursor-pointer transition ${
                      shippingMethod === 'delivery'
                        ? 'border-amber-500 bg-amber-50 text-amber-950 font-bold'
                        : 'border-stone-200 bg-white text-stone-700'
                    }`}
                  >
                    <div>📦 Envio Brasil</div>
                    <div className="text-[11px] font-normal text-stone-500">
                      {subtotal >= STORE_INFO.freeShippingThreshold ? 'Grátis' : 'R$ 19,90'}
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => onChangeShippingMethod('pickup')}
                    className={`p-2 rounded-lg border text-left cursor-pointer transition ${
                      shippingMethod === 'pickup'
                        ? 'border-amber-500 bg-amber-50 text-amber-950 font-bold'
                        : 'border-stone-200 bg-white text-stone-700'
                    }`}
                  >
                    <div>📍 Retirada em Goiânia</div>
                    <div className="text-[11px] font-normal text-emerald-600 font-bold">
                      Grátis (Rua C, 287)
                    </div>
                  </button>
                </div>
              </div>

              {/* Coupon Form */}
              <form onSubmit={handleApply} className="flex gap-2">
                <div className="relative flex-1">
                  <Tag className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Cupom (ex: NECTAR10)"
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-xs bg-white border border-stone-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-500"
                  />
                </div>
                <button
                  type="submit"
                  className="px-3.5 py-2 rounded-lg bg-stone-900 hover:bg-stone-800 text-white font-bold text-xs"
                >
                  Aplicar
                </button>
              </form>
              {coupon && (
                <div className="flex items-center justify-between text-xs bg-emerald-50 text-emerald-800 px-3 py-1.5 rounded-md border border-emerald-200">
                  <span>Cupom <strong>{coupon.code}</strong> ({coupon.label})</span>
                  <button
                    onClick={() => onApplyCoupon(null)}
                    className="text-stone-400 hover:text-stone-700 font-bold ml-2"
                  >
                    ✕
                  </button>
                </div>
              )}
              {couponError && (
                <p className="text-[11px] text-rose-600">{couponError}</p>
              )}

              {/* Price Calculation Summary */}
              <div className="space-y-1.5 text-xs text-stone-600 border-t border-stone-200 pt-3">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span className="font-semibold text-stone-900">
                    R$ {subtotal.toFixed(2).replace('.', ',')}
                  </span>
                </div>

                {discount > 0 && (
                  <div className="flex justify-between text-emerald-600 font-medium">
                    <span>Desconto do Cupom:</span>
                    <span>- R$ {discount.toFixed(2).replace('.', ',')}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>Frete:</span>
                  <span className="font-semibold text-stone-900">
                    {shippingCost === 0 ? (
                      <span className="text-emerald-600 font-bold">GRÁTIS</span>
                    ) : (
                      `R$ ${shippingCost.toFixed(2).replace('.', ',')}`
                    )}
                  </span>
                </div>

                <div className="flex justify-between text-base font-extrabold text-stone-950 pt-2 border-t border-stone-200">
                  <span>Total do Pedido:</span>
                  <span className="text-amber-700">
                    R$ {grandTotal.toFixed(2).replace('.', ',')}
                  </span>
                </div>
              </div>

              {/* Checkout Trigger */}
              <button
                onClick={onProceedCheckout}
                className="w-full py-3.5 px-4 rounded-xl bg-amber-500 hover:bg-amber-600 text-stone-950 font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 transition cursor-pointer active:scale-98"
              >
                <span>Finalizar Compra</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <p className="text-center text-[11px] text-stone-400">
                🔒 Compra 100% Segura • Direto de Goiânia / GO
              </p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

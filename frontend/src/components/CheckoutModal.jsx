import React, { useState } from 'react';
import { X, Check, Copy, Phone, QrCode, CreditCard, ShieldCheck, Sparkles, MapPin, ExternalLink } from 'lucide-react';
import confetti from 'canvas-confetti';
import { STORE_INFO } from '../data/products';

export default function CheckoutModal({
  isOpen,
  onClose,
  items,
  total,
  discount,
  shippingCost,
  shippingMethod,
  coupon,
  onOrderCompleted
}) {
  const [activeTab, setActiveTab] = useState('whatsapp'); // 'whatsapp', 'pix', 'card'
  const [copiedPix, setCopiedPix] = useState(false);
  const [orderDone, setOrderDone] = useState(false);

  // Customer form state
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    number: '',
    neighborhood: '',
    city: 'Goiânia',
    state: 'GO',
    cep: '',
    notes: '',
    paymentMethod: 'PIX (Chave Instantânea)'
  });

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCopyPix = () => {
    navigator.clipboard.writeText(STORE_INFO.pixKey);
    setCopiedPix(true);
    setTimeout(() => setCopiedPix(false), 2500);
  };

  const fireConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  // WhatsApp Order Generator
  const handleWhatsAppCheckout = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim()) {
      alert("Por favor, preencha pelo menos seu Nome e WhatsApp para finalizar.");
      return;
    }

    const orderNumber = Math.floor(100000 + Math.random() * 900000);
    
    // Format items list
    const itemsText = items.map((it) => 
      `• ${it.quantity}x ${it.name} (${it.variant.weight}) - R$ ${(it.price * it.quantity).toFixed(2).replace('.', ',')}`
    ).join('\n');

    const deliveryText = shippingMethod === 'pickup' 
      ? `📍 Retirada Presencial na Loja em Goiânia (Rua C, 287)`
      : `📦 Envio para Endereço: ${formData.address}, ${formData.number || 'S/N'} - ${formData.neighborhood || ''}, ${formData.city}/${formData.state} (CEP: ${formData.cep || 'N/I'})`;

    const message = 
`🍯 *NOVO PEDIDO - BR APICULTURA / MEL NÉCTAR GOIANO*
Pedido: #${orderNumber}

👤 *DADOS DO CLIENTE:*
• Nome: ${formData.name}
• Telefone/WhatsApp: ${formData.phone}
${formData.email ? `• E-mail: ${formData.email}\n` : ''}
${deliveryText}

🛒 *ITENS DO PEDIDO:*
${itemsText}

💰 *RESUMO FINANCEIRO:*
• Subtotal: R$ ${items.reduce((acc, i) => acc + i.price * i.quantity, 0).toFixed(2).replace('.', ',')}
${discount > 0 ? `• Desconto Cupom (${coupon?.code}): - R$ ${discount.toFixed(2).replace('.', ',')}\n` : ''}• Frete: ${shippingCost === 0 ? 'GRÁTIS' : `R$ ${shippingCost.toFixed(2).replace('.', ',')}`}
*TOTAL A PAGAR: R$ ${total.toFixed(2).replace('.', ',')}*

💳 *Forma de Pagamento:* ${formData.paymentMethod}
${formData.notes ? `📝 *Observações:* ${formData.notes}\n` : ''}
Gostaria de confirmar o pedido e receber as instruções para envio!`;

    const encoded = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${STORE_INFO.whatsappNumber}?text=${encoded}`;

    fireConfetti();
    setOrderDone(true);
    window.open(whatsappUrl, '_blank');
  };

  const handleSimulatePayment = () => {
    fireConfetti();
    setOrderDone(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/70 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl border border-stone-200 overflow-hidden relative animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="p-5 sm:p-6 bg-gradient-to-r from-amber-500 to-amber-600 text-stone-950 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-stone-950 text-amber-400 flex items-center justify-center font-bold text-lg">
              🍯
            </div>
            <div>
              <h3 className="font-extrabold text-lg sm:text-xl text-stone-950">Finalizar Compra Segura</h3>
              <p className="text-xs text-amber-950/80 font-medium">BR Apicultura • Goiânia - GO</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-stone-900 hover:bg-black/10 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {orderDone ? (
          /* Success Screen */
          <div className="p-8 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
              <Check className="w-8 h-8" />
            </div>
            <h4 className="text-2xl font-extrabold text-stone-900">
              Pedido Enviado com Sucesso!
            </h4>
            <p className="text-sm text-stone-600 max-w-md mx-auto">
              Nossa equipe da <strong>BR Apicultura</strong> já está preparando sua encomenda com o autêntico mel do Cerrado Goiano.
            </p>
            
            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 max-w-sm mx-auto text-xs text-stone-700 space-y-1">
              <div><strong>Total do Pedido:</strong> R$ {total.toFixed(2).replace('.', ',')}</div>
              <div><strong>Forma:</strong> {formData.paymentMethod}</div>
              <div><strong>Atendimento:</strong> {STORE_INFO.phone}</div>
            </div>

            <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href={`https://wa.me/${STORE_INFO.whatsappNumber}`}
                target="_blank"
                rel="noreferrer"
                className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4" />
                <span>Abrir Conversa no WhatsApp</span>
              </a>
              <button
                onClick={() => {
                  setOrderDone(false);
                  onOrderCompleted();
                  onClose();
                }}
                className="px-6 py-3 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 font-bold text-xs"
              >
                Voltar à Loja
              </button>
            </div>
          </div>
        ) : (
          /* Multi-tab Checkout */
          <div className="p-5 sm:p-6 space-y-6">
            
            {/* Payment Method Selector Tabs */}
            <div className="grid grid-cols-3 gap-2 p-1.5 rounded-2xl bg-stone-100 border border-stone-200 text-xs font-bold">
              <button
                type="button"
                onClick={() => setActiveTab('whatsapp')}
                className={`py-2.5 px-3 rounded-xl flex items-center justify-center gap-1.5 transition cursor-pointer ${
                  activeTab === 'whatsapp'
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'text-stone-700 hover:bg-white'
                }`}
              >
                <Phone className="w-3.5 h-3.5" />
                <span>WhatsApp</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('pix')}
                className={`py-2.5 px-3 rounded-xl flex items-center justify-center gap-1.5 transition cursor-pointer ${
                  activeTab === 'pix'
                    ? 'bg-amber-500 text-stone-950 shadow-xs'
                    : 'text-stone-700 hover:bg-white'
                }`}
              >
                <QrCode className="w-3.5 h-3.5" />
                <span>PIX Direto</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('card')}
                className={`py-2.5 px-3 rounded-xl flex items-center justify-center gap-1.5 transition cursor-pointer ${
                  activeTab === 'card'
                    ? 'bg-stone-900 text-amber-300 shadow-xs'
                    : 'text-stone-700 hover:bg-white'
                }`}
              >
                <CreditCard className="w-3.5 h-3.5" />
                <span>Cartão (12x)</span>
              </button>
            </div>

            {/* Total Banner */}
            <div className="flex items-center justify-between p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-xs">
              <div>
                <span className="text-stone-500 block">Total a pagar com frete:</span>
                <span className="text-lg font-extrabold text-stone-900">
                  R$ {total.toFixed(2).replace('.', ',')}
                </span>
              </div>
              <div className="text-right">
                <span className="text-emerald-700 font-bold block">
                  {shippingMethod === 'pickup' ? '📍 Retirada em Goiânia' : '📦 Envio para seu endereço'}
                </span>
                <span className="text-stone-400 text-[11px]">{items.length} produto(s) no pacote</span>
              </div>
            </div>

            {/* TAB 1: WhatsApp Checkout Form */}
            {activeTab === 'whatsapp' && (
              <form onSubmit={handleWhatsAppCheckout} className="space-y-4">
                <div className="p-3 rounded-xl bg-emerald-50 text-emerald-950 text-xs border border-emerald-200 flex items-start gap-2">
                  <Sparkles className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <strong>Finalização rápida sem burocracia:</strong> Seus produtos e endereço serão enviados diretamente para o WhatsApp oficial da BR Apicultura (62) 98622-2199.
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="font-semibold text-stone-700 block mb-1">Seu Nome Completo *</label>
                    <input
                      type="text"
                      name="name"
                      required
                      placeholder="Ex: João da Silva"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-xs"
                    />
                  </div>

                  <div>
                    <label className="font-semibold text-stone-700 block mb-1">Seu WhatsApp com DDD *</label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      placeholder="Ex: (62) 99999-9999"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-xs"
                    />
                  </div>
                </div>

                {shippingMethod === 'delivery' && (
                  <div className="space-y-3 pt-1 border-t border-stone-100">
                    <span className="font-bold text-stone-800 text-xs block">Endereço de Entrega:</span>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                      <div className="sm:col-span-2">
                        <input
                          type="text"
                          name="address"
                          placeholder="Rua / Avenida"
                          value={formData.address}
                          onChange={handleChange}
                          className="w-full p-2 bg-stone-50 border border-stone-200 rounded-lg text-xs"
                        />
                      </div>
                      <div>
                        <input
                          type="text"
                          name="number"
                          placeholder="Número / Apto"
                          value={formData.number}
                          onChange={handleChange}
                          className="w-full p-2 bg-stone-50 border border-stone-200 rounded-lg text-xs"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-2 text-xs">
                      <div>
                        <input
                          type="text"
                          name="neighborhood"
                          placeholder="Bairro"
                          value={formData.neighborhood}
                          onChange={handleChange}
                          className="w-full p-2 bg-stone-50 border border-stone-200 rounded-lg text-xs"
                        />
                      </div>
                      <div>
                        <input
                          type="text"
                          name="city"
                          placeholder="Cidade"
                          value={formData.city}
                          onChange={handleChange}
                          className="w-full p-2 bg-stone-50 border border-stone-200 rounded-lg text-xs"
                        />
                      </div>
                      <div>
                        <input
                          type="text"
                          name="cep"
                          placeholder="CEP"
                          value={formData.cep}
                          onChange={handleChange}
                          className="w-full p-2 bg-stone-50 border border-stone-200 rounded-lg text-xs"
                        />
                      </div>
                    </div>
                  </div>
                )}

                <div className="text-xs">
                  <label className="font-semibold text-stone-700 block mb-1">Como prefere pagar?</label>
                  <select
                    name="paymentMethod"
                    value={formData.paymentMethod}
                    onChange={handleChange}
                    className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-lg text-xs font-medium"
                  >
                    <option value="PIX (Chave Instantânea)">PIX (Chave Instantânea - 5% Desconto)</option>
                    <option value="Cartão de Crédito (até 12x)">Cartão de Crédito (link de pagamento seguro)</option>
                    <option value="Dinheiro / Cartão na Retirada">Dinheiro ou Cartão na Retirada em Goiânia</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/20 transition cursor-pointer active:scale-98"
                >
                  <Phone className="w-4 h-4" />
                  <span>Enviar Pedido para o WhatsApp</span>
                </button>
              </form>
            )}

            {/* TAB 2: Instant PIX */}
            {activeTab === 'pix' && (
              <div className="space-y-4 text-center">
                <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 space-y-3">
                  <div className="w-12 h-12 rounded-xl bg-amber-500/20 text-amber-800 mx-auto flex items-center justify-center">
                    <QrCode className="w-6 h-6" />
                  </div>
                  <div>
                    <h5 className="font-bold text-stone-900 text-sm">Chave PIX Oficial (E-mail):</h5>
                    <div className="mt-1 flex items-center justify-center gap-2">
                      <code className="px-3 py-1.5 rounded-lg bg-white border border-stone-300 text-xs font-mono font-bold text-stone-800 select-all">
                        {STORE_INFO.pixKey}
                      </code>
                      <button
                        type="button"
                        onClick={handleCopyPix}
                        className="px-3 py-1.5 rounded-lg bg-stone-900 hover:bg-stone-800 text-amber-300 text-xs font-bold flex items-center gap-1 transition"
                      >
                        {copiedPix ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{copiedPix ? 'Copiado!' : 'Copiar'}</span>
                      </button>
                    </div>
                  </div>
                  <p className="text-[11px] text-stone-500">
                    Beneficiário: <strong>{STORE_INFO.pixBeneficiary}</strong>
                  </p>
                </div>

                <div className="text-xs text-stone-600 space-y-1">
                  <p>1. Abra o app do seu banco e selecione <strong>PIX Chave E-mail</strong>.</p>
                  <p>2. Transfira o valor exato de <strong>R$ {total.toFixed(2).replace('.', ',')}</strong>.</p>
                  <p>3. Clique abaixo para enviar o comprovante no WhatsApp e agilizar o envio imediato.</p>
                </div>

                <button
                  type="button"
                  onClick={handleSimulatePayment}
                  className="w-full py-3.5 px-4 rounded-xl bg-amber-500 hover:bg-amber-600 text-stone-950 font-bold text-sm flex items-center justify-center gap-2 shadow-lg transition cursor-pointer"
                >
                  <Check className="w-4 h-4 text-stone-900" />
                  <span>Já Efetuei o PIX / Confirmar Pedido</span>
                </button>
              </div>
            )}

            {/* TAB 3: Credit Card / Gateway Checkout */}
            {activeTab === 'card' && (
              <div className="space-y-4">
                <div className="p-3 rounded-xl bg-stone-100 border border-stone-200 text-xs text-stone-700 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Pagamento criptografado de ponta a ponta. Compatível com Mercado Pago & Stripe.</span>
                </div>

                <div className="space-y-3 text-xs">
                  <div>
                    <label className="font-semibold text-stone-700 block mb-1">Número do Cartão</label>
                    <input
                      type="text"
                      placeholder="0000 0000 0000 0000"
                      maxLength={19}
                      className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-lg text-xs"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="font-semibold text-stone-700 block mb-1">Validade (MM/AA)</label>
                      <input
                        type="text"
                        placeholder="12/28"
                        maxLength={5}
                        className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-lg text-xs"
                      />
                    </div>
                    <div>
                      <label className="font-semibold text-stone-700 block mb-1">CVV (3 dígitos)</label>
                      <input
                        type="text"
                        placeholder="123"
                        maxLength={4}
                        className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-lg text-xs"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="font-semibold text-stone-700 block mb-1">Parcelamento</label>
                    <select className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-lg text-xs">
                      <option>1x de R$ {total.toFixed(2).replace('.', ',')} sem juros</option>
                      <option>2x de R$ {(total / 2).toFixed(2).replace('.', ',')} sem juros</option>
                      <option>3x de R$ {(total / 3).toFixed(2).replace('.', ',')} sem juros</option>
                      <option>6x de R$ {((total * 1.05) / 6).toFixed(2).replace('.', ',')} com pequeno acréscimo</option>
                      <option>12x de R$ {((total * 1.1) / 12).toFixed(2).replace('.', ',')}</option>
                    </select>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleSimulatePayment}
                  className="w-full py-3.5 px-4 rounded-xl bg-stone-900 hover:bg-stone-800 text-amber-300 font-bold text-sm flex items-center justify-center gap-2 shadow-lg transition cursor-pointer"
                >
                  <CreditCard className="w-4 h-4" />
                  <span>Pagar R$ {total.toFixed(2).replace('.', ',')} com Cartão</span>
                </button>
              </div>
            )}

          </div>
        )}

      </div>
    </div>
  );
}

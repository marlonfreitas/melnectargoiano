import React, { useState, useEffect } from 'react';
import { X, Check, Copy, Phone, QrCode, CreditCard, ShieldCheck, Sparkles, MapPin, Truck, ExternalLink, ArrowRight, ArrowLeft } from 'lucide-react';
import confetti from 'canvas-confetti';
import { STORE_INFO } from '../data/products';
import { formatCEP } from '../data/shippingService';

export default function CheckoutModal({
  isOpen,
  onClose,
  items,
  subtotal = 0,
  total = 0,
  discount = 0,
  shippingCost = 0,
  coupon,
  userCep = '',
  onCalculateShipping,
  shippingAddress,
  shippingOptions = [],
  selectedShipping,
  onSelectShipping,
  onOrderCompleted
}) {
  // Stepper: 'delivery' (Passo 2 Entrega) | 'payment' (Passo 3 Pagamento)
  const [step, setStep] = useState('delivery');
  
  // Payment tab inside payment step: 'whatsapp' | 'pix' | 'card'
  const [paymentTab, setPaymentTab] = useState('whatsapp');
  const [copiedPix, setCopiedPix] = useState(false);
  const [orderDone, setOrderDone] = useState(false);

  // Form State
  const [email, setEmail] = useState('');
  const [newsletter, setNewsletter] = useState(true);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [cep, setCep] = useState(userCep || '');
  const [number, setNumber] = useState('');
  const [complement, setComplement] = useState('');
  const [notes, setNotes] = useState('');
  
  const [cepLoading, setCepLoading] = useState(false);
  const [cepError, setCepError] = useState('');
  const [cepEditing, setCepEditing] = useState(!shippingAddress);

  useEffect(() => {
    if (userCep) setCep(userCep);
    if (shippingAddress) {
      setCepEditing(false);
    }
  }, [userCep, shippingAddress]);

  if (!isOpen) return null;

  const fireConfetti = () => {
    confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.6 }
    });
  };

  const handleCopyPix = () => {
    navigator.clipboard.writeText(STORE_INFO.pixKey);
    setCopiedPix(true);
    setTimeout(() => setCopiedPix(false), 2500);
  };

  const handleLookupCep = async (e) => {
    if (e) e.preventDefault();
    if (!onCalculateShipping) return;
    setCepError('');
    setCepLoading(true);
    const res = await onCalculateShipping(cep);
    setCepLoading(false);
    if (res.success) {
      setCepEditing(false);
    } else {
      setCepError(res.error || 'CEP não encontrado');
    }
  };

  const handleProceedToPayment = () => {
    if (!email.trim()) {
      alert('Por favor, informe seu e-mail para receber as atualizações do envio.');
      return;
    }
    if (!shippingAddress) {
      alert('Por favor, informe seu CEP para calcular a entrega.');
      return;
    }
    if (!number.trim() && selectedShipping?.id !== 'pickup_store') {
      alert('Por favor, preencha o número do endereço de entrega.');
      return;
    }
    setStep('payment');
  };

  // WhatsApp Checkout
  const handleFinalizeWhatsApp = (e) => {
    if (e) e.preventDefault();
    if (!name.trim() || !phone.trim()) {
      alert('Por favor, preencha seu Nome e Telefone/WhatsApp para o envio.');
      return;
    }

    const orderNumber = Math.floor(100000 + Math.random() * 900000);

    const itemsText = items.map((it) => 
      `• ${it.quantity}x ${it.name} (${it.variant.weight}) - R$ ${(it.price * it.quantity).toFixed(2).replace('.', ',')}`
    ).join('\n');

    const addressText = selectedShipping?.id === 'pickup_store'
      ? '📍 Retirada Presencial na Sede da BR Apicultura (Rua C, 287 - Goiânia)'
      : `📦 ${shippingAddress?.street}, nº ${number}${complement ? ` (${complement})` : ''} - ${shippingAddress?.neighborhood}, ${shippingAddress?.city}/${shippingAddress?.state} - CEP: ${shippingAddress?.cep}`;

    const message = 
`🍯 *NOVO PEDIDO - MEL NÉCTAR GOIANO (BR APICULTURA)*
Pedido: #${orderNumber}

👤 *DADOS DO CLIENTE:*
• Nome: ${name}
• WhatsApp: ${phone}
• E-mail: ${email}

🚚 *ENTREGA & FRETE:*
• Modalidade: ${selectedShipping?.name || 'Envio Padrão'}
• Previsão: ${selectedShipping?.estimate || 'A combinar'}
• Endereço: ${addressText}

🛒 *ITENS DO PEDIDO:*
${itemsText}

💰 *VALORES:*
• Subtotal: R$ ${subtotal.toFixed(2).replace('.', ',')}
${discount > 0 ? `• Desconto Cupom (${coupon?.code}): - R$ ${discount.toFixed(2).replace('.', ',')}\n` : ''}• Frete (${selectedShipping?.carrier || 'Correios'}): ${shippingCost === 0 ? 'GRÁTIS' : `R$ ${shippingCost.toFixed(2).replace('.', ',')}`}
*TOTAL FINAL: R$ ${total.toFixed(2).replace('.', ',')}*

💳 *Forma de Pagamento:* ${paymentTab === 'pix' ? 'PIX Instantâneo' : paymentTab === 'card' ? 'Cartão de Crédito' : 'WhatsApp'}
${notes ? `📝 *Observação:* ${notes}\n` : ''}
Gostaria de confirmar o pedido e prosseguir com o pagamento!`;

    const encoded = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${STORE_INFO.whatsappNumber}?text=${encoded}`;

    fireConfetti();
    setOrderDone(true);
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/70 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4">
      <div className="bg-white rounded-3xl max-w-4xl w-full shadow-2xl border border-stone-200 overflow-hidden relative my-6">
        
        {/* Top Header with Brand */}
        <div className="bg-stone-50 border-b border-stone-200 p-4 sm:px-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center border border-amber-300">
              <img src="/logo.webp" alt="BR Apicultura" className="w-7 h-7 object-contain" />
            </div>
            <div>
              <span className="font-extrabold text-stone-900 text-sm sm:text-base block">
                Mel Néctar Goiano
              </span>
              <span className="text-[10px] sm:text-xs text-amber-800 font-semibold uppercase">
                Checkout Seguro • BR Apicultura
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-stone-400 hover:text-stone-700 hover:bg-stone-200/60 transition cursor-pointer"
            aria-label="Fechar checkout"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Stepper Progress Bar (idêntico à imagem enviada: Carrinho -> Entrega -> Pagamento) */}
        <div className="bg-white px-4 sm:px-12 py-5 border-b border-stone-200">
          <div className="max-w-md mx-auto flex items-center justify-between relative">
            <div className="absolute left-8 right-8 top-3.5 h-0.5 bg-stone-200 -z-0"></div>
            <div 
              className="absolute left-8 top-3.5 h-0.5 bg-stone-900 transition-all duration-300 -z-0"
              style={{ width: step === 'delivery' ? '50%' : '100%' }}
            ></div>

            {/* Step 1: Carrinho */}
            <div className="flex flex-col items-center gap-1 relative z-10">
              <div className="w-7 h-7 rounded-full bg-stone-900 text-white flex items-center justify-center text-xs font-bold">
                ✓
              </div>
              <span className="text-xs font-medium text-stone-700">Carrinho</span>
            </div>

            {/* Step 2: Entrega */}
            <div className="flex flex-col items-center gap-1 relative z-10">
              <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition ${
                step === 'delivery' ? 'bg-stone-900 text-white ring-4 ring-stone-200' : 'bg-stone-900 text-white'
              }`}>
                <Truck className="w-3.5 h-3.5" />
              </div>
              <span className={`text-xs font-bold ${step === 'delivery' ? 'text-stone-900' : 'text-stone-700'}`}>
                Entrega
              </span>
            </div>

            {/* Step 3: Pagamento */}
            <div className="flex flex-col items-center gap-1 relative z-10">
              <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition ${
                step === 'payment' ? 'bg-stone-900 text-white ring-4 ring-stone-200' : 'bg-stone-100 text-stone-400 border border-stone-300'
              }`}>
                <CreditCard className="w-3.5 h-3.5" />
              </div>
              <span className={`text-xs font-medium ${step === 'payment' ? 'text-stone-900 font-bold' : 'text-stone-400'}`}>
                Pagamento
              </span>
            </div>
          </div>
        </div>

        {orderDone ? (
          /* Success Screen */
          <div className="p-8 sm:p-12 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
              <Check className="w-8 h-8" />
            </div>
            <h4 className="text-2xl font-extrabold text-stone-900">
              Pedido Iniciado com Sucesso!
            </h4>
            <p className="text-sm text-stone-600 max-w-md mx-auto">
              Sua encomenda de Mel Puro Silvestre da <strong>BR Apicultura</strong> foi gerada. Nossa equipe já recebeu todos os dados de entrega.
            </p>
            
            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 max-w-sm mx-auto text-xs text-stone-700 space-y-1 text-left">
              <div><strong>Cliente:</strong> {name}</div>
              <div><strong>Destino:</strong> {shippingAddress?.city} - {shippingAddress?.state}</div>
              <div><strong>Frete:</strong> {selectedShipping?.name} ({shippingCost === 0 ? 'GRÁTIS' : `R$ ${shippingCost.toFixed(2).replace('.', ',')}`})</div>
              <div><strong>Total a Pagar:</strong> R$ {total.toFixed(2).replace('.', ',')}</div>
            </div>

            <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={() => {
                  setOrderDone(false);
                  onOrderCompleted();
                  onClose();
                }}
                className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs cursor-pointer shadow-md"
              >
                Concluir & Voltar à Loja
              </button>
            </div>
          </div>
        ) : (
          /* Main 2-Column Content */
          <div className="grid grid-cols-1 lg:grid-cols-12">
            
            {/* Left Column: Form Steps */}
            <div className="lg:col-span-7 p-5 sm:p-8 space-y-6 border-b lg:border-b-0 lg:border-r border-stone-200">
              
              {/* STEP: ENTREGA (Passo das fotos enviadas pelo usuário) */}
              {step === 'delivery' && (
                <div className="space-y-6">
                  {/* Dados de Contato */}
                  <div className="space-y-3">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-stone-700">
                      DADOS DE CONTATO
                    </h4>

                    <div>
                      <input
                        type="email"
                        placeholder="E-mail"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-3 rounded-lg border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-stone-900 bg-white"
                        required
                      />
                    </div>

                    <label className="flex items-center gap-2 text-xs text-stone-600 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={newsletter}
                        onChange={(e) => setNewsletter(e.target.checked)}
                        className="rounded text-stone-900 focus:ring-stone-900"
                      />
                      <span>Receber ofertas e novidades por e-mail</span>
                    </label>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                      <input
                        type="text"
                        placeholder="Nome Completo *"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-lg border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-stone-900 bg-white"
                        required
                      />
                      <input
                        type="tel"
                        placeholder="Telefone / WhatsApp *"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-lg border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-stone-900 bg-white"
                        required
                      />
                    </div>
                  </div>

                  {/* Agilize sua compra banner (como na foto 2 do usuário) */}
                  <div className="p-3.5 bg-stone-50 border border-stone-200 rounded-xl flex items-center justify-between text-xs text-stone-700">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-amber-600 shrink-0" />
                      <div>
                        <strong>Envio Direto da Origem:</strong> Goiânia / GO
                      </div>
                    </div>
                    <span className="text-[11px] text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                      Agilidade Garantida
                    </span>
                  </div>

                  {/* Seção ENTREGA */}
                  <div className="space-y-4 pt-2">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-stone-700">
                        ENTREGA
                      </h4>
                      {shippingAddress && !cepEditing && (
                        <button
                          type="button"
                          onClick={() => setCepEditing(true)}
                          className="text-xs text-stone-600 hover:text-stone-900 underline font-medium cursor-pointer"
                        >
                          Alterar: {shippingAddress.cep}
                        </button>
                      )}
                    </div>

                    {/* CEP Input quando ainda não buscou ou está alterando */}
                    {cepEditing && (
                      <div className="space-y-2">
                        <div className="relative">
                          <input
                            type="text"
                            placeholder="CEP (ex: 77006-484)"
                            maxLength={9}
                            value={cep}
                            onChange={(e) => setCep(formatCEP(e.target.value))}
                            className="w-full px-4 py-3 rounded-lg border border-stone-300 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-stone-900 bg-white pr-36"
                          />
                          <a
                            href="https://buscacepinter.correios.com.br/app/endereco/index.php"
                            target="_blank"
                            rel="noreferrer"
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-stone-500 hover:text-stone-800"
                          >
                            Não sei meu CEP
                          </a>
                        </div>

                        {cepError && (
                          <p className="text-xs text-rose-600">{cepError}</p>
                        )}

                        <button
                          type="button"
                          onClick={handleLookupCep}
                          disabled={cepLoading}
                          className="w-full sm:w-auto px-6 py-2.5 rounded-lg bg-stone-800 hover:bg-stone-900 text-white font-bold text-xs transition cursor-pointer"
                        >
                          {cepLoading ? 'Calculando Frete...' : 'Calcular Opções de Frete'}
                        </button>
                      </div>
                    )}

                    {/* Quando o CEP está calculado: Mostra opções idênticas à Imagem 2 */}
                    {shippingAddress && !cepEditing && (
                      <div className="space-y-3">
                        {/* Endereço auto-preenchido */}
                        <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 text-xs text-stone-700 space-y-1">
                          <div className="flex items-center gap-1 font-semibold text-stone-900">
                            <MapPin className="w-3.5 h-3.5 text-amber-600" />
                            <span>{shippingAddress.street || 'Endereço'}, {shippingAddress.neighborhood}</span>
                          </div>
                          <div className="text-stone-500">
                            {shippingAddress.city} - {shippingAddress.state} • CEP {shippingAddress.cep}
                          </div>
                        </div>

                        {/* Campos de Número e Complemento */}
                        {selectedShipping?.id !== 'pickup_store' && (
                          <div className="grid grid-cols-2 gap-3">
                            <input
                              type="text"
                              placeholder="Número da Residência *"
                              value={number}
                              onChange={(e) => setNumber(e.target.value)}
                              className="w-full px-3 py-2 rounded-lg border border-stone-300 text-xs focus:outline-none focus:ring-2 focus:ring-stone-900 bg-white"
                              required
                            />
                            <input
                              type="text"
                              placeholder="Complemento / Apto (Opcional)"
                              value={complement}
                              onChange={(e) => setComplement(e.target.value)}
                              className="w-full px-3 py-2 rounded-lg border border-stone-300 text-xs focus:outline-none focus:ring-2 focus:ring-stone-900 bg-white"
                            />
                          </div>
                        )}

                        {/* Lista de Opções de Frete (Nuvem Envio Correios PAC / SEDEX) */}
                        <div className="space-y-2 pt-2">
                          <span className="text-xs font-semibold text-stone-600 block">
                            Envio em domicílio:
                          </span>

                          <div className="space-y-2">
                            {shippingOptions.map((opt) => {
                              const isSelected = selectedShipping?.id === opt.id;
                              return (
                                <label
                                  key={opt.id}
                                  onClick={() => onSelectShipping(opt)}
                                  className={`flex items-center justify-between p-3.5 rounded-xl border cursor-pointer transition ${
                                    isSelected
                                      ? 'border-stone-900 bg-stone-50/80 shadow-xs'
                                      : 'border-stone-200 hover:border-stone-300 bg-white'
                                  }`}
                                >
                                  <div className="flex items-center gap-3">
                                    <input
                                      type="radio"
                                      name="shipping_option_checkout"
                                      checked={isSelected}
                                      onChange={() => onSelectShipping(opt)}
                                      className="text-stone-900 focus:ring-stone-900"
                                    />
                                    <div>
                                      <div className="text-xs font-bold text-stone-900">
                                        {opt.carrier}
                                      </div>
                                      <div className="text-[11px] text-stone-500">
                                        {opt.estimate}
                                      </div>
                                    </div>
                                  </div>
                                  <div className="text-right">
                                    <span className="text-sm font-extrabold text-stone-900">
                                      {opt.price === 0 ? (
                                        <strong className="text-emerald-700">GRÁTIS</strong>
                                      ) : (
                                        `R$ ${opt.price.toFixed(2).replace('.', ',')}`
                                      )}
                                    </span>
                                  </div>
                                </label>
                              );
                            })}
                          </div>
                        </div>

                      </div>
                    )}
                  </div>

                  {/* Botão de Avanço idêntico à Imagem 2 */}
                  <div className="pt-4">
                    <button
                      type="button"
                      onClick={handleProceedToPayment}
                      className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-stone-800 hover:bg-stone-900 text-white font-bold text-sm transition cursor-pointer shadow-md flex items-center justify-center gap-2"
                    >
                      <span>Continuar para pagamento</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP: PAGAMENTO */}
              {step === 'payment' && (
                <div className="space-y-5">
                  <div className="flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => setStep('delivery')}
                      className="inline-flex items-center gap-1.5 text-xs text-stone-600 hover:text-stone-900 font-semibold cursor-pointer"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" />
                      <span>Voltar para Entrega</span>
                    </button>
                    <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                      Etapa 3 de 3
                    </span>
                  </div>

                  <h4 className="text-xs font-bold uppercase tracking-wider text-stone-700">
                    FORMA DE PAGAMENTO
                  </h4>

                  {/* Tabs de Pagamento */}
                  <div className="grid grid-cols-3 gap-2 p-1 bg-stone-100 rounded-xl text-xs font-bold">
                    <button
                      type="button"
                      onClick={() => setPaymentTab('whatsapp')}
                      className={`py-2 px-2.5 rounded-lg flex items-center justify-center gap-1.5 transition cursor-pointer ${
                        paymentTab === 'whatsapp'
                          ? 'bg-emerald-600 text-white shadow-xs'
                          : 'text-stone-700 hover:bg-white'
                      }`}
                    >
                      <Phone className="w-3.5 h-3.5" />
                      <span>WhatsApp</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentTab('pix')}
                      className={`py-2 px-2.5 rounded-lg flex items-center justify-center gap-1.5 transition cursor-pointer ${
                        paymentTab === 'pix'
                          ? 'bg-amber-500 text-stone-950 shadow-xs'
                          : 'text-stone-700 hover:bg-white'
                      }`}
                    >
                      <QrCode className="w-3.5 h-3.5" />
                      <span>PIX Direto</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentTab('card')}
                      className={`py-2 px-2.5 rounded-lg flex items-center justify-center gap-1.5 transition cursor-pointer ${
                        paymentTab === 'card'
                          ? 'bg-stone-900 text-amber-300 shadow-xs'
                          : 'text-stone-700 hover:bg-white'
                      }`}
                    >
                      <CreditCard className="w-3.5 h-3.5" />
                      <span>Cartão</span>
                    </button>
                  </div>

                  {/* Tab WhatsApp */}
                  {paymentTab === 'whatsapp' && (
                    <div className="space-y-4 p-4 rounded-2xl bg-emerald-50/60 border border-emerald-200 text-xs text-stone-700">
                      <div className="flex items-start gap-2 text-emerald-950">
                        <Sparkles className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <div>
                          <strong>Atendimento Humano no WhatsApp:</strong> Seu pedido com endereço de entrega, itens e cálculo de frete oficial será enviado automaticamente para a BR Apicultura no número <strong>(62) 98622-2199</strong>.
                        </div>
                      </div>

                      <div>
                        <label className="font-semibold block mb-1 text-stone-800">Observações para o envio (Opcional):</label>
                        <input
                          type="text"
                          placeholder="Ex: Deixar na portaria, ponto de referência..."
                          value={notes}
                          onChange={(e) => setNotes(e.target.value)}
                          className="w-full px-3 py-2 bg-white border border-stone-300 rounded-lg text-xs"
                        />
                      </div>

                      <button
                        type="button"
                        onClick={handleFinalizeWhatsApp}
                        className="w-full py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-md transition cursor-pointer"
                      >
                        <Phone className="w-4 h-4" />
                        <span>Confirmar & Enviar Pedido no WhatsApp</span>
                      </button>
                    </div>
                  )}

                  {/* Tab PIX */}
                  {paymentTab === 'pix' && (
                    <div className="space-y-4 p-4 rounded-2xl bg-amber-50/60 border border-amber-200 text-xs text-stone-700">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-stone-900">Chave PIX Oficial (E-mail):</span>
                        <span className="bg-amber-200/80 text-amber-950 font-bold px-2 py-0.5 rounded text-[11px]">
                          Aprovação Imediata
                        </span>
                      </div>

                      <div className="p-3 bg-white rounded-xl border border-stone-200 font-mono text-xs flex items-center justify-between">
                        <span className="font-bold text-stone-900">{STORE_INFO.pixKey}</span>
                        <button
                          type="button"
                          onClick={handleCopyPix}
                          className="px-2.5 py-1 rounded bg-stone-900 text-white text-[11px] font-bold flex items-center gap-1 cursor-pointer"
                        >
                          {copiedPix ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                          <span>{copiedPix ? 'Copiado!' : 'Copiar'}</span>
                        </button>
                      </div>

                      <div className="text-[11px] text-stone-600">
                        Beneficiário: <strong>{STORE_INFO.pixBeneficiary}</strong>
                      </div>

                      <button
                        type="button"
                        onClick={handleFinalizeWhatsApp}
                        className="w-full py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-sm flex items-center justify-center gap-2 shadow-md transition cursor-pointer"
                      >
                        <span>Confirmar Envio do Comprovante</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  )}

                  {/* Tab Cartão */}
                  {paymentTab === 'card' && (
                    <div className="space-y-4 p-4 rounded-2xl bg-stone-50 border border-stone-200 text-xs text-stone-700">
                      <div className="flex items-center gap-2 text-stone-800">
                        <CreditCard className="w-4 h-4 text-amber-600" />
                        <span>Aceitamos todas as bandeiras em até <strong>3x sem juros</strong> ou até 12x.</span>
                      </div>

                      <button
                        type="button"
                        onClick={handleFinalizeWhatsApp}
                        className="w-full py-3.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-md transition cursor-pointer"
                      >
                        <span>Receber Link Seguro de Pagamento no WhatsApp</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>
              )}

            </div>

            {/* Right Column: Resumo do Pedido (Idêntico ao painel direito das imagens) */}
            <div className="lg:col-span-5 p-5 sm:p-8 bg-stone-50/70 flex flex-col justify-between space-y-6">
              
              <div className="space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-stone-700">
                  RESUMO DA COMPRA
                </h4>

                {/* Items List */}
                <div className="space-y-3 max-h-56 overflow-y-auto pr-1">
                  {items.map((it) => (
                    <div key={it.id} className="flex items-center justify-between text-xs gap-3">
                      <div className="flex items-center gap-3">
                        <img
                          src={it.image}
                          alt={it.name}
                          className="w-12 h-12 object-contain p-1 bg-white border border-stone-200 rounded-lg shrink-0 shadow-2xs"
                        />
                        <div>
                          <div className="font-bold text-stone-900 leading-tight">
                            {it.name}
                          </div>
                          <div className="text-stone-500 text-[11px]">
                            {it.variant.weight} × {it.quantity}
                          </div>
                        </div>
                      </div>
                      <div className="font-semibold text-stone-900 text-right shrink-0">
                        R$ {(it.price * it.quantity).toFixed(2).replace('.', ',')}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Totals Table */}
                <div className="border-t border-stone-200 pt-3 space-y-2 text-xs text-stone-600">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="font-semibold text-stone-900">
                      R$ {subtotal.toFixed(2).replace('.', ',')}
                    </span>
                  </div>

                  {discount > 0 && (
                    <div className="flex justify-between text-emerald-600 font-semibold">
                      <span>Desconto</span>
                      <span>- R$ {discount.toFixed(2).replace('.', ',')}</span>
                    </div>
                  )}

                  <div className="flex justify-between">
                    <span>Frete ({selectedShipping?.name || 'A calcular'})</span>
                    <span className="font-semibold text-stone-900">
                      {shippingAddress ? (
                        shippingCost === 0 ? (
                          <strong className="text-emerald-700">GRÁTIS</strong>
                        ) : (
                          `R$ ${shippingCost.toFixed(2).replace('.', ',')}`
                        )
                      ) : (
                        <span className="text-stone-400 italic">Insira o CEP</span>
                      )}
                    </span>
                  </div>

                  <div className="flex justify-between text-base font-extrabold text-stone-950 pt-3 border-t border-stone-200">
                    <span>Total</span>
                    <span className="text-amber-800 text-lg">
                      R$ {total.toFixed(2).replace('.', ',')}
                    </span>
                  </div>
                </div>

                <div className="text-[11px] text-stone-500 pt-1">
                  {coupon ? (
                    <span className="text-emerald-700 font-semibold">✓ Cupom {coupon.code} aplicado</span>
                  ) : (
                    <span>Adicionar cupom de desconto no carrinho</span>
                  )}
                </div>
              </div>

              {/* Security Badge */}
              <div className="pt-4 border-t border-stone-200 text-stone-500 text-[11px] flex items-center justify-center gap-2 text-center">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Unidade SIE 1718/26 • Goiânia / GO • Compra 100% Protegida</span>
              </div>

            </div>

          </div>
        )}

      </div>
    </div>
  );
}

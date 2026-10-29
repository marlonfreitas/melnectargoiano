import React, { useState } from 'react';
import { ChevronDown, HelpCircle, Phone } from 'lucide-react';
import { STORE_INFO } from '../data/products';

export default function FAQSection() {
  const [openIdx, setOpenIdx] = useState(0);

  const faqs = [
    {
      q: "O mel de vocês pode cristalizar? O que fazer se isso acontecer?",
      a: "Sim! A cristalização é o maior atestado biológico de que o mel é 100% puro e não foi fervido nem misturado com xaropes de milho. Todo mel natural cristaliza com o tempo e em dias frios. Para voltar ao estado líquido, basta colocar o frasco em banho-maria com água morna (nunca fervendo, no máximo 45°C) por alguns minutos para não degradar as enzimas vivas."
    },
    {
      q: "Vocês enviam para todo o Brasil? Como funciona o frete?",
      a: "Enviamos para qualquer cidade do Brasil com embalagens reforçadas anti-impacto. Compras acima de R$ 120,00 contam com FRETE GRÁTIS! Para Goiânia e região metropolitana, temos entregas expressas via motoboy ou retirada presencial."
    },
    {
      q: "Posso retirar pessoalmente em Goiânia?",
      a: `Com certeza! Nossa unidade fica na ${STORE_INFO.location}. Você pode fechar o pedido pelo site ou WhatsApp e selecionar a opção 'Retirar em Goiânia' com custo de frete ZERO.`
    },
    {
      q: "Como funciona a compra pelo WhatsApp?",
      a: `É extremamente prático: você adiciona os produtos ao carrinho aqui no site, clica em 'Pedir no WhatsApp', e nosso sistema gera automaticamente a lista formatada com seus dados e o total. Você conversa diretamente com nossa equipe no ${STORE_INFO.phone} e pode pagar via PIX ou cartão na entrega.`
    },
    {
      q: "Quais são as formas de pagamento aceitas?",
      a: "Aceitamos PIX com desconto e confirmação instantânea, Cartões de Crédito (Visa, Mastercard, Elo, Hipercard) em até 12x, boleto bancário e pagamento no ato da retirada presencial em Goiânia."
    },
    {
      q: "A partir de qual idade crianças podem consumir mel?",
      a: "Seguindo a recomendação da Organização Mundial da Saúde (OMS) e do Ministério da Saúde, o mel puro deve ser oferecido para crianças a partir de 1 ano de idade, quando a flora intestinal da criança já está madura."
    }
  ];

  return (
    <section id="faq" className="py-16 sm:py-24 bg-stone-50 border-t border-stone-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-12 space-y-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-bold uppercase tracking-wider">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Tire Suas Dúvidas</span>
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
            Perguntas Frequentes
          </h2>
          <p className="text-stone-600 text-sm sm:text-base">
            Tudo o que você precisa saber sobre nosso mel puro, colheita e envio.
          </p>
        </div>

        {/* Accordion */}
        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-stone-200 shadow-xs overflow-hidden transition"
              >
                <button
                  type="button"
                  onClick={() => setOpenIdx(isOpen ? -1 : idx)}
                  className="w-full text-left p-5 flex items-center justify-between gap-4 font-bold text-stone-900 hover:text-amber-700 transition cursor-pointer text-sm sm:text-base"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-stone-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-amber-600' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 text-xs sm:text-sm text-stone-600 leading-relaxed border-t border-stone-100 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* WhatsApp Callout */}
        <div className="mt-12 p-6 rounded-2xl bg-emerald-50 border border-emerald-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-center sm:text-left">
            <h4 className="font-bold text-emerald-950 text-base">Ainda tem alguma dúvida específica?</h4>
            <p className="text-xs text-emerald-800 mt-0.5">Nosso apicultor e equipe de atendimento respondem em instantes.</p>
          </div>
          <a
            href={`https://wa.me/${STORE_INFO.whatsappNumber}?text=Olá!%20Tenho%20uma%20dúvida%20sobre%20o%20Mel%20Néctar%20Goiano`}
            target="_blank"
            rel="noreferrer"
            className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-2 shadow-xs transition shrink-0"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>Falar com Atendente</span>
          </a>
        </div>

      </div>
    </section>
  );
}


import React from 'react';
import { ArrowRight, Star, ShieldCheck, Sparkles, CheckCircle2, Heart } from 'lucide-react';
import { STORE_INFO } from '../data/products';

export default function Hero({ onExplore }) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-amber-500/10 via-amber-100/30 to-transparent pt-12 pb-16 lg:pt-20 lg:pb-28">
      {/* Decorative honeycomb SVGs */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 opacity-10 pointer-events-none text-amber-600">
        <svg viewBox="0 0 100 100" fill="currentColor">
          <polygon points="50 0, 93.3 25, 93.3 75, 50 100, 6.7 75, 6.7 25" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Persuasive Copy */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Pill tag */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-200/70 border border-amber-300 text-amber-900 text-xs sm:text-sm font-semibold shadow-xs">
              <Sparkles className="w-4 h-4 text-amber-700" />
              <span>Unidade Especializada em Goiânia - GO • 100% Natural</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-stone-900 tracking-tight leading-[1.15]">
              O Mais Puro Mel Silvestre do <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 via-amber-500 to-yellow-600">Cerrado Goiano</span>
            </h1>

            <p className="text-base sm:text-lg text-stone-700 leading-relaxed max-w-2xl mx-auto lg:mx-0">
              Extraído a frio com rigor artesanal pela <strong>BR Apicultura</strong>. Preserva todas as enzimas ativas, vitaminas e o autêntico aroma das matas e floradas silvestres de Goiás. Sem adição de glicose, sem aquecimento e sem conservantes.
            </p>

            {/* Micro Highlights */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 max-w-lg mx-auto lg:mx-0">
              <div className="flex items-center gap-2 text-xs sm:text-sm font-medium text-stone-800">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Zero Glicose de Milho</span>
              </div>
              <div className="flex items-center gap-2 text-xs sm:text-sm font-medium text-stone-800">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>5 Opções de Tamanho</span>
              </div>
              <div className="flex items-center gap-2 text-xs sm:text-sm font-medium text-stone-800 col-span-2 sm:col-span-1">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Direto do Produtor</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <a
                href="#produtos"
                onClick={onExplore}
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-amber-500 hover:bg-amber-600 text-stone-950 font-bold text-base shadow-lg shadow-amber-500/25 flex items-center justify-center gap-3 transition hover:scale-102 active:scale-98"
              >
                <span>Explorar Catálogo & Preços</span>
                <ArrowRight className="w-5 h-5" />
              </a>

              <a
                href={`https://wa.me/${STORE_INFO.whatsappNumber}?text=Olá,%20gostaria%20de%20fazer%20um%20pedido%20de%20mel%20diretamente%20pelo%20WhatsApp!`}
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto px-6 py-4 rounded-xl bg-white hover:bg-stone-50 border border-stone-200 text-stone-800 font-semibold text-base flex items-center justify-center gap-2.5 shadow-sm transition"
              >
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>Pedir no WhatsApp</span>
              </a>
            </div>

            {/* Social Proof Mini */}
            <div className="pt-3 flex items-center justify-center lg:justify-start gap-4">
              <div className="flex -space-x-2">
                <img className="inline-block h-9 w-9 rounded-full ring-2 ring-white object-cover" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80" alt="Cliente" />
                <img className="inline-block h-9 w-9 rounded-full ring-2 ring-white object-cover" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80" alt="Cliente" />
                <img className="inline-block h-9 w-9 rounded-full ring-2 ring-white object-cover" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80" alt="Cliente" />
              </div>
              <div className="text-left">
                <div className="flex items-center text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                  <span className="ml-1 text-xs font-bold text-stone-900">4.9/5</span>
                </div>
                <p className="text-xs text-stone-500 font-medium">+1.800 potes entregues em Goiás e no Brasil</p>
              </div>
            </div>

          </div>

          {/* Right Column: Visual Product Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Main Card with Amber Glow */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white/80 bg-gradient-to-b from-amber-100 via-amber-50 to-stone-900 flex flex-col justify-between">
                {/* Real Product Image Showcase */}
                <div className="relative z-10 w-full flex items-center justify-center pt-8 pb-4 px-6 h-72 sm:h-80">
                  <div className="absolute inset-0 bg-radial from-amber-400/25 to-transparent blur-xl pointer-events-none"></div>
                  <img 
                    src="/products/mel1000g.png" 
                    alt="Mel Silvestre Puro Néctar Goiano 1000g - Embalagem Real" 
                    className="max-h-full object-contain drop-shadow-2xl hover:scale-105 transition duration-500"
                  />
                </div>

                <div className="relative z-10 bg-gradient-to-t from-stone-950 via-stone-950/95 to-transparent flex flex-col justify-end p-6 text-white pt-6">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider bg-amber-500 text-stone-950 px-2 py-0.5 rounded-md">
                      Foto Real Oficial
                    </span>
                    <span className="text-xs font-bold text-amber-300">Pote de 1.000g (1 kg)</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold">Mel Néctar Goiano Silvestre</h3>
                  <p className="text-xs text-stone-200 mt-1">Colheita pura do Cerrado de Goiás, envasado a frio pela BR Apicultura.</p>
                  
                  <div className="mt-3 flex items-center justify-between pt-3 border-t border-white/20">
                    <div>
                      <span className="text-xs text-stone-300 block">5 Tamanhos a partir de</span>
                      <span className="text-2xl font-extrabold text-amber-400">R$ 24,90</span>
                    </div>
                    <a
                      href="#produtos"
                      className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 text-xs font-bold transition shadow-md active:scale-95"
                    >
                      Escolher Tamanho
                    </a>
                  </div>
                </div>
              </div>

              {/* Floating Badge Top Left */}
              <div className="absolute -top-4 -left-4 bg-white/95 backdrop-blur-md border border-amber-200 rounded-2xl p-3 shadow-lg flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/20 flex items-center justify-center text-amber-700">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xs font-bold text-stone-900">Laudo de Pureza</div>
                  <div className="text-[11px] text-stone-500">Origem: Cerrado de Goiás</div>
                </div>
              </div>

              {/* Floating Badge Bottom Right */}
              <div className="absolute -bottom-5 -right-3 bg-white/95 backdrop-blur-md border border-amber-200 rounded-2xl p-3 shadow-lg flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-700">
                  <Heart className="w-5 h-5 fill-current" />
                </div>
                <div>
                  <div className="text-xs font-bold text-stone-900">100% Puro & Cru</div>
                  <div className="text-[11px] text-stone-500">Sem processos térmicos</div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}


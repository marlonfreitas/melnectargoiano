import React from 'react';
import { MapPin, Award, CheckCircle, Leaf } from 'lucide-react';
import { STORE_INFO } from '../data/products';

export default function AboutSection() {
  return (
    <section id="sobre-nos" className="py-16 sm:py-24 bg-stone-100/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Visual collage */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-xl border-4 border-white">
              <img
                src="https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?auto=format&fit=crop&w=1000&q=80"
                alt="Colmeias e produção sustentável de mel em Goiás"
                className="w-full h-80 sm:h-96 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-900/70 via-transparent to-transparent flex items-end p-6">
                <div className="text-white">
                  <span className="text-xs uppercase font-bold text-amber-300 tracking-wider">Tradição & Respeito</span>
                  <h4 className="text-xl font-bold">Unidade de Processamento em Goiânia</h4>
                  <p className="text-xs text-stone-200">Garantia sanitária e respeito aos ciclos das colmeias.</p>
                </div>
              </div>
            </div>

            {/* Overlapping stat pill */}
            <div className="absolute -bottom-6 -right-4 sm:right-6 bg-amber-500 text-stone-950 p-4 rounded-2xl shadow-lg border-2 border-white flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-stone-950 text-amber-400 flex items-center justify-center font-black text-lg">
                GO
              </div>
              <div>
                <div className="text-xs font-bold uppercase tracking-wider">Origem Goiana</div>
                <div className="text-sm font-extrabold">Cerrado Silvestre</div>
              </div>
            </div>
          </div>

          {/* Right Column: Storytelling */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-200/80 text-amber-900 text-xs font-bold uppercase tracking-wider">
              <Leaf className="w-3.5 h-3.5 text-amber-700" />
              <span>Nossa Origem & Propósito</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight leading-tight">
              A Excelência da <span className="text-amber-700">BR Apicultura</span> e a Riqueza de Goiás
            </h2>

            <p className="text-base text-stone-700 leading-relaxed">
              A <strong>BR APICULTURA - MEL NÉCTAR GOIANO</strong> é uma <em>Unidade de Processamento de Produtos das Abelhas</em> sediada em <strong>Goiânia</strong>, dedicada a levar à mesa das famílias o mais puro alimento que a natureza pode produzir.
            </p>

            <p className="text-sm text-stone-600 leading-relaxed">
              Trabalhamos em harmonia com as abelhas nas regiões de floradas silvestres do Cerrado. Todo o nosso mel é extraído com técnicas modernas que mantêm intactas as propriedades terapêuticas, enzimáticas e bactericidas originais da colmeia.
            </p>

            {/* Points */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <h5 className="font-bold text-stone-900 text-sm">Padrão Sanitário</h5>
                  <p className="text-xs text-stone-600">Instalações adequadas com controle estrito de higiene.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Award className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <h5 className="font-bold text-stone-900 text-sm">Pureza Comprovada</h5>
                  <p className="text-xs text-stone-600">Sem processos de fervura que degradam o mel.</p>
                </div>
              </div>
            </div>

            {/* Physical Location Badge */}
            <div className="p-4 rounded-2xl bg-white border border-stone-200 shadow-xs flex items-center justify-between">
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-amber-600 shrink-0" />
                <div>
                  <span className="text-xs font-bold text-stone-900 block">Sede e Ponto de Retirada:</span>
                  <span className="text-xs text-stone-600">{STORE_INFO.location}</span>
                </div>
              </div>
              <a
                href={`https://wa.me/${STORE_INFO.whatsappNumber}`}
                target="_blank"
                rel="noreferrer"
                className="px-3 py-1.5 rounded-lg bg-stone-900 hover:bg-stone-800 text-amber-300 text-xs font-bold transition"
              >
                Como Chegar
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

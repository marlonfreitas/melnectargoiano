import React from 'react';
import { Factory, Droplets, ShieldCheck, Sparkles, CheckCircle2, Camera, ArrowRight, MapPin, Eye } from 'lucide-react';
import { STORE_INFO } from '../data/products';

export default function FacilityProcessSection() {
  // Steps of the honey beneficiation and packaging process
  const steps = [
    {
      number: "01",
      title: "Recepção dos Apiários",
      subtitle: "Origem Selecionada do Cerrado",
      desc: "O mel chega dos apiários parceiros em favos maduros e recipientes atóxicos próprios para alimentos. Realizamos os primeiros testes de umidade e pureza.",
      icon: Sparkles
    },
    {
      number: "02",
      title: "Desoperculação e Extração a Frio",
      subtitle: "Preservação Biológica Total",
      desc: "Retirada manual dos opérculos de cera e centrifugação a frio. O mel nunca é fervido nem superaquecido, garantindo enzimas vivas e aroma floral nativo.",
      icon: Droplets
    },
    {
      number: "03",
      title: "Filtragem e Decantação em Inox",
      subtitle: "Padrão Sanitário SIE 1718/26",
      desc: "O mel descansa em decantadores de aço inoxidável cirúrgico e passa por malhas finas de filtragem física para remover pequenas partículas de cera natural.",
      icon: ShieldCheck
    },
    {
      number: "04",
      title: "Envase e Lacração com Selo Oficial",
      subtitle: "Higiene Absoluta e Rastreabilidade",
      desc: "Envase dosador nas embalagens de 280g a 1.44kg com aplicação de lacre inviolável e selo oficial de inspeção antes de seguir para a sua mesa.",
      icon: Factory
    }
  ];

  // Facility and packaging photos (Slot 1 now has real photo)
  const facilityPhotoSlots = [
    {
      title: "Fachada & Ponto de Retirada",
      subtitle: "Rua C, 287 - Goiânia / GO",
      hint: "Foto da entrada ou fachada da BR Apicultura",
      image: "/fachada_brapicultura.jpg",
      tag: "Foto Real da Fachada"
    },
    {
      title: "Sala de Decantação e Inox",
      subtitle: "Tanques e decantadores sanitários",
      hint: "Foto dos maquinários e tanques de aço inox"
    },
    {
      title: "Linha de Envase e Fracionamento",
      subtitle: "Envase higiênico com dosadores",
      hint: "Foto das bisnagas e potes sendo envasados"
    },
    {
      title: "Controle de Qualidade & Lacre",
      subtitle: "Inspeção SIE 1718/26 Goiás",
      hint: "Foto do mel pronto com lacre e rótulo oficial"
    }
  ];

  return (
    <section id="conheca-br-apicultura" className="py-16 sm:py-24 bg-stone-900 text-white relative overflow-hidden">
      {/* Decorative ambient glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-10 w-96 h-96 bg-amber-600/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold uppercase tracking-wider border border-amber-500/30">
            <Factory className="w-3.5 h-3.5 text-amber-400" />
            <span>Unidade de Processamento em Goiânia</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
            Conheça a <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-500">BR Apicultura</span>
          </h2>
          <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
            Transparência total da colmeia até a sua mesa. Veja como funciona a nossa estrutura de beneficiamento, decantação e envase com inspeção sanitária oficial.
          </p>
        </div>

        {/* Part 1: Step by Step Packaging Process */}
        <div className="mb-20">
          <div className="text-center mb-10">
            <span className="text-amber-400 text-xs font-bold uppercase tracking-wider block">
              Passo a Passo
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold mt-1">
              Como é Feito o Beneficiamento do Nosso Mel
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, idx) => {
              const Icon = step.icon;
              return (
                <div
                  key={idx}
                  className="bg-stone-800/70 border border-stone-700/80 rounded-3xl p-6 relative flex flex-col justify-between hover:border-amber-400/60 transition duration-300 group shadow-lg"
                >
                  <div>
                    {/* Step number badge */}
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-3xl font-black text-amber-400/40 group-hover:text-amber-400 transition font-mono">
                        {step.number}
                      </span>
                      <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
                        <Icon className="w-5 h-5" />
                      </div>
                    </div>

                    <h4 className="text-lg font-bold text-white mb-1">
                      {step.title}
                    </h4>
                    <span className="text-xs font-semibold text-amber-300 block mb-3">
                      {step.subtitle}
                    </span>
                    <p className="text-xs text-stone-300 leading-relaxed">
                      {step.desc}
                    </p>
                  </div>

                  <div className="pt-4 mt-6 border-t border-stone-700/60 flex items-center gap-1.5 text-[11px] text-emerald-400 font-semibold">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Processo Padronizado</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Part 2: Facility Photo Showcase */}
        <div className="bg-gradient-to-b from-stone-800/80 to-stone-850/90 border border-stone-700 rounded-3xl p-6 sm:p-10 shadow-2xl">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 pb-6 border-b border-stone-700">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                Nossas Instalações
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold mt-1 text-white">
                Fotos do Estabelecimento
              </h3>
              <p className="text-xs sm:text-sm text-stone-400 mt-1">
                Ambiente planejado e aprovado para o beneficiamento de produtos das abelhas.
              </p>
            </div>
            
            <div className="flex items-center gap-2 text-xs text-stone-300 bg-stone-900/60 px-4 py-2 rounded-xl border border-stone-700 shrink-0">
              <MapPin className="w-4 h-4 text-amber-400" />
              <span>{STORE_INFO.location}</span>
            </div>
          </div>

          {/* 4 Photo Slots Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {facilityPhotoSlots.map((slot, idx) => {
              if (slot.image) {
                return (
                  <div
                    key={idx}
                    className="bg-stone-900 border-2 border-amber-400/70 hover:border-amber-400 rounded-2xl p-3 flex flex-col justify-between transition duration-300 group min-h-[260px] shadow-xl hover:-translate-y-1"
                  >
                    {/* Real Photo with Tag */}
                    <div className="relative w-full h-44 rounded-xl overflow-hidden bg-stone-950 flex items-center justify-center">
                      <img
                        src={slot.image}
                        alt={slot.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                      <div className="absolute top-2 left-2 bg-stone-950/85 backdrop-blur-xs text-amber-300 text-[10px] font-black uppercase px-2 py-0.5 rounded-md border border-amber-400/40 shadow-xs flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                        <span>{slot.tag || "Foto Real"}</span>
                      </div>
                    </div>

                    {/* Card Legend */}
                    <div className="pt-3 w-full text-left px-1">
                      <h5 className="font-bold text-sm text-white truncate group-hover:text-amber-300 transition-colors">
                        {slot.title}
                      </h5>
                      <p className="text-[11px] text-amber-400 font-medium">
                        {slot.subtitle}
                      </p>
                    </div>
                  </div>
                );
              }

              return (
                <div
                  key={idx}
                  className="bg-stone-900/90 border-2 border-dashed border-stone-700 hover:border-amber-400/80 rounded-2xl p-5 flex flex-col justify-between items-center text-center transition duration-300 group min-h-[260px]"
                >
                  {/* Photo Placeholder Area */}
                  <div className="w-full flex-1 flex flex-col items-center justify-center p-4 rounded-xl bg-stone-800/60 border border-stone-700/60 group-hover:bg-amber-500/10 transition">
                    <div className="w-12 h-12 rounded-full bg-stone-700/80 group-hover:bg-amber-500/20 text-stone-400 group-hover:text-amber-400 flex items-center justify-center mb-3 transition">
                      <Camera className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-bold text-stone-300 uppercase tracking-wide">
                      Espaço para Foto {idx + 1}
                    </span>
                    <p className="text-[10px] text-stone-500 mt-1 italic max-w-[180px]">
                      {slot.hint}
                    </p>
                  </div>

                  {/* Card Legend */}
                  <div className="pt-3 w-full text-left">
                    <h5 className="font-bold text-sm text-white truncate">
                      {slot.title}
                    </h5>
                    <p className="text-[11px] text-amber-400">
                      {slot.subtitle}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom callout */}
          <div className="mt-8 pt-6 border-t border-stone-700 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-stone-400 text-center sm:text-left">
              📍 <strong>Unidade Oficial em Goiânia:</strong> Visitas para retirada no local mediante agendamento ou pedido direto na loja virtual.
            </div>
            
            <a
              href={`https://wa.me/${STORE_INFO.whatsappNumber}?text=Olá!%20Gostaria%20de%20saber%20mais%20sobre%20a%20unidade%20de%20processamento%20da%20BR%20Apicultura`}
              target="_blank"
              rel="noreferrer"
              className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs flex items-center gap-2 shadow-md transition active:scale-95 shrink-0"
            >
              <span>Falar Conosco</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>

        </div>

      </div>
    </section>
  );
}

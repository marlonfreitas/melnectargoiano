import React from 'react';
import { ShieldCheck, CheckCircle2, Award, FileCheck } from 'lucide-react';

export default function CertificationsSection() {
  const certifications = [
    {
      image: "/selo_sie.png",
      title: "SIE 1718/26 GOIÁS",
      subtitle: "Inspeção Estadual (Agrodefesa)",
      desc: "Registro oficial do Serviço de Inspeção Estadual de Goiás. Garante que o mel é extraído, filtrado e envasado em nossa Unidade de Processamento com controle estrito de higiene e conformidade com a legislação sanitária.",
      badge: "Inspeção Oficial GO",
      badgeColor: "bg-stone-900 text-amber-300"
    },
    {
      image: "/selo_senai.png",
      title: "Programa Alimento Confiável",
      subtitle: "Certificação SENAI de Qualidade",
      desc: "Chancela técnica do SENAI que atesta as Boas Práticas de Fabricação (BPF), pureza biológica do mel sem aditivos e padrão de qualidade rigoroso do apiário até a mesa da sua família.",
      badge: "Qualidade Auditada",
      badgeColor: "bg-blue-700 text-white"
    },
    {
      image: "/selo_inpi.png",
      title: "Marca Registrada® no INPI",
      subtitle: "Proteção & Autenticidade",
      desc: "Marca registrada oficial no Instituto Nacional da Propriedade Industrial (INPI). Garantia de autenticidade, protegendo você contra méis falsificados e assegurando a legítima origem do Cerrado Goiano.",
      badge: "Marca Registrada",
      badgeColor: "bg-amber-600 text-stone-950"
    }
  ];

  return (
    <section id="certificacoes" className="py-16 sm:py-24 bg-white border-t border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-100 text-emerald-900 text-xs font-bold uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4 text-emerald-700" />
            <span>Pureza Comprovada por Órgãos Oficiais</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
            Mel Certificado e Inspecionado
          </h2>
          <p className="text-base text-stone-600 leading-relaxed">
            A <strong>BR Apicultura / Mel Néctar Goiano</strong> cumpre todos os padrões técnicos, sanitários e legais para que você consuma um mel 100% puro e seguro.
          </p>
        </div>

        {/* 3 Seal Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {certifications.map((cert, idx) => (
            <div
              key={idx}
              className="bg-stone-50/80 rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between items-center text-center group"
            >
              <div className="flex flex-col items-center">
                {/* Stamp/Seal Image */}
                <div className="h-32 w-full flex items-center justify-center mb-5 p-2 bg-white rounded-2xl border border-stone-200 shadow-xs group-hover:scale-105 transition-transform duration-300">
                  <img
                    src={cert.image}
                    alt={cert.title}
                    className="max-h-full max-w-full object-contain"
                  />
                </div>

                {/* Badge */}
                <span className={`px-3 py-0.5 rounded-full text-[11px] font-extrabold uppercase tracking-wide mb-3 ${cert.badgeColor}`}>
                  {cert.badge}
                </span>

                <h3 className="text-xl font-bold text-stone-900 mb-1">
                  {cert.title}
                </h3>
                <h4 className="text-xs font-semibold text-amber-800 uppercase tracking-wide mb-3">
                  {cert.subtitle}
                </h4>

                <p className="text-xs text-stone-600 leading-relaxed">
                  {cert.desc}
                </p>
              </div>

              <div className="w-full pt-4 mt-6 border-t border-stone-200/80 flex items-center justify-center gap-1.5 text-xs text-emerald-700 font-semibold">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Certificação Ativa & Válida</span>
              </div>
            </div>
          ))}
        </div>

        {/* Highlight Banner */}
        <div className="mt-14 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-amber-50 via-amber-100/50 to-emerald-50 border border-amber-200 flex flex-col lg:flex-row items-center justify-between gap-6 shadow-sm">
          <div className="flex items-center gap-4 text-center lg:text-left">
            <div className="w-14 h-14 rounded-2xl bg-amber-500 text-stone-950 flex items-center justify-center shrink-0 shadow-sm font-bold text-2xl hidden sm:flex">
              🍯
            </div>
            <div>
              <h4 className="text-lg font-extrabold text-stone-900">
                Transparência da Origem ao Pote
              </h4>
              <p className="text-xs sm:text-sm text-stone-600 mt-1 max-w-2xl">
                Não arrisque a saúde da sua família com méis clandestinos ou sem rótulo de inspeção. Exija sempre o carimbo do <strong>SIE Goiás</strong> e o selo <strong>Alimento Confiável SENAI</strong>.
              </p>
            </div>
          </div>

          <a
            href="#produtos"
            className="px-6 py-3 rounded-xl bg-stone-900 hover:bg-stone-800 text-amber-300 font-bold text-xs shrink-0 shadow-sm transition active:scale-95"
          >
            Escolher Meu Mel Certificado
          </a>
        </div>

      </div>
    </section>
  );
}

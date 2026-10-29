import React from 'react';
import { Phone, Mail, MapPin, Heart, ShieldCheck, Sparkles } from 'lucide-react';
import { STORE_INFO } from '../data/products';

export default function Footer() {
  return (
    <footer className="bg-stone-950 text-stone-300 pt-16 pb-12 border-t-4 border-amber-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-stone-800">
          
          {/* Brand Col */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-400 flex items-center justify-center text-xl">
                🍯
              </div>
              <div>
                <h4 className="text-white font-extrabold text-lg leading-tight">Mel Néctar Goiano</h4>
                <p className="text-amber-400 text-xs font-semibold">BR Apicultura • Goiânia - GO</p>
              </div>
            </div>

            <p className="text-xs text-stone-400 leading-relaxed">
              Unidade de Processamento de Produtos das Abelhas sediada em Goiânia. Dedicada à pureza artesanal, conservação ambiental do Cerrado e bem-estar através do mel 100% puro, própolis e favos.
            </p>

            <div className="flex items-center gap-2 pt-2">
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-stone-900 border border-stone-800 text-[11px] text-amber-300">
                <ShieldCheck className="w-3.5 h-3.5" />
                Pureza Testada em Laboratório
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h5 className="text-white font-bold text-sm tracking-wide uppercase text-amber-400">
              Produtos & Categorias
            </h5>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#produtos" className="hover:text-amber-400 transition">Mel Silvestre Bisnaga 280g</a>
              </li>
              <li>
                <a href="#produtos" className="hover:text-amber-400 transition">Mel Silvestre Frasco 500g</a>
              </li>
              <li>
                <a href="#produtos" className="hover:text-amber-400 transition">Mel Silvestre Pote 700g</a>
              </li>
              <li>
                <a href="#produtos" className="hover:text-amber-400 transition">Mel Silvestre Pote 1.000g (1 kg)</a>
              </li>
              <li>
                <a href="#produtos" className="hover:text-amber-400 transition">Mel Silvestre Balde 1.440g</a>
              </li>
              <li>
                <a href="#produtos" className="hover:text-amber-400 transition">Trio Mel Silvestre 3x 1kg (Frete Grátis)</a>
              </li>
            </ul>
          </div>

          {/* Institutional */}
          <div className="space-y-3">
            <h5 className="text-white font-bold text-sm tracking-wide uppercase text-amber-400">
              Institucional
            </h5>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#certificacoes" className="hover:text-amber-400 transition">Certificações Oficiais (SIE e SENAI)</a>
              </li>
              <li>
                <a href="#sobre-nos" className="hover:text-amber-400 transition">Quem Somos & Unidade em Goiânia</a>
              </li>
              <li>
                <a href="#teste-pureza" className="hover:text-amber-400 transition">Como Reconhecer Mel Puro</a>
              </li>
              <li>
                <a href="#quiz-saude" className="hover:text-amber-400 transition">Consultor Apícola de Saúde</a>
              </li>
              <li>
                <a href="#faq" className="hover:text-amber-400 transition">Como Comprar & Formas de Envio</a>
              </li>
              <li>
                <a href="#faq" className="hover:text-amber-400 transition">Política de Devolução & Garantia</a>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-3">
            <h5 className="text-white font-bold text-sm tracking-wide uppercase text-amber-400">
              Atendimento & Localização
            </h5>
            <ul className="space-y-3 text-xs">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>{STORE_INFO.location}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <a
                  href={`https://wa.me/${STORE_INFO.whatsappNumber}`}
                  className="hover:text-emerald-400 transition font-bold"
                >
                  {STORE_INFO.phone}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                <a href={`mailto:${STORE_INFO.email}`} className="hover:text-amber-400 transition">
                  {STORE_INFO.email}
                </a>
              </li>
              <li className="pt-2 text-stone-400 text-[11px]">
                Horário de Atendimento:<br />
                Segunda a Sexta: 08:00 às 18:00<br />
                Sábado: 08:00 às 13:00
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Strip: Security & Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <div>
            © {new Date().getFullYear()} BR APICULTURA - MEL NÉCTAR GOIANO. Todos os direitos reservados.
          </div>

          <div className="flex items-center gap-4 text-stone-400">
            <span>PIX Instantâneo</span>
            <span>•</span>
            <span>Cartões em até 12x</span>
            <span>•</span>
            <span>Entrega Segura Brasil</span>
          </div>
        </div>

      </div>
    </footer>
  );
}

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

            <div className="flex flex-col gap-2 pt-2">
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-stone-900 border border-stone-800 text-[11px] text-amber-300 w-fit">
                <ShieldCheck className="w-3.5 h-3.5" />
                Pureza Testada em Laboratório
              </span>
              <a
                href={STORE_INFO.instagramUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-gradient-to-r from-purple-600 via-pink-600 to-amber-500 text-white text-xs font-bold shadow-xs hover:opacity-90 transition w-fit"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
                <span>Instagram @brapicultura2026</span>
              </a>
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
                <a href="#conheca-br-apicultura" className="hover:text-amber-400 transition">Conheça a BR Apicultura & Envase</a>
              </li>
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
              <li className="flex items-center gap-2.5">
                <svg className="w-4 h-4 text-pink-400 shrink-0 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
                <a
                  href={STORE_INFO.instagramUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-pink-400 transition font-bold"
                >
                  {STORE_INFO.instagram}
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

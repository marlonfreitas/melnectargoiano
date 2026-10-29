import React, { useState } from 'react';
import { ShoppingBag, Phone, Menu, X, Sparkles, MapPin } from 'lucide-react';
import { STORE_INFO } from '../data/products';

export default function Header({ cartCount, onOpenCart, onNavigate }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-amber-200/80 shadow-xs">
      {/* Top bar announcement */}
      <div className="bg-stone-900 text-amber-300 text-xs py-2 px-4 text-center font-medium flex items-center justify-center gap-3">
        <span className="flex items-center gap-1">
          <Sparkles className="w-3.5 h-3.5 text-amber-400 inline" />
          <strong>FRETE GRÁTIS</strong> para todo o Brasil acima de R$ 150
        </span>
        <span className="hidden md:inline text-stone-600">|</span>
        <a 
          href={`https://wa.me/${STORE_INFO.whatsappNumber}?text=Olá,%20gostaria%20de%20informações%20sobre%20os%20produtos%20da%20BR%20Apicultura`}
          target="_blank" 
          rel="noreferrer"
          className="hidden md:flex items-center gap-1.5 text-amber-200 hover:text-white transition"
        >
          <Phone className="w-3 h-3 text-emerald-400" />
          <span>Atendimento WhatsApp: <strong>{STORE_INFO.phone}</strong></span>
        </a>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo / Brand */}
          <div className="flex items-center gap-3">
            <a href="#" className="flex items-center gap-3 group">
              <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-amber-100 flex items-center justify-center border-2 border-amber-400/50 shadow-sm">
                <img 
                  src="/logo.webp" 
                  alt={STORE_INFO.name} 
                  className="w-full h-full object-contain p-1"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.parentElement.innerHTML = '🍯';
                  }}
                />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold tracking-tight text-stone-900 group-hover:text-amber-700 transition">
                  Mel Néctar Goiano
                </span>
                <span className="text-xs text-amber-800 font-medium tracking-wide uppercase">
                  BR Apicultura • Goiânia - GO
                </span>
              </div>
            </a>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8 font-medium text-sm text-stone-700">
            <a href="#produtos" className="hover:text-amber-600 transition">Produtos</a>
            <a href="#tamanhos" className="hover:text-amber-600 transition">Embalagens (280g a 1.4kg)</a>
            <a href="#quiz-saude" className="hover:text-amber-600 transition">Recomendador</a>
            <a href="#teste-pureza" className="hover:text-amber-600 transition">Pureza do Cerrado</a>
            <a href="#sobre-nos" className="hover:text-amber-600 transition">Quem Somos</a>
            <a href="#faq" className="hover:text-amber-600 transition">Dúvidas</a>
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center gap-3">
            {/* Quick Contact Button */}
            <a
              href={`https://wa.me/${STORE_INFO.whatsappNumber}`}
              target="_blank"
              rel="noreferrer"
              className="hidden sm:inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100 transition shadow-xs"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>(62) 98622-2199</span>
            </a>

            {/* Cart Button */}
            <button
              onClick={onOpenCart}
              className="relative p-2.5 sm:px-4 sm:py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-stone-950 font-semibold text-sm flex items-center gap-2 shadow-sm transition active:scale-95"
              aria-label="Abrir carrinho de compras"
            >
              <ShoppingBag className="w-5 h-5 text-stone-900" />
              <span className="hidden sm:inline">Carrinho</span>
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-stone-900 text-amber-300 text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center border-2 border-white animate-bounce">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-stone-700 hover:bg-stone-100 transition"
              aria-label="Alternar menu móvel"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-amber-200 bg-white px-4 pt-3 pb-6 space-y-3">
          <nav className="flex flex-col space-y-2 text-base font-medium text-stone-800">
            <a 
              href="#produtos" 
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-amber-50 text-stone-800"
            >
              🍯 Nossos Produtos
            </a>
            <a 
              href="#tamanhos" 
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-amber-50 text-stone-800"
            >
              ⚖️ Embalagens (280g, 500g, 700g, 1kg, 1.44kg)
            </a>
            <a 
              href="#quiz-saude" 
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-amber-50 text-stone-800"
            >
              ✨ Descubra seu Mel Ideal (Quiz)
            </a>
            <a 
              href="#teste-pureza" 
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-amber-50 text-stone-800"
            >
              🔍 Teste de Pureza & Qualidade
            </a>
            <a 
              href="#sobre-nos" 
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-amber-50 text-stone-800"
            >
              🏡 Quem Somos (Goiânia - GO)
            </a>
            <a 
              href="#faq" 
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-amber-50 text-stone-800"
            >
              ❓ Dúvidas Frequentes
            </a>
          </nav>
          
          <div className="pt-3 border-t border-stone-100 flex flex-col gap-2">
            <div className="flex items-center gap-2 text-xs text-stone-600 px-3">
              <MapPin className="w-4 h-4 text-amber-600 shrink-0" />
              <span>{STORE_INFO.location}</span>
            </div>
            <a
              href={`https://wa.me/${STORE_INFO.whatsappNumber}`}
              target="_blank"
              rel="noreferrer"
              className="w-full text-center py-2.5 rounded-lg bg-emerald-600 text-white font-semibold text-sm hover:bg-emerald-700 transition"
            >
              Falar no WhatsApp: {STORE_INFO.phone}
            </a>
          </div>
        </div>
      )}
    </header>
  );
}


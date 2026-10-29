import React, { useState } from 'react';
import { ShoppingBag, Phone, Menu, X, Sparkles, MapPin, CheckCircle2 } from 'lucide-react';
import { STORE_INFO } from '../data/products';

export default function Header({ cartCount, onOpenCart }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-amber-200/80 shadow-xs">
      {/* Top bar announcement */}
      <div className="bg-stone-900 text-amber-300 text-xs py-2 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between sm:justify-center gap-4 text-[11px] sm:text-xs">
          <div className="flex items-center gap-1.5 font-medium mx-auto sm:mx-0">
            <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span>
              <strong>FRETE GRÁTIS</strong> para todo o Brasil acima de R$ {STORE_INFO.freeShippingThreshold.toFixed(0)}
            </span>
          </div>

          <div className="hidden md:flex items-center gap-4 text-stone-400">
            <span className="text-stone-700">•</span>
            <a 
              href={STORE_INFO.instagramUrl}
              target="_blank" 
              rel="noreferrer"
              className="flex items-center gap-1.5 text-stone-300 hover:text-amber-300 transition-colors"
            >
              <svg className="w-3.5 h-3.5 fill-current text-pink-400 shrink-0" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
              <span>{STORE_INFO.instagram}</span>
            </a>
            <span className="text-stone-700">•</span>
            <a 
              href={`https://wa.me/${STORE_INFO.whatsappNumber}?text=Olá,%20gostaria%20de%20informações%20sobre%20os%20produtos%20da%20BR%20Apicultura`}
              target="_blank" 
              rel="noreferrer"
              className="flex items-center gap-1.5 text-stone-300 hover:text-emerald-300 transition-colors"
            >
              <Phone className="w-3 h-3 text-emerald-400 shrink-0" />
              <span>{STORE_INFO.phone}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          
          {/* Logo / Brand */}
          <a href="#" className="flex items-center gap-3 group shrink-0">
            <div className="relative w-11 h-11 sm:w-12 sm:h-12 rounded-xl overflow-hidden bg-amber-50 flex items-center justify-center border border-amber-300/80 shadow-xs group-hover:border-amber-400 transition">
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
              <span className="text-lg sm:text-xl font-bold tracking-tight text-stone-900 group-hover:text-amber-700 transition">
                Mel Néctar Goiano
              </span>
              <span className="text-[10px] sm:text-xs text-amber-800/90 font-semibold tracking-wider uppercase">
                BR APICULTURA • GOIÂNIA - GO
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-5 xl:gap-7 text-sm font-medium text-stone-700">
            <a href="#produtos" className="hover:text-amber-700 transition whitespace-nowrap">
              Produtos
            </a>
            <a href="#tamanhos" className="hover:text-amber-700 transition whitespace-nowrap">
              Embalagens
            </a>
            <a href="#conheca-br-apicultura" className="hover:text-amber-700 transition whitespace-nowrap">
              Sobre Nós
            </a>
            <a href="#certificacoes" className="hover:text-amber-700 transition whitespace-nowrap">
              Certificações
            </a>
            <a href="#teste-pureza" className="hover:text-amber-700 transition whitespace-nowrap">
              Pureza do Cerrado
            </a>
            <a href="#faq" className="hover:text-amber-700 transition whitespace-nowrap">
              Dúvidas
            </a>
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Quick Contact Button (WhatsApp direto, sem quebra de linha) */}
            <a
              href={`https://wa.me/${STORE_INFO.whatsappNumber}?text=Olá,%20gostaria%20de%20informações%20sobre%20os%20produtos%20da%20BR%20Apicultura`}
              target="_blank"
              rel="noreferrer"
              className="hidden sm:inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100 hover:border-emerald-300 transition shadow-xs whitespace-nowrap"
              title="Fale conosco pelo WhatsApp"
            >
              <Phone className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>{STORE_INFO.phone}</span>
            </a>

            {/* Cart Button */}
            <button
              onClick={onOpenCart}
              className="relative px-3.5 sm:px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs sm:text-sm flex items-center gap-2 shadow-xs transition active:scale-95 whitespace-nowrap cursor-pointer"
              aria-label="Abrir carrinho de compras"
            >
              <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5 text-stone-950 shrink-0" />
              <span>Carrinho</span>
              {cartCount > 0 && (
                <span className="bg-stone-950 text-amber-300 text-xs font-black min-w-5 h-5 px-1 rounded-full flex items-center justify-center border-2 border-amber-500">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-stone-700 hover:bg-stone-100 border border-stone-200 transition cursor-pointer"
              aria-label="Alternar menu móvel"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-amber-200/80 bg-white/98 backdrop-blur-md px-4 pt-3 pb-6 space-y-3 shadow-lg animate-in slide-in-from-top-2">
          <nav className="flex flex-col space-y-1 text-sm font-medium text-stone-800">
            <a 
              href="#produtos" 
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-amber-50 text-stone-800 flex items-center gap-2 transition"
            >
              <span>🍯</span> Nossos Produtos
            </a>
            <a 
              href="#tamanhos" 
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-amber-50 text-stone-800 flex items-center gap-2 transition"
            >
              <span>⚖️</span> Embalagens (280g, 500g, 700g, 1kg, 1.44kg)
            </a>
            <a 
              href="#conheca-br-apicultura" 
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-amber-50 text-stone-800 flex items-center gap-2 transition"
            >
              <span>🏭</span> Conheça a BR Apicultura
            </a>
            <a 
              href="#certificacoes" 
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-amber-50 text-stone-800 flex items-center gap-2 transition"
            >
              <span>🏅</span> Selos & Certificações (SIE / SENAI)
            </a>
            <a 
              href="#teste-pureza" 
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-amber-50 text-stone-800 flex items-center gap-2 transition"
            >
              <span>🔍</span> Pureza do Cerrado & Como Identificar
            </a>
            <a 
              href="#faq" 
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-amber-50 text-stone-800 flex items-center gap-2 transition"
            >
              <span>❓</span> Dúvidas Frequentes
            </a>
          </nav>
          
          <div className="pt-3 border-t border-stone-200/70 flex flex-col gap-2.5">
            <div className="flex items-center gap-2 text-xs text-stone-600 px-3">
              <MapPin className="w-3.5 h-3.5 text-amber-600 shrink-0" />
              <span>{STORE_INFO.location}</span>
            </div>
            
            <a
              href={`https://wa.me/${STORE_INFO.whatsappNumber}?text=Olá,%20gostaria%20de%20informações%20sobre%20os%20produtos%20da%20BR%20Apicultura`}
              target="_blank"
              rel="noreferrer"
              className="w-full text-center py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm transition shadow-xs flex items-center justify-center gap-2"
            >
              <Phone className="w-4 h-4" />
              <span>Atendimento via WhatsApp</span>
            </a>

            <a
              href={STORE_INFO.instagramUrl}
              target="_blank"
              rel="noreferrer"
              className="w-full text-center py-2.5 rounded-xl bg-pink-50 hover:bg-pink-100 text-pink-700 font-semibold text-sm border border-pink-200 transition flex items-center justify-center gap-2"
            >
              <svg className="w-4 h-4 fill-current text-pink-600" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
              <span>Siga no Instagram {STORE_INFO.instagram}</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

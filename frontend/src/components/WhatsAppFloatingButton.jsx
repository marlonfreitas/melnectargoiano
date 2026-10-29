import React, { useState } from 'react';
import { Phone, MessageCircle, X } from 'lucide-react';
import { STORE_INFO } from '../data/products';

export default function WhatsAppFloatingButton() {
  const [showTooltip, setShowTooltip] = useState(true);

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end">
      {/* Tooltip bubble */}
      {showTooltip && (
        <div className="mb-3 max-w-xs bg-white text-stone-800 p-3 rounded-2xl shadow-xl border border-amber-200 text-xs flex items-start gap-2 animate-in fade-in slide-in-from-bottom-2">
          <div className="flex-1">
            <span className="font-bold text-emerald-800 block">Dúvida sobre os Méis?</span>
            <p className="text-stone-600 mt-0.5">Fale agora com nosso apicultor no WhatsApp!</p>
          </div>
          <button
            onClick={() => setShowTooltip(false)}
            className="text-stone-400 hover:text-stone-600 p-0.5"
            aria-label="Fechar dica"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Floating Pulse Button */}
      <a
        href={`https://wa.me/${STORE_INFO.whatsappNumber}?text=Olá,%20estou%20no%20site%20e%20gostaria%20de%20fazer%20um%20pedido%20de%20Mel%20Néctar%20Goiano!`}
        target="_blank"
        rel="noreferrer"
        className="relative group p-4 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95"
        aria-label="Chamar no WhatsApp"
      >
        {/* Pulsing ring */}
        <span className="absolute inset-0 rounded-full bg-emerald-500 opacity-75 animate-ping pointer-events-none group-hover:opacity-0"></span>
        <MessageCircle className="w-7 h-7 fill-current relative z-10" />
      </a>
    </div>
  );
}

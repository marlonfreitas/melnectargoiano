/**
 * shippingService.js
 * Serviço de cálculo de frete automático por CEP integrado com ViaCEP
 * Origem: Goiânia - GO (BR Apicultura / Mel Néctar Goiano)
 */

import { STORE_INFO } from './products';

// Formata CEP: 00000-000
export function formatCEP(value) {
  if (!value) return '';
  const digits = value.replace(/\D/g, '').slice(0, 8);
  if (digits.length <= 5) return digits;
  return `${digits.slice(0, 5)}-${digits.slice(5)}`;
}

// Limpa CEP para apenas dígitos
export function cleanCEP(value) {
  return (value || '').replace(/\D/g, '');
}

// Calcula datas estimadas úteis a partir de hoje
function getDeliveryDateRange(minDays, maxDays) {
  const addBusinessDays = (startDate, days) => {
    let current = new Date(startDate);
    let added = 0;
    while (added < days) {
      current.setDate(current.getDate() + 1);
      const dayOfWeek = current.getDay();
      // Pula sábado (6) e domingo (0)
      if (dayOfWeek !== 0 && dayOfWeek !== 6) {
        added++;
      }
    }
    return current;
  };

  const now = new Date();
  const minDate = addBusinessDays(now, minDays);
  const maxDate = addBusinessDays(now, maxDays);

  const daysOfWeek = ['domingo', 'segunda-feira', 'terça-feira', 'quarta-feira', 'quinta-feira', 'sexta-feira', 'sábado'];

  const formatDate = (d) => {
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    return `${daysOfWeek[d.getDay()]} ${day}/${month}`;
  };

  return `Chega entre ${formatDate(minDate)} e ${formatDate(maxDate)}`;
}

// Consulta ViaCEP
export async function lookupAddressByCEP(rawCep) {
  const cep = cleanCEP(rawCep);
  if (cep.length !== 8) {
    throw new Error('CEP deve conter 8 dígitos.');
  }

  const res = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
  if (!res.ok) {
    throw new Error('Não foi possível consultar o CEP no momento.');
  }

  const data = await res.json();
  if (data.erro) {
    throw new Error('CEP não encontrado. Verifique e tente novamente.');
  }

  return {
    cep: data.cep,
    street: data.logradouro || '',
    neighborhood: data.bairro || '',
    city: data.localidade || '',
    state: data.uf || '',
    ibge: data.ibge,
    ddd: data.ddd
  };
}

// Calcula as opções de frete disponíveis de acordo com a UF e Cidade
export function calculateShippingOptions(address, subtotal = 0) {
  const isFreeEligible = subtotal >= STORE_INFO.freeShippingThreshold;
  const uf = (address.state || '').toUpperCase();
  const city = (address.city || '').toLowerCase();
  const isGoianiaRegion = uf === 'GO' && (city.includes('goiânia') || city.includes('goiania') || city.includes('aparecida'));

  const options = [];

  // Se for Goiânia ou região metropolitana
  if (isGoianiaRegion) {
    // Retirada na Sede
    options.push({
      id: 'pickup_store',
      carrier: 'Retirada na Sede BR Apicultura',
      name: 'Retirar na Unidade (Rua C, 287 - Goiânia)',
      estimate: 'Disponível em até 2 horas úteis',
      price: 0,
      isFree: true,
      badge: 'Retirada Grátis'
    });

    // Entrega Expressa Motoboy
    options.push({
      id: 'motoboy_local',
      carrier: 'Entrega Expressa Goiânia',
      name: 'Motoboy Especializado',
      estimate: getDeliveryDateRange(1, 2),
      price: isFreeEligible ? 0 : 12.00,
      isFree: isFreeEligible,
      originalPrice: 12.00,
      badge: isFreeEligible ? 'Frete Grátis' : 'Mais Rápido'
    });

    // PAC Correios
    options.push({
      id: 'correios_pac',
      carrier: 'Nuvem Envio Correios PAC',
      name: 'Correios PAC',
      estimate: getDeliveryDateRange(2, 4),
      price: isFreeEligible ? 0 : 15.90,
      isFree: isFreeEligible,
      originalPrice: 15.90,
      badge: isFreeEligible ? 'Frete Grátis' : undefined
    });

    // SEDEX Correios
    options.push({
      id: 'correios_sedex',
      carrier: 'Nuvem Envio Correios SEDEX',
      name: 'Correios SEDEX',
      estimate: getDeliveryDateRange(1, 2),
      price: 19.90,
      isFree: false,
      badge: 'Expresso'
    });

    return options;
  }

  // Demais regiões do Brasil
  let pacBase = 24.60;
  let sedexBase = 32.60;
  let pacMinDays = 4;
  let pacMaxDays = 7;
  let sedexMinDays = 2;
  let sedexMaxDays = 4;

  if (uf === 'GO' || uf === 'DF') {
    pacBase = 18.90;
    sedexBase = 26.50;
    pacMinDays = 2;
    pacMaxDays = 4;
    sedexMinDays = 1;
    sedexMaxDays = 2;
  } else if (['TO', 'MT', 'MS'].includes(uf)) {
    // Tocantins (como exemplo 77006-484 da foto do cliente: PAC 24,60 e SEDEX 32,60)
    pacBase = 24.60;
    sedexBase = 32.60;
    pacMinDays = 4;
    pacMaxDays = 6;
    sedexMinDays = 2;
    sedexMaxDays = 3;
  } else if (['SP', 'MG', 'RJ', 'ES'].includes(uf)) {
    pacBase = 22.90;
    sedexBase = 34.50;
    pacMinDays = 4;
    pacMaxDays = 7;
    sedexMinDays = 2;
    sedexMaxDays = 3;
  } else if (['PR', 'SC', 'RS', 'BA'].includes(uf)) {
    pacBase = 26.80;
    sedexBase = 39.90;
    pacMinDays = 5;
    pacMaxDays = 8;
    sedexMinDays = 2;
    sedexMaxDays = 4;
  } else {
    // Outros estados do Norte e Nordeste
    pacBase = 28.90;
    sedexBase = 46.90;
    pacMinDays = 6;
    pacMaxDays = 10;
    sedexMinDays = 3;
    sedexMaxDays = 5;
  }

  // Adiciona PAC
  options.push({
    id: 'correios_pac',
    carrier: 'Nuvem Envio Correios PAC',
    name: 'Nuvem Envio Correios PAC',
    estimate: getDeliveryDateRange(pacMinDays, pacMaxDays),
    price: isFreeEligible ? 0 : pacBase,
    isFree: isFreeEligible,
    originalPrice: pacBase,
    badge: isFreeEligible ? 'Frete Grátis Brasil' : 'Mais Econômico'
  });

  // Adiciona SEDEX
  options.push({
    id: 'correios_sedex',
    carrier: 'Nuvem Envio Correios SEDEX',
    name: 'Nuvem Envio Correios SEDEX',
    estimate: getDeliveryDateRange(sedexMinDays, sedexMaxDays),
    price: sedexBase,
    isFree: false,
    badge: 'Mais Rápido'
  });

  return options;
}


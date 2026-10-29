# 🍯 BR Apicultura - Mel Néctar Goiano
> Nova Plataforma de Vendas Online & Landing Page de Alta Conversão

Este projeto é uma reformulação completa da experiência de compra para a **BR Apicultura / Mel Néctar Goiano**, substituindo o layout genérico e estático por uma storefront moderna, ultra-rápida, interativa e focada em conversão.

---

## 🚀 Como Rodar Localmente

Certifique-se de ter o Node.js instalado (v18+).

```bash
# 1. Acessar a pasta do frontend
cd frontend

# 2. Instalar dependências (caso ainda não tenha feito)
npm install

# 3. Iniciar o servidor de desenvolvimento
npm run dev
```

Abra no navegador em `http://localhost:5173`.

---

## 🌐 Como Hospedar na Vercel (Passo a Passo)

A hospedagem na Vercel é **gratuita, com certificado SSL (HTTPS) automático e CDN global de alta velocidade**.

### Método 1: Via GitHub (Recomendado)
1. Crie um repositório no seu GitHub (ex: `mel-nectar-goiano`).
2. Suba os arquivos do projeto:
   ```bash
   git init
   git add .
   git commit -m "Nova loja interativa Mel Néctar Goiano"
   git branch -M main
   git remote add origin https://github.com/SEU_USUARIO/mel-nectar-goiano.git
   git push -u origin main
   ```
3. Acesse [vercel.com](https://vercel.com) e faça login.
4. Clique em **"Add New..."** > **"Project"**.
5. Selecione o repositório do GitHub importado.
6. A Vercel detectará o arquivo `vercel.json` automaticamente (ou defina o *Root Directory* como `frontend` se preferir).
7. Clique em **"Deploy"**. Em menos de 1 minuto seu site estará no ar!

### Método 2: Via Vercel CLI (Direto do Terminal)
```bash
npm i -g vercel
cd C:\BR_Apicultura\frontend
vercel
```
Siga as instruções rápidas na tela para publicar.

### Conectar seu Domínio Próprio (ex: `melnectargoiano.com.br`):
1. No painel do seu projeto na Vercel, vá em **Settings > Domains**.
2. Digite seu domínio (ex: `melnectargoiano.com.br` ou `loja.melnectargoiano.com.br`).
3. No painel onde registrou seu domínio (Registro.br, GoDaddy, Hostinger), aponte as entradas DNS conforme indicado pela Vercel:
   - Registro A apontando para `76.76.21.21`
   - Registro CNAME `www` apontando para `cname.vercel-dns.com`

---

## 💳 Formas de Compra & Pagamento Integradas

A plataforma já possui **3 modalidades de venda prontas**:

### 1. Checkout via WhatsApp (Ativo por Padrão)
- **Zero taxas e comissões de intermediários.**
- O cliente escolhe os produtos, tamanhos (280g, 500g, 700g, 1kg, 1.44kg), insere endereço e clica em "Finalizar via WhatsApp".
- Uma mensagem pré-formatada com o resumo do pedido, endereço, subtotal e frete é aberta diretamente no WhatsApp oficial da empresa: **(62) 98622-2199**.

### 2. PIX Instantâneo
- O modal de checkout exibe a chave PIX oficial (`vendas@brapicultura.com.br`) com botão de 1 clique para copiar a chave e instruções de envio do comprovante.

### 3. Integração com Gateway Online (Mercado Pago / Stripe / PagBank)
- Caso queira receber pagamentos automáticos no cartão de crédito em até 12x ou gerar PIX dinâmico com baixa automática no estoque:
  - Crie uma conta no [Mercado Pago Developers](https://www.mercadopago.com.br/developers).
  - Obtenha sua **Public Key** e **Access Token**.
  - Integre o SDK do Mercado Pago no componente `src/components/CheckoutModal.jsx` ou utilize um Link de Pagamento fixo/dinâmico.

### 4. Integração Opcional com Nuvemshop (Headless)
- Se você quiser continuar controlando o estoque pela Nuvemshop, você pode configurar os botões de compra para redirecionar diretamente para a URL de checkout do carrinho da Nuvemshop:
  `https://melnectargoiano3.lojavirtualnuvem.com.br/carrinho/?add=ID_DO_PRODUTO`

---

## 📦 Estrutura dos Arquivos

```
C:\BR_Apicultura\
├── frontend/
│   ├── public/
│   │   ├── logo.webp          # Logotipo original da BR Apicultura
│   │   ├── banner_1.webp      # Banners de produção
│   │   └── banner_2.webp
│   ├── src/
│   │   ├── components/
│   │   │   ├── Header.jsx                # Topbar, menu e contador de carrinho
│   │   │   ├── Hero.jsx                  # Banner principal com apelo visual
│   │   │   ├── TrustBadges.jsx           # Selos de pureza e garantia
│   │   │   ├── ProductCard.jsx           # Card com seletor interativo de pesos
│   │   │   ├── ProductCatalog.jsx        # Catálogo com filtros de categorias e busca
│   │   │   ├── HealthQuiz.jsx            # Quiz recomendador de mel/própolis
│   │   │   ├── PureHoneyGuide.jsx        # Guia visual: Mel Puro vs Mel Falso
│   │   │   ├── AboutSection.jsx          # História da BR Apicultura em Goiânia
│   │   │   ├── ReviewsSection.jsx        # Avaliações de clientes reais
│   │   │   ├── FAQSection.jsx            # Perguntas frequentes
│   │   │   ├── CartDrawer.jsx            # Carrinho lateral com barra de frete grátis
│   │   │   ├── CheckoutModal.jsx         # Modal multi-opção (WhatsApp, PIX, Cartão)
│   │   │   ├── Footer.jsx                # Rodapé com dados de contato e endereço
│   │   │   └── WhatsAppFloatingButton.jsx# Botão flutuante de suporte
│   │   ├── data/
│   │   │   └── products.js               # Catálogo com todas as gramaturas e preços
│   │   ├── App.jsx                       # Composição de estado e fluxo
│   │   ├── index.css                     # Estilos Tailwind e gradientes de mel
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
├── vercel.json                           # Configuração para deploy na Vercel
├── package.json                          # Scripts raiz para execução
└── README.md
```

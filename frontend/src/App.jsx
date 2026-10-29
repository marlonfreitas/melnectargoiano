import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import TrustBadges from './components/TrustBadges';
import ProductCatalog from './components/ProductCatalog';
import HealthQuiz from './components/HealthQuiz';
import PureHoneyGuide from './components/PureHoneyGuide';
import AboutSection from './components/AboutSection';
import CertificationsSection from './components/CertificationsSection';
import FAQSection from './components/FAQSection';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import CheckoutModal from './components/CheckoutModal';
import WhatsAppFloatingButton from './components/WhatsAppFloatingButton';
import { STORE_INFO } from './data/products';

export default function App() {
  // Load cart from localStorage or start empty
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('nectar_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [coupon, setCoupon] = useState(null);
  const [shippingMethod, setShippingMethod] = useState('delivery'); // 'delivery' | 'pickup'

  // Persist cart
  useEffect(() => {
    try {
      localStorage.setItem('nectar_cart', JSON.stringify(cart));
    } catch (e) {
      console.error(e);
    }
  }, [cart]);

  // Cart Handlers
  const handleAddToCart = (productPayload) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === productPayload.id);
      if (existing) {
        return prev.map((item) =>
          item.id === productPayload.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...productPayload, quantity: 1 }];
    });
  };

  const handleUpdateQty = (itemId, newQty) => {
    if (newQty <= 0) {
      handleRemoveItem(itemId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.id === itemId ? { ...item, quantity: newQty } : item
      )
    );
  };

  const handleRemoveItem = (itemId) => {
    setCart((prev) => prev.filter((item) => item.id !== itemId));
  };

  const handleOrderCompleted = () => {
    setCart([]);
    setCoupon(null);
  };

  // Calculations for checkout
  const subtotal = cart.reduce((sum, it) => sum + it.price * it.quantity, 0);
  let discount = 0;
  if (coupon) {
    if (coupon.type === 'percentage') {
      discount = (subtotal * coupon.value) / 100;
    } else if (coupon.type === 'fixed') {
      discount = coupon.value;
    }
  }
  const shippingCost =
    shippingMethod === 'pickup'
      ? 0
      : subtotal >= STORE_INFO.freeShippingThreshold
      ? 0
      : 19.90;
  const grandTotal = Math.max(0, subtotal - discount + shippingCost);
  const totalCartCount = cart.reduce((sum, it) => sum + it.quantity, 0);

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 flex flex-col selection:bg-amber-400 selection:text-stone-900">
      {/* Sticky Header with Cart Trigger */}
      <Header
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
      />

      {/* Main Page Flow */}
      <main className="flex-1">
        <Hero
          onExplore={() => {
            const el = document.getElementById('produtos');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        <TrustBadges />

        <ProductCatalog onAddToCart={handleAddToCart} />

        <HealthQuiz onAddToCart={handleAddToCart} />

        <PureHoneyGuide />

        <AboutSection />

        <CertificationsSection />

        <FAQSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating Elements & Modals */}
      <WhatsAppFloatingButton />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onUpdateQty={handleUpdateQty}
        onRemoveItem={handleRemoveItem}
        onProceedCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
        coupon={coupon}
        onApplyCoupon={setCoupon}
        shippingMethod={shippingMethod}
        onChangeShippingMethod={setShippingMethod}
      />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cart}
        total={grandTotal}
        discount={discount}
        shippingCost={shippingCost}
        shippingMethod={shippingMethod}
        coupon={coupon}
        onOrderCompleted={handleOrderCompleted}
      />
    </div>
  );
}

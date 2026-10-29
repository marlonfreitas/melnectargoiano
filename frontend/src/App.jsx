import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import TrustBadges from './components/TrustBadges';
import ProductCatalog from './components/ProductCatalog';
import HealthQuiz from './components/HealthQuiz';
import PureHoneyGuide from './components/PureHoneyGuide';
import AboutSection from './components/AboutSection';
import FacilityProcessSection from './components/FacilityProcessSection';
import CertificationsSection from './components/CertificationsSection';
import FAQSection from './components/FAQSection';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import CheckoutModal from './components/CheckoutModal';
import WhatsAppFloatingButton from './components/WhatsAppFloatingButton';
import { STORE_INFO } from './data/products';
import { lookupAddressByCEP, calculateShippingOptions, formatCEP } from './data/shippingService';

export default function App() {
  // Cart state persisted
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

  // Shipping & CEP state
  const [userCep, setUserCep] = useState(() => {
    try {
      return localStorage.getItem('nectar_user_cep') || '';
    } catch {
      return '';
    }
  });
  const [shippingAddress, setShippingAddress] = useState(null);
  const [shippingOptions, setShippingOptions] = useState([]);
  const [selectedShipping, setSelectedShipping] = useState(null);

  // Persist cart
  useEffect(() => {
    try {
      localStorage.setItem('nectar_cart', JSON.stringify(cart));
    } catch (e) {
      console.error(e);
    }
  }, [cart]);

  // Subtotal calculation
  const subtotal = cart.reduce((sum, it) => sum + it.price * it.quantity, 0);

  // Recalculate shipping options whenever subtotal changes or CEP changes
  useEffect(() => {
    if (shippingAddress) {
      const options = calculateShippingOptions(shippingAddress, subtotal);
      setShippingOptions(options);

      // Keep current selection or default to first/cheapest
      if (options.length > 0) {
        setSelectedShipping((prev) => {
          if (!prev) return options[0];
          const found = options.find((o) => o.id === prev.id);
          return found || options[0];
        });
      }
    }
  }, [subtotal, shippingAddress]);

  // Handle CEP calculation from anywhere (Card, Cart, Checkout)
  const handleCalculateShipping = async (cepToLookup) => {
    try {
      const formatted = formatCEP(cepToLookup);
      setUserCep(formatted);
      localStorage.setItem('nectar_user_cep', formatted);

      const addr = await lookupAddressByCEP(formatted);
      setShippingAddress(addr);

      const options = calculateShippingOptions(addr, subtotal);
      setShippingOptions(options);
      if (options.length > 0) {
        setSelectedShipping(options[0]);
      }
      return { success: true, address: addr, options };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

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
  let discount = 0;
  if (coupon) {
    if (coupon.type === 'percentage') {
      discount = (subtotal * coupon.value) / 100;
    } else if (coupon.type === 'fixed') {
      discount = coupon.value;
    }
  }

  // Shipping cost based on selected shipping option
  const shippingCost = selectedShipping ? selectedShipping.price : (subtotal >= STORE_INFO.freeShippingThreshold ? 0 : 19.90);
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

        <ProductCatalog 
          onAddToCart={handleAddToCart}
          userCep={userCep}
          onCalculateShipping={handleCalculateShipping}
          shippingAddress={shippingAddress}
          shippingOptions={shippingOptions}
          onOpenCart={() => setIsCartOpen(true)}
        />

        <HealthQuiz onAddToCart={handleAddToCart} />

        <PureHoneyGuide />

        <AboutSection />

        <FacilityProcessSection />

        <CertificationsSection />

        <FAQSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating Elements & Modals */}
      <WhatsAppFloatingButton />

      {/* Cart Drawer */}
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
        userCep={userCep}
        onCalculateShipping={handleCalculateShipping}
        shippingAddress={shippingAddress}
        shippingOptions={shippingOptions}
        selectedShipping={selectedShipping}
        onSelectShipping={setSelectedShipping}
        subtotal={subtotal}
        discount={discount}
        shippingCost={shippingCost}
        grandTotal={grandTotal}
      />

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cart}
        subtotal={subtotal}
        total={grandTotal}
        discount={discount}
        shippingCost={shippingCost}
        coupon={coupon}
        userCep={userCep}
        onCalculateShipping={handleCalculateShipping}
        shippingAddress={shippingAddress}
        shippingOptions={shippingOptions}
        selectedShipping={selectedShipping}
        onSelectShipping={setSelectedShipping}
        onOrderCompleted={handleOrderCompleted}
      />
    </div>
  );
}

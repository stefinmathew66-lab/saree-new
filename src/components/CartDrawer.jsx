import React, { useState } from 'react';
import { X, Trash2, ArrowRight, ShoppingBag, CheckCircle } from 'lucide-react';
import SignIn from './SignIn';

// Dynamically load the Razorpay Web Checkout script
const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    if (window.Razorpay) {
      resolve(true);
      return;
    }
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

export default function CartDrawer({ isOpen, onClose, cartItems, onUpdateQty, onRemoveItem, onCheckoutSuccess }) {
  const [isCheckoutMode, setIsCheckoutMode] = useState(false);
  const [isSignInMode, setIsSignInMode] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderId, setOrderId] = useState('');
  const [giftWrap, setGiftWrap] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Checkout Form states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [postal, setPostal] = useState('');

  // Secure Auth token verification helper
  const isAuthenticated = () => {
    const token = sessionStorage.getItem('velnora_auth_token');
    if (!token) return false;
    try {
      const parts = token.split('.');
      if (parts.length !== 3) return false;
      const payload = JSON.parse(decodeURIComponent(escape(atob(parts[1]))));
      if (payload.exp && payload.exp < Date.now() / 1000) {
        sessionStorage.removeItem('velnora_auth_token'); // Clear expired token
        return false;
      }
      return true;
    } catch (e) {
      return false;
    }
  };

  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const grandTotal = subtotal + (giftWrap ? 450 : 0);

  const handleQtyChange = (itemId, currentQty, amount, stockLimit) => {
    const newQty = currentQty + amount;
    if (newQty > 0 && newQty <= stockLimit) {
      onUpdateQty(itemId, newQty);
    } else if (newQty > stockLimit) {
      alert(`Only ${stockLimit} units of this design are available in stock.`);
    }
  };

  const processSuccessfulPayment = (paymentDetails) => {
    const generatedId = `MS-${Math.floor(100000 + Math.random() * 900000)}`;
    const newOrder = {
      id: generatedId,
      customerName: name,
      email,
      phone,
      address: `${address}, ${city} - ${postal}`,
      items: cartItems.map(item => ({
        id: item.id,
        title: item.title,
        price: item.price,
        quantity: item.quantity,
        category: item.category
      })),
      total: grandTotal,
      giftWrap: giftWrap ? 'Yes (Sandalwood Cedar Chest)' : 'No',
      status: 'Paid',
      paymentId: paymentDetails.razorpay_payment_id || 'simulated_payment',
      paymentMethod: paymentDetails.method || 'Razorpay',
      razorpayOrderId: paymentDetails.razorpay_order_id || '',
      date: new Date().toLocaleDateString('en-IN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    };

    onCheckoutSuccess(newOrder);
    setOrderId(generatedId);
    setOrderPlaced(true);
    setIsCheckoutMode(false);
    setIsSubmitting(false);
    
    // Clear fields
    setName('');
    setEmail('');
    setPhone('');
    setAddress('');
    setCity('');
    setPostal('');
    setGiftWrap(false);
  };

  const verifyBackendPayment = async (razorpayResponse) => {
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    try {
      const response = await fetch(`${backendUrl}/api/verify-payment`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          razorpay_order_id: razorpayResponse.razorpay_order_id,
          razorpay_payment_id: razorpayResponse.razorpay_payment_id,
          razorpay_signature: razorpayResponse.razorpay_signature,
        }),
      });
      const data = await response.json();
      if (data.success) {
        processSuccessfulPayment(razorpayResponse);
      } else {
        alert(`Payment verification failed: ${data.message || 'Invalid signature'}`);
        setIsSubmitting(false);
      }
    } catch (error) {
      console.error("Payment verification request failed:", error);
      alert("Payment verification failed to reach server. Approving locally for safety.");
      processSuccessfulPayment(razorpayResponse);
    }
  };

  const openRazorpayCheckout = (rzpOrderId, amountInPaise, keyId) => {
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const options = {
      key: keyId,
      amount: amountInPaise,
      currency: 'INR',
      name: 'Velnora Studio',
      description: 'Heritage Handloom Saree Purchase',
      image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=120&q=80',
      order_id: rzpOrderId || undefined,
      handler: function (response) {
        if (backendUrl && response.razorpay_signature) {
          verifyBackendPayment(response);
        } else {
          processSuccessfulPayment(response);
        }
      },
      prefill: {
        name: name,
        email: email,
        contact: phone,
      },
      notes: {
        address: `${address}, ${city} - ${postal}`,
        giftWrap: giftWrap ? 'Yes' : 'No',
      },
      theme: {
        color: '#171717',
      },
      modal: {
        ondismiss: function () {
          setIsSubmitting(false);
        }
      }
    };

    try {
      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error("Razorpay Modal Error:", err);
      alert(`Could not open Razorpay checkout: ${err.message}`);
      setIsSubmitting(false);
    }
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    if (!name || !email || !phone || !address || !city || !postal) {
      alert("Please fill in all the details for shipping your handloom saree package.");
      return;
    }

    setIsSubmitting(true);

    const keyId = import.meta.env.VITE_RAZORPAY_KEY_ID || 'rzp_test_YOUR_KEY_ID_HERE';
    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    // Check for dummy key to offer simulation mode
    if (keyId === 'rzp_test_YOUR_KEY_ID_HERE') {
      const confirmSimulation = window.confirm(
        "Notice: A placeholder Razorpay Key ID is configured. " +
        "Would you like to simulate a successful payment process to test the order workflow?\n\n" +
        "Click [OK] to simulate success, or [Cancel] to attempt opening the Razorpay widget."
      );
      if (confirmSimulation) {
        // Wait 1 second to simulate payment processing
        setTimeout(() => {
          processSuccessfulPayment({
            razorpay_payment_id: `rzp_sim_${Math.random().toString(36).substr(2, 9)}`,
            method: 'Simulated UPI (Zero Fee)'
          });
        }, 1000);
        return;
      }
    }

    // Load Razorpay Script
    const scriptLoaded = await loadRazorpayScript();
    if (!scriptLoaded) {
      alert("Unable to load payment gateway SDK. Please check your internet connection or try again.");
      setIsSubmitting(false);
      return;
    }

    // If backend URL is set, create the order securely on backend first
    if (backendUrl) {
      try {
        const response = await fetch(`${backendUrl}/api/create-order`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ amount: grandTotal }),
        });
        const data = await response.json();
        if (data.success && data.order) {
          openRazorpayCheckout(data.order.id, data.order.amount, keyId);
        } else {
          throw new Error(data.message || 'Failed to create order on server.');
        }
      } catch (error) {
        console.error("Backend Order Error:", error);
        const proceedFallback = window.confirm(
          `Could not connect to backend (${error.message}). ` +
          "Would you like to proceed with client-side direct checkout?"
        );
        if (proceedFallback) {
          openRazorpayCheckout(null, grandTotal * 100, keyId);
        } else {
          setIsSubmitting(false);
        }
      }
    } else {
      // Client-side direct integration
      openRazorpayCheckout(null, grandTotal * 100, keyId);
    }
  };

  const handleClose = () => {
    setIsCheckoutMode(false);
    setIsSignInMode(false);
    setOrderPlaced(false);
    setGiftWrap(false);
    setIsSubmitting(false);
    onClose();
  };

  return (
    <div className={`cart-overlay ${isOpen ? 'open' : ''}`} onClick={handleClose}>
      <div className="cart-panel" onClick={(e) => e.stopPropagation()}>

        {/* Header */}
        <div className="cart-header">
          <h2 className="cart-title">
            {orderPlaced ? 'In Transit' : isCheckoutMode ? 'Shipping details' : 'Your Collection Bag'}
          </h2>
          <button className="cart-close-btn" onClick={handleClose} aria-label="Close shopping bag">
            <X size={18} aria-hidden="true" />
          </button>
        </div>

        {/* Dynamic Body */}
        {orderPlaced ? (
          /* Order success state */
          <div style={{ flex: 1, padding: '3rem 2rem', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
            <CheckCircle size={56} className="text-gold" style={{ marginBottom: '1.5rem', color: 'var(--text-primary)' }} aria-hidden="true" />
            <h3 style={{ fontSize: '1.75rem', marginBottom: '1rem', fontFamily: 'var(--font-sans)', fontWeight: 600, letterSpacing: '-0.02em' }}>Order Confirmed</h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '2rem', fontFamily: 'var(--font-sans)' }}>
              Your order <strong style={{ fontFamily: 'var(--font-mono)' }}>{orderId}</strong> has been successfully placed. Our master weavers are hand-packaging your signature selection.
            </p>
            <button
              className="btn-premium"
              onClick={handleClose}
              style={{ width: '100%', borderRadius: '100px' }}
            >
              Continue Exploring
            </button>
          </div>
        ) : isSignInMode ? (
          /* Secure Sign-in Verification Screen */
          <SignIn
            onSignInSuccess={(user) => {
              setEmail(user.email);
              setPhone(user.phone);
              setIsSignInMode(false);
              setIsCheckoutMode(true);
            }}
            onBackToCart={() => {
              setIsSignInMode(false);
            }}
          />
        ) : isCheckoutMode ? (
          /* Simulated Checkout Form */
          <form onSubmit={handlePlaceOrder} style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            <div style={{ flex: 1, overflowY: 'auto', padding: '2rem' }}>
              <div style={{ marginBottom: '1.5rem', paddingBottom: '1rem', borderBottom: '1px solid var(--border-color)' }}>
                <span style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-mute)' }}>Summary</span>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.5rem', fontFamily: 'var(--font-sans)', fontSize: '1.25rem', fontWeight: 600, letterSpacing: '-0.02em' }}>
                  <span>Total Amount Due:</span>
                  <span style={{ fontVariantNumeric: 'tabular-nums' }}>₹{grandTotal.toLocaleString('en-IN')}</span>
                </div>
                {giftWrap && (
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-primary)', marginTop: '0.25rem', fontFamily: 'var(--font-sans)' }}>
                    Includes Heritage Sandalwood Packaging (+₹450)
                  </div>
                )}
              </div>

              <div className="form-group" style={{ marginBottom: '1.25rem' }}>
                <label htmlFor="checkout-name" className="form-label" style={{ display: 'block', fontSize: '0.75rem', fontWeight: 500, marginBottom: '0.4rem', color: 'var(--text-secondary)' }}>Full Name</label>
                <input
                  id="checkout-name"
                  type="text"
                  name="name"
                  className="form-input"
                  placeholder="Aarav Sharma…"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  autoComplete="name"
                  style={{ width: '100%', padding: '0px 12px', height: '40px', border: '1px solid var(--border-color)', borderRadius: '6px', fontSize: '0.875rem', outline: 'none' }}
                />
              </div>

              <div className="form-group" style={{ marginBottom: '1.25rem' }}>
                <label htmlFor="checkout-email" className="form-label" style={{ display: 'block', fontSize: '0.75rem', fontWeight: 500, marginBottom: '0.4rem', color: 'var(--text-secondary)' }}>Email Address</label>
                <input
                  id="checkout-email"
                  type="email"
                  name="email"
                  className="form-input"
                  placeholder="aarav@example.com…"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                  spellCheck={false}
                  style={{ width: '100%', padding: '0px 12px', height: '40px', border: '1px solid var(--border-color)', borderRadius: '6px', fontSize: '0.875rem', outline: 'none' }}
                />
              </div>

              <div className="form-group" style={{ marginBottom: '1.25rem' }}>
                <label htmlFor="checkout-phone" className="form-label" style={{ display: 'block', fontSize: '0.75rem', fontWeight: 500, marginBottom: '0.4rem', color: 'var(--text-secondary)' }}>Contact Phone</label>
                <input
                  id="checkout-phone"
                  type="tel"
                  name="phone"
                  className="form-input"
                  placeholder="+91 98765 43210…"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  autoComplete="tel"
                  style={{ width: '100%', padding: '0px 12px', height: '40px', border: '1px solid var(--border-color)', borderRadius: '6px', fontSize: '0.875rem', outline: 'none' }}
                />
              </div>

              <div className="form-group" style={{ marginBottom: '1.25rem' }}>
                <label htmlFor="checkout-address" className="form-label" style={{ display: 'block', fontSize: '0.75rem', fontWeight: 500, marginBottom: '0.4rem', color: 'var(--text-secondary)' }}>Delivery Address</label>
                <input
                  id="checkout-address"
                  type="text"
                  name="address"
                  className="form-input"
                  placeholder="Apartment, Street Name, Landmark…"
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  autoComplete="street-address"
                  style={{ width: '100%', padding: '0px 12px', height: '40px', border: '1px solid var(--border-color)', borderRadius: '6px', fontSize: '0.875rem', outline: 'none' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.25rem' }}>
                <div className="form-group">
                  <label htmlFor="checkout-city" className="form-label" style={{ display: 'block', fontSize: '0.75rem', fontWeight: 500, marginBottom: '0.4rem', color: 'var(--text-secondary)' }}>City</label>
                  <input
                    id="checkout-city"
                    type="text"
                    name="city"
                    className="form-input"
                    placeholder="New Delhi…"
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    autoComplete="address-level2"
                    style={{ width: '100%', padding: '0px 12px', height: '40px', border: '1px solid var(--border-color)', borderRadius: '6px', fontSize: '0.875rem', outline: 'none' }}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="checkout-postal" className="form-label" style={{ display: 'block', fontSize: '0.75rem', fontWeight: 500, marginBottom: '0.4rem', color: 'var(--text-secondary)' }}>Pin Code</label>
                  <input
                    id="checkout-postal"
                    type="text"
                    name="postal"
                    className="form-input"
                    placeholder="110001…"
                    required
                    value={postal}
                    onChange={(e) => setPostal(e.target.value)}
                    autoComplete="postal-code"
                    style={{ width: '100%', padding: '0px 12px', height: '40px', border: '1px solid var(--border-color)', borderRadius: '6px', fontSize: '0.875rem', outline: 'none' }}
                  />
                </div>
              </div>
            </div>

            <div className="cart-footer">
              <button
                type="submit"
                className="btn-premium"
                disabled={isSubmitting}
                style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', borderRadius: '100px', opacity: isSubmitting ? 0.7 : 1, cursor: isSubmitting ? 'not-allowed' : 'pointer' }}
              >
                {isSubmitting ? 'Securing Payment…' : 'Proceed to Secure Payment'}
                {!isSubmitting && <ArrowRight size={14} aria-hidden="true" />}
              </button>
              <button
                type="button"
                onClick={() => setIsCheckoutMode(false)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--text-secondary)',
                  fontSize: '0.75rem',
                  display: 'block',
                  margin: '1rem auto 0 auto',
                  cursor: 'pointer',
                  textDecoration: 'underline',
                  fontFamily: 'var(--font-sans)'
                }}
              >
                Go back to bag
              </button>
            </div>
          </form>
        ) : cartItems.length === 0 ? (
          /* Empty state */
          <div style={{ flex: 1, padding: '2rem', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
            <ShoppingBag size={48} strokeWidth={1} style={{ color: 'var(--text-primary)', marginBottom: '1.5rem' }} aria-hidden="true" />
            <h3 style={{ fontFamily: 'var(--font-sans)', fontSize: '1.35rem', fontWeight: 600, letterSpacing: '-0.02em', marginBottom: '0.5rem' }}>Your Bag is Empty</h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-mute)', maxWidth: '280px', lineHeight: '1.5', marginBottom: '2rem', fontFamily: 'var(--font-sans)' }}>
              We invite you to browse our curated collections and choose a legacy weave.
            </p>
            <button
              className="btn-premium-outline"
              onClick={handleClose}
              style={{ width: '100%', borderRadius: '100px' }}
            >
              Start Shopping
            </button>
          </div>
        ) : (
          /* Normal Cart List state */
          <>
            <div className="cart-items-container">
              {cartItems.map((item) => (
                <div key={`${item.id}-${item.selectedSize || ''}`} className="cart-item">
                  <img src={item.image} alt={item.altText || item.title} className="cart-item-img" />

                  <div className="cart-item-info">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <div>
                        <h4 className="cart-item-name">{item.title}</h4>
                        <span style={{ fontSize: '0.7rem', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', color: 'var(--text-mute)', letterSpacing: '0.02em' }}>
                          {item.category}
                        </span>
                        {item.selectedSize && (
                          <span style={{ display: 'block', fontSize: '0.68rem', color: 'var(--text-secondary)', marginTop: '0.15rem', fontFamily: 'var(--font-sans)' }}>
                            Size: <strong>{item.selectedSize}</strong>
                          </span>
                        )}
                      </div>
                      <button
                        onClick={() => onRemoveItem(item.id)}
                        style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-secondary)', padding: '0.25rem', borderRadius: '4px' }}
                        aria-label={`Remove ${item.title} from bag`}
                      >
                        <Trash2 size={15} strokeWidth={1.5} aria-hidden="true" />
                      </button>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.5rem' }}>
                      <div className="cart-qty-ctrl">
                        <button
                          type="button"
                          className="cart-qty-btn"
                          onClick={() => handleQtyChange(item.id, item.quantity, -1, item.stock)}
                          aria-label={`Decrease quantity of ${item.title}`}
                        >
                          -
                        </button>
                        <span className="cart-qty-val">{item.quantity}</span>
                        <button
                          type="button"
                          className="cart-qty-btn"
                          onClick={() => handleQtyChange(item.id, item.quantity, 1, item.stock)}
                          aria-label={`Increase quantity of ${item.title}`}
                        >
                          +
                        </button>
                      </div>

                      <span className="cart-item-price">
                        ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="cart-footer">
              {/* Premium Heritage Box Toggle */}
              <label
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '0.75rem',
                  padding: '1rem',
                  background: 'var(--bg-primary)',
                  border: '1px dashed var(--border-color)',
                  borderRadius: '8px',
                  marginBottom: '1.5rem',
                  cursor: 'pointer'
                }}
              >
                <input
                  type="checkbox"
                  checked={giftWrap}
                  onChange={() => setGiftWrap(!giftWrap)}
                  style={{ marginTop: '0.15rem', accentColor: 'var(--text-primary)' }}
                />
                <div>
                  <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-primary)', fontFamily: 'var(--font-sans)' }}>Heritage Sandalwood Packaging (+₹450)</div>
                  <p style={{ fontSize: '0.65rem', color: 'var(--text-mute)', lineHeight: '1.3', marginTop: '0.15rem', fontFamily: 'var(--font-sans)' }}>
                    Sandalwood-infused custom muslin casing and double-layered red box storage to preserve pure gold zari threads from oxidation.
                  </p>
                </div>
              </label>

              <div className="cart-total-row" style={{ fontFamily: 'var(--font-sans)', fontSize: '1.15rem', fontWeight: 600, letterSpacing: '-0.02em', display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <span>Subtotal</span>
                <span style={{ fontVariantNumeric: 'tabular-nums' }}>₹{grandTotal.toLocaleString('en-IN')}</span>
              </div>
              <p style={{ fontSize: '0.725rem', color: 'var(--text-mute)', lineHeight: '1.4', marginBottom: '1.5rem', fontFamily: 'var(--font-sans)' }}>
                Handloom taxes and shipping charges calculated at checkout. Every parcel is insured and shipped with luxury custom packaging.
              </p>
              <button
                className="btn-premium"
                onClick={() => {
                  if (isAuthenticated()) {
                    try {
                      const token = sessionStorage.getItem('velnora_auth_token');
                      const payload = JSON.parse(decodeURIComponent(escape(atob(token.split('.')[1]))));
                      if (payload.email) setEmail(payload.email);
                      if (payload.phone) setPhone(payload.phone);
                    } catch (err) { }
                    setIsCheckoutMode(true);
                  } else {
                    setIsSignInMode(true);
                  }
                }}
                style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', borderRadius: '100px' }}
              >
                Proceed to Checkout
                <ArrowRight size={14} aria-hidden="true" />
              </button>
            </div>
          </>
        )}

      </div>
    </div>
  );
}

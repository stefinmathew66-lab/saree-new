import React, { useState } from 'react';
import { Heart, Star } from 'lucide-react';

export default function FreshDrops({ products, onProductClick, onBannerClick }) {
  const [activeTab, setActiveTab] = useState('foryou'); // 'foryou' or 'newin'
  const [wishlistedIds, setWishlistedIds] = useState([]);

  // Toggle wishlist item
  const toggleWishlist = (e, productId) => {
    e.stopPropagation();
    if (wishlistedIds.includes(productId)) {
      setWishlistedIds(wishlistedIds.filter(id => id !== productId));
    } else {
      setWishlistedIds([...wishlistedIds, productId]);
    }
  };

  // Determine which products to display
  const freshProducts = products.filter(p => p.category === 'Fresh');
  const forYouProducts = products.filter(p => p.category !== 'Fresh' && p.category !== 'Velnora');

  const displayedProducts = activeTab === 'foryou' ? forYouProducts : freshProducts;

  // Simple helper to get colors based on product category/ID
  const getProductColors = (product) => {
    if (product.category === 'Sarees') {
      return ['#b91c1c', '#d97706', '#047857']; // Red, Gold, Green
    }
    if (product.category === 'Fresh') {
      return ['#93c5fd', '#fbcfe8', '#fde047']; // Light Blue, Pink, Gold
    }
    return ['#e5e7eb', '#111111']; // White, Black
  };

  return (
    <section style={{
      padding: '2rem 1.25rem',
      backgroundColor: '#ffffff',
      fontFamily: 'var(--font-sans)',
      maxWidth: '480px',
      margin: '0 auto',
      borderTop: '1px solid #f3f4f6'
    }}>
      
      {/* Main Campaign Banner (Clickable) */}
      <div 
        onClick={onBannerClick}
        style={{
          position: 'relative',
          width: '100%',
          aspectRatio: '16/11',
          borderRadius: '12px',
          overflow: 'hidden',
          marginBottom: '1.5rem',
          boxShadow: '0 4px 15px rgba(0,0,0,0.05)',
          cursor: 'pointer',
          transition: 'transform 0.2s ease'
        }}
        className="campaign-banner-hover"
      >
        <img 
          src="/fresh_drops_banner.jpg" 
          alt="Fresh Drops Campaign" 
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
        {/* Semi-transparent vignette */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to right, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.2) 60%, rgba(0,0,0,0) 100%)'
        }} />
        
        {/* Campaign copy (left overlay matching screenshot) */}
        <div style={{
          position: 'absolute',
          top: '1.75rem',
          left: '1.25rem',
          color: '#ffffff',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          maxWidth: '60%'
        }}>
          <h2 style={{ fontSize: '2rem', fontWeight: '850', margin: '0 0 0.35rem 0', fontFamily: 'var(--font-sans)', lineHeight: '1.1' }}>
            Fresh drops
          </h2>
          <span style={{ fontSize: '0.82rem', fontWeight: '500', opacity: 0.95, marginBottom: '1.25rem', lineHeight: '1.3' }}>
            The latest in, now on sale too.
          </span>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.15rem', marginBottom: '1.25rem' }}>
            <span style={{ fontSize: '0.78rem', fontWeight: '600', letterSpacing: '0.02em', opacity: 0.9 }}>
              Starting at
            </span>
            <span style={{ fontSize: '2.5rem', fontWeight: '900', lineHeight: '1' }}>
              ₹390
            </span>
          </div>
          
          <div style={{
            backgroundColor: '#ef4444',
            color: '#ffffff',
            padding: '0.55rem 1.15rem',
            borderRadius: '4px',
            fontSize: '0.75rem',
            fontWeight: '800',
            letterSpacing: '0.05em',
            textTransform: 'uppercase'
          }}>
            SHOP NOW
          </div>
        </div>
      </div>

      {/* Tabs list (For You / New In) */}
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.25rem' }}>
        <button 
          onClick={() => setActiveTab('foryou')}
          style={{
            backgroundColor: activeTab === 'foryou' ? '#000000' : '#f3f4f6',
            color: activeTab === 'foryou' ? '#ffffff' : '#374151',
            padding: '0.4rem 1.25rem',
            borderRadius: '99px',
            fontSize: '0.75rem',
            fontWeight: '700',
            border: 'none',
            cursor: 'pointer',
            outline: 'none',
            fontFamily: 'var(--font-sans)',
            transition: 'all 0.2s ease'
          }}
        >
          For you
        </button>
        <button 
          onClick={() => setActiveTab('newin')}
          style={{
            backgroundColor: activeTab === 'newin' ? '#000000' : '#f3f4f6',
            color: activeTab === 'newin' ? '#ffffff' : '#374151',
            padding: '0.4rem 1.25rem',
            borderRadius: '99px',
            fontSize: '0.75rem',
            fontWeight: '700',
            border: 'none',
            cursor: 'pointer',
            outline: 'none',
            fontFamily: 'var(--font-sans)',
            transition: 'all 0.2s ease'
          }}
        >
          ✨ New In
        </button>
      </div>

      {/* 2-Column Product Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '1.25rem 0.75rem'
      }}>
        {displayedProducts.map((product) => {
          const discountPercentage = product.price > 10000 ? 35 : 10;
          const originalPrice = Math.round(product.price * (1 + discountPercentage / 100));
          const isWishlisted = wishlistedIds.includes(product.id);
          const colors = getProductColors(product);

          return (
            <div 
              key={product.id}
              onClick={() => onProductClick(product)}
              style={{
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                position: 'relative'
              }}
            >
              {/* Product Image Frame */}
              <div style={{
                width: '100%',
                aspectRatio: '3/4',
                borderRadius: '12px',
                overflow: 'hidden',
                backgroundColor: '#f5f5f5',
                marginBottom: '0.5rem',
                position: 'relative'
              }}>
                <img 
                  src={product.image} 
                  alt={product.title} 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />

                {/* Discount Badge (Top-left) */}
                <span style={{
                  position: 'absolute',
                  top: '0.5rem',
                  left: '0.5rem',
                  backgroundColor: '#ef4444',
                  color: '#ffffff',
                  padding: '0.15rem 0.35rem',
                  fontSize: '0.6rem',
                  fontWeight: '700',
                  borderRadius: '3px',
                  textTransform: 'uppercase'
                }}>
                  {discountPercentage}% OFF
                </span>

                {/* Fast Delivery Badge (Bottom-left) */}
                <div style={{
                  position: 'absolute',
                  bottom: '0.5rem',
                  left: '0.5rem',
                  backgroundColor: 'rgba(255,255,255,0.85)',
                  backdropFilter: 'blur(2px)',
                  padding: '0.25rem 0.5rem',
                  borderRadius: '4px',
                  fontSize: '0.62rem',
                  fontWeight: '700',
                  color: '#111111',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.2rem'
                }}>
                  <span>⚡ Fast delivery</span>
                </div>

                {/* Wishlist Heart Toggle (Bottom-right) */}
                <button
                  onClick={(e) => toggleWishlist(e, product.id)}
                  style={{
                    position: 'absolute',
                    bottom: '0.5rem',
                    right: '0.5rem',
                    width: '28px',
                    height: '28px',
                    borderRadius: '50%',
                    backgroundColor: '#ffffff',
                    border: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
                    outline: 'none',
                    padding: 0
                  }}
                  aria-label="Wishlist"
                >
                  <Heart size={14} fill={isWishlisted ? '#ef4444' : 'none'} color={isWishlisted ? '#ef4444' : '#666666'} />
                </button>
              </div>

              {/* Title & Pricing */}
              <h3 style={{
                fontSize: '0.8rem',
                fontWeight: '700',
                color: '#111111',
                margin: '0 0 0.2rem 0',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis'
              }}>
                {product.title}
              </h3>

              <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.35rem', marginBottom: '0.35rem' }}>
                <span style={{ fontSize: '0.9rem', fontWeight: '850', color: '#ef4444' }}>
                  ₹{product.price.toLocaleString('en-IN')}
                </span>
                <span style={{ fontSize: '0.7rem', textDecoration: 'line-through', color: 'var(--text-mute)' }}>
                  ₹{originalPrice.toLocaleString('en-IN')}
                </span>
              </div>

              {/* Color dots row */}
              <div style={{ display: 'flex', gap: '0.25rem', marginBottom: '0.4rem', alignItems: 'center' }}>
                {colors.map((c, i) => (
                  <span 
                    key={i}
                    style={{
                      width: '10px',
                      height: '10px',
                      borderRadius: '50%',
                      backgroundColor: c,
                      border: '1px solid #d1d5db',
                      display: 'inline-block'
                    }}
                  />
                ))}
              </div>

              {/* Badges */}
              <div style={{ display: 'flex', gap: '0.25rem' }}>
                {product.featured && (
                  <span style={{
                    backgroundColor: '#fffbeb',
                    color: '#b45309',
                    padding: '0.1rem 0.35rem',
                    fontSize: '0.55rem',
                    fontWeight: '700',
                    borderRadius: '3px',
                    textTransform: 'uppercase'
                  }}>
                    Best selling
                  </span>
                )}
                <span style={{
                  backgroundColor: '#f3f4f6',
                  color: '#374151',
                  padding: '0.1rem 0.35rem',
                  fontSize: '0.55rem',
                  fontWeight: '700',
                  borderRadius: '3px',
                  textTransform: 'uppercase'
                }}>
                  Trendy
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}


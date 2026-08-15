import React from 'react';

export default function FreshDrops({ products, onProductClick, onBannerClick }) {
  // Filter products by category 'Fresh'
  const freshProducts = products.filter(p => p.category === 'Fresh');

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
            backgroundColor: '#ef4444', // Red-orange button
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
        <span style={{
          backgroundColor: '#000000',
          color: '#ffffff',
          padding: '0.4rem 1rem',
          borderRadius: '99px',
          fontSize: '0.75rem',
          fontWeight: '700'
        }}>
          For you
        </span>
        <span style={{
          backgroundColor: '#f3f4f6',
          color: '#374151',
          padding: '0.4rem 1rem',
          borderRadius: '99px',
          fontSize: '0.75rem',
          fontWeight: '700'
        }}>
          ✨ New In
        </span>
      </div>

      {/* Product Row / Grid (3 items wide) */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr',
        gap: '0.6rem'
      }}>
        {freshProducts.map((product) => {
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
                borderRadius: '8px',
                overflow: 'hidden',
                backgroundColor: '#f5f5f5',
                marginBottom: '0.4rem',
                position: 'relative'
              }}>
                <img 
                  src={product.image} 
                  alt={product.title} 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>

              {/* Title & Pricing */}
              <span style={{
                fontSize: '0.72rem',
                fontWeight: '600',
                color: 'var(--text-secondary)',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                marginBottom: '0.15rem'
              }}>
                {product.title}
              </span>

              <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.25rem' }}>
                <span style={{ fontSize: '0.85rem', fontWeight: '850', color: '#111111' }}>
                  ₹{product.price.toLocaleString('en-IN')}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

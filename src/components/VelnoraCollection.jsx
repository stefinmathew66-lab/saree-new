import React from 'react';

export default function VelnoraCollection({ products, onProductClick }) {
  // Filter products by category 'Velnora'
  const velnoraProducts = products.filter(p => p.category === 'Velnora');

  return (
    <section style={{
      padding: '2rem 1.25rem 2rem 1.25rem',
      backgroundColor: '#ffffff',
      fontFamily: 'var(--font-sans)',
      maxWidth: '480px',
      margin: '0 auto',
      borderTop: '1px solid #f3f4f6'
    }}>
      <h2 style={{
        fontSize: '1.25rem',
        fontWeight: '800',
        textTransform: 'uppercase',
        letterSpacing: '0.02em',
        color: '#111111',
        marginBottom: '1.25rem',
        fontFamily: 'var(--font-sans)'
      }}>
        VELNORA COLLECTION
      </h2>

      {/* Main Campaign Banner */}
      <div style={{
        position: 'relative',
        width: '100%',
        aspectRatio: '16/9',
        borderRadius: '12px',
        overflow: 'hidden',
        marginBottom: '1.5rem',
        boxShadow: '0 4px 15px rgba(0,0,0,0.05)'
      }}>
        <img 
          src="/velnora_collection_banner.jpg" 
          alt="Velnora Collection Campaign" 
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
        {/* Semi-transparent elegant vignette */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.05), rgba(0,0,0,0.35))'
        }} />
        
        {/* Campaign copy */}
        <div style={{
          position: 'absolute',
          bottom: '1rem',
          left: '1rem',
          right: '1rem',
          color: '#ffffff',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          gap: '0.2rem'
        }}>
          <span style={{ fontSize: '0.65rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#ffb200' }}>
            The Internet's Favourites
          </span>
          <h3 style={{ fontSize: '1.05rem', fontWeight: '800', margin: 0, lineHeight: 1.2 }}>
            Most-Wanted Style Legacy
          </h3>
          <span style={{ fontSize: '0.78rem', fontWeight: '500', opacity: 0.9 }}>
            Pieces designed for the modern weekend
          </span>
        </div>
      </div>

      {/* Product Row / Grid (3 items wide) */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr',
        gap: '0.6rem',
        marginBottom: '1.5rem'
      }}>
        {velnoraProducts.map((product) => {
          // Calculate simulated original price and discount
          const hasDiscount = product.id === 'prod-9' || product.id === 'prod-11';
          const discountText = product.id === 'prod-9' ? '15% OFF' : '10% OFF';
          const mrp = Math.round(product.price * (product.id === 'prod-9' ? 1.18 : 1.12));

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

                {/* Discount Badge */}
                {hasDiscount && (
                  <span style={{
                    position: 'absolute',
                    top: '0.4rem',
                    left: '0.4rem',
                    backgroundColor: '#ef4444',
                    color: '#ffffff',
                    padding: '0.15rem 0.3rem',
                    fontSize: '0.55rem',
                    fontWeight: '700',
                    borderRadius: '3px',
                    textTransform: 'uppercase'
                  }}>
                    {discountText}
                  </span>
                )}
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
                {hasDiscount && (
                  <span style={{ fontSize: '0.65rem', textDecoration: 'line-through', color: 'var(--text-mute)', marginLeft: '0.15rem' }}>
                    ₹{mrp.toLocaleString('en-IN')}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

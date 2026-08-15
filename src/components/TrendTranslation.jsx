import React from 'react';

export default function TrendTranslation({ onSignInClick, onTrendClick }) {
  const trends = [
    {
      image: '/trend_free_spirit.jpg',
      label: 'Free Spirit'
    },
    {
      image: '/trend_sheer_play.jpg',
      label: 'Sheer Play'
    },
    {
      image: '/trend_coastal_coded.jpg',
      label: 'Coastal Coded'
    },
    {
      image: '/trend_forever_chic.jpg',
      label: 'Forever chic'
    }
  ];

  return (
    <section style={{
      padding: '3rem 1.25rem 2rem 1.25rem',
      backgroundColor: '#ffffff',
      fontFamily: 'var(--font-sans)',
      maxWidth: '480px',
      margin: '0 auto'
    }}>
      <h2 style={{
        fontSize: '1.25rem',
        fontWeight: '800',
        textTransform: 'uppercase',
        letterSpacing: '0.02em',
        color: '#111111',
        marginBottom: '1.5rem',
        fontFamily: 'var(--font-sans)'
      }}>
        TREND TRANSLATION
      </h2>

      {/* 2x2 Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '1.5rem 0.75rem',
        marginBottom: '2rem'
      }}>
        {trends.map((trend, index) => (
          <div 
            key={index} 
            onClick={() => onTrendClick && onTrendClick(trend.label.toLowerCase().replace(' ', '-'))}
            style={{ 
              display: 'flex', 
              flexDirection: 'column',
              cursor: 'pointer',
              transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-4px)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
          >
            <div style={{
              width: '100%',
              aspectRatio: '3/4',
              borderRadius: '12px',
              overflow: 'hidden',
              backgroundColor: '#f5f5f5',
              marginBottom: '0.6rem'
            }}>
              <img 
                src={trend.image} 
                alt={trend.label} 
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
            <span style={{
              fontSize: '0.9rem',
              fontWeight: '700',
              textAlign: 'center',
              color: '#111111',
              fontFamily: 'var(--font-sans)'
            }}>
              {trend.label}
            </span>
          </div>
        ))}
      </div>

      {/* Join Club Banner */}
      <div style={{
        backgroundColor: '#1c1c1c',
        color: '#ffffff',
        padding: '0.85rem 1rem',
        borderRadius: '8px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
      }}>
        <span style={{ fontSize: '0.78rem', fontWeight: '500', fontFamily: 'var(--font-sans)' }}>
          Join Club, membership rewards await!
        </span>
        <button
          onClick={onSignInClick}
          style={{
            backgroundColor: '#ffb200', // Gold/yellow button
            color: '#111111',
            border: 'none',
            padding: '0.45rem 1rem',
            borderRadius: '6px',
            fontSize: '0.75rem',
            fontWeight: '700',
            cursor: 'pointer',
            fontFamily: 'var(--font-sans)',
            outline: 'none',
            transition: 'opacity 0.2s ease'
          }}
          onMouseEnter={(e) => e.target.style.opacity = '0.9'}
          onMouseLeave={(e) => e.target.style.opacity = '1'}
        >
          Sign in
        </button>
      </div>
    </section>
  );
}

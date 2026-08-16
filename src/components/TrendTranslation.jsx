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
    <section className="container" style={{
      padding: '3.5rem 1.25rem 2.5rem 1.25rem',
      fontFamily: 'var(--font-sans)',
    }}>
      <h2 style={{
        fontSize: '1.35rem',
        fontWeight: '800',
        textTransform: 'uppercase',
        letterSpacing: '0.04em',
        color: 'var(--text-primary)',
        marginBottom: '1.5rem',
        fontFamily: 'var(--font-sans)'
      }}>
        TREND TRANSLATION
      </h2>

      {/* 2-column Grid layout matching screenshot */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '2.5rem 1.5rem',
        marginBottom: '2.5rem'
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
            onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-6px)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
          >
            <div style={{
              width: '100%',
              aspectRatio: '3/4',
              borderRadius: '24px',
              overflow: 'hidden',
              backgroundColor: 'var(--bg-secondary)',
              border: 'none',
              marginBottom: '1rem',
              boxShadow: '0 4px 15px rgba(0,0,0,0.06)'
            }}>
              <img 
                src={trend.image} 
                alt={trend.label} 
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
            <span style={{
              fontSize: '1.35rem',
              fontWeight: '700',
              textAlign: 'center',
              color: 'var(--text-primary)',
              fontFamily: 'var(--font-sans)',
              letterSpacing: '-0.3px'
            }}>
              {trend.label}
            </span>
          </div>
        ))}
      </div>

      {/* Join Club Banner */}
      <div style={{
        backgroundColor: 'var(--bg-secondary)',
        color: 'var(--text-primary)',
        border: '1px solid var(--border-color)',
        padding: '1.25rem 1.75rem',
        borderRadius: '12px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        boxShadow: 'var(--shadow-sm)'
      }}>
        <span style={{ fontSize: '0.875rem', fontWeight: '600', fontFamily: 'var(--font-sans)' }}>
          Join Club, membership rewards await!
        </span>
        <button
          onClick={onSignInClick}
          style={{
            backgroundColor: 'var(--accent-gold)',
            color: 'var(--bg-primary)',
            border: 'none',
            padding: '0.6rem 1.4rem',
            borderRadius: '100px',
            fontSize: '0.8rem',
            fontWeight: '700',
            cursor: 'pointer',
            fontFamily: 'var(--font-sans)',
            outline: 'none',
            transition: 'opacity 0.2s ease',
            boxShadow: 'var(--shadow-sm)'
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

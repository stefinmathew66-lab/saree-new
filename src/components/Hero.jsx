import React, { useEffect, useState } from 'react';

const HERO_IMAGES = [
  "images/silk_kanchipuram.webp",
  "images/banarasi_pink.webp",
  "images/organza_mint.webp",
  "images/georgette_indigo.webp"
];

export default function Hero({ onExploreClick }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % HERO_IMAGES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="hero" style={{
      position: 'relative',
      width: '100%',
      height: 'calc(100vh - 105px)', // Navbar is ~105px on mobile
      overflow: 'hidden',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#f5f5f5'
    }}>
      {/* Background Slideshow */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 1
      }}>
        {HERO_IMAGES.map((imgUrl, index) => (
          <img 
            key={index}
            src={imgUrl} 
            alt={`Luxury Saree Hero Slide ${index + 1}`} 
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center',
              opacity: currentImageIndex === index ? 1 : 0,
              transition: 'opacity 1.5s ease-in-out',
              zIndex: currentImageIndex === index ? 2 : 1,
              filter: 'brightness(0.95)' // keep background bright as in screenshot
            }}
          />
        ))}
      </div>

      {/* Coral Card Overlay (matching the screenshot exactly) */}
      <div 
        style={{
          position: 'relative',
          zIndex: 10,
          backgroundColor: '#f26955', // Coral color from screenshot
          borderRadius: '16px',
          padding: '2.5rem 1.5rem',
          width: '90%',
          maxWidth: '380px',
          boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          color: '#ffffff',
          animation: 'fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1)'
        }}
      >
        <h2 style={{
          fontFamily: 'var(--font-sans)',
          fontSize: '1.6rem',
          fontWeight: '600',
          letterSpacing: '0.05em',
          color: '#ffd0c4', // warm creamy yellow-orange color for FREEDOM SALE
          textTransform: 'uppercase',
          marginBottom: '1.25rem'
        }}>
          FREEDOM SALE
        </h2>

        <span style={{
          fontFamily: 'var(--font-sans)',
          fontSize: '1.35rem',
          fontWeight: '700',
          letterSpacing: '0.05em',
          color: '#ffffff',
          textTransform: 'uppercase',
          marginBottom: '0.5rem'
        }}>
          UP TO
        </span>

        {/* Stacked 80% OFF */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          lineHeight: '0.85',
          margin: '0.2rem 0 1.5rem 0'
        }}>
          <div style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '7.5rem',
            fontWeight: '800',
            color: '#ffffff',
            letterSpacing: '-4px'
          }}>
            80%
          </div>
          <div style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '6.5rem',
            fontWeight: '800',
            color: '#ffffff',
            letterSpacing: '1px',
            marginTop: '-0.3rem'
          }}>
            OFF
          </div>
        </div>

        <button 
          onClick={onExploreClick}
          style={{
            border: '2.5px solid #ffffff',
            background: 'transparent',
            color: '#ffffff',
            padding: '0.7rem 2.5rem',
            fontSize: '1.05rem',
            fontWeight: '700',
            letterSpacing: '0.05em',
            borderRadius: '0px',
            cursor: 'pointer',
            textTransform: 'uppercase',
            transition: 'all 0.2s ease',
            outline: 'none',
            fontFamily: 'var(--font-sans)'
          }}
          className="hero-shop-btn"
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = '#ffffff';
            e.target.style.color = '#f26955';
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = 'transparent';
            e.target.style.color = '#ffffff';
          }}
        >
          SHOP NOW
        </button>
      </div>

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
}

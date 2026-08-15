import React from 'react';
import { X } from 'lucide-react';

export default function WelcomePopup({ isOpen, onClose, onClaimOffer }) {
  if (!isOpen) return null;

  return (
    <div 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: 'rgba(0, 0, 0, 0.65)',
        backdropFilter: 'blur(5px)',
        WebkitBackdropFilter: 'blur(5px)',
        zIndex: 2000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem',
        animation: 'fadeIn 0.3s ease'
      }}
      onClick={onClose}
    >
      <div 
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '340px',
          backgroundColor: '#ffd200', // Gold yellow matching screenshot
          borderRadius: '20px',
          padding: '2.25rem 1.5rem',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
          animation: 'scaleIn 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button on Top Right (Inside yellow box for mobile alignment) */}
        <button 
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '12px',
            right: '12px',
            background: 'none',
            border: 'none',
            color: '#000000',
            cursor: 'pointer',
            padding: '0.25rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            opacity: 0.75,
            transition: 'opacity 0.2s ease',
            outline: 'none'
          }}
          aria-label="Close offer window"
          onMouseEnter={(e) => e.target.style.opacity = 1}
          onMouseLeave={(e) => e.target.style.opacity = 0.75}
        >
          <X size={20} strokeWidth={2.5} />
        </button>

        {/* Title */}
        <h3 style={{
          fontFamily: 'var(--font-sans)',
          fontSize: '1.45rem',
          fontWeight: '800',
          color: '#000000',
          textAlign: 'center',
          marginBottom: '1.5rem',
          letterSpacing: '-0.5px'
        }}>
          Exclusive welcome offer
        </h3>

        {/* Coupon Box Card Graphic */}
        <div 
          onClick={onClaimOffer}
          style={{
            width: '100%',
            backgroundColor: '#ffffff',
            borderRadius: '14px',
            padding: '1.25rem 1rem',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            cursor: 'pointer',
            borderTop: '5px dashed #ffd200',
            boxShadow: '0 8px 20px rgba(0,0,0,0.06)',
            transition: 'transform 0.2s ease'
          }}
          className="welcome-coupon-card"
        >
          {/* Coupon Label */}
          <span style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '0.85rem',
            fontWeight: '700',
            letterSpacing: '0.25em',
            color: '#111111',
            marginBottom: '0.75rem',
            textTransform: 'uppercase'
          }}>
            COUPON
          </span>

          {/* Dotted Divider line */}
          <div style={{
            width: '100%',
            height: '1px',
            borderBottom: '2.5px dotted #ffd200',
            marginBottom: '1rem'
          }}></div>

          {/* Central image asset */}
          <img 
            src="images/welcome_gift.jpg" 
            alt="Welcome Gift box with question mark"
            style={{
              width: '150px',
              height: '150px',
              objectFit: 'contain',
              borderRadius: '8px'
            }}
          />
        </div>

        {/* Grab Your Gift Call To Action Button */}
        <button
          onClick={onClaimOffer}
          style={{
            backgroundColor: '#000000',
            color: '#ffffff',
            border: 'none',
            width: '100%',
            padding: '0.8rem 1.5rem',
            fontSize: '0.85rem',
            fontWeight: '800',
            letterSpacing: '0.04em',
            textTransform: 'uppercase',
            borderRadius: '99px',
            cursor: 'pointer',
            boxShadow: '0 4px 10px rgba(0,0,0,0.15)',
            marginTop: '0.5rem',
            outline: 'none',
            fontFamily: 'var(--font-sans)',
            transition: 'transform 0.1s ease'
          }}
          onMouseDown={(e) => e.target.style.transform = 'scale(0.98)'}
          onMouseUp={(e) => e.target.style.transform = 'scale(1)'}
        >
          GRAB YOUR GIFT
        </button>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleIn {
          from { transform: scale(0.9); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        .welcome-coupon-card:hover {
          transform: translateY(-2px);
        }
      `}</style>
    </div>
  );
}

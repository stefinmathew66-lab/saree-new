import React from 'react';
import { Star, ChevronsRight } from 'lucide-react';

export default function SpecialOffers({ onExploreClick }) {
  // Navigation helper
  const handleOfferClick = (category) => {
    if (onExploreClick) {
      onExploreClick(category);
    }
  };

  return (
    <section className="special-offers-section" style={{
      padding: '2rem 1rem',
      backgroundColor: '#fafafa',
      fontFamily: 'var(--font-sans)',
      width: '100%'
    }}>
      <div className="special-offers-container">
        {/* Title */}
        <h2 style={{
          fontSize: '1.25rem',
          fontWeight: '800',
          letterSpacing: '0.02em',
          color: '#171717',
          textTransform: 'uppercase',
          marginBottom: '1.25rem',
          paddingLeft: '0.2rem'
        }}>
          SPECIAL OFFERS
        </h2>

        {/* Coupon Grid (Two side-by-side coupons) */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '0.75rem',
          marginBottom: '1.75rem'
        }}>
          {/* Coupon 1: Buy 1 Get 1 */}
          <div style={{
            position: 'relative',
            aspectRatio: '1 / 1.05',
            width: '100%',
            overflow: 'visible'
          }}>
            {/* Scalloped SVG Background */}
            <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1 }}>
              <svg width="100%" height="100%" viewBox="0 0 200 210" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="couponGrad1" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stop-color="#f0725a" stop-opacity="0.75" />
                    <stop offset="45%" stop-color="#ffffff" />
                    <stop offset="100%" stop-color="#80be86" stop-opacity="0.75" />
                  </linearGradient>
                </defs>
                <path d="
                  M 12 12 
                  Q 21 6, 30 12 Q 39 6, 48 12 Q 57 6, 66 12 Q 75 6, 84 12 Q 93 6, 102 12 Q 111 6, 120 12 Q 129 6, 138 12 Q 147 6, 156 12 Q 165 6, 174 12 Q 183 6, 192 12
                  Q 198 21, 192 30 Q 198 39, 192 48 Q 198 57, 192 66 Q 198 75, 192 84 Q 198 93, 192 102 Q 198 111, 192 120 Q 198 129, 192 138 Q 198 147, 192 156 Q 198 165, 192 174 Q 198 183, 192 192 Q 198 201, 192 210
                  Q 183 204, 174 210 Q 165 204, 156 210 Q 147 204, 138 210 Q 129 204, 120 210 Q 111 204, 102 210 Q 93 204, 84 210 Q 75 204, 66 210 Q 57 204, 48 210 Q 39 204, 30 210 Q 21 204, 12 210
                  Q 6 201, 12 192 Q 6 183, 12 174 Q 6 174, 12 165 Q 6 156, 12 147 Q 6 138, 12 129 Q 6 120, 12 111 Q 6 102, 12 93 Q 6 84, 12 75 Q 6 66, 12 57 Q 6 48, 12 39 Q 6 30, 12 21 Q 6 12, 12 12
                  Z" 
                  fill="url(#couponGrad1)"
                  stroke="#f26955"
                  stroke-width="1.5"
                />
              </svg>
            </div>

            {/* Content overlay */}
            <div style={{
              position: 'relative',
              zIndex: 5,
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              padding: '1.25rem 0.5rem 0.75rem 0.5rem',
              textAlign: 'center'
            }}>
              {/* FREE rotated pill badge */}
              <div style={{
                position: 'absolute',
                top: '0px',
                right: '4px',
                backgroundColor: '#50a890',
                color: '#ffffff',
                fontSize: '0.7rem',
                fontWeight: '800',
                padding: '0.2rem 0.8rem',
                borderRadius: '999px',
                transform: 'rotate(18deg) translate(5px, -5px)',
                letterSpacing: '0.05em',
                boxShadow: '0 2px 6px rgba(0,0,0,0.1)'
              }}>
                FREE
              </div>

              {/* Text */}
              <div style={{
                color: '#171717',
                fontWeight: '800',
                fontSize: '1.9rem',
                lineHeight: '1.15',
                letterSpacing: '-0.5px',
                marginBottom: '1rem',
                display: 'flex',
                flexDirection: 'column'
              }}>
                <span>Buy 1</span>
                <span>Get 1</span>
              </div>

              {/* Action Button */}
              <button 
                onClick={() => handleOfferClick('Summer')}
                style={{
                  backgroundColor: '#e65c49',
                  color: '#ffffff',
                  border: 'none',
                  padding: '0.45rem 1.1rem',
                  fontSize: '0.72rem',
                  fontWeight: '700',
                  letterSpacing: '0.04em',
                  textTransform: 'uppercase',
                  cursor: 'pointer',
                  borderRadius: '0px',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
                }}
              >
                SHOP NOW
              </button>
            </div>
          </div>

          {/* Coupon 2: ALL at ₹190 */}
          <div style={{
            position: 'relative',
            aspectRatio: '1 / 1.05',
            width: '100%',
            overflow: 'visible'
          }}>
            {/* Scalloped SVG Background */}
            <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1 }}>
              <svg width="100%" height="100%" viewBox="0 0 200 210" preserveAspectRatio="none">
                <path d="
                  M 12 12 
                  Q 21 6, 30 12 Q 39 6, 48 12 Q 57 6, 66 12 Q 75 6, 84 12 Q 93 6, 102 12 Q 111 6, 120 12 Q 129 6, 138 12 Q 147 6, 156 12 Q 165 6, 174 12 Q 183 6, 192 12
                  Q 198 21, 192 30 Q 198 39, 192 48 Q 198 57, 192 66 Q 198 75, 192 84 Q 198 93, 192 102 Q 198 111, 192 120 Q 198 129, 192 138 Q 198 147, 192 156 Q 198 165, 192 174 Q 198 183, 192 192 Q 198 201, 192 210
                  Q 183 204, 174 210 Q 165 204, 156 210 Q 147 204, 138 210 Q 129 204, 120 210 Q 111 204, 102 210 Q 93 204, 84 210 Q 75 204, 66 210 Q 57 204, 48 210 Q 39 204, 30 210 Q 21 204, 12 210
                  Q 6 201, 12 192 Q 6 183, 12 174 Q 6 174, 12 165 Q 6 156, 12 147 Q 6 138, 12 129 Q 6 120, 12 111 Q 6 102, 12 93 Q 6 84, 12 75 Q 6 66, 12 57 Q 6 48, 12 39 Q 6 30, 12 21 Q 6 12, 12 12
                  Z" 
                  fill="url(#couponGrad1)"
                  stroke="#f26955"
                  stroke-width="1.5"
                />
              </svg>
            </div>

            {/* Content overlay */}
            <div style={{
              position: 'relative',
              zIndex: 5,
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              padding: '1.25rem 0.5rem 0.75rem 0.5rem',
              textAlign: 'center'
            }}>
              {/* Text */}
              <div style={{
                color: '#171717',
                marginBottom: '0.65rem',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
              }}>
                <span style={{ fontSize: '1.15rem', fontWeight: '600', textTransform: 'none', color: '#171717' }}>ALL at</span>
                <span style={{ fontSize: '2.5rem', fontWeight: '900', color: '#000000', lineHeight: 1.1 }}>₹190</span>
              </div>

              {/* Action Button */}
              <button 
                onClick={() => handleOfferClick('Summer')}
                style={{
                  backgroundColor: '#e65c49',
                  color: '#ffffff',
                  border: 'none',
                  padding: '0.45rem 1.1rem',
                  fontSize: '0.72rem',
                  fontWeight: '700',
                  letterSpacing: '0.04em',
                  textTransform: 'uppercase',
                  cursor: 'pointer',
                  borderRadius: '0px',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
                }}
              >
                SHOP NOW
              </button>
            </div>
          </div>
        </div>

        {/* Promo Grid / Scrollable Row (Three cards) */}
        <div 
          className="promo-cards-scrollable"
          style={{
            display: 'flex',
            gap: '0.75rem',
            overflowX: 'auto',
            paddingBottom: '0.5rem',
            scrollbarWidth: 'none', /* hide scrollbar firefox */
            msOverflowStyle: 'none', /* hide scrollbar IE */
            scrollSnapType: 'x mandatory',
            WebkitOverflowScrolling: 'touch'
          }}
        >
          {/* Card 1: Clearance Sale */}
          <div className="promo-card-item">
            {/* Header label */}
            <div style={{
              backgroundColor: '#e65c49',
              color: '#ffffff',
              fontSize: '0.625rem',
              fontWeight: '800',
              textAlign: 'center',
              padding: '0.4rem 0.2rem',
              textTransform: 'uppercase',
              letterSpacing: '0.02em',
              whiteSpace: 'nowrap'
            }}>
              CLEARANCE SALE
            </div>

            {/* Image Frame */}
            <div className="promo-card-image-frame" style={{
              position: 'relative',
              width: '100%',
              backgroundColor: '#f6f6f6'
            }}>
              <img 
                src="images/summer_dress.webp" 
                alt="Clearance Sale" 
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />

              {/* Gold Star Overlays */}
              <Star size={14} fill="#ffd700" stroke="none" style={{ position: 'absolute', top: '15px', left: '10px', filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.2))' }} />
              <Star size={12} fill="#ffd700" stroke="none" style={{ position: 'absolute', bottom: '15px', right: '10px', filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.2))' }} />

              {/* Offer Semi-transparent white overlay banner */}
              <div style={{
                position: 'absolute',
                bottom: '10px',
                left: 0,
                width: '100%',
                backgroundColor: 'rgba(255, 255, 255, 0.88)',
                backdropFilter: 'blur(2px)',
                WebkitBackdropFilter: 'blur(2px)',
                textAlign: 'center',
                padding: '0.35rem 0',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                lineHeight: 1
              }}>
                <span style={{ fontSize: '0.6rem', fontWeight: '700', color: '#666666', letterSpacing: '0.05em' }}>UP TO</span>
                <span style={{ fontSize: '1.15rem', fontWeight: '900', color: '#000000', marginTop: '1px' }}>60% OFF</span>
              </div>
            </div>

            {/* Footer arrow indicator */}
            <div 
              onClick={() => handleOfferClick('Summer')}
              style={{
                backgroundColor: '#e65c49',
                height: '24px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer'
              }}
            >
              <ChevronsRight size={14} color="#ffffff" />
            </div>
          </div>

          {/* Card 2: Dresses & Co-ords */}
          <div className="promo-card-item">
            {/* Header label */}
            <div style={{
              backgroundColor: '#e65c49',
              color: '#ffffff',
              fontSize: '0.625rem',
              fontWeight: '800',
              textAlign: 'center',
              padding: '0.4rem 0.2rem',
              textTransform: 'uppercase',
              letterSpacing: '0.02em',
              whiteSpace: 'nowrap'
            }}>
              DRESSES & CO-ORDS
            </div>

            {/* Image Frame */}
            <div className="promo-card-image-frame" style={{
              position: 'relative',
              width: '100%',
              backgroundColor: '#f6f6f6'
            }}>
              <img 
                src="images/coord_set.webp" 
                alt="Dresses & Co-ords" 
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />

              {/* Gold Star Overlays */}
              <Star size={14} fill="#ffd700" stroke="none" style={{ position: 'absolute', top: '15px', left: '10px', filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.2))' }} />
              <Star size={12} fill="#ffd700" stroke="none" style={{ position: 'absolute', bottom: '15px', right: '10px', filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.2))' }} />

              {/* Offer Semi-transparent white overlay banner */}
              <div style={{
                position: 'absolute',
                bottom: '10px',
                left: 0,
                width: '100%',
                backgroundColor: 'rgba(255, 255, 255, 0.88)',
                backdropFilter: 'blur(2px)',
                WebkitBackdropFilter: 'blur(2px)',
                textAlign: 'center',
                padding: '0.35rem 0',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                lineHeight: 1
              }}>
                <span style={{ fontSize: '0.6rem', fontWeight: '700', color: '#666666', letterSpacing: '0.05em' }}>UNDER</span>
                <span style={{ fontSize: '1.15rem', fontWeight: '900', color: '#000000', marginTop: '1px' }}>₹999</span>
              </div>
            </div>

            {/* Footer arrow indicator */}
            <div 
              onClick={() => handleOfferClick('Co-ords')}
              style={{
                backgroundColor: '#e65c49',
                height: '24px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer'
              }}
            >
              <ChevronsRight size={14} color="#ffffff" />
            </div>
          </div>

          {/* Card 3: Tops & Tee */}
          <div className="promo-card-item">
            {/* Header label */}
            <div style={{
              backgroundColor: '#e65c49',
              color: '#ffffff',
              fontSize: '0.625rem',
              fontWeight: '800',
              textAlign: 'center',
              padding: '0.4rem 0.2rem',
              textTransform: 'uppercase',
              letterSpacing: '0.02em',
              whiteSpace: 'nowrap'
            }}>
              TOPS & TEE
            </div>

            {/* Image Frame */}
            <div className="promo-card-image-frame" style={{
              position: 'relative',
              width: '100%',
              backgroundColor: '#f6f6f6'
            }}>
              <img 
                src="images/linen_beige.webp" 
                alt="Tops & Tee" 
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />

              {/* Gold Star Overlays */}
              <Star size={14} fill="#ffd700" stroke="none" style={{ position: 'absolute', top: '15px', left: '10px', filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.2))' }} />
              <Star size={12} fill="#ffd700" stroke="none" style={{ position: 'absolute', bottom: '15px', right: '10px', filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.2))' }} />

              {/* Offer Semi-transparent white overlay banner */}
              <div style={{
                position: 'absolute',
                bottom: '10px',
                left: 0,
                width: '100%',
                backgroundColor: 'rgba(255, 255, 255, 0.88)',
                backdropFilter: 'blur(2px)',
                WebkitBackdropFilter: 'blur(2px)',
                textAlign: 'center',
                padding: '0.35rem 0',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                lineHeight: 1
              }}>
                <span style={{ fontSize: '0.6rem', fontWeight: '700', color: '#666666', letterSpacing: '0.05em' }}>UNDER</span>
                <span style={{ fontSize: '1.15rem', fontWeight: '900', color: '#000000', marginTop: '1px' }}>₹499</span>
              </div>
            </div>

            {/* Footer arrow indicator */}
            <div 
              onClick={() => handleOfferClick('Suits')}
              style={{
                backgroundColor: '#e65c49',
                height: '24px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer'
              }}
            >
              <ChevronsRight size={14} color="#ffffff" />
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .special-offers-container {
          max-width: 480px;
          margin: 0 auto;
        }
        .promo-cards-scrollable {
          display: flex;
          gap: 0.75rem;
          overflow-x: auto;
          padding-bottom: 0.5rem;
          scrollbar-width: none;
          ms-overflow-style: none;
          scroll-snap-type: x mandatory;
          -webkit-overflow-scrolling: touch;
        }
        .promo-card-item {
          flex: 0 0 148px;
          scroll-snap-align: start;
          background-color: #ffffff;
          border-radius: 12px;
          border: 1.5px solid #f0725a;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          position: relative;
        }
        .promo-card-image-frame {
          height: 160px;
        }
        @media (min-width: 768px) {
          .special-offers-container {
            max-width: 1280px;
            padding: 0 1.5rem;
          }
          .promo-cards-scrollable {
            display: grid !important;
            grid-template-columns: repeat(3, 1fr) !important;
            gap: 1.5rem !important;
            overflow-x: visible !important;
          }
          .promo-card-item {
            flex: none !important;
            width: 100% !important;
          }
          .promo-card-image-frame {
            height: 240px !important;
          }
        }
        /* Hide scrollbar for Chrome, Safari and Opera */
        .promo-cards-scrollable::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}

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
    <section id="hero" className="hero-section">
      {/* Background Slideshow (Mobile Only background) */}
      <div className="hero-slideshow-mobile">
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
              filter: 'brightness(0.95)'
            }}
          />
        ))}
      </div>

      {/* Mobile Card Overlay (Centered card) */}
      <div className="hero-card-mobile">
        <h2 className="hero-sale-title">FREEDOM SALE</h2>
        <span className="hero-up-to">UP TO</span>
        <div className="hero-percent-wrapper">
          <div className="hero-percent-big">80%</div>
          <div className="hero-off-big">OFF</div>
        </div>
        <button onClick={onExploreClick} className="hero-shop-btn">SHOP NOW</button>
      </div>

      {/* Desktop/Laptop Split Layout (Hidden on Mobile) */}
      <div className="hero-split-desktop">
        <div className="hero-desktop-content-col">
          <span className="hero-desktop-subtitle">THE HERITAGE CELEBRATION</span>
          <h2 className="hero-desktop-sale-title">FREEDOM SALE</h2>
          <div className="hero-desktop-offer-badge">
            <span className="up-to-label">UP TO</span>
            <span className="percent-label">80% OFF</span>
          </div>
          <p className="hero-desktop-desc">
            Experience the finest pure zari weaves, heritage silk sarees, and modern luxury coordinates handloomed by master weavers.
          </p>
          <button onClick={onExploreClick} className="hero-desktop-btn">EXPLORE COLLECTION</button>
        </div>
        <div className="hero-desktop-gallery-col">
          {HERO_IMAGES.map((imgUrl, index) => (
            <img 
              key={index}
              src={imgUrl} 
              alt={`Luxury Saree Slide ${index + 1}`} 
              className={`hero-desktop-slide-img ${currentImageIndex === index ? 'active' : ''}`}
            />
          ))}
          <div className="hero-desktop-gallery-overlay" />
        </div>
      </div>

      <style>{`
        .hero-section {
          position: relative;
          width: 100%;
          height: calc(100vh - 105px);
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: #f5f5f5;
        }
        .hero-slideshow-mobile {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 1;
        }
        .hero-card-mobile {
          position: relative;
          z-index: 10;
          background-color: #f26955;
          border-radius: 16px;
          padding: 2.5rem 1.5rem;
          width: 90%;
          max-width: 380px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.15);
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          color: #ffffff;
          animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .hero-sale-title {
          font-family: var(--font-sans);
          font-size: 1.6rem;
          font-weight: 600;
          letter-spacing: 0.05em;
          color: #ffd0c4;
          text-transform: uppercase;
          margin-bottom: 1.25rem;
        }
        .hero-up-to {
          font-family: var(--font-sans);
          font-size: 1.35rem;
          font-weight: 700;
          letter-spacing: 0.05em;
          color: #ffffff;
          text-transform: uppercase;
          margin-bottom: 0.5rem;
        }
        .hero-percent-wrapper {
          display: flex;
          flex-direction: column;
          align-items: center;
          line-height: 0.85;
          margin: 0.2rem 0 1.5rem 0;
        }
        .hero-percent-big {
          font-family: var(--font-sans);
          font-size: 7.5rem;
          font-weight: 800;
          color: #ffffff;
          letter-spacing: -4px;
        }
        .hero-off-big {
          font-family: var(--font-sans);
          font-size: 6.5rem;
          font-weight: 800;
          color: #ffffff;
          letter-spacing: 1px;
          margin-top: -0.3rem;
        }
        .hero-shop-btn {
          border: 2.5px solid #ffffff;
          background: transparent;
          color: #ffffff;
          padding: 0.7rem 2.5rem;
          font-size: 1.05rem;
          font-weight: 700;
          letter-spacing: 0.05em;
          border-radius: 0px;
          cursor: pointer;
          text-transform: uppercase;
          transition: all 0.2s ease;
          outline: none;
          font-family: var(--font-sans);
        }
        .hero-shop-btn:hover {
          background-color: #ffffff;
          color: #f26955;
        }
        .hero-split-desktop {
          display: none;
        }
        @media (min-width: 768px) {
          .hero-slideshow-mobile, .hero-card-mobile {
            display: none !important;
          }
          .hero-section {
            height: calc(100vh - 120px) !important;
          }
          .hero-split-desktop {
            display: flex;
            width: 100%;
            height: 100%;
            z-index: 10;
          }
          .hero-desktop-content-col {
            width: 40%;
            background-color: #f26955;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: flex-start;
            padding: 4rem;
            color: #ffffff;
            text-align: left;
          }
          .hero-desktop-subtitle {
            font-family: var(--font-mono);
            font-size: 0.85rem;
            letter-spacing: 0.15em;
            color: #ffd0c4;
            text-transform: uppercase;
            margin-bottom: 1.5rem;
          }
          .hero-desktop-sale-title {
            font-family: var(--font-serif);
            font-size: 3.5rem;
            font-weight: 500;
            margin: 0 0 1rem 0;
            line-height: 1.1;
          }
          .hero-desktop-offer-badge {
            display: flex;
            flex-direction: column;
            margin-bottom: 2rem;
          }
          .hero-desktop-offer-badge .up-to-label {
            font-size: 1.15rem;
            font-weight: 700;
            letter-spacing: 0.05em;
            opacity: 0.9;
          }
          .hero-desktop-offer-badge .percent-label {
            font-size: 5rem;
            font-weight: 900;
            line-height: 1;
            margin-top: 0.25rem;
          }
          .hero-desktop-desc {
            font-size: 1.05rem;
            line-height: 1.7;
            max-width: 440px;
            color: rgba(255, 255, 255, 0.95);
            margin: 0 0 2.5rem 0;
          }
          .hero-desktop-btn {
            border: 2.5px solid #ffffff;
            background: transparent;
            color: #ffffff;
            padding: 1rem 2.75rem;
            font-size: 1rem;
            font-weight: 800;
            letter-spacing: 0.08em;
            cursor: pointer;
            text-transform: uppercase;
            transition: all 0.2s ease;
            outline: none;
            font-family: var(--font-sans);
          }
          .hero-desktop-btn:hover {
            background-color: #ffffff;
            color: #f26955;
          }
          .hero-desktop-gallery-col {
            width: 60%;
            position: relative;
            height: 100%;
            background-color: #000000;
            overflow: hidden;
          }
          .hero-desktop-slide-img {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            object-fit: cover;
            opacity: 0;
            transition: opacity 1.5s ease-in-out, transform 5s ease;
            transform: scale(1.05);
          }
          .hero-desktop-slide-img.active {
            opacity: 1;
            transform: scale(1.01);
          }
          .hero-desktop-gallery-overlay {
            position: absolute;
            inset: 0;
            background: linear-gradient(to right, rgba(0,0,0,0.15), transparent);
            pointer-events: none;
          }
        }
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

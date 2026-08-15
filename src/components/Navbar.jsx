import React, { useState, useEffect } from 'react';
import { ShoppingBag, User, Menu, X, Search, Heart, RotateCcw, Zap, Truck } from 'lucide-react';

export default function Navbar({ 
  cartCount, 
  onCartClick, 
  onViewChange, 
  currentView, 
  atmosphere, 
  onAtmosphereToggle,
  selectedCategory,
  onCategoryChange
}) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleCategoryNav = (cat) => {
    setIsMobileMenuOpen(false);
    if (currentView !== 'storefront') {
      onViewChange('storefront');
    }
    onCategoryChange(cat);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSectionNav = (sectionId) => {
    setIsMobileMenuOpen(false);
    if (currentView !== 'storefront') {
      onViewChange('storefront');
    }
    onCategoryChange('All');
    
    setTimeout(() => {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 150);
  };

  return (
    <>
      <nav className="navbar-glass">
        {/* Row 1: Logo & Icons */}
        <div className="nav-row-main container">
          {/* Left Side: Mobile Toggle & Search */}
          <div className="nav-col-left" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            {(currentView === 'storefront' || currentView === 'journal') && (
              <button 
                className="nav-mobile-toggle"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: 'var(--text-primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '0.25rem',
                  borderRadius: '6px'
                }}
              >
                {isMobileMenuOpen ? <X size={20} strokeWidth={1.5} aria-hidden="true" /> : <Menu size={20} strokeWidth={1.5} aria-hidden="true" />}
              </button>
            )}
            <button
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: 'var(--text-primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '0.25rem'
              }}
              aria-label="Search"
              onClick={() => alert("Search functionality is under development")}
            >
              <Search size={20} strokeWidth={1.5} aria-hidden="true" />
            </button>
          </div>

          {/* Center Column: Logo */}
          <div 
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              cursor: 'pointer',
              outline: 'none'
            }}
            onClick={() => {
              onViewChange('storefront');
              onCategoryChange('All');
              setIsMobileMenuOpen(false);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            role="button"
            tabIndex={0}
            aria-label="Velnora Homepage"
          >
            <div 
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '1.9rem',
                fontWeight: '700',
                letterSpacing: '-1px',
                color: 'var(--text-primary)',
                textTransform: 'lowercase'
              }}
            >
              velnora
            </div>
          </div>

          {/* Right Column: Actions */}
          <div className="nav-col-right" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <button 
              onClick={() => {
                onViewChange(currentView === 'admin' ? 'storefront' : 'admin');
                setIsMobileMenuOpen(false);
              }}
              style={{ 
                background: 'none', 
                border: 'none', 
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                color: currentView === 'admin' ? 'var(--accent-gold-dark)' : 'var(--text-primary)',
                padding: '0.25rem'
              }}
              aria-label={currentView === 'admin' ? 'Exit admin panel' : 'Open admin panel'}
              title="Admin Panel"
            >
              <User size={20} strokeWidth={1.5} aria-hidden="true" />
            </button>

            <button 
              style={{ 
                background: 'none', 
                border: 'none', 
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                color: 'var(--text-primary)',
                padding: '0.25rem'
              }}
              aria-label="Wishlist"
              onClick={() => alert("Wishlist is under development")}
            >
              <Heart size={20} strokeWidth={1.5} aria-hidden="true" />
            </button>

            {(currentView === 'storefront' || currentView === 'journal') && (
              <button 
                onClick={onCartClick}
                style={{ 
                  background: 'none', 
                  border: 'none', 
                  cursor: 'pointer', 
                  position: 'relative',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--text-primary)',
                  padding: '0.25rem'
                }}
                aria-label={`Open shopping cart, ${cartCount} items`}
              >
                <ShoppingBag size={20} strokeWidth={1.5} aria-hidden="true" />
                {cartCount > 0 && (
                  <span 
                    style={{
                      position: 'absolute',
                      top: '-4px',
                      right: '-4px',
                      background: 'var(--text-primary)',
                      color: '#ffffff',
                      fontSize: '0.65rem',
                      fontWeight: '600',
                      width: '16px',
                      height: '16px',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontFamily: 'var(--font-mono)',
                      fontVariantNumeric: 'tabular-nums'
                    }}
                  >
                    {cartCount}
                  </span>
                )}
              </button>
            )}
          </div>
        </div>

        {/* Row 2: Features/Benefits (as seen in screenshot) */}
        <div className="benefits-row" style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '0.6rem 0.5rem',
          backgroundColor: '#ffffff',
          borderBottom: '1px solid #f0f0f0',
          borderTop: '1px solid #f0f0f0',
          fontSize: '0.7rem',
          gap: '0.15rem'
        }}>
          {/* Benefit 1 */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', flex: 1, justifyContent: 'center' }}>
            <RotateCcw size={16} strokeWidth={1.5} style={{ flexShrink: 0 }} />
            <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.1 }}>
              <span style={{ fontWeight: '600', color: '#000000' }}>Easy returns</span>
              <span style={{ fontSize: '0.6rem', color: '#666666' }}>Free pick up</span>
            </div>
          </div>

          {/* Divider */}
          <div style={{ height: '18px', width: '1px', backgroundColor: '#e5e5e5' }}></div>

          {/* Benefit 2 */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', flex: 1, justifyContent: 'center' }}>
            <Zap size={16} strokeWidth={1.5} style={{ flexShrink: 0 }} />
            <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.1 }}>
              <span style={{ fontWeight: '600', color: '#000000' }}>Fast delivery</span>
              <span style={{ fontSize: '0.6rem', color: '#666666' }}>10000+ styles</span>
            </div>
          </div>

          {/* Divider */}
          <div style={{ height: '18px', width: '1px', backgroundColor: '#e5e5e5' }}></div>

          {/* Benefit 3 */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', flex: 1, justifyContent: 'center' }}>
            <Truck size={16} strokeWidth={1.5} style={{ flexShrink: 0 }} />
            <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.1 }}>
              <span style={{ fontWeight: '600', color: '#000000' }}>Free shipping</span>
              <span style={{ fontSize: '0.6rem', color: '#666666' }}>For orders 990+</span>
            </div>
          </div>
        </div>
      </nav>

      {/* Slide Down Mobile Menu */}
      {(currentView === 'storefront' || currentView === 'journal') && (
        <div 
          className={`mobile-menu-drawer ${isMobileMenuOpen ? 'open' : ''}`}
          style={{
            position: 'fixed',
            top: 'var(--nav-height)',
            left: 0,
            width: '100%',
            backgroundColor: 'var(--bg-primary)',
            borderBottom: '1px solid var(--border-color)',
            zIndex: 890,
            overflow: 'hidden',
            maxHeight: isMobileMenuOpen ? '360px' : 0,
            transition: 'max-height 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
            display: 'flex',
            flexDirection: 'column',
            boxShadow: 'var(--shadow-md)'
          }}
        >
          <div style={{ padding: '2rem 1.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <button 
              onClick={() => handleCategoryNav('All')} 
              style={{ background: 'none', border: 'none', textAlign: 'left', width: '100%', fontSize: '1rem', letterSpacing: '-0.2px', cursor: 'pointer', fontWeight: 500, color: 'var(--text-primary)', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.4rem' }}
            >
              Home
            </button>
            <button 
              onClick={() => handleCategoryNav('Summer')} 
              style={{ background: 'none', border: 'none', textAlign: 'left', width: '100%', fontSize: '1rem', letterSpacing: '-0.2px', cursor: 'pointer', fontWeight: 500, color: 'var(--text-primary)', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.4rem' }}
            >
              Summer Collection
            </button>
            <button 
              onClick={() => handleCategoryNav('Sarees')} 
              style={{ background: 'none', border: 'none', textAlign: 'left', width: '100%', fontSize: '1rem', letterSpacing: '-0.2px', cursor: 'pointer', fontWeight: 500, color: 'var(--text-primary)', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.4rem' }}
            >
              Heritage Sarees
            </button>
            <button 
              onClick={() => handleCategoryNav('Suits')} 
              style={{ background: 'none', border: 'none', textAlign: 'left', width: '100%', fontSize: '1rem', letterSpacing: '-0.2px', cursor: 'pointer', fontWeight: 500, color: 'var(--text-primary)', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.4rem' }}
            >
              Luxury Suits
            </button>
            <button 
              onClick={() => handleCategoryNav('Co-ords')} 
              style={{ background: 'none', border: 'none', textAlign: 'left', width: '100%', fontSize: '1rem', letterSpacing: '-0.2px', cursor: 'pointer', fontWeight: 500, color: 'var(--text-primary)', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.4rem' }}
            >
              Co-ords Sets
            </button>
            <button 
              onClick={() => {
                setIsMobileMenuOpen(false);
                onViewChange('journal');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }} 
              style={{ background: 'none', border: 'none', textAlign: 'left', width: '100%', fontSize: '1rem', letterSpacing: '-0.2px', cursor: 'pointer', fontWeight: 500, color: currentView === 'journal' ? 'var(--accent-gold-dark)' : 'var(--text-primary)', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.4rem' }}
            >
              Weaver's Journal
            </button>
            <button 
              onClick={() => handleSectionNav('heritage')} 
              style={{ background: 'none', border: 'none', textAlign: 'left', width: '100%', fontSize: '1rem', letterSpacing: '-0.2px', cursor: 'pointer', fontWeight: 500, color: 'var(--text-primary)', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.4rem' }}
            >
              Heritage
            </button>
            <button 
              onClick={() => handleSectionNav('contact')} 
              style={{ background: 'none', border: 'none', textAlign: 'left', width: '100%', fontSize: '1rem', letterSpacing: '-0.2px', cursor: 'pointer', fontWeight: 500, color: 'var(--text-primary)', paddingBottom: '0.4rem' }}
            >
              Contact
            </button>
          </div>
        </div>
      )}
    </>
  );
}

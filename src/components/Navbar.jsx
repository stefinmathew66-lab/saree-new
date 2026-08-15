import React, { useState, useEffect } from 'react';
import { useNotification } from './NotificationProvider';
import { ShoppingBag, User, Menu, X, Search, Heart, RotateCcw, Zap, Truck } from 'lucide-react';
import './SearchOverlay.css';

export default function Navbar({ 
  cartCount, 
  onCartClick, 
  onViewChange, 
  currentView, 
  atmosphere, 
  onAtmosphereToggle,
  selectedCategory,
  onCategoryChange,
  products = [],
  onProductClick,
  onWishlistClick,
  wishlistCount = 0
}) {
  const { toast } = useNotification();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredSuggestions = searchQuery.trim()
    ? (products || []).filter(p => 
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (p.subcategory && p.subcategory.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (p.material && p.material.toLowerCase().includes(searchQuery.toLowerCase()))
      ).slice(0, 5)
    : [];

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
        {isSearchOpen ? (
          <div className="search-overlay-bar">
            <div className="search-form">
              <Search size={20} className="search-input-icon" />
              <input 
                type="text" 
                className="search-field-input" 
                placeholder="Search our heritage handlooms, linen apparel, and custom prints..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
              />
              <button 
                type="button" 
                className="search-close-btn" 
                onClick={() => {
                  setIsSearchOpen(false);
                  setSearchQuery('');
                }}
                aria-label="Close search"
              >
                <X size={20} />
              </button>
            </div>
            
            {/* Live Search Suggestions Dropdown */}
            {searchQuery.trim() && (
              <div className="search-suggestions-dropdown">
                <div className="suggestions-heading">Search Suggestions</div>
                {filteredSuggestions.length === 0 ? (
                  <div className="suggestions-empty">No products found for "{searchQuery}"</div>
                ) : (
                  <div className="suggestions-list">
                    {filteredSuggestions.map((prod) => (
                      <div 
                        key={prod.id} 
                        className="suggestion-row-card"
                        onClick={() => {
                          onProductClick(prod.id);
                          setIsSearchOpen(false);
                          setSearchQuery('');
                        }}
                      >
                        <div className="suggestion-thumb-wrapper">
                          <img src={prod.image} alt={prod.title} className="suggestion-thumb" />
                        </div>
                        <div className="suggestion-info">
                          <h4 className="suggestion-title">{prod.title}</h4>
                          <div className="suggestion-meta-details">
                            <span className="suggestion-category">{prod.category}</span>
                            <span className="suggestion-price">₹{prod.price.toLocaleString('en-IN')}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        ) : (
          /* Row 1: Logo & Icons */
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
              onClick={() => setIsSearchOpen(true)}
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
                fontFamily: "'Cormorant Garamond', 'Bodoni Moda', serif",
                fontSize: '2.5rem',
                fontWeight: '500',
                color: 'var(--text-primary)',
                textTransform: 'lowercase',
                display: 'inline-flex',
                alignItems: 'baseline',
                position: 'relative',
                lineHeight: 1,
                userSelect: 'none',
                letterSpacing: '0.5px'
              }}
            >
              <span>v</span>
              <span>e</span>
              <span style={{ position: 'relative', display: 'inline-block' }}>
                l
                <svg 
                  style={{
                    position: 'absolute',
                    left: '-2.15rem',
                    bottom: '-0.38rem',
                    width: '2.5rem',
                    height: '0.65rem',
                    pointerEvents: 'none'
                  }}
                  viewBox="0 0 100 30"
                  fill="none"
                >
                  <path 
                    d="M 90 2 C 70 12, 45 18, 25 18 C 10 18, 2 13, 0 8 C 0 5, 2 3, 5 5 C 8 8, 16 12, 28 12 C 45 12, 70 8, 90 2" 
                    fill="currentColor"
                  />
                </svg>
              </span>
              <span>n</span>
              <span>o</span>
              <span>r</span>
              <span>a</span>
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
                padding: '0.25rem',
                position: 'relative'
              }}
              aria-label="Wishlist"
              onClick={onWishlistClick}
            >
              <Heart size={20} strokeWidth={1.5} aria-hidden="true" />
              {wishlistCount > 0 && (
                <span style={{
                  position: 'absolute',
                  top: '-2px',
                  right: '-2px',
                  background: 'var(--accent-gold)',
                  color: 'var(--bg-primary)',
                  fontSize: '0.55rem',
                  fontWeight: '700',
                  borderRadius: '50%',
                  width: '14px',
                  height: '14px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: 'var(--font-sans)'
                }}>
                  {wishlistCount}
                </span>
              )}
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
        )}

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
              style={{ background: 'none', border: 'none', textAlign: 'left', width: '100%', fontSize: '1rem', letterSpacing: '-0.2px', cursor: 'pointer', fontWeight: 500, color: 'var(--text-primary)', paddingBottom: '0.4rem' }}
            >
              Heritage
            </button>
          </div>
        </div>
      )}
    </>
  );
}

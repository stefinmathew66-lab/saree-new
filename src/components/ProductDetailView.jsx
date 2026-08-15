import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  Heart, 
  MessageSquare, 
  ShieldCheck, 
  HelpCircle, 
  Truck, 
  RotateCcw, 
  Coins, 
  ChevronDown, 
  ChevronUp, 
  ChevronRight, 
  Ruler,
  Star
} from 'lucide-react';

export default function ProductDetailView({ product, onBack, onAddToCart, allProducts }) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');
  const [isAboutOpen, setIsAboutOpen] = useState(true);
  const [isPolicyOpen, setIsPolicyOpen] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);

  // Scroll to top on product change
  useEffect(() => {
    window.scrollTo(0, 0);
    setSelectedSize('');
    setActiveImageIndex(0);
  }, [product]);

  if (!product) return null;

  // Calculate recommendation items from "allProducts" (matching same category, up to 4 items, excluding active product)
  const recommendations = allProducts
    .filter(p => p.id !== product.id && (p.category === product.category || p.featured))
    .slice(0, 4);

  // List of standard size tags we want to offer
  const standardSizes = ["XS", "S", "M", "L", "XL"];
  
  // Checks if size is available in product specifications
  const productSizes = product.sizes || ["Standard"];

  // Simulate pricing details
  const originalMrp = Math.round(product.price * 1.25);
  const discountPercentage = 20; // welcome or catalog discount
  const getItForPrice = Math.round(product.price * 0.9); // promo price

  // Fallback reviews array
  const reviews = product.reviews || [
    {
      id: "rev-d1",
      author: "P***a",
      rating: 5.0,
      date: "04 Aug 2026",
      text: "The quality is absolutely premium! Handloom weaving is very clean and the fabric feels extremely soft.",
      size: "M",
      images: []
    }
  ];

  const handleAddToBag = () => {
    if (productSizes.length > 0 && !selectedSize && !productSizes.includes("Standard")) {
      alert("Please select a size before adding the item to your Collection Bag.");
      return;
    }
    onAddToCart(product, selectedSize || "Standard");
    alert(`${product.title} (${selectedSize || "Standard"}) has been added to your shopping bag.`);
  };

  return (
    <div style={{
      paddingTop: 'var(--nav-height)',
      backgroundColor: '#f9f9f9',
      minHeight: '100vh',
      fontFamily: 'var(--font-sans)',
      color: 'var(--text-primary)',
      paddingBottom: '5rem'
    }}>
      
      {/* Detail view container */}
      <div style={{ maxWidth: '480px', margin: '0 auto', backgroundColor: '#ffffff', minHeight: '100vh' }}>
        
        {/* Navigation Breadcrumb / Top Bar */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '1rem',
          borderBottom: '1px solid #f0f0f0'
        }}>
          <button 
            onClick={onBack}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: 'var(--text-primary)',
              fontSize: '0.85rem',
              fontWeight: '600'
            }}
          >
            <ArrowLeft size={16} />
            Back to Collection
          </button>
          
          <span style={{ fontSize: '0.7rem', color: 'var(--text-mute)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            {product.category}
          </span>
        </div>

        {/* 1. PRODUCT IMAGES CAROUSEL */}
        <div style={{ position: 'relative', width: '100%', aspectRatio: '3/4', backgroundColor: '#f5f5f5', overflow: 'hidden' }}>
          <img 
            src={activeImageIndex === 0 ? product.image : (product.detailImage || product.image)} 
            alt={product.title} 
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />

          {/* Trendy Badge Overlay (bottom-left) */}
          <span style={{
            position: 'absolute',
            bottom: '1rem',
            left: '1rem',
            backgroundColor: '#ffffff',
            color: '#111111',
            padding: '0.3rem 0.75rem',
            fontSize: '0.7rem',
            fontWeight: '700',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            borderRadius: '4px',
            boxShadow: '0 2px 6px rgba(0,0,0,0.1)'
          }}>
            Trendy
          </span>

          {/* Dots Carousel Indicators */}
          <div style={{
            position: 'absolute',
            bottom: '1rem',
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            gap: '0.5rem',
            zIndex: 10
          }}>
            {[0, 1].map((idx) => (
              <button 
                key={idx}
                onClick={() => setActiveImageIndex(idx)}
                style={{
                  width: activeImageIndex === idx ? '18px' : '6px',
                  height: '6px',
                  borderRadius: '99px',
                  backgroundColor: activeImageIndex === idx ? '#ffffff' : 'rgba(255,255,255,0.6)',
                  border: 'none',
                  padding: 0,
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
                aria-label={`Slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>

        {/* 2. PRODUCT INFO & DETAILS */}
        <div style={{ padding: '1.5rem 1.25rem' }}>
          {/* Title */}
          <h1 style={{
            fontFamily: 'var(--font-serif)',
            fontSize: '1.8rem',
            fontWeight: '500',
            color: '#111111',
            marginBottom: '0.75rem',
            lineHeight: '1.25'
          }}>
            {product.title}
          </h1>

          {/* Price Row */}
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.6rem', marginBottom: '0.3rem' }}>
            <span style={{ fontSize: '1.6rem', fontWeight: '800', color: '#f26955', fontFamily: 'var(--font-sans)' }}>
              ₹{product.price.toLocaleString('en-IN')}
            </span>
            <span style={{ fontSize: '0.9rem', textDecoration: 'line-through', color: 'var(--text-mute)' }}>
              MRP ₹{originalMrp.toLocaleString('en-IN')}
            </span>
            <span style={{
              backgroundColor: '#fee2e2',
              color: '#ef4444',
              padding: '0.15rem 0.5rem',
              fontSize: '0.72rem',
              fontWeight: '700',
              borderRadius: '4px'
            }}>
              {discountPercentage}% OFF
            </span>
          </div>
          <p style={{ fontSize: '0.7rem', color: 'var(--text-mute)', marginBottom: '1rem' }}>
            Inclusive of all taxes
          </p>

          {/* Green Discount Offer Strip */}
          <div style={{
            backgroundColor: '#f0fdf4',
            border: '1px solid #dcfce7',
            padding: '0.75rem 1rem',
            borderRadius: '8px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '1.5rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{
                backgroundColor: '#16a34a',
                color: '#ffffff',
                width: '18px',
                height: '18px',
                borderRadius: '50%',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '0.65rem',
                fontWeight: '800'
              }}>%</span>
              <span style={{ fontSize: '0.78rem', color: '#14532d', fontWeight: '600' }}>
                Get it for <span style={{ color: '#16a34a' }}>₹{getItForPrice.toLocaleString('en-IN')}</span>
              </span>
            </div>
            <span style={{ fontSize: '0.72rem', color: '#16a34a', fontWeight: '700', cursor: 'pointer', textDecoration: 'underline' }}>
              How?
            </span>
          </div>

          {/* Color preview section */}
          <div style={{ marginBottom: '1.75rem' }}>
            <span style={{ display: 'block', fontSize: '0.72rem', fontWeight: '700', textTransform: 'uppercase', color: '#666666', marginBottom: '0.5rem' }}>
              COLOR: <span style={{ color: '#111111' }}>{product.category === 'Sarees' ? 'Deep Crimson Zari' : 'Classic Hue'}</span>
            </span>
            <div style={{
              width: '32px',
              height: '32px',
              borderRadius: '6px',
              border: '2px solid #111111',
              padding: '2px',
              cursor: 'pointer'
            }}>
              <img src={product.image} alt="color texture" style={{ width: '100%', height: '100%', borderRadius: '3px', objectFit: 'cover' }} />
            </div>
          </div>

          {/* 3. SIZE SELECTOR GRID */}
          {!productSizes.includes("Standard") && (
            <div style={{ marginBottom: '1.75rem' }}>
              <span style={{ display: 'block', fontSize: '0.72rem', fontWeight: '700', textTransform: 'uppercase', color: '#666666', marginBottom: '0.75rem' }}>
                SELECT SIZE
              </span>
              
              <div style={{ display: 'flex', gap: '0.6rem' }}>
                {standardSizes.map((size) => {
                  const isAvailable = productSizes.includes(size);
                  const isSelected = selectedSize === size;
                  
                  return (
                    <button
                      key={size}
                      disabled={!isAvailable}
                      onClick={() => setSelectedSize(size)}
                      style={{
                        width: '42px',
                        height: '42px',
                        borderRadius: '6px',
                        border: isSelected 
                          ? '2px solid #000000' 
                          : '1px solid #dddddd',
                        backgroundColor: isSelected 
                          ? '#ffffff' 
                          : !isAvailable 
                            ? '#f5f5f5' 
                            : '#ffffff',
                        color: !isAvailable ? '#b5b5b5' : '#111111',
                        fontSize: '0.85rem',
                        fontWeight: '700',
                        cursor: isAvailable ? 'pointer' : 'not-allowed',
                        position: 'relative',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        outline: 'none',
                        transition: 'all 0.15s ease'
                      }}
                    >
                      {size}
                      {/* Strike-through for disabled size options */}
                      {!isAvailable && (
                        <div style={{
                          position: 'absolute',
                          top: '50%',
                          left: 0,
                          width: '100%',
                          height: '1.5px',
                          backgroundColor: '#cccccc',
                          transform: 'rotate(-45deg)'
                        }} />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Size recommendation strip */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0.75rem 1rem',
                backgroundColor: '#f5f5f5',
                borderRadius: '8px',
                marginTop: '1rem',
                cursor: 'pointer'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#333333', fontSize: '0.76rem', fontWeight: '600' }}>
                  <Ruler size={15} />
                  Need a size recommendation?
                </div>
                <ChevronRight size={14} color="#666666" />
              </div>
            </div>
          )}

          {/* 4. ACTIONS & ADD TO CART BAR */}
          <div style={{ display: 'flex', gap: '0.75rem', marginTop: '2rem', marginBottom: '2rem' }}>
            {/* Wishlist Heart Toggle */}
            <button
              onClick={() => setIsWishlisted(!isWishlisted)}
              style={{
                width: '46px',
                height: '46px',
                borderRadius: '8px',
                border: '1.5px solid #dddddd',
                backgroundColor: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                outline: 'none',
                color: isWishlisted ? '#ef4444' : '#666666',
                transition: 'all 0.2s ease'
              }}
              aria-label="Toggle wishlist"
            >
              <Heart size={20} fill={isWishlisted ? '#ef4444' : 'none'} />
            </button>

            {/* Chat Consultation */}
            <button
              onClick={() => alert("Connecting you to a Velnora design consultant via WhatsApp…")}
              style={{
                width: '46px',
                height: '46px',
                borderRadius: '8px',
                border: '1.5px solid #dddddd',
                backgroundColor: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                outline: 'none',
                color: '#666666'
              }}
              aria-label="Consult expert"
            >
              <MessageSquare size={20} />
            </button>

            {/* Add to bag action */}
            <button
              onClick={handleAddToBag}
              style={{
                flex: 1,
                backgroundColor: '#ffb200', // Gold orange
                color: '#ffffff',
                border: 'none',
                height: '46px',
                borderRadius: '8px',
                fontSize: '0.9rem',
                fontWeight: '800',
                letterSpacing: '0.05em',
                cursor: 'pointer',
                outline: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 12px rgba(255, 178, 0, 0.2)'
              }}
            >
              ADD TO BAG
            </button>
          </div>

          {/* 5. COMMERCIAL VALUE BULLETS */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '0.85rem',
            padding: '1.25rem',
            backgroundColor: '#fafafa',
            borderRadius: '10px',
            border: '1px solid #eeeeee',
            fontSize: '0.75rem',
            lineHeight: '1.4',
            marginBottom: '2rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem' }}>
              <Truck size={16} style={{ color: '#ffb200', marginTop: '0.1rem' }} />
              <div>
                <strong>Fast Delivery available!</strong> Free shipping on this signature product. Enter your pin code inside the bag drawer to calculate transit times.
              </div>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem' }}>
              <RotateCcw size={16} style={{ color: '#ffb200', marginTop: '0.1rem' }} />
              <div>
                <strong>7 days easy return</strong> with complimentary door-step pick up. Excludes customized embroidery requests.
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem' }}>
              <Coins size={16} style={{ color: '#ffb200', marginTop: '0.1rem' }} />
              <div>
                <strong>Cash on delivery (COD)</strong> available in most regions across India. Pay at your doorstep.
              </div>
            </div>
          </div>

          {/* 6. EXPANDABLE ACCORDIONS */}
          <div style={{ borderTop: '1px solid #eeeeee', borderBottom: '1px solid #eeeeee', marginBottom: '2.5rem' }}>
            {/* About Product */}
            <div style={{ borderBottom: '1px solid #f0f0f0' }}>
              <button
                onClick={() => setIsAboutOpen(!isAboutOpen)}
                style={{
                  width: '100%',
                  padding: '1rem 0.25rem',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  fontWeight: '700',
                  fontSize: '0.8rem',
                  letterSpacing: '0.05em',
                  color: '#111111',
                  textTransform: 'uppercase'
                }}
              >
                About this product
                {isAboutOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </button>
              {isAboutOpen && (
                <div style={{ padding: '0 0.25rem 1rem 0.25rem', fontSize: '0.78rem', color: '#666666', lineHeight: '1.6' }}>
                  <p style={{ marginBottom: '0.5rem' }}>{product.description}</p>
                  {product.material && <p><strong>Material:</strong> {product.material}</p>}
                  {product.zari && product.zari !== 'None' && <p><strong>Weave/Zari:</strong> {product.zari}</p>}
                  {product.care && <p><strong>Care Instructions:</strong> {product.care}</p>}
                </div>
              )}
            </div>

            {/* Service & Policy */}
            <div>
              <button
                onClick={() => setIsPolicyOpen(!isPolicyOpen)}
                style={{
                  width: '100%',
                  padding: '1rem 0.25rem',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  fontWeight: '700',
                  fontSize: '0.8rem',
                  letterSpacing: '0.05em',
                  color: '#111111',
                  textTransform: 'uppercase'
                }}
              >
                Service & Policy
                {isPolicyOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </button>
              {isPolicyOpen && (
                <div style={{ padding: '0 0.25rem 1rem 0.25rem', fontSize: '0.78rem', color: '#666666', lineHeight: '1.6' }}>
                  <p style={{ marginBottom: '0.5rem' }}>Every Velnora package is shipped in luxury sandalwood-infused custom packaging (muslin wrappings & box protectors) to safeguard pure metallic threads from oxidation.</p>
                  <p>In-transit shipments are 100% transit-insured. Dispatch is guaranteed within 24-48 business hours from receipt of the order.</p>
                </div>
              )}
            </div>
          </div>

          {/* 7. CUSTOMER REVIEWS LIST */}
          <section style={{ marginBottom: '3rem' }}>
            <h3 style={{
              fontSize: '1.1rem',
              fontWeight: '800',
              textTransform: 'uppercase',
              letterSpacing: '0.02em',
              color: '#111111',
              marginBottom: '1rem'
            }}>
              REVIEWS ({reviews.length})
            </h3>

            {/* Horizontal Scroll list of review photos */}
            <div style={{
              display: 'flex',
              gap: '0.5rem',
              overflowX: 'auto',
              paddingBottom: '1rem',
              marginBottom: '1rem',
              scrollbarWidth: 'none',
              msOverflowStyle: 'none'
            }} className="horizontal-scroll-hide">
              {reviews.flatMap(r => r.images || []).map((imgUrl, i) => (
                <img 
                  key={i} 
                  src={imgUrl} 
                  alt="Review upload details" 
                  style={{
                    width: '90px',
                    height: '90px',
                    objectFit: 'cover',
                    borderRadius: '8px',
                    border: '1px solid #ebebeb',
                    flexShrink: 0
                  }}
                />
              ))}
            </div>

            {/* Review Cards list */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {reviews.map((rev) => (
                <div 
                  key={rev.id || rev.author}
                  style={{
                    border: '1px solid #ebebeb',
                    borderRadius: '10px',
                    padding: '1rem',
                    backgroundColor: '#ffffff'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                    {/* Stars */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.2rem', color: '#fbbf24' }}>
                      {[...Array(5)].map((_, idx) => (
                        <Star key={idx} size={11} fill={idx < Math.floor(rev.rating) ? '#fbbf24' : 'none'} />
                      ))}
                      <span style={{ fontSize: '0.72rem', color: '#111111', fontWeight: '700', marginLeft: '0.25rem' }}>
                        {rev.rating.toFixed(1)}
                      </span>
                    </div>
                    {/* Date */}
                    <span style={{ fontSize: '0.7rem', color: 'var(--text-mute)' }}>{rev.date}</span>
                  </div>

                  {/* Comment */}
                  <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', lineHeight: '1.5', marginBottom: '0.75rem' }}>
                    {rev.text}
                  </p>

                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', color: '#666666' }}>
                    <span style={{ fontWeight: '600' }}>{rev.author}</span>
                    <span>Size Bought: <strong style={{ color: '#111111' }}>{rev.size || 'M'}</strong></span>
                  </div>
                </div>
              ))}
            </div>

            <button 
              onClick={() => alert("Showing all guest verification reviews…")}
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid #111111',
                borderRadius: '8px',
                backgroundColor: 'transparent',
                fontWeight: '700',
                fontSize: '0.8rem',
                cursor: 'pointer',
                marginTop: '1.25rem',
                fontFamily: 'var(--font-sans)',
                outline: 'none'
              }}
            >
              See All Reviews
            </button>
          </section>

          {/* 8. RECOMMENDED "FOR YOU" SECTION */}
          <section style={{ borderTop: '1px solid #eeeeee', paddingTop: '2.5rem' }}>
            <h3 style={{
              fontSize: '1.2rem',
              fontWeight: '800',
              color: '#111111',
              marginBottom: '1.25rem',
              letterSpacing: '-0.25px'
            }}>
              For you
            </h3>

            {/* 2-Column Grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '1.25rem 0.75rem'
            }}>
              {recommendations.map((item) => {
                const itemMrp = Math.round(item.price * 1.25);
                return (
                  <div 
                    key={item.id}
                    onClick={() => {
                      window.history.pushState(null, '', `?product=${item.id}`);
                      // Trigger reload context by dispatching popstate manually
                      window.dispatchEvent(new Event('popstate'));
                    }}
                    style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column' }}
                    className="for-you-card"
                  >
                    {/* Image container */}
                    <div style={{
                      position: 'relative',
                      aspectRatio: '3/4',
                      backgroundColor: '#f5f5f5',
                      borderRadius: '8px',
                      overflow: 'hidden',
                      marginBottom: '0.5rem'
                    }}>
                      <img src={item.image} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      
                      {/* Percent Off badge */}
                      <span style={{
                        position: 'absolute',
                        top: '0.5rem',
                        left: '0.5rem',
                        backgroundColor: '#ef4444',
                        color: '#ffffff',
                        padding: '0.15rem 0.35rem',
                        fontSize: '0.62rem',
                        fontWeight: '700',
                        borderRadius: '3px'
                      }}>
                        20% OFF
                      </span>

                      {/* Fast Delivery Badge */}
                      <div style={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        width: '100%',
                        backgroundColor: 'rgba(255,255,255,0.85)',
                        backdropFilter: 'blur(2px)',
                        padding: '0.3rem 0.5rem',
                        fontSize: '0.65rem',
                        fontWeight: '600',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.25rem',
                        color: '#111111'
                      }}>
                        <Truck size={10} color="#ffb200" />
                        Fast delivery
                      </div>
                    </div>

                    {/* Metadata details */}
                    <h4 style={{ fontSize: '0.78rem', fontWeight: '700', color: '#111111', margin: '0 0 0.15rem 0' }}>{item.title}</h4>
                    
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.35rem' }}>
                      <span style={{ fontSize: '0.85rem', fontWeight: '700', color: '#f26955' }}>
                        ₹{item.price.toLocaleString('en-IN')}
                      </span>
                      <span style={{ fontSize: '0.68rem', textDecoration: 'line-through', color: '#999999' }}>
                        ₹{itemMrp.toLocaleString('en-IN')}
                      </span>
                    </div>

                    <div style={{ display: 'flex', gap: '0.25rem', marginTop: '0.25rem' }}>
                      <span style={{
                        backgroundColor: '#fef3c7',
                        color: '#b45309',
                        padding: '0.1rem 0.35rem',
                        fontSize: '0.6rem',
                        fontWeight: '700',
                        borderRadius: '3px'
                      }}>
                        Trendy
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

        </div>
      </div>
      
      {/* Scroll to Top floating arrow overlay */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        style={{
          position: 'fixed',
          bottom: '1.5rem',
          right: '1.5rem',
          width: '42px',
          height: '42px',
          borderRadius: '50%',
          backgroundColor: '#ffffff',
          boxShadow: '0 4px 10px rgba(0,0,0,0.15)',
          border: '1.5px solid #dddddd',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          zIndex: 100
        }}
        aria-label="Scroll to top"
      >
        <ChevronUp size={20} />
      </button>
    </div>
  );
}

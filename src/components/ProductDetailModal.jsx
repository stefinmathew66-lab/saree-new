import React, { useState } from 'react';
import { X, ShoppingBag, ShieldCheck, Sparkles, RefreshCw } from 'lucide-react';

const STEPS = [
  {
    title: "1. Raw Silk Selection",
    summary: "Mulberry Cultivation",
    desc: "We select the highest grade raw mulberry silk. The silk filaments are carefully gathered and hand-spun on charkha looms to build high tensile strength and rich natural luster."
  },
  {
    title: "2. Natural Dyeing",
    summary: "Copper Vat Infusions",
    desc: "Spun threads are washed and dipped into copper vats infused with natural dye extracts (like indigo, madder, turmeric) to achieve rich, long-lasting color tones."
  },
  {
    title: "3. Pure Gold Zari twisting",
    summary: "Gold & Silver Twists",
    desc: "Artisans wrap fine silver wires around natural silk threads, then dip the strands in pure gold bath. Woven zari contains certified silver and pure gold content."
  },
  {
    title: "4. Setting the Weave Canvas",
    summary: "Loom Drafting",
    desc: "Setting up the warp (vertical) threads on the wooden handloom, drafting the pattern cards that guide the weave motif (e.g. temple borders, peacocks)."
  },
  {
    title: "5. Handloom Brocading",
    summary: "Double-Shuttle Weaving",
    desc: "Two weavers coordinate shuttles, manually interweaving the gold zari over the silk. Woven at a rate of just 2-3 inches per day, creating a unique signature piece."
  }
];

export default function ProductDetailModal({ product, onClose, onAddToCart }) {
  const [activeTab, setActiveTab] = useState('specs'); // 'specs' or 'loom'
  const [activeStep, setActiveStep] = useState(0);

  if (!product) return null;

  const isOutOfStock = product.stock === 0;

  return (
    <div className="modal-overlay open" onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="modal-title-id">
      <div className="modal-container" onClick={(e) => e.stopPropagation()} style={{ borderRadius: '12px', boxShadow: 'var(--shadow-modal)', border: '1px solid var(--border-color)' }}>
        
        {/* Close Button */}
        <button className="modal-close" onClick={onClose} aria-label="Close details dialog">
          <X size={18} aria-hidden="true" />
        </button>

        {/* Left Aspect Image */}
        <div className="modal-left" style={{ position: 'relative' }}>
          <img 
            src={product.image} 
            alt={product.altText || product.title} 
            className="modal-detail-img" 
          />
          {product.detailImage && (
            <div 
              style={{
                position: 'absolute',
                bottom: '1rem',
                left: '1rem',
                background: 'rgba(0, 0, 0, 0.75)',
                color: '#FFFFFF',
                padding: '4px 10px',
                fontSize: '0.65rem',
                fontFamily: 'var(--font-mono)',
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
                borderRadius: '4px',
                pointerEvents: 'none'
              }}
            >
              Artisan Weave Detail Preview
            </div>
          )}
        </div>

        {/* Right Aspect Details */}
        <div className="modal-right">
          <span className="uppercase-track" style={{ marginBottom: '0.5rem', display: 'block', fontSize: '0.7rem', color: 'var(--text-mute)' }}>
            {product.category} Collection
          </span>
          <h2 id="modal-title-id" className="modal-title" style={{ fontFamily: 'var(--font-sans)', fontSize: '2rem', fontWeight: 600, letterSpacing: '-0.03em', marginBottom: '1rem' }}>
            {product.title}
          </h2>
          
          {product.isPromo ? (
            <div className="modal-price-container" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '1rem' }}>
                <span className="modal-price" style={{ color: 'var(--text-primary)', margin: 0, fontFamily: 'var(--font-sans)', fontVariantNumeric: 'tabular-nums', fontSize: '1.5rem', fontWeight: 600 }}>
                  ₹{product.price.toLocaleString('en-IN')}
                </span>
                <span style={{ textDecoration: 'line-through', color: 'var(--text-mute)', opacity: 0.6, fontSize: '1.1rem', fontFamily: 'var(--font-sans)', fontVariantNumeric: 'tabular-nums' }}>
                  ₹{Math.round(product.price / 0.85).toLocaleString('en-IN')}
                </span>
              </div>
              <div 
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  backgroundColor: 'var(--bg-secondary)',
                  color: 'var(--text-primary)',
                  border: '1px solid var(--border-color)',
                  fontSize: '0.65rem',
                  fontFamily: 'var(--font-mono)',
                  fontWeight: 500,
                  letterSpacing: '0.02em',
                  padding: '3px 8px',
                  width: 'fit-content',
                  textTransform: 'uppercase',
                  borderRadius: '9999px'
                }}
              >
                ✦ Exclusive 15% Artisan Discount Applied
              </div>
            </div>
          ) : (
            <div className="modal-price" style={{ fontFamily: 'var(--font-sans)', fontVariantNumeric: 'tabular-nums', fontSize: '1.5rem', fontWeight: 600, marginBottom: '1.5rem', color: 'var(--text-primary)' }}>
              ₹{product.price.toLocaleString('en-IN')}
            </div>
          )}


          {/* Premium Tab Switches */}
          <div role="tablist" style={{ display: 'flex', gap: '1.5rem', borderBottom: '1px solid var(--border-color)', marginBottom: '1.5rem', paddingBottom: '0.25rem' }}>
            <button 
              role="tab"
              aria-selected={activeTab === 'specs'}
              onClick={() => setActiveTab('specs')}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontFamily: 'var(--font-sans)',
                fontSize: '0.75rem',
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.12em',
                color: activeTab === 'specs' ? 'var(--text-primary)' : 'var(--text-mute)',
                borderBottom: activeTab === 'specs' ? '2px solid var(--text-primary)' : '2px solid transparent',
                paddingBottom: '0.5rem',
                transition: 'var(--transition-fast)'
              }}
            >
              Specifications
            </button>
            <button 
              role="tab"
              aria-selected={activeTab === 'loom'}
              onClick={() => setActiveTab('loom')}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontFamily: 'var(--font-sans)',
                fontSize: '0.75rem',
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.12em',
                color: activeTab === 'loom' ? 'var(--text-primary)' : 'var(--text-mute)',
                borderBottom: activeTab === 'loom' ? '2px solid var(--text-primary)' : '2px solid transparent',
                paddingBottom: '0.5rem',
                transition: 'var(--transition-fast)'
              }}
            >
              The Loom Journey
            </button>
          </div>

          {/* TAB CONTENT: SPECS SHEET */}
          {activeTab === 'specs' && (
            <>
              <p className="modal-desc" style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', lineHeight: '1.6', marginBottom: '1.5rem' }}>
                {product.description}
              </p>

              {/* Technical specifications */}
              <div className="modal-specs">
                <div>
                  <h3 className="spec-item-lbl">Fabric & Weave</h3>
                  <div className="spec-item-val">{product.material || "Pure Silk"}</div>
                </div>
                <div>
                  <h3 className="spec-item-lbl">Zari Details</h3>
                  <div className="spec-item-val">{product.zari || "Pure Zari borders"}</div>
                </div>
                <div style={{ gridColumn: 'span 2', borderTop: '1px solid var(--border-color)', paddingTop: '0.75rem' }}>
                  <h3 className="spec-item-lbl">Care Instructions</h3>
                  <div className="spec-item-val" style={{ fontSize: '0.8rem', lineHeight: '1.4' }}>{product.care || "Dry clean only"}</div>
                </div>
                <div style={{ gridColumn: 'span 2', borderTop: '1px solid var(--border-color)', paddingTop: '0.75rem' }}>
                  <h3 className="spec-item-lbl">Why Handloom</h3>
                  <p style={{ fontSize: '0.8rem', lineHeight: '1.5', color: 'var(--text-secondary)', margin: 0 }}>
                    Every saree in our collection is hand-woven on traditional wooden looms by artisan families, preserving legacy craftsmanship and ethical livelihoods.
                  </p>
                </div>
              </div>
            </>
          )}

          {/* TAB CONTENT: LOOM JOURNEY TIMELINE */}
          {activeTab === 'loom' && (
            <div style={{ marginBottom: '2rem' }}>
              <span style={{ fontSize: '0.75rem', fontFamily: 'var(--font-sans)', color: 'var(--text-secondary)', display: 'block', marginBottom: '1rem', fontStyle: 'italic' }}>
                Select a step of the legacy lifecycle to read details:
              </span>
              
              <div className="loom-stepper">
                {STEPS.map((step, idx) => (
                  <button 
                    key={idx} 
                    role="button"
                    aria-expanded={activeStep === idx}
                    className={`loom-step ${activeStep === idx ? 'active' : ''}`}
                    onClick={() => setActiveStep(idx)}
                    style={{ 
                      background: 'none', 
                      border: 'none', 
                      textAlign: 'left', 
                      cursor: 'pointer', 
                      width: '100%', 
                      padding: '0.5rem 0',
                      display: 'block',
                      outline: 'none'
                    }}
                  >
                    <span className="loom-step-bullet" />
                    <div className="loom-step-title" style={{ fontFamily: 'var(--font-sans)', fontSize: '0.875rem', fontWeight: 600, color: activeStep === idx ? 'var(--text-primary)' : 'var(--text-secondary)' }}>
                      {step.title}
                    </div>
                    <div className="loom-step-desc" style={{ fontFamily: 'var(--font-sans)', fontSize: '0.8rem', color: 'var(--text-mute)', marginTop: '0.2rem' }}>
                      {step.summary}
                      {activeStep === idx && (
                        <div 
                          style={{ 
                            marginTop: '0.5rem', 
                            padding: '0.75rem 1rem', 
                            background: 'var(--bg-secondary)', 
                            borderRadius: '6px',
                            border: '1px solid var(--border-color)',
                            color: 'var(--text-secondary)', 
                            fontSize: '0.8rem',
                            lineHeight: '1.5'
                          }}
                        >
                          {step.desc}
                        </div>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Stock Notification */}
          <div style={{ marginBottom: '2.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span 
              style={{ 
                width: '8px', 
                height: '8px', 
                borderRadius: '50%', 
                backgroundColor: isOutOfStock ? '#E53935' : product.stock <= 3 ? '#FB8C00' : '#43A047',
                display: 'inline-block' 
              }}
            />
            <span style={{ fontSize: '0.8rem', fontWeight: 500, color: 'var(--text-secondary)', fontFamily: 'var(--font-sans)' }}>
              {isOutOfStock ? 'Sold Out' : product.stock <= 3 ? `Limited stock: ${product.stock} units remaining` : 'In Stock (Ready to Dispatch)'}
            </span>
          </div>

          {/* Action Trigger */}
          <button 
            className="btn-premium"
            disabled={isOutOfStock}
            onClick={() => onAddToCart(product)}
            style={{ 
              width: '100%', 
              opacity: isOutOfStock ? 0.5 : 1, 
              cursor: isOutOfStock ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '1rem',
              borderRadius: '100px'
            }}
          >
            <ShoppingBag size={16} aria-hidden="true" />
            {isOutOfStock ? 'Out of Stock' : 'Add to Collection Bag'}
          </button>

          {/* Trust badges */}
          <div 
            style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              marginTop: '2rem', 
              paddingTop: '1.5rem', 
              borderTop: '1px solid var(--border-color)',
              fontSize: '0.7rem',
              fontFamily: 'var(--font-mono)',
              color: 'var(--text-secondary)',
              letterSpacing: '0.02em'
            }}
          >
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
              <ShieldCheck size={14} aria-hidden="true" style={{ color: 'var(--text-primary)' }} />
              100% Authentic Handloom
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
              <Sparkles size={14} aria-hidden="true" style={{ color: 'var(--text-primary)' }} />
              Pure Zari Certified
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
              <RefreshCw size={14} aria-hidden="true" style={{ color: 'var(--text-primary)' }} />
              Secure Shipping
            </span>
          </div>

        </div>

      </div>
    </div>
  );
}

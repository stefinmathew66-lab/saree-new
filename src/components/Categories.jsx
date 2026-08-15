import React from 'react';

const CATEGORY_ITEMS = [
  { label: 'Dresses', target: 'Summer', img: 'images/summer_dress.webp' },
  { label: 'Tops & Blouses', target: 'Summer', img: 'images/linen_beige.webp' },
  { label: 'Bottoms', target: 'Co-ords', img: 'images/coord_set_detail.webp' },
  { label: 'Denim', target: 'Co-ords', img: 'images/georgette_indigo.webp' },
  { label: 'T-Shirts', target: 'Summer', img: 'images/summer_dress_detail.webp' },
  { label: 'Co-ords', target: 'Co-ords', img: 'images/coord_set.webp' },
  { label: 'Loungewear & Lingerie', target: 'Co-ords', img: 'images/organza_mint_detail.webp' },
  { label: 'Curve', target: 'Suits', img: 'images/suit_anarkali.webp' },
  { label: 'Bags', target: 'All', img: 'images/banarasi_pink_detail.webp' },
  { label: 'Jewelry', target: 'Sarees', img: 'images/silk_kanchipuram_detail.webp' },
  { label: 'Accessories', target: 'All', img: 'images/organza_mint.webp' },
  { label: 'Beauty', target: 'All', img: 'images/banarasi_pink.webp' }
];

export default function Categories({ onCategoryClick }) {
  return (
    <section className="categories-grid-section" style={{
      padding: '1.5rem 1rem 3rem 1rem',
      backgroundColor: '#ffffff',
      fontFamily: 'var(--font-sans)',
      width: '100%'
    }}>
      <div style={{ maxWidth: '480px', margin: '0 auto' }}>
        {/* Title */}
        <h2 style={{
          fontSize: '1.25rem',
          fontWeight: '800',
          letterSpacing: '0.02em',
          color: '#171717',
          textTransform: 'uppercase',
          marginBottom: '1.5rem',
          paddingLeft: '0.2rem'
        }}>
          CATEGORIES
        </h2>

        {/* 4-Column Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '1.25rem 0.5rem',
          justifyItems: 'center',
          alignItems: 'start'
        }}>
          {CATEGORY_ITEMS.map((cat, index) => (
            <div 
              key={index}
              onClick={() => onCategoryClick && onCategoryClick(cat.target)}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                cursor: 'pointer',
                width: '100%',
                maxWidth: '85px',
                textAlign: 'center'
              }}
              className="category-grid-item"
            >
              {/* Circular image frame */}
              <div style={{
                width: '74px',
                height: '74px',
                borderRadius: '50%',
                backgroundColor: '#f5f5f5',
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '1px solid #ebebeb',
                transition: 'all 0.2s ease',
                position: 'relative'
              }}
              className="category-circle-frame"
              >
                <img 
                  src={cat.img} 
                  alt={cat.label} 
                  style={{
                    width: '84%',
                    height: '84%',
                    borderRadius: '50%',
                    objectFit: 'cover'
                  }}
                />
              </div>

              {/* Label */}
              <span style={{
                fontSize: '0.72rem',
                fontWeight: '600',
                color: '#262626',
                marginTop: '0.5rem',
                lineHeight: '1.15',
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                wordBreak: 'break-word',
                maxHeight: '2.3rem'
              }}>
                {cat.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .category-grid-item:hover .category-circle-frame {
          transform: translateY(-2px);
          box-shadow: 0 4px 10px rgba(0,0,0,0.06);
          border-color: #f26955;
        }
      `}</style>
    </section>
  );
}

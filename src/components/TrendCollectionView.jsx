import React from 'react';
import { ArrowLeft, ChevronRight } from 'lucide-react';
import './TrendCollectionView.css';

const TREND_DATA = {
  'free-spirit': {
    label: 'Free Spirit',
    image: '/trend_free_spirit.jpg',
    description: 'Organic, flowy linen garments and heritage weaves in warm sand and earth tones. Designed for effortless resort wear and modern relaxed luxury.',
    productIds: ['prod-6', 'prod-4', 'prod-12']
  },
  'sheer-play': {
    label: 'Sheer Play',
    image: '/trend_sheer_play.jpg',
    description: 'Delicate layers, sheer organza fabrics, and light ruffles that catch the breeze. A celebration of translucent elegance, soft pastel hues, and ethereal textures.',
    productIds: ['prod-3', 'prod-9', 'prod-13']
  },
  'coastal-coded': {
    label: 'Coastal Coded',
    image: '/trend_coastal_coded.jpg',
    description: 'Vibrant luxury prints, coordinates, and resort-chic patterns inspired by Mediterranean summers and maritime sophistication.',
    productIds: ['prod-8', 'prod-14', 'prod-10']
  },
  'forever-chic': {
    label: 'Forever chic',
    image: '/trend_forever_chic.jpg',
    description: 'Timeless heritage masterpieces, deep royal silks, and intricate gold-brocade embroidery that define classic evening wear.',
    productIds: ['prod-1', 'prod-2', 'prod-7', 'prod-5', 'prod-11']
  }
};

export default function TrendCollectionView({ trendSlug, products, onBack, onProductClick }) {
  const trend = TREND_DATA[trendSlug] || TREND_DATA['free-spirit'];
  const trendProducts = products.filter(p => trend.productIds.includes(p.id));

  return (
    <div className="trend-page-container">
      {/* Breadcrumb Navigation */}
      <div className="trend-breadcrumb container">
        <span onClick={onBack} className="breadcrumb-link">Home</span>
        <ChevronRight size={12} className="breadcrumb-separator" />
        <span className="breadcrumb-active">Collection: {trend.label}</span>
      </div>

      {/* Editorial Header Section */}
      <div className="trend-editorial-header container">
        <div className="trend-editorial-image-wrapper">
          <img src={trend.image} alt={trend.label} className="trend-editorial-image" />
          <div className="trend-editorial-overlay">
            <h1 className="trend-title serif-display">{trend.label}</h1>
            <p className="trend-subtitle">{trend.description}</p>
          </div>
        </div>
      </div>

      {/* Curated Products Section */}
      <div className="trend-products-section container">
        <div className="section-header-row">
          <button onClick={onBack} className="trend-back-btn">
            <ArrowLeft size={16} />
            <span>Back to Store</span>
          </button>
          <span className="trend-product-count">{trendProducts.length} Exquisite Pieces</span>
        </div>

        {/* Product Grid */}
        <div className="trend-product-grid">
          {trendProducts.map((product) => {
            return (
              <div 
                key={product.id} 
                className="trend-product-card"
                onClick={() => onProductClick(product.id)}
              >
                <div className="product-card-img-wrapper">
                  <img src={product.image} alt={product.altText || product.title} className="product-card-img" />
                  {product.featured && <span className="trend-badge-featured">Signature</span>}
                </div>
                <div className="product-card-details">
                  <h3 className="product-card-title">{product.title}</h3>
                  <div className="product-card-meta">
                    <span className="product-card-price">₹{product.price.toLocaleString('en-IN')}</span>
                    {product.category && <span className="product-card-category">{product.category}</span>}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

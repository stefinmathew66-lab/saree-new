import React from 'react';
import { X, ShoppingBag, Heart, Trash2 } from 'lucide-react';
import './WishlistDrawer.css';

export default function WishlistDrawer({
  isOpen,
  onClose,
  wishlist,
  products,
  onRemoveItem,
  onAddToCart,
  onProductClick
}) {
  const wishlistedProducts = products.filter((p) => wishlist.includes(p.id));

  return (
    <div className={`wishlist-drawer-wrapper ${isOpen ? 'is-open' : ''}`}>
      {/* Background Overlay */}
      <div className="wishlist-overlay" onClick={onClose} />

      {/* Slide-out Panel */}
      <div className="wishlist-panel">
        {/* Drawer Header */}
        <div className="wishlist-header">
          <div className="wishlist-header-title">
            <Heart size={20} className="wishlist-header-icon" />
            <h2>My Wishlist</h2>
            <span className="wishlist-count-badge">{wishlistedProducts.length}</span>
          </div>
          <button className="wishlist-close-btn" onClick={onClose} aria-label="Close wishlist">
            <X size={20} />
          </button>
        </div>

        {/* Drawer Content */}
        <div className="wishlist-content">
          {wishlistedProducts.length === 0 ? (
            /* Empty State */
            <div className="wishlist-empty-state">
              <Heart size={48} className="empty-heart-icon" strokeWidth={1} />
              <h3>Your Wishlist is Empty</h3>
              <p>Explore our signature handlooms, linen apparel, and luxury suits to save your favorites.</p>
              <button 
                className="btn-premium wishlist-shop-btn" 
                onClick={() => {
                  onClose();
                  window.scrollTo({ top: window.innerHeight * 0.8, behavior: 'smooth' });
                }}
              >
                Start Shopping
              </button>
            </div>
          ) : (
            /* Wishlist Items List */
            <div className="wishlist-items-list">
              {wishlistedProducts.map((product) => (
                <div key={product.id} className="wishlist-item-card">
                  {/* Product Image */}
                  <div 
                    className="wishlist-item-image-wrapper"
                    onClick={() => {
                      onProductClick(product.id);
                      onClose();
                    }}
                  >
                    <img 
                      src={product.image} 
                      alt={product.altText || product.title} 
                      className="wishlist-item-image"
                    />
                  </div>

                  {/* Product Details */}
                  <div className="wishlist-item-info">
                    <h4 
                      onClick={() => {
                        onProductClick(product.id);
                        onClose();
                      }}
                    >
                      {product.title}
                    </h4>
                    <span className="wishlist-item-category">{product.category}</span>
                    <span className="wishlist-item-price">₹{product.price.toLocaleString('en-IN')}</span>
                  </div>

                  {/* Action Buttons */}
                  <div className="wishlist-item-actions">
                    <button 
                      className="wishlist-add-to-bag-btn"
                      onClick={() => onAddToCart(product)}
                      title="Add to Shopping Bag"
                      aria-label="Add to bag"
                    >
                      <ShoppingBag size={16} />
                    </button>
                    <button 
                      className="wishlist-remove-item-btn"
                      onClick={() => onRemoveItem(product.id)}
                      title="Remove from Wishlist"
                      aria-label="Remove item"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

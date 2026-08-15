import React from 'react';
import { Calendar, Clock, ArrowLeft, Share2, Check } from 'lucide-react';
import { blogArticles } from '../data/blogArticles';

export default function BlogJournal({ 
  activeArticleId, 
  onArticleSelect, 
  onBackToHome 
}) {
  const [copied, setCopied] = React.useState(false);

  const selectedArticle = blogArticles.find(a => a.id === activeArticleId || a.slug === activeArticleId);

  const handleShare = (article, e) => {
    e.stopPropagation();
    const url = `${window.location.origin}${window.location.pathname}?article=${article.slug}`;
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  if (selectedArticle) {
    // Article Detail Reader View
    return (
      <section style={{ backgroundColor: 'var(--bg-primary)', padding: '5rem 0 8rem 0', minHeight: '85vh' }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          
          {/* Back Navigation */}
          <button 
            onClick={() => onArticleSelect(null)}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              fontSize: '0.75rem',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              color: 'var(--accent-gold-dark)',
              fontFamily: 'var(--font-sans)',
              fontWeight: 600,
              marginBottom: '2.5rem',
              transition: 'var(--transition-fast)'
            }}
          >
            <ArrowLeft size={14} />
            Back to Journal
          </button>

          {/* Article Header */}
          <header style={{ marginBottom: '3rem' }}>
            <span 
              style={{
                fontSize: '0.7rem',
                textTransform: 'uppercase',
                letterSpacing: '0.15em',
                color: 'var(--accent-gold-dark)',
                fontWeight: 700,
                display: 'block',
                marginBottom: '1rem'
              }}
            >
              {selectedArticle.category}
            </span>
            <h1 
              style={{ 
                fontSize: '2.75rem', 
                fontFamily: 'var(--font-serif)', 
                lineHeight: '1.25', 
                color: 'var(--text-primary)',
                marginBottom: '1.5rem' 
              }}
            >
              {selectedArticle.title}
            </h1>
            
            {/* Meta Row */}
            <div 
              style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                borderBottom: '1px solid var(--border-color)',
                paddingBottom: '1.5rem',
                color: 'var(--text-secondary)',
                fontSize: '0.8rem'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <Calendar size={13} />
                  {selectedArticle.date}
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <Clock size={13} />
                  {selectedArticle.readTime}
                </span>
              </div>
              <button
                onClick={(e) => handleShare(selectedArticle, e)}
                style={{
                  background: 'none',
                  border: '1px solid var(--border-color)',
                  cursor: 'pointer',
                  padding: '0.4rem 0.8rem',
                  borderRadius: '2px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  fontSize: '0.7rem',
                  fontFamily: 'var(--font-sans)',
                  color: 'var(--text-primary)',
                  backgroundColor: 'var(--bg-secondary)',
                  transition: 'var(--transition-fast)'
                }}
              >
                {copied ? <Check size={12} className="text-gold" /> : <Share2 size={12} />}
                {copied ? 'Link Copied' : 'Share Article'}
              </button>
            </div>
          </header>

          {/* Featured Image */}
          <div style={{ width: '100%', maxHeight: '450px', overflow: 'hidden', borderRadius: '4px', marginBottom: '3.5rem' }}>
            <img 
              src={selectedArticle.image} 
              alt={selectedArticle.altText} 
              style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
            />
          </div>

          {/* Article Rich Text Content */}
          <article className="journal-article-body" style={{ fontFamily: 'var(--font-serif)', fontSize: '1.05rem', lineHeight: '1.85', color: 'var(--text-primary)' }}>
            {selectedArticle.content.map((block, idx) => {
              if (block.type === 'paragraph') {
                return (
                  <p key={idx} style={{ marginBottom: '2rem', textAlign: 'justify' }}>
                    {block.text}
                  </p>
                );
              } else if (block.type === 'heading') {
                return (
                  <h2 
                    key={idx} 
                    style={{ 
                      fontFamily: 'var(--font-serif)', 
                      fontSize: '1.75rem', 
                      lineHeight: '1.3', 
                      marginTop: '3.5rem', 
                      marginBottom: '1.25rem',
                      color: 'var(--text-primary)',
                      borderLeft: '3px solid var(--accent-gold)',
                      paddingLeft: '1rem'
                    }}
                  >
                    {block.text}
                  </h2>
                );
              }
              return null;
            })}
          </article>

          {/* Heritage footer banner inside article reader */}
          <footer 
            style={{ 
              marginTop: '6rem', 
              padding: '3rem', 
              border: '1px solid var(--border-color)', 
              backgroundColor: 'var(--bg-secondary)', 
              borderRadius: '4px',
              textAlign: 'center'
            }}
          >
            <span className="uppercase-track text-gold" style={{ fontSize: '0.65rem', display: 'block', marginBottom: '0.5rem' }}>
              THE VELNORA BOUTIQUE
            </span>
            <h3 style={{ fontSize: '1.5rem', fontFamily: 'var(--font-serif)', marginBottom: '1rem' }}>
              Experience Our Heritage Weaves
            </h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: '1.6', maxWidth: '450px', margin: '0 auto 2rem auto' }}>
              Every Kanchipuram and Banarasi creation in our collection is hand-loom certified and sourced ethically from weaver clusters.
            </p>
            <button className="btn-premium" onClick={onBackToHome}>
              Explore Saree Catalog
            </button>
          </footer>

        </div>
      </section>
    );
  }

  // Journal Grid Catalog List View
  return (
    <section style={{ backgroundColor: 'var(--bg-primary)', padding: '5rem 0 8rem 0', minHeight: '85vh' }}>
      <div className="container">
        
        {/* Page Title */}
        <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
          <span className="uppercase-track text-gold" style={{ display: 'block', marginBottom: '0.75rem' }}>
            WEAVER'S KNOWLEDGE & LEGACY
          </span>
          <h1 style={{ fontSize: '3rem', fontFamily: 'var(--font-serif)', color: 'var(--text-primary)' }}>
            The Velnora Journal
          </h1>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', maxWidth: '480px', margin: '0.75rem auto 0 auto', lineHeight: '1.6' }}>
            Articles, guides, and care instructions to help you preserve, authenticate, and appreciate the art of traditional Indian handloom weaving.
          </p>
        </div>

        {/* Journal Cards Grid */}
        <div 
          style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', 
            gap: '2.5rem' 
          }}
        >
          {blogArticles.map((article) => (
            <div 
              key={article.id}
              className="reveal active"
              onClick={() => onArticleSelect(article.slug)}
              style={{
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                border: '1px solid var(--border-color)',
                backgroundColor: 'var(--bg-secondary)',
                borderRadius: '4px',
                overflow: 'hidden',
                transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-6px)';
                e.currentTarget.style.boxShadow = 'var(--shadow-md)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              {/* Card Image */}
              <div style={{ position: 'relative', width: '100%', height: '220px', overflow: 'hidden' }}>
                <img 
                  src={article.image} 
                  alt={article.altText} 
                  style={{ 
                    width: '100%', 
                    height: '100%', 
                    objectFit: 'cover',
                    transition: 'transform 0.6s ease' 
                  }} 
                  onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
                  onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                />
                <span 
                  style={{
                    position: 'absolute',
                    top: '1rem',
                    left: '1rem',
                    backgroundColor: 'rgba(18, 16, 14, 0.85)',
                    color: '#FFFFFF',
                    fontSize: '0.6rem',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                    padding: '0.35rem 0.7rem',
                    borderRadius: '2px',
                    backdropFilter: 'blur(4px)'
                  }}
                >
                  {article.category}
                </span>
              </div>

              {/* Card Content */}
              <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
                <div 
                  style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '1rem', 
                    fontSize: '0.7rem', 
                    color: 'var(--text-secondary)',
                    marginBottom: '1rem'
                  }}
                >
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                    <Calendar size={11} />
                    {article.date}
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                    <Clock size={11} />
                    {article.readTime}
                  </span>
                </div>

                <h3 
                  style={{ 
                    fontSize: '1.4rem', 
                    fontFamily: 'var(--font-serif)', 
                    color: 'var(--text-primary)',
                    lineHeight: '1.3',
                    marginBottom: '1rem' 
                  }}
                >
                  {article.title}
                </h3>
                
                <p 
                  style={{ 
                    fontSize: '0.8rem', 
                    color: 'var(--text-secondary)',
                    lineHeight: '1.6',
                    marginBottom: '2rem',
                    flex: 1
                  }}
                >
                  {article.excerpt}
                </p>

                <div 
                  style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    borderTop: '1px solid var(--border-color)',
                    paddingTop: '1.25rem',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    color: 'var(--accent-gold-dark)',
                    fontFamily: 'var(--font-sans)'
                  }}
                >
                  <span>Read Full Article →</span>
                  <button 
                    onClick={(e) => handleShare(article, e)}
                    style={{
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      color: 'var(--text-secondary)',
                      padding: '0.25rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: 'color 0.2s ease'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.color = 'var(--accent-gold-dark)'}
                    onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-secondary)'}
                    title="Copy Article Link"
                  >
                    <Share2 size={13} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

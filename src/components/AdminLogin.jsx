import React, { useState } from 'react';
import { Lock, User } from 'lucide-react';

export default function AdminLogin({ onLoginSuccess }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username === 'admin' && password === 'iamvelnora') {
      onLoginSuccess();
    } else {
      setError('Invalid administrative credentials. Please verify and retry.');
    }
  };

  return (
    <div 
      style={{ 
        minHeight: '80vh', 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center',
        padding: '2rem',
        backgroundColor: 'var(--bg-primary)'
      }}
    >
      <div 
        className="admin-login-card"
        style={{ 
          width: '100%', 
          maxWidth: '400px', 
          border: '1px solid var(--border-color)', 
          boxShadow: 'var(--shadow-md)',
          padding: '3rem 2.5rem',
          borderRadius: '12px',
          backgroundColor: '#ffffff'
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <span className="uppercase-track" style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.7rem', color: 'var(--text-mute)', fontFamily: 'var(--font-mono)' }}>
            THE VELNORA STUDIO
          </span>
          <h2 style={{ fontSize: '2rem', fontFamily: 'var(--font-sans)', fontWeight: 600, letterSpacing: '-0.03em', color: 'var(--text-primary)' }}>
            Admin portal.
          </h2>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '0.5rem', fontFamily: 'var(--font-sans)' }}>
            Access the inventory, order logs, and customer inquiries
          </p>
        </div>

        {error && (
          <div 
            style={{ 
              backgroundColor: '#f7d4d6', 
              color: '#ee0000', 
              padding: '0.75rem 1rem', 
              fontSize: '0.8rem', 
              marginBottom: '1.5rem', 
              border: '1px solid #ee0000',
              borderRadius: '6px',
              fontFamily: 'var(--font-sans)'
            }}
          >
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group" style={{ marginBottom: '1.25rem' }}>
            <label htmlFor="admin-username" className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.75rem', fontWeight: 500, marginBottom: '0.4rem', color: 'var(--text-secondary)' }}>
              <User size={12} aria-hidden="true" />
              Username
            </label>
            <input 
              id="admin-username"
              type="text" 
              name="username"
              className="form-input" 
              placeholder="admin"
              required 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoComplete="username"
              spellCheck={false}
              style={{ width: '100%', padding: '0px 12px', height: '40px', border: '1px solid var(--border-color)', borderRadius: '6px', fontSize: '0.875rem', outline: 'none' }}
            />
          </div>

          <div className="form-group" style={{ marginBottom: '2rem' }}>
            <label htmlFor="admin-password" className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.75rem', fontWeight: 500, marginBottom: '0.4rem', color: 'var(--text-secondary)' }}>
              <Lock size={12} aria-hidden="true" />
              Password
            </label>
            <input 
              id="admin-password"
              type="password" 
              name="password"
              className="form-input" 
              placeholder="•••••"
              required 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              style={{ width: '100%', padding: '0px 12px', height: '40px', border: '1px solid var(--border-color)', borderRadius: '6px', fontSize: '0.875rem', outline: 'none' }}
            />
          </div>

          <button 
            type="submit" 
            className="btn-premium" 
            style={{ width: '100%', borderRadius: '100px' }}
          >
            Authenticate Portal
          </button>
        </form>
      </div>
    </div>
  );
}

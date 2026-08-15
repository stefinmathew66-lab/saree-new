import React, { useState, useEffect, useRef } from 'react';
import { Mail, Phone, ArrowRight, ShieldCheck, RefreshCw } from 'lucide-react';

export default function SignIn({ onSignInSuccess, onBackToCart }) {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otpCode, setOtpCode] = useState(['', '', '', '', '', '']);
  const [actualOtp, setActualOtp] = useState('');
  const [timer, setTimer] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [isLocked, setIsLocked] = useState(false);
  const [lockoutTime, setLockoutTime] = useState(0);
  const [errors, setErrors] = useState({});
  const [infoMessage, setInfoMessage] = useState('');

  const otpRefs = useRef([]);

  // Timer effect for OTP expiry
  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer(prev => prev - 1), 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  // Lockout effect for rate-limiting
  useEffect(() => {
    if (lockoutTime > 0) {
      const interval = setInterval(() => {
        setLockoutTime(prev => {
          if (prev <= 1) {
            setIsLocked(false);
            setAttempts(0);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [lockoutTime]);

  const validateInputs = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[6-9]\d{9}$/; // Indian mobile numbers

    if (!emailRegex.test(email)) {
      newErrors.email = "Please enter a valid email address.";
    }
    if (!phoneRegex.test(phone)) {
      newErrors.phone = "Please enter a valid 10-digit mobile number.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSendOtp = (e) => {
    e.preventDefault();
    if (isLocked) return;

    if (!validateInputs()) return;

    // Simulate OTP generation
    const generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();
    setActualOtp(generatedOtp);
    setOtpSent(true);
    setTimer(120); // 2 minutes expiry
    setOtpCode(['', '', '', '', '', '']);
    
    // For local simulation, we display it securely in a toast/tip box.
    setInfoMessage(`[Secure Verification] Your 6-digit OTP code is: ${generatedOtp}`);
    
    // Clear toast message after 12s
    setTimeout(() => {
      setInfoMessage('');
    }, 12000);
  };

  const handleOtpChange = (index, value) => {
    // Only accept numeric inputs
    if (isNaN(value)) return;

    const newOtp = [...otpCode];
    newOtp[index] = value.substring(value.length - 1);
    setOtpCode(newOtp);

    // Auto-focus next input
    if (value !== '' && index < 5) {
      otpRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (index, e) => {
    // Handle backspace back-focus
    if (e.key === 'Backspace' && otpCode[index] === '' && index > 0) {
      otpRefs.current[index - 1].focus();
    }
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    if (isLocked) return;

    const enteredOtp = otpCode.join('');

    if (enteredOtp.length < 6) {
      alert("Please enter the complete 6-digit verification code.");
      return;
    }

    if (timer === 0) {
      alert("OTP has expired. Please request a new code.");
      return;
    }

    if (enteredOtp === actualOtp) {
      // Create a mocked secure JWT token stored in sessionStorage
      const mockHeader = b64EncodeUnicode(JSON.stringify({ alg: "HS256", typ: "JWT" }));
      const mockPayload = b64EncodeUnicode(JSON.stringify({ 
        email, 
        phone, 
        exp: Math.floor(Date.now() / 1000) + (3600 * 2) // 2 hours
      }));
      const mockSignature = "secure_signature_hash_velnora";
      const token = `${mockHeader}.${mockPayload}.${mockSignature}`;
      
      sessionStorage.setItem('velnora_auth_token', token);
      
      // Clear alert and trigger success
      setAttempts(0);
      onSignInSuccess({ email, phone });
    } else {
      const newAttempts = attempts + 1;
      setAttempts(newAttempts);

      if (newAttempts >= 3) {
        setIsLocked(true);
        setLockoutTime(30); // 30s lockout
        alert("Too many failed attempts. Login is temporarily locked for 30 seconds for security.");
      } else {
        alert(`Incorrect OTP code. You have ${3 - newAttempts} attempts remaining.`);
      }
    }
  };

  // Helper function to safely encode unicode text to base64
  function b64EncodeUnicode(str) {
    return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g,
      function toSolidBytes(match, p1) {
        return String.fromCharCode('0x' + p1);
    }));
  }

  return (
    <div style={{
      flex: 1,
      padding: '2rem 1.5rem',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      fontFamily: 'var(--font-sans)',
      backgroundColor: '#ffffff'
    }}>
      <div style={{ maxWidth: '380px', margin: '0 auto', width: '100%' }}>
        {/* Security badge header */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.25rem' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem',
            backgroundColor: '#f0fdf4',
            color: '#16a34a',
            padding: '0.4rem 1rem',
            borderRadius: '99px',
            fontSize: '0.72rem',
            fontWeight: '600',
            border: '1px solid #dcfce7'
          }}>
            <ShieldCheck size={14} />
            Secure Verification Area
          </div>
        </div>

        <h3 style={{
          fontSize: '1.6rem',
          fontWeight: '700',
          color: '#171717',
          textAlign: 'center',
          marginBottom: '0.5rem',
          letterSpacing: '-0.5px'
        }}>
          Verification Required
        </h3>
        
        <p style={{
          fontSize: '0.8rem',
          color: '#666666',
          textAlign: 'center',
          marginBottom: '2rem',
          lineHeight: '1.4'
        }}>
          {!otpSent 
            ? "Enter your details to receive a secure one-time passcode before checking out."
            : "Enter the 6-digit code sent to your email and phone."
          }
        </p>

        {infoMessage && (
          <div style={{
            backgroundColor: '#fffbeb',
            border: '1px solid #fef3c7',
            color: '#b45309',
            padding: '0.85rem',
            borderRadius: '8px',
            fontSize: '0.75rem',
            lineHeight: '1.4',
            marginBottom: '1.5rem',
            fontFamily: 'var(--font-mono)',
            textAlign: 'center',
            wordBreak: 'break-all'
          }}>
            {infoMessage}
          </div>
        )}

        {isLocked && (
          <div style={{
            backgroundColor: '#fef2f2',
            border: '1px solid #fee2e2',
            color: '#dc2626',
            padding: '0.85rem',
            borderRadius: '8px',
            fontSize: '0.75rem',
            lineHeight: '1.4',
            marginBottom: '1.5rem',
            textAlign: 'center',
            fontWeight: '600'
          }}>
            Login locked. Try again in {lockoutTime}s
          </div>
        )}

        {!otpSent ? (
          /* Step 1: Input email and phone */
          <form onSubmit={handleSendOtp} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {/* Email Input */}
            <div>
              <label htmlFor="auth-email" style={{ display: 'block', fontSize: '0.75rem', fontWeight: '600', marginBottom: '0.4rem', color: '#444444' }}>Email Address</label>
              <div style={{ position: 'relative' }}>
                <Mail size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#888888' }} />
                <input 
                  id="auth-email"
                  type="email"
                  required
                  placeholder="name@example.com"
                  value={email}
                  disabled={isLocked}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0 12px 0 38px',
                    height: '42px',
                    border: errors.email ? '1.5px solid #dc2626' : '1px solid var(--border-color)',
                    borderRadius: '8px',
                    fontSize: '0.875rem',
                    outline: 'none',
                    backgroundColor: isLocked ? '#f5f5f5' : '#ffffff'
                  }}
                />
              </div>
              {errors.email && <span style={{ color: '#dc2626', fontSize: '0.68rem', marginTop: '0.25rem', display: 'block' }}>{errors.email}</span>}
            </div>

            {/* Phone Input */}
            <div>
              <label htmlFor="auth-phone" style={{ display: 'block', fontSize: '0.75rem', fontWeight: '600', marginBottom: '0.4rem', color: '#444444' }}>Mobile Number</label>
              <div style={{ position: 'relative' }}>
                <Phone size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#888888' }} />
                <input 
                  id="auth-phone"
                  type="tel"
                  required
                  maxLength={10}
                  placeholder="9876543210"
                  value={phone}
                  disabled={isLocked}
                  onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                  style={{
                    width: '100%',
                    padding: '0 12px 0 38px',
                    height: '42px',
                    border: errors.phone ? '1.5px solid #dc2626' : '1px solid var(--border-color)',
                    borderRadius: '8px',
                    fontSize: '0.875rem',
                    outline: 'none',
                    backgroundColor: isLocked ? '#f5f5f5' : '#ffffff'
                  }}
                />
              </div>
              {errors.phone && <span style={{ color: '#dc2626', fontSize: '0.68rem', marginTop: '0.25rem', display: 'block' }}>{errors.phone}</span>}
            </div>

            <button
              type="submit"
              disabled={isLocked}
              style={{
                backgroundColor: 'var(--text-primary)',
                color: '#ffffff',
                border: 'none',
                height: '42px',
                borderRadius: '99px',
                fontWeight: '600',
                fontSize: '0.85rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                cursor: isLocked ? 'not-allowed' : 'pointer',
                opacity: isLocked ? 0.6 : 1,
                marginTop: '0.5rem',
                fontFamily: 'var(--font-sans)',
                transition: 'opacity 0.2s ease'
              }}
            >
              Send Secure Passcode
              <ArrowRight size={14} />
            </button>
          </form>
        ) : (
          /* Step 2: Verification code input */
          <form onSubmit={handleVerifyOtp} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <label style={{ fontSize: '0.75rem', fontWeight: '600', marginBottom: '0.75rem', color: '#444444' }}>Verification Code</label>
              
              <div style={{ display: 'flex', gap: '0.4rem', justifyContent: 'center' }}>
                {otpCode.map((digit, index) => (
                  <input
                    key={index}
                    ref={el => otpRefs.current[index] = el}
                    type="text"
                    maxLength={1}
                    value={digit}
                    disabled={isLocked}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    style={{
                      width: '42px',
                      height: '44px',
                      borderRadius: '8px',
                      border: '1.5px solid var(--border-color)',
                      fontSize: '1.25rem',
                      fontWeight: '700',
                      textAlign: 'center',
                      outline: 'none',
                      backgroundColor: isLocked ? '#f5f5f5' : '#ffffff'
                    }}
                  />
                ))}
              </div>

              {timer > 0 ? (
                <span style={{ fontSize: '0.7rem', color: '#666666', marginTop: '1rem' }}>
                  Code expires in: <strong style={{ color: '#dc2626' }}>{Math.floor(timer / 60)}:{(timer % 60).toString().padStart(2, '0')}</strong>
                </span>
              ) : (
                <button
                  type="button"
                  onClick={handleSendOtp}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'var(--accent-gold-dark)',
                    fontSize: '0.72rem',
                    fontWeight: '600',
                    marginTop: '1rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.25rem',
                    textDecoration: 'underline'
                  }}
                >
                  <RefreshCw size={12} />
                  Resend Passcode
                </button>
              )}
            </div>

            <button
              type="submit"
              disabled={isLocked}
              style={{
                backgroundColor: 'var(--text-primary)',
                color: '#ffffff',
                border: 'none',
                height: '42px',
                borderRadius: '99px',
                fontWeight: '600',
                fontSize: '0.85rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                cursor: isLocked ? 'not-allowed' : 'pointer',
                opacity: isLocked ? 0.6 : 1,
                fontFamily: 'var(--font-sans)',
                transition: 'opacity 0.2s ease'
              }}
            >
              Verify & Complete
              <ArrowRight size={14} />
            </button>

            <button
              type="button"
              onClick={() => setOtpSent(false)}
              style={{
                background: 'none',
                border: 'none',
                color: '#666666',
                fontSize: '0.72rem',
                fontWeight: '500',
                cursor: 'pointer',
                textDecoration: 'underline',
                textAlign: 'center'
              }}
            >
              Change email or number
            </button>
          </form>
        )}

        <button
          type="button"
          onClick={onBackToCart}
          style={{
            background: 'none',
            border: 'none',
            color: '#666666',
            fontSize: '0.75rem',
            display: 'block',
            margin: '2rem auto 0 auto',
            cursor: 'pointer',
            textDecoration: 'underline',
            fontFamily: 'var(--font-sans)'
          }}
        >
          Go back to bag
        </button>
      </div>
    </div>
  );
}

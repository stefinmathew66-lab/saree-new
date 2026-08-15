import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { CheckCircle, AlertCircle, AlertTriangle, Info, X } from 'lucide-react';
import './Notification.css';

const NotificationContext = createContext(null);

export function useNotification() {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
}

export function NotificationProvider({ children }) {
  const [toasts, setToasts] = useState([]);
  const [alertConfig, setAlertConfig] = useState(null);

  const showToast = useCallback((message, type = 'info', duration = 4000) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type, duration }]);
  }, []);

  const showAlert = useCallback((config) => {
    if (typeof config === 'string') {
      setAlertConfig({
        title: 'Velnora Boutique',
        message: config,
        type: 'info'
      });
    } else {
      setAlertConfig({
        title: config.title || 'Velnora Boutique',
        message: config.message || '',
        type: config.type || 'info',
        onConfirm: config.onConfirm
      });
    }
  }, []);

  const closeAlert = useCallback(() => {
    const callback = alertConfig?.onConfirm;
    setAlertConfig(null);
    if (callback) {
      callback();
    }
  }, [alertConfig]);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  // Override window.alert globally for fallback support
  useEffect(() => {
    const originalAlert = window.alert;
    window.alert = (message) => {
      showAlert({
        title: 'Velnora Boutique',
        message: message,
        type: 'info'
      });
    };
    return () => {
      window.alert = originalAlert;
    };
  }, [showAlert]);

  return (
    <NotificationContext.Provider value={{ 
      toast: {
        success: (msg) => showToast(msg, 'success'),
        error: (msg) => showToast(msg, 'error'),
        warning: (msg) => showToast(msg, 'warning'),
        info: (msg) => showToast(msg, 'info')
      }, 
      alert: showAlert 
    }}>
      {children}
      
      {/* Toast Container */}
      <div className="velnora-toast-container">
        {toasts.map((t) => (
          <ToastItem key={t.id} toast={t} onClose={() => removeToast(t.id)} />
        ))}
      </div>

      {/* Custom Alert Modal */}
      {alertConfig && (
        <div className="velnora-alert-overlay" onClick={closeAlert}>
          <div className="velnora-alert-modal" onClick={(e) => e.stopPropagation()}>
            <div className={`velnora-alert-header ${alertConfig.type}`}>
              {alertConfig.type === 'success' && <CheckCircle size={22} className="velnora-alert-icon" />}
              {alertConfig.type === 'error' && <AlertCircle size={22} className="velnora-alert-icon" />}
              {alertConfig.type === 'warning' && <AlertTriangle size={22} className="velnora-alert-icon" />}
              {alertConfig.type === 'info' && <Info size={22} className="velnora-alert-icon" />}
              <h3>{alertConfig.title}</h3>
            </div>
            <div className="velnora-alert-body">
              <p>{alertConfig.message}</p>
            </div>
            <div className="velnora-alert-footer">
              <button className="velnora-alert-btn" onClick={closeAlert}>
                OK
              </button>
            </div>
          </div>
        </div>
      )}
    </NotificationContext.Provider>
  );
}

function ToastItem({ toast, onClose }) {
  const { message, type, duration } = toast;
  
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <div className={`velnora-toast ${type}`}>
      <div className="velnora-toast-icon-wrapper">
        {type === 'success' && <CheckCircle size={18} />}
        {type === 'error' && <AlertCircle size={18} />}
        {type === 'warning' && <AlertTriangle size={18} />}
        {type === 'info' && <Info size={18} />}
      </div>
      <div className="velnora-toast-message">{message}</div>
      <button className="velnora-toast-close" onClick={onClose}>
        <X size={14} />
      </button>
      <div 
        className="velnora-toast-progress" 
        style={{ animationDuration: `${duration}ms` }}
      />
    </div>
  );
}

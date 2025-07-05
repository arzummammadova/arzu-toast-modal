import React, { useState } from 'react';
import { Toast } from 'arzu-toast-modal';
import './index.css';          //  ⇦  yeni faylı əlavə edin

const BASE_BTN = 'btn';         // artıq tam CSS klası

const App: React.FC = () => {
  const [showToast, setShowToast] = useState(false);
  const [toastType, setToastType] =
    useState<'success' | 'error' | 'warning' | 'info'>('success');

  const showToastMessage = (type: typeof toastType) => {
    setToastType(type);
    setShowToast(true);
  };

  const btnVariant: Record<typeof toastType, string> = {
    success: `${BASE_BTN} btn-success`,
    error: `${BASE_BTN} btn-error`,
    warning: `${BASE_BTN} btn-warning`,
    info: `${BASE_BTN} btn-info`,
  };

  return (
    <div className="page">
      <div className="content">
        {/* Başlıq */}
        <header className="header">
          <svg className="header__icon" viewBox="0 0 24 24" fill="currentColor">
            <circle cx="12" cy="12" r="10" />
          </svg>
          <h1 className="header__title">Toast Notification Demo</h1>
          <p className="header__subtitle">
            Beautiful, modern toast notifications with animated bubbles and smooth transitions.
          </p>
        </header>

        {/* Kart */}
        <section className="card">
          <h2 className="card__title">Try Different Toast Types</h2>

          {/* Dörd düymə */}
          <div className="btn-grid">
            <button onClick={() => showToastMessage('success')} className={btnVariant.success}>
              Show Success Toast
            </button>
            <button onClick={() => showToastMessage('error')} className={btnVariant.error}>
              Show Error Toast
            </button>
            <button onClick={() => showToastMessage('warning')} className={btnVariant.warning}>
              Show Warning Toast
            </button>
            <button onClick={() => showToastMessage('info')} className={btnVariant.info}>
              Show Info Toast
            </button>
          </div>

          {/* Xüsusiyyətlər siyahısı */}
          <div className="features">
            <h3 className="features__title">Features:</h3>
            <ul className="features__list">
              <li>Animated bubble backgrounds</li>
              <li>Smooth transitions &amp; micro‑interactions</li>
              <li>Multiple positioning options</li>
              <li>Auto‑dismiss with progress indicator</li>
              <li>Gradient backgrounds &amp; blur effects</li>
            </ul>
          </div>
        </section>
      </div>

      {/* Toast */}
      {showToast && (
        <Toast
          type={toastType}
          title={toastType.charAt(0).toUpperCase() + toastType.slice(1)}
          message={`This is a ${toastType} message!`}
          duration={5000}
          position="top-right"
          onClose={() => setShowToast(false)}
        />
      )}
    </div>
  );
};

export default App;

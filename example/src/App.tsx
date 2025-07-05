import React, { useState } from 'react';
import { Toast } from 'arzu-toast-modal';

const App = () => {
  const [showToast, setShowToast] = useState(false);
  const [toastType, setToastType] = useState<'success' | 'error' | 'warning' | 'info'>('success');

  const showToastMessage = (type: 'success' | 'error' | 'warning' | 'info') => {
    setToastType(type);
    setShowToast(true);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Toast Notification Demo</h1>
      
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <button onClick={() => showToastMessage('success')}>Show Success Toast</button>
        <button onClick={() => showToastMessage('error')}>Show Error Toast</button>
        <button onClick={() => showToastMessage('warning')}>Show Warning Toast</button>
        <button onClick={() => showToastMessage('info')}>Show Info Toast</button>
      </div>

      {showToast && (
        <Toast
          type={toastType}
          title={toastType.charAt(0).toUpperCase() + toastType.slice(1)}
          message={`This is a ${toastType} message!`}
          duration={3000}
          onClose={() => setShowToast(false)}
        />
      )}
    </div>
  );
};

export default App;
import React, { createContext, useContext, useState, useCallback } from 'react';
import Toast, { ToastProps } from './Toast';

interface ToastContextType {
  showToast: (props: Omit<ToastProps, 'onClose'>) => void;
  hideToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

interface ToastWithId extends ToastProps {
  id: string;
}

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastWithId[]>([]);

  const showToast = useCallback((props: Omit<ToastProps, 'onClose'>) => {
    const id = Date.now().toString();
    const toast: ToastWithId = {
      ...props,
      id,
      onClose: () => hideToast(id),
    };
    setToasts(prev => [...prev, toast]);
  }, []);

  const hideToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ showToast, hideToast }}>
      {children}
      <div className="toast-container-wrapper">
        {toasts.map(toast => (
          <Toast key={toast.id} {...toast} />
        ))}
      </div>
    </ToastContext.Provider>
  );
};
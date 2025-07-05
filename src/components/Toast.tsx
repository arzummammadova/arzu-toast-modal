import React, { useEffect, useState } from 'react';
import { FaCheck, FaTimes, FaExclamation, FaInfo } from 'react-icons/fa';

export interface ToastProps {
  title?: string;
  message: string;
  duration?: number;
  type?: 'success' | 'error' | 'warning' | 'info';
  position?: 'top-right' | 'top-center' | 'top-left' | 'bottom-right' | 'bottom-center' | 'bottom-left';
  onClose?: () => void;
  className?: string;
  style?: React.CSSProperties;
}

export const Toast: React.FC<ToastProps> = ({
  title = 'Notification',
  message,
  duration = 3000,
  type = 'info',
  position = 'top-right',
  onClose = () => {},
  className = '',
  style = {},
}) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration]);

  const handleTransitionEnd = () => {
    if (!isVisible) {
      onClose();
    }
  };

  const getPositionStyles = () => {
    const positions = {
      'top-right': { top: '20px', right: '20px' },
      'top-center': { top: '20px', left: '50%', transform: 'translateX(-50%)' },
      'top-left': { top: '20px', left: '20px' },
      'bottom-right': { bottom: '20px', right: '20px' },
      'bottom-center': { bottom: '20px', left: '50%', transform: 'translateX(-50%)' },
      'bottom-left': { bottom: '20px', left: '20px' },
    };
    return positions[position];
  };

  const typeConfig = {
    success: {
      bgColor: '#99E0B5',
      borderColor: '#99E0B5',
      icon: <FaCheck color="#fff" size={16} />,
      progressColor: '#51946B',
      circles: ['#99E0B5', '#B2E7C5', '#CCEFD6', '#E5F7E8'],
    },
    error: {
      bgColor: '#F0C4CA',
      borderColor: '#E69CA3',
      icon: <FaTimes color="#AD2531" size={16} />,
      progressColor: '#AD2531',
      circles: ['#F0C4CA', '#F5D5D9', '#FAE6E8', '#FDF6F7'],
    },
    warning: {
      bgColor: '#F0DB86',
      borderColor: '#F0DB86',
      icon: <FaExclamation color="#8B6F1A" size={16} />,
      progressColor: '#8B6F1A',
      circles: ['#F0DB86', '#F4E3A4', '#F8EBC3', '#FCF5E1'],
    },
    info: {
      bgColor: '#C9D3ED',
      borderColor: '#6D83C3',
      icon: <FaInfo color="#2E4A8B" size={16} />,
      progressColor: '#2E4A8B',
      circles: ['#C9D3ED', '#D8DFF1', '#E7EBF6', '#F5F7FB'],
    },
  };

  const config = typeConfig[type];

  return (
    <div
      className={`arzu-toast ${className}`}
      style={{
        backgroundColor: config.bgColor,
        border: `1px solid ${config.borderColor}`,
        color: '#000',
        padding: '16px 20px 16px 60px',
        borderRadius: '15px',
        position: 'fixed',
        zIndex: 1000,
        boxShadow: '0 0 10px rgba(0,0,0,0.2)',
        opacity: isVisible ? 1 : 0,
        transition: 'opacity 0.5s ease',
        width: 300,
        overflow: 'hidden',
        ...getPositionStyles(),
        ...style,
      }}
      onTransitionEnd={handleTransitionEnd}
      role="alert"
    >
      {/* Circles on the left */}
      <div style={{
        position: 'absolute',
        left: 0,
        top: 0,
        height: '100%',
        width: 50,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <div style={{
          position: 'relative',
          width: 32,
          height: 32,
          borderRadius: '50%',
          backgroundColor: config.circles[0],
          border: `1px solid ${config.borderColor}`,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 2,
        }}>
          {config.icon}
        </div>
        {config.circles.slice(1).map((color, index) => (
          <div
            key={index}
            style={{
              position: 'absolute',
              width: 32 + (index + 1) * 8,
              height: 32 + (index + 1) * 8,
              borderRadius: '50%',
              backgroundColor: color,
              opacity: 0.5 - index * 0.1,
              zIndex: 1,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 3 }}>
        {title && <p style={{ margin: 0, fontWeight: 700, fontSize: 16 }}>{title}</p>}
        <p style={{ margin: '4px 0 0', color: '#3C3C3C', fontSize: 13 }}>
          {message}
        </p>
      </div>

      {/* Close button */}
      <button
        onClick={() => setIsVisible(false)}
        style={{
          position: 'absolute',
          top: 8,
          right: 8,
          width: 24,
          height: 24,
          background: 'transparent',
          border: 'none',
          color: '#3C3C3C',
          fontWeight: 700,
          fontSize: 18,
          cursor: 'pointer',
          zIndex: 4,
        }}
        aria-label="Close toast"
      >
        ✕
      </button>

      {/* Progress bar */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          height: 3,
          width: '100%',
          background: config.progressColor,
          animation: `shrink ${duration}ms linear forwards`,
          borderBottomLeftRadius: 15,
          borderBottomRightRadius: 15,
        }}
      />

      <style>{`
        @keyframes shrink {
          from { width: 100%; }
          to { width: 0%; }
        }
      `}</style>
    </div>
  );
};

export default Toast;
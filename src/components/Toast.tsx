import React, { useEffect, useState } from 'react';
import { Check, X, AlertTriangle, Info } from 'lucide-react';
import successSound from '../../src/assets/sounds/success.mp3';
import errorSound from '../../src/assets/sounds/error.mp3';
import warningSound from '../assets/warning.mp3';
import infoSound from '../assets/info.mp3';


export interface ToastProps {
  title?: string;
  message: string;
  duration?: number;
  type?: 'success' | 'error' | 'warning' | 'info';
  position?: 'top-right' | 'top-center' | 'top-left' | 'bottom-right' | 'bottom-center' | 'bottom-left';
  onClose?: () => void;
  className?: string;
  style?: React.CSSProperties;
  playAudio?: boolean; // Yeni prop: səsin çalınmasını idarə etmək üçün
  audioVolume?: number; // Yeni prop: səsin səsini idarə etmək üçün (0-1 arasında)
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
  playAudio = true, // Varsayılan olaraq səsi çal
  audioVolume = 0.5, // Varsayılan səs səviyyəsi (50%)
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const [shouldShake, setShouldShake] = useState(false);

  // Səs faylları üçün bir map yaradın
  const audioMap: { [key in ToastProps['type']]: string } = {
    success: successSound,
    error: errorSound, // Əgər import etmisinizsə
    warning: warningSound,
    info: infoSound,
  
  };

  useEffect(() => {
    if (type === 'error' || type === 'warning') {
      setShouldShake(true);
      const shakeTimer = setTimeout(() => {
        setShouldShake(false);
      }, 600);
      
      return () => clearTimeout(shakeTimer);
    }
  }, [type]);

  // Səsi çalmaq üçün useEffect
  useEffect(() => {
    if (playAudio && audioMap[type]) {
      const audio = new Audio(audioMap[type]);
      audio.volume = audioVolume;
      audio.play().catch(e => console.error("Səs çalınarkən xəta baş verdi:", e));
    }
  }, [type, playAudio, audioVolume, audioMap]); // Yalnız type dəyişdikdə və ya playAudio, audioVolume dəyişdikdə çal

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
      'top-right': { top: '24px', right: '24px' },
      'top-center': { top: '24px', left: '50%', transform: 'translateX(-50%)' },
      'top-left': { top: '24px', left: '24px' },
      'bottom-right': { bottom: '24px', right: '24px' },
      'bottom-center': { bottom: '24px', left: '50%', transform: 'translateX(-50%)' },
      'bottom-left': { bottom: '24px', left: '24px' },
    };
    return positions[position];
  };

  const typeConfig = {
    success: {
      bgColor: 'success-bg',
      borderColor: 'success-border',
      iconColor: '#16a34a',
      textColor: '#15803d',
      icon: <Check size={16} strokeWidth={2.5} />,
      progressColor: '#16a34a',
      bubbles: [
        { color: '#bbf7d0', size: 32, blur: 1, opacity: 0.9 },
        { color: '#86efac', size: 24, blur: 1.5, opacity: 0.7 },
        { color: '#dcfce7', size: 40, blur: 2, opacity: 0.5 },
        { color: '#f0fdf4', size: 28, blur: 2.5, opacity: 0.4 },
        { color: '#22c55e', size: 18, blur: 1, opacity: 0.6 },
        { color: '#a7f3d0', size: 35, blur: 2, opacity: 0.3 },
        { color: '#6ee7b7', size: 22, blur: 1.5, opacity: 0.5 },
        { color: '#d1fae5', size: 26, blur: 2.5, opacity: 0.4 },
      ],
    },
    error: {
      bgColor: 'error-bg',
      borderColor: 'error-border',
      iconColor: '#dc2626',
      textColor: '#b91c1c',
      icon: <X size={16} strokeWidth={2.5} />,
      progressColor: '#dc2626',
      bubbles: [
        { color: '#fecaca', size: 32, blur: 1, opacity: 0.9 },
        { color: '#fca5a5', size: 24, blur: 1.5, opacity: 0.7 },
        { color: '#fee2e2', size: 40, blur: 2, opacity: 0.5 },
        { color: '#fef2f2', size: 28, blur: 2.5, opacity: 0.4 },
        { color: '#ef4444', size: 18, blur: 1, opacity: 0.6 },
        { color: '#f87171', size: 35, blur: 2, opacity: 0.3 },
        { color: '#fb7185', size: 22, blur: 1.5, opacity: 0.5 },
        { color: '#fce7e7', size: 26, blur: 2.5, opacity: 0.4 },
      ],
    },
    warning: {
      bgColor: 'warning-bg',
      borderColor: 'warning-border',
      iconColor: '#d97706',
      textColor: '#b45309',
      icon: <AlertTriangle size={16} strokeWidth={2.5} />,
      progressColor: '#d97706',
      bubbles: [
        { color: '#fde68a', size: 32, blur: 1, opacity: 0.9 },
        { color: '#fcd34d', size: 24, blur: 1.5, opacity: 0.7 },
        { color: '#fef3c7', size: 40, blur: 2, opacity: 0.5 },
        { color: '#fffbeb', size: 28, blur: 2.5, opacity: 0.4 },
        { color: '#f59e0b', size: 18, blur: 1, opacity: 0.6 },
        { color: '#fed7aa', size: 35, blur: 2, opacity: 0.3 },
        { color: '#fdba74', size: 22, blur: 1.5, opacity: 0.5 },
        { color: '#fef7ed', size: 26, blur: 2.5, opacity: 0.4 },
      ],
    },
    info: {
      bgColor: 'info-bg',
      borderColor: 'info-border',
      iconColor: '#2563eb',
      textColor: '#1d4ed8',
      icon: <Info size={16} strokeWidth={2.5} />,
      progressColor: '#2563eb',
      bubbles: [
        { color: '#bfdbfe', size: 32, blur: 1, opacity: 0.9 },
        { color: '#93c5fd', size: 24, blur: 1.5, opacity: 0.7 },
        { color: '#dbeafe', size: 40, blur: 2, opacity: 0.5 },
        { color: '#eff6ff', size: 28, blur: 2.5, opacity: 0.4 },
        { color: '#3b82f6', size: 18, blur: 1, opacity: 0.6 },
        { color: '#c7d2fe', size: 35, blur: 2, opacity: 0.3 },
        { color: '#a5b4fc', size: 22, blur: 1.5, opacity: 0.5 },
        { color: '#e0e7ff', size: 26, blur: 2.5, opacity: 0.4 },
      ],
    },
  };

  const config = typeConfig[type];

  const getShakeAnimation = () => {
    if (!shouldShake) return '';
    return type === 'error' ? 'animate-shake-error' : type === 'warning' ? 'animate-shake-warning' : '';
  };

  return (
    <div
      className={`toast-container ${className} ${config.bgColor} ${config.borderColor} ${getShakeAnimation()}`}
      style={{
        position: 'fixed',
        zIndex: 1000,
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        opacity: isVisible ? 1 : 0,
        transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
        width: '380px',
        padding: '20px 20px 20px 80px',
        borderRadius: '16px',
        overflow: 'hidden',
        transform: isVisible ? 'translateY(0) scale(1)' : 'translateY(-20px) scale(0.95)',
        backdropFilter: 'blur(10px)',
        borderWidth: '2px',
        borderStyle: 'solid',
        ...getPositionStyles(),
        ...style,
      }}
      onTransitionEnd={handleTransitionEnd}
      role="alert"
    >
      <button
        onClick={() => setIsVisible(false)}
        className="toast-close-button"
        style={{
          borderColor: config.iconColor,
          color: config.iconColor,
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(8px)',
        }}
        aria-label="Close toast"
      >
        <X size={12} strokeWidth={3} />
      </button>

      <div className="toast-bubbles-container">
        {config.bubbles.map((bubble, index) => (
          <div
            key={index}
            className="toast-bubble"
            style={{
              backgroundColor: bubble.color,
              width: `${bubble.size}px`,
              height: `${bubble.size}px`,
              left: `${Math.random() * 50 - 15}px`,
              top: `${Math.random() * 120}%`,
              opacity: bubble.opacity,
              filter: `blur(${bubble.blur}px)`,
              animation: `bubble-float-${index} ${3 + index * 0.3}s ease-in-out infinite`,
            }}
          />
        ))}
      </div>

      <div
        className="toast-icon-container"
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          borderColor: config.iconColor,
          filter: 'blur(0.5px)',
        }}
      >
        <div style={{ color: config.iconColor }}>
          {config.icon}
        </div>
      </div>

      <div className="toast-content">
        {title && (
          <h3 className="toast-title" style={{ color: config.textColor }}>
            {title}
          </h3>
        )}
        <p className="toast-message">
          {message}
        </p>
      </div>

      <div
        className="toast-progress-bar"
        style={{
          backgroundColor: config.progressColor,
          animation: `shrink ${duration}ms linear forwards`,
        }}
      />

      {/* Səs faylının yuxarıda import olunduğunu güman edərək */}
      {/* <audio src={successSound} autoPlay={playAudio} volume={audioVolume} /> */}
      {/* Amma yuxarıda useEffect ilə dinamik çalmaq daha yaxşıdır */}

      <style>{`
        .success-bg {
          background: linear-gradient(to right, #f0fdf4, #ecfdf5);
        }
        
        .success-border {
          border-color: #bbf7d0;
        }
        
        .error-bg {
          background: linear-gradient(to right, #fef2f2, #fff1f2);
        }
        
        .error-border {
          border-color: #fecaca;
        }
        
        .warning-bg {
          background: linear-gradient(to right, #fffbeb, #fef3c7);
        }
        
        .warning-border {
          border-color: #fde68a;
        }
        
        .info-bg {
          background: linear-gradient(to right, #eff6ff, #e0e7ff);
        }
        
        .info-border {
          border-color: #bfdbfe;
        }
        
        .toast-close-button {
          position: absolute;
          top: 12px;
          right: 12px;
          z-index: 20;
          height: 24px;
          width: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          border-width: 2px;
          border-style: solid;
          font-size: 12px;
          font-weight: bold;
          transition: all 0.2s ease;
        }
        
        .toast-close-button:hover {
          transform: scale(1.1);
        }
        
        .toast-bubbles-container {
          position: absolute;
          left: 0;
          top: 0;
          height: 100%;
          width: 80px;
          overflow: hidden;
        }
        
        .toast-bubble {
          position: absolute;
          border-radius: 50%;
          transform: translateY(-50%);
          animation-timing-function: ease-in-out;
          animation-iteration-count: infinite;
        }
        
        .toast-icon-container {
          position: absolute;
          left: 20px;
          top: 50%;
          transform: translateY(-50%);
          z-index: 10;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          border-width: 2px;
          border-style: solid;
          width: 44px;
          height: 44px;
          backdrop-filter: blur(4px);
        }
        
        .toast-content {
          position: relative;
          z-index: 10;
        }
        
        .toast-title {
          margin: 0;
          font-size: 16px;
          font-weight: bold;
          margin-bottom: 4px;
        }
        
        .toast-message {
          margin: 0;
          font-size: 14px;
          color: #374151;
          line-height: 1.5;
        }
        
        .toast-progress-bar {
          position: absolute;
          bottom: 0;
          left: 0;
          height: 4px;
          transform-origin: left;
          border-bottom-left-radius: 16px;
          border-bottom-right-radius: 16px;
          width: 100%;
        }
        
        @keyframes shrink {
          from { transform: scaleX(1); }
          to { transform: scaleX(0); }
        }
        
        @keyframes shake-error {
          0%, 100% { transform: translateX(0) translateY(0) scale(1); }
          10% { transform: translateX(-3px) translateY(-1px) scale(1.02); }
          20% { transform: translateX(3px) translateY(1px) scale(0.98); }
          30% { transform: translateX(-2px) translateY(-2px) scale(1.01); }
          40% { transform: translateX(2px) translateY(2px) scale(0.99); }
          50% { transform: translateX(-1px) translateY(-1px) scale(1.01); }
          60% { transform: translateX(1px) translateY(1px) scale(0.99); }
          70% { transform: translateX(-2px) translateY(0px) scale(1.01); }
          80% { transform: translateX(2px) translateY(-1px) scale(0.99); }
          90% { transform: translateX(-1px) translateY(1px) scale(1.005); }
        }
        
        @keyframes shake-warning {
          0%, 100% { transform: translateX(0) rotate(0deg); }
          10% { transform: translateX(-2px) rotate(-0.5deg); }
          20% { transform: translateX(2px) rotate(0.5deg); }
          30% { transform: translateX(-2px) rotate(-0.3deg); }
          40% { transform: translateX(2px) rotate(0.3deg); }
          50% { transform: translateX(-1px) rotate(-0.2deg); }
          60% { transform: translateX(1px) rotate(0.2deg); }
          70% { transform: translateX(-1px) rotate(-0.1deg); }
          80% { transform: translateX(1px) rotate(0.1deg); }
          90% { transform: translateX(-0.5px) rotate(-0.05deg); }
        }
        
        .animate-shake-error {
          animation: shake-error 0.6s ease-in-out;
        }
        
        .animate-shake-warning {
          animation: shake-warning 0.6s ease-in-out;
        }
        
        @keyframes bubble-float-0 {
          0%, 100% { transform: translateY(-50%) translateX(0px); }
          50% { transform: translateY(-60%) translateX(5px); }
        }
        
        @keyframes bubble-float-1 {
          0%, 100% { transform: translateY(-50%) translateX(0px); }
          50% { transform: translateY(-40%) translateX(-3px); }
        }
        
        @keyframes bubble-float-2 {
          0%, 100% { transform: translateY(-50%) translateX(0px); }
          50% { transform: translateY(-55%) translateX(8px); }
        }
        
        @keyframes bubble-float-3 {
          0%, 100% { transform: translateY(-50%) translateX(0px); }
          50% { transform: translateY(-45%) translateX(-5px); }
        }
        
        @keyframes bubble-float-4 {
          0%, 100% { transform: translateY(-50%) translateX(0px); }
          50% { transform: translateY(-65%) translateX(3px); }
        }
        
        @keyframes bubble-float-5 {
          0%, 100% { transform: translateY(-50%) translateX(0px); }
          50% { transform: translateY(-50%) translateX(6px); }
        }
        
        @keyframes bubble-float-6 {
          0%, 100% { transform: translateY(-50%) translateX(0px); }
          50% { transform: translateY(-35%) translateX(-4px); }
        }
        
        @keyframes bubble-float-7 {
          0%, 100% { transform: translateY(-50%) translateX(0px); }
          50% { transform: translateY(-70%) translateX(2px); }
        }
      `}</style>
    </div>
  );
};

export default Toast;
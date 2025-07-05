import React from 'react';
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
export declare const Toast: React.FC<ToastProps>;
export default Toast;
//# sourceMappingURL=Toast.d.ts.map
import React from 'react';
import { ToastProps } from './Toast';
interface ToastContextType {
    showToast: (props: Omit<ToastProps, 'onClose'>) => void;
    hideToast: (id: string) => void;
}
export declare const useToast: () => ToastContextType;
export declare const ToastProvider: React.FC<{
    children: React.ReactNode;
}>;
export {};
//# sourceMappingURL=ToastProvider.d.ts.map
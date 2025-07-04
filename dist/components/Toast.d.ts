import React from 'react';
interface ToastProps {
    message: string;
    type?: 'success' | 'error' | 'info';
}
export declare const Toast: React.FC<ToastProps>;
export {};

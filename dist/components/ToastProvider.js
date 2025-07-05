import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { createContext, useContext, useState, useCallback } from 'react';
import Toast from './Toast';
const ToastContext = createContext(undefined);
export const useToast = () => {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error('useToast must be used within a ToastProvider');
    }
    return context;
};
export const ToastProvider = ({ children }) => {
    const [toasts, setToasts] = useState([]);
    const showToast = useCallback((props) => {
        const id = Date.now().toString();
        const toast = Object.assign(Object.assign({}, props), { id, onClose: () => hideToast(id) });
        setToasts(prev => [...prev, toast]);
    }, []);
    const hideToast = useCallback((id) => {
        setToasts(prev => prev.filter(toast => toast.id !== id));
    }, []);
    return (_jsxs(ToastContext.Provider, { value: { showToast, hideToast }, children: [children, _jsx("div", { className: "toast-container-wrapper", children: toasts.map(toast => (_jsx(Toast, Object.assign({}, toast), toast.id))) })] }));
};
//# sourceMappingURL=ToastProvider.js.map
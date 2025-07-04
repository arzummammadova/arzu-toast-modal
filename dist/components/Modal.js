import { jsx as _jsx } from "react/jsx-runtime";
export const Modal = ({ isOpen, onClose, children }) => {
    if (!isOpen)
        return null;
    return (_jsx("div", { style: {
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: 'rgba(0,0,0,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
        }, onClick: onClose, children: _jsx("div", { onClick: e => e.stopPropagation(), style: {
                backgroundColor: 'white',
                padding: '30px',
                borderRadius: '10px',
                minWidth: '300px',
            }, children: children }) }));
};

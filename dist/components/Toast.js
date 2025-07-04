import { jsx as _jsx } from "react/jsx-runtime";
export const Toast = ({ message, type = 'info' }) => {
    const bgColor = {
        success: 'green',
        error: 'red',
        info: 'blue',
    }[type];
    return (_jsx("div", { style: {
            backgroundColor: bgColor,
            color: 'white',
            padding: '10px 20px',
            borderRadius: '5px',
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            zIndex: 1000,
        }, children: message }));
};

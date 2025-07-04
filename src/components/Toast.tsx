import React from 'react'

interface ToastProps {
  message: string
  type?: 'success' | 'error' | 'info'
}

export const Toast: React.FC<ToastProps> = ({ message, type = 'info' }) => {
  const bgColor = {
    success: 'green',
    error: 'red',
    info: 'blue',
  }[type]

  return (
    <div
      style={{
        backgroundColor: bgColor,
        color: 'white',
        padding: '10px 20px',
        borderRadius: '5px',
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        zIndex: 1000,
      }}
    >
      {message}
    </div>
  )
}

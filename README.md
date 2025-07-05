# arzu-toast-modal 🔔

Beautiful and customizable toast component with animated visuals 🚀

## 📽 Demo

<video src="./src/assets/demo.mp4" controls width="100%" />

## 📦 Install

```bash
npm install arzu-toast-modal


usage 
import React from 'react';
import { ToastProvider, useToast } from 'arzu-toast-modal';

const App = () => {
  const { showToast } = useToast();

  return (
    <ToastProvider>
      <button
        onClick={() =>
          showToast({
            type: 'success',
            title: 'Success!',
            message: 'Your changes have been saved successfully!',
            duration: 4000,
            position: 'top-right',
          })
        }
      >
        Show Toast
      </button>
    </ToastProvider>
  );
};

export default App;

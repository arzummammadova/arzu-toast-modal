# arzu-toast-modal 🔔

Beautiful and customizable toast component for React with smooth animations 🚀

[![npm version](https://img.shields.io/npm/v/arzu-toast-modal.svg?style=flat-square)](https://www.npmjs.com/package/arzu-toast-modal)
[![license](https://img.shields.io/github/license/arzummammadova/arzu-toast-modal.svg?style=flat-square)](LICENSE)

## 📽 Demo

[▶ Watch the video demo](https://drive.google.com/file/d/1-HoxjWySAnPu4-ZA-WBgJ1ANsTPQcBg6/view?usp=sharing)

<!-- If you create a GIF preview, place it in .github/demo.gif and uncomment the line below -->

<!-- [![Demo GIF](https://raw.githubusercontent.com/YOUR-USERNAME/arzu-toast-modal/main/.github/demo.gif)](https://drive.google.com/file/d/1-HoxjWySAnPu4-ZA-WBgJ1ANsTPQcBg6/view?usp=sharing) -->

## 📦 Installation

```bash
npm install arzu-toast-modal
# or
yarn add arzu-toast-modal
```

## 🚀 Quick Start

```tsx
import React from 'react';
import { ToastProvider, useToast } from 'arzu-toast-modal';

export default function App() {
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
}
```

## ⚙️

| Property   | Type                                                           | Default       | Description                              |
| ---------- | -------------------------------------------------------------- | ------------- | ---------------------------------------- |
| `type`     | `'success' \| 'error' \| 'warning' \| 'info'`                  | `'info'`      | Visual variant of the toast              |
| `title`    | `string`                                                       | —             | Bold header text                         |
| `message`  | `string`                                                       | —             | Main body text                           |
| `duration` | `number`                                                       | `3000`        | Auto‑dismiss time in ms; `0` disables it |
| `position` | `'top-left' \| 'top-right' \| 'bottom-left' \| 'bottom-right'` | `'top-right'` | Screen corner                            |

> All props are optional unless marked otherwise.

## 🎨 Customization

`arzu-toast-modal` ships with sensible defaults, but you can override styles via CSS variables or pass a custom `className` in the provider. See the [docs](./docs/customization.md) for details.

## 🗺 Roadmap

* [ ] Dark mode
* [ ] Swipe‑to‑dismiss on mobile
* [ ] Accessible announcements

Feel free to open issues or PRs!

##
 © 2025 Arzu Məmmədova
import * as React from 'react';
import { createRoot } from 'react-dom/client';
import App from './app';

const mountNode = document.createElement('div');
document.body.appendChild(mountNode);

const root = createRoot(mountNode);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);

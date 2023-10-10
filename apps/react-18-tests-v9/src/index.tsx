import * as React from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App';

const root = createRoot(
  // eslint-disable-next-line no-restricted-globals
  document.getElementById('root') as HTMLElement,
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);

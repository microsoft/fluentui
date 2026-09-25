import * as React from 'react';
import { createRoot } from 'react-dom/client';
import { canUseDOM } from '@fluentui/react-utilities';
import { App } from './App';

if (!canUseDOM()) {
  throw new Error('This demo requires a browser DOM.');
}
const container = document.getElementById('root');
if (!container) {
  throw new Error('The demo root element is missing.');
}
createRoot(container).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);

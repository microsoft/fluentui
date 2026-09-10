import * as React from 'react';
import { createRoot } from 'react-dom/client';

import { decodeCodeFromHash } from '../url';
import { DEFAULT_CODE } from './defaultCode';
import { Playground } from './Playground';

// Application entry point: this is the only place that touches the real `document`/`location` directly.
const container = document.getElementById('root');

if (!container) {
  throw new Error('Playground: missing #root element');
}

const initialCode = decodeCodeFromHash(location.hash) ?? DEFAULT_CODE;

createRoot(container).render(
  <React.StrictMode>
    <Playground initialCode={initialCode} />
  </React.StrictMode>,
);

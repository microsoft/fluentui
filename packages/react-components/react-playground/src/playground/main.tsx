import * as React from 'react';
import { canUseDOM } from '@fluentui/react-utilities';
import { createRoot } from 'react-dom/client';

import { decodeCodeFromHash } from '../url';
import { Playground } from './Playground';
import { loadRuntimeManifest } from './runtime';

if (!canUseDOM()) {
  throw new Error('Playground requires a browser environment');
}

const targetDocument = globalThis.document;
const targetWindow = targetDocument.defaultView;
const container = targetDocument.getElementById('root');

if (!container || !targetWindow) {
  throw new Error('Playground browser environment is incomplete');
}

const manifestPath = new URLSearchParams(targetWindow.location.search).get('manifest') ?? '../runtime/manifest.json';
const initialCode = decodeCodeFromHash(targetWindow.location.hash);

loadRuntimeManifest(targetWindow, manifestPath).then(
  manifest => {
    createRoot(container).render(
      <React.StrictMode>
        <Playground initialCode={initialCode} manifest={manifest} />
      </React.StrictMode>,
    );
  },
  error => {
    container.textContent = error instanceof Error ? error.message : String(error);
  },
);

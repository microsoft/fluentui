import * as React from 'react';
import { canUseDOM } from '@fluentui/react-utilities';
import { createRoot } from 'react-dom/client';

import { decodePlaygroundStateFromHash } from '../url';
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

/** Path to the Storybook-emitted runtime, relative to `playground/app/playground.html`. */
const DEFAULT_MANIFEST_PATH = '../runtime/manifest.json';

const manifestPath = new URLSearchParams(targetWindow.location.search).get('manifest') ?? DEFAULT_MANIFEST_PATH;
const initialState = decodePlaygroundStateFromHash(targetWindow.location.hash);

loadRuntimeManifest(targetWindow, manifestPath).then(
  manifest => {
    createRoot(container).render(
      <React.StrictMode>
        <Playground
          initialCode={initialState?.code ?? null}
          initialCssModules={initialState?.cssModules}
          manifest={manifest}
        />
      </React.StrictMode>,
    );
  },
  error => {
    container.textContent = error instanceof Error ? error.message : String(error);
  },
);

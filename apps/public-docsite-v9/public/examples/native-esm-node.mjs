// Native ESM in Node — no bundler, no build step, no JSX.
//
// Requires: npm install react react-dom @fluentui/react-components
// Run with: node --import ./tabster-esm-hook.mjs native-esm-node.mjs > index.html
//
// Node resolves `@fluentui/react-components` through the package's `import` export condition,
// which points at its native ESM build (`lib/index.js`). No `module` field, no interop shim.
//
// The `--import` hook is a temporary workaround: `tabster` ships ESM but has no `exports` map,
// so Node falls back to its CommonJS `main` and the named imports inside
// `@fluentui/react-tabster` fail. See tabster-esm-hook.mjs.

import * as React from 'react';
import { renderToStaticMarkup, renderToString } from 'react-dom/server';
import {
  Button,
  createDOMRenderer,
  FluentProvider,
  RendererProvider,
  renderToStyleElements,
  SSRProvider,
  webLightTheme,
} from '@fluentui/react-components';

// Without a compiler there is no JSX — `h` is the factory JSX would have compiled to.
const h = React.createElement;

const renderer = createDOMRenderer();

const app = h(
  RendererProvider,
  { renderer },
  h(SSRProvider, null, h(FluentProvider, { theme: webLightTheme }, h(Button, { appearance: 'primary' }, 'Click me'))),
);

const body = renderToString(app);
// Griffel collects the styles used during render; they have to be emitted into <head> manually.
const styles = renderToStaticMarkup(h(React.Fragment, null, renderToStyleElements(renderer)));

process.stdout.write(`<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>Fluent UI v9 — native ESM in Node</title>
    ${styles}
  </head>
  <body>
    <div id="root">${body}</div>
  </body>
</html>
`);

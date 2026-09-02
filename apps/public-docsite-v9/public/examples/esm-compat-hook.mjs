// Workarounds for dependencies that are not resolvable by Node's ESM loader as published.
// Bundlers are unaffected — they are more permissive than Node's resolution algorithm.
//
// Usage: node --import ./esm-compat-hook.mjs native-esm-node.mjs
//
// 1. `tabster` (via @fluentui/react-tabster) has `"type": "module"` and an ESM build in
//    `dist/esm/`, but no `exports` map and a CommonJS `main`, so Node picks the CJS entry and
//    `import { createTabster } from 'tabster'` throws "Named export not found".
//
// 2. `@fluentui/react-positioning` emits `import ... from 'use-sync-external-store/shim'`, a
//    directory import. Node only accepts it when the installed copy has an `exports` map, which
//    `use-sync-external-store` gained in 1.5.0 — but the declared range is `^1.4.0`.

import { register } from 'node:module';

const redirects = {
  tabster: 'tabster/dist/esm/index.js',
  'use-sync-external-store/shim': 'use-sync-external-store/shim/index.js',
};

// Resolve hooks run on a separate thread, so they must be a standalone module — inlined as a
// data URL here to keep the example to a single extra file.
const hook = `
  const redirects = ${JSON.stringify(redirects)};

  export function resolve(specifier, context, nextResolve) {
    return nextResolve(redirects[specifier] ?? specifier, context);
  }
`;

register(`data:text/javascript,${encodeURIComponent(hook)}`, import.meta.url);

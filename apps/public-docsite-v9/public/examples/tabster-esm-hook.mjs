// Workaround for `tabster` (a transitive dependency of @fluentui/react-tabster) not shipping an
// `exports` map: it has `"type": "module"` and an ESM build in `dist/esm/`, but its `main` still
// points at CommonJS, so Node picks the CJS entry and `import { createTabster } from 'tabster'`
// throws "Named export not found". Redirecting the specifier to the ESM build fixes it.
//
// Usage: node --import ./tabster-esm-hook.mjs native-esm-node.mjs

import { register } from 'node:module';

// Resolve hooks run on a separate thread, so they must be a standalone module — inlined as a
// data URL here to keep the example to a single extra file.
const hook = `
  export function resolve(specifier, context, nextResolve) {
    return nextResolve(specifier === 'tabster' ? 'tabster/dist/esm/index.js' : specifier, context);
  }
`;

register(`data:text/javascript,${encodeURIComponent(hook)}`, import.meta.url);

// Workaround for `tabster` (a transitive dependency of @fluentui/react-tabster) not being
// resolvable by Node's ESM loader: it has `"type": "module"` and an ESM build in `dist/esm/`,
// but no `exports` map and a CommonJS `main`, so Node picks the CJS entry and
// `import { createTabster } from 'tabster'` throws "Named export not found".
//
// Bundlers are unaffected — they honor the `module` field that Node ignores.
//
// Usage: node --import ./esm-compat-hook.mjs native-esm-node.mjs

import { register } from 'node:module';

// Resolve hooks run on a separate thread, so they must be a standalone module — inlined as a
// data URL here to keep the example to a single extra file.
const hook = `
  export function resolve(specifier, context, nextResolve) {
    return nextResolve(specifier === 'tabster' ? 'tabster/dist/esm/index.js' : specifier, context);
  }
`;

register(`data:text/javascript,${encodeURIComponent(hook)}`, import.meta.url);

/**
 * Story meta helper — registers the CSS Module source(s) a story relies on so:
 *
 *   1. The custom docs page (`BebopDocsPage` → `BebopSource`) can surface them
 *      as tabs in the "Show code" panel.
 *   2. The "Open in Stackblitz" button (provided by
 *      `@fluentui/react-storybook-addon-export-to-sandbox`) can bundle them —
 *      together with `bebop/tokens.css` — into the generated sandbox so the
 *      example renders with the correct theme out of the box.
 *
 * Spread the result into a story's `parameters` object:
 *
 * ```tsx
 * import buttonCss from '../../../../../../bebop/components/button.module.css?raw';
 * import { withCssModuleSource } from '../_helpers/withCssModuleSource';
 *
 * export default {
 *   title: 'Headless Components/Button',
 *   component: Button,
 *   parameters: {
 *     docs: { description: { component: descriptionMd } },
 *     ...withCssModuleSource({ name: 'button.module.css', source: buttonCss }),
 *   },
 * };
 * ```
 *
 * Pass multiple modules when a single component pulls from several CSS files
 * (e.g., Input + chat-input variant): each becomes a tab.
 */

// Loaded via the `?raw` resourceQuery rule configured in `.storybook/main.js`.
// Bundling tokens.css inline lets the Stackblitz scaffold include them without
// requiring story authors to wire imports manually.
import tokensCss from '../../../../../../bebop/tokens.css?raw';

import type { BebopCssModule, BebopParameters } from './BebopSource';

export type { BebopCssModule } from './BebopSource';

/**
 * Minimal local mirror of the `SandboxContext` shape from
 * `@fluentui/react-storybook-addon-export-to-sandbox`. We don't import the
 * type from the addon itself to keep the stories package free of a direct
 * dependency on the addon's source — the addon is consumed at runtime via
 * Storybook's addon registry, not statically.
 */
interface SandboxContext {
  provider: string;
  bundler: 'vite' | 'cra';
  storyExportToken: string;
  storyFile: string;
  dependencies: Record<string, string>;
}

interface ExportToSandboxFragment {
  exportToSandbox: {
    transformFiles: (files: Record<string, string>, ctx: SandboxContext) => Record<string, string>;
  };
}

export function withCssModuleSource(
  ...modules: BebopCssModule[]
): { bebop: BebopParameters } & ExportToSandboxFragment {
  return {
    bebop: { cssModules: modules },
    exportToSandbox: {
      transformFiles: (files, ctx) => buildSandboxFiles(files, ctx, modules),
    },
  };
}

/**
 * The story file imports each CSS Module via a long relative path that points
 * back to `bebop/components/<name>.module.css`. In the sandbox, that path
 * doesn't exist — so we:
 *
 *   1. Drop a flat copy of `tokens.css` and each module under `src/styles/`.
 *   2. Rewrite every `bebop/components/<…>.module.css` import in the story
 *      file to `./styles/<basename>` (or `../styles/<basename>` from `App`).
 *   3. Inject `import './styles/tokens.css'` at the top of `src/App.tsx`
 *      so the design tokens cascade onto the rendered example.
 */
function buildSandboxFiles(
  files: Record<string, string>,
  _ctx: SandboxContext,
  modules: BebopCssModule[],
): Record<string, string> {
  const next = { ...files };

  next['src/styles/tokens.css'] = tokensCss;

  // The meta typically lists every CSS Module a component uses across all
  // stories so each individual story can pull what it needs without having
  // to redeclare the imports. For the generated sandbox we only want the
  // files actually referenced from `src/example.tsx`, otherwise unused
  // modules (e.g. `checkbox.module.css` in a Dialog/Alert story that only
  // uses `dialog.module.css`) clutter the file tree.
  const example = next['src/example.tsx'];
  const referenced = new Set<string>();
  if (typeof example === 'string') {
    for (const match of example.matchAll(/([a-z][a-z0-9-]*\.module\.css)/gi)) {
      referenced.add(match[1]);
    }
  }
  const usedModules = referenced.size ? modules.filter(m => referenced.has(m.name)) : modules;
  for (const m of usedModules) {
    next[`src/styles/${m.name}`] = m.source;
  }

  // Story file lives at `src/example.tsx`; rewrite the deeply-relative
  // `bebop/components/<file>.module.css` import to a sibling path.
  if (typeof example === 'string') {
    next['src/example.tsx'] = example.replace(
      /(['"])(?:\.\.\/)+bebop\/components\/([^'"]+\.module\.css)\1/g,
      (_match, quote, basename) => `${quote}./styles/${basename}${quote}`,
    );
  }

  // Prepend the tokens import to App so `:root` custom properties apply
  // everywhere (Storybook injects them via `preview.js`; in the sandbox we
  // need the equivalent global import).
  const app = next['src/App.tsx'];
  if (typeof app === 'string' && !app.includes('./styles/tokens.css')) {
    next['src/App.tsx'] = `import './styles/tokens.css';\n${app}`;
  }

  return next;
}

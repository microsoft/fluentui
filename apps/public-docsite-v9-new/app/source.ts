import { loader } from 'fumadocs-core/source';

import { headless, react } from '../.source/server';

/**
 * Two trees, two loaders, one app (design D3).
 *
 * `baseUrl` is relative to the React Router `basename` of `/docs`, so these resolve
 * to `/docs/react/*` and `/docs/headless/*` once the basename is applied.
 *
 * NOTE: this file deliberately does not live under `app/lib/`. The repo-wide `.gitignore`
 * has a bare `lib` rule for build output, which silently excludes any `lib` directory —
 * source included.
 */
export const reactSource = loader({
  source: react.toFumadocsSource(),
  baseUrl: '/react',
});

export const headlessSource = loader({
  source: headless.toFumadocsSource(),
  baseUrl: '/headless',
});

export type DocsTree = 'react' | 'headless';

export const sources = {
  react: reactSource,
  headless: headlessSource,
} satisfies Record<DocsTree, unknown>;

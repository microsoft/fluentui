import { readdirSync, statSync } from 'node:fs';
import { join, relative, sep } from 'node:path';

import type { Config } from '@react-router/dev/config';

const TREES = ['react', 'headless'] as const;

/**
 * Enumerate every content file as a route.
 *
 * This runs in plain Node during the build, so it cannot import `.source` — that module
 * is built on `import.meta.glob` and only resolves inside Vite. Scanning the content
 * directory is the equivalent, and keeps prerendering independent of the MDX runtime.
 */
function collectRoutes(): string[] {
  const routes = new Set<string>(['/']);

  for (const tree of TREES) {
    const root = join(process.cwd(), 'content', tree);

    const walk = (dir: string): void => {
      for (const entry of readdirSync(dir)) {
        const full = join(dir, entry);

        if (statSync(full).isDirectory()) {
          walk(full);
          continue;
        }

        if (!/\.mdx?$/.test(entry)) {
          continue;
        }

        const slug = relative(root, full)
          .replace(/\.mdx?$/, '')
          .split(sep)
          .filter(segment => segment !== 'index');

        routes.add(`/${[tree, ...slug].join('/')}`);
      }
    };

    walk(root);
  }

  return [...routes];
}

/**
 * Static output only (design D9). GitHub Pages serves files with no rewrite rules,
 * so every route must emit its own index.html for deep links to resolve.
 */
export default {
  ssr: false,
  basename: '/docs',
  // Matches the repo-wide convention (and root .gitignore), where every app builds to `dist`.
  buildDirectory: 'dist',
  prerender: collectRoutes,
} satisfies Config;

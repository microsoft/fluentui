import { defineConfig, defineDocs } from 'fumadocs-mdx/config';

/**
 * Two independent documentation trees, served at /docs/react and /docs/headless.
 * They share one app, one search index, and one deployment (design D3).
 */
export const react = defineDocs({
  dir: 'content/react',
});

export const headless = defineDocs({
  dir: 'content/headless',
});

export default defineConfig();

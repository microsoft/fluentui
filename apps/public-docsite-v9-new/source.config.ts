import { defineConfig, defineDocs } from 'fumadocs-mdx/config';

/**
 * Two independent documentation trees, served at /docs/react and /docs/headless.
 * They share one app, one search index, and one deployment (design D3).
 *
 * `async: true` keeps only frontmatter eager and puts each page's compiled body behind
 * `load()`. With eager collections every page's MDX — and therefore every story module it
 * imports — is pulled into a single shared chunk, so opening one component page downloads
 * the examples for all of them.
 */
export const react = defineDocs({
  dir: 'content/react',
  docs: { async: true },
});

export const headless = defineDocs({
  dir: 'content/headless',
  docs: { async: true },
});

export default defineConfig();

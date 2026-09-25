import { loader } from 'fumadocs-core/source';
import type { MetaData, PageData, StaticSource } from 'fumadocs-core/source';

export type DocsTree = 'react' | 'headless';
type Frontmatter = PageData & { title: string };

// Navigation needs only frontmatter and folder metadata. MDX bodies are loaded separately
// through .source/browser; importing .source/server here exposes filesystem methods to Vite's client build.
function navigationSource(pages: Record<string, Frontmatter>, metas: Record<string, MetaData>, baseUrl: string) {
  const source: StaticSource<{ pageData: Frontmatter; metaData: MetaData }> = {
    files: [
      ...Object.entries(pages).map(([path, data]) => ({ type: 'page' as const, path: path.slice(2), data })),
      ...Object.entries(metas).map(([path, data]) => ({ type: 'meta' as const, path: path.slice(2), data })),
    ],
  };
  return loader({
    baseUrl,
    source,
  });
}

export const reactSource = navigationSource(
  import.meta.glob<Frontmatter>('./**/*.{mdx,md}', {
    base: '../content/react',
    query: { collection: 'react', only: 'frontmatter' },
    import: 'frontmatter',
    eager: true,
  }),
  import.meta.glob<MetaData>('./**/*.{json,yaml}', {
    base: '../content/react',
    query: { collection: 'react' },
    import: 'default',
    eager: true,
  }),
  '/react',
);

export const headlessSource = navigationSource(
  import.meta.glob<Frontmatter>('./**/*.{mdx,md}', {
    base: '../content/headless',
    query: { collection: 'headless', only: 'frontmatter' },
    import: 'frontmatter',
    eager: true,
  }),
  import.meta.glob<MetaData>('./**/*.{json,yaml}', {
    base: '../content/headless',
    query: { collection: 'headless' },
    import: 'default',
    eager: true,
  }),
  '/headless',
);

export const sources = { react: reactSource, headless: headlessSource };

import { loader } from 'fumadocs-core/source';

import { headless, react } from '../.source/server';

export type DocsTree = 'react' | 'headless';

export const reactSource = loader({
  source: react.toFumadocsSource(),
  baseUrl: '/react',
});

export const headlessSource = loader({
  source: headless.toFumadocsSource(),
  baseUrl: '/headless',
});

export const sources = {
  react: reactSource,
  headless: headlessSource,
} satisfies Record<DocsTree, unknown>;

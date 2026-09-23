/**
 * Loads compiled content in Node for development and build-time static prerendering.
 * The .server.ts suffix keeps filesystem-backed content methods out of browser bundles; no server is deployed.
 */
import { loader } from 'fumadocs-core/source';

import { headless, react } from '../.source/server';

import type { DocsTree } from './source';

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

import { FelaRenderer, StyleNodeAttributes } from '../types';
import { createNode } from './createNode';
import { queryNode } from './queryNode';

function getReference({ type, media = '', support = '' }: StyleNodeAttributes): string {
  return type + media + support;
}

export function getNodeFromCache(
  attributes: StyleNodeAttributes,
  renderer: FelaRenderer,
  targetDocument: Document,
): HTMLStyleElement {
  const reference = getReference(attributes);

  if (!renderer.nodes[reference]) {
    const node =
      queryNode(attributes, targetDocument) ||
      createNode(attributes, targetDocument, renderer.sortMediaQuery, renderer.styleNodeAttributes);

    renderer.nodes[reference] = node;
  }

  return renderer.nodes[reference];
}

import type { FelaRenderer, NodeAttributes } from '../types';
import { createNode } from './createNode';
import { queryNode } from './queryNode';

function getReference({ type, media = '', support = '' }: NodeAttributes): string {
  return type + media + support;
}

export function getNodeFromCache(
  attributes: NodeAttributes,
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

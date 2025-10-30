import type { SortMediaQueryFn, FelaRendererStyleNodeAttributes, StyleNodeAttributes } from '../types';
import { getNodeSibling } from './getNodeSibling';

export function createNode(
  attributes: StyleNodeAttributes,
  targetDocument: Document,
  sortMediaQuery: SortMediaQueryFn,
  styleNodeAttributes: FelaRendererStyleNodeAttributes,
): HTMLStyleElement {
  const head = targetDocument.head;
  const { type, media, support } = attributes;

  const node = targetDocument.createElement('style');

  node.setAttribute('data-fela-type', type);
  node.type = 'text/css';

  if (support) {
    node.setAttribute('data-fela-support', 'true');
  }

  if (media) {
    node.media = media;
  }

  // applying custom style tag attributes
  for (const attribute in styleNodeAttributes) {
    node.setAttribute(attribute, styleNodeAttributes[attribute]);
  }

  const nodes = Array.from(head.querySelectorAll<HTMLStyleElement>('[data-fela-type]'));
  const sibling = getNodeSibling(nodes, attributes, sortMediaQuery);

  if (sibling) {
    head.insertBefore(node, sibling);
  } else {
    head.appendChild(node);
  }

  return node;
}

/* eslint-disable */
import calculateNodeScore from './calculateNodeScore';
import queryNode from './queryNode';
import createNode from './createNode';
import { FelaRenderer, FelaRendererChange } from '../../types';

function getReference({ type, media = '', support = '' }: FelaRendererChange): string {
  return type + media + support;
}

export default function getNodeFromCache(
  attributes: FelaRendererChange,
  renderer: FelaRenderer,
  targetDocument: any = document,
): HTMLStyleElement {
  const reference = getReference(attributes);

  if (!renderer.nodes[reference]) {
    const score = calculateNodeScore(attributes, renderer.mediaQueryOrder);
    const node = queryNode(attributes, targetDocument) || createNode(renderer.nodes, score, attributes, targetDocument);

    renderer.nodes[reference] = {
      node,
      score,
    };
  }

  return renderer.nodes[reference].node;
}

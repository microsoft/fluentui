/* eslint-disable */
// @ts-ignore
import objectReduce from 'fast-loops/lib/objectReduce';
import { FelaRenderer, FelaRendererChange } from '../../types';

export default function createNode(
  nodes: FelaRenderer['nodes'],
  score: number,
  { type, media, support }: FelaRendererChange,
  targetDocument: any = document,
): HTMLStyleElement {
  const head = targetDocument.head || {};

  const node = targetDocument.createElement('style');
  node.setAttribute('data-fela-type', type);
  node.type = 'text/css';

  if (support) {
    node.setAttribute('data-fela-support', 'true');
  }

  if (media) {
    node.media = media;
  }

  // we calculate the most next bigger style node
  // to correctly inject the node just before it
  const moreSpecificReference = objectReduce(
    nodes,
    (closest: any, currentNode: any, reference: any) =>
      currentNode.score > score && (!closest || (nodes[closest] as any).score > currentNode.score)
        ? reference
        : closest,
    undefined,
  );

  if (moreSpecificReference) {
    head.insertBefore(node, (nodes[moreSpecificReference] as any).node);
  } else {
    head.appendChild(node);
  }

  return node;
}

/* eslint-disable */
import calculateNodeScore from './calculateNodeScore';
import queryNode from './queryNode';
import createNode from './createNode';
import { FelaRenderer, FelaRendererChange } from '../../types';

function getReference({ type, media = '', support = '' }: FelaRendererChange, ruleScore: number): string {
  return type + media + support + ruleScore;
}

export default function getNodeFromCache(
  change: FelaRendererChange,
  renderer: FelaRenderer,
  targetDocument: any = document,
  ruleScore: number,
): HTMLStyleElement {
  const reference = getReference(change, ruleScore);

  if (!renderer.nodes[reference]) {
    const score = calculateNodeScore(change, renderer.mediaQueryOrder, ruleScore);

    let node = queryNode(change, score, targetDocument);

    if (!node) {
      node = createNode(renderer.nodes, score, ruleScore, change, targetDocument);
    } else if (node.sheet!.cssRules.length > 200) {
      node = createNode(renderer.nodes, score, ruleScore, change, targetDocument);
    }

    renderer.nodes[reference] = {
      node,
      score,
    };
  } else {
    const { node } = renderer.nodes[reference];

    if (node.sheet!.cssRules.length > 100) {
      const score = calculateNodeScore(change, renderer.mediaQueryOrder, ruleScore);
      const newNode = createNode(renderer.nodes, score, ruleScore, change, targetDocument);

      renderer.nodes[reference] = {
        node: newNode,
        score,
      };
    }
  }

  return renderer.nodes[reference].node;
}

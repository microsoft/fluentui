/* eslint-disable */
// @ts-ignore
import objectEach from 'fast-loops/lib/objectEach';
// @ts-ignore
import { RULE_TYPE, KEYFRAME_TYPE, FONT_TYPE, STATIC_TYPE, CLEAR_TYPE, generateCSSRule } from 'fela-utils';

import getNodeFromCache from './getNodeFromCache';
import insertRule from './insertRule';
import { FelaRenderer, FelaRendererChange } from '../../types';

export default function createSubscription(renderer: FelaRenderer, targetDocument: any = document) {
  return (change: FelaRendererChange) => {
    if (change.type === CLEAR_TYPE) {
      objectEach(renderer.nodes, ({ node }: { node: HTMLStyleElement }) => node.parentNode!.removeChild(node));

      renderer.nodes = {};
      renderer.scoreIndex = {};
      return;
    }

    const node = getNodeFromCache(change, renderer, targetDocument);

    switch (change.type) {
      case KEYFRAME_TYPE:
        node.textContent += change.keyframe;
        break;
      case FONT_TYPE:
        node.textContent += change.fontFace;
        break;
      case STATIC_TYPE:
        node.textContent += change.selector ? generateCSSRule(change.selector, change.css) : change.css;
        break;
      case RULE_TYPE:
        insertRule(change, renderer, node);
        break;
      default:
        // TODO: warning
        break;
    }
  };
}

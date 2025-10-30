import { RULE_TYPE, KEYFRAME_TYPE } from 'fela-utils';

import type { FelaRenderer, FelaRendererChange } from '../types';
import { getNodeFromCache } from './getNodeFromCache';
import { insertRule } from './insertRule';

export function insertChange(renderer: FelaRenderer, targetDocument: Document, change: FelaRendererChange) {
  const node = getNodeFromCache(change, renderer, targetDocument);

  switch (change.type) {
    case KEYFRAME_TYPE:
      if (node.textContent?.indexOf(change.keyframe) === -1) {
        node.textContent += change.keyframe;
      }
      break;
    case RULE_TYPE:
      insertRule(change, renderer, node);
      break;
    default:
      // TODO: warning
      break;
  }
}

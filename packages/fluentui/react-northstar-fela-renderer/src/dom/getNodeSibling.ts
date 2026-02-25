import { KEYFRAME_TYPE, RULE_TYPE } from 'fela-utils';

import { SortMediaQueryFn, StyleNodeAttributes } from '../types';

export function getNodeSibling(
  nodes: HTMLStyleElement[],
  { type, media, support, container }: StyleNodeAttributes,
  sortMediaQuery: SortMediaQueryFn,
): HTMLElement | undefined {
  switch (type) {
    case KEYFRAME_TYPE:
      return nodes[0];
    case RULE_TYPE:
      const mediaNodes = nodes.map(node => node.media);
      const filteredNodes = mediaNodes.filter(m => m.length !== 0);

      if (media) {
        const sorted = [...filteredNodes, media].sort(sortMediaQuery);
        const index = sorted.indexOf(media) + 1;
        const insertMedia = sorted[index];

        if (insertMedia) {
          if (insertMedia === media && container) {
            // container
            return nodes.find(el => el.media === sorted[sorted.indexOf(media) + 2]);
          }
          if (insertMedia === media && support) {
            // support
            return nodes.find(el => el.media === sorted[sorted.indexOf(media) + 2]);
          }
          return nodes.find(el => el.media === insertMedia);
        }
      } else {
        const sorted = filteredNodes.sort(sortMediaQuery);
        const insertMedia = sorted[0];

        if (!support && !container) {
          // if we insert the plain RULE node while there's already a support or container RULE node
          // make sure to insert before (whichever comes first in DOM order)
          const firstSpecialNode = nodes.find(
            el =>
              (el.getAttribute('data-fela-support') === 'true' || el.getAttribute('data-fela-container') === 'true') &&
              el.media === '' &&
              el.getAttribute('data-fela-type') === 'RULE',
          );

          if (firstSpecialNode) {
            return firstSpecialNode;
          }
        }

        if (support && !container) {
          // if we insert a support RULE node while there's already a container RULE node
          // make sure to insert before
          const containerNode = nodes.find(
            el =>
              el.getAttribute('data-fela-container') === 'true' &&
              el.media === '' &&
              el.getAttribute('data-fela-type') === 'RULE',
          );

          if (containerNode) {
            return containerNode;
          }
        }

        if (insertMedia) {
          return nodes.find(el => el.media === insertMedia);
        }
      }
  }

  return undefined;
}

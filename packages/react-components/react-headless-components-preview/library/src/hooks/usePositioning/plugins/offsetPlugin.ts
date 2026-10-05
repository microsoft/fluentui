import type { Alignment, Position } from '@fluentui/react-positioning';
import { POSITIONS } from '../constants';
import { resolveOffset } from '../utils';
import type { PositioningPlugin } from './types';

/**
 * Handles `offset` when it's a function, a number or an object are handled by CSS.
 */
export const offsetPlugin: PositioningPlugin = {
  requiresJs: ({ offset }) => typeof offset === 'function',
  prepare: (input, { options: { offset } }) => {
    if (typeof offset !== 'function') {
      return input;
    }

    const { anchor, width, height } = input;

    return {
      ...input,
      getMargins: ({ position, align }) => {
        const isBlockMain = position === POSITIONS.above || position === POSITIONS.below;
        const alignment: Alignment = isBlockMain
          ? align
          : align === 'start'
          ? 'top'
          : align === 'end'
          ? 'bottom'
          : align;
        const { mainAxis, crossAxis } = resolveOffset(
          offset({
            positionedRect: { x: 0, y: 0, width, height },
            targetRect: { x: anchor.left, y: anchor.top, width: anchor.width, height: anchor.height },
            position: position as Position,
            alignment,
          }),
        );

        return isBlockMain
          ? { marginBlock: mainAxis, marginInline: crossAxis }
          : { marginBlock: crossAxis, marginInline: mainAxis };
      },
    };
  },
};

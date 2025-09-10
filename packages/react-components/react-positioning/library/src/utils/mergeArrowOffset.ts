import type { Offset, OffsetObject } from '../types';

/**
 * Generally when adding an arrow to popper, it's necessary to offset the position of the popper by the
 * height of the arrow. A simple utility to merge a provided offset with an arrow height to return the final offset
 *
 * @internal
 * @param userOffset - The offset provided by the user
 * @param arrowHeight - The height of the arrow in px
 * @returns User offset augmented with arrow height
 */
export function mergeArrowOffset(userOffset: Offset | undefined | null, arrowHeight: number): Offset {
  if (typeof userOffset === 'number') {
    return addArrowOffset(userOffset, arrowHeight);
  }

  if (typeof userOffset === 'object' && userOffset !== null) {
    return addArrowOffset(userOffset, arrowHeight);
  }

  if (typeof userOffset === 'function') {
    return offsetParams => {
      const offset = userOffset(offsetParams);
      return addArrowOffset(offset, arrowHeight);
    };
  }

  return { mainAxis: arrowHeight };
}

const addArrowOffset = (offset: OffsetObject | number, arrowHeight: number): OffsetObject => {
  if (typeof offset === 'number') {
    return { mainAxis: offset + arrowHeight };
  }

  return { ...offset, mainAxis: (offset.mainAxis ?? 0) + arrowHeight };
};

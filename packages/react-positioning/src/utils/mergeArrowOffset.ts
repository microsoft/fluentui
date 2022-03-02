import type { Offset, OffsetObject } from '../types';

/**
 * Generally when adding an arrow to popper, it's necessary to offset the position of the popper by the
 * height of the arrow. A simple utility to merge a provided offset with an arrow height to return the final offset
 *
 * @param userOffset - The offset provided by the user
 * @param arrowHeight - The height of the arrow in px
 * @returns User offset augmented with arrow height
 */
export function mergeArrowOffset(userOffset: Offset | undefined | null, arrowHeight: number): Offset {
  let offsetWithArrow = userOffset;
  if (!offsetWithArrow) {
    return { crossAxis: 0, mainAxis: arrowHeight };
  }

  if (typeof offsetWithArrow === 'number') {
    return mergeArrowOffset(offsetWithArrow, arrowHeight);
  }

  if (typeof offsetWithArrow === 'object') {
    return addArrowOffset(offsetWithArrow, arrowHeight);
  }

  if (typeof offsetWithArrow === 'function') {
    const userOffsetFn = offsetWithArrow;
    offsetWithArrow = offsetParams => {
      const offset = userOffsetFn(offsetParams);
      return addArrowOffset(offset, arrowHeight);
    };
  }

  // This should never happen
  return -1 as never;
}

const addArrowOffset = (offset: OffsetObject | number, arrowHeight: number): OffsetObject => {
  if (typeof offset === 'number') {
    return { mainAxis: offset + arrowHeight };
  }

  let mainAxis = offset.mainAxis;
  if (mainAxis !== null && mainAxis !== undefined) {
    mainAxis += arrowHeight;
  } else {
    mainAxis = arrowHeight;
  }

  return { ...offset, mainAxis };
};

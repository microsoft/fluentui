import { Offset } from '@fluentui/react-positioning';

/**
 * @param userOffset - The offset provided by the user
 * @param arrowHeight - The height of the arrow in px
 * @returns User offset augmented with arrow height
 */
export function getOffsetWithArrow(userOffset: Offset | undefined | null, arrowHeight: number): Offset {
  let offsetWithArrow = userOffset;
  if (!userOffset) {
    return [0, arrowHeight];
  }

  if (Array.isArray(offsetWithArrow)) {
    setArrowOffset(offsetWithArrow, arrowHeight);
    return offsetWithArrow;
  }

  if (typeof offsetWithArrow === 'function') {
    const userOffsetFn = offsetWithArrow;
    offsetWithArrow = offsetParams => {
      const offset = userOffsetFn(offsetParams);
      setArrowOffset(offset, arrowHeight);
      return offset;
    };
  }

  // This should never happen
  return [0, 0] as never;
}

const setArrowOffset = (offset: [number | null | undefined, number | null | undefined], arrowHeight: number) => {
  if (offset[1] !== null && offset[1] !== undefined) {
    offset[1] += arrowHeight;
  } else {
    offset[1] = arrowHeight;
  }
};

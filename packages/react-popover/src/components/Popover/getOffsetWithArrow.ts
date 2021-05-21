import { Offset } from '@fluentui/react-positioning';
import { PopoverSize } from './index';
import { arrowHeights } from '../PopoverContent/index';

// TODO unit test
/**
 * @param userOffset The offset provided by the user
 * @param size The size of the popover
 * @returns User offset augmented with arrow height
 */
export function getOffsetWithArrow(userOffset: Offset | undefined, size: PopoverSize): Offset {
  const arrowHeight = arrowHeights[size];
  let offsetWithArrow = userOffset;
  if (!userOffset) {
    return [0, arrowHeight];
  }

  if (Array.isArray(offsetWithArrow)) {
    if (offsetWithArrow[1]) {
      offsetWithArrow[1] += arrowHeight;
    }

    return offsetWithArrow;
  }

  if (typeof offsetWithArrow === 'function') {
    const userOffsetFn = offsetWithArrow;
    offsetWithArrow = offsetParams => {
      const offset = userOffsetFn(offsetParams);
      if (offset[1]) {
        offset[1] += arrowHeight;
      }

      return offset;
    };
  }

  // This should never happen
  return [0, 0] as never;
}

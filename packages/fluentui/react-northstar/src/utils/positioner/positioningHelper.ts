import type { Placement as PopperJsPlacement } from '@popperjs/core';
import { Alignment, Offset, OffsetFunction, OffsetFunctionParam, Position } from './types';

enum PlacementParts {
  top = 'top',
  bottom = 'bottom',
  start = 'start',
  end = 'end',
  left = 'left',
  right = 'right',
  center = '',
}

const getPositionMap = (rtl: boolean): Record<Position, PlacementParts> => ({
  above: PlacementParts.top,
  below: PlacementParts.bottom,
  before: rtl ? PlacementParts.right : PlacementParts.left,
  after: rtl ? PlacementParts.left : PlacementParts.right,
});

const getAlignmentMap = (rtl: boolean): Record<Alignment, PlacementParts> => ({
  start: rtl ? PlacementParts.end : PlacementParts.start,
  end: rtl ? PlacementParts.start : PlacementParts.end,
  top: PlacementParts.start,
  bottom: PlacementParts.end,
  center: PlacementParts.center,
});

const shouldAlignToCenter = (p: Position, a: Alignment) => {
  const positionedVertically = p === 'above' || p === 'below';
  const alignedVertically = a === 'top' || a === 'bottom';

  return (positionedVertically && alignedVertically) || (!positionedVertically && !alignedVertically);
};

/**
 * | position | alignment | placement       | placement RTL
 * -----------------------------------------------------------------
 * | above    | start     |  top-start      |  top-end
 * | above    | center    |  top            |  top
 * | above    | end       |  top-end        |  top-start
 * | below    | start     |  bottom-start   |  bottom-end
 * | below    | center    |  bottom         |  bottom
 * | below    | end       |  bottom-end     |  bottom-start
 * | before   | top       |  left-start     |  right-start
 * | before   | center    |  left           |  right
 * | before   | bottom    |  left-end       |  right-end
 * | after    | top       |  right-start    |  left-start
 * | after    | center    |  right          |  left
 * | after    | bottom    |  right-end      |  left-end
 */
export const getPlacement = (align: Alignment, position: Position, rtl: boolean): PopperJsPlacement => {
  const alignment: Alignment = shouldAlignToCenter(position, align) ? 'center' : align;
  const computedPosition = getPositionMap(rtl)[position];
  const computedAlignment = getAlignmentMap(rtl)[alignment];
  const stringifiedAlignment = computedAlignment && `-${computedAlignment}`;

  return `${computedPosition}${stringifiedAlignment}` as PopperJsPlacement;
};

export const applyRtlToOffset = (offset: Offset | undefined): Offset | undefined => {
  if (typeof offset === 'undefined') {
    return undefined;
  }

  if (Array.isArray(offset)) {
    offset[0] = offset[0] * -1;

    return offset;
  }

  return ((param: OffsetFunctionParam) => applyRtlToOffset(offset(param))) as OffsetFunction;
};

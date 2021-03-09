import * as PopperJs from '@popperjs/core';
import { Alignment, Offset, OffsetFunction, OffsetFunctionParam, Position } from '../types';

enum PlacementParts {
  top = 'top',
  bottom = 'bottom',
  start = 'start',
  end = 'end',
  left = 'left',
  right = 'right',
  center = '',
}

const getPositionMap = (
  rtl?: boolean,
): Record<Position, PlacementParts.top | PlacementParts.bottom | PlacementParts.left | PlacementParts.right> => ({
  above: PlacementParts.top,
  below: PlacementParts.bottom,
  before: rtl ? PlacementParts.right : PlacementParts.left,
  after: rtl ? PlacementParts.left : PlacementParts.right,
});

const getAlignmentMap = (
  rtl?: boolean,
): Record<Alignment, PlacementParts.start | PlacementParts.end | PlacementParts.center> => ({
  start: rtl ? PlacementParts.end : PlacementParts.start,
  end: rtl ? PlacementParts.start : PlacementParts.end,
  top: PlacementParts.start,
  bottom: PlacementParts.end,
  center: PlacementParts.center,
});

const shouldAlignToCenter = (p?: Position, a?: Alignment) => {
  const positionedVertically = p === 'above' || p === 'below';
  const alignedVertically = a === 'top' || a === 'bottom';

  return (positionedVertically && alignedVertically) || (!positionedVertically && !alignedVertically);
};

/**
 * @see positioninHelper.test.ts for expected placement values
 */
export const getPlacement = (align?: Alignment, position?: Position, rtl?: boolean): PopperJs.Placement => {
  const alignment = shouldAlignToCenter(position, align) ? 'center' : align;

  const computedPosition = position && getPositionMap(rtl)[position];
  const computedAlignmnent = alignment && getAlignmentMap(rtl)[alignment];

  if (computedPosition && computedAlignmnent) {
    return `${computedPosition}-${computedAlignmnent}` as PopperJs.Placement;
  }

  return computedPosition || ('auto' as PopperJs.Placement);
};

export const applyRtlToOffset = (offset: Offset | undefined): Offset | undefined => {
  if (typeof offset === 'undefined') {
    return undefined;
  }

  if (Array.isArray(offset)) {
    offset[0] = offset[0]! * -1;

    return offset;
  }

  return ((param: OffsetFunctionParam) => applyRtlToOffset(offset(param))) as OffsetFunction;
};

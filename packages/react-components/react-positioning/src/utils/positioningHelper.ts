import * as PopperJs from '@popperjs/core';
import type { Alignment, Position } from '../types';
import { PopperOffset, PopperOffsetFunction, PopperOffsetFunctionParam } from './getPopperOffset';

type PlacementPosition = 'top' | 'bottom' | 'left' | 'right';
type PlacementAlign = 'start' | 'end' | ''; // '' represents center

const getPositionMap = (rtl?: boolean): Record<Position, PlacementPosition> => ({
  above: 'top',
  below: 'bottom',
  before: rtl ? 'right' : 'left',
  after: rtl ? 'left' : 'right',
});

const getAlignmentMap = (rtl?: boolean): Record<Alignment, PlacementAlign> => ({
  start: rtl ? 'end' : 'start',
  end: rtl ? 'start' : 'end',
  top: 'start',
  bottom: 'end',
  center: '',
});

const shouldAlignToCenter = (p?: Position, a?: Alignment): boolean => {
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

export const applyRtlToOffset = (offset: PopperOffset | undefined): PopperOffset | undefined => {
  if (typeof offset === 'undefined') {
    return undefined;
  }

  if (Array.isArray(offset)) {
    offset[0] = offset[0]! * -1;

    return offset;
  }

  return ((param: PopperOffsetFunctionParam) => applyRtlToOffset(offset(param))) as PopperOffsetFunction;
};

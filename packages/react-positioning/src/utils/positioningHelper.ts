import * as FloatingUI from '@floating-ui/core';
import type { Alignment, Position } from '../types';

type PlacementPosition = 'top' | 'bottom' | 'left' | 'right';
type PlacementAlign = 'start' | 'end' | ''; // '' represents center

const getPositionMap = (rtl?: boolean): Record<Position, PlacementPosition> => ({
  above: 'top',
  below: 'bottom',
  before: rtl ? 'right' : 'left',
  after: rtl ? 'left' : 'right',
});

const getAlignmentMap = (): Record<Alignment, PlacementAlign> => ({
  start: 'start',
  end: 'end',
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
export const getPlacement = (
  align?: Alignment,
  position?: Position,
  rtl?: boolean,
): FloatingUI.Placement | undefined => {
  const alignment = shouldAlignToCenter(position, align) ? 'center' : align;

  const computedPosition = position && getPositionMap(rtl)[position];
  const computedAlignmnent = alignment && getAlignmentMap()[alignment];

  if (computedPosition && computedAlignmnent) {
    return `${computedPosition}-${computedAlignmnent}` as FloatingUI.Placement;
  }

  return computedPosition;
};

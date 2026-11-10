import type { Placement, Side, Alignment as FloatingUIAlignment } from '@floating-ui/dom';
import type { Alignment, Position } from '../types';

type PlacementPosition = Side;
type PlacementAlign = FloatingUIAlignment;

const getPositionMap = (rtl?: boolean): Record<Position, PlacementPosition> => ({
  above: 'top',
  below: 'bottom',
  before: rtl ? 'right' : 'left',
  after: rtl ? 'left' : 'right',
});

// Floating UI automatically flips alignment
// https://github.com/floating-ui/floating-ui/issues/1563
const getAlignmentMap = (): Record<Alignment, PlacementAlign | undefined> => ({
  start: 'start',
  end: 'end',
  top: 'start',
  bottom: 'end',
  center: undefined,
});

const shouldAlignToCenter = (p?: Position, a?: Alignment): boolean => {
  const positionedVertically = p === 'above' || p === 'below';
  const alignedVertically = a === 'top' || a === 'bottom';

  return (positionedVertically && alignedVertically) || (!positionedVertically && !alignedVertically);
};

/**
 * Maps internal positioning values to Floating UI placement
 * @see positioningHelper.test.ts for expected placement values
 */
export const toFloatingUIPlacement = (align?: Alignment, position?: Position, rtl?: boolean): Placement | undefined => {
  const alignment = shouldAlignToCenter(position, align) ? 'center' : align;

  const computedPosition = position && getPositionMap(rtl)[position];
  const computedAlignment = alignment && getAlignmentMap()[alignment];

  if (computedPosition && computedAlignment) {
    return `${computedPosition}-${computedAlignment}` as Placement;
  }

  return computedPosition;
};

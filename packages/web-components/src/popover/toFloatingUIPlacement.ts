/* Copy&paste from FUIR9 usePositioning(). */
import type { Alignment, Placement, Side } from '@floating-ui/dom';

import { PopoverAlignment, PopoverPosition } from './popover.options.js';

type PlacementPosition = Side;
type PlacementAlign = Alignment;

const getPositionMap = (rtl?: boolean): Record<PopoverPosition, PlacementPosition> => ({
  above: 'top',
  below: 'bottom',
  before: rtl ? 'right' : 'left',
  after: rtl ? 'left' : 'right',
});

// Floating UI automatically flips alignment
// https://github.com/floating-ui/floating-ui/issues/1563
const getAlignmentMap = (): Record<PopoverAlignment, PlacementAlign | undefined> => ({
  start: 'start',
  end: 'end',
  top: 'start',
  bottom: 'end',
  center: undefined,
});

const shouldAlignToCenter = (p?: PopoverPosition, a?: PopoverAlignment): boolean => {
  const positionedVertically = p === 'above' || p === 'below';
  const alignedVertically = a === 'top' || a === 'bottom';

  return (positionedVertically && alignedVertically) || (!positionedVertically && !alignedVertically);
};

/**
 * Maps internal positioning values to Floating UI placement
 */
export const toFloatingUIPlacement = (
  align: PopoverAlignment = 'center',
  position: PopoverPosition = 'above',
  rtl?: boolean,
): Placement | undefined => {
  const alignment = shouldAlignToCenter(position, align) ? 'center' : align;

  const computedPosition = position && getPositionMap(rtl)[position];
  const computedAlignment = alignment && getAlignmentMap()[alignment];

  if (computedPosition && computedAlignment) {
    return `${computedPosition}-${computedAlignment}` as Placement;
  }

  return computedPosition;
};

import type { Placement } from '../floating';
import type { Alignment, Position } from '../types';

/**
 * Maps internal positioning values to Floating UI placement
 * @see positioningHelper.test.ts for expected placement values
 */
export const toFloatingUIPlacement = (align?: Alignment, position?: Position, rtl?: boolean): Placement | undefined => {
  if (!position) {
    return undefined;
  }

  const positionedVertically = position === 'above' || position === 'below';
  const alignedVertically = align === 'top' || align === 'bottom';

  // `before` is on the left (right in RTL), `after` is the opposite
  const side = positionedVertically
    ? position === 'above'
      ? 'top'
      : 'bottom'
    : (position === 'before') !== Boolean(rtl)
    ? 'left'
    : 'right';

  // Aligning to the center is the absence of an alignment in Floating UI
  // Floating UI automatically flips alignment
  // https://github.com/floating-ui/floating-ui/issues/1563
  const alignment =
    positionedVertically === alignedVertically
      ? undefined
      : align === 'start' || align === 'top'
      ? 'start'
      : align === 'end' || align === 'bottom'
      ? 'end'
      : undefined;

  return alignment ? `${side}-${alignment}` : side;
};

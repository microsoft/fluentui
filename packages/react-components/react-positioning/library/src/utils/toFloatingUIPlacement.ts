import type { Placement, Side } from '@floating-ui/dom';
import type { Alignment, Position } from '../types';

/**
 * Maps internal positioning values to Floating UI placement
 * @see positioningHelper.test.ts for expected placement values
 */
export const toFloatingUIPlacement = (align?: Alignment, position?: Position, rtl?: boolean): Placement | undefined => {
  if (!position) {
    return undefined;
  }
  const block = position === 'above' || position === 'below';
  const side: Side = block
    ? position === 'above'
      ? 'top'
      : 'bottom'
    : (position === 'before') !== !!rtl
    ? 'left'
    : 'right';
  const alignedVertically = align === 'top' || align === 'bottom';
  if (!align || align === 'center' || block === alignedVertically) {
    return side;
  }
  return `${side}-${align === 'start' || align === 'top' ? 'start' : 'end'}`;
};

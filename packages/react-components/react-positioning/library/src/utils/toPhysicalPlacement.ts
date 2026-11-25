import type { Alignment, Position, PositioningPlacement, Side } from '../types';

/** Resolves a Fluent position and alignment to a physical placement, e.g. `before` to `right` in RTL. */
export const toPhysicalPlacement = (
  align?: Alignment,
  position?: Position,
  rtl?: boolean,
): PositioningPlacement | undefined => {
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

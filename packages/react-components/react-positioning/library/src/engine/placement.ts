import type { Alignment, Position, PositioningPlacement } from '../types';
import type { LogicalAlignment, Placement } from './computePlacement';

/**
 * Alignments that don't apply to the axis of the position are ignored:
 * `above` + `top` is centered, `before` + `start` is centered.
 */
export function toPlacement(position: Position = 'below', align: Alignment = 'center'): Placement {
  const positionedVertically = position === 'above' || position === 'below';
  let logical: LogicalAlignment = 'center';

  if (positionedVertically) {
    logical = align === 'start' || align === 'end' ? align : 'center';
  } else if (align === 'top' || align === 'bottom') {
    logical = align === 'top' ? 'start' : 'end';
  }

  return { position, align: logical };
}

/**
 * The physical placement that is exposed in `data-popper-placement` and in `onPositioningEnd`.
 * `before` and `after` swap sides in RTL, the alignment (`start`, `end`) stays logical.
 */
export function toPositioningPlacement({ position, align }: Placement, rtl: boolean): PositioningPlacement {
  const side =
    position === 'above' ? 'top' : position === 'below' ? 'bottom' : (position === 'before') !== rtl ? 'left' : 'right';

  return (align === 'center' ? side : `${side}-${align}`) as PositioningPlacement;
}

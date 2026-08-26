import { resolvePositioningShorthand } from '@fluentui/react-headless-components-preview/positioning';

import type { PopoverSize } from './Popover.types';

/** Griffel parity: the arrow height is merged into the positioning offset, per size — it pairs
 * with the 8.484px/11.312px constants in PopoverSurface.module.css. */
const ARROW_HEIGHTS: Record<PopoverSize, number> = { small: 6, medium: 8, large: 8 };

type PositioningShorthand = Parameters<typeof resolvePositioningShorthand>[0];
type ResolvedPositioning = ReturnType<typeof resolvePositioningShorthand>;
type ResolvedOffset = ResolvedPositioning['offset'];

/** Same contract as tooltipOffset — see Tooltip.tsx. */
const popoverOffset = (offset: ResolvedOffset, withArrow: boolean, size: PopoverSize): ResolvedOffset => {
  if (!withArrow) {
    return offset;
  }
  if (offset === undefined) {
    return ARROW_HEIGHTS[size];
  }
  if (typeof offset === 'number') {
    return offset + ARROW_HEIGHTS[size];
  }
  return offset;
};

/**
 * The arrow half of a Popover's positioning contract. An arrow has nothing to point at when the
 * surface covers its target, so it is dropped there; otherwise its height joins the offset.
 */
export const resolvePopoverArrow = (
  positioning: PositioningShorthand,
  withArrow: boolean,
  size: PopoverSize,
): { withArrow: boolean; positioning: ResolvedPositioning } => {
  const resolved = resolvePositioningShorthand(positioning);
  const arrow = withArrow && !resolved.coverTarget;

  return { withArrow: arrow, positioning: { ...resolved, offset: popoverOffset(resolved.offset, arrow, size) } };
};

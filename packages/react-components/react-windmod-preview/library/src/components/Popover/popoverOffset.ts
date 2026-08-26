import type { resolvePositioningShorthand } from '@fluentui/react-headless-components-preview/positioning';

import type { PopoverSize } from './Popover.types';

/** Griffel parity: the arrow height is merged into the positioning offset, per size — it pairs
 * with the 8.484px/11.312px constants in PopoverSurface.module.css. */
const ARROW_HEIGHTS: Record<PopoverSize, number> = { small: 6, medium: 8, large: 8 };

type ResolvedOffset = ReturnType<typeof resolvePositioningShorthand>['offset'];

/** Same contract as tooltipOffset — see Tooltip.tsx. Shared by Popover and TeachingPopover, which
 * would otherwise carry byte-identical copies. */
export const popoverOffset = (offset: ResolvedOffset, withArrow: boolean, size: PopoverSize): ResolvedOffset => {
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

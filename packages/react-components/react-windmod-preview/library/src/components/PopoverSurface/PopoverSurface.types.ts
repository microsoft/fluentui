import type { PopoverSurfaceState as PopoverSurfaceHeadlessState } from '@fluentui/react-headless-components-preview/popover';

import type { PopoverAppearance, PopoverSize } from '../Popover/Popover.types';

export type { PopoverSurfaceProps, PopoverSurfaceSlots } from '@fluentui/react-headless-components-preview/popover';

/** The look props arrive by context, so the surface's own subpath has to name their types. */
export type { PopoverAppearance, PopoverSize } from '../Popover/Popover.types';

/**
 * Windmod PopoverSurface state: headless state plus the look values Popover publishes. Griffel
 * declares both props on Popover too, and its own surface state receives them the same way.
 */
export type PopoverSurfaceState = PopoverSurfaceHeadlessState & {
  appearance?: PopoverAppearance;
  size: PopoverSize;
};

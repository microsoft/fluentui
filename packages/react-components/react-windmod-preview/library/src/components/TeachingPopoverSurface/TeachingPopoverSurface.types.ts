import type { PopoverSurfaceState } from '../PopoverSurface/PopoverSurface.types';

export type {
  TeachingPopoverSurfaceProps,
  TeachingPopoverSurfaceSlots,
} from '@fluentui/react-headless-components-preview/teaching-popover';

/** The look props arrive by context, so the surface's own subpath has to name their types. */
export type { PopoverAppearance, PopoverSize } from '../Popover/Popover.types';

/**
 * Windmod TeachingPopoverSurface state: the windmod PopoverSurface state it composes, unchanged —
 * the teaching surface is the Popover surface with a denser chrome layered over it.
 */
export type TeachingPopoverSurfaceState = PopoverSurfaceState;

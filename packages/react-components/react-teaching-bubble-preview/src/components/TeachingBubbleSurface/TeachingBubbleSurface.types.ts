import type { ComponentProps, Slot } from '@fluentui/react-utilities';
import { PopoverSurfaceState } from '@fluentui/react-popover';

/**
 * TeachingBubbleSurface Props
 */
export type TeachingBubbleSurfaceProps = ComponentProps<TeachingBubbleSurfaceSlots>;

/**
 * Names of the slots in TeachingBubbleSurface
 */
export type TeachingBubbleSurfaceSlots = {
  root: Slot<'div'>;
};

/**
 * TeachingBubbleSurface State
 */
export type TeachingBubbleSurfaceState = PopoverSurfaceState & {};

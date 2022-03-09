import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';
import type { PopoverContextValue } from '../../popoverContext';

/**
 * PopoverSurface Props
 */
export type PopoverSurfaceProps = ComponentProps<PopoverSurfaceSlots>;

/**
 * Names of the slots in PopoverSurfaceProps
 */
export type PopoverSurfaceSlots = {
  root: Slot<'div'>;
};

/**
 * PopoverSurface State
 */
export type PopoverSurfaceState = ComponentState<PopoverSurfaceSlots> &
  Pick<PopoverContextValue, 'mountNode' | 'noArrow' | 'size' | 'appearance' | 'arrowRef'> & {
    /**
     * CSS class for the arrow element
     */
    arrowClassName?: string;
  };

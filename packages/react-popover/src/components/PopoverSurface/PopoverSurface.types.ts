import type { ComponentProps, ComponentState, IntrinsicSlotProps } from '@fluentui/react-utilities';
import type { PopoverContextValue } from '../../popoverContext';

/**
 * PopoverSurface Props
 */
export type PopoverSurfaceProps = ComponentProps<PopoverSurfaceSlots>;

/**
 * Names of the slots in PopoverSurfaceProps
 */
export type PopoverSurfaceSlots = {
  root: IntrinsicSlotProps<'div'>;
};

/**
 * PopoverSurface State
 */
export type PopoverSurfaceState = ComponentState<PopoverSurfaceSlots> &
  Pick<PopoverContextValue, 'open' | 'mountNode' | 'noArrow' | 'size' | 'appearance' | 'arrowRef'> & {
    /**
     * CSS class for the arrow element
     */
    arrowClassName?: string;
  };

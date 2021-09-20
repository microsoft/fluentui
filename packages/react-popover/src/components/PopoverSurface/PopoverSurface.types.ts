import type { ComponentProps, ComponentState, IntrinsicShorthandProps } from '@fluentui/react-utilities';
import type { PopoverContextValue } from '../../popoverContext';

/**
 * PopoverSurface Props
 */
export type PopoverSurfaceProps = ComponentProps<PopoverSurfaceSlots>;

/**
 * Names of the slots in PopoverSurfaceProps
 */
export type PopoverSurfaceSlots = {
  root: IntrinsicShorthandProps<'div'>;
};

/**
 * PopoverSurface State
 */
export type PopoverSurfaceState = ComponentState<PopoverSurfaceSlots> &
  Pick<PopoverContextValue, 'open' | 'mountNode' | 'noArrow' | 'size' | 'brand' | 'inverted' | 'arrowRef'> & {
    /**
     * CSS class for the arrow element
     */
    arrowClassName?: string;
  };

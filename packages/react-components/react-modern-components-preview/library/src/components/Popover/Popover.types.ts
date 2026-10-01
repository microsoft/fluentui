import type {
  PopoverProps as PopoverBaseProps,
  PopoverState as PopoverBaseState,
} from '@fluentui/react-headless-components-preview/popover';
import type { PresenceMotionSlotProps } from '@fluentui/react-motion';
import type { ComponentState, Slot } from '@fluentui/react-utilities';

export type {
  OnOpenChangeData,
  OpenPopoverEvents,
  PopoverContextValue,
} from '@fluentui/react-headless-components-preview/popover';

/** Determines popover padding and arrow size. */
export type PopoverSize = 'small' | 'medium' | 'large';

export type PopoverSlots = {
  /** Motion applied to the popover surface. */
  surfaceMotion: Slot<PresenceMotionSlotProps>;
};

export type PopoverInternalSlots = {
  surfaceMotion: NonNullable<Slot<PresenceMotionSlotProps>>;
};

export type PopoverProps = PopoverBaseProps &
  Partial<PopoverSlots> & {
    /**
     * A popover can appear styled with brand or inverted colors.
     * When not specified, the default style is used.
     */
    appearance?: 'brand' | 'inverted';

    /**
     * Determines popover padding and arrow size.
     *
     * @default 'medium'
     */
    size?: PopoverSize;
  };

export type PopoverState = PopoverBaseState &
  ComponentState<{
    surfaceMotion: NonNullable<PopoverSlots['surfaceMotion']>;
  }> & {
    appearance: PopoverProps['appearance'];
    size: NonNullable<PopoverProps['size']>;
  };

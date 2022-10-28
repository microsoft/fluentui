import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';
import type { PopoverProps, PopoverSurface } from '@fluentui/react-popover';

export type InfoButtonSlots = {
  root: NonNullable<Slot<'button'>>;

  /**
   * The PopoverSurface to be displayed when the button is pressed.
   */
  popoverSurface: NonNullable<Slot<typeof PopoverSurface>>;
};

/**
 * InfoButton Props
 */
export type InfoButtonProps = ComponentProps<Partial<InfoButtonSlots>> & Omit<PopoverProps, 'children'>;

/**
 * State used in rendering InfoButton
 */
export type InfoButtonState = ComponentState<InfoButtonSlots> & Omit<PopoverProps, 'children'>;

import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';
import type { PopoverProps, PopoverSurface } from '../../Popover';

export type InfoButtonSlots = {
  root: NonNullable<Slot<'button'>>;

  /**
   * The Popover element that wraps the info and root slots. Use this slot to pass props to the Popover.
   */
  popover: NonNullable<Slot<Partial<Omit<PopoverProps, 'openOnHover'>>>>;

  /**
   * The information to be displayed in the PopoverSurface when the button is pressed.
   */
  info: NonNullable<Slot<typeof PopoverSurface>>;
};

/**
 * InfoButton Props
 */
export type InfoButtonProps = Omit<ComponentProps<Partial<InfoButtonSlots>>, 'disabled' | 'popover'> & {
  /**
   * The Popover element that wraps the info and root slots. Use this slot to pass props to the Popover.
   */
  popover?: InfoButtonSlots['popover'];
};

/**
 * State used in rendering InfoButton
 */
export type InfoButtonState = ComponentState<InfoButtonSlots>;

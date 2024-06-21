import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';
import type { PopoverProps, PopoverSurface } from '@fluentui/react-popover';

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
export type InfoButtonProps = Omit<ComponentProps<Partial<InfoButtonSlots>>, 'disabled'> & {
  /**
   * Size of the InfoButton.
   *
   * @default medium
   */
  size?: 'small' | 'medium' | 'large';

  /**
   * Whether the InfoButton should be rendered inline or on a Portal.
   *
   * @default true
   */
  inline?: boolean;
};

/**
 * State used in rendering InfoButton
 */
export type InfoButtonState = ComponentState<InfoButtonSlots> & Required<Pick<InfoButtonProps, 'inline' | 'size'>>;

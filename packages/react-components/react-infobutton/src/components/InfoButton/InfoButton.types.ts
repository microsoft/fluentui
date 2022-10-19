import type { PopoverProps, PopoverSurface } from '@fluentui/react-popover';
import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';

export type InfoButtonSlots = {
  root: NonNullable<Slot<PopoverProps>>;

  /**
   * The button that triggers the Popover.
   */
  button: NonNullable<Slot<'button'>>;

  /**
   * The content to be displayed in the Popover.
   */
  content: NonNullable<Slot<typeof PopoverSurface>>;
};

/**
 * InfoButton Props
 */
export type InfoButtonProps = Omit<ComponentProps<Partial<InfoButtonSlots>>, 'children'>;

/**
 * State used in rendering InfoButton
 */
export type InfoButtonState = ComponentState<InfoButtonSlots> & {
  popoverOpen: boolean;
};

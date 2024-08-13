import { Button } from '@fluentui/react-button';
import { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';
import { PopoverContextValue } from '@fluentui/react-popover';

export type TeachingPopoverFooterSlots = {
  /**
   * The element wrapping the buttons.
   */
  root: NonNullable<Slot<'div'>>;

  /**
   * The primary button slot.
   */
  primary: NonNullable<Slot<typeof Button>>;

  /**
   * The secondary button slot.
   */
  secondary?: Slot<typeof Button>;
};

export type TeachingPopoverFooterState = ComponentState<TeachingPopoverFooterSlots> &
  Pick<PopoverContextValue, 'appearance'> & {
    /**
     * Enables stylization to a horizontal or vertical stack of button layouts.
     * Defaults to horizontal
     */
    footerLayout?: 'horizontal' | 'vertical';
  };

export type TeachingPopoverFooterProps = ComponentProps<TeachingPopoverFooterSlots> &
  Pick<TeachingPopoverFooterState, 'footerLayout'>;

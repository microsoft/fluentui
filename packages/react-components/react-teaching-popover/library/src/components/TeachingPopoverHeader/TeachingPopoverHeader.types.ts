import { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';
import { PopoverContextValue } from '@fluentui/react-popover';

export type TeachingPopoverHeaderSlots = {
  /**
   * The element wrapping the text and close button. By default this is an h3, but can be a div.
   * Be sure to include role and aria heading level if div is used.
   */
  root: Slot<'h3', 'h1' | 'h2' | 'h4' | 'h5' | 'h6' | 'div'>;
  /**
   * The component to be used as close button in heading
   */
  dismissButton?: Slot<'button'>;
  /**
   * Initial icon slot rendered before children content in heading.
   */
  icon?: Slot<'div'>;
};

export type TeachingPopoverHeaderState = ComponentState<TeachingPopoverHeaderSlots> &
  Pick<PopoverContextValue, 'appearance'>;

export type TeachingPopoverHeaderProps = ComponentProps<TeachingPopoverHeaderSlots>;

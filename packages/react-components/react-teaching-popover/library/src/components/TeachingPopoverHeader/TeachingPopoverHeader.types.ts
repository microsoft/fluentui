import { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';
import { PopoverContextValue } from '@fluentui/react-popover';

export type TeachingPopoverHeaderSlots = {
  /**
   * The element wrapping the text and close button. By default this is an div; although it can be a heading, this should not be done.
   * Instead, wrap the child text in a heading tag if one is needed.
   * Be sure to include role and aria heading level if div is used.
   */
  root: Slot<'div', 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'>;
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

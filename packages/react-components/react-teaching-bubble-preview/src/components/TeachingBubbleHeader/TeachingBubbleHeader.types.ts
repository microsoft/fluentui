// import { ARIAButtonSlotProps } from '@fluentui/react-aria';
import { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';

export type TeachingBubbleHeaderSlots = {
  /**
   * The element wrapping the text and close button. By default this is a div, but can be a heading.
   */
  root: NonNullable<Slot<'div', 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'>>;
  /**
   * The component to be used as close button in heading
   */
  dismissButton: Slot<'button'>;
  /**
   * Initial icon slot rendered before children content in heading.
   */
  icon: Slot<'div'>;
};

export type TeachingBubbleHeaderState = ComponentState<TeachingBubbleHeaderSlots>;

export type TeachingBubbleHeaderProps = ComponentProps<Partial<TeachingBubbleHeaderSlots>>;

// import { ARIAButtonSlotProps } from '@fluentui/react-aria';
import { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';

export type TeachingBubbleBodyMediaLength = 'short' | 'medium' | 'tall';

export type TeachingBubbleBodySlots = {
  /**
   * The element wrapping the buttons.
   */
  root: NonNullable<Slot<'div'>>;
  /**
   * Optional Media Content.
   */
  media?: Slot<'img'>;
};

export type TeachingBubbleBodyProps = ComponentProps<Partial<TeachingBubbleBodySlots>> & {
  mediaLength?: TeachingBubbleBodyMediaLength;
};

export type TeachingBubbleBodyState = ComponentState<TeachingBubbleBodySlots> &
  Partial<Pick<TeachingBubbleBodyProps, 'mediaLength'>>;

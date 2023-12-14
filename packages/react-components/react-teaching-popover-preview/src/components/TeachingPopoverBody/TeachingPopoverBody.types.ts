import { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';

export type TeachingPopoverBodyMediaLength = 'short' | 'medium' | 'tall';

export type TeachingPopoverBodySlots = {
  /**
   * The element wrapping the buttons.
   */
  root: NonNullable<Slot<'div'>>;
  /**
   * Optional Media Content.
   */
  media?: Slot<'span'>;
};

export type TeachingPopoverBodyProps = ComponentProps<Partial<TeachingPopoverBodySlots>> & {
  mediaLength?: TeachingPopoverBodyMediaLength;
};

export type TeachingPopoverBodyState = ComponentState<TeachingPopoverBodySlots> &
  Partial<Pick<TeachingPopoverBodyProps, 'mediaLength'>>;

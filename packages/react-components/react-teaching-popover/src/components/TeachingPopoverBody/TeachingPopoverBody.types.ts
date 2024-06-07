import { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';

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

export type TeachingPopoverBodyProps = ComponentProps<TeachingPopoverBodySlots> & {
  mediaLength?: 'short' | 'medium' | 'tall';
};

export type TeachingPopoverBodyState = ComponentState<TeachingPopoverBodySlots> &
  Required<Pick<TeachingPopoverBodyProps, 'mediaLength'>>;

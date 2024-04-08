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

  /* Passed into CarouselItem to identify pages.
   Will generate an id with useId() if not provided */
  value?: string;
};

export type TeachingPopoverBodyState = ComponentState<TeachingPopoverBodySlots> &
  Required<Pick<TeachingPopoverBodyProps, 'value' | 'mediaLength'>>;

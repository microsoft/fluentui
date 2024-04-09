import { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';

export type TeachingPopoverCarouselCardSlots = {
  /**
   * The element wrapping the buttons.
   */
  root: NonNullable<Slot<'div'>>;
};

export type TeachingPopoverCarouselCardProps = ComponentProps<TeachingPopoverCarouselCardSlots> & {
  /* Required: Passed into CarouselItem to identify pages. */
  value: string;
};

export type TeachingPopoverCarouselCardState = ComponentState<TeachingPopoverCarouselCardSlots> &
  Required<Pick<TeachingPopoverCarouselCardProps, 'value'>>;

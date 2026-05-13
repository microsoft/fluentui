import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';

export type TeachingPopoverCarouselFooterSlots = {
  /**
   * The element wrapping carousel navigation children (previous/next buttons,
   * page count, etc.). Consumers compose children directly — no default slots.
   */
  root: NonNullable<Slot<'div'>>;
};

export type TeachingPopoverCarouselFooterProps = ComponentProps<TeachingPopoverCarouselFooterSlots>;

export type TeachingPopoverCarouselFooterState = ComponentState<TeachingPopoverCarouselFooterSlots>;

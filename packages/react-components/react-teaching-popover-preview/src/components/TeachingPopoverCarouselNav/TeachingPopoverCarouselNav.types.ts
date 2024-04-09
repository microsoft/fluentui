import { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';

export type TeachingPopoverCarouselNavSlots = {
  /**
   * The element wrapping the carousel pagination. By default this is a div,
   * it may contain icons or text depending on TeachingPopoverCarouselNavStyle
   */
  root: NonNullable<Slot<'div'>>;
};

export type TeachingPopoverCarouselNavState = ComponentState<TeachingPopoverCarouselNavSlots> & {};

export type TeachingPopoverCarouselNavProps = ComponentProps<Partial<TeachingPopoverCarouselNavSlots>>;

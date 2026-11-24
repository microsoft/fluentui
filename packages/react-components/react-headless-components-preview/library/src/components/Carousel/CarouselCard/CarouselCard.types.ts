import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';

export type CarouselCardSlots = {
  /** A focusable `role="group"` card labeled with its position. Accepts arbitrary content. */
  root: Slot<'div'>;
};

export type CarouselCardProps = ComponentProps<CarouselCardSlots>;

export type CarouselCardState = ComponentState<CarouselCardSlots>;

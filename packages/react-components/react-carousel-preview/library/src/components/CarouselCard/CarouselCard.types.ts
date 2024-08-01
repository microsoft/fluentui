import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';

export type CarouselCardSlots = {
  root: Slot<'div'>;
};

/**
 * CarouselCard Props
 */
export type CarouselCardProps = ComponentProps<CarouselCardSlots>;

/**
 * State used in rendering CarouselCard
 */
export type CarouselCardState = ComponentState<CarouselCardSlots>;

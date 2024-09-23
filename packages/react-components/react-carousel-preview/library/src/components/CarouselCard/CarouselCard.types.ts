import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';

export type CarouselCardSlots = {
  root: Slot<'div'>;
};

/**
 * CarouselCard Props
 */
export type CarouselCardProps = ComponentProps<CarouselCardSlots> & {
  /**
   * Sets the card styling to be responsive based on content.
   */
  autoSize?: boolean;
};

/**
 * State used in rendering CarouselCard
 */
export type CarouselCardState = ComponentState<CarouselCardSlots> & Pick<CarouselCardProps, 'autoSize'>;

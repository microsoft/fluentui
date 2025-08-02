import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';

export type CarouselCardButtonSlots = {
  root: Slot<'a'>;
};

/**
 * CarouselCardButton Props
 */
export type CarouselCardButtonProps = ComponentProps<CarouselCardButtonSlots> & {
  /**
   * Sets the card styling to be responsive based on content.
   */
  autoSize?: boolean;
};

/**
 * State used in rendering CarouselCardButton
 */
export type CarouselCardButtonState = ComponentState<CarouselCardButtonSlots> &
  Pick<CarouselCardButtonProps, 'autoSize'>;

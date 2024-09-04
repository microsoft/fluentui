import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';
import { CarouselAutoplayButton } from '../CarouselAutoplayButton/CarouselAutoplayButton';
import { CarouselButtonProps } from '../CarouselButton/CarouselButton.types';

export type CarouselNavContainerSlots = {
  root: Slot<'div'>;
  next?: Slot<CarouselButtonProps>;
  prev?: Slot<CarouselButtonProps>;
  autoplay?: Slot<typeof CarouselAutoplayButton>;
};

/**
 * CarouselNavContainer Props
 */
export type CarouselNavContainerProps = ComponentProps<CarouselNavContainerSlots> & {
  /**
   * Default: 'inline'
   * Defines the nav container layout:
   *
   * 'inline' - Default controls inline with carousel view
   *
   *  inline-wide - Similar to inline but places nav buttons on far left/right
   *
   * 'overlay' - Controls overlaid on bottom of carousel viewport,
   *
   * 'overlay-wide' - Controls overlaid on bottom of carousel viewport with prev+autoplay/next buttons on far side
   *
   * 'overlay-expanded' - Controls overlaid on bottom of carousel viewport, with prev/next buttons on sides vertically centered
   */
  layout?: 'inline' | 'inline-wide' | 'overlay' | 'overlay-wide' | 'overlay-expanded';
};

/**
 * State used in rendering CarouselNavContainer
 */
export type CarouselNavContainerState = ComponentState<CarouselNavContainerSlots> &
  Pick<CarouselNavContainerProps, 'layout'>;

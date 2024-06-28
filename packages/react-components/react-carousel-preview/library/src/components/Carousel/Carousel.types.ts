import type { ComponentProps, ComponentState, EventHandler, Slot } from '@fluentui/react-utilities';
import type { CarouselContextValue, CarouselValueChangeData } from '../CarouselContext.types';

export type CarouselSlots = {
  root: Slot<'div'>;
};

/**
 * Carousel Props
 */
export type CarouselProps = ComponentProps<CarouselSlots> & {
  /**
   * The initial page to display in uncontrolled mode.
   */
  defaultValue?: string;

  /**
   * The value of the currently active page.
   */
  value?: string;

  /**
   * Callback to notify a page change.
   */
  onValueChange?: EventHandler<CarouselValueChangeData>;

  /**
   * Circular enables the carousel to loop back around on navigation past trailing index
   */
  circular?: boolean;

  /**
   * Peeking enables the next/prev carousel pages to 'peek' into the current view
   */
  peeking?: boolean;

  /**
   * Sets the card width, can be any default css value
   */
  cardWidth?: number | string;
};

/**
 * State used in rendering Carousel
 */
export type CarouselState = ComponentState<CarouselSlots> & CarouselContextValue;

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
};

/**
 * State used in rendering Carousel
 */
export type CarouselState = ComponentState<CarouselSlots> & CarouselContextValue;

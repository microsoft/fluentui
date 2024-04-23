import type { ComponentProps, ComponentState, EventHandler, Slot } from '@fluentui/react-utilities';
import { type PopoverContextValue } from '@fluentui/react-popover';

import { type CarouselContextValue } from './Carousel/CarouselContext';
import type { CarouselValueChangeData } from './Carousel/Carousel.types';

export type TeachingPopoverCarouselSlots = {
  /**
   * The element wrapping carousel pages and navigation.
   */
  root: NonNullable<Slot<'div'>>;
};

/**
 * TeachingPopoverCarousel Props
 */
export type TeachingPopoverCarouselProps = ComponentProps<TeachingPopoverCarouselSlots> & {
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
   * Callback to notify when the final button step of a carousel has been activated.
   */
  onFinish?: EventHandler<CarouselValueChangeData>;
};

/**
 * TeachingPopoverCarousel State and Context Hooks
 */
export type TeachingPopoverCarouselState = ComponentState<Required<TeachingPopoverCarouselSlots>> &
  Partial<Pick<PopoverContextValue, 'appearance'>> &
  CarouselContextValue;

/**
 * Context shared between TeachingPopoverCarousel and its children components
 */
export type TeachingPopoverCarouselContextValues = {
  carousel: CarouselContextValue;
};

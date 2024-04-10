import { ComponentProps, ComponentState, EventHandler, Slot } from '@fluentui/react-utilities';
import { PopoverContextValue } from '@fluentui/react-popover';

import { type TeachingPopoverCarouselFooterProps } from '../TeachingPopoverCarouselFooter/index';
import { type CarouselContextValue } from './Carousel/CarouselContext';
import { type CarouselWalker } from './Carousel/useCarouselWalker';
import type { CarouselPageChangeData } from './Carousel/Carousel.types';
import type { CarouselWalkerContextValue } from './Carousel/CarouselWalkerContext';

export type TeachingPopoverCarouselSlots = {
  /**
   * The element wrapping carousel pages and navigation.
   */
  root: NonNullable<Slot<'div'>>;

  /**
   * The element wrapping the navigation of the carousel.
   */
  footer: NonNullable<Slot<TeachingPopoverCarouselFooterProps>>;
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
  onPageChange?: EventHandler<CarouselPageChangeData>;

  /**
   * Callback to notify when the final button step of a carousel has been activated.
   */
  onFinish?: EventHandler<CarouselPageChangeData>;
};

/**
 * TeachingPopoverCarousel State and Context Hooks
 */
export type TeachingPopoverCarouselState = ComponentState<Required<TeachingPopoverCarouselSlots>> &
  Partial<Pick<PopoverContextValue, 'appearance'>> &
  CarouselContextValue & { carouselWalker: CarouselWalker };

/**
 * Context shared between TeachingPopoverCarousel and its children components
 */
export type TeachingPopoverCarouselContextValues = {
  carousel: CarouselContextValue;
  carouselWalker: CarouselWalkerContextValue;
};

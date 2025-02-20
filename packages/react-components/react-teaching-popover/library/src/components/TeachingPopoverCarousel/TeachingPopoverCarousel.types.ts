import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';
import { type PopoverContextValue } from '@fluentui/react-popover';

import { type CarouselContextValue } from './Carousel/CarouselContext';
import type { UseCarouselOptions } from './Carousel/Carousel.types';

export type TeachingPopoverCarouselSlots = {
  /**
   * The element wrapping carousel pages and navigation.
   */
  root: NonNullable<Slot<'div'>>;
};

/**
 * TeachingPopoverCarousel Props
 */
export type TeachingPopoverCarouselProps = ComponentProps<TeachingPopoverCarouselSlots> & UseCarouselOptions;

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

import { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';
import { PopoverContextValue } from '@fluentui/react-popover';

import { TeachingPopoverCarouselFooterProps } from '../TeachingPopoverCarouselFooter/index';
import { type CarouselContextValue } from './Carousel/useCarouselCollection';
import { type CarouselWalker } from './Carousel/useCarouselWalker';

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
  defaultValue?: string;
  value?: string;
};

/**
 * TeachingPopoverCarousel State and Context Hooks
 */
export type TeachingPopoverCarouselState = ComponentState<Required<TeachingPopoverCarouselSlots>> &
  Partial<Pick<PopoverContextValue, 'appearance'>> &
  CarouselContextValue & { carouselWalker: CarouselWalker };

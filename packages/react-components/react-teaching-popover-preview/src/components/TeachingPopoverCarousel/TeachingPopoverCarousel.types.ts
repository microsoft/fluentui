import * as React from 'react';
import { ComponentProps, ComponentState, EventHandler, Slot } from '@fluentui/react-utilities';
import { Button } from '@fluentui/react-button';
import { PopoverContextValue } from '@fluentui/react-popover';
import { TeachingPopoverCarouselNavProps } from '../TeachingPopoverCarouselNav/index';
import { CarouselPageChangeData } from './Carousel/Carousel.types';
import { CarouselContextValue } from './Carousel/useCarouselCollection';
import { CarouselWalkerContextValue } from './Carousel/useCarouselWalker';

export type TeachingPopoverCarouselSlots = {
  /**
   * The element wrapping carousel pages and navigation.
   */
  root: NonNullable<Slot<'div'>>;

  /**
   * The element wrapping the navigation of the carousel.
   */
  footer: NonNullable<Slot<'div'>>;

  /**
   * The previous button slot.
   */
  previous: Slot<typeof Button>;

  /**
   * The next button slot.
   */
  next: NonNullable<Slot<typeof Button>>;

  /**
   * The page nav slot when using icon navigation.
   */
  nav: Slot<TeachingPopoverCarouselNavProps>;

  /**
   * The page count text slot for paginationType text
   */
  pageCount: Slot<'div'>;
};

export type TeachingPopoverCarouselLayout = 'offset' | 'centered';

// For localization or customization, users may want to modify this for their own purposes
export type TeachingPopoverPageCountChildRenderFunction = (currentPage: number, totalPages: number) => React.ReactNode;

/**
 * TeachingPopoverCarousel Props
 */
export type TeachingPopoverCarouselProps = ComponentProps<Partial<TeachingPopoverCarouselSlots>> & {
  /**
   * Controls whether buttons will be centered (balanced) or right aligned
   * Defaults to 'centered'.
   */
  layout?: TeachingPopoverCarouselLayout;

  /**
   * Dictates whether pagination uses text or icons
   * Defaults to icons
   */
  paginationType?: 'text' | 'icon';

  /**
   * The text to be displayed on the initial step of carousel
   */
  initialStepText: string;

  /**
   * The text to be displayed on the final step of carousel
   */
  finalStepText: string;

  /**
   * Localize the page count text via function to fully override
   */
  renderPageCountText?: TeachingPopoverPageCountChildRenderFunction;

  /**
   * Page at which carousel should be initialized to
   */
  defaultCurrentPage?: number;

  /**
   * Callback to notify a page change
   */
  onPageChange?: EventHandler<CarouselPageChangeData>;

  /**
   * Callback to notify when the final button step of a carousel has been activated.
   */
  onFinish?: EventHandler<CarouselPageChangeData>;

  /**
   * Controllable page state
   */
  currentPage?: number;
};

/**
 * TeachingPopoverCarousel State and Context Hooks
 */
export type TeachingPopoverCarouselState = ComponentState<TeachingPopoverCarouselSlots> & {
  totalPages: number;
  setCurrentPage: (page: number) => void;
} & Partial<Pick<PopoverContextValue, 'appearance'>> &
  Pick<TeachingPopoverCarouselProps, 'layout' | 'onPageChange'> &
  CarouselContextValue &
  CarouselWalkerContextValue;

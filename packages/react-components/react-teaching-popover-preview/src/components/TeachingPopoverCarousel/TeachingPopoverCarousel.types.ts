import * as React from 'react';
import { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';
import { PopoverContextValue } from '@fluentui/react-popover';
import { CarouselContextValue } from './Carousel/useCarouselCollection';
import { CarouselWalkerContextValue } from './Carousel/useCarouselWalker';
import { TeachingPopoverCarouselFooterProps } from '../TeachingPopoverCarouselFooter/index';

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

export type TeachingPopoverCarouselLayout = 'offset' | 'centered';

// For localization or customization, users may want to modify this for their own purposes
export type TeachingPopoverPageCountChildRenderFunction = (currentPage: number, totalPages: number) => React.ReactNode;

/**
 * TeachingPopoverCarousel Props
 */
export type TeachingPopoverCarouselProps = ComponentProps<TeachingPopoverCarouselSlots> & {};

/**
 * TeachingPopoverCarousel State and Context Hooks
 */
export type TeachingPopoverCarouselState = ComponentState<Required<TeachingPopoverCarouselSlots>> &
  Partial<Pick<PopoverContextValue, 'appearance'>> &
  CarouselContextValue &
  CarouselWalkerContextValue;

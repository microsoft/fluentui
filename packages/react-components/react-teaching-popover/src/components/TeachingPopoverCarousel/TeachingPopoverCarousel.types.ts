import * as React from 'react';
import { ComponentProps, ComponentState, EventData, EventHandler, Slot } from '@fluentui/react-utilities';
import { Button } from '@fluentui/react-button';
import { PopoverContextValue } from '@fluentui/react-popover';
import { TeachingPopoverCarouselNavProps } from '../TeachingPopoverCarouselNav/index';

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
export type TeachingPopoverPageCountRenderType = TeachingPopoverPageCountChildRenderFunction | string;
export type TeachingPopoverStrings = {
  previous: string;
  initialStepText: string;
  next: string;
  finalStepText: string;
  /**
   * Localize the separator between numbers, or use a function to fully override
   */
  pageCountText?: TeachingPopoverPageCountRenderType;
};

export type TeachingPopoverPageChangeData = EventData<'click', React.MouseEvent<HTMLButtonElement>> & {
  /**
   * The page to be set after event has occurred.
   */
  currentPage: number;
};

/**
 * TeachingPopoverCarousel Props
 */
export type TeachingPopoverCarouselProps = Partial<ComponentProps<TeachingPopoverCarouselSlots>> & {
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
   * Strings used to localize carousel functionality
   */
  strings: TeachingPopoverStrings;

  /**
   * Page at which carousel should be initialized to
   */
  defaultCurrentPage?: number;

  /**
   * Callback to notify a page change (can be used to update 'currentPage' externally).
   */
  onPageChange?: EventHandler<TeachingPopoverPageChangeData>;

  /**
   * Callback to notify when the final button step of a carousel has been activated.
   */
  onFinish?: EventHandler<TeachingPopoverPageChangeData>;

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
  Required<Pick<TeachingPopoverCarouselProps, 'currentPage'>>;

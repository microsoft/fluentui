import * as React from 'react';
import { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';
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

export type TeachingPopoverPageChangeData = {
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
  carouselLayout?: TeachingPopoverCarouselLayout;

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
  defaultCurrentPage: number;

  /**
   * Callback to notify a page change (can be used to update 'currentPage' externally).
   */
  onPageChange?: (
    event: React.MouseEvent<HTMLButtonElement & HTMLAnchorElement & HTMLDivElement>,
    data: TeachingPopoverPageChangeData,
  ) => void;

  /**
   * Callback to notify next page was clicked
   */
  onClickNext?: (
    event: React.MouseEvent<HTMLButtonElement & HTMLAnchorElement & HTMLDivElement>,
    data: TeachingPopoverPageChangeData,
  ) => void;

  /**
   * Callback to notify next page was clicked
   */
  onClickPrevious?: (
    event: React.MouseEvent<HTMLButtonElement & HTMLAnchorElement & HTMLDivElement>,
    data: TeachingPopoverPageChangeData,
  ) => void;
  /**
   * Callback to notify when the final button step of a carousel has been activated.
   */
  onFinish?: (event: React.MouseEvent<HTMLButtonElement & HTMLAnchorElement & HTMLDivElement>) => void;

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
  Pick<TeachingPopoverCarouselProps, 'carouselLayout' | 'onPageChange'> &
  Required<Pick<TeachingPopoverCarouselProps, 'currentPage'>>;

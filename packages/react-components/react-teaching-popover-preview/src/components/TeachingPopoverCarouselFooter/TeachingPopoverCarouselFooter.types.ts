import * as React from 'react';
import { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';
import { Button } from '@fluentui/react-button';
import { PopoverContextValue } from '@fluentui/react-popover';
import { TeachingPopoverCarouselNavProps } from '../TeachingPopoverCarouselNav/index';

export type TeachingPopoverCarouselFooterSlots = {
  /**
   * The element wrapping carousel pages and navigation.
   */
  root: NonNullable<Slot<'div'>>;

  /**
   * The previous button slot.
   */
  previous?: Slot<typeof Button>;

  /**
   * The next button slot.
   */
  next: NonNullable<Slot<typeof Button>>;

  /**
   * The page nav slot when using icon navigation.
   */
  nav?: Slot<TeachingPopoverCarouselNavProps>;

  /**
   * The page count text slot for paginationType text
   */
  pageCount?: Slot<'div'>;
};

export type TeachingPopoverCarouselFooterLayout = 'offset' | 'centered';

// For localization or customization, users may want to modify this for their own purposes
export type TeachingPopoverPageCountChildRenderFunction = (currentPage: number, totalPages: number) => React.ReactNode;

/**
 * TeachingPopoverCarouselFooter Props
 */
export type TeachingPopoverCarouselFooterProps = ComponentProps<TeachingPopoverCarouselFooterSlots> & {
  /**
   * Controls whether buttons will be centered (balanced) or right aligned
   * Defaults to 'centered'.
   */
  layout?: TeachingPopoverCarouselFooterLayout;

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
};

/**
 * TeachingPopoverCarouselFooter State and Context Hooks
 */
export type TeachingPopoverCarouselFooterState = ComponentState<Required<TeachingPopoverCarouselFooterSlots>> &
  Partial<Pick<PopoverContextValue, 'appearance'>> &
  Pick<TeachingPopoverCarouselFooterProps, 'layout'>;

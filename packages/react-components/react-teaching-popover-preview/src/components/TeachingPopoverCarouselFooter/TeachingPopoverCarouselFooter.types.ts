import * as React from 'react';
import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';
import type { TeachingPopoverCarouselFooterButtonProps } from '../TeachingPopoverCarouselFooterButton/TeachingPopoverCarouselFooterButton.types';

export type TeachingPopoverCarouselFooterSlots = {
  /**
   * The element wrapping carousel pages and navigation.
   */
  root: NonNullable<Slot<'div'>>;

  /**
   * The previous button slot.
   */
  previous?: Slot<TeachingPopoverCarouselFooterButtonProps>;

  /**
   * The next button slot.
   */
  next: NonNullable<Slot<TeachingPopoverCarouselFooterButtonProps>>;
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
   * The text to be displayed on the initial step of carousel
   */
  initialStepText: string;

  /**
   * The text to be displayed on the final step of carousel
   */
  finalStepText: string;
};

/**
 * TeachingPopoverCarouselFooter State and Context Hooks
 */
export type TeachingPopoverCarouselFooterState = ComponentState<Required<TeachingPopoverCarouselFooterSlots>> &
  Pick<TeachingPopoverCarouselFooterProps, 'layout'>;

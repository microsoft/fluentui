import type * as React from 'react';
import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';
import type { TeachingPopoverCarouselFooterButton } from '../TeachingPopoverCarouselFooterButton/TeachingPopoverCarouselFooterButton';

export type TeachingPopoverCarouselFooterSlots = {
  /**
   * The element wrapping carousel pages and navigation.
   */
  root: NonNullable<Slot<'div'>>;

  /**
   * The previous button slot.
   * Null or undefined alternate text hides it at its boundary. Focus moves to the other footer button
   * if the hidden button was focused and the other button is focusable.
   */
  previous?: Slot<typeof TeachingPopoverCarouselFooterButton>;

  /**
   * The next button slot.
   * Uses the same boundary hiding and focus behavior as the previous button.
   */
  next: NonNullable<Slot<typeof TeachingPopoverCarouselFooterButton>>;
};

export type TeachingPopoverCarouselFooterLayout = 'offset' | 'centered';

// For localization or customization, users may want to modify this for their own purposes
export type TeachingPopoverPageCountChildRenderFunction = (currentPage: number, totalPages: number) => React.ReactNode;

/**
 * Shared footer hook props, including the caller's styled or headless button.
 */
export type TeachingPopoverCarouselFooterBaseProps = ComponentProps<TeachingPopoverCarouselFooterSlots> & {
  /** Button implementation used for both navigation slots. */
  footerButton: typeof TeachingPopoverCarouselFooterButton;
};

export type TeachingPopoverCarouselFooterBaseState = ComponentState<Required<TeachingPopoverCarouselFooterSlots>>;

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

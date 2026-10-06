import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';
import type { TeachingPopoverCarouselFooterButton } from '../TeachingPopoverCarouselFooterButton/TeachingPopoverCarouselFooterButton';

export type TeachingPopoverCarouselFooterSlots = {
  /**
   * The element wrapping carousel pages and navigation.
   */
  root: NonNullable<Slot<'div'>>;

  /**
   * Previous-page button. Defaults to `TeachingPopoverCarouselFooterButton`
   * with `navType: 'prev'`; consumers provide `altText` and content.
   * Null or undefined alternate text hides it at its boundary and moves focus
   * to the other footer button when that button is focusable.
   */
  previous?: Slot<typeof TeachingPopoverCarouselFooterButton>;

  /**
   * Next/finish-page button. Defaults to `TeachingPopoverCarouselFooterButton`
   * with `navType: 'next'`; consumers provide `altText` and content.
   * Uses the same boundary hiding and focus behavior as the previous button.
   */
  next: NonNullable<Slot<typeof TeachingPopoverCarouselFooterButton>>;
};

export type TeachingPopoverCarouselFooterProps = ComponentProps<TeachingPopoverCarouselFooterSlots>;

export type TeachingPopoverCarouselFooterState = ComponentState<TeachingPopoverCarouselFooterSlots>;

import { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';
import { TeachingPopoverState } from '../TeachingPopover/TeachingPopover.types';

export type TeachingPopoverCarouselSlots = {
  /**
   * The element wrapping the text and close button. By default this is a div, but can be a heading.
   */
  root: NonNullable<Slot<'div'>>;
};

/**
 * TeachingPopoverCarousel Props
 */
export type TeachingPopoverCarouselProps = ComponentProps<Partial<TeachingPopoverCarouselSlots>>;

/**
 * TeachingPopoverCarousel State and Context Hooks
 */
export type TeachingPopoverCarouselState = ComponentState<TeachingPopoverCarouselSlots> &
  Required<Pick<TeachingPopoverState, 'currentPage' | 'setCurrentPage' | 'totalPages' | 'setTotalPages'>>;

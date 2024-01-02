import { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';
import { TeachingPopoverContextValue } from '../../TeachingPopoverContext';

export type TeachingPopoverCarouselSlots = {
  /**
   * The element wrapping the text and close button. By default this is a div, but can be a heading.
   */
  root: NonNullable<Slot<'div'>>;
};

/**
 * TeachingPopoverCarousel Props
 */
export type TeachingPopoverCarouselProps = ComponentProps<TeachingPopoverCarouselSlots>;

/**
 * TeachingPopoverCarousel State and Context Hooks
 */
export type TeachingPopoverCarouselState = ComponentState<TeachingPopoverCarouselSlots> &
  Required<Pick<TeachingPopoverContextValue, 'currentPage' | 'setCurrentPage' | 'totalPages' | 'setTotalPages'>>;

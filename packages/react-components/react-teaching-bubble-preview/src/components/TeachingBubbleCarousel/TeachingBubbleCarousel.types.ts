import { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';
import { TeachingBubbleState } from '../TeachingBubble/TeachingBubble.types';

export type TeachingBubbleCarouselSlots = {
  /**
   * The element wrapping the text and close button. By default this is a div, but can be a heading.
   */
  root: NonNullable<Slot<'div'>>;
};

/**
 * TeachingBubbleCarousel Props
 */
export type TeachingBubbleCarouselProps = ComponentProps<Partial<TeachingBubbleCarouselSlots>>;

/**
 * TeachingBubbleCarousel State and Context Hooks
 */
export type TeachingBubbleCarouselState = ComponentState<TeachingBubbleCarouselSlots> &
  Required<Pick<TeachingBubbleState, 'currentPage' | 'setCurrentPage' | 'totalPages' | 'setTotalPages'>>;

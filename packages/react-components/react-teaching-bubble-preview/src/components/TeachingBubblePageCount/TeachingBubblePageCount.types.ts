// import { ARIAButtonSlotProps } from '@fluentui/react-aria';
import { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';

export type TeachingBubblePageCountSlots = {
  /**
   * The element wrapping the carousel pagination. By default this is a div,
   * it may contain icons or text depending on TeachingBubblePageCountStyle
   */
  root: NonNullable<Slot<'div'>>;

  /**
   * The element for each carousel page in 'icon' mode.
   */
  carouselIcon: NonNullable<Slot<'button'>>;

  /**
   * The element for each carousel page in 'icon' mode.
   */
  carouselSelectedIcon: NonNullable<Slot<'button'>>;
};

export type TeachingBubblePageCountStyle = 'text' | 'icon';

export type TeachingBubblePageCountState = ComponentState<TeachingBubblePageCountSlots> & {
  /**
   * The current carousel page.
   */
  currentPage: number;
  /**
   * The total number of carousel pages, controlled by children within carousel itself.
   */
  totalPages: number;
  /**
   * Allows the carousel pagination to update the current page based on icon interaction.
   */
  setCurrentPage: (index: number) => void;
  /**
   * The style in which the page count is rendered.
   */
  countStyle: TeachingBubblePageCountStyle;
};

export type TeachingBubblePageCountProps = ComponentProps<Partial<TeachingBubblePageCountSlots>> &
  Partial<Pick<TeachingBubblePageCountState, 'countStyle'>>;

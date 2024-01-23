import { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';
import { TeachingPopoverContextValue } from '../../TeachingPopoverContext';
import { TeachingPopoverPageCount, TeachingPopoverPageCountStyle } from '../TeachingPopoverPageCount';
import { Button } from '@fluentui/react-button';

export type TeachingPopoverCarouselSlots = {
  /**
   * The element wrapping the text and close button. By default this is a div, but can be a heading.
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
   * The page count slot.
   */
  pageCount: NonNullable<Slot<typeof TeachingPopoverPageCount>>;
};

export type TeachingPopoverCarouselLayout = 'right' | 'centered';

export type TeachingPopoverStrings = {
  previous: string;
  initialStepText: string;
  next: string;
  finalStepText: string;
  separatorText?: string;
};

/**
 * TeachingPopoverCarousel Props
 */
export type TeachingPopoverCarouselProps = ComponentProps<TeachingPopoverCarouselSlots> & {
  /**
   * Controls whether buttons will be centered (balanced) or right aligned
   * Defaults to 'centered'.
   */
  carouselLayout?: TeachingPopoverCarouselLayout;

  /**
   * Dictates whether pagination uses text or icons
   * Defaults to icons
   */
  carouselType?: TeachingPopoverPageCountStyle;

  /**
   * Strings used to localize carousel functionality
   */
  strings: TeachingPopoverStrings;
};

/**
 * TeachingPopoverCarousel State and Context Hooks
 */
export type TeachingPopoverCarouselState = ComponentState<TeachingPopoverCarouselSlots> &
  Required<Pick<TeachingPopoverContextValue, 'currentPage' | 'setCurrentPage' | 'totalPages' | 'setTotalPages'>> &
  Partial<Pick<TeachingPopoverContextValue, 'appearance'>> &
  Partial<Pick<TeachingPopoverCarouselProps, 'carouselLayout'>>;

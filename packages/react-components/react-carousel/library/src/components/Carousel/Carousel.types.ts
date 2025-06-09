import type { ComponentProps, ComponentState, EventHandler, Slot } from '@fluentui/react-utilities';
import type { CarouselContextValue, CarouselIndexChangeData } from '../CarouselContext.types';

export type CarouselSlots = {
  root: Slot<'div'>;
};

/**
 * Children function replacement, passes through updated context index and carousel information for localization
 */
export type CarouselAnnouncerFunction = (index: number, totalSlides: number, slideGroupList: number[][]) => string;

/**
 * List of integrated motion types
 */
export type CarouselMotion = 'slide' | { kind: 'slide'; duration?: number } | 'fade';

/**
 * Carousel Props
 */
export type CarouselProps = ComponentProps<CarouselSlots> & {
  /**
   * The initial page to display in uncontrolled mode.
   */
  defaultActiveIndex?: number;

  /**
   * The alignment of the carousel.
   */
  align?: 'center' | 'start' | 'end';

  /**
   * The value of the currently active page.
   */
  activeIndex?: number;

  /**
   * Callback to notify a page change.
   */
  onActiveIndexChange?: EventHandler<CarouselIndexChangeData>;

  /**
   * Circular enables the carousel to loop back around on navigation past trailing index.
   */
  circular?: boolean;

  /**
   * Controls the number of carousel cards per navigation element, will default to 'auto'
   * Recommended to set to '1' when using full page carousel cards.
   */
  groupSize?: number | 'auto';

  /**
   * Enables drag to scroll on carousel items.
   * Defaults to: False
   */
  draggable?: boolean;

  /**
   * Adds whitespace to start/end so that 'align' prop is always respected for current index
   * Defaults to: False
   */
  whitespace?: boolean;

  /**
   * Sets motion type as either 'slide' or 'fade'
   * Defaults: 'slide'
   *
   * Users can also pass 'slide' & duration via CarouselMotion object to control carousel speed.
   * Drag interactions are not affected because duration is then determined by the drag force.
   *
   * Note: Duration is not in milliseconds because Carousel uses an
   * attraction physics simulation when scrolling instead of easings.
   * Only values between 20-60 are recommended, 25 is the default.
   */
  motion?: CarouselMotion;

  /**
   * Localizes the string used to announce carousel page changes
   * Defaults to: undefined
   */
  announcement?: CarouselAnnouncerFunction;

  /**
   * Choose a delay between autoplay transitions in milliseconds.
   * Only active if Autoplay is enabled via CarouselAutoplayButton
   *
   * Defaults: 4000
   */
  autoplayInterval?: number;
};

/**
 * State used in rendering Carousel
 */
export type CarouselState = ComponentState<CarouselSlots> & CarouselContextValue;

export interface CarouselVisibilityEventDetail {
  isVisible: boolean;
}

export type CarouselVisibilityChangeEvent = CustomEvent<CarouselVisibilityEventDetail>;

/**
 * @internal
 */
export interface CarouselUpdateData {
  /**
   * The current carousel index, a change in index will not trigger the callback (use context index instead).
   */
  activeIndex: number;
  /**
   * The total number of slides to be navigated, accounts for grouping.
   */
  navItemsCount: number;
  /**
   * A breakdown of the card indexes contained within each slide index.
   */
  groupIndexList: number[][];
  /**
   * An array of the card DOM elements after render
   */
  slideNodes: HTMLElement[];
  /**
   * Whether the carousel has enough cards present to enable looping without issues.
   */
  canLoop?: boolean;
}

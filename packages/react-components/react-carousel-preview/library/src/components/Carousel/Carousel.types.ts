import type { ComponentProps, ComponentState, EventHandler, Slot } from '@fluentui/react-utilities';
import type { CarouselContextValue, CarouselValueChangeData } from '../CarouselContext.types';

export type CarouselSlots = {
  root: Slot<'div'>;
};

/**
 * Carousel Props
 */
export type CarouselProps = ComponentProps<CarouselSlots> & {
  /**
   * The initial page to display in uncontrolled mode.
   */
  defaultIndex?: number;

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
  onValueChange?: EventHandler<CarouselValueChangeData>;
  /**
   * Circular enables the carousel to loop back around on navigation past trailing index.
   */
  circular?: boolean;
  /**
   * Controls the number of carousel cards per navigation element, will default to 'auto'
   * Recommended to set to '1' when using full page carousel cards.
   */
  groupSize?: number | 'auto';
};

/**
 * State used in rendering Carousel
 */
export type CarouselState = ComponentState<CarouselSlots> & CarouselContextValue;

export interface CarouselVisibilityEventDetail {
  isVisible: boolean;
}

export type CarouselVisibilityChangeEvent = CustomEvent<CarouselVisibilityEventDetail>;

export interface CarouselReinitData {
  nodes: HTMLElement[];
  groupIndexList: number[][];
  activeIndex: number;

  navItemsCount: number;
}

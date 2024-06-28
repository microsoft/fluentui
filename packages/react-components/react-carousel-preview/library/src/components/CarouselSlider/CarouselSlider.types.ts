import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';

export type CarouselSliderSlots = {
  /**
   * The div that will be animated to track and center current index
   */
  root: Slot<'div'>;
  /**
   * The viewport/window of the carousel
   */
  container: NonNullable<Slot<'div'>>;
};

/**
 * CarouselSlider Props
 */
export type CarouselSliderProps = Partial<ComponentProps<CarouselSliderSlots>> & {
  /**
   * Used to define the carousel card size, can be any css metric i.e. 100% / 100px / 100vw
   */
  cardWidth?: string | number;
};

/**
 * State used in rendering CarouselSlider
 */
export type CarouselSliderState = ComponentState<CarouselSliderSlots> &
  Required<Pick<CarouselSliderProps, 'cardWidth'>> & {
    /**
     * Used to track the number of cards and controls grid size
     */
    numCards: number;
    /**
     * The current card index
     */
    currentIndex: number;
    /**
     * The number of times we have done a full loop of carousel, can go negative.
     */
    loopCount: number;

    /**
     * Tracks whether a sliding animation was interrupted and needs to 'speed up' next animation.
     */
    interruptedAnimation: boolean;

    /**
     * Tracks container sizing for pixel values.
     */
    containerWidth: number;
  };

import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';

export type CarouselSliderSlots = {
  /**
   * The root viewport/window of the carousel
   */
  root: Slot<'div'>;
};

/**
 * CarouselSlider Props
 */
export type CarouselSliderProps = Partial<ComponentProps<CarouselSliderSlots>> & {
  /**
   * cardFocus sets the carousel slider as a focus group,
   * enabling left/right navigation of elements.
   *
   * This will also be passed into CarouselCards via context and set the appropriate focus attributes
   *
   * Defaults: false
   */
  cardFocus?: boolean;
};

/**
 * State used in rendering CarouselSlider
 */
export type CarouselSliderState = ComponentState<CarouselSliderSlots> & Pick<CarouselSliderProps, 'cardFocus'>;

export type CarouselSliderContextValue = Pick<CarouselSliderProps, 'cardFocus'>;

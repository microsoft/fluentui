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
export type CarouselSliderProps = Partial<ComponentProps<CarouselSliderSlots>>;

/**
 * State used in rendering CarouselSlider
 */
export type CarouselSliderState = ComponentState<CarouselSliderSlots>;

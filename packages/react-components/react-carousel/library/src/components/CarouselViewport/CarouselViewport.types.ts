import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';
import { CarouselSliderContextValue } from '../CarouselSlider/CarouselSlider.types';

export type CarouselViewportSlots = {
  /**
   * The viewport outer container, defining the size of the carousels visible and interactable area
   */
  root: Slot<'div'>;
};

/**
 * CarouselViewport Props
 */
export type CarouselViewportProps = ComponentProps<CarouselViewportSlots>;

/**
 * State used in rendering CarouselViewport
 */
export type CarouselViewportState = ComponentState<Required<CarouselViewportSlots>> & CarouselSliderContextValue;

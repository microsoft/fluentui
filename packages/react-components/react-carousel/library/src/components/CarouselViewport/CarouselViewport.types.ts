import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';
import { CarouselSliderContextValue } from '../CarouselSlider/CarouselSlider.types';

export type CarouselViewportSlots = {
  /**
   * The viewport outer container, defining the size of the carousels visible and interactable area
   */
  root: Slot<'div'>;

  /**
   * The slider used for animating carousel movement
   */
  slider?: NonNullable<Slot<'div'>>;
};

/**
 * CarouselViewport Props
 */
export type CarouselViewportProps = ComponentProps<CarouselViewportSlots> & {
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
 * State used in rendering CarouselViewport
 */
export type CarouselViewportState = ComponentState<Required<CarouselViewportSlots>> & CarouselSliderContextValue;

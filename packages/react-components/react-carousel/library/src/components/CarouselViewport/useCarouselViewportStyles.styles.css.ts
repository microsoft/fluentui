import { clsx } from 'clsx';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { CarouselViewportSlots, CarouselViewportState } from './CarouselViewport.types';
import styles from './CarouselViewport.module.css';

export const carouselViewportClassNames: SlotClassNames<CarouselViewportSlots> = {
  root: 'fui-CarouselViewport',
};

/**
 * Apply styling to the CarouselViewport slots based on the state
 */
export const useCarouselViewportStyles_unstable = (state: CarouselViewportState): CarouselViewportState => {
  state.root.className = clsx(carouselViewportClassNames.root, styles.root, state.root.className);

  return state;
};

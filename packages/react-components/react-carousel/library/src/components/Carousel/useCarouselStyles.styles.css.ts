import { clsx } from 'clsx';
import type { SlotClassNames } from '@fluentui/react-utilities';
import styles from './Carousel.module.css';

import type { CarouselSlots, CarouselState } from './Carousel.types';

export const carouselClassNames: SlotClassNames<CarouselSlots> = {
  root: 'fui-Carousel',
};

/**
 * Apply styling to the Carousel slots based on the state
 */
export const useCarouselStyles_unstable = (state: CarouselState): CarouselState => {
  const { appearance } = state;

  state.root.className = clsx(
    carouselClassNames.root,
    styles.root,
    appearance === 'elevated' && styles.elevated,
    state.root.className,
  );
  return state;
};

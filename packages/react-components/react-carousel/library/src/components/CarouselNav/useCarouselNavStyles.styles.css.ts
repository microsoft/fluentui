import { clsx } from 'clsx';
import type { SlotClassNames } from '@fluentui/react-utilities';
import styles from './CarouselNav.module.css';

import type { CarouselNavSlots, CarouselNavState } from './CarouselNav.types';

export const carouselNavClassNames: SlotClassNames<CarouselNavSlots> = {
  root: 'fui-CarouselNav',
};

/**
 * Apply styling to the CarouselNav slots based on the state
 */
export const useCarouselNavStyles_unstable = (state: CarouselNavState): CarouselNavState => {
  state.root.className = clsx(carouselNavClassNames.root, styles.root, state.root.className);

  return state;
};

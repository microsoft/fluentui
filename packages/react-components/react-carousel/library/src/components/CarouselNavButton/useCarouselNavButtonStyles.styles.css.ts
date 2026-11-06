import { clsx } from 'clsx';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { CarouselNavButtonSlots, CarouselNavButtonState } from './CarouselNavButton.types';
import styles from './CarouselNavButton.module.css';

export const carouselNavButtonClassNames: SlotClassNames<CarouselNavButtonSlots> = {
  root: 'fui-CarouselNavButton',
};

/**
 * Apply styling to the CarouselNavButton slots based on the state
 */
export const useCarouselNavButtonStyles_unstable = (state: CarouselNavButtonState): CarouselNavButtonState => {
  const { selected, appearance } = state;

  state.root.className = clsx(
    carouselNavButtonClassNames.root,
    styles.root,
    selected && styles.selected,
    appearance && styles[appearance],
    state.root.className,
  );

  return state;
};

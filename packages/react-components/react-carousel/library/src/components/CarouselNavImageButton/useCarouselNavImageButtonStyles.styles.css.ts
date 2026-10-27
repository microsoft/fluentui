import { clsx } from 'clsx';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { CarouselNavImageButtonSlots, CarouselNavImageButtonState } from './CarouselNavImageButton.types';
import styles from './CarouselNavImageButton.module.css';

export const carouselNavImageButtonClassNames: SlotClassNames<CarouselNavImageButtonSlots> = {
  root: 'fui-CarouselNavImageButton',
  image: 'fui-CarouselNavImageButton__image',
};

/**
 * Apply styling to the CarouselNavImageButton slots based on the state
 */
export const useCarouselNavImageButtonStyles_unstable = (
  state: CarouselNavImageButtonState,
): CarouselNavImageButtonState => {
  const { selected } = state;

  state.root.className = clsx(
    carouselNavImageButtonClassNames.root,
    styles.root,
    selected && styles.selected,
    state.root.className,
  );

  if (state.image) {
    state.image.className = clsx(carouselNavImageButtonClassNames.image, styles.image, state.image?.className);
  }

  return state;
};

'use client';

import { clsx } from 'clsx';
import { useToggleButtonStyles_unstable } from '@fluentui/react-button';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { CarouselAutoplayButtonSlots, CarouselAutoplayButtonState } from './CarouselAutoplayButton.types';
import styles from './CarouselAutoplayButton.module.css';

export const carouselAutoplayButtonClassNames: SlotClassNames<CarouselAutoplayButtonSlots> = {
  root: 'fui-CarouselAutoplayButton',
  icon: 'fui-CarouselAutoplayButton__icon',
};

export const useCarouselAutoplayButtonStyles_unstable = (
  state: CarouselAutoplayButtonState,
): CarouselAutoplayButtonState => {
  useToggleButtonStyles_unstable(state);
  // Griffel merges Button's atomic appearance and checked classes after these styles, so Button's colors win for every
  // appearance that sets them: the background is overridden by every appearance but secondary, the text and border
  // colors by every appearance but secondary and outline.
  const { appearance, checked } = state;
  // eslint-disable-next-line react-hooks/immutability
  state.root.className = clsx(
    carouselAutoplayButtonClassNames.root,
    styles.root,
    !checked && appearance === 'secondary' && styles.background,
    !checked && (appearance === 'secondary' || appearance === 'outline') && styles.colors,
    state.root.className,
  );
  if (state.icon) {
    // eslint-disable-next-line react-hooks/immutability
    state.icon.className = clsx(carouselAutoplayButtonClassNames.icon, state.icon.className);
  }
  return state;
};

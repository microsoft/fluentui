'use client';

import { clsx } from 'clsx';
import { useButtonStyles_unstable } from '@fluentui/react-button';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { CarouselButtonSlots, CarouselButtonState } from './CarouselButton.types';
import styles from './CarouselButton.module.css';

export const carouselButtonClassNames: SlotClassNames<CarouselButtonSlots> = {
  root: 'fui-CarouselButton',
  icon: 'fui-CarouselButton__icon',
};

export const useCarouselButtonStyles_unstable = (state: CarouselButtonState): CarouselButtonState => {
  const styledState = { ...state, ...useButtonStyles_unstable(state) };
  styledState.root.className = clsx(carouselButtonClassNames.root, styles.root, styledState.root.className);
  if (styledState.icon) {
    styledState.icon.className = clsx(carouselButtonClassNames.icon, styledState.icon.className);
  }
  return styledState;
};

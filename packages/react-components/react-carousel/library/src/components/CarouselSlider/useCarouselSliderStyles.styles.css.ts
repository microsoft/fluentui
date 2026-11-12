'use client';

import { clsx } from 'clsx';
import type { SlotClassNames } from '@fluentui/react-utilities';
import { useCarouselContext_unstable as useCarouselContext } from '../CarouselContext';
import styles from './CarouselSlider.module.css';

import type { CarouselSliderSlots, CarouselSliderState } from './CarouselSlider.types';

export const carouselSliderClassNames: SlotClassNames<CarouselSliderSlots> = {
  root: 'fui-CarouselSlider',
};

/**
 * Apply styling to the CarouselSlider slots based on the state
 */
export const useCarouselSliderStyles_unstable = (state: CarouselSliderState): CarouselSliderState => {
  const appearance = useCarouselContext(context => context.appearance);

  // eslint-disable-next-line react-hooks/immutability
  state.root.className = clsx(
    carouselSliderClassNames.root,
    styles.root,
    appearance === 'elevated' && styles.elevated,
    state.root.className,
  );

  return state;
};

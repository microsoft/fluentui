'use client';

import { clsx } from 'clsx';
import type { SlotClassNames } from '@fluentui/react-utilities';
import { useCarouselContext_unstable as useCarouselContext } from '../CarouselContext';
import type { CarouselCardSlots, CarouselCardState } from './CarouselCard.types';
import styles from './CarouselCard.module.css';

export const carouselCardClassNames: SlotClassNames<CarouselCardSlots> = {
  root: 'fui-CarouselCard',
};

/**
 * Apply styling to the CarouselCard slots based on the state
 */
export const useCarouselCardStyles_unstable = (state: CarouselCardState): CarouselCardState => {
  const { autoSize } = state;
  const appearance = useCarouselContext(context => context.appearance);

  // eslint-disable-next-line react-hooks/immutability
  state.root.className = clsx(
    carouselCardClassNames.root,
    styles.root,
    appearance === 'elevated' && styles.elevated,
    autoSize && styles.autoSize,
    state.root.className,
  );

  return state;
};

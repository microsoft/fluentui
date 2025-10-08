'use client';

import { makeStyles, mergeClasses } from '@griffel/react';
import type { SlotClassNames } from '@fluentui/react-utilities';
import { tokens } from '@fluentui/react-theme';
import { useCarouselContext_unstable as useCarouselContext } from '../CarouselContext';

import type { CarouselSliderSlots, CarouselSliderState } from './CarouselSlider.types';

export const carouselSliderClassNames: SlotClassNames<CarouselSliderSlots> = {
  root: 'fui-CarouselSlider',
};

/**
 * Styles for the root slot
 */
const useStyles = makeStyles({
  root: {
    display: 'flex',
    overflowAnchor: 'none',
  },
  elevated: {
    gap: tokens.spacingHorizontalXXL,
  },
});

/**
 * Apply styling to the CarouselSlider slots based on the state
 */
export const useCarouselSliderStyles_unstable = (state: CarouselSliderState): CarouselSliderState => {
  'use no memo';

  const appearance = useCarouselContext(context => context.appearance);
  const styles = useStyles();

  state.root.className = mergeClasses(
    carouselSliderClassNames.root,
    styles.root,
    appearance === 'elevated' && styles.elevated,
    state.root.className,
  );

  return state;
};

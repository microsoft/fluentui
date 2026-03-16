'use client';

import { makeStyles, mergeClasses } from '@griffel/react';
import type { SlotClassNames } from '@fluentui/react-utilities';
import { tokens } from '@fluentui/react-theme';
import { useCarouselContext_unstable as useCarouselContext } from '../CarouselContext';
import type { CarouselCardSlots, CarouselCardState } from './CarouselCard.types';

export const carouselCardClassNames: SlotClassNames<CarouselCardSlots> = {
  root: 'fui-CarouselCard',
};

/**
 * Styles for the root slot
 */
const useStyles = makeStyles({
  root: {
    flex: '0 0 100%',
    maxWidth: '100%',
  },
  autoSize: {
    flex: '0 0 auto' /* Adapt slide size to its content */,
    minWidth: 0,
    width: 'auto',
    maxWidth: '100%',
  },
  elevated: {
    borderRadius: tokens.borderRadiusXLarge,
    boxShadow: tokens.shadow16,
    overflow: 'hidden',
  },
});

/**
 * Apply styling to the CarouselCard slots based on the state
 */
export const useCarouselCardStyles_unstable = (state: CarouselCardState): CarouselCardState => {
  'use no memo';

  const { autoSize } = state;
  const appearance = useCarouselContext(context => context.appearance);

  const styles = useStyles();
  state.root.className = mergeClasses(
    carouselCardClassNames.root,
    styles.root,
    appearance === 'elevated' && styles.elevated,
    autoSize && styles.autoSize,
    state.root.className,
  );

  return state;
};

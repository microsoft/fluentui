import { makeStyles, mergeClasses } from '@griffel/react';
import type { SlotClassNames } from '@fluentui/react-utilities';
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
    minWidth: 0,
  },
});

/**
 * Apply styling to the CarouselCard slots based on the state
 */
export const useCarouselCardStyles_unstable = (state: CarouselCardState): CarouselCardState => {
  'use no memo';

  const styles = useStyles();
  state.root.className = mergeClasses(carouselCardClassNames.root, styles.root, state.root.className);

  return state;
};

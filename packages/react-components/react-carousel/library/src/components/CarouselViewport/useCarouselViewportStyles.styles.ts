import { makeStyles, mergeClasses } from '@griffel/react';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { CarouselViewportSlots, CarouselViewportState } from './CarouselViewport.types';

export const carouselViewportClassNames: SlotClassNames<CarouselViewportSlots> = {
  root: 'fui-CarouselViewport',
};

/**
 * Styles for the root slot
 */
const useStyles = makeStyles({
  root: {
    maxWidth: '100%',
    width: 'auto',
  },
});

/**
 * Apply styling to the CarouselViewport slots based on the state
 */
export const useCarouselViewportStyles_unstable = (state: CarouselViewportState): CarouselViewportState => {
  'use no memo';

  const styles = useStyles();
  state.root.className = mergeClasses(carouselViewportClassNames.root, styles.root, state.root.className);

  return state;
};

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
    minWidth: 0,
    maxWidth: '100%' /* Prevent from growing larger than viewport */,
    width: '100%' /* Default to 100% width cards */,
  },
  autoSize: {
    flex: '0 0 auto' /* Adapt slide size to its content */,
    minWidth: 0,
    width: 'auto',
  },
});

/**
 * Apply styling to the CarouselCard slots based on the state
 */
export const useCarouselCardStyles_unstable = (state: CarouselCardState): CarouselCardState => {
  'use no memo';

  const { autoSize } = state;

  const styles = useStyles();
  state.root.className = mergeClasses(
    carouselCardClassNames.root,
    styles.root,
    autoSize && styles.autoSize,
    state.root.className,
  );

  return state;
};

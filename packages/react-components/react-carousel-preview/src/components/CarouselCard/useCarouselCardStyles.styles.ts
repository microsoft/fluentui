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
    width: '100%',
  },
  notVisible: {
    position: 'absolute',
    width: '100%',
    top: '0px',
    left: '-1000%', // For now, to hide out of viewport.
  },
  peekLeft: {
    position: 'absolute',
    float: 'left',
    right: '100%',
    top: 0,
    width: '100%',
  },
  peekRight: {
    position: 'absolute',
    float: 'right',
    left: '100%',
    top: 0,
    width: '100%',
  },
});

/**
 * Apply styling to the CarouselCard slots based on the state
 */
export const useCarouselCardStyles_unstable = (state: CarouselCardState): CarouselCardState => {
  const { peekDir, visible } = state;
  const styles = useStyles();
  state.root.className = mergeClasses(
    carouselCardClassNames.root,
    styles.root,
    !visible && styles.notVisible,
    peekDir === 'next' && styles.peekRight,
    peekDir === 'prev' && styles.peekLeft,
    state.root.className,
  );

  // TODO Add class names to slots, for example:
  // state.mySlot.className = mergeClasses(styles.mySlot, state.mySlot.className);

  return state;
};

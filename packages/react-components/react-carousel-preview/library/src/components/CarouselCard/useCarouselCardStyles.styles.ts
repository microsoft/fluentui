import { makeStyles, mergeClasses } from '@griffel/react';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { CarouselCardSlots, CarouselCardState } from './CarouselCard.types';

export const carouselCardClassNames: SlotClassNames<CarouselCardSlots> = {
  root: 'fui-CarouselCard',
};

// TODO: Enable varying sizes w/ tokens
const GapSize = 10;

/**
 * Styles for the root slot
 */
const useStyles = makeStyles({
  root: {
    marginLeft: GapSize / 2 + 'px',
    marginRight: GapSize / 2 + 'px',
    gridColumn: '2',
    gridRow: '1',
    // transition: 'grid-column 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
  },
  peekLeft: {
    // position: 'absolute',
    // float: 'left',
    // right: '100%',
    // top: 0,
    // width: '100%',
    gridColumn: '1',
  },
  peekRight: {
    // animationName: {
    //   to: { transform: 'translateX(0)' },
    //   from: { transform: 'translateX(-100%)' },
    // },
    // animationDuration: '0.5s',
    // position: 'absolute',
    // float: 'right',
    // left: '100%',
    // top: 0,
    // width: '100%',
    gridColumn: '3',
  },
});

/**
 * Apply styling to the CarouselCard slots based on the state
 */
export const useCarouselCardStyles_unstable = (state: CarouselCardState): CarouselCardState => {
  const { peekDir } = state;
  const styles = useStyles();
  state.root.className = mergeClasses(
    carouselCardClassNames.root,
    styles.root,
    peekDir === 'next' && styles.peekRight,
    peekDir === 'prev' && styles.peekLeft,
    state.root.className,
  );

  // TODO Add class names to slots, for example:
  // state.mySlot.className = mergeClasses(styles.mySlot, state.mySlot.className);

  return state;
};

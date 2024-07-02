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
    height: '100%',
    gridRow: 1,
  },
});

/**
 * Apply styling to the CarouselCard slots based on the state
 */
export const useCarouselCardStyles_unstable = (state: CarouselCardState): CarouselCardState => {
  'use no memo';

  const { offsetIndex, cardWidth } = state;

  const styles = useStyles();
  state.root.className = mergeClasses(carouselCardClassNames.root, styles.root, state.root.className);

  // Shift our view for each card and tracking the total loops (circular)
  const currentPosition = offsetIndex * 100;
  // Todo: Resize observer our container so we can position based on pixels for variant states (isTrailing etc.)
  const slideTransform = `translate3d(${currentPosition}%, 0,0)`;
  state.root.style = {
    transform: slideTransform,
    minWidth: cardWidth,
    width: cardWidth,
    ...state.root.style,
  };

  return state;
};

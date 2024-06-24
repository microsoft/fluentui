import { makeStyles, mergeClasses } from '@griffel/react';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { CarouselSliderSlots, CarouselSliderState } from './CarouselSlider.types';

export const carouselSliderClassNames: SlotClassNames<CarouselSliderSlots> = {
  root: 'fui-CarouselSlider',
  container: 'fui-CarouselSlider__container',
};

/**
 * Styles for the root slot
 */
const useStyles = makeStyles({
  root: {
    // display: 'flex',
    // flexDirection: 'row',
    // flexWrap: 'nowrap',
    overflow: 'visible',
    display: 'inline-grid',
  },
  container: {
    overflow: 'hidden',
    position: 'relative',
  },

  // TODO add additional classes for different states and/or slots
});

/**
 * Apply styling to the CarouselSlider slots based on the state
 */
export const useCarouselSliderStyles_unstable = (state: CarouselSliderState): CarouselSliderState => {
  'use no memo';

  const { cardWidth } = state;

  const numCards = 4;

  const styles = useStyles();
  state.root.className = mergeClasses(carouselSliderClassNames.root, styles.root, state.root.className);
  state.container.className = mergeClasses(
    carouselSliderClassNames.container,
    styles.container,
    state.container.className,
  );

  state.root.style = {
    width: `calc(${cardWidth} * ${numCards})`,
    ...state.root.style,
  };
  // TODO Add class names to slots, for example:
  // state.mySlot.className = mergeClasses(styles.mySlot, state.mySlot.className);

  return state;
};

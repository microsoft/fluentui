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

  const { cardWidth, currentIndex, numCards } = state;

  const styles = useStyles();
  state.root.className = mergeClasses(carouselSliderClassNames.root, styles.root, state.root.className);
  state.container.className = mergeClasses(
    carouselSliderClassNames.container,
    styles.container,
    state.container.className,
  );

  const currentPosition = (-100 / numCards) * currentIndex;
  // Todo: Resize observer our container so we can position based on pixels for variant states
  const transformTest = `translate3d(${currentPosition}%, 0,0)`;

  state.root.style = {
    width: `calc(${cardWidth} * ${numCards})`,
    transform: transformTest,
    ...state.root.style,
  };

  return state;
};

import { makeStyles, mergeClasses } from '@griffel/react';
import type { SlotClassNames } from '@fluentui/react-utilities';
import { tokens } from '@fluentui/react-theme';
import type { CarouselSliderSlots, CarouselSliderState } from './CarouselSlider.types';

export const carouselSliderClassNames: SlotClassNames<CarouselSliderSlots> = {
  root: 'fui-CarouselSlider',
  container: 'fui-CarouselSlider__container',
};

// For now, until motion tokens are updated.
const easingCurve = 'cubic-bezier(0.65, 0, 0.35, 1)';

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
    transitionProperty: 'transform',
    transitionTimingFunction: easingCurve,
    transitionDuration: tokens.durationUltraSlow,
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

  const { cardWidth, currentIndex, numCards, loopCount } = state;

  const styles = useStyles();
  state.root.className = mergeClasses(carouselSliderClassNames.root, styles.root, state.root.className);
  state.container.className = mergeClasses(
    carouselSliderClassNames.container,
    styles.container,
    state.container.className,
  );

  // Shift our view for each card and tracking the total loops (circular)
  const currentPosition = (-100 / numCards) * currentIndex + loopCount * -100 + 50 / numCards;
  // Todo: Resize observer our container so we can position based on pixels for variant states (isTrailing etc.)
  const slideTransform = `translate3d(${currentPosition}%, 0,0)`;

  state.root.style = {
    width: `calc(${cardWidth} * ${numCards})`,
    transform: slideTransform,
    ...state.root.style,
  };

  return state;
};

import { makeStyles, mergeClasses } from '@griffel/react';
import type { SlotClassNames } from '@fluentui/react-utilities';
import { tokens } from '@fluentui/react-theme';
import type { CarouselSliderSlots, CarouselSliderState } from './CarouselSlider.types';

export const carouselSliderClassNames: SlotClassNames<CarouselSliderSlots> = {
  root: 'fui-CarouselSlider',
  slider: 'fui-CarouselSlider__slider',
};

// For now, until motion tokens are updated.
const easingCurve = 'cubic-bezier(0.65, 0, 0.35, 1)';

/**
 * Styles for the root slot
 */
const useStyles = makeStyles({
  root: {
    overflow: 'hidden',
    position: 'relative',
  },
  slider: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    overflow: 'visible',
  },
  sliderAnimation: {
    transitionProperty: 'transform',
    transitionTimingFunction: easingCurve,
    transitionDuration: tokens.durationNormal,
  },

  // TODO add additional classes for different states and/or slots
});

/**
 * Apply styling to the CarouselSlider slots based on the state
 */
export const useCarouselSliderStyles_unstable = (state: CarouselSliderState): CarouselSliderState => {
  'use no memo';

  const { cardWidth, currentIndex, numCards, loopCount, interruptedAnimation } = state;

  const styles = useStyles();
  state.root.className = mergeClasses(carouselSliderClassNames.root, styles.root, state.root.className);
  state.slider.className = mergeClasses(
    carouselSliderClassNames.slider,
    styles.slider,
    styles.sliderAnimation,
    state.slider.className,
  );

  // Shift our view for each card and tracking the total loops (circular)
  const currentPosition = currentIndex + loopCount * numCards;

  // Centers the active card
  const offsetPos = `50% - ${cardWidth} / 2`;

  // Todo: Positions for non-circular, trailing etc.
  const slideTransform = `translate3d(calc(${-currentPosition} * ${cardWidth} + ${offsetPos}), 0,0)`;

  state.slider.style = {
    transform: slideTransform,
    // If we interrupt an animation, the next one will start further along to catch up the additional distance
    transitionDelay: interruptedAnimation ? `-${tokens.durationFast}` : '0',
    ...state.slider.style,
  };

  return state;
};

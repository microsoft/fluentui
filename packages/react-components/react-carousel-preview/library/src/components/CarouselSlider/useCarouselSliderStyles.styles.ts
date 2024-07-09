import { makeStyles, mergeClasses } from '@griffel/react';
import type { SlotClassNames } from '@fluentui/react-utilities';
import { tokens } from '@fluentui/react-theme';
import type { CarouselSliderSlots, CarouselSliderState } from './CarouselSlider.types';

export const carouselSliderClassNames: SlotClassNames<CarouselSliderSlots> = {
  root: 'fui-CarouselSlider',
  slider: 'fui-CarouselSlider__slider',
};

export const sliderAnimationDelayToken = '--fui-CarouselSlider-animation-delay' as const;

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
    transition: `transform ${tokens.durationNormal} ${easingCurve}`,
    transitionDelay: `var(${sliderAnimationDelayToken}, 0)`,
  },
});

/**
 * Apply styling to the CarouselSlider slots based on the state
 */
export const useCarouselSliderStyles_unstable = (state: CarouselSliderState): CarouselSliderState => {
  'use no memo';

  const { cardWidth, currentIndex, numCards, loopCount } = state;

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
  const slideTransform = `translateX(calc(${-currentPosition} * ${cardWidth} + ${offsetPos}))`;

  state.slider.style = {
    transform: slideTransform,
    ...state.slider.style,
  };

  return state;
};

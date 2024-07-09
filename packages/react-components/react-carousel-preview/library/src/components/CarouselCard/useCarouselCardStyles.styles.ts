import { makeStyles, mergeClasses } from '@griffel/react';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { CarouselCardSlots, CarouselCardState } from './CarouselCard.types';

export const carouselCardClassNames: SlotClassNames<CarouselCardSlots> = {
  root: 'fui-CarouselCard',
};

export const cardAnimationDelayToken = '--fui-CarouselCard-animation-delay' as const;

/**
 * Styles for the root slot
 */
const useStyles = makeStyles({
  root: {
    height: '100%',
    transition: 'transform 0s 0s',
  },
  rootAnimation: {
    // This just ensures the card won't disappear immediately during index change
    // transitionDelay: tokens.durationFaster,
    transitionDelay: `var(${cardAnimationDelayToken}, 0)`,
  },
});

/**
 * Apply styling to the CarouselCard slots based on the state
 */
export const useCarouselCardStyles_unstable = (state: CarouselCardState): CarouselCardState => {
  'use no memo';

  const { offsetIndex, cardWidth } = state;

  const styles = useStyles();
  state.root.className = mergeClasses(
    carouselCardClassNames.root,
    styles.root,
    styles.rootAnimation,
    state.root.className,
  );

  // Shift our view for each card and tracking the total loops (circular)
  const currentPosition = offsetIndex * 100;
  const slideTransform = `translate3d(${currentPosition}%, 0,0)`;
  state.root.style = {
    transform: slideTransform,
    minWidth: cardWidth,
    width: cardWidth,
    ...state.root.style,
  };

  return state;
};

import { makeStyles, mergeClasses } from '@griffel/react';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { CarouselCardButtonSlots, CarouselCardButtonState } from './CarouselCardButton.types';
import { carouselCardClassNames } from '../CarouselCard/useCarouselCardStyles.styles';

export const carouselCardButtonClassNames: SlotClassNames<CarouselCardButtonSlots> = {
  root: 'fui-CarouselCardButton',
};

/**
 * Styles for the root slot
 */
const useStyles = makeStyles({
  root: {
    flex: '0 0 100%',
    maxWidth: '100%',
  },
  autoSize: {
    flex: '0 0 auto' /* Adapt slide size to its content */,
    minWidth: 0,
    width: 'auto',
    maxWidth: '100%',
  },
});

/**
 * Apply styling to the CarouselCardButton slots based on the state
 */
export const useCarouselCardButtonStyles_unstable = (state: CarouselCardButtonState): CarouselCardButtonState => {
  'use no memo';

  const { autoSize } = state;

  const styles = useStyles();
  state.root.className = mergeClasses(
    carouselCardButtonClassNames.root,
    // Must include CarouselCard className so they can be detected for carousel logic
    carouselCardClassNames.root,
    styles.root,
    autoSize && styles.autoSize,
    state.root.className,
  );

  return state;
};

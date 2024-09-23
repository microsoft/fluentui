import { makeStyles, mergeClasses } from '@griffel/react';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { CarouselAnnouncerSlots, CarouselAnnouncerState } from './CarouselAnnouncer.types';

export const carouselAnnouncerClassNames: SlotClassNames<CarouselAnnouncerSlots> = {
  root: 'fui-CarouselAnnouncer',
};

/**
 * Styles for the root slot
 * Hidden according to A11Y compatibility: https://www.a11yproject.com/posts/how-to-hide-content/
 */
const useStyles = makeStyles({
  root: {
    clip: 'rect(0 0 0 0)',
    height: '0px',
    overflow: 'hidden',
    position: 'absolute',
    width: '0px',
    clipPath: 'inset(50%)',
    whiteSpace: 'nowrap',
  },
});

/**
 * Apply styling to the CarouselAnnouncer slots based on the state
 */
export const useCarouselAnnouncerStyles_unstable = (state: CarouselAnnouncerState): CarouselAnnouncerState => {
  'use no memo';

  const styles = useStyles();
  state.root.className = mergeClasses(carouselAnnouncerClassNames.root, styles.root, state.root.className);

  return state;
};

import { makeStyles, mergeClasses } from '@griffel/react';
import type { TeachingPopoverCarouselSlots, TeachingPopoverCarouselState } from './TeachingPopoverCarousel.types';
import type { SlotClassNames } from '@fluentui/react-utilities';

export const teachingPopoverCarouselClassNames: SlotClassNames<TeachingPopoverCarouselSlots> = {
  root: 'fui-TeachingPopoverCarousel',
};

// Todo: Page change animation & styles
const useStyles = makeStyles({
  root: {},
});

/** Applies style classnames to slots */
export const useTeachingPopoverCarouselStyles_unstable = (state: TeachingPopoverCarouselState) => {
  'use no memo';

  const styles = useStyles();

  state.root.className = mergeClasses(teachingPopoverCarouselClassNames.root, styles.root, state.root.className);

  return state;
};

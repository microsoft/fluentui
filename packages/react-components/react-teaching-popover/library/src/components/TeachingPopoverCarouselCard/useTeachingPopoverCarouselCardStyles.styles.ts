import { makeStyles, mergeClasses } from '@griffel/react';
import type {
  TeachingPopoverCarouselCardSlots,
  TeachingPopoverCarouselCardState,
} from './TeachingPopoverCarouselCard.types';
import type { SlotClassNames } from '@fluentui/react-utilities';

export const teachingPopoverCarouselCardClassNames: SlotClassNames<TeachingPopoverCarouselCardSlots> = {
  root: 'fui-TeachingPopoverCarouselCard',
};

const useStyles = makeStyles({
  root: {},
});

/** Applies style classnames to slots */
export const useTeachingPopoverCarouselCardStyles_unstable = (state: TeachingPopoverCarouselCardState) => {
  'use no memo';

  const styles = useStyles();

  state.root.className = mergeClasses(teachingPopoverCarouselCardClassNames.root, styles.root, state.root.className);

  return state;
};

import { makeStyles, mergeClasses } from '@griffel/react';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type {
  TeachingPopoverCarouselPageCountSlots,
  TeachingPopoverCarouselPageCountState,
} from './TeachingPopoverCarouselPageCount.types';

export const teachingPopoverCarouselPageCountClassNames: SlotClassNames<TeachingPopoverCarouselPageCountSlots> = {
  root: 'fui-TeachingPopoverCarouselPageCount',
};

/**
 * Styles for the root slot
 */
const useStyles = makeStyles({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

/**
 * Apply styling to the TeachingPopoverCarouselPageCount slots based on the state
 */
export const useTeachingPopoverCarouselPageCountStyles_unstable = (
  state: TeachingPopoverCarouselPageCountState,
): TeachingPopoverCarouselPageCountState => {
  'use no memo';

  const styles = useStyles();
  state.root.className = mergeClasses(
    teachingPopoverCarouselPageCountClassNames.root,
    styles.root,
    state.root.className,
  );

  return state;
};

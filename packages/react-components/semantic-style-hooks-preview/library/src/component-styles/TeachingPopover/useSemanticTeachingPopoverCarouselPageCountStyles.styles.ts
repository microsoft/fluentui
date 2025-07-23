import { makeStyles, mergeClasses } from '@griffel/react';
import { getSlotClassNameProp_unstable } from '@fluentui/react-utilities';
import {
  teachingPopoverCarouselPageCountClassNames,
  type TeachingPopoverCarouselPageCountState,
} from '@fluentui/react-teaching-popover';

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
export const useSemanticTeachingPopoverCarouselPageCountStyles = (
  _state: unknown,
): TeachingPopoverCarouselPageCountState => {
  'use no memo';

  const state = _state as TeachingPopoverCarouselPageCountState;

  const styles = useStyles();
  state.root.className = mergeClasses(
    state.root.className,
    teachingPopoverCarouselPageCountClassNames.root,
    styles.root,
    getSlotClassNameProp_unstable(state.root),
  );

  return state;
};

import { makeResetStyles, makeStyles, mergeClasses } from '@griffel/react';
import { createFocusOutlineStyle } from '@fluentui/react-tabster';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { RatingItemSlots, RatingItemState } from './RatingItem.types';

export const ratingItemClassNames: SlotClassNames<RatingItemSlots> = {
  root: 'fui-RatingItem',
  indicator: 'fui-RatingItem__indicator',
  halfIconInput: 'fui-RatingItem__halfIconInput',
  fullIconInput: 'fui-RatingItem-fullIconInput',
};

const useRootBaseClassName = makeResetStyles({
  display: 'inline-flex',
  position: 'relative',
  ...createFocusOutlineStyle({ style: {}, selector: 'focus-within' }),
});

/**
 * Styles for the root slot
 */
const useStyles = makeStyles({
  root: {},
});

/**
 * Apply styling to the RatingItem slots based on the state
 */
export const useRatingItemStyles_unstable = (state: RatingItemState): RatingItemState => {
  const styles = useStyles();
  const rootBaseClassName = useRootBaseClassName();
  state.root.className = mergeClasses(ratingItemClassNames.root, rootBaseClassName, styles.root, state.root.className);

  // TODO Add class names to slots, for example:
  // state.mySlot.className = mergeClasses(styles.mySlot, state.mySlot.className);

  return state;
};

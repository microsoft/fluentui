import { createFocusOutlineStyle } from '@fluentui/react-tabster';
import { makeStyles, mergeClasses } from '@griffel/react';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { RatingSlots, RatingState } from './Rating.types';

export const ratingClassNames: SlotClassNames<RatingSlots> = {
  root: 'fui-Rating',
  ratingLabel: 'fui-Rating__ratingLabel',
  countLabel: 'fui-Rating__countLabel',
};

/**
 * Styles for the root slot
 */
const useStyles = makeStyles({
  root: {
    display: 'inline-flex',
    position: 'relative',
    ...createFocusOutlineStyle({ style: {}, selector: 'focus-within' }),
  },
});

/**
 * Apply styling to the Rating slots based on the state
 */
export const useRatingStyles_unstable = (state: RatingState): RatingState => {
  const styles = useStyles();
  state.root.className = mergeClasses(ratingClassNames.root, styles.root, state.root.className);

  return state;
};

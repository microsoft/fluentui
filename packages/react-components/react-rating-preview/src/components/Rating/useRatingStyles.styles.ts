import { createFocusOutlineStyle } from '@fluentui/react-tabster';
import { makeResetStyles, makeStyles, mergeClasses /*shorthands*/ } from '@griffel/react';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { RatingSlots, RatingState } from './Rating.types';
//import { tokens } from '@fluentui/react-theme';

export const ratingClassNames: SlotClassNames<RatingSlots> = {
  root: 'fui-Rating',
  ratingLabel: 'fui-Rating__ratingLabel',
  ratingCountLabel: 'fui-Rating__countLabel',
};

/**
 * Styles for the root slot
 */

const useStyles = makeResetStyles({
  whiteSpace: 'nowrap',
  ...createFocusOutlineStyle({ style: {}, selector: 'focus' }),
  '& > label': {},
});
const useRatingLabelStyles = makeStyles({
  root: {
    width: '100%',
    height: '100%',
  },
});

/**
 * Apply styling to the Rating slots based on the state
 */
export const useRatingStyles_unstable = (state: RatingState): RatingState => {
  const styles = useStyles();
  const labelStyles = useRatingLabelStyles();
  state.root.className = mergeClasses(ratingClassNames.root, styles, state.root.className);
  if (state.countLabel && state.ratingCountLabel) {
    state.ratingCountLabel.className = mergeClasses(
      ratingClassNames.ratingCountLabel,
      labelStyles.root,
      state.ratingCountLabel.className,
    );
  }
  if (state.ratingLabel && state.valueLabel) {
    state.ratingLabel.className = mergeClasses(
      ratingClassNames.ratingCountLabel,
      labelStyles.root,
      state.ratingLabel.className,
    );
  }

  return state;
};

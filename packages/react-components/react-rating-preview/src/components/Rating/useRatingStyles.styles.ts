import { createFocusOutlineStyle } from '@fluentui/react-tabster';
import { makeResetStyles, makeStyles, mergeClasses /*shorthands*/, shorthands } from '@griffel/react';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { RatingSlots, RatingState } from './Rating.types';
import { tokens } from '@fluentui/react-theme';

export const ratingClassNames: SlotClassNames<RatingSlots> = {
  root: 'fui-Rating',
  ratingLabel: 'fui-Rating__ratingLabel',
  ratingCountLabel: 'fui-Rating__countLabel',
  divider: 'fui-Rating__divider',
};

/**
 * Styles for the root slot
 */

const useStyles = makeResetStyles({
  whiteSpace: 'nowrap',
  ...createFocusOutlineStyle({ style: {}, selector: 'focus' }),
  '& > label': {},
});

const useLabelStyles = makeResetStyles({
  verticalAlign: 'top',
  ...shorthands.margin('0px', '3px'),
});

const useRatingLabelStyles = makeStyles({
  root: {
    fontWeight: tokens.fontWeightSemibold,
  },
});

const useRatingCountLabelStyles = makeStyles({
  root: {
    fontWeight: tokens.fontWeightMedium,
  },
});

const useDividerlStyles = makeStyles({
  root: {
    verticalAlign: 'top',
    ...shorthands.margin('0px', '-2px'),
    fontWeight: tokens.fontWeightMedium,
  },
});

/**
 * Apply styling to the Rating slots based on the state
 */
export const useRatingStyles_unstable = (state: RatingState): RatingState => {
  const styles = useStyles();
  const labelStyles = useLabelStyles();
  const ratingCountStyles = useRatingCountLabelStyles();
  const ratingLabelStyles = useRatingLabelStyles();
  const dividerStyles = useDividerlStyles();
  state.root.className = mergeClasses(ratingClassNames.root, styles, state.root.className);
  if (state.ratingLabel) {
    state.ratingLabel.className = mergeClasses(
      ratingClassNames.ratingCountLabel,
      labelStyles,
      ratingLabelStyles.root,
      state.ratingLabel.className,
    );
  }
  if (state.ratingCountLabel) {
    state.ratingCountLabel.className = mergeClasses(
      ratingClassNames.ratingCountLabel,
      labelStyles,
      ratingCountStyles.root,
      state.ratingCountLabel.className,
    );
  }
  if (state.divider) {
    state.divider.className = mergeClasses(ratingClassNames.divider, dividerStyles.root, state.divider.className);
  }

  return state;
};

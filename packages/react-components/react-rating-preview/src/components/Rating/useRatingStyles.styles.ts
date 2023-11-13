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

const labelSizes = {
  small: '12px',
  medium: '16px',
  large: '20px',
};

/**
 * Styles for the root slot
 */

const useStyles = makeResetStyles({
  display: 'flex',
  ...createFocusOutlineStyle({ style: {}, selector: 'focus' }),
});

const useLabelStyles = makeResetStyles({
  verticalAlign: 'top',
  ...shorthands.margin('0px', '2px'),
});

const useRatingLabelStyles = makeStyles({
  root: {
    fontWeight: tokens.fontWeightSemibold,
  },
  small: {
    fontSize: labelSizes.small,
  },
  medium: {
    fontSize: labelSizes.medium,
  },
  large: {
    fontSize: labelSizes.large,
  },
});

const useRatingCountLabelStyles = makeStyles({
  root: {
    fontWeight: tokens.fontWeightMedium,
  },
  small: {
    fontSize: labelSizes.small,
  },
  medium: {
    fontSize: labelSizes.medium,
  },
  large: {
    fontSize: labelSizes.large,
  },
});

const useDividerStyles = makeStyles({
  root: {
    verticalAlign: 'top',
    ...shorthands.margin('0px', '1px', '0px', '1px'),
    fontWeight: tokens.fontWeightMedium,
  },
  small: {
    fontSize: labelSizes.small,
  },
  medium: {
    fontSize: labelSizes.medium,
  },
  large: {
    fontSize: labelSizes.large,
  },
  hidden: {
    display: 'none',
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
  const dividerStyles = useDividerStyles();
  state.root.className = mergeClasses(ratingClassNames.root, styles, state.root.className);
  if (state.ratingLabel) {
    state.ratingLabel.className = mergeClasses(
      ratingClassNames.ratingCountLabel,
      labelStyles,
      ratingLabelStyles.root,
      ratingLabelStyles[state.size],
      state.ratingLabel.className,
    );
  }
  if (state.ratingCountLabel) {
    state.ratingCountLabel.className = mergeClasses(
      ratingClassNames.ratingCountLabel,
      labelStyles,
      ratingCountStyles.root,
      ratingCountStyles[state.size],
      state.ratingCountLabel.className,
    );
  }
  if (state.divider) {
    state.divider.className = mergeClasses(
      ratingClassNames.divider,
      dividerStyles.root,
      dividerStyles[state.size],
      !state.countLabel && dividerStyles.hidden,
      !state.valueLabel && dividerStyles.hidden,
      state.divider.className,
    );
  }

  return state;
};

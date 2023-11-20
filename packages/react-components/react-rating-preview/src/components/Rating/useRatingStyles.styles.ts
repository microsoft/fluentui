import { createFocusOutlineStyle } from '@fluentui/react-tabster';
import { makeResetStyles, makeStyles, mergeClasses /*shorthands*/, shorthands } from '@griffel/react';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { RatingSlots, RatingState } from './Rating.types';
import { tokens, typographyStyles } from '@fluentui/react-theme';

export const ratingClassNames: SlotClassNames<RatingSlots> = {
  root: 'fui-Rating',
  ratingLabel: 'fui-Rating__ratingLabel',
  ratingCountLabel: 'fui-Rating__countLabel',
};

/**
 * Styles for the root slot
 */

const useStyles = makeResetStyles({
  display: 'flex',
  alignItems: 'center',
  color: tokens.colorNeutralForeground1,
  ...createFocusOutlineStyle({ style: {}, selector: 'focus' }),
});

const useBaseLabelStyles = makeResetStyles({
  color: tokens.colorNeutralForeground1,
  ...shorthands.margin('0px', '2px'),
  ...typographyStyles.caption1,
  lineHeight: '1',
});

const useLabelStyles = makeStyles({
  large: {
    ...typographyStyles.body1,
  },
  strong: {
    fontWeight: tokens.fontWeightSemibold,
  },
  divider: {
    '::before': {
      content: '"· "',
    },
  },
});

/**
 * Apply styling to the Rating slots based on the state
 */
export const useRatingStyles_unstable = (state: RatingState): RatingState => {
  const styles = useStyles();
  const labelBaseStyles = useBaseLabelStyles();
  const labelStyles = useLabelStyles();
  state.root.className = mergeClasses(ratingClassNames.root, styles, state.root.className);
  if (state.ratingLabel) {
    state.ratingLabel.className = mergeClasses(
      ratingClassNames.ratingCountLabel,
      labelBaseStyles,
      labelStyles.strong,
      state.size === 'large' && labelStyles.large,
      state.ratingLabel.className,
    );
  }
  if (state.ratingCountLabel) {
    state.ratingCountLabel.className = mergeClasses(
      ratingClassNames.ratingCountLabel,
      labelBaseStyles,
      state.size === 'large' && labelStyles.large,
      state.ratingLabel && labelStyles.divider,
      state.ratingCountLabel.className,
    );
  }

  return state;
};

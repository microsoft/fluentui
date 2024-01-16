import { makeResetStyles, makeStyles, mergeClasses, shorthands } from '@griffel/react';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { RatingDisplaySlots, RatingDisplayState } from './RatingDisplay.types';
import { tokens, typographyStyles } from '@fluentui/react-theme';

export const ratingDisplayClassNames: SlotClassNames<RatingDisplaySlots> = {
  root: 'fui-RatingDisplay',
  ratingDisplayLabel: 'fui-RatingDisplay__ratingDisplayLabel',
  ratingDisplayCountLabel: 'fui-RatingDisplay__ratingDisplayCountLabel',
};

/**
 * Styles for the root slot
 */

const useRootClassName = makeResetStyles({
  display: 'flex',
  alignItems: 'center',
  color: tokens.colorNeutralForeground1,
});

const useLabelClassName = makeResetStyles({
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
 * Apply styling to the RatingDisplay slots based on the state
 */
export const useRatingDisplayStyles_unstable = (state: RatingDisplayState): RatingDisplayState => {
  const styles = useRootClassName();
  state.root.className = mergeClasses(ratingDisplayClassNames.root, styles, state.root.className);
  const labelBaseStyles = useLabelClassName();
  const labelStyles = useLabelStyles();

  if (state.ratingDisplayLabel) {
    state.ratingDisplayLabel.className = mergeClasses(
      ratingDisplayClassNames.ratingDisplayLabel,
      labelBaseStyles,
      labelStyles.strong,
      state.size === 'large' && labelStyles.large,
      state.ratingDisplayLabel.className,
    );
  }
  if (state.ratingDisplayCountLabel) {
    state.ratingDisplayCountLabel.className = mergeClasses(
      ratingDisplayClassNames.ratingDisplayCountLabel,
      labelBaseStyles,
      state.size === 'large' && labelStyles.large,
      state.ratingDisplayLabel && labelStyles.divider,
      state.ratingDisplayCountLabel.className,
    );
  }

  return state;
};

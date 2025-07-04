import { makeResetStyles, makeStyles, mergeClasses } from '@griffel/react';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { RatingDisplaySlots, RatingDisplayState } from './RatingDisplay.types';
import { tokens, typographyStyles } from '@fluentui/react-theme';

export const ratingDisplayClassNames: SlotClassNames<RatingDisplaySlots> = {
  root: 'fui-RatingDisplay',
  valueText: 'fui-RatingDisplay__valueText',
  countText: 'fui-RatingDisplay__countText',
};

/**
 * Styles for the root slot
 */

const useRootClassName = makeResetStyles({
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
});

const useLabelClassName = makeResetStyles({
  color: tokens.colorNeutralForeground1,
  marginLeft: tokens.spacingHorizontalXS,
  ...typographyStyles.caption1,
});

const useLabelStyles = makeStyles({
  large: {
    fontSize: tokens.fontSizeBase300,
    lineHeight: tokens.lineHeightBase300,
    marginLeft: tokens.spacingHorizontalSNudge,
  },
  extraLarge: {
    fontSize: tokens.fontSizeBase400,
    lineHeight: tokens.lineHeightBase400,
    marginLeft: tokens.spacingHorizontalS,
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
  'use no memo';

  const { size } = state;
  const rootClassName = useRootClassName();
  state.root.className = mergeClasses(ratingDisplayClassNames.root, rootClassName, state.root.className);
  const labelClassName = useLabelClassName();
  const labelStyles = useLabelStyles();

  if (state.valueText) {
    state.valueText.className = mergeClasses(
      ratingDisplayClassNames.valueText,
      labelClassName,
      labelStyles.strong,
      size === 'large' && labelStyles.large,
      size === 'extra-large' && labelStyles.extraLarge,
      state.valueText.className,
    );
  }
  if (state.countText) {
    state.countText.className = mergeClasses(
      ratingDisplayClassNames.countText,
      labelClassName,
      size === 'large' && labelStyles.large,
      size === 'extra-large' && labelStyles.extraLarge,
      state.valueText && labelStyles.divider,
      state.countText.className,
    );
  }

  return state;
};

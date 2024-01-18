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
  alignItems: 'center',
});

const useLabelClassName = makeResetStyles({
  color: tokens.colorNeutralForeground1,
  margin: '0 2px',
  ...typographyStyles.caption1,
  lineHeight: '1',
});

const useLabelStyles = makeStyles({
  small: {
    fontSize: tokens.fontSizeBase100,
    lineHeight: tokens.lineHeightBase100,
  },
  medium: {
    fontSize: tokens.fontSizeBase200,
    lineHeight: tokens.lineHeightBase200,
  },
  large: {
    fontSize: tokens.fontSizeBase300,
    lineHeight: tokens.lineHeightBase300,
  },
  'extra-large': {
    fontSize: tokens.fontSizeBase300,
    lineHeight: tokens.lineHeightBase300,
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
  const { size } = state;
  const styles = useRootClassName();
  state.root.className = mergeClasses(ratingDisplayClassNames.root, styles, state.root.className);
  const labelBaseStyles = useLabelClassName();
  const labelStyles = useLabelStyles();

  if (state.valueText) {
    state.valueText.className = mergeClasses(
      ratingDisplayClassNames.valueText,
      labelBaseStyles,
      labelStyles.strong,
      state.size && labelStyles[size],
      state.valueText.className,
    );
  }
  if (state.countText) {
    state.countText.className = mergeClasses(
      ratingDisplayClassNames.countText,
      labelBaseStyles,
      state.size === 'large' && labelStyles.large,
      state.countText && labelStyles.divider,
      state.countText.className,
    );
  }

  return state;
};

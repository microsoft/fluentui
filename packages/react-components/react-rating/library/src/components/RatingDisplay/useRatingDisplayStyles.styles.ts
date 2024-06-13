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
  color: `var(--ctrl-token-RatingDisplay-1547, var(--semantic-token-RatingDisplay-1548, ${tokens.colorNeutralForeground1}))`,
  marginLeft: `var(--ctrl-token-RatingDisplay-1549, var(--semantic-token-RatingDisplay-1550, ${tokens.spacingHorizontalXS}))`,
  ...typographyStyles.caption1,
});

const useLabelStyles = makeStyles({
  large: {
    fontSize: `var(--ctrl-token-RatingDisplay-1551, var(--semantic-token-RatingDisplay-1552, ${tokens.fontSizeBase300}))`,
    lineHeight: `var(--ctrl-token-RatingDisplay-1553, var(--semantic-token-RatingDisplay-1554, ${tokens.lineHeightBase300}))`,
    marginLeft: `var(--ctrl-token-RatingDisplay-1555, var(--semantic-token-RatingDisplay-1556, ${tokens.spacingHorizontalSNudge}))`,
  },
  extraLarge: {
    fontSize: `var(--ctrl-token-RatingDisplay-1557, var(--semantic-token-RatingDisplay-1558, ${tokens.fontSizeBase400}))`,
    lineHeight: `var(--ctrl-token-RatingDisplay-1559, var(--semantic-token-RatingDisplay-1560, ${tokens.lineHeightBase400}))`,
    marginLeft: `var(--ctrl-token-RatingDisplay-1561, var(--semantic-token-RatingDisplay-1562, ${tokens.spacingHorizontalS}))`,
  },
  strong: {
    fontWeight: `var(--ctrl-token-RatingDisplay-1563, var(--semantic-token-RatingDisplay-1564, ${tokens.fontWeightSemibold}))`,
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

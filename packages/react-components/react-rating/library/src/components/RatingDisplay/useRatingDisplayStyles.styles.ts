import { makeResetStyles, makeStyles, mergeClasses } from '@griffel/react';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { RatingDisplaySlots, RatingDisplayState } from './RatingDisplay.types';
import * as semanticTokens from '@fluentui/semantic-tokens';

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
  color: semanticTokens.foregroundCtrlNeutralPrimaryRest,
  marginLeft: semanticTokens.gapInsideCtrlSmToLabel,
  fontFamily: semanticTokens.textStyleDefaultRegularFontFamily,
  fontSize: semanticTokens.textRampSmItemBodyFontSize,
  fontWeight: semanticTokens.textStyleDefaultRegularWeight,
  lineHeight: semanticTokens.textRampSmItemBodyLineHeight,
});

const useLabelStyles = makeStyles({
  large: {
    fontSize: semanticTokens.textRampItemBodyFontSize,
    lineHeight: semanticTokens.textRampItemBodyLineHeight,
    marginLeft: semanticTokens.gapInsideCtrlToLabel,
  },
  extraLarge: {
    fontSize: semanticTokens.textRampLgItemBodyFontSize,
    lineHeight: semanticTokens.textRampLgItemBodyLineHeight,
    marginLeft: semanticTokens.gapInsideCtrlLgToLabel,
  },
  strong: {
    fontWeight: semanticTokens.textStyleDefaultHeaderWeight,
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

import { makeResetStyles, makeStyles, mergeClasses } from '@griffel/react';
import * as semanticTokens from '@fluentui/semantic-tokens';
import { ratingDisplayClassNames, type RatingDisplayState } from '@fluentui/react-rating';
import { getSlotClassNameProp_unstable } from '@fluentui/react-utilities';

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
export const useSemanticRatingDisplayStyles = (_state: unknown): RatingDisplayState => {
  'use no memo';

  const state = _state as RatingDisplayState;

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
      getSlotClassNameProp_unstable(state.valueText),
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
      getSlotClassNameProp_unstable(state.countText),
    );
  }

  return state;
};

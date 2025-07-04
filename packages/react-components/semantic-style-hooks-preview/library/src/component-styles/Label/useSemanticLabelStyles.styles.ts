import { makeStyles, mergeClasses } from '@griffel/react';
import { tokens } from '@fluentui/react-theme';
import * as semanticTokens from '@fluentui/semantic-tokens';
import { labelClassNames, type LabelState } from '@fluentui/react-label';
import { getSlotClassNameProp_unstable } from '@fluentui/react-utilities';

/**
 * Styles for the label
 */
const useStyles = makeStyles({
  root: {
    fontFamily: semanticTokens.textStyleDefaultRegularFontFamily,
    color: semanticTokens.foregroundContentNeutralPrimary,
    fontWeight: semanticTokens.textStyleDefaultRegularWeight,
  },

  disabled: {
    color: semanticTokens.foregroundCtrlNeutralPrimaryDisabled,
    '@media (forced-colors: active)': {
      color: 'GrayText',
    },
  },

  required: {
    color: semanticTokens.statusDangerTintForeground,
    paddingLeft: tokens.spacingHorizontalXS,
  },

  small: {
    fontSize: semanticTokens.textGlobalCaption1FontSize,
    lineHeight: semanticTokens.textGlobalCaption1LineHeight,
  },

  medium: {
    fontSize: semanticTokens.textGlobalBody3FontSize,
    lineHeight: semanticTokens.textGlobalBody3LineHeight,
  },

  large: {
    fontSize: semanticTokens.textGlobalBody2FontSize,
    lineHeight: semanticTokens.textGlobalBody2LineHeight,
    fontWeight: tokens.fontWeightSemibold,
  },

  semibold: {
    fontWeight: tokens.fontWeightSemibold,
  },
});

/**
 * Apply styling to the Label slots based on the state
 */
export const useSemanticLabelStyles = (_state: unknown): LabelState => {
  'use no memo';

  const state = _state as LabelState;

  const styles = useStyles();
  state.root.className = mergeClasses(
    state.root.className,
    labelClassNames.root,
    styles.root,
    state.disabled && styles.disabled,
    styles[state.size],
    state.weight === 'semibold' && styles.semibold,
    getSlotClassNameProp_unstable(state.root),
  );

  if (state.required) {
    state.required.className = mergeClasses(
      state.required.className,
      labelClassNames.required,
      styles.required,
      state.disabled && styles.disabled,
      getSlotClassNameProp_unstable(state.required),
    );
  }

  return state;
};

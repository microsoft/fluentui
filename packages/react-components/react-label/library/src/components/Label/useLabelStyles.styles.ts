import { makeStyles, mergeClasses } from '@griffel/react';
import { tokens } from '@fluentui/react-theme';
import type { LabelSlots, LabelState } from './Label.types';
import type { SlotClassNames } from '@fluentui/react-utilities';
import * as semanticTokens from '@fluentui/semantic-tokens';

export const labelClassNames: SlotClassNames<LabelSlots> = {
  root: 'fui-Label',
  required: 'fui-Label__required',
};

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
export const useLabelStyles_unstable = (state: LabelState): LabelState => {
  'use no memo';

  const styles = useStyles();
  state.root.className = mergeClasses(
    labelClassNames.root,
    styles.root,
    state.disabled && styles.disabled,
    styles[state.size],
    state.weight === 'semibold' && styles.semibold,
    state.root.className,
  );

  if (state.required) {
    state.required.className = mergeClasses(
      labelClassNames.required,
      styles.required,
      state.disabled && styles.disabled,
      state.required.className,
    );
  }

  return state;
};

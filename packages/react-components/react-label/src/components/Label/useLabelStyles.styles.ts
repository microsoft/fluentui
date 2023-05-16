import { makeStyles, mergeClasses } from '@griffel/react';
import { tokens } from '@fluentui/react-theme';
import type { LabelSlots, LabelState } from './Label.types';
import type { SlotClassNames } from '@fluentui/react-utilities';

export const labelClassNames: SlotClassNames<LabelSlots> = {
  root: 'fui-Label',
  required: 'fui-Label__required',
};

/**
 * Styles for the label
 */
const useStyles = makeStyles({
  root: {
    fontFamily: tokens.fontFamilyBase,
    color: tokens.colorNeutralForeground1,
  },

  disabled: {
    color: tokens.colorNeutralForegroundDisabled,
  },

  required: {
    color: tokens.colorPaletteRedForeground3,
    paddingLeft: '4px', // TODO: Once spacing tokens are added, change this to Horizontal XS
  },

  requiredDisabled: {
    color: tokens.colorNeutralForegroundDisabled,
  },

  small: {
    fontSize: tokens.fontSizeBase200,
    lineHeight: tokens.lineHeightBase200,
  },

  medium: {
    fontSize: tokens.fontSizeBase300,
    lineHeight: tokens.lineHeightBase300,
  },

  large: {
    fontSize: tokens.fontSizeBase400,
    lineHeight: tokens.lineHeightBase400,
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
      state.disabled && styles.requiredDisabled,
      state.required.className,
    );
  }

  return state;
};

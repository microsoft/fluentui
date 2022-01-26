import { makeStyles, mergeClasses } from '@griffel/react';
import { tokens } from '@fluentui/react-theme';
import type { LabelState } from './Label.types';

export const labelClassName = 'fui-Label';

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

  strong: {
    fontWeight: tokens.fontWeightSemibold,
  },
});

/**
 * Apply styling to the Label slots based on the state
 */
export const useLabelStyles_unstable = (state: LabelState): LabelState => {
  const styles = useStyles();
  state.root.className = mergeClasses(
    labelClassName,
    styles.root,
    state.disabled && styles.disabled,
    styles[state.size],
    state.strong && styles.strong,
    state.root.className,
  );

  if (state.required) {
    state.required.className = mergeClasses(styles.required, state.required.className);
  }

  return state;
};

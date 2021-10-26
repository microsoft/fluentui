import { makeStyles, mergeClasses } from '@fluentui/react-make-styles';
import type { LabelState } from './Label.types';

/**
 * Styles for the label
 */
const useStyles = makeStyles({
  root: theme => ({
    fontFamily: theme.fontFamilyBase,
    color: theme.colorNeutralForeground1,
  }),

  disabled: theme => ({
    color: theme.colorNeutralForegroundDisabled,
  }),

  required: theme => ({
    color: theme.colorPaletteRedForeground3,
    paddingLeft: '4px', // TODO: Once spacing tokens are added, change this to Horizontal XS
  }),

  small: theme => ({
    fontSize: theme.fontSizeBase200,
    lineHeight: theme.lineHeightBase200,
  }),

  medium: theme => ({
    fontSize: theme.fontSizeBase300,
    lineHeight: theme.lineHeightBase300,
  }),

  large: theme => ({
    fontSize: theme.fontSizeBase400,
    lineHeight: theme.lineHeightBase400,
    fontWeight: theme.fontWeightSemibold,
  }),

  strong: theme => ({
    fontWeight: theme.fontWeightSemibold,
  }),
});

/**
 * Apply styling to the Label slots based on the state
 */
export const useLabelStyles = (state: LabelState): LabelState => {
  const styles = useStyles();
  state.root.className = mergeClasses(
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

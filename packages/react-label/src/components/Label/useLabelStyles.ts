import { makeStyles, mergeClasses } from '@fluentui/react-make-styles';
import { LabelState } from './Label.types';

/**
 * Styles for the label
 */
const useStyles = makeStyles({
  root: theme => ({
    fontFamily: theme.global.type.fontFamilies.base,
    fontSize: theme.global.type.fontSizes.base[300],
    color: theme.alias.color.neutral.neutralForeground1,
  }),

  disabled: theme => ({
    color: theme.alias.color.neutral.neutralForegroundDisabled,
  }),
});

/**
 * Apply styling to the Label slots based on the state
 */
export const useLabelStyles = (state: LabelState): LabelState => {
  const styles = useStyles();
  state.className = mergeClasses(styles.root, state.disabled && styles.disabled, state.className);

  return state;
};

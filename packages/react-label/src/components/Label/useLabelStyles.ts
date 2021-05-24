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
    display: 'inline-flex',
    alignItems: 'center',
  }),

  disabled: theme => ({
    color: theme.alias.color.neutral.neutralForegroundDisabled,
  }),

  info: theme => ({
    margin: 0,
    padding: 0,
  }),

  requiredText: theme => ({
    color: theme.alias.color.red.foreground3,
    fontSize: theme.global.type.fontSizes.base[300],
    paddingLeft: '4px',
  }),
});

/**
 * Apply styling to the Label slots based on the state
 */
export const useLabelStyles = (state: LabelState): LabelState => {
  const styles = useStyles();
  state.className = mergeClasses(styles.root, state.disabled && styles.disabled, state.className);

  if (state.info) {
    state.info.className = mergeClasses(styles.info, state.info.className);
  }

  if (state.requiredText) {
    state.requiredText.className = mergeClasses(styles.requiredText, state.requiredText.className);
  }

  return state;
};

import { makeStyles, mergeClasses } from '@fluentui/react-make-styles';
import { CheckboxState } from './Checkbox.types';

/**
 * Styles for the root slot
 */
const useStyles = makeStyles({
  root: theme => ({
    display: 'flex',
    alignItems: 'center',
  }),

  checkbox: theme => ({
    border: theme.global.strokeWidth.thin,
  }),

  medium: theme => ({
    width: '16px',
    height: '16px',
    borderRadius: theme.global.borderRadius.small,
  }),

  large: theme => ({
    width: '20px',
    height: '20px',
    borderRadius: theme.global.borderRadius.small,
  }),
});

/**
 * Apply styling to the Checkbox slots based on the state
 */
export const useCheckboxStyles = (state: CheckboxState): CheckboxState => {
  const styles = useStyles();
  state.className = mergeClasses(styles.root, state.className);

  state.checkboxClassName = mergeClasses(styles.checkbox, state.size && styles[state.size]);

  return state;
};

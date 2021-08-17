import { makeStyles, mergeClasses } from '@fluentui/react-make-styles';
import { SwitchState } from './Switch.types';

/**
 * Styles for the root slot
 */
const useStyles = makeStyles({
  root: theme => ({}),
});

/**
 * Apply styling to the Switch slots based on the state
 */
export const useSwitchStyles = (state: SwitchState): SwitchState => {
  const styles = useStyles();
  state.className = mergeClasses(styles.root, state.className);

  return state;
};

import { makeStyles, mergeClasses } from '@fluentui/react-make-styles';
import { PopoverContentState } from './PopoverContent.types';

/**
 * Styles for the root slot
 */
const useStyles = makeStyles({
  root: theme => ({
    backgroundColor: theme.alias.color.neutral.neutralBackground1,
    boxShadow: theme.alias.shadow.shadow16,
  }),
});

/**
 * Apply styling to the PopoverContent slots based on the state
 */
export const usePopoverContentStyles = (state: PopoverContentState): PopoverContentState => {
  const styles = useStyles();
  state.className = mergeClasses(styles.root, state.className);

  return state;
};

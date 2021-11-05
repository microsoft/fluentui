import { makeStyles, mergeClasses } from '@fluentui/react-make-styles';
import type { TabListState } from './TabList.types';

/**
 * Styles for the root slot
 */
const useStyles = makeStyles({
  root: theme => ({
    display: 'flex',
    flexDirection: 'row',
  }),

  // TODO add additional classes for different states and/or slots
});

/**
 * Apply styling to the TabList slots based on the state
 */
export const useTabListStyles = (state: TabListState): TabListState => {
  const styles = useStyles();
  state.root.className = mergeClasses(styles.root, state.root.className);

  // TODO Add class names to slots, for example:
  // state.mySlot.className = mergeClasses(styles.mySlot, state.mySlot.className);

  return state;
};

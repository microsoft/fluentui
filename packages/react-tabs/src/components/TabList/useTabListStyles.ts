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
  vertical: {
    flexDirection: 'column',
  },
});

/**
 * Apply styling to the TabList slots based on the state
 */
export const useTabListStyles = (state: TabListState): TabListState => {
  const styles = useStyles();
  state.root.className = mergeClasses(styles.root, state.vertical && styles.vertical, state.root.className);

  // TODO Add class names to slots, for example:
  // state.mySlot.className = mergeClasses(styles.mySlot, state.mySlot.className);

  return state;
};

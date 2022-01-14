import { makeStyles, mergeClasses } from '@fluentui/react-make-styles';
import type { TabListState } from './TabList.types';

export const tabListClassName = 'fui-TabList';

/**
 * Styles for the root slot
 */
const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'row',
  },
  vertical: {
    flexDirection: 'column',
  },
});

/**
 * Apply styling to the TabList slots based on the state
 */
export const useTabListStyles = (state: TabListState): TabListState => {
  const styles = useStyles();
  state.root.className = mergeClasses(
    tabListClassName,
    styles.root,
    state.vertical && styles.vertical,
    state.root.className,
  );
  return state;
};

import { SlotClassNames } from '@fluentui/react-utilities';
import { makeStyles, mergeClasses, shorthands } from '@griffel/react';
import type { TabListSlots, TabListState } from './TabList.types';

export const tabListClassNames: SlotClassNames<TabListSlots> = {
  root: 'fui-TabList',
};

// TODO temporary export to pass conformance test.
export const tabListClassName = tabListClassNames.root;

/**
 * Styles for the root slot
 */
const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    flexShrink: 0,
    position: 'relative',
    ...shorthands.overflow('hidden'),
  },
  horizontal: {
    alignItems: 'center',
    flexDirection: 'row',
    minWidth: '0',
    width: '100%',
  },
  vertical: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    minHeight: '0',
    height: '100%',
  },
});

/**
 * Apply styling to the TabList slots based on the state
 */
export const useTabListStyles_unstable = (state: TabListState): TabListState => {
  const { vertical } = state;

  const styles = useStyles();

  state.root.className = mergeClasses(
    tabListClassName,
    styles.root,
    vertical ? styles.vertical : styles.horizontal,
    state.root.className,
  );

  return state;
};

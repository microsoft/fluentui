import { makeStyles, mergeClasses, shorthands } from '@griffel/react';
import type { TabListSlots, TabListState } from './TabList.types';
import { tokens } from '@fluentui/react-theme';
import { SlotClassNames, usePrevious } from '@fluentui/react-utilities';
import { tabPendingDesignTokens } from '../../tab.constants';

/**
 * @deprecated Use `tabListClassNames.root` instead.
 */
export const tabListClassName = 'fui-TabList';
export const tabListSelectionIndicatorName = 'fui-TabList__selectionIndicator';
export const tabListClassNames: SlotClassNames<TabListSlots> = {
  root: 'fui-TabList',
};

export const indicatorOffsetVar = '--selection-indicator-offset';
export const indicatorLengthVar = '--selection-indicator-length';

/**
 * Styles for the root slot
 */
const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'row',
    position: 'relative',
  },
  vertical: {
    flexDirection: 'column',
  },
});

/**
 * Apply styling to the TabList slots based on the state
 */
export const useTabListStyles_unstable = (state: TabListState): TabListState => {
  const { vertical } = state;

  const styles = useStyles();

  state.root.className = mergeClasses(
    tabListClassNames.root,
    styles.root,
    vertical && styles.vertical,
    state.root.className,
  );

  return state;
};

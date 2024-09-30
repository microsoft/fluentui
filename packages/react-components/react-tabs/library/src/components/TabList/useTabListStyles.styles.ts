import { SlotClassNames } from '@fluentui/react-utilities';
import { makeStyles, mergeClasses } from '@griffel/react';
import { tokens } from '@fluentui/react-theme';
import type { TabListSlots, TabListState } from './TabList.types';

export const tabListClassNames: SlotClassNames<TabListSlots> = {
  root: 'fui-TabList',
};

/**
 * Styles for the root slot
 */
const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'row',
    flexShrink: 0,
    flexWrap: 'nowrap',
    position: 'relative',
  },
  horizontal: {
    alignItems: 'stretch',
    flexDirection: 'row',
  },
  vertical: {
    alignItems: 'stretch',
    flexDirection: 'column',
  },
  circularSmall: {
    gap: tokens.spacingHorizontalSNudge,
  },
  circular: {
    gap: tokens.spacingHorizontalS,
  },
});

/**
 * Apply styling to the TabList slots based on the state
 */
export const useTabListStyles_unstable = (state: TabListState): TabListState => {
  'use no memo';

  const { vertical, shape, size } = state;

  const styles = useStyles();

  state.root.className = mergeClasses(
    tabListClassNames.root,
    styles.root,
    vertical ? styles.vertical : styles.horizontal,
    shape === 'circular' && (size === 'small' ? styles.circularSmall : styles.circular),
    state.root.className,
  );

  return state;
};

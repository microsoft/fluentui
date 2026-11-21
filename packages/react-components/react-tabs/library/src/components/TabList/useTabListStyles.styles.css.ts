import { clsx } from 'clsx';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { TabListSlots, TabListState } from './TabList.types';
import styles from './TabList.module.css';

export const tabListClassNames: SlotClassNames<TabListSlots> = {
  root: 'fui-TabList',
};

/**
 * Apply styling to the TabList slots based on the state
 */
export const useTabListStyles_unstable = (state: TabListState): TabListState => {
  const { appearance, vertical, size } = state;

  state.root.className = clsx(
    tabListClassNames.root,
    styles.root,
    vertical ? styles.vertical : styles.horizontal,
    appearance && styles[appearance],
    size === 'small' && styles.small,
    state.root.className,
  );

  return state;
};

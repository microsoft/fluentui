import clsx from 'clsx';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { TabListSlots, TabListState } from './TabList.types';
import styles from './TabList.module.css';

export const tabListClassNames: SlotClassNames<TabListSlots> = {
  root: 'fui-TabList',
};

export const useTabListStyles = (state: TabListState): TabListState => {
  state.root.className = clsx(tabListClassNames.root, styles.root, state.root.className);

  return state;
};

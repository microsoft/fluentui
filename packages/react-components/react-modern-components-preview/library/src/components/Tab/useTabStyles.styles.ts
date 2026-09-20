import clsx from 'clsx';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { TabSlots, TabState } from './Tab.types';
import styles from './Tab.module.css';

export const tabClassNames: SlotClassNames<TabSlots> = {
  root: 'fui-Tab',
  icon: 'fui-Tab__icon',
  content: 'fui-Tab__content',
};

export const tabReservedSpaceClassNames = {
  content: 'fui-Tab__content--reserved-space',
};

export const useTabStyles = (state: TabState): TabState => {
  state.root.className = clsx(tabClassNames.root, styles.root, state.root.className);
  state.content.className = clsx(tabClassNames.content, styles.content, state.content.className);

  if (state.icon) {
    state.icon.className = clsx(tabClassNames.icon, styles.icon, state.icon.className);
  }

  if (state.contentReservedSpace) {
    state.contentReservedSpace.className = clsx(
      tabReservedSpaceClassNames.content,
      styles.content,
      styles.contentReservedSpace,
      state.contentReservedSpace.className,
    );
  }

  return state;
};

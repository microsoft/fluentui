'use client';

import { clsx } from 'clsx';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { NavSubItemSlots, NavSubItemState } from './NavSubItem.types';
import { useRootDefaultClassName } from '../sharedNavStyles.styles.css';
import sharedStyles from '../sharedNavStyles.module.css';
import styles from './NavSubItem.module.css';

export const navSubItemClassNames: SlotClassNames<NavSubItemSlots> = {
  root: 'fui-NavSubItem',
};

export const useNavSubItemStyles_unstable = (state: NavSubItemState): NavSubItemState => {
  const rootDefaultClassName = useRootDefaultClassName();
  // eslint-disable-next-line react-hooks/immutability
  state.root.className = clsx(
    navSubItemClassNames.root,
    rootDefaultClassName,
    styles.root,
    sharedStyles[state.density],
    state.selected && sharedStyles.selected,
    state.selected && sharedStyles.indicator,
    state.selected && sharedStyles.contentSelected,
    state.selected && styles.selected,
    state.root.className,
  );
  return state;
};

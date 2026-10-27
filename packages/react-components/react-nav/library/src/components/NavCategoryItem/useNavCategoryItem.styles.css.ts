'use client';

import { clsx } from 'clsx';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { NavCategoryItemSlots, NavCategoryItemState } from './NavCategoryItem.types';
import { useRootDefaultClassName } from '../sharedNavStyles.styles.css';
import sharedStyles from '../sharedNavStyles.module.css';
import styles from './NavCategoryItem.module.css';

export const navCategoryItemClassNames: SlotClassNames<NavCategoryItemSlots> = {
  root: 'fui-NavCategoryItem',
  icon: 'fui-NavCategoryItem__icon',
  expandIcon: 'fui-NavCategoryItem__expandIcon',
  expandIconMotion: 'fui-NavCategoryItem__expandIconMotion',
};

export const useRootStyles = (): Record<'base', string> => ({ base: styles.root });

export const useNavCategoryItemStyles_unstable = (state: NavCategoryItemState): NavCategoryItemState => {
  const rootDefaultClassName = useRootDefaultClassName();
  // eslint-disable-next-line react-hooks/immutability
  state.root.className = clsx(
    navCategoryItemClassNames.root,
    rootDefaultClassName,
    styles.root,
    sharedStyles[state.density],
    state.selected && sharedStyles.selected,
    state.selected && state.open === false && sharedStyles.indicator,
    state.selected && state.open === false && sharedStyles.contentSelected,
    state.root.className,
  );
  // eslint-disable-next-line react-hooks/immutability
  state.expandIcon.className = clsx(
    navCategoryItemClassNames.expandIcon,
    styles.expandIcon,
    state.expandIcon.className,
  );
  if (state.icon) {
    // eslint-disable-next-line react-hooks/immutability
    state.icon.className = clsx(navCategoryItemClassNames.icon, sharedStyles.icon, state.icon.className);
  }
  return state;
};

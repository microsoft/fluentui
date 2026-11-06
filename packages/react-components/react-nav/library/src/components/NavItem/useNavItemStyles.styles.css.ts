'use client';

import { clsx } from 'clsx';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { NavItemSlots, NavItemState } from './NavItem.types';
import { useRootDefaultClassName } from '../sharedNavStyles.styles.css';
import sharedStyles from '../sharedNavStyles.module.css';
import './NavItem.module.css';

export const navItemClassNames: SlotClassNames<NavItemSlots> = {
  root: 'fui-NavItem',
  icon: 'fui-NavItem__icon',
};

export const useNavItemStyles_unstable = (state: NavItemState): NavItemState => {
  const rootDefaultClassName = useRootDefaultClassName();
  // eslint-disable-next-line react-hooks/immutability
  state.root.className = clsx(
    navItemClassNames.root,
    rootDefaultClassName,
    sharedStyles[state.density],
    state.selected && sharedStyles.selected,
    state.selected && sharedStyles.indicator,
    state.selected && sharedStyles.contentSelected,
    state.root.className,
  );
  if (state.icon) {
    // eslint-disable-next-line react-hooks/immutability
    state.icon.className = clsx(navItemClassNames.icon, sharedStyles.icon, state.icon.className);
  }
  return state;
};

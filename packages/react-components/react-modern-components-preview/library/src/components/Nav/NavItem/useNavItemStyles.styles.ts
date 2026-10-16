import clsx from 'clsx';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { NavItemSlots, NavItemState } from './NavItem.types';
import styles from './NavItem.module.css';

export const navItemClassNames: SlotClassNames<NavItemSlots> = {
  root: 'fui-NavItem',
  icon: 'fui-NavItem__icon',
};

export const useNavItemStyles = (state: NavItemState): NavItemState => {
  state.root.className = clsx(navItemClassNames.root, styles.root, state.root.className);

  if (state.icon) {
    state.icon.className = clsx(navItemClassNames.icon, styles.icon, state.icon.className);
  }

  return state;
};

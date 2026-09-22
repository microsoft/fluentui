import clsx from 'clsx';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { NavSubItemSlots, NavSubItemState } from './NavSubItem.types';
import navItemStyles from '../NavItem/NavItem.module.css';
import styles from './NavSubItem.module.css';

export const navSubItemClassNames: SlotClassNames<NavSubItemSlots> = {
  root: 'fui-NavSubItem',
};

export const useNavSubItemStyles = (state: NavSubItemState): NavSubItemState => {
  state.root.className = clsx(navSubItemClassNames.root, navItemStyles.root, styles.root, state.root.className);

  return state;
};

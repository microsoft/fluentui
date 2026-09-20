import clsx from 'clsx';
import type { SlotClassNames } from '@fluentui/react-utilities';
import navItemStyles from '../NavItem/NavItem.module.css';
import type { NavCategoryItemSlots, NavCategoryItemState } from './NavCategoryItem.types';
import styles from './NavCategoryItem.module.css';

export const navCategoryItemClassNames: SlotClassNames<NavCategoryItemSlots> = {
  root: 'fui-NavCategoryItem',
  icon: 'fui-NavCategoryItem__icon',
  expandIcon: 'fui-NavCategoryItem__expandIcon',
  expandIconMotion: 'fui-NavCategoryItem__expandIconMotion',
};

export const useNavCategoryItemStyles = (state: NavCategoryItemState): NavCategoryItemState => {
  state.root.className = clsx(navCategoryItemClassNames.root, navItemStyles.root, styles.root, state.root.className);
  state.expandIcon.className = clsx(
    navCategoryItemClassNames.expandIcon,
    navItemStyles.expandIcon,
    state.expandIcon.className,
  );

  if (state.icon) {
    state.icon.className = clsx(navCategoryItemClassNames.icon, navItemStyles.icon, state.icon.className);
  }

  return state;
};

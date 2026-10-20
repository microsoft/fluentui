import clsx from 'clsx';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { MenuGroupHeaderSlots, MenuGroupHeaderState } from './MenuGroupHeader.types';
import styles from './MenuGroupHeader.module.css';

export const menuGroupHeaderClassNames: SlotClassNames<MenuGroupHeaderSlots> = { root: 'fui-MenuGroupHeader' };

export const useMenuGroupHeaderStyles = (state: MenuGroupHeaderState): MenuGroupHeaderState => {
  state.root.className = clsx(menuGroupHeaderClassNames.root, styles.menuGroupHeader, state.root.className);
  return state;
};

import { clsx } from 'clsx';
import type { MenuGroupHeaderSlots, MenuGroupHeaderState } from './MenuGroupHeader.types';
import type { SlotClassNames } from '@fluentui/react-utilities';
import styles from './MenuGroupHeader.module.css';

export const menuGroupHeaderClassNames: SlotClassNames<MenuGroupHeaderSlots> = {
  root: 'fui-MenuGroupHeader',
};

export const useMenuGroupHeaderStyles_unstable = (state: MenuGroupHeaderState): MenuGroupHeaderState => {
  state.root.className = clsx(menuGroupHeaderClassNames.root, styles.root, state.root.className);

  return state;
};

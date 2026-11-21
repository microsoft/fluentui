import { clsx } from 'clsx';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { MenuGridSlots, MenuGridState } from './MenuGrid.types';
import styles from './MenuGrid.module.css';

export const menuGridClassNames: SlotClassNames<MenuGridSlots> = {
  root: 'fui-MenuGrid',
};

export const useMenuGridStyles_unstable = (state: MenuGridState): MenuGridState => {
  state.root.className = clsx(menuGridClassNames.root, styles.root, state.root.className);
  return state;
};

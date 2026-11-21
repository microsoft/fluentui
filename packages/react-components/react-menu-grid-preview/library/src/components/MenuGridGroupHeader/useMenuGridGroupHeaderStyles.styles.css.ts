import { clsx } from 'clsx';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { MenuGridGroupHeaderSlots, MenuGridGroupHeaderState } from './MenuGridGroupHeader.types';
import styles from './MenuGridGroupHeader.module.css';

export const menuGridGroupHeaderClassNames: SlotClassNames<MenuGridGroupHeaderSlots> = {
  root: 'fui-MenuGridGroupHeader',
};

export const useMenuGridGroupHeaderStyles_unstable = (state: MenuGridGroupHeaderState): MenuGridGroupHeaderState => {
  state.root.className = clsx(menuGridGroupHeaderClassNames.root, styles.root, state.root.className);

  return state;
};

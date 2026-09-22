import clsx from 'clsx';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { DrawerHeaderSlots, DrawerHeaderState } from './DrawerHeader.types';
import styles from './DrawerHeader.module.css';

export const drawerHeaderClassNames: SlotClassNames<DrawerHeaderSlots> = {
  root: 'fui-DrawerHeader',
};

export const useDrawerHeaderStyles = (state: DrawerHeaderState): DrawerHeaderState => {
  state.root.className = clsx(drawerHeaderClassNames.root, styles.drawerHeader, state.root.className);
  return state;
};

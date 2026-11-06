import { clsx } from 'clsx';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { DrawerHeaderState, DrawerHeaderSlots } from './DrawerHeader.types';
import styles from './DrawerHeader.module.css';

export const drawerHeaderClassNames: SlotClassNames<DrawerHeaderSlots> = {
  root: 'fui-DrawerHeader',
};

export const useDrawerHeaderStyles_unstable = (state: DrawerHeaderState): DrawerHeaderState => {
  state.root.className = clsx(
    drawerHeaderClassNames.root,
    styles.root,
    styles[state.scrollState],
    state.root.className,
  );
  return state;
};

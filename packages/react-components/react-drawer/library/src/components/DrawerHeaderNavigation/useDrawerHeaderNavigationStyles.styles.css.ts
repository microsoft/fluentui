import { clsx } from 'clsx';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { DrawerHeaderNavigationState, DrawerHeaderNavigationSlots } from './DrawerHeaderNavigation.types';
import styles from './DrawerHeaderNavigation.module.css';

export const drawerHeaderNavigationClassNames: SlotClassNames<DrawerHeaderNavigationSlots> = {
  root: 'fui-DrawerHeaderNavigation',
};

export const useDrawerHeaderNavigationStyles_unstable = (
  state: DrawerHeaderNavigationState,
): DrawerHeaderNavigationState => {
  state.root.className = clsx(drawerHeaderNavigationClassNames.root, styles.root, state.root.className);
  return state;
};

import clsx from 'clsx';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { DrawerHeaderNavigationSlots, DrawerHeaderNavigationState } from './DrawerHeaderNavigation.types';
import styles from './DrawerHeaderNavigation.module.css';

export const drawerHeaderNavigationClassNames: SlotClassNames<DrawerHeaderNavigationSlots> = {
  root: 'fui-DrawerHeaderNavigation',
};

export const useDrawerHeaderNavigationStyles = (state: DrawerHeaderNavigationState): DrawerHeaderNavigationState => {
  state.root.className = clsx(
    drawerHeaderNavigationClassNames.root,
    styles.drawerHeaderNavigation,
    state.root.className,
  );
  return state;
};

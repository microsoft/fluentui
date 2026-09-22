import clsx from 'clsx';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { DrawerBodySlots, DrawerBodyState } from './DrawerBody.types';
import styles from './DrawerBody.module.css';

export const drawerBodyClassNames: SlotClassNames<DrawerBodySlots> = {
  root: 'fui-DrawerBody',
};

export const useDrawerBodyStyles = (state: DrawerBodyState): DrawerBodyState => {
  state.root.className = clsx(drawerBodyClassNames.root, styles.drawerBody, state.root.className);
  return state;
};

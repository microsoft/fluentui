import { clsx } from 'clsx';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { DrawerBodyState, DrawerBodySlots } from './DrawerBody.types';
import styles from './DrawerBody.module.css';

export const drawerBodyClassNames: SlotClassNames<DrawerBodySlots> = {
  root: 'fui-DrawerBody',
};

export const useDrawerBodyStyles_unstable = (state: DrawerBodyState): DrawerBodyState => {
  state.root.className = clsx(drawerBodyClassNames.root, styles.root, state.root.className);
  return state;
};

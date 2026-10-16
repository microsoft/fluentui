import clsx from 'clsx';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { DrawerFooterSlots, DrawerFooterState } from './DrawerFooter.types';
import styles from './DrawerFooter.module.css';

export const drawerFooterClassNames: SlotClassNames<DrawerFooterSlots> = {
  root: 'fui-DrawerFooter',
};

export const useDrawerFooterStyles = (state: DrawerFooterState): DrawerFooterState => {
  state.root.className = clsx(drawerFooterClassNames.root, styles.drawerFooter, state.root.className);
  return state;
};

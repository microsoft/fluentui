import { clsx } from 'clsx';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { DrawerFooterState, DrawerFooterSlots } from './DrawerFooter.types';
import styles from './DrawerFooter.module.css';

export const drawerFooterClassNames: SlotClassNames<DrawerFooterSlots> = {
  root: 'fui-DrawerFooter',
};

export const useDrawerFooterStyles_unstable = (state: DrawerFooterState): DrawerFooterState => {
  state.root.className = clsx(
    drawerFooterClassNames.root,
    styles.root,
    styles[state.scrollState],
    state.root.className,
  );
  return state;
};

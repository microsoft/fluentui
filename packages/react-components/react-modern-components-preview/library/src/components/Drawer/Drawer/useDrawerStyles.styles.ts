import clsx from 'clsx';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { DrawerSlots, DrawerState } from './Drawer.types';

export const drawerClassNames: SlotClassNames<DrawerSlots> = {
  root: 'fui-Drawer',
};

export const useDrawerStyles = (state: DrawerState): DrawerState => {
  state.root.className = clsx(drawerClassNames.root, state.root.className);
  return state;
};

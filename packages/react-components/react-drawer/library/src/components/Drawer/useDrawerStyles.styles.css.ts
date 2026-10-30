import { clsx } from 'clsx';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { DrawerState, DrawerSlots } from './Drawer.types';
export const drawerClassNames: SlotClassNames<Omit<DrawerSlots, 'surfaceMotion'>> = {
  root: 'fui-Drawer',
};

export const useDrawerStyles_unstable = (state: DrawerState): DrawerState => {
  state.root.className = clsx(drawerClassNames.root, state.root.className);
  return state;
};

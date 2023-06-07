import { mergeClasses } from '@griffel/react';
import type { DrawerSlots, DrawerState } from './Drawer.types';
import type { SlotClassNames } from '@fluentui/react-utilities';

export const drawerClassNames: SlotClassNames<DrawerSlots> = {
  root: 'fui-Drawer',
};

/**
 * Apply styling to the Drawer slots based on the state
 */
export const useDrawerStyles_unstable = (state: DrawerState): DrawerState => {
  state.root.className = mergeClasses(drawerClassNames.root, state.root.className);

  return state;
};

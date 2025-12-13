import type { SlotClassNames } from '@fluentui/react-utilities';
import { getComponentSlotClassName } from '@fluentui/react-utilities';
import type { MenuListSlots, MenuListState } from './MenuList.types';

export const menuListClassNames: SlotClassNames<MenuListSlots> = {
  root: 'fui-MenuList',
};

export const useMenuListStyles_unstable = (state: MenuListState): MenuListState => {
  state.root.className = getComponentSlotClassName(menuListClassNames.root, state.root, state);
  return state;
};

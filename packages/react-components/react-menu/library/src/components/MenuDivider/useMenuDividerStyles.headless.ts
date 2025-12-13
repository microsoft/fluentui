import type { SlotClassNames } from '@fluentui/react-utilities';
import { getComponentSlotClassName } from '@fluentui/react-utilities';
import type { MenuDividerSlots, MenuDividerState } from './MenuDivider.types';

export const menuDividerClassNames: SlotClassNames<MenuDividerSlots> = {
  root: 'fui-MenuDivider',
};

export const useMenuDividerStyles_unstable = (state: MenuDividerState): MenuDividerState => {
  state.root.className = getComponentSlotClassName(menuDividerClassNames.root, state.root, state);
  return state;
};

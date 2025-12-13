import type { SlotClassNames } from '@fluentui/react-utilities';
import { getComponentSlotClassName } from '@fluentui/react-utilities';
import type { MenuGroupSlots, MenuGroupState } from './MenuGroup.types';

export const menuGroupClassNames: SlotClassNames<MenuGroupSlots> = {
  root: 'fui-MenuGroup',
};

export const useMenuGroupStyles_unstable = (state: MenuGroupState): MenuGroupState => {
  state.root.className = getComponentSlotClassName(menuGroupClassNames.root, state.root, state);
  return state;
};

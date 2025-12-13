import type { SlotClassNames } from '@fluentui/react-utilities';
import { getComponentSlotClassName } from '@fluentui/react-utilities';
import type { MenuGroupHeaderSlots, MenuGroupHeaderState } from './MenuGroupHeader.types';

export const menuGroupHeaderClassNames: SlotClassNames<MenuGroupHeaderSlots> = {
  root: 'fui-MenuGroupHeader',
};

export const useMenuGroupHeaderStyles_unstable = (state: MenuGroupHeaderState): MenuGroupHeaderState => {
  state.root.className = getComponentSlotClassName(menuGroupHeaderClassNames.root, state.root, state);

  return state;
};

import type { SlotClassNames } from '@fluentui/react-utilities';
import { getComponentSlotClassName } from '@fluentui/react-utilities';
import type { MenuSplitGroupSlots, MenuSplitGroupState } from './MenuSplitGroup.types';

export const menuSplitGroupMultilineAttr = 'data-multiline';

export const menuSplitGroupClassNames: SlotClassNames<MenuSplitGroupSlots> = {
  root: 'fui-MenuSplitGroup',
};

export const useMenuSplitGroupStyles_unstable = (state: MenuSplitGroupState): MenuSplitGroupState => {
  state.root.className = getComponentSlotClassName(menuSplitGroupClassNames.root, state.root, state);
  return state;
};

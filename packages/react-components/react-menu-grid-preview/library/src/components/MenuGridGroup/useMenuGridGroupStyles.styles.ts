import type { SlotClassNames } from '@fluentui/react-utilities';
import { mergeClasses } from '@griffel/react';
import type { MenuGridGroupSlots, MenuGridGroupState } from './MenuGridGroup.types';

export const menuGridGroupClassNames: SlotClassNames<MenuGridGroupSlots> = {
  root: 'fui-MenuGridGroup',
};

export const useMenuGridGroupStyles_unstable = (state: MenuGridGroupState): MenuGridGroupState => {
  state.root.className = mergeClasses(menuGridGroupClassNames.root, state.root.className);

  return state;
};

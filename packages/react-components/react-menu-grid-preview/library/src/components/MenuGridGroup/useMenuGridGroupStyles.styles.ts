import type { SlotClassNames } from '@fluentui/react-utilities';
import { mergeClasses } from '@griffel/react';
import type { MenuGridGroupSlots, MenuGridGroupState } from './MenuGridGroup.types';

export const MenuGridGroupClassNames: SlotClassNames<MenuGridGroupSlots> = {
  root: 'fui-MenuGridGroup',
};

export const useMenuGridGroupStyles_unstable = (state: MenuGridGroupState): MenuGridGroupState => {
  'use no memo';

  state.root.className = mergeClasses(MenuGridGroupClassNames.root, state.root.className);

  return state;
};

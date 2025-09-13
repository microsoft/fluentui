import type { SlotClassNames } from '@fluentui/react-utilities';
import { mergeClasses } from '@griffel/react';
import type { MenuGridRowGroupSlots, MenuGridRowGroupState } from './MenuGridRowGroup.types';

export const menuGridRowGroupClassNames: SlotClassNames<MenuGridRowGroupSlots> = {
  root: 'fui-MenuGridRowGroup',
};

export const useMenuGridRowGroupStyles_unstable = (state: MenuGridRowGroupState): MenuGridRowGroupState => {
  'use no memo';

  state.root.className = mergeClasses(menuGridRowGroupClassNames.root, state.root.className);

  return state;
};

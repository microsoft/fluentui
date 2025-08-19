import type { SlotClassNames } from '@fluentui/react-utilities';
import { mergeClasses } from '@griffel/react';
import type { MenuGridRowSlots, MenuGridRowState } from './MenuGridRow.types';

export const menuGridRowClassNames: SlotClassNames<MenuGridRowSlots> = {
  root: 'fui-MenuGridRow',
};

export const useMenuGridRowStyles_unstable = (state: MenuGridRowState): MenuGridRowState => {
  'use no memo';

  state.root.className = mergeClasses(menuGridRowClassNames.root, state.root.className);

  return state;
};

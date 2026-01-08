import type { SlotClassNames } from '@fluentui/react-utilities';
import { mergeClasses } from '@griffel/react';
import type { MenuGridRowGroupHeaderSlots, MenuGridRowGroupHeaderState } from './MenuGridRowGroupHeader.types';

export const menuGridRowGroupHeaderClassNames: SlotClassNames<MenuGridRowGroupHeaderSlots> = {
  root: 'fui-MenuGridRowGroupHeader',
};

export const useMenuGridRowGroupHeaderStyles_unstable = (
  state: MenuGridRowGroupHeaderState,
): MenuGridRowGroupHeaderState => {
  'use no memo';

  state.root.className = mergeClasses(menuGridRowGroupHeaderClassNames.root, state.root.className);

  return state;
};

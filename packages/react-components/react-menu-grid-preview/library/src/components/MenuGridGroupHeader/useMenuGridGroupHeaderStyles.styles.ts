import type { SlotClassNames } from '@fluentui/react-utilities';
import { mergeClasses } from '@griffel/react';
import type { MenuGridGroupHeaderSlots, MenuGridGroupHeaderState } from './MenuGridGroupHeader.types';

export const MenuGridGroupHeaderClassNames: SlotClassNames<MenuGridGroupHeaderSlots> = {
  root: 'fui-MenuGridGroupHeader',
};

export const useMenuGridGroupHeaderStyles_unstable = (state: MenuGridGroupHeaderState): MenuGridGroupHeaderState => {
  'use no memo';

  state.root.className = mergeClasses(MenuGridGroupHeaderClassNames.root, state.root.className);

  return state;
};

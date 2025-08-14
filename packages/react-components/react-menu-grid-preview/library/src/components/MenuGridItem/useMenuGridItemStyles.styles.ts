import type { SlotClassNames } from '@fluentui/react-utilities';
import { mergeClasses } from '@griffel/react';
import type { MenuGridItemSlots, MenuGridItemState } from './MenuGridItem.types';

export const menuGridItemClassNames: SlotClassNames<MenuGridItemSlots> = {
  root: 'fui-MenuGridItem',
  icon: 'fui-MenuGridRow__iconCell',
  content: 'fui-MenuGridRow__contentCell',
  subText: 'fui-MenuGridRow__subText',
  firstSubAction: 'fui-MenuGridRow__secondActionCell',
  secondSubAction: 'fui-MenuGridRow__thirdActionCell',
};

export const useMenuGridItemStyles_unstable = (state: MenuGridItemState): MenuGridItemState => {
  'use no memo';

  state.root.className = mergeClasses(menuGridItemClassNames.root, state.root.className);

  return state;
};

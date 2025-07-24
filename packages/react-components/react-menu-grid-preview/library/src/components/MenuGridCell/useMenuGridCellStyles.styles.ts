import type { SlotClassNames } from '@fluentui/react-utilities';
import { mergeClasses } from '@griffel/react';
import type { MenuGridCellSlots, MenuGridCellState } from './MenuGridCell.types';

export const menuGridCellClassNames: SlotClassNames<MenuGridCellSlots> = {
  root: 'fui-MenuGridCell',
};

export const useMenuGridCellStyles_unstable = (state: MenuGridCellState): MenuGridCellState => {
  'use no memo';

  state.root.className = mergeClasses(menuGridCellClassNames.root, state.root.className);

  return state;
};

import { mergeClasses } from '@griffel/react';
import { useCheckmarkStyles_unstable } from '../../selectable/index';
import { useMenuItemStyles_unstable } from '../MenuItem/useMenuItemStyles';
import type { MenuItemCheckboxState } from './MenuItemCheckbox.types';

export const menuItemCheckboxClassName = 'fui-MenuItemCheckbox';

export const useMenuItemCheckboxStyles_unstable = (state: MenuItemCheckboxState) => {
  state.root.className = mergeClasses(menuItemCheckboxClassName, state.root.className);

  useMenuItemStyles_unstable(state);
  useCheckmarkStyles_unstable(state);
};

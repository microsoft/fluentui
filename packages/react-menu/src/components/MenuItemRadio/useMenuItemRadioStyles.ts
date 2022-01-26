import { mergeClasses } from '@griffel/react';
import { useCheckmarkStyles_unstable } from '../../selectable/index';
import { useMenuItemStyles_unstable } from '../MenuItem/useMenuItemStyles';
import type { MenuItemRadioState } from './MenuItemRadio.types';

export const menuItemRadioClassName = 'fui-MenuItemRadio';

export const useMenuItemRadioStyles_unstable = (state: MenuItemRadioState) => {
  state.root.className = mergeClasses(menuItemRadioClassName, state.root.className);

  useMenuItemStyles_unstable(state);
  useCheckmarkStyles_unstable(state);
};

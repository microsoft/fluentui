import { useCheckmarkStyles } from '../../selectable/index';
import { useMenuItemStyles } from '../MenuItem/useMenuItemStyles';
import { MenuItemCheckboxState } from './MenuItemCheckbox.types';

export const useMenuItemCheckBoxStyles = (state: MenuItemCheckboxState) => {
  useMenuItemStyles(state);
  useCheckmarkStyles(state);
};

import { mergeClasses } from '@fluentui/react-make-styles';
import { useCheckmarkStyles } from '../../selectable/index';
import { useMenuItemStyles } from '../MenuItem/useMenuItemStyles';
import type { MenuItemCheckboxState } from './MenuItemCheckbox.types';

export const menuItemCheckboxClassName = 'fui-MenuItemCheckbox';

export const useMenuItemCheckboxStyles = (state: MenuItemCheckboxState) => {
  state.root.className = mergeClasses(menuItemCheckboxClassName, state.root.className);

  useMenuItemStyles(state);
  useCheckmarkStyles(state);
};

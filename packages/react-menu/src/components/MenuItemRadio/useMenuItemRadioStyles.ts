import { mergeClasses } from '@fluentui/react-make-styles';
import { useCheckmarkStyles } from '../../selectable/index';
import { useMenuItemStyles } from '../MenuItem/useMenuItemStyles';
import type { MenuItemRadioState } from './MenuItemRadio.types';

export const menuItemRadioClassName = 'fui-MenuItemRadio';

export const useMenuItemRadioStyles = (state: MenuItemRadioState) => {
  state.root.className = mergeClasses(menuItemRadioClassName, state.root.className);

  useMenuItemStyles(state);
  useCheckmarkStyles(state);
};

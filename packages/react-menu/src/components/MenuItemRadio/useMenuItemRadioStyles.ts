import { useCheckmarkStyles } from '../../selectable/index';
import { useMenuItemStyles } from '../MenuItem/useMenuItemStyles';
import { MenuItemRadioState } from './MenuItemRadio.types';

export const useMenuItemRadioStyles = (state: MenuItemRadioState) => {
  useMenuItemStyles(state);
  useCheckmarkStyles(state);
};
